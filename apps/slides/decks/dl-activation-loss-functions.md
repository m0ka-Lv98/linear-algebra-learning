---
theme: default
routerMode: hash
layout: cover
title: "activation関数とloss"
---

# activation関数とloss

Course 09｜深層学習

---

## 今回の問い

activationとlossを「慣例」ではなく勾配伝播と確率modelからどう選ぶか。

---

## 直感

activationは線形層の合成に非線形性を入れる。lossは観測modelのnegative log-likelihoodとして導ける場合が多く、出力activationと組で数値安定性・gradientを読む。

---

## 図解

<img src="./assets/course-09/dl-activation-loss-functions.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\operatorname{ReLU}(z)=\max(0,z),\qquad \frac{\partial L_{BCE}}{\partial z}=\sigma(z)-y
$$

---

## 導出

1. ReLUはz>0でderivative1、z<0で0。
2. binary classificationでは Bernoulli NLL がBCE。
3. $p=σ(z)$ とchain ruleを使うと $dL/dz=p-y$ まで簡約される。
4. BCEWithLogits等はsigmoid+logをまとめてlog-sum-exp形で安定計算する。

---

## 小さい例

z=0,y=1ならp=0.5、gradient=-0.5。gradient descentでzが増え正例確率を上げる。

---

## 条件を外すと

- classificationにMSEが数学的に禁止という意味ではない。
- sigmoid/tanh飽和域とReLU dead unitの失敗modeを区別する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/dl-activation-loss-functions)

[10問の演習](../../exercises/dl-activation-loss-functions)
