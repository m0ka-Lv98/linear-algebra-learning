# tokenization・embedding・context

## Course・Unit内での位置付け

Course 10「Frontier」／Unit「Foundation modelと適応」／第1002 Topic。

## 今回解く問い

tokenization・embedding・contextの定義、計算手順、成立条件を整理し、Frontierの後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

tokenization、embedding、contextを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- tokenization、embedding、contextの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- tokenization・embedding・contextは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [embeddingと表現学習](/courses/foundation/dl-embeddings-representation-learning)
- [Transformer](/courses/foundation/dl-transformers)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/frontier-tokenization-embeddings-context/)
- [教科書](/textbook/frontier-tokenization-embeddings-context)
- [演習](/exercises/frontier-tokenization-embeddings-context)

## 前後Topic

- [前のTopic：Foundation modelの設計原理](/courses/foundation/frontier-foundation-model-paradigm)
- [次のTopic：pretrainingとscaling law](/courses/foundation/frontier-pretraining-scaling-laws)
