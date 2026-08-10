# 数式・記号・型・次元：教科書

Course 00｜学習準備

## このTopicの目的

数式を計算する前に、「その記号は何型で、どのshapeを持ち、演算後のshapeは何になるか」をどう判断するか。

## 図の意味

<img src="/visuals/course-00/prep-symbols-types-shapes.png" alt="数式・記号・型・次元の図解" style="max-height: 480px; display:block; margin:0 auto;" />

図は左からscalar、vector、matrix、tensorを並べている。scalarは軸を持たない1個の値、vectorは1本のindex、matrixは行・列の2本のindexを持つ。tensorはさらにbatch・height・width・channelのような複数軸を持つ。ここで数学の「ベクトル空間の次元」とNumPyの `ndim` は別物で、shape `(2,3,4)` の配列は `ndim=3` だが24個の実数を持つため、全要素を並べれば $\mathbb R^{24}$ の点として扱える。

## 定義から順に理解する

### 1. 型を決める
スカラー $a\in\mathbb R$、ベクトル $\mathbf x\in\mathbb R^n$、行列 $\mathbf A\in\mathbb R^{m\times n}$ を区別する。ベクトルは太字小文字、行列は太字大文字で表す。

### 2. shapeを演算の前に確認する
$\mathbf A\mathbf x$ が定義できるのは $\mathbf A\in\mathbb R^{m\times n}$ と $\mathbf x\in\mathbb R^n$ の内側の次元nが一致するとき。結果は $\mathbb R^m$。行列積 $\mathbf A\mathbf B$ なら $(m,n)(n,p)\to(m,p)$。

### 3. 数学上の型とコード上の配列を区別する
数学の列ベクトル $\mathbf x\in\mathbb R^3$ をNumPyで `shape==(3,)` と表すことも `(3,1)` と表すこともあるが、broadcastingや `@` の挙動は異なる。数値が同じでもshapeが同じとは限らない。

## scalar・vector・matrixを成分で読む

スカラーは1個の値なので添字を持たない。ベクトル $\mathbf x\in\mathbb R^n$ は

$$
\mathbf x=\begin{bmatrix}x_1\\\vdots\\x_n\end{bmatrix}
$$

のように $n$ 個の成分を持つ。行列 $\mathbf A\in\mathbb R^{m\times n}$ は $m$ 行 $n$ 列で、成分 $A_{ij}$ の第1添字 $i$ が行、第2添字 $j$ が列を表す。

行列–ベクトル積は

$$
(\mathbf A\mathbf x)_i=\sum_{j=1}^n A_{ij}x_j
$$

なので、出力成分 $i$ を1つ固定すると、行 $i$ と $\mathbf x$ の対応成分を掛けて足している。ここから結果が $m$ 成分になる理由も分かる。

## 「次元」という言葉の3つの意味を混ぜない

1. **ベクトル空間の次元**：$\mathbb R^n$ の基底の本数は $n$。
2. **行列のサイズ**：$m\times n$ は行数と列数。
3. **NumPyの `ndim`**：配列が何本のaxisを持つか。

たとえばshape `(2,3,4)` のNumPy配列は `ndim=3` だが24個の実数を持つ。これをflattenすれば $\mathbb R^{24}$ の1点として扱える。`ndim=3` と「数学的次元24」は同じ意味ではない。

## shapeだけでエラーを予測する練習

$\mathbf A\in\mathbb R^{4\times3}$、$\mathbf B\in\mathbb R^{3\times2}$、$\mathbf x\in\mathbb R^3$ とする。

- $\mathbf A\mathbf x$：$(4,3)(3)\to(4)$ なので定義可能。
- $\mathbf A\mathbf B$：$(4,3)(3,2)\to(4,2)$。
- $\mathbf B\mathbf A$：$(3,2)(4,3)$ は内側の2と4が合わず未定義。

行列積は交換法則を満たさない以前に、**片方の順序だけ定義できることさえある**。

## 具体例

**例1**：$\mathbf A\in\mathbb R^{2\times3}$、$\mathbf x\in\mathbb R^3$ なら $\mathbf A\mathbf x\in\mathbb R^2$。

**例2**：$\mathbf A\in\mathbb R^{2\times3}$ と $\mathbf B\in\mathbb R^{4\times2}$ の $\mathbf A\mathbf B$ は内側3と4が一致しないため未定義。値を計算する前にshapeだけで判定できる。

## 条件を外すと

「要素数が同じなら同じ型」と考えるのは誤り。`(6,)`, `(2,3)`, `(1,6)` は6値を持つが、index構造と演算の意味が違う。

## 後続Courseでどう使うか

この習慣は線形代数の行列積、確率のrandom vector、機械学習のbatch×feature、深層学習のtensorで常に使う。

[演習へ](/exercises/prep-symbols-types-shapes)　|　[スライドへ](/slides/prep-symbols-types-shapes/)
