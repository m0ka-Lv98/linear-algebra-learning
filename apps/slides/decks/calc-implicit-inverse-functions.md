---
theme: default
routerMode: hash
layout: cover
title: "陰関数微分と逆関数"
---

# 陰関数微分と逆関数

Course 01｜微積分

---

## 今回の問い

yを明示的に解けない式でも、なぜ dy/dx を計算できるのか。

---

## 直感

F(x,y)=0 で定まる曲線上では y も x に依存して動く。両辺を x で微分すると、y を含む項には連鎖律で y′ が現れ、それを解けば接線の傾きが得られる。

---

## 図解

<img src="./assets/course-01/calc-implicit-inverse-functions.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\frac{dy}{dx}=-\frac{F_x}{F_y}\quad(F_y\ne0)
$$

---

## 導出

1. 恒等式 $F(x,y(x))=0$ を x で微分する。
2. 連鎖律で $F_x+F_y y\prime=0$。
3. $F_y\ne0$ の点では y′ について解ける。

---

## 小さい例

x²+y²=1 なら 2x+2yy′=0 より y′=-x/y。y=0 ではこの表現が壊れ、垂直接線が現れる。

---

## 条件を外すと

- yを定数として微分しない。
- $F_y=0$ の点で公式を機械適用しない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/calc-implicit-inverse-functions)

[10問の演習](../../exercises/calc-implicit-inverse-functions)
