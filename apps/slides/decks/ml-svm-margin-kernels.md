---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "SVM・margin・kernel"
---

# SVM・margin・kernel

Course 08｜機械学習｜Topic 10/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

SVM・margin・kernelの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `ml-boosting-gradient-boosting` で得た概念を使い、ここでは SVM・margin・kernel へ進む。

---

## 直感

kernel法は高次元特徴写像を明示せず内積だけ計算し、非線形境界を線形問題として扱う。



---

## 図解

<img src="./assets/course-08/ml-svm-margin-kernels.png" style="max-height: 350px; display:block; margin:0 auto;" />

元空間で非線形な点群が特徴空間で線形分離可能になる模式図を見る。 入力空間で曲がった境界も、類似度kernelを通じた高次元特徴空間では線形境界として表せる。実際の高次元座標を明示せず内積だけ計算する。

---

## 記号と代表式

- $w,b$：hyperplane
- $y_i\in\{-1,1\}$
- $y_i(w^Tx_i+b)\ge1$：canonical margin constraint

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

---

## 導出 1

point xのsigned distanceは $(w^Tx+b)/||w||$。

---

## 導出 2

(cw,cb)はsame boundaryなのでclosest pointsのfunctional marginを1へnormalize。

---

## 例題

2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

---

## 条件を変えるとどうなるか

feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

---

## よくある誤解

SVM・margin・kernelでは、式へ数値を代入するだけでは不十分である。feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

dual/kernel solver vs linear primal solverをn,pで選ぶ。C/γをvalidation。

---

## 一段先へ

dual内でdataはinner productsだけに現れ、kernel trickが可能になる。

---

## 自分で説明できるか

- 「distance to hyperplane」を式を見ずに説明できるか
- 「margin width」までの論理を一段ずつ再現できるか
- SVM・margin・kernelの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/ml-svm-margin-kernels)
- [10問の演習](../../exercises/ml-svm-margin-kernels)
