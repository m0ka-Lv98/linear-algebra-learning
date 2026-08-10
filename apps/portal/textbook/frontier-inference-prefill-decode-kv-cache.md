# LLM推論：prefill・decode・KV cache：教科書

Course 10｜Frontier

## このTopicの中心問題

LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。

## まず直感

prefillはprompt全tokenを並列に処理しmatrix multiplicationが大きい。decodeは過去K/Vをcacheして1 tokenずつ進み、batchやmodelによってmemory bandwidth支配になりやすい。

## 図で固定する

<img src="/visuals/course-10/frontier-inference-prefill-decode-kv-cache.png" alt="LLM推論：prefill・decode・KV cacheの図解" style="max-height: 460px; display:block; margin:0 auto;" />

### 動きで確認する

<img src="/visuals/course-10/frontier-inference-prefill-decode-kv-cache.gif" alt="frontier-inference-prefill-decode-kv-cache animation" style="max-height: 420px; display:block; margin:0 auto;" />


図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $L$ | context length |
| $d$ | hidden/head dimension |
| $KV cache$ | 過去tokenのkey/value tensor |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}
$$

## なぜこの式になるのか

1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。
2. 毎step再計算せずcacheへ保存する。
3. 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

長いpromptの最初はprefill latency、長い生成ではper-token decode latencyとKV cache容量が重要になる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- training throughputとdecode latencyを同じ指標で比較しない。
- GQA/MQA等でKV cache量が変わる。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Transformer inference systems literature

[演習へ](/exercises/frontier-inference-prefill-decode-kv-cache)　|　[スライドへ](/slides/frontier-inference-prefill-decode-kv-cache/)
