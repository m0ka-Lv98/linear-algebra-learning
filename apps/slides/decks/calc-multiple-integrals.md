---
theme: default
routerMode: hash
layout: cover
title: "重積分"
---

# 重積分

Course 01｜微積分

---

## 今回の問い

1変数の「面積の足し上げ」は、2変数・3変数でどのように拡張されるか。

---

## 直感

領域を小さな長方形や直方体へ分割し、各セルでの関数値×セル面積（体積）を足す。極限を取ると重積分になる。

---

## 図解

<img src="./assets/course-01/calc-multiple-integrals.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\iint_D f(x,y)\,dA
$$

---

## 導出

1. Dを小セルへ分割する。
2. 各セルで代表点を選び $f(x_i,y_i)\Delta A_i$ を足す。
3. 最大セル径を0へ近づけた極限が二重積分。

---

## 小さい例

D=[0,1]², f=x+y なら反復積分 ∫₀¹∫₀¹(x+y)dxdy=1。

---

## 条件を外すと

- 積分順序を変えると境界式も変わることがある。
- dAを単なる記号でなく座標系に依存する面積要素として読む。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/calc-multiple-integrals)

[10問の演習](../../exercises/calc-multiple-integrals)
