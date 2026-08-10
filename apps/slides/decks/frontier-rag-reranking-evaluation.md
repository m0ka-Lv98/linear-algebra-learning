---
theme: default
routerMode: hash
layout: cover
title: "RAG：chunking・reranking・評価"
---

# RAG：chunking・reranking・評価

Course 10｜Frontier

---

## 今回の問い

RAGの失敗をretrieval・reranking・generationへ分解して、どこが悪いか測るにはどうするか。

---

## 直感

最終回答だけを見ると原因が分からない。まず必要根拠をtop-kへ取れたか、rerankerが上位へ持ち上げたか、generatorが根拠を正しく使ったかを分離評価する。

---

## 図解

<img src="./assets/course-10/frontier-rag-reranking-evaluation.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}
$$

---

## 導出

1. query→candidate retrievalを第一段階として測る。
2. reranking後のranking metricを別に測る。
3. retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

---

## 小さい例

answerが誤っていてもgold passageがtop-kに無ければretriever問題、入っているのに無視したならgenerator側の問題。

---

## 条件を外すと

- end-to-end accuracyだけでretrieval qualityを推定しない。
- chunk sizeを変えるとindex数・recall・context効率が同時に変わる。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-rag-reranking-evaluation)

[10問の演習](../../exercises/frontier-rag-reranking-evaluation)
