---
theme: default
routerMode: hash
layout: cover
title: "数式・記号・型・次元"
---

# 数式・記号・型・次元

Course 00｜学習準備

---

## 何を身につけるか

数式を計算する前に、「その記号は何型で、どのshapeを持ち、演算後のshapeは何になるか」をどう判断するか。

---

## 図

<img src="./assets/course-00/prep-symbols-types-shapes.png" style="max-height: 350px; display:block; margin:0 auto;" />

図は左からscalar、vector、matrix、tensorを並べている。scalarは軸を持たない1個の値、vectorは1本のindex、matrixは行・列の2本のindexを持つ。tensorはさらにbatch・height・width・channelのような複数軸を持つ。ここで数学の「ベクトル空間の次元」とNumPyの `ndim` は別物で、shape `(2,3,4)` の配列は `ndim=3` だが24個の実数を持つため、全要素を並べれば $\mathbb R^{24}$ の点として扱える。

---

## 定義と理由

### 1. 型を決める
スカラー $a\in\mathbb R$、ベクトル $\mathbf x\in\mathbb R^n$、行列 $\mathbf A\in\mathbb R^{m\times n}$ を区別する。ベクトルは太字小文字、行列は太字大文字で表す。

### 2. shapeを演算の前に確認する
$\mathbf A\mathbf x$ が定義できるのは $\mathbf A\in\mathbb R^{m\times n}$ と $\mathbf x\in\mathbb R^n$ の内側の次元nが一致するとき。結果は $\mathbb R^m$。行列積 $\mathbf A\mathbf B$ なら $(m,n)(n,p)\to(m,p)$。

### 3. 数学上の型とコード上の配列を区別する
数学の列ベクトル $\mathbf x\in\mathbb R^3$ をNumPyで `shape==(3,)` と表すことも `(3,1)` と表すこともあるが、broadcastingや `@` の挙動は異なる。数値が同じでもshapeが同じとは限らない。

---

## 具体例

**例1**：$\mathbf A\in\mathbb R^{2\times3}$、$\mathbf x\in\mathbb R^3$ なら $\mathbf A\mathbf x\in\mathbb R^2$。

**例2**：$\mathbf A\in\mathbb R^{2\times3}$ と $\mathbf B\in\mathbb R^{4\times2}$ の $\mathbf A\mathbf B$ は内側3と4が一致しないため未定義。値を計算する前にshapeだけで判定できる。

---

## ここで誤ると

「要素数が同じなら同じ型」と考えるのは誤り。`(6,)`, `(2,3)`, `(1,6)` は6値を持つが、index構造と演算の意味が違う。

---

## 次へ

この習慣は線形代数の行列積、確率のrandom vector、機械学習のbatch×feature、深層学習のtensorで常に使う。

---

[教科書](../../textbook/prep-symbols-types-shapes)　|　[演習](../../exercises/prep-symbols-types-shapes)
