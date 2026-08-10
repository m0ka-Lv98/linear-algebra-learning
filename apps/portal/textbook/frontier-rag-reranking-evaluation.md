# RAG：chunking・reranking・評価：教科書

Course 10｜Frontier

## このTopicで解く問題

RAGの失敗をretrieval・reranking・generationへ分解して、どこが悪いか測るにはどうするか。

## なぜこの概念が必要か

最終回答だけを見ると原因が分からない。まず必要根拠をtop-kへ取れたか、rerankerが上位へ持ち上げたか、generatorが根拠を正しく使ったかを分離評価する。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-rag-reranking-evaluation.png" alt="RAG：chunking・reranking・評価の図解" style="max-height: 480px; display:block; margin:0 auto;" />

query→retriever→candidate passages→reranker→context→generatorという5段階。retrieverの下にRecall@k、rerankerの下にMRR/nDCG、generatorの下にanswer correctness/faithfulnessを置き、end-to-end失敗をどの段で生じたか切り分ける。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $Recall@k$ | 必要文書がtop-kへ入る割合 |
| $MRR$ | 最初の関連文書順位の逆数平均 |
| $faithfulness$ | 回答が根拠に支持される度合い |


- k：retrieval候補数。
- Recall@k：relevant itemのcoverage。
- MRR：最初のrelevant item順位の逆数の平均。
- faithfulness：回答がcontextに支持される度合い。

## 中心となる式

$$
\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}
$$

## 中心式を前提から導く

1. query→candidate retrievalを第一段階として測る。
2. reranking後のranking metricを別に測る。
3. retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

## なぜその変形をしてよいのか

retrieval段階では必要documentが候補集合へ入らなければ後段は救えないのでRecall@kが重要。rerankerはcandidate内の順序を改善し、限られたcontext windowへ最重要chunkを上位に置く。

generation evaluationではgold passageをoracle contextとして与えた性能と、実retrieval contextでの性能を比較するとretrieval lossを分離できる。faithfulnessは「回答がcontextに支持されるか」で、answer correctnessとは別指標。

## RAGを3つの誤差へ分解する

RAGは少なくとも (1) retrieval、(2) reranking/context construction、(3) generation の3段階を持つ。最終回答が間違ったとき、generatorだけを直す前に「必要documentが候補へ入ったか」を分けて診断する。

retrievalで正解documentがtop-kに含まれる割合をRecall@k、正解の順位を評価する指標としてMRRなどを使う。rerankerは候補集合内でのorderingを改善するが、retrieverが落としたdocumentを復活させることはできない。

## end-to-end評価

retrieved contextに答えが存在するのに回答が誤るならgeneration/grounding failure。そもそもcontextに必要事実がないならretrieval failure。回答がcontextにない事実を追加するならfaithfulness問題として分ける。

chunk sizeを大きくするとcontextは豊富になるがembeddingが複数topicを平均化しやすく、小さすぎると必要な前後関係を失う。overlap、metadata filter、hybrid lexical+dense retrieval、rerankingを同じ評価setでablationする。

## 例題1：具体的な数値・構造で解く

**問題**：relevant passageが全部で5個、top-10 retrievalに4個入った。Recall@10を求める。さらに最初のrelevantがrank3ならreciprocal rankを求めよ。

**解答**：Recall@10=4/5=0.8。first relevant rank=3なので reciprocal rank=1/3≈0.333。retrieval coverageとranking qualityは別指標。

## 例題2：別の条件で確認する

gold relevant passagesが4個中top-5に3個ならRecall@5=3/4=0.75。goldがtop-5にあるのにanswerが誤りならgenerator/reader側、gold自体が無ければretrieval側を優先修正する。

## 結果の検算

Recall@kは「gold passageがcandidate集合に入ったか」を、MRR/nDCGは順位を、faithfulnessは生成内容がcontextに支持されるかを測る。1つの最終accuracyだけで済ませず、失敗例ごとにどの段階のmetricが落ちたかを切り分ける。

## 条件を外すと何が壊れるか

chunkを細かくしすぎるとsemantic contextが切れ、粗すぎるとembeddingが平均化される。offline retrieval metricだけ改善しても最終answer metricが必ず上がるとは限らない。

## よくある誤り

- end-to-end accuracyだけでretrieval qualityを推定しない。
- chunk sizeを変えるとindex数・recall・context効率が同時に変わる。

## 次のTopic・応用への接続

hybrid sparse+dense retrieval、cross-encoder reranking、query rewriting、RAGAS型evaluation、agentic retrievalへ発展する。

## 参考

- RAG arXiv:2005.11401

[演習へ](/exercises/frontier-rag-reranking-evaluation)　|　[スライドへ](/slides/frontier-rag-reranking-evaluation/)
