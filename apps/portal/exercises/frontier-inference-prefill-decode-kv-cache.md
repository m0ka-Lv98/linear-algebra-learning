# LLM推論：prefill・decode・KV cache：演習

Course 10｜Frontier

## 問題1

中心式 `$\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

prefillはprompt全tokenを並列に処理しmatrix multiplicationが大きい。decodeは過去K/Vをcacheして1 tokenずつ進み、batchやmodelによってmemory bandwidth支配になりやすい。

</details>

## 問題3

次の例を途中計算込みで再現せよ：長いpromptの最初はprefill latency、長い生成ではper-token decode latencyとKV cache容量が重要になる。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「LLM推論：prefill・decode・KV cache」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

autoregressive生成では過去tokenのK,Vは次stepでも同じ。 → 毎step再計算せずcacheへ保存する。 → 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：training throughputとdecode latencyを同じ指標で比較しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「LLM推論：prefill・decode・KV cache」の中心式 `\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「LLM推論：prefill・decode・KV cache」を数値実装する前提で、中心式 `\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「LLM推論：prefill・decode・KV cache」の中心式 `\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

training throughputとdecode latencyを同じ指標で比較しない。 / GQA/MQA等でKV cache量が変わる。

</details>

## 問題9

「LLM推論：prefill・decode・KV cache」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「LLM推論：prefill・decode・KV cache」について、定義 → 中心式 `\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/frontier-inference-prefill-decode-kv-cache)
