---
theme: default
routerMode: hash
layout: cover
title: "総和・積・添字"
---

# 総和・積・添字

Course 00｜学習準備

---

## 今回の問い

Σ記号を展開したとき、indexの開始・終了・自由添字をどう追うか。

---

## 直感

総和記号は有限個の項を規則的に並べる圧縮記法。indexがdummyか自由かを区別すると行列式を読みやすい。

---

## 図解

<img src="./assets/course-00/prep-sums-products-indices.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\sum_{i=1}^n a_i=a_1+\cdots+a_n
$$

---

## 導出

1. iへ1からnまで順に代入する。
2. 各項a_iを加える。
3. 総和後にはdummy index iは残らない。

---

## 小さい例

Σ_{i=1}^3 i²=1+4+9=14。

---

## 条件を外すと

- 上限nを項数と機械的に同一視せず開始indexも見る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-sums-products-indices)

[10問の演習](../../exercises/prep-sums-products-indices)
