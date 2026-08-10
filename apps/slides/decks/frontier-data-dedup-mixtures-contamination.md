---
theme: default
routerMode: hash
layout: cover
title: "pretraining data：dedup・mixture・contamination"
---

# pretraining data：dedup・mixture・contamination

Course 10｜Frontier

---

## 今回の問い

同じtoken数でも、重複・domain mixture・benchmark contaminationで学習結果がなぜ変わるか。

---

## 直感

training dataは単なる量ではなく分布。重複は特定sampleを過度に重み付けし、mixture weightは能力配分を変え、evaluation setの混入は測定を汚染する。

---

## 図解

<img src="./assets/course-10/frontier-data-dedup-mixtures-contamination.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
D_{train}=\sum_k w_kD_k,\quad w_k\ge0,\;\sum_kw_k=1
$$

---

## 導出

1. 各sourceをdomain distributionとしてみなす。
2. sampling weight w_kが期待gradientへの寄与を決める。
3. dedup/filteringはeffective distributionそのものを変えるため、token countだけで比較できない。

---

## 小さい例

code data weightを増やせばcoding能力向上を狙えるが、他domain performanceやlanguage coverageとのtrade-offがあり得る。

---

## 条件を外すと

- benchmark score上昇をcontamination無しで確認する。
- dedup閾値・normalization手順を記録する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-data-dedup-mixtures-contamination)

[10問の演習](../../exercises/frontier-data-dedup-mixtures-contamination)
