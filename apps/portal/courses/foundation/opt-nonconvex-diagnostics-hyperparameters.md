# 非凸最適化の診断とhyperparameter

## Course・Unit内での位置付け

Course 06「最適化」／Unit「機械学習と大規模最適化」／第620 Topic。

## 今回解く問い

非凸最適化の診断とhyperparameterの定義、計算手順、成立条件を整理し、最適化の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

非凸最適化の診断、hyperparameterを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- 非凸最適化の診断、hyperparameterの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- 非凸最適化の診断とhyperparameterは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [adaptive optimizer](/courses/foundation/opt-adaptive-optimizers)
- [数値計算の検証・benchmark・再現性](/courses/foundation/num-verification-benchmarking-reproducibility)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/opt-nonconvex-diagnostics-hyperparameters/)
- [教科書](/textbook/opt-nonconvex-diagnostics-hyperparameters)
- [演習](/exercises/opt-nonconvex-diagnostics-hyperparameters)

## 前後Topic

- [前のTopic：ADMMと分割法](/courses/foundation/opt-admm-splitting)
- [次のTopic：データ行列・中心化・標準化](/courses/foundation/mat-data-matrices-centering-scaling)
