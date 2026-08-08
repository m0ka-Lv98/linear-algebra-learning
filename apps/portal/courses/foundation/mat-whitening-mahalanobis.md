# whiteningとMahalanobis距離

## Course・Unit内での位置付け

Course 07「データ解析の行列手法」／Unit「データ行列と幾何」／第705 Topic。

## 今回解く問い

whiteningとMahalanobis距離の定義、計算手順、成立条件を整理し、データ解析の行列手法の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

whitening、Mahalanobis距離を、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- whitening、Mahalanobis距離の主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- whiteningとMahalanobis距離は、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [多変量正規分布](/courses/foundation/prob-multivariate-normal-distribution)
- [二次形式と正定値行列](/courses/foundation/la-quadratic-forms-positive-definite)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/mat-whitening-mahalanobis/)
- [教科書](/textbook/mat-whitening-mahalanobis)
- [演習](/exercises/mat-whitening-mahalanobis)

## 前後Topic

- [前のTopic：PCAのSVD計算](/courses/foundation/mat-pca-svd-computation)
- [次のTopic：OLSとdesign matrix](/courses/foundation/mat-ols-design-matrices)
