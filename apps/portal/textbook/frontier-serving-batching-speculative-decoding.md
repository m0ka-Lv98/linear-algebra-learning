# LLM serving・continuous batching・speculative decoding：教科書

Course 10｜Frontier

## このTopicで解く問題

複数requestを低latencyかつ高throughputで処理するため、serving systemは何をscheduleするか。

## なぜこの概念が必要か

requestごとに生成長が違うため固定batchはGPU slotを無駄にしやすい。continuous batchingはdecode step単位でrequestを入替える。speculative decodingは小modelのdraftを大modelがまとめて検証する。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-serving-batching-speculative-decoding.png" alt="LLM serving・continuous batching・speculative decodingの図解" style="max-height: 480px; display:block; margin:0 auto;" />

縦軸がbatch slot、横軸がdecode step。各requestの横棒は開始時刻と終了時刻が異なり、終了したslotへ途中から新requestが入る。固定batchのように最長requestの終了まで待たず、step境界で入れ替えるcontinuous batchingを示す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $TTFT$ | time to first token |
| $ITL$ | inter-token latency |
| $draft model$ | 候補tokenを先に提案するmodel |


- TTFT：time to first token。
- TPOT：time per output token。
- throughput：単位時間あたり処理token数。
- acceptance rate：draft tokenがtarget検証で受理される割合。

## 中心となる式

$$
\text{throughput}\not\equiv\text{latency};\quad \text{servingは両者のtrade-offを最適化する}
$$

## 中心式を前提から導く

1. decode requestをstepごとのwork itemへ分解する。
2. finished requestをすぐbatchから除き新requestを投入する。
3. speculative decodingではdraft token列をtarget modelで並列検証し、受理分だけ進める。

## なぜその変形をしてよいのか

autoregressive decodeではrequestごとに1stepずつworkが発生する。static batchingだと短いrequestが終わってもslotが遊ぶ。continuous batchingは各iterationでactive sequence集合を更新してGPUを埋める。

speculative decodingは小さなdraft modelでk token候補を出し、大きなtarget modelがまとめて検証する。受理判定を正しく設計すればtarget distributionを保ったまま複数token進める可能性がある。速度向上はdraft costとacceptance rateに依存する。

## continuous batchingをqueueingとして読む

static batchでは最長sequenceが終わるまで短いsequenceのslotが空く。continuous batchingではdecode iterationごとに終了requestを外し、queueから新requestを投入する。GPU上のactive token数を高く保てる一方、batchを大きくしすぎると1 iterationの時間が延び、individual latencyが悪化する。

## speculative decodingの受理と速度

小さなdraft model $q$ が複数tokenを提案し、target model $p$ がまとめてscoreする。正しいaccept/reject ruleを使えば最終sample分布をtarget $p$ と一致させつつ、1回のtarget forwardで複数token進める。

速度は平均accept lengthだけで決まらない。draft生成cost $C_d$、target verification cost $C_t$、平均受理token数 $a$ を考えると、概略cost/tokenは $(C_d+C_t)/a$。draftが重すぎたりacceptanceが低ければ通常decodeより遅くなる。

throughput、TTFT、TPOT、p95 latency、KV memory使用率を同時に測り、単一のtokens/sだけでserving品質を判断しない。

## 例題1：具体的な数値・構造で解く

**問題**：draftが5 token提案し、各blockで平均4 token受理される。target model call 1回あたり平均何token進むか。draft costを無視した理想speedup上限も答えよ。

**解答**：平均4 token進む。通常decodeはtarget call 1回で1 tokenなので、draft costとverification overheadを無視した理想上限は約4倍。

## 例題2：別の条件で確認する

draftが4 token提案し平均3 token受理され、target verificationが通常1stepと近いcostなら、理想的にはtarget callあたり約3 token進む。ただしdraft計算・rejection rollbackがあるので実speedupは3倍未満。

## 結果の検算

continuous batchingでは各decode stepでactive sequence数がcapacityを超えていないか確認する。speculative decodingではdraft costを無視せず、target callあたりの受理token数から実効cost/tokenを計算する。acceptanceが低い場合にspeedupが消えることも数値で確認する。

## 条件を外すと何が壊れるか

throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。servingはtokens/sだけでなくp50/p95 latency、queueing、memory headroomを同時に見る。

## よくある誤り

- tokens/sだけでuser latencyを評価しない。
- draft acceptance rateが低いとspeculation overheadが得を上回る。

## 次のTopic・応用への接続

prefill/decode disaggregation、scheduler policy、tensor/pipeline parallel、load balancingへ広がる。production LLMではmodel algorithmとsystems metricを分離して評価する必要がある。

## 参考

- speculative decoding literature

[演習へ](/exercises/frontier-serving-batching-speculative-decoding)　|　[スライドへ](/slides/frontier-serving-batching-speculative-decoding/)
