---
theme: default
routerMode: hash
layout: cover
title: "多重検定とFDR"
---

# 多重検定とFDR

Course 03｜確率統計

---

## 今回の問い

何百・何千個も検定すると、なぜ偶然の有意差が増え、どう制御するか。

---

## 直感

各検定の誤陽性率が小さくても、検定数が増えると少なくとも1つ誤陽性を出す確率が上がる。FWERとFDRは異なる誤り基準を制御する。

---

## 図解

<img src="./assets/course-03/stat-multiple-testing-fdr.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]
$$

---

## 導出

1. 多数のp値を得る。
2. Benjamini–Hochbergでは昇順 p_(i) と i q/m を比較する。
3. 条件を満たす最大iまでを棄却し、発見集合中の偽発見割合を平均的に制御する。

---

## 小さい例

m=1000の探索では未補正p<0.05だけで多数の偶然ヒットが期待される。

---

## 条件を外すと

- FWERとFDRを同じ保証と思わない。
- 依存構造によって手法の条件が変わる。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/stat-multiple-testing-fdr)

[10問の演習](../../exercises/stat-multiple-testing-fdr)
