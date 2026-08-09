# 対称行列とスペクトル定理：教科書

## この章で理解すること

実対称行列は特別に扱いやすい。固有値はすべて実数で、互いに直交する固有ベクトルから正規直交基底を選べる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-eigenvalues-eigenvectors, la-orthogonal-orthonormal-bases。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

実対称行列は特別に扱いやすい。固有値はすべて実数で、互いに直交する固有ベクトルから正規直交基底を選べる。

<img src="/visuals/course-02/la-symmetric-matrices-spectral-theorem.png" alt="対称行列とスペクトル定理の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A=A^T$ なら $A=Q\Lambda Q^T$、$Q^TQ=I$、Λは実対角。これが実対称行列のスペクトル定理。

代表式：

$$
\mathbf{A}=\mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathbf{A}=\mathbf{A}^{\mathsf T}\in\mathbb{R}^{n\times n}$: 実対称行列。
- $\mathbf{Q}$: 固有ベクトルを列に持つ直交行列。
- $\mathbf{\Lambda}$: 実固有値を対角に並べた対角行列。
- スペクトル定理は実対称行列が正規直交基底で必ず対角化できることを保証する。

## なぜこの式になるのか

異なる固有値に属する固有ベクトルu,vについて $u^TAv=\lambda_vu^Tv$ と $(Au)^Tv=\lambda_uu^Tv$ が等しいため、$(\lambda_v-\lambda_u)u^Tv=0$。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ の固有方向は $(1,1)$ と $(1,-1)$、固有値3と1。互いに直交する。

さらに確認問題：$A=\begin{bmatrix}4&2\\2&4\end{bmatrix}$ の固有値を求めよ。

**解答**：$(1,1)^T$ 方向で6、$(1,-1)^T$ 方向で2。正規化すれば直交行列Qを作れる。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

対称性を確認し `eigh` を使う。再構成 $Q\Lambda Q^T$、直交性 $Q^TQ\approx I$ を検算。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 対称でない行列に $Q\Lambda Q^T$ を期待しない。
- 重複固有値の固有空間内では基底は一意でない。
- 浮動小数点で対称性がわずかに崩れている場合は原因を確認する。

特に、次の主張を自力で診断できるようにする。

> 「対称行列の固有ベクトルは必ず一意」

**診断**：符号は自由で、重複固有値の固有空間内では任意の正規直交基底を選べる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

共分散行列、Hessian、PCA、正定値性、二次形式。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.700 Linear Algebra](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/)

## 演習へ

[10問の演習](/exercises/la-symmetric-matrices-spectral-theorem)
