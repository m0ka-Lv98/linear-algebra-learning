# RAG：chunking・reranking・評価：演習

Course 10｜Frontier

## 問題1

中心式 `$\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

RAGの失敗をretrieval・reranking・generationへ分解して、どこが悪いか測るにはどうするか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

最終回答だけを見ると原因が分からない。まず必要根拠をtop-kへ取れたか、rerankerが上位へ持ち上げたか、generatorが根拠を正しく使ったかを分離評価する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：answerが誤っていてもgold passageがtop-kに無ければretriever問題、入っているのに無視したならgenerator側の問題。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「RAG：chunking・reranking・評価」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

query→candidate retrievalを第一段階として測る。 → reranking後のranking metricを別に測る。 → retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：end-to-end accuracyだけでretrieval qualityを推定しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「RAG：chunking・reranking・評価」の中心式 `\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「RAG：chunking・reranking・評価」を数値実装する前提で、中心式 `\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「RAG：chunking・reranking・評価」の中心式 `\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

end-to-end accuracyだけでretrieval qualityを推定しない。 / chunk sizeを変えるとindex数・recall・context効率が同時に変わる。

</details>

## 問題9

「RAG：chunking・reranking・評価」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「RAG：chunking・reranking・評価」について、定義 → 中心式 `\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/frontier-rag-reranking-evaluation)
