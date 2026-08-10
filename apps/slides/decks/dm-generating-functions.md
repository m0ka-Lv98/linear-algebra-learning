---
theme: default
routerMode: hash
layout: cover
title: "母関数"
---

# 母関数

Course 04｜離散数学

---

## 今回の問い

数列全体を1本の形式的な級数へ埋め込むと、漸化式がなぜ代数計算へ変わるのか。

---

## 直感

母関数 A(x)=Σa_nx^n は、係数に数列を保存した形式的power series。index shiftがxの掛け算へ変換されるため、漸化式を方程式として解ける。

---

## 図解

<img src="./assets/course-04/dm-generating-functions.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
A(x)=\sum_{n\ge0}a_nx^n
$$

---

## 導出

1. 漸化式の両辺にx^nを掛けてnについて足す。
2. a_{n-1}のshiftはxA(x)として表せる。
3. A(x)の代数方程式を解き、部分分数等で係数を読み戻す。

---

## 小さい例

a_n=a_{n-1}, a_0=1ならA(x)=1+xA(x)、よってA=1/(1-x)=Σx^n。

---

## 条件を外すと

- 解析的収束が不要な形式的母関数の議論と、関数としての収束を区別する。
- 初期条件の補正項を落とさない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/dm-generating-functions)

[10問の演習](../../exercises/dm-generating-functions)
