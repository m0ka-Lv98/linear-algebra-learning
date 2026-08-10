---
theme: default
routerMode: hash
layout: cover
title: "Pythonの式・変数・関数"
---

# Pythonの式・変数・関数

Course 00｜学習準備

---

## 今回の問い

数学的関数とPython関数の対応・相違をどう意識するか。

---

## 直感

Python関数は入力を受けて計算しreturnする手続き。数学関数と対応させるときは副作用、dtype、例外、有限精度など実装特有の要素を分ける。

---

## 図解

<img src="./assets/course-00/prep-python-expressions-functions.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
y=f(x)
$$

---

## 導出

1. input contractを決める。
2. 式/algorithmでoutputを計算する。
3. return valueと副作用を分離する。

---

## 小さい例

def square(x): return x*x は実数のx²に対応するが、整数overflow等は実装環境依存。

---

## 条件を外すと

- 変数代入=数学的等号と思わない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-python-expressions-functions)

[10問の演習](../../exercises/prep-python-expressions-functions)
