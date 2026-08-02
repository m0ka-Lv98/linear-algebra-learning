---
theme: default
title: "数式・記号・型・次元"
info: "スカラー、ベクトル、行列、テンソルと、数式・配列の型や次元を区別する"
class: text-center
drawings:
  persist: false
---

# 数式・記号・型・次元

独自補助教材。MITの線形代数教材へ進む前に、量の型とshapeを確認します。

---

# なぜ型とshapeを最初に確認するのか

演算の可否と結果の形を、計算前に予測できるからです。

---

# スカラー

1個の実数を (a in \mathbb{R}) と書きます。通常の小文字で表します。

---

# ベクトル

\[
\mathbf{x} =
\begin{bmatrix}2\\-1\\3\end{bmatrix}
\in \mathbb{R}^{3}
\]

本教材では数式上のベクトルを列ベクトルとして扱います。

---

# 行列

\[
\mathbf{A} =
\begin{bmatrix}1&2&0\\0&-1&3\end{bmatrix}
\in \mathbb{R}^{2\times3}
\]

太字大文字。2行、3列です。

---

# 3階以上の配列

\[
\mathcal{X}\in\mathbb{R}^{32\times128\times768}
\]

32はバッチ、128はトークンまたは系列位置、768は特徴量です。数学上の厳密なtensor理論は後続Topicで扱います。

---

# shape・axis・要素数・次元

`shape`は各axisの長さ、`ndim`はaxis数、要素数はshapeの積です。数学上の次元（基底の数）と配列のshapeは同じ意味ではありません。

---

# 行列積のshape

\[
\mathbf{A}\in\mathbb{R}^{m\times n},\quad
\mathbf{x}\in\mathbb{R}^{n}
\quad\Longrightarrow\quad
\mathbf{A}\mathbf{x}\in\mathbb{R}^{m}
\]

内側の次元が一致し、外側の次元が残ります。

---

# データ行列

\[
\mathbf{X}\in\mathbb{R}^{N\times D}
\]

この教材では行を観測、列を特徴量とします。ただし軸の意味は教材や論文ごとに確認します。

---

# バッチ・系列・特徴量

\[
\mathcal{X}\in\mathbb{R}^{32\times128\times768}
\]

32：バッチ、128：系列長、768：特徴量。変換を最後のaxisへ適用すると、出力の特徴量だけが変わります。

---

# 理解確認

1. \(\mathbf{A}\in\mathbb{R}^{4\times3}\)、\(\mathbf{x}\in\mathbb{R}^{3}\) の積は4要素。
2. 100件・20特徴量のデータ行列は \(100\times20\)。
3. `shape == (3,)` は行・列を明示しない1次元配列です。

---

# 教科書と演習へのリンク

<p><a href="../../textbook/prep-symbols-types-shapes">教科書：数式・記号・型・次元</a></p>
<p><a href="../../exercises/prep-symbols-types-shapes">演習：数式・記号・型・次元</a></p>
