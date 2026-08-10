---
theme: default
routerMode: hash
layout: cover
title: "信頼区間"
---

# 信頼区間

Course 03｜確率統計

---

## 今回の問い

信頼区間はどのランダム量を反転して作り、95%という数字は何の確率なのか。

---

## 直感

母数θは頻度論では固定。標本Xから作る区間[L(X),U(X)]がランダム。coverage 95%とは同じ手続きを繰り返したとき95%の区間がθを覆うという性質。

---

## 図解

<img src="./assets/course-03/stat-confidence-intervals.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
P_\theta\{L(X)\le\theta\le U(X)\}=1-\alpha
$$

---

## 導出

1. θを含むpivot Tを選び、その分布の中央1-α領域を取る。
2. 確率不等式をθについて代数的に解き直す。
3. 正規母集団でσ既知ならZ pivot、σ未知なら独立なχ²量を含むためt pivotになる。
4. 解析的pivotが難しい場合はbootstrap/profile likelihood等を検討する。

---

## 小さい例

X̄=10, SE=2なら正規近似95%区間は10±1.96×2=[6.08,13.92]。観測後に「θが95%確率で入る」とは頻度論の標準解釈ではない。

---

## 条件を外すと

- 標準偏差と標準誤差を混同しない。
- optional stoppingやmodel misspecificationでcoverageが崩れ得る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/stat-confidence-intervals)

[10問の演習](../../exercises/stat-confidence-intervals)
