# LLM推論：prefill・decode・KV cache：演習

Course 10｜Frontier

[教科書](/textbook/frontier-inference-prefill-decode-kv-cache)

## 問題1

48 layers、8 KV heads、head dim128、FP16、KとVを保存する。1 tokenあたりのKV cache bytesを概算せよ。

<details><summary>完全解答</summary>

$48\times8\times128\times2(K,V)\times2$ bytes =196,608 bytes ≈192 KiB/token。10,000 tokenなら約1.83 GiB/sequence。

</details>

## 問題2

「LLM推論：prefill・decode・KV cache」の導出を、最初の段階「1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。」から始めて中心式まで再構成せよ。途中で「causal self-attentionで新token tのqueryは過去すべてのkey/valueを参照する。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。
2. 毎step再計算せずcacheへ保存する。
3. 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

causal self-attentionで新token tのqueryは過去すべてのkey/valueを参照する。過去tokenのhidden stateは変わらないので、各layerのK,Vをcacheすればdecode stepで過去K,Vのprojectionを再計算する必要がない。

prefillはprompt全tokenをmatrix operationで並列処理しcompute利用率が高い。一方decodeは1stepのqueryに対して巨大なweight/KVを読むためmemory bandwidth boundになりやすい。TTFTとtime-per-output-tokenを分けて測る理由。

</details>

## 問題3

図 `/visuals/course-10/frontier-inference-prefill-decode-kv-cache.png` では「prompt長を最初にまとめて処理するprefill区間と、その後1 tokenずつ進むdecode区間を分ける。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-inference-prefill-decode-kv-cache.png" alt="LLM推論：prefill・decode・KV cacheの図解" style="max-height: 480px; display:block; margin:0 auto;" />

prompt長を最初にまとめて処理するprefill区間と、その後1 tokenずつ進むdecode区間を分ける。グラフのcache token数はprefill終了時にprompt長まで一気に増え、decodeではstepごとに1ずつ増える。過去tokenのK/Vを再計算せず保持する代わりにmemoryがcontext長へ比例して増える。

</details>

## 問題4

「LLM推論：prefill・decode・KV cache」の第二例「32 layers、2 KV heads、head dim128、FP16で1 tokenのKVは概ね $32\times2\times128\times2(K,V)\times2$ bytes = 32KB。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

32 layers、2 KV heads、head dim128、FP16で1 tokenのKVは概ね $32\times2\times128\times2(K,V)\times2$ bytes = 32KB。context 32k tokenなら単一sequenceだけで約1GBのKVになる（実装詳細で変動）。

</details>

## 問題5

LLM推論：prefill・decode・KV cacheで context length、hidden/head dimension、過去tokenのkey/value tensor は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-inference-prefill-decode-kv-cache` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $L$ | context length |
| $d$ | hidden/head dimension |
| $KV cache$ | 過去tokenのkey/value tensor |


- $q_t$：新tokenのquery。
- $K_{\le t},V_{\le t}$：過去tokenを含むkey/value cache。
- prefill：promptをまとめて処理するphase。
- decode：1 tokenずつ生成するphase。

</details>

## 問題6

警告「KV cacheはmodel weight memoryを減らす仕組みではない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

KV cacheはmodel weight memoryを減らす仕組みではない。contextを長くするとcache memoryが増え、batch sizeを圧迫する。GQA/MQAはKV head数を減らしこの部分を削減する。

</details>

## 問題7

よくある誤り「training throughputとdecode latencyを同じ指標で比較しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- training throughputとdecode latencyを同じ指標で比較しない。
- GQA/MQA等でKV cache量が変わる。

KV cacheはmodel weight memoryを減らす仕組みではない。contextを長くするとcache memoryが増え、batch sizeを圧迫する。GQA/MQAはKV head数を減らしこの部分を削減する。

</details>

## 問題8

「LLM推論：prefill・decode・KV cache」の例題1を再計算し、その結果に対して次の検算を実行せよ：KV memoryの単位をbytesまで追う。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$48\times8\times128\times2(K,V)\times2$ bytes =196,608 bytes ≈192 KiB/token。10,000 tokenなら約1.83 GiB/sequence。

検算：
KV memoryの単位をbytesまで追う。layer数×KV head数×head dim×K/Vの2種類×dtype bytes×cached token数を掛け、contextを2倍にするとcache memoryもほぼ2倍になることを確認する。prefillとdecodeのlatencyを混ぜずTTFTとTPOTを分けて測る。

</details>

## 問題9

後続への接続「continuous batchingでは各requestのdecode stepを同じGPU batchへ詰める。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

continuous batchingでは各requestのdecode stepを同じGPU batchへ詰める。paged attention、KV quantization、prefix cachingなどserving最適化へ続く。

</details>

## 問題10

中心問題「LLM inferenceでprompt処理と1 tokenずつの生成は、計算特性がなぜ異なるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「KV cacheはmodel weight memoryを減らす仕組みではない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $L$ | context length |
| $d$ | hidden/head dimension |
| $KV cache$ | 過去tokenのkey/value tensor |


- $q_t$：新tokenのquery。
- $K_{\le t},V_{\le t}$：過去tokenを含むkey/value cache。
- prefill：promptをまとめて処理するphase。
- decode：1 tokenずつ生成するphase。

中心式：
$$
\mathrm{Attention}(q_t,K_{\le t},V_{\le t})=\mathrm{softmax}(q_tK_{\le t}^T/\sqrt d)V_{\le t}
$$

導出：
1. autoregressive生成では過去tokenのK,Vは次stepでも同じ。
2. 毎step再計算せずcacheへ保存する。
3. 計算量を減らす代わりにcontext長に比例するKV memoryを消費する。

根拠：
causal self-attentionで新token tのqueryは過去すべてのkey/valueを参照する。過去tokenのhidden stateは変わらないので、各layerのK,Vをcacheすればdecode stepで過去K,Vのprojectionを再計算する必要がない。

prefillはprompt全tokenをmatrix operationで並列処理しcompute利用率が高い。一方decodeは1stepのqueryに対して巨大なweight/KVを読むためmemory bandwidth boundになりやすい。TTFTとtime-per-output-tokenを分けて測る理由。

具体例：
**問題**：48 layers、8 KV heads、head dim128、FP16、KとVを保存する。1 tokenあたりのKV cache bytesを概算せよ。

**解答**：$48\times8\times128\times2(K,V)\times2$ bytes =196,608 bytes ≈192 KiB/token。10,000 tokenなら約1.83 GiB/sequence。

失敗条件：
KV cacheはmodel weight memoryを減らす仕組みではない。contextを長くするとcache memoryが増え、batch sizeを圧迫する。GQA/MQAはKV head数を減らしこの部分を削減する。

</details>
