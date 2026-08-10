---
theme: default
routerMode: hash
layout: cover
title: "Mirror descentとBregman divergence"
---

# Mirror descentとBregman divergence

Course 06｜最適化

---

## 今回の問い

Euclidean距離が自然でない確率simplexなどで、勾配法のgeometryをどう変えるか。

---

## 直感

mirror descentは、現在点近傍をEuclidean二乗距離で罰する代わりに、strictly convexなmirror mapが作るBregman divergenceを使う。

---

## 図解

<img src="./assets/course-06/opt-mirror-descent-bregman.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
x_{t+1}=\arg\min_{x\in C}\{\eta\nabla f(x_t)^Tx+D_\psi(x,x_t)\}
$$

---

## 導出

1. 勾配で目的を一次近似する。
2. 動きすぎをDψで罰する。
3. ψ=||x||²/2ならDψ=||x-y||²/2となりprojected gradientへ戻る。

---

## 小さい例

確率simplexでnegative entropyをψに選ぶとmultiplicative/exponentiated updateが得られる。

---

## 条件を外すと

- Bregman divergenceは一般に対称でなくmetricでもない。
- mirror mapのdomainと制約集合の関係を確認する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/opt-mirror-descent-bregman)

[10問の演習](../../exercises/opt-mirror-descent-bregman)
