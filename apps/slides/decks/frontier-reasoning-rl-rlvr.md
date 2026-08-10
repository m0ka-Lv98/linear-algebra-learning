---
theme: default
routerMode: hash
layout: cover
title: "推論RLとverifiable reward"
---

# 推論RLとverifiable reward

Course 10｜Frontier

---

## 今回の問い

数学・codingのように答えを自動検証できる課題では、preference modelを介さずどのようにRL信号を作れるか。

---

## 直感

verifiable taskでは最終答案の正誤、unit test、formal checkerなどをrewardとして使える。人間preferenceより低コストで大量sampleを評価できる一方、reward仕様の範囲外の品質は保証しない。

---

## 図解

<img src="./assets/course-10/frontier-reasoning-rl-rlvr.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\max_\theta\;E_{y\sim\pi_\theta(\cdot|x)}[r(x,y)]\quad\text{with policy regularization}
$$

---

## 導出

1. promptから複数rolloutをsampleする。
2. verifierで各responseへrewardを付ける。
3. relative/normalized rewardをpolicy gradient estimatorへ入れ、policy collapseを防ぐregularizationと併用する。

---

## 小さい例

数学問題でfinal answerをsymbolic checkerで検証し、正解rolloutの確率を上げる。

---

## 条件を外すと

- verifierが測らないreadabilityやsafetyは自動的に改善しない。
- reward hackingとdata leakageを監視する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-reasoning-rl-rlvr)

[10問の演習](../../exercises/frontier-reasoning-rl-rlvr)
