# LLM推論：prefill・decode・KV cache

Course 10｜Frontier

prefillはprompt全tokenを並列に処理しmatrix multiplicationが大きい。decodeは過去K/Vをcacheして1 tokenずつ進み、batchやmodelによってmemory bandwidth支配になりやすい。

## 到達目標

- LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/frontier-inference-prefill-decode-kv-cache)
- [演習](/exercises/frontier-inference-prefill-decode-kv-cache)
- [スライド](/slides/frontier-inference-prefill-decode-kv-cache/)
