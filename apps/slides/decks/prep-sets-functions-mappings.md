---
theme: default
title: "集合・関数・写像"
info: "集合、関数、定義域、終域、値域、合成、逆関数の基本を学ぶ"
class: text-center
drawings:
  persist: false
---

# 集合・関数・写像

独自補助教材。数学的な入力と出力の関係を読みます。

---

# 集合とは何か

集合は対象をひとまとまりにしたものです。\(A=\{1,2,3\}\) と書きます。

---

# 要素と部分集合

\(2\in A\) は要素、\(\{2\}\subseteq A\) は集合どうしの関係です。

---

# 集合の基本演算

\[
A=\{1,2,3\},\ B=\{2,3,4\}
\]
\[
A\cup B=\{1,2,3,4\},\quad A\cap B=\{2,3\},\quad A\setminus B=\{1\}
\]

---

# Cartesian積

\[
A\times B=\{(a,b)\mid a\in A, b\in B\}
\]

順序対では順番を区別します。

---

# 関数とは何か

\[
f\colon A\to B
\]

定義域の各要素に、出力をちょうど1つ対応させます。

---

# 定義域・終域・値域

\[
f\colon\mathbb{R}\to\mathbb{R},\quad f(x)=x^2
\]

定義域は \(\mathbb{R}\)、終域も \(\mathbb{R}\)、値域は \([0,\infty)\) です。

---

# 像と逆像

\[
f(S)=\{f(x)\mid x\in S\},\quad f^{-1}(T)=\{x\mid f(x)\in T\}
\]

逆像は、逆関数がなくても定義できます。

---

# 関数の合成

\[
f(x)=2x+1,\quad g(x)=x^2
\]
\[
(g\circ f)(x)=(2x+1)^2,\quad (f\circ g)(x)=2x^2+1
\]

右側の \(f\) を先に適用します。

---

# 単射・全射・全単射

単射は異なる入力が同じ出力にならない関数、全射は終域をすべて覆う関数です。両方を満たすのが全単射です。

---

# 逆関数と機械学習

全単射 \(f\colon A\to B\) は逆関数 \(f^{-1}\colon B\to A\) を持ちます。モデルは
\[
f_{\boldsymbol{\theta}}\colon\mathbb{R}^{d}\to\mathbb{R}^{K}
\]
のような関数として読めます。

---

# 理解確認とリンク

1. \(x\in A\) は要素、\(A\subseteq B\) は集合間の関係。
2. \(f\colon A\to B\) でAは定義域、Bは終域。
3. \(g\circ f\) はfを先に適用します。

<p><a href="../../textbook/prep-sets-functions-mappings">教科書：集合・関数・写像</a></p>
<p><a href="../../exercises/prep-sets-functions-mappings">演習：集合・関数・写像</a></p>
