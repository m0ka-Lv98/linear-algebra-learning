---
theme: default
routerMode: hash
layout: cover
title: "Deep Reinforcement Learning"
---

# Deep Reinforcement Learning

Course 09｜深層学習

---

## 今回の問い

表形式のQやpolicyをニューラルnetworkへ置き換えると、何が可能になり、何が不安定になるか。

---

## 直感

高次元stateでは表を持てないためfunction approximationを使う。DQNはQ-learningにreplay bufferとtarget networkを加え、PPO等のactor-criticではpolicyとvalueを同時学習する。

---

## 図解

<img src="./assets/course-09/dl-deep-reinforcement-learning.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathcal L(\theta)=E_{(s,a,r,s\prime)\sim D}\left[(r+\gamma\max_{a\prime}Q_{\theta^-}(s\prime,a\prime)-Q_\theta(s,a))^2\right]
$$

---

## 導出

1. tabular Q updateをsquared TD error最小化として書き換える。
2. 相関した逐次sampleをreplay bufferでshuffleする。
3. target networkを遅く更新してmoving targetを緩和する。

---

## 小さい例

画像stateのAtariではCNNがQ(s,a)を出し、ε-greedyで行動を選ぶ。

---

## 条件を外すと

- supervised learningと違いtarget分布自体がpolicyとともに変わる。
- offline dataへ通常のQ-learningを無条件適用するとOOD action overestimationが起こり得る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/dl-deep-reinforcement-learning)

[10問の演習](../../exercises/dl-deep-reinforcement-learning)
