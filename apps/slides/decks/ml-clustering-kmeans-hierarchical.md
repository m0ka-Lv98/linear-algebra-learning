---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "k-meansと階層clustering"
---

# k-meansと階層clustering

Course 08｜機械学習｜Topic 12/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

k-meansと階層clusteringの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `ml-kernel-methods-feature-maps` で得た概念を使い、ここでは k-meansと階層clustering へ進む。

---

## 直感

clusteringは正解ラベルなしで近い点を群へまとめる。距離と群の形状仮定が結果を決める。



---

## 図解

<img src="./assets/course-08/ml-clustering-kmeans-hierarchical.png" style="max-height: 350px; display:block; margin:0 auto;" />

k-means中心が反復で動く様子を追う。 点群とクラスタ中心/密度成分を描く。教師ラベルではなく、距離や確率モデルが定める内部構造に基づいて割当てが更新される。

---

## 記号と代表式

- $\mu_k$：cluster centroid
- $c_i$：assignment
- $K$：clusters

$$
\min_{\{\boldsymbol{\mu}_k\}}\sum_i\min_k\|\mathbf{x}_i-\boldsymbol{\mu}_k\|_2^2
$$

---

## 導出 1

centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。

---

## 導出 2

assignments固定で $\sum_{i:c_i=k}\|x_i-\mu_k\|²$ をμで微分するとmeanがminimizer。

---

## 例題

2 well-separated spherical groupsならcentroidsが各meanへ。

---

## 条件を変えるとどうなるか

elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

---

## よくある誤解

k-meansと階層clusteringでは、式へ数値を代入するだけでは不十分である。elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

k-means++ init、多restart、scaling。cluster label番号はpermutation arbitrary。

---

## 一段先へ

hard assignmentをprobabilistic soft responsibilityへ一般化するとGaussian mixture/EM。

---

## 自分で説明できるか

- 「assignment step」を式を見ずに説明できるか
- 「monotone descent」までの論理を一段ずつ再現できるか
- k-meansと階層clusteringの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/ml-clustering-kmeans-hierarchical)
- [10問の演習](../../exercises/ml-clustering-kmeans-hierarchical)
