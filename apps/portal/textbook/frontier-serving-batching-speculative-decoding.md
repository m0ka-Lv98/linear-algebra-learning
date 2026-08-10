# LLM serving・continuous batching・speculative decoding：教科書

Course 10｜Frontier

## このTopicの中心問題

複数requestを低latencyかつ高throughputで処理するため、serving systemは何をscheduleするか。

## まず直感

requestごとに生成長が違うため固定batchはGPU slotを無駄にしやすい。continuous batchingはdecode step単位でrequestを入替える。speculative decodingは小modelのdraftを大modelがまとめて検証する。

## 図で固定する

<img src="/visuals/course-10/frontier-serving-batching-speculative-decoding.png" alt="LLM serving・continuous batching・speculative decodingの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $TTFT$ | time to first token |
| $ITL$ | inter-token latency |
| $draft model$ | 候補tokenを先に提案するmodel |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\text{throughput}\not\equiv\text{latency};\quad \text{servingは両者のtrade-offを最適化する}
$$

## なぜこの式になるのか

1. decode requestをstepごとのwork itemへ分解する。
2. finished requestをすぐbatchから除き新requestを投入する。
3. speculative decodingではdraft token列をtarget modelで並列検証し、受理分だけ進める。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

short chatとlong generationを同一queueで処理するとき、scheduler policyでTTFTとthroughputの優先度が変わる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- tokens/sだけでuser latencyを評価しない。
- draft acceptance rateが低いとspeculation overheadが得を上回る。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- speculative decoding literature

[演習へ](/exercises/frontier-serving-batching-speculative-decoding)　|　[スライドへ](/slides/frontier-serving-batching-speculative-decoding/)
