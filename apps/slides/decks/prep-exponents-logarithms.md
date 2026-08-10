---
theme: default
routerMode: hash
layout: cover
title: "指数と対数"
---

# 指数と対数

Course 00｜学習準備

---

## 今回の問い

指数と対数を逆関数として理解すると、積・冪・微分の式をどう整理できるか。

---

## 直感

log_b xは「bを何乗するとxか」を返す。積が和に変わるためlikelihoodの積をlog-likelihoodの和へ変換するなど、後続統計・MLで頻出する。

---

## 図解

<img src="./assets/course-00/prep-exponents-logarithms.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\log_b(xy)=\log_bx+\log_by
$$

---

## 導出

1. x=b^u,y=b^vと置く。
2. xy=b^{u+v}。
3. 両辺のlog_bを取ればlog_b(xy)=u+v。

---

## 小さい例

log_2 8=3。ln(e^x)=x。

---

## 条件を外すと

- log(x+y)をlog x+log yとしない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-exponents-logarithms)

[10問の演習](../../exercises/prep-exponents-logarithms)
