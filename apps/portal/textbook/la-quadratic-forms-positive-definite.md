# 二次形式と正定値行列：教科書

## この章で理解すること

二次形式 $x^TAx$ は方向xに沿った「エネルギー」や曲率を測る。正定値ならどの非zero方向でも正で、原点を底に持つ椀型の幾何になる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-symmetric-matrices-spectral-theorem, calc-hessian-second-order。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

二次形式 $x^TAx$ は方向xに沿った「エネルギー」や曲率を測る。正定値ならどの非zero方向でも正で、原点を底に持つ椀型の幾何になる。

<img src="/visuals/course-02/la-quadratic-forms-positive-definite.png" alt="二次形式と正定値行列の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

実対称Aが正定値（PD）とは、すべての $x\neq0$ で $x^TAx>0$。対称行列では「全固有値>0」「適切なCholesky分解が存在」などと同値。

代表式：

$$
q(\mathbf{x})=\mathbf{x}^{\mathsf T}\mathbf{A}\mathbf{x}
$$

## 代表式の記号を定義する

- $\mathbf{A}=\mathbf{A}^{\mathsf T}\in\mathbb{R}^{n\times n}$: 二次形式を定める実対称行列。
- $\mathbf{x}\in\mathbb{R}^n$: 入力ベクトル。
- $q(\mathbf{x})=\mathbf{x}^{\mathsf T}\mathbf{A}\mathbf{x}$: 二次形式。
- 正定値（positive definite）とは、すべての$\mathbf{x}\ne\mathbf{0}$で$q(\mathbf{x})>0$となること。

## なぜこの式になるのか

$A=Q\Lambda Q^T$ と置き $z=Q^Tx$ とすれば $x^TAx=\sum_i\lambda_i z_i^2$。したがって全固有値が正なら全方向で正。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\operatorname{diag}(2,5)$ なら $q(x)=2x_1^2+5x_2^2>0$。等高線は楕円。

さらに確認問題：$A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ が正定値か判定せよ。

**解答**：固有値は3と1で両方正。よってPD。あるいは leading minors 2>0, det=3>0。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

対称性確認→`eigvalsh`で固有値、またはCholeskyを試す。小行列ならSylvester条件（leading principal minors）も使える。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 「成分が全部正」だけではPDを保証しない。
- PDは正方・対称行列を基本に議論する。
- semidefinite（≥0）とdefinite（>0）を区別する。

特に、次の主張を自力で診断できるようにする。

> 「対角成分がすべて正なら正定値」

**診断**：必要条件の一部だが十分でない。例 $\begin{bmatrix}1&2\\2&1\end{bmatrix}$ は対角正でも固有値3,-1で不定。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

最小化問題のHessian、共分散/precision、WLSの重み、Gaussian分布。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

## 演習へ

[10問の演習](/exercises/la-quadratic-forms-positive-definite)
