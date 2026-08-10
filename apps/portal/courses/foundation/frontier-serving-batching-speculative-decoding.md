# LLM serving・continuous batching・speculative decoding

Course 10｜Frontier

requestごとに生成長が違うため固定batchはGPU slotを無駄にしやすい。continuous batchingはdecode step単位でrequestを入替える。speculative decodingは小modelのdraftを大modelがまとめて検証する。

## 到達目標

- 複数requestを低latencyかつ高throughputで処理するため、serving systemは何をscheduleするか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/frontier-serving-batching-speculative-decoding)
- [演習](/exercises/frontier-serving-batching-speculative-decoding)
- [スライド](/slides/frontier-serving-batching-speculative-decoding/)
