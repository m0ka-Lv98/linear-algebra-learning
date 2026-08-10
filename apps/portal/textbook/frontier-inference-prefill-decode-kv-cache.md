# LLM推論：prefill・decode・KV cache：教科書

Course 10｜Frontier

## このTopicで解く問題

LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。

## なぜこの概念が必要か

prefillはprompt全tokenを並列に処理しmatrix multiplicationが大きい。decodeは過去K/Vをcacheして1 tokenずつ進み、batchやmodelによってmemory bandwidth支配になりやすい。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-inference-prefill-decode-kv-cache.png" alt="LLM推論：prefill・decode・KV cacheの図解" style="max-height: 480px; display:block; margin:0 auto;" />

prompt長を最初にまとめて処理するprefill区間と、その後1 tokenずつ進むdecode区間を分ける。グラフのcache token数はprefill終了時にprompt長まで一気に増え、decodeではstepごとに1ずつ増える。過去tokenのK/Vを再計算せず保持する代わりにmemoryがcontext長へ比例して増える。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $L$ | context length |
| $d$ | hidden/head dimension |
| $KV cache$ | 過去tokenのkey/value tensor |


- $q_t$：新tokenのquery。
- $K_{\le t},V_{\le t}$：過去tokenを含むkey/value cache。
- prefill：promptをまとめて処理するphase。
- decode：1 tokenずつ生成するphase。

## 中心となる式

$$
\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}
$$

## 中心式を前提から導く

1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。
2. 毎step再計算せずcacheへ保存する。
3. 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

## なぜその変形をしてよいのか

causal self-attentionで新token tのqueryは過去すべてのkey/valueを参照する。過去tokenのhidden stateは変わらないので、各layerのK,Vをcacheすればdecode stepで過去K,Vのprojectionを再計算する必要がない。

prefillはprompt全tokenをmatrix operationで並列処理しcompute利用率が高い。一方decodeは1stepのqueryに対して巨大なweight/KVを読むためmemory bandwidth boundになりやすい。TTFTとtime-per-output-tokenを分けて測る理由。

## KV cacheのshapeとmemoryを数える

layer数を $L$、KV head数を $h_{kv}$、head dimensionを $d_h$、token数を $T$、1要素のbyte数を $b$ とする。KとVを両方保存するので、1 sequenceの概算memoryは

$$
M_{KV}=2Lh_{kv}d_hTb.
$$

例として $L=32$, $h_{kv}=2$, $d_h=128$, FP16なので $b=2$, $T=32768$ なら約1 GiBになる。batch sizeを増やすとsequence数にほぼ比例して増える。

## prefillとdecodeの計算特性

prefillは長さTのpromptをまとめて処理でき、matrix multiplicationの大きなbatchを作りやすい。decodeは新tokenが1個だけなので、各stepでmodel weightと過去KVを読みながら小さいqueryを処理する。このため同じTransformerでもprefillはcompute utilization、decodeはmemory bandwidth/latencyが支配的になりやすい。

TTFT (time to first token) とTPOT (time per output token) を分けて測るのは、この2段階のbottleneckが異なるからである。

## 例題1：具体的な数値・構造で解く

**問題**：48 layers、8 KV heads、head dim128、FP16、KとVを保存する。1 tokenあたりのKV cache bytesを概算せよ。

**解答**：$48\times8\times128\times2(K,V)\times2$ bytes =196,608 bytes ≈192 KiB/token。10,000 tokenなら約1.83 GiB/sequence。

## 例題2：別の条件で確認する

32 layers、2 KV heads、head dim128、FP16で1 tokenのKVは概ね $32\times2\times128\times2(K,V)\times2$ bytes = 32KB。context 32k tokenなら単一sequenceだけで約1GBのKVになる（実装詳細で変動）。

## 結果の検算

KV memoryの単位をbytesまで追う。layer数×KV head数×head dim×K/Vの2種類×dtype bytes×cached token数を掛け、contextを2倍にするとcache memoryもほぼ2倍になることを確認する。prefillとdecodeのlatencyを混ぜずTTFTとTPOTを分けて測る。

## 条件を外すと何が壊れるか

KV cacheはmodel weight memoryを減らす仕組みではない。contextを長くするとcache memoryが増え、batch sizeを圧迫する。GQA/MQAはKV head数を減らしこの部分を削減する。

## よくある誤り

- training throughputとdecode latencyを同じ指標で比較しない。
- GQA/MQA等でKV cache量が変わる。

## 次のTopic・応用への接続

continuous batchingでは各requestのdecode stepを同じGPU batchへ詰める。paged attention、KV quantization、prefix cachingなどserving最適化へ続く。

## 参考

- Transformer inference systems literature

[演習へ](/exercises/frontier-inference-prefill-decode-kv-cache)　|　[スライドへ](/slides/frontier-inference-prefill-decode-kv-cache/)
