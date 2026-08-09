# 可逆性と逆行列：教科書

## この章で理解すること

逆行列は線形写像を「元に戻す」写像である。ただし正方行列なら必ず存在するわけではなく、情報を潰さない（rankが最大）場合に限る。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-linear-systems-elimination。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

逆行列は線形写像を「元に戻す」写像である。ただし正方行列なら必ず存在するわけではなく、情報を潰さない（rankが最大）場合に限る。

<img src="/visuals/course-02/la-invertibility-inverse-matrices.png" alt="可逆性と逆行列の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

正方行列 $\mathbf{A}\in\mathbb{R}^{n\times n}$ に対し $\mathbf{A}^{-1}\mathbf{A}=\mathbf{A}\mathbf{A}^{-1}=\mathbf{I}$ を満たす行列が存在するとき可逆という。

代表式：

$$
\mathbf{A}^{-1}\mathbf{A}=\mathbf{I}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{n\times n}$: 正方行列。
- $\mathbf{A}^{-1}$: $\mathbf{A}^{-1}\mathbf{A}=\mathbf{A}\mathbf{A}^{-1}=\mathbf{I}$を満たす逆行列。
- $\mathbf{I}\in\mathbb{R}^{n\times n}$: 単位行列。
- 可逆（invertible）: 逆行列が存在すること。

## なぜこの式になるのか

$A$ が可逆なら $A\mathbf{x}=\mathbf{0}$ に左から $A^{-1}$ を掛けて $\mathbf{x}=0$。したがってnull spaceは自明で列は独立。逆にrankが$n$なら各 $\mathbf{b}$ に一意解があり逆写像を定義できる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$\mathbf{A}=\begin{bmatrix}2&1\\1&1\end{bmatrix}$ は $\det A=1$ で、$\mathbf{A}^{-1}=\begin{bmatrix}1&-1\\-1&2\end{bmatrix}$。

さらに確認問題：$\mathbf{A}=\begin{bmatrix}3&1\\2&1\end{bmatrix}$ の逆行列を求め、$\mathbf{b}=(7,5)^T$ を解け。

**解答**：$\det A=1$ なので $A^{-1}=\begin{bmatrix}1&-1\\-2&3\end{bmatrix}$。$x=A^{-1}b=(2,1)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

理論上はGauss-Jordanで $[A\mid I]\to[I\mid A^{-1}]$。数値計算では逆行列を明示的に作らず `solve(A,b)` を使うのが基本。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- detが0に近い行列では理論上可逆でも数値的に不安定。
- 長方形行列に通常の逆行列はない。
- $A^{-1}b$ を計算するために `inv(A) @ b` を標準手順にしない。

特に、次の主張を自力で診断できるようにする。

> 「detが小さくても0でなければ数値計算上の問題はない」

**診断**：誤り。detの絶対値だけで安定性は判断できないが、ほぼ特異な行列では条件数が大きくなり、入力誤差が解で増幅されうる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

一意な線形系、座標変換の逆変換、可逆な前処理の理解に使う。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [OpenStax Precalculus 2e, Chapter 9: Systems of Equations and Inequalities](https://openstax.org/books/precalculus-2e/pages/9-introduction-to-systems-of-equations-and-inequalities)

## 演習へ

[10問の演習](/exercises/la-invertibility-inverse-matrices)
