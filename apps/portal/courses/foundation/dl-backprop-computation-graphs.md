# 誤差逆伝播と計算graph

## Course・Unit内での位置付け

Course 09「深層学習」／Unit「ニューラルネットワークの基礎」／第902 Topic。

## 今回解く問い

誤差逆伝播と計算graphの定義、計算手順、成立条件を整理し、深層学習の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

誤差逆伝播、計算graphを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- 誤差逆伝播、計算graphの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- 誤差逆伝播と計算graphは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [多変数の連鎖律](/courses/foundation/calc-multivariable-chain-rule)
- [有向グラフ・DAG・トポロジカル順序](/courses/foundation/dm-directed-graphs-dags-topological-order)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/dl-backprop-computation-graphs/)
- [教科書](/textbook/dl-backprop-computation-graphs)
- [演習](/exercises/dl-backprop-computation-graphs)

## 前後Topic

- [前のTopic：perceptronと多層network](/courses/foundation/dl-perceptron-mlp)
- [次のTopic：activation関数とloss](/courses/foundation/dl-activation-loss-functions)
