# k-meansと階層clustering

## Course・Unit内での位置付け

Course 08「機械学習」／Unit「教師なし学習と表現」／第812 Topic。

## 今回解く問い

k-meansと階層clusteringの定義、計算手順、成立条件を整理し、機械学習の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

k-means、階層clusteringを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- k-means、階層clusteringの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- k-meansと階層clusteringは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [内積・ノルム・角度](/courses/foundation/la-inner-products-norms-angles)
- [座標降下法と共役方向](/courses/foundation/opt-coordinate-conjugate-directions)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/ml-clustering-kmeans-hierarchical/)
- [教科書](/textbook/ml-clustering-kmeans-hierarchical)
- [演習](/exercises/ml-clustering-kmeans-hierarchical)

## 前後Topic

- [前のTopic：kernel methodと特徴写像](/courses/foundation/ml-kernel-methods-feature-maps)
- [次のTopic：Gaussian mixtureとEM](/courses/foundation/ml-gmm-em)
