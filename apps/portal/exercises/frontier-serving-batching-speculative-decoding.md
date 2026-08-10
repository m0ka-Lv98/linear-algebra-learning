# LLM serving・continuous batching・speculative decoding：演習

Course 10｜Frontier

[教科書](/textbook/frontier-serving-batching-speculative-decoding)

## 問題1

draftが5 token提案し、各blockで平均4 token受理される。target model call 1回あたり平均何token進むか。draft costを無視した理想speedup上限も答えよ。

<details><summary>完全解答</summary>

平均4 token進む。通常decodeはtarget call 1回で1 tokenなので、draft costとverification overheadを無視した理想上限は約4倍。

</details>

## 問題2

「LLM serving・continuous batching・speculative decoding」の導出を、最初の段階「1. decode requestをstepごとのwork itemへ分解する。」から始めて中心式まで再構成せよ。途中で「autoregressive decodeではrequestごとに1stepずつworkが発生する。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. decode requestをstepごとのwork itemへ分解する。
2. finished requestをすぐbatchから除き新requestを投入する。
3. speculative decodingではdraft token列をtarget modelで並列検証し、受理分だけ進める。

autoregressive decodeではrequestごとに1stepずつworkが発生する。static batchingだと短いrequestが終わってもslotが遊ぶ。continuous batchingは各iterationでactive sequence集合を更新してGPUを埋める。

speculative decodingは小さなdraft modelでk token候補を出し、大きなtarget modelがまとめて検証する。受理判定を正しく設計すればtarget distributionを保ったまま複数token進める可能性がある。速度向上はdraft costとacceptance rateに依存する。

</details>

## 問題3

図 `/visuals/course-10/frontier-serving-batching-speculative-decoding.png` では「縦軸がbatch slot、横軸がdecode step。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-serving-batching-speculative-decoding.png" alt="LLM serving・continuous batching・speculative decodingの図解" style="max-height: 480px; display:block; margin:0 auto;" />

縦軸がbatch slot、横軸がdecode step。各requestの横棒は開始時刻と終了時刻が異なり、終了したslotへ途中から新requestが入る。固定batchのように最長requestの終了まで待たず、step境界で入れ替えるcontinuous batchingを示す。

</details>

## 問題4

「LLM serving・continuous batching・speculative decoding」の第二例「draftが4 token提案し平均3 token受理され、target verificationが通常1stepと近いcostなら、理想的にはtarget callあたり約3 token進む。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

draftが4 token提案し平均3 token受理され、target verificationが通常1stepと近いcostなら、理想的にはtarget callあたり約3 token進む。ただしdraft計算・rejection rollbackがあるので実speedupは3倍未満。

</details>

## 問題5

LLM serving・continuous batching・speculative decodingで time to first token、inter-token latency、候補tokenを先に提案するmodel は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-serving-batching-speculative-decoding` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $TTFT$ | time to first token |
| $ITL$ | inter-token latency |
| $draft model$ | 候補tokenを先に提案するmodel |


- TTFT：time to first token。
- TPOT：time per output token。
- throughput：単位時間あたり処理token数。
- acceptance rate：draft tokenがtarget検証で受理される割合。

</details>

## 問題6

警告「throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。servingはtokens/sだけでなくp50/p95 latency、queueing、memory headroomを同時に見る。

</details>

## 問題7

よくある誤り「tokens/sだけでuser latencyを評価しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- tokens/sだけでuser latencyを評価しない。
- draft acceptance rateが低いとspeculation overheadが得を上回る。

throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。servingはtokens/sだけでなくp50/p95 latency、queueing、memory headroomを同時に見る。

</details>

## 問題8

「LLM serving・continuous batching・speculative decoding」の例題1を再計算し、その結果に対して次の検算を実行せよ：continuous batchingでは各decode stepでactive sequence数がcapacityを超えていないか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

平均4 token進む。通常decodeはtarget call 1回で1 tokenなので、draft costとverification overheadを無視した理想上限は約4倍。

検算：
continuous batchingでは各decode stepでactive sequence数がcapacityを超えていないか確認する。speculative decodingではdraft costを無視せず、target callあたりの受理token数から実効cost/tokenを計算する。acceptanceが低い場合にspeedupが消えることも数値で確認する。

</details>

## 問題9

後続への接続「prefill/decode disaggregation、scheduler policy、tensor/pipeline parallel、load balancingへ広がる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

prefill/decode disaggregation、scheduler policy、tensor/pipeline parallel、load balancingへ広がる。production LLMではmodel algorithmとsystems metricを分離して評価する必要がある。

</details>

## 問題10

中心問題「複数requestを低latencyかつ高throughputで処理するため、serving systemは何をscheduleするか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \text{throughput}\not\equiv\text{latency};\quad \text{servingは両者のtrade-offを最適化する} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $TTFT$ | time to first token |
| $ITL$ | inter-token latency |
| $draft model$ | 候補tokenを先に提案するmodel |


- TTFT：time to first token。
- TPOT：time per output token。
- throughput：単位時間あたり処理token数。
- acceptance rate：draft tokenがtarget検証で受理される割合。

中心式：
$$
\text{throughput}\not\equiv\text{latency};\quad \text{servingは両者のtrade-offを最適化する}
$$

導出：
1. decode requestをstepごとのwork itemへ分解する。
2. finished requestをすぐbatchから除き新requestを投入する。
3. speculative decodingではdraft token列をtarget modelで並列検証し、受理分だけ進める。

根拠：
autoregressive decodeではrequestごとに1stepずつworkが発生する。static batchingだと短いrequestが終わってもslotが遊ぶ。continuous batchingは各iterationでactive sequence集合を更新してGPUを埋める。

speculative decodingは小さなdraft modelでk token候補を出し、大きなtarget modelがまとめて検証する。受理判定を正しく設計すればtarget distributionを保ったまま複数token進める可能性がある。速度向上はdraft costとacceptance rateに依存する。

具体例：
**問題**：draftが5 token提案し、各blockで平均4 token受理される。target model call 1回あたり平均何token進むか。draft costを無視した理想speedup上限も答えよ。

**解答**：平均4 token進む。通常decodeはtarget call 1回で1 tokenなので、draft costとverification overheadを無視した理想上限は約4倍。

失敗条件：
throughput最大化のため巨大batchにするとTTFT/latencyが悪化する。servingはtokens/sだけでなくp50/p95 latency、queueing、memory headroomを同時に見る。

</details>
