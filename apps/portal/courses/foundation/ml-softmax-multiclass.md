# softmaxと多クラス分類

## Course・Unit内での位置付け

Course 08「機械学習」／Unit「機械学習の基礎と教師あり学習」／第804 Topic。

## 今回解く問い

softmaxと多クラス分類の定義、計算手順、成立条件を整理し、機械学習の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

softmax、多クラス分類を、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- softmax、多クラス分類の主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- softmaxと多クラス分類は、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [logistic回帰](/courses/foundation/ml-logistic-regression)
- [エントロピー・交差エントロピー・KLダイバージェンス](/courses/foundation/stat-entropy-cross-entropy-kl-divergence)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/ml-softmax-multiclass/)
- [教科書](/textbook/ml-softmax-multiclass)
- [演習](/exercises/ml-softmax-multiclass)

## 前後Topic

- [前のTopic：logistic回帰](/courses/foundation/ml-logistic-regression)
- [次のTopic：生成的分類器・Naive Bayes・LDA](/courses/foundation/ml-generative-classifiers-naive-bayes-lda)
