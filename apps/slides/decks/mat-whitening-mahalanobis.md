---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "whiteningとMahalanobis距離"
---

# whiteningとMahalanobis距離

Course 07｜データ解析の行列手法｜Topic 05/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

whiteningとMahalanobis距離の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `mat-pca-svd-computation` で得た概念を使い、ここでは whiteningとMahalanobis距離 へ進む。

---

## 直感

PCAはデータの分散が大きい直交方向を順に選び、低次元へ射影する。



---

## 図解

<img src="./assets/course-07/mat-whitening-mahalanobis.png" style="max-height: 350px; display:block; margin:0 auto;" />

細長い点群と主成分軸、射影点を描く。 点群の最も長い方向が第一主成分である。各点をその軸へ直交射影した座標の分散が最大になる方向を探す問題が固有値/SVDへつながる。

---

## 記号と代表式

- $\Sigma=V\Lambda V^T$
- $z=\Lambda^{-1/2}V^T(x-\mu)$：whitened coordinate
- $d_M²=(x-\mu)^T\Sigma^{-1}(x-\mu)$

$$
d_M^2=(\mathbf{x}-\boldsymbol{\mu})^{\mathsf T}\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})
$$

---

## 導出 1

$Cov(A(X-\mu))=A\Sigma A^T$。

---

## 導出 2

$A\Sigma A^T=Λ^{-1/2}V^TVΛV^TVΛ^{-1/2}=I$。

---

## 例題

variance100のdirectionで差5はsmall in SD units、variance1 direction差5はlarge。Mahalanobisはこのscaleを反映。

---

## 条件を変えるとどうなるか

Σ singularならordinary inverse不可。small eigenvaluesもnoise amplification。pseudoinverse/regularizationが必要。

---

## よくある誤解

whiteningとMahalanobis距離では、式へ数値を代入するだけでは不十分である。Σ singularならordinary inverse不可。small eigenvaluesもnoise amplification。pseudoinverse/regularizationが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

Cholesky solveでdistance計算、inverseを作らない。estimated covarianceのshrinkageも検討。

---

## 一段先へ

noise covarianceでwhitenしてleast squaresを解くとGLS/WLSへつながる。

---

## 自分で説明できるか

- 「linear transform covariance」を式を見ずに説明できるか
- 「distance」までの論理を一段ずつ再現できるか
- whiteningとMahalanobis距離の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/mat-whitening-mahalanobis)
- [10問の演習](../../exercises/mat-whitening-mahalanobis)
