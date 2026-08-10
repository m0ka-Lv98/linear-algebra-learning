---
theme: default
routerMode: hash
layout: cover
title: "policy gradientとREINFORCE"
---

# policy gradientとREINFORCE

Course 08｜機械学習

---

## 今回の問い

価値のargmaxを介さず、確率policyそのものを期待returnが増える方向へどう更新するか。

---

## 直感

trajectory確率のlog微分を使うと、環境遷移を微分せずに期待returnのgradientをpolicyのlog-probabilityで表せる。

---

## 図解

<img src="./assets/course-08/ml-policy-gradient-reinforce.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\nabla_\theta J(\theta)=E_\pi\left[\sum_t G_t\nabla_\theta\log\pi_\theta(A_t|S_t)\right]
$$

---

## 導出

1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。
2. $\nabla p_θ=p_θ\nabla\log p_θ$ のlog-derivative trickを使う。
3. 環境transitionはθに依存しないのでtrajectory log-probabilityのgradientはpolicy log-probabilityの和だけ残る。

---

## 小さい例

良いreturnを得たactionのlog-probabilityを上げ、悪いreturnでは下げる。baselineを引いても期待gradientは変えずvarianceを減らせる。

---

## 条件を外すと

- returnを微分するのではない。
- 高variance estimatorなのでbaseline/advantageが重要。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/ml-policy-gradient-reinforce)

[10問の演習](../../exercises/ml-policy-gradient-reinforce)
