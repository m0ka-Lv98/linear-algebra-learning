# Cholesky分解：教科書

## この章で理解すること

Cholesky分解は対称正定値行列に特化した「平方根のような」三角分解。一般LUより構造を利用でき、計算量・メモリ・安定性の面で有利。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-quadratic-forms-positive-definite, la-lu-factorization。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

Cholesky分解は対称正定値行列に特化した「平方根のような」三角分解。一般LUより構造を利用でき、計算量・メモリ・安定性の面で有利。

<img src="/visuals/course-02/la-cholesky-factorization.png" alt="Cholesky分解の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A\succ0$ なら一意な正対角を持つ下三角Lが存在し $A=LL^T$。

代表式：

$$
\mathbf{A}=\mathbf{L}\mathbf{L}^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{n\times n}$: 対称正定値行列。
- $\mathbf{L}$: 正の対角成分を持つ下三角行列。
- $\mathbf{A}=\mathbf{L}\mathbf{L}^{\mathsf T}$: Cholesky分解。
- 対称正定値条件により、標準的なCholesky因子$\mathbf{L}$は一意に定まる。

## なぜこの式になるのか

$x^TAx=x^TLL^Tx=\|L^Tx\|^2$ なのでCholesky形は正定値性と自然に結びつく。逐次的に対角要素の平方根と下三角成分を決められる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}4&2\\2&3\end{bmatrix}$ は $L=\begin{bmatrix}2&0\\1&\sqrt2\end{bmatrix}$ で $LL^T=A$。

さらに確認問題：$A=\begin{bmatrix}9&3\\3&5\end{bmatrix}$ のCholesky因子Lを求めよ。

**解答**：$l_{11}=3$, $l_{21}=1$, $l_{22}=\sqrt{5-1}=2$。よって $L=\begin{bmatrix}3&0\\1&2\end{bmatrix}$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

対称性・PDを確認→Cholesky→$Ly=b$ 前進代入→$L^Tx=y$ 後退代入。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- semidefiniteや不定行列では通常のCholeskyが失敗する。
- Aを明示的に逆行列へしない。
- 対角の平方根が負/zeroに近い場合、PD性や丸め誤差を疑う。

特に、次の主張を自力で診断できるようにする。

> 「任意の可逆行列はCholesky分解できる」

**診断**：Choleskyには（実数の場合）対称正定値という強い条件が必要。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

WLS/GLS、Gaussian process、共分散行列、最適化のNewton系。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

## 演習へ

[10問の演習](/exercises/la-cholesky-factorization)
