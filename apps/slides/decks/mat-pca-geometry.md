---
theme: default
routerMode: hash
layout: cover
title: "PCAの幾何学"
---

# PCAの幾何学

Course 07｜データ解析

---

## 今回の問い

「分散最大化」と「再構成誤差最小化」が、なぜ同じ主成分を与えるのか。

---

## 直感

中心化dataを単位ベクトルuへ射影したときのエネルギーを最大化する方向が第一主成分。Pythagorasにより全エネルギー=射影エネルギー+直交残差エネルギーなので、一方の最大化は他方の最小化と同値。

---

## 図解

<img src="./assets/course-07/mat-pca-geometry.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\max_{\|u\|=1}\|Xu\|^2\iff\min_{\|u\|=1}\|X-Xuu^T\|_F^2
$$

---

## 導出

1. 各row x_iを span(u) とその直交補へ分解する。
2. $||x_i||²=(x_i^Tu)²+||x_i-(x_i^Tu)u||²$。
3. iについて足すと左辺総energyはuに依存しない。
4. したがってscore energy最大化とresidual energy最小化が同値。Rayleigh quotientからuはX^TXの最大固有値固有ベクトル。

---

## 小さい例

細長い楕円状点群では長軸方向uが第一PC。そこへ射影すると分散を最も保ち、直交再構成残差が最小。

---

## 条件を外すと

- centerしないPCAでは「分散」解釈が変わる。
- feature scalingにより主成分が大きく変わり得る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/mat-pca-geometry)

[10問の演習](../../exercises/mat-pca-geometry)
