# 非負値行列因子分解

## Course・Unit内での位置付け

Course 07「データ解析の行列手法」／Unit「信号・潜在構造・分解」／第714 Topic。

## 今回解く問い

非負値行列因子分解の定義、計算手順、成立条件を整理し、データ解析の行列手法の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

非負値行列因子分解を、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- 非負値行列因子分解の主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- 非負値行列因子分解は、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [低ランク近似](/courses/foundation/la-low-rank-approximation)
- [射影勾配法](/courses/foundation/opt-projected-gradient)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/mat-nmf-nonnegative-factors/)
- [教科書](/textbook/mat-nmf-nonnegative-factors)
- [演習](/exercises/mat-nmf-nonnegative-factors)

## 前後Topic

- [前のTopic：filteringと正則化](/courses/foundation/mat-filtering-regularization)
- [次のTopic：独立成分分析](/courses/foundation/mat-ica-independent-components)
