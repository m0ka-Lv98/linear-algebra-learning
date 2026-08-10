---
theme: default
routerMode: hash
layout: cover
title: "LLM推論：prefill・decode・KV cache"
---

# LLM推論：prefill・decode・KV cache

Course 10｜Frontier

---

## 何を解決するか

LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。

prefillはprompt全tokenを並列に処理しmatrix multiplicationが大きい。decodeは過去K/Vをcacheして1 tokenずつ進み、batchやmodelによってmemory bandwidth支配になりやすい。

---

## 図の意味

<img src="./assets/course-10/frontier-inference-prefill-decode-kv-cache.png" style="max-height: 350px; display:block; margin:0 auto;" />

prompt長を最初にまとめて処理するprefill区間と、その後1 tokenずつ進むdecode区間を分ける。グラフのcache token数はprefill終了時にprompt長まで一気に増え、decodeではstepごとに1ずつ増える。過去tokenのK/Vを再計算せず保持する代わりにmemoryがcontext長へ比例して増える。

---

## 記号

| 記号 | 意味 |
|---|---|
| $L$ | context length |
| $d$ | hidden/head dimension |
| $KV cache$ | 過去tokenのkey/value tensor |


- $q_t$：新tokenのquery。
- $K_{\le t},V_{\le t}$：過去tokenを含むkey/value cache。
- prefill：promptをまとめて処理するphase。
- decode：1 tokenずつ生成するphase。

---

## 中心式

$$
\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}
$$

---

## 導出

1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。
2. 毎step再計算せずcacheへ保存する。
3. 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

---

## 省略しない一段

causal self-attentionで新token tのqueryは過去すべてのkey/valueを参照する。過去tokenのhidden stateは変わらないので、各layerのK,Vをcacheすればdecode stepで過去K,Vのprojectionを再計算する必要がない。

prefillはprompt全tokenをmatrix operationで並列処理しcompute利用率が高い。一方decodeは1stepのqueryに対して巨大なweight/KVを読むためmemory bandwidth boundになりやすい。TTFTとtime-per-output-tokenを分けて測る理由。

---

## 手計算

**問題**：48 layers、8 KV heads、head dim128、FP16、KとVを保存する。1 tokenあたりのKV cache bytesを概算せよ。

**解答**：$48\times8\times128\times2(K,V)\times2$ bytes =196,608 bytes ≈192 KiB/token。10,000 tokenなら約1.83 GiB/sequence。

---

## 条件を変える

32 layers、2 KV heads、head dim128、FP16で1 tokenのKVは概ね $32\times2\times128\times2(K,V)\times2$ bytes = 32KB。context 32k tokenなら単一sequenceだけで約1GBのKVになる（実装詳細で変動）。

---

## どこで壊れるか

KV cacheはmodel weight memoryを減らす仕組みではない。contextを長くするとcache memoryが増え、batch sizeを圧迫する。GQA/MQAはKV head数を減らしこの部分を削減する。

---

## 次へ

continuous batchingでは各requestのdecode stepを同じGPU batchへ詰める。paged attention、KV quantization、prefix cachingなどserving最適化へ続く。

---

[教科書](../../textbook/frontier-inference-prefill-decode-kv-cache)　|　[10問の演習](../../exercises/frontier-inference-prefill-decode-kv-cache)
