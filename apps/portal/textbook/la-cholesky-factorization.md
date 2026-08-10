# Cholesky分解：教科書

Course 02｜線形代数｜Topic 25/29

## このTopicの位置づけ

一般行列にはLUを使ったが、対称正定値行列では構造を利用してより簡潔な分解ができる。$\mathbf A=\mathbf L\mathbf L^T$ と分けるCholesky分解である。

**前提知識**：正定値行列、LU分解。

## まず直感を作る

正定値行列は全方向で正の二次形式を持つため、ある線形変換 $\mathbf L^T$ で座標を変えた後の普通の長さの二乗として表せる：$\mathbf x^T\mathbf A\mathbf x=\|\mathbf L^T\mathbf x\|^2$。その変換を三角行列に選べるのがCholesky。

## 図の解説

<img src="/visuals/course-02/la-cholesky-factorization.png" alt="Cholesky分解の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図は単位円へまず $\mathbf L^T$、次に $\mathbf L$ を作用させることで、最終的に $\mathbf A=\mathbf L\mathbf L^T$ の変換と同じ結果になることを示している。$\mathbf A$ を一度に扱う代わりに、三角行列二つへ分ける。

三角行列は前進・後退代入で効率よく解けるため、正定値連立系やWLSで重要になる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$：対称正定値行列。
- $\mathbf L$：正の対角成分を持つ下三角行列。
- $\mathbf A=\mathbf L\mathbf L^T$。


## 正式な定義

対称正定値行列 $\mathbf A$ には一意な下三角行列 $\mathbf L$（対角正）が存在し

$$
\boxed{\mathbf A=\mathbf L\mathbf L^T}
$$

と分解できる。

## なぜこの式・定理になるのか

### 2×2で係数を比較する

$$
\mathbf A=\begin{bmatrix}a&b\\b&c\end{bmatrix},
\qquad
\mathbf L=\begin{bmatrix}\ell_{11}&0\\\ell_{21}&\ell_{22}\end{bmatrix}.
$$

積を計算すると

$$
\mathbf L\mathbf L^T
=\begin{bmatrix}
\ell_{11}^2&\ell_{11}\ell_{21}\\
\ell_{11}\ell_{21}&\ell_{21}^2+\ell_{22}^2
\end{bmatrix}.
$$

$\mathbf A$ と成分比較して

$$
\ell_{11}=\sqrt a,
$$

$$
\ell_{21}=\frac b{\ell_{11}},
$$

$$
\ell_{22}=\sqrt{c-\ell_{21}^2}.
$$

### なぜ平方根の中が正になるのか

正定値なら $a>0$。さらに2×2ではleading principal minorも正で $ac-b^2>0$。したがって

$$
c-\ell_{21}^2
=c-\frac{b^2}{a}
=\frac{ac-b^2}{a}>0.
$$

よって実数の正の平方根を取れる。高次元でも同様に、各段階でSchur complementが正定値として残るため分解が継続できる。

### 連立方程式の解法

$\mathbf A\mathbf x=\mathbf b$ は

$$
\mathbf L\mathbf L^T\mathbf x=\mathbf b.
$$

まず $\mathbf L\mathbf y=\mathbf b$ を前進代入、次に $\mathbf L^T\mathbf x=\mathbf y$ を後退代入。一般LUより保存量・計算量が小さい。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}4&2\\2&3\end{bmatrix}.
$$

$\ell_{11}=2$、$\ell_{21}=1$、$\ell_{22}=\sqrt{3-1}=\sqrt2$。したがって

$$
\mathbf L=\begin{bmatrix}2&0\\1&\sqrt2\end{bmatrix}.
$$

掛け戻すと $\mathbf L\mathbf L^T=\mathbf A$。

## もう一段丁寧に：Choleskyの成分がどう決まるかを2×2で導く

### 1. positive definiteな対称行列を置く

$$
\mathbf A=
\begin{bmatrix}
a&b\\b&c
\end{bmatrix}
$$

をpositive definiteとする。下三角行列

$$
\mathbf L=
\begin{bmatrix}
\ell_{11}&0\\
\ell_{21}&\ell_{22}
\end{bmatrix}
$$

で

$$
\mathbf A=\mathbf L\mathbf L^T
$$

を満たしたい。

### 2. 行列積を実際に展開する

$$
\mathbf L\mathbf L^T
=
\begin{bmatrix}
\ell_{11}^2&\ell_{11}\ell_{21}\\
\ell_{11}\ell_{21}&
\ell_{21}^2+\ell_{22}^2
\end{bmatrix}.
$$

$\mathbf A$ の成分と比較すると

$$
\ell_{11}^2=a,
$$

$$
\ell_{11}\ell_{21}=b,
$$

$$
\ell_{21}^2+\ell_{22}^2=c.
$$

対角成分を正に取る規約の下で

$$
\ell_{11}=\sqrt a,
$$

$$
\ell_{21}=\frac b{\ell_{11}},
$$

$$
\ell_{22}
=\sqrt{c-\ell_{21}^2}.
$$

これがCholesky algorithmの最小例である。

### 3. なぜ平方根の中身が正になるのか

positive definiteなら $a>0$。さらに2×2では

$$
ac-b^2>0
$$

も成立する。したがって

$$
c-\ell_{21}^2
=c-\frac{b^2}{a}
=\frac{ac-b^2}{a}>0.
$$

よって実数の正の平方根を取れる。一般次元でも各段階のSchur complementがpositive definiteであることが、分解を止めずに進められる理由になる。

### 4. 連立方程式をどう解くか

$\mathbf A\mathbf x=\mathbf b$ に

$$
\mathbf A=\mathbf L\mathbf L^T
$$

を入れて

$$
\mathbf L\mathbf L^T\mathbf x=\mathbf b.
$$

まず

$$
\mathbf L\mathbf y=\mathbf b
$$

をforward substitutionで解き、次に

$$
\mathbf L^T\mathbf x=\mathbf y
$$

をback substitutionで解く。LUより対称性を利用して保存量・計算量を減らせる。

### 5. なぜ対角を正にするのか

$\mathbf L$ の対角符号を自由に変えると同じ $\mathbf A$ を複数の $\mathbf L$ で表せる。対角をすべて正と定めることでCholesky factorは一意になる。定義上の規約が一意性を作っている点も重要である。

## 成立条件・壊れる場合

対称であっても正定値でなければ標準Choleskyは失敗する。例えば固有値に負があると途中で負数の平方根が必要になる。半正定値ではzero pivotが起こり、標準アルゴリズムをそのまま使えない場合がある。

## ここから発展

WLSで $\mathbf W=\mathbf L\mathbf L^T$ と分ければ、重み付きノルムを通常のEuclidean normへwhiteningできる。また多変量Gaussianの共分散生成にもCholeskyが使われる。


## このTopicの理解確認

- 2×2の $\mathbf A=\mathbf L\mathbf L^T$ を成分比較して $l_{11},l_{21},l_{22}$ を順に導けるか。
- positive definitenessが平方根内部をpositiveに保つ理由を説明できるか。
- Choleskyで $\mathbf A\mathbf x=\mathbf b$ を二つのtriangular solvesへ分けられるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-cholesky-factorization)
