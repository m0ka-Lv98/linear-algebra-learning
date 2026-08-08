# robust regressionとM推定

## Course・Unit内での位置付け

Course 07「データ解析の行列手法」／Unit「回帰・推定・重み付け」／第710 Topic。

## 今回解く問い

robust regressionとM推定の定義、計算手順、成立条件を整理し、データ解析の行列手法の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

robust、regression、M推定を、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- robust、regression、M推定の主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- robust regressionとM推定は、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [推定量・バイアス・分散・MSE](/courses/foundation/stat-estimators-bias-variance-mse)
- [最適化問題の定式化](/courses/foundation/opt-problem-formulation-objectives-constraints)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/mat-robust-regression-m-estimators/)
- [教科書](/textbook/mat-robust-regression-m-estimators)
- [演習](/exercises/mat-robust-regression-m-estimators)

## 前後Topic

- [前のTopic：ridge・Lasso・Elastic Net](/courses/foundation/mat-ridge-lasso-elastic-net)
- [次のTopic：Fourier基底とDFT](/courses/foundation/mat-fourier-bases-dft)
