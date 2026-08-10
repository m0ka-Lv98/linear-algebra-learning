---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "最適性条件"
---

# 最適性条件

Course 06｜最適化｜Topic 04/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

最適性条件の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `opt-smoothness-strong-convexity` で得た概念を使い、ここでは 最適性条件 へ進む。

---

## 直感

最適性条件は「これ以上改善できる方向がない」ことを勾配や劣勾配で表す。



---

## 図解

<img src="./assets/course-06/opt-optimality-conditions.png" style="max-height: 350px; display:block; margin:0 auto;" />

等高線上で勾配が0になる点と境界点を比較する。 内部点では下降可能な方向が残らないためgradientが0になる。境界がある場合は許される方向だけで改善不能という条件へ変わり、単純なgradient=0では足りない。

---

## 記号と代表式

- $\partial f(x)$：subdifferential
- $0\in\partial f(x^*)$：convex最適性条件
- $\nabla f(x^*)=0$：smooth unconstrainedの場合

$$
\mathbf{0}\in\partial f(\mathbf{x}^{\ast})
$$

---

## 導出 1

$f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。

---

## 導出 2

0∈∂f(x*)なら $f(y)\ge f(x*)$ for all y。

---

## 例題

$f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

---

## 条件を変えるとどうなるか

gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

---

## よくある誤解

最適性条件では、式へ数値を代入するだけでは不十分である。gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

solver stopではgradient normだけでなくconstraint violation/KKT residualをproblem typeに応じて見る。

---

## 一段先へ

最適方向が分かってもstep sizeが不適切なら下降しない。line searchへ進む。

---

## 自分で説明できるか

- 「convex first-order inequality」を式を見ずに説明できるか
- 「smooth case」までの論理を一段ずつ再現できるか
- 最適性条件の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/opt-optimality-conditions)
- [10問の演習](../../exercises/opt-optimality-conditions)
