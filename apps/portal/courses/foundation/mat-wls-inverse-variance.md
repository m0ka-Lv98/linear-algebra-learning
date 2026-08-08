# WLSと逆分散重み

## Course・Unit内での位置付け

Course 07「データ解析の行列手法」／Unit「回帰・推定・重み付け」／第707 Topic。

## 今回解く問い

WLSと逆分散重みの定義、計算手順、成立条件を整理し、データ解析の行列手法の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

WLS、逆分散重みを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- WLS、逆分散重みの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- WLSと逆分散重みは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [重み付き最小二乗法の導入](/courses/foundation/la-weighted-least-squares-introduction)
- [線形回帰の確率モデル](/courses/foundation/stat-linear-regression-probabilistic-model)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/mat-wls-inverse-variance/)
- [教科書](/textbook/mat-wls-inverse-variance)
- [演習](/exercises/mat-wls-inverse-variance)

## 前後Topic

- [前のTopic：OLSとdesign matrix](/courses/foundation/mat-ols-design-matrices)
- [次のTopic：GLSと相関誤差](/courses/foundation/mat-gls-correlated-errors)
