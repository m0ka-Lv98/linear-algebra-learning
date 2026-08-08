# quantization・sparsity・Mixture of Experts

## Course・Unit内での位置付け

Course 10「Frontier」／Unit「効率化・科学応用・governance」／第1016 Topic。

## 今回解く問い

quantization・sparsity・Mixture of Expertsの定義、計算手順、成立条件を整理し、Frontierの後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

quantization、sparsity、Mixture、of、Expertsを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- quantization、sparsity、Mixture、of、Expertsの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- quantization・sparsity・Mixture of Expertsは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [効率的学習と推論](/courses/foundation/dl-efficient-training-inference)
- [疎行列と前処理](/courses/foundation/num-sparse-matrices-preconditioning)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/frontier-quantization-sparsity-moe/)
- [教科書](/textbook/frontier-quantization-sparsity-moe)
- [演習](/exercises/frontier-quantization-sparsity-moe)

## 前後Topic

- [前のTopic：不確実性・calibration・abstention](/courses/foundation/frontier-uncertainty-calibration-abstention)
- [次のTopic：long contextとmemory](/courses/foundation/frontier-long-context-memory)
