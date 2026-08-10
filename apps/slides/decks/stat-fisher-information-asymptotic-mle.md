---
theme: default
routerMode: hash
layout: cover
title: "Fisher情報量とMLEの漸近分布"
---

# Fisher情報量とMLEの漸近分布

Course 03｜確率統計

---

## 今回の問い

尤度の「尖り具合」が、推定量の精度とどう結びつくか。

---

## 直感

真のパラメータ付近でlog-likelihoodが急に曲がるほど、少しパラメータをずらしたときデータ分布が大きく変わる。これを平均曲率として測るのがFisher情報量。

---

## 図解

<img src="./assets/course-03/stat-fisher-information-asymptotic-mle.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})
$$

---

## 導出

1. score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。
2. MLEではscore=0なので、$0\approx s(θ_0)+(θ̂-θ_0)ℓ\prime\prime(θ_0)$。
3. scoreのCLTとHessianの大数則から漸近正規性を得る。

---

## 小さい例

Bernoulli(p) 1標本の情報量は1/[p(1-p)]。n標本ではn倍になり、MLEの分散はおおよそp(1-p)/n。

---

## 条件を外すと

- 有限標本で漸近近似が正確とは限らない。
- 境界パラメータや識別不能modelでは通常の正則条件が壊れる。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/stat-fisher-information-asymptotic-mle)

[10問の演習](../../exercises/stat-fisher-information-asymptotic-mle)
