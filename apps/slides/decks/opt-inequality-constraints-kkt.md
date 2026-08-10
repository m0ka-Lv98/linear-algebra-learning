---
theme: default
routerMode: hash
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "不等式制約と相補性"
---

# 不等式制約と相補性

Course 06｜最適化｜Topic 12/20

---
layout: center
---

## 今回の問い

不等式制約と相補性の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `opt-equality-constrained-kkt` で得た概念を使い、ここでは 不等式制約と相補性 へ進む。

---

## 直感

制約付き最適化では自由に動ける方向が限定され、最適点で目的勾配と制約の法線が釣り合う。



---

## 図解

<img src="./assets/course-06/opt-inequality-constraints-kkt.png" style="max-height: 350px; display:block; margin:0 auto;" />

斜め直線がactive boundary $g(\mathbf x)=0$、塗られた側がfeasible region。$\mathbf x^*$ から境界に沿う矢印がtangent、外向き矢印が $\nabla g$。目的gradientは反対向きで、active caseのstationarity $\nabla f=-\lambda\nabla g$ を直接表す。

---

## 記号と代表式

- $g_i(x)\le0$
- $\lambda_i\ge0$
- $\lambda_i g_i(x)=0$：complementarity

$$
\lambda_i g_i(\mathbf{x})=0,\quad\lambda_i\ge0
$$

---

## 導出 1

$g_i(x*)<0$ なら境界から余裕があり、そのconstraintはlocal tangentを制限しない。したがってλ_i=0がcomplementarityで表される。

---

## 導出 2

$g_i=0$ ではλ_i≥0がobjective gradientをfeasible側へ支えるnormal forceの係数。

---

## 例題

minimize (x-2)² subject x≤1。unconstrained min2はinfeasible、境界x*=1。g=x-1, gradient f=-2 at1なので -2+λ=0→λ=2。

---

## 条件を変えるとどうなるか

nonconvexではKKTを満たしてもglobal optimumとは限らない。constraint qualification failureでoptimumがKKTを満たさないことも。

---

## よくある誤解

不等式制約と相補性では、式へ数値を代入するだけでは不十分である。nonconvexではKKTを満たしてもglobal optimumとは限らない。constraint qualification failureでoptimumがKKTを満たさないことも。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

solver statusとKKT residual、constraint violation、dual signを確認。scaling不良でresidual解釈が難しくなる。

---

## 一段先へ

simple convex setへ直接projectionできる場合、multiplierを明示せずprojected gradientでfeasibilityを保てる。

---

## 自分で説明できるか

- 「inactive constraint」を式を見ずに説明できるか
- 「stationarity」までの論理を一段ずつ再現できるか
- 不等式制約と相補性の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/opt-inequality-constraints-kkt)
- [10問の演習](../../exercises/opt-inequality-constraints-kkt)
