# 固有値と固有ベクトル：教科書

## この章で理解すること

固有ベクトルは、行列を作用させても「向きが変わらず、伸び縮みだけする」特別な方向。固有値がその倍率である。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-invertibility-inverse-matrices, la-determinants-volume-invertibility。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

固有ベクトルは、行列を作用させても「向きが変わらず、伸び縮みだけする」特別な方向。固有値がその倍率である。

<img src="/visuals/course-02/la-eigenvalues-eigenvectors.png" alt="固有値と固有ベクトルの図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$Av=\lambda v$、$v\neq0$。正方行列では $\det(A-\lambda I)=0$ から固有値を求め、各λでnull$(A-\lambda I)$を求める。

代表式：

$$
\mathbf{A}\mathbf{v}=\lambda\mathbf{v}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{n\times n}$: 正方行列。
- $\mathbf{v}\ne\mathbf{0}$: 固有ベクトル。
- $\lambda$: $\mathbf{v}$に対応する固有値。
- $\mathbf{A}\mathbf{v}=\lambda\mathbf{v}$は、$\mathbf{v}$方向が$\mathbf{A}$で向きを変えず倍率$\lambda$だけ伸縮することを表す。

## なぜこの式になるのか

一般のベクトルは方向も変わるが、固有方向では作用がスカラー倍に簡約される。固有ベクトル基底があれば複雑な反復作用も成分ごとの倍率計算になる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}2&0\\0&3\end{bmatrix}$ ならe1,e2が固有ベクトル、固有値2,3。

さらに確認問題：$A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$ の固有値を求めよ。

**解答**：上三角なので固有値は対角成分2,3。特性多項式も $(2-\lambda)(3-\lambda)$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

小行列は特性方程式。数値計算では `eig`/対称なら `eigh`。得た固有対は残差 $\|Av-\lambda v\|$ で検算。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 0ベクトルは固有ベクトルではない。
- 固有値が重複しても独立な固有ベクトルが同数あるとは限らない。
- 非対称行列では複素固有値がありうる。

特に、次の主張を自力で診断できるようにする。

> 「固有ベクトルは行列の列ベクトルである」

**診断**：一般には無関係。固有ベクトルは $Av=\lambda v$ を満たす入力方向で、Aの列そのものとは限らない。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

動的系、Markov chain、PCA（共分散固有ベクトル）、安定性解析。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.700 Linear Algebra](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/)

## 演習へ

[10問の演習](/exercises/la-eigenvalues-eigenvectors)
