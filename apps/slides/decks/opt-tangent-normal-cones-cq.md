---
theme: default
routerMode: hash
layout: cover
title: "接錐・法錐・制約資格条件"
---

# 接錐・法錐・制約資格条件

Course 06｜最適化

---

## 何を解決するか

KKTのstationarityは、なぜ「目的勾配と制約法線の釣り合い」になるのか。

最適点から一次的に動ける方向の集合がtangent cone。その全方向へ目的関数を減らせない条件は、負の勾配がtangent coneの極coneであるnormal coneに入ること。KKTはnormal coneを制約勾配で表現した形。

---

## 図の意味

<img src="./assets/course-06/opt-tangent-normal-cones-cq.png" style="max-height: 350px; display:block; margin:0 auto;" />

境界線より下がfeasible set C。境界点 $x^*$ から境界に沿う矢印がtangent direction、外向き垂直矢印がnormal。局所最小では目的を下げる方向 $-\nabla f$ がfeasible tangent側へ向けないので、normal coneの中に入る。

---

## 記号

| 記号 | 意味 |
|---|---|
| $T_C(x*)$ | feasible set C の接錐 |
| $N_C(x*)$ | 法錐 |
| $LICQ/Slater$ | 代表的な制約資格条件 |


- $C$：feasible set。
- $T_C(x^*)$：x*でのtangent cone。
- $N_C(x^*)$：normal cone。
- CQ：constraint qualification。

---

## 中心式

$$
-\nabla f(x^*)\in N_C(x^*)
$$

---

## 導出

1. feasible direction d では小さいt>0でx*+tdが許される。
2. 局所最小なら全feasible directionで ∇f(x*)^T d≥0。
3. これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

---

## 省略しない一段

tangent cone $T_C(x^*)$ はfeasible set内から近づける一次方向の集合。局所最小なら任意 $d\in T_C$ に対して $\nabla f(x^*)^Td\ge0$。これは $-\nabla f(x^*)$ がpolar cone $T_C^\circ$ に属することを意味し、凸集合ではこれがnormal cone $N_C$。

KKTでは $N_C$ をactive constraint gradientsの非負結合で表したい。しかし制約のgradientが退化すると、その表現が正しくならない場合がある。LICQやSlaterなどconstraint qualificationは「幾何学的normal cone」と「multiplierで作るnormal」の一致を保証するために必要。

---

## 手計算

**問題**：集合 $C=\{(x_1,x_2):x_2\ge0\}$ の境界点(0,0)でtangent coneとnormal coneを求めよ。

**解答**：feasibleな一次方向は $d_2\ge0$ なので $T_C=\{d:d_2\ge0\}$。normal coneは $v^Td\le0$ が全tangent dで成り立つv、すなわち $v_1=0,v_2\le0$。よって下向き半直線。

---

## 条件を変える

C={x:x\le1}、$f(x)=-x$。最小化では実は下に有界でなく最小なし。一方 $f(x)=x^2$ をCで最小化するとx*=0は内部点でnormal cone={0}、gradient=0。$f(x)=-x$ を区間[-2,1]で最小化ならx*=1、$-\nabla f=1$ が右向きnormalに入る。

---

## どこで壊れるか

KKT multiplierを解けたことだけで最適性を保証しない。非凸問題ではKKTは一般に必要条件止まりで、CQが失敗すると局所最小でもmultiplierが存在しない場合がある。

---

## 次へ

この幾何を理解するとcomplementary slacknessが「active boundaryだけがnormal forceを出す」こととして読める。Fenchel dualityやprojected/proximal methodsでもnormal coneが現れる。

---

[教科書](../../textbook/opt-tangent-normal-cones-cq)　|　[10問の演習](../../exercises/opt-tangent-normal-cones-cq)
