# 行列式・体積・可逆性：教科書

## この章で理解すること

行列式は、線形写像が向き付き体積を何倍にするかを表す一つのスカラー。0なら少なくとも1方向を潰して体積が0になり、可逆でない。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-invertibility-inverse-matrices。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

行列式は、線形写像が向き付き体積を何倍にするかを表す一つのスカラー。0なら少なくとも1方向を潰して体積が0になり、可逆でない。

<img src="/visuals/course-02/la-determinants-volume-invertibility.png" alt="行列式・体積・可逆性の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

正方行列Aに対し $\det(AB)=\det A\det B$。$|\det A|$ は単位立方体の体積倍率、符号は向き反転を表す。$\det A\neq0\iff A$可逆。

代表式：

$$
\det(\mathbf{A}\mathbf{B})=\det(\mathbf{A})\det(\mathbf{B})
$$

## 代表式の記号を定義する

- $\det(\mathbf{A})$: 正方行列$\mathbf{A}$の行列式。
- $\mathbf{A},\mathbf{B}\in\mathbb{R}^{n\times n}$: 正方行列。
- $|\det(\mathbf{A})|$: 線形写像$\mathbf{A}$による$n$次元体積の倍率。
- $\det(\mathbf{A})=0$は体積を潰す方向があり、$\mathbf{A}$が非可逆であることと同値。

## なぜこの式になるのか

三角行列のdetは対角積。消去でAを三角化し、行交換で符号反転、行の定数倍でdetも同倍率という規則を追えば効率よく計算できる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$ はdet=6。単位正方形の面積を6倍する。

さらに確認問題：$A=\begin{bmatrix}1&2\\3&5\end{bmatrix}$ のdetと可逆性を判定せよ。

**解答**：$\det A=1\cdot5-2\cdot3=-1$。0でないので可逆。面積倍率は1、向きは反転。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

小行列は公式、一般にはLU分解を使ってdetを対角積とpivot符号から求める。大規模ではdetそのものよりlogdetを使うことも多い。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- detは長方形行列には通常定義しない。
- detが大きい/小さいだけで条件数は判断できない。
- 余因子展開は理論には便利だが大規模数値計算には非効率。

特に、次の主張を自力で診断できるようにする。

> 「det(A+B)=det(A)+det(B)」

**診断**：一般には成り立たない。detは行列積に対して乗法的だが、加法的ではない。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

可逆性、体積変換、確率密度の変数変換、正定値行列のlog determinant。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [OpenStax Precalculus 2e, Chapter 9: Systems of Equations and Inequalities](https://openstax.org/books/precalculus-2e/pages/9-introduction-to-systems-of-equations-and-inequalities)

## 演習へ

[10問の演習](/exercises/la-determinants-volume-invertibility)
