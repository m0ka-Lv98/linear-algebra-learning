# random projectionとJohnson–Lindenstrauss

## Course・Unit内での位置付け

Course 07「データ解析の行列手法」／Unit「高次元データと構造化行列」／第717 Topic。

## 今回解く問い

random projectionとJohnson–Lindenstraussの定義、計算手順、成立条件を整理し、データ解析の行列手法の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

random、projection、Johnson–Lindenstraussを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- random、projection、Johnson–Lindenstraussの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- random projectionとJohnson–Lindenstraussは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [乱択数値線形代数](/courses/foundation/num-randomized-numerical-linear-algebra)
- [大数の法則と中心極限定理](/courses/foundation/prob-laws-large-numbers-central-limit-theorem)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/mat-random-projections-jl/)
- [教科書](/textbook/mat-random-projections-jl)
- [演習](/exercises/mat-random-projections-jl)

## 前後Topic

- [前のTopic：正準相関分析](/courses/foundation/mat-cca-multiview)
- [次のTopic：matrix completion](/courses/foundation/mat-matrix-completion)
