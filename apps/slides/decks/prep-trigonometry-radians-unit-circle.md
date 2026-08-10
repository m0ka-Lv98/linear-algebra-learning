---
theme: default
routerMode: hash
layout: cover
title: "三角関数・ラジアン・単位円"
---

# 三角関数・ラジアン・単位円

Course 00｜学習準備

---

## 今回の問い

角度をラジアンで測ると、なぜ微積分の三角関数公式が自然な形になるのか。

---

## 直感

単位円上の点を角度で動かすと、横座標が cos、縦座標が sin になる。ラジアンは円弧長そのものなので、微小角と微小変位を同じ尺度で比較できる。

---

## 図解

<img src="./assets/course-00/prep-trigonometry-radians-unit-circle.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\sin^2\theta+\cos^2\theta=1
$$

---

## 導出

1. 単位円上の点を $(x,y)=(\cos\theta,\sin\theta)$ と置く。
2. 単位円の方程式 $x^2+y^2=1$ へ代入する。
3. $\cos^2\theta+\sin^2\theta=1$ を得る。

---

## 小さい例

θ=π/3 では cosθ=1/2, sinθ=√3/2 なので二乗和は1。度数法60°と同じ角だが、微分ではπ/3というラジアン表現を使う。

---

## 条件を外すと

- 度とラジアンを式の中で混在させない。
- sin^{-1}x を 1/sin x と読まない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-trigonometry-radians-unit-circle)

[10問の演習](../../exercises/prep-trigonometry-radians-unit-circle)
