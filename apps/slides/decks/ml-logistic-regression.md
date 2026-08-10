---
theme: default
routerMode: hash
layout: cover
title: "logistic回帰"
---

# logistic回帰

Course 08｜機械学習

---

## 今回の問い

Bernoulli確率modelからcross entropy、gradient、Hessianがどう一続きに導かれるか。

---

## 直感

logit z=x^Tβをsigmoidで確率pへ写し、観測y∈{0,1}をBernoulliと仮定する。lossは任意に選んだ罰則でなくnegative log-likelihood。

---

## 図解

<img src="./assets/course-08/ml-logistic-regression.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathcal L(\beta)=-\sum_i[y_i\log p_i+(1-y_i)\log(1-p_i)]
$$

---

## 導出

1. Bernoulli likelihood $p_i^{y_i}(1-p_i)^{1-y_i}$ を全sampleで掛ける。
2. logを取りnegativeにするとcross entropyの和。
3. $dL/dz_i=p_i-y_i$ が整理され、gradientは $X^T(p-y)$。
4. さらに微分するとHessian $X^T R X$, R=diag(p_i(1-p_i))≥0 なのでconvex。

---

## 小さい例

1sample x=1, y=1, z=0ならp=0.5、dL/dz=-0.5なのでgradient descentはzを上げる。

---

## 条件を外すと

- sigmoid出力へlogを直接計算してoverflow/underflowさせない。
- 完全分離では非正則化MLEが発散し得る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/ml-logistic-regression)

[10問の演習](../../exercises/ml-logistic-regression)
