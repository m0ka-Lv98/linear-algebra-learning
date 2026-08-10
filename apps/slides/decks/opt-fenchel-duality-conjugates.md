---
theme: default
routerMode: hash
layout: cover
title: "Fenchel共役とFenchel双対"
---

# Fenchel共役とFenchel双対

Course 06｜最適化

---

## 今回の問い

関数を傾き空間へ写すFenchel共役が、なぜ双対問題と正則化の理解に役立つか。

---

## 直感

共役 f*(y) は「傾きyを持つ線形関数がfからどれだけ上へ離れられるか」の最大値。Fenchel–Young不等式を通じてprimalとdualを結ぶ。

---

## 図解

<img src="./assets/course-06/opt-fenchel-duality-conjugates.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
f^*(y)=\sup_x\{y^Tx-f(x)\}
$$

---

## 導出

1. 定義から任意x,yについて y^Tx-f(x)≤f*(y)。
2. 並べ替えて f(x)+f*(y)≥x^Ty (Fenchel–Young)。
3. 等号条件 y∈∂f(x) がprimal-dual最適性を与える。

---

## 小さい例

f(x)=x²/2 の共役は y²/2。x=yでFenchel–Youngが等号になる。

---

## 条件を外すと

- Legendre transformと完全に同じ条件だと思わない。
- supが有限になる定義域を確認する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/opt-fenchel-duality-conjugates)

[10問の演習](../../exercises/opt-fenchel-duality-conjugates)
