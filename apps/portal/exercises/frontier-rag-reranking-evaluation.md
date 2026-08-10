# RAG：chunking・reranking・評価：演習

Course 10｜Frontier

[教科書](/textbook/frontier-rag-reranking-evaluation)

## 問題1

relevant passageが全部で5個、top-10 retrievalに4個入った。Recall@10を求める。さらに最初のrelevantがrank3ならreciprocal rankを求めよ。

<details><summary>完全解答</summary>

Recall@10=4/5=0.8。first relevant rank=3なので reciprocal rank=1/3≈0.333。retrieval coverageとranking qualityは別指標。

</details>

## 問題2

「RAG：chunking・reranking・評価」の導出を、最初の段階「1. query→candidate retrievalを第一段階として測る。」から始めて中心式まで再構成せよ。途中で「retrieval段階では必要documentが候補集合へ入らなければ後段は救えないのでRecall@kが重要。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. query→candidate retrievalを第一段階として測る。
2. reranking後のranking metricを別に測る。
3. retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

retrieval段階では必要documentが候補集合へ入らなければ後段は救えないのでRecall@kが重要。rerankerはcandidate内の順序を改善し、限られたcontext windowへ最重要chunkを上位に置く。

generation evaluationではgold passageをoracle contextとして与えた性能と、実retrieval contextでの性能を比較するとretrieval lossを分離できる。faithfulnessは「回答がcontextに支持されるか」で、answer correctnessとは別指標。

</details>

## 問題3

図 `/visuals/course-10/frontier-rag-reranking-evaluation.png` では「query→retriever→candidate passages→reranker→context→generatorという5段階。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-rag-reranking-evaluation.png" alt="RAG：chunking・reranking・評価の図解" style="max-height: 480px; display:block; margin:0 auto;" />

query→retriever→candidate passages→reranker→context→generatorという5段階。retrieverの下にRecall@k、rerankerの下にMRR/nDCG、generatorの下にanswer correctness/faithfulnessを置き、end-to-end失敗をどの段で生じたか切り分ける。

</details>

## 問題4

「RAG：chunking・reranking・評価」の第二例「gold relevant passagesが4個中top-5に3個ならRecall@5=3/4=0.75。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

gold relevant passagesが4個中top-5に3個ならRecall@5=3/4=0.75。goldがtop-5にあるのにanswerが誤りならgenerator/reader側、gold自体が無ければretrieval側を優先修正する。

</details>

## 問題5

RAG：chunking・reranking・評価で 必要文書がtop-kへ入る割合、最初の関連文書順位の逆数平均、回答が根拠に支持される度合い は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-rag-reranking-evaluation` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $Recall@k$ | 必要文書がtop-kへ入る割合 |
| $MRR$ | 最初の関連文書順位の逆数平均 |
| $faithfulness$ | 回答が根拠に支持される度合い |


- k：retrieval候補数。
- Recall@k：relevant itemのcoverage。
- MRR：最初のrelevant item順位の逆数の平均。
- faithfulness：回答がcontextに支持される度合い。

</details>

## 問題6

警告「chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。offline retrieval metricだけ改善しても最終answer metricが必ず上がるとは限らない。

</details>

## 問題7

よくある誤り「end-to-end accuracyだけでretrieval qualityを推定しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- end-to-end accuracyだけでretrieval qualityを推定しない。
- chunk sizeを変えるとindex数・recall・context効率が同時に変わる。

chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。offline retrieval metricだけ改善しても最終answer metricが必ず上がるとは限らない。

</details>

## 問題8

「RAG：chunking・reranking・評価」の例題1を再計算し、その結果に対して次の検算を実行せよ：Recall@kは「gold passageがcandidate集合に入ったか」を、MRR/nDCGは順位を、faithfulnessは生成内容がcontextに支持されるかを測る。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

Recall@10=4/5=0.8。first relevant rank=3なので reciprocal rank=1/3≈0.333。retrieval coverageとranking qualityは別指標。

検算：
Recall@kは「gold passageがcandidate集合に入ったか」を、MRR/nDCGは順位を、faithfulnessは生成内容がcontextに支持されるかを測る。1つの最終accuracyだけで済ませず、失敗例ごとにどの段階のmetricが落ちたかを切り分ける。

</details>

## 問題9

後続への接続「hybrid sparse+dense retrieval、cross-encoder reranking、query rewriting、RAGAS型evaluation、agentic retrievalへ発展する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

hybrid sparse+dense retrieval、cross-encoder reranking、query rewriting、RAGAS型evaluation、agentic retrievalへ発展する。

</details>

## 問題10

中心問題「RAGの失敗をretrieval・reranking・generationへ分解して、どこが悪いか測るにはどうするか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $Recall@k$ | 必要文書がtop-kへ入る割合 |
| $MRR$ | 最初の関連文書順位の逆数平均 |
| $faithfulness$ | 回答が根拠に支持される度合い |


- k：retrieval候補数。
- Recall@k：relevant itemのcoverage。
- MRR：最初のrelevant item順位の逆数の平均。
- faithfulness：回答がcontextに支持される度合い。

中心式：
$$
\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}
$$

導出：
1. query→candidate retrievalを第一段階として測る。
2. reranking後のranking metricを別に測る。
3. retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

根拠：
retrieval段階では必要documentが候補集合へ入らなければ後段は救えないのでRecall@kが重要。rerankerはcandidate内の順序を改善し、限られたcontext windowへ最重要chunkを上位に置く。

generation evaluationではgold passageをoracle contextとして与えた性能と、実retrieval contextでの性能を比較するとretrieval lossを分離できる。faithfulnessは「回答がcontextに支持されるか」で、answer correctnessとは別指標。

具体例：
**問題**：relevant passageが全部で5個、top-10 retrievalに4個入った。Recall@10を求める。さらに最初のrelevantがrank3ならreciprocal rankを求めよ。

**解答**：Recall@10=4/5=0.8。first relevant rank=3なので reciprocal rank=1/3≈0.333。retrieval coverageとranking qualityは別指標。

失敗条件：
chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。offline retrieval metricだけ改善しても最終answer metricが必ず上がるとは限らない。

</details>
