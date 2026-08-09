# 特異値分解：教科書

## この章で理解すること

SVDは任意の行列を「入力側の直交回転 → 軸ごとの伸縮 → 出力側の直交回転」に分ける。固有分解より適用範囲が広く、長方形・rank不足でも使える。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-symmetric-matrices-spectral-theorem, la-rank-rank-nullity。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

SVDは任意の行列を「入力側の直交回転 → 軸ごとの伸縮 → 出力側の直交回転」に分ける。固有分解より適用範囲が広く、長方形・rank不足でも使える。

<img src="/visuals/course-02/la-singular-value-decomposition.png" alt="特異値分解の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A=U\Sigma V^T$。U,Vは直交（または列正規直交）、Σの対角 $\sigma_1\ge\cdots\ge0$ が特異値。$Av_i=\sigma_i u_i$。

代表式：

$$
\mathbf{A}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 任意の実行列。
- $\mathbf{U}$: 左特異ベクトル、$\mathbf{V}$: 右特異ベクトルを持つ直交（または列正規直交）行列。
- $\mathbf{\Sigma}$: 非負の特異値$\sigma_1\ge\sigma_2\ge\cdots\ge0$を対角に持つ行列。
- SVDはsingular value decomposition（特異値分解）。$\mathbf{A}\mathbf{v}_i=\sigma_i\mathbf{u}_i$。

## なぜこの式になるのか

$A^TA v_i=\sigma_i^2 v_i$ から右特異ベクトルを得て、$u_i=Av_i/\sigma_i$ とする。特異値は各直交方向の伸縮倍率。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\operatorname{diag}(3,1)$ ではU=V=I、Σ=diag(3,1)。単位円は長軸3、短軸1の楕円へ写る。

さらに確認問題：$A=\begin{bmatrix}3&0\\0&-2\end{bmatrix}$ の特異値を求めよ。

**解答**：$A^TA=\operatorname{diag}(9,4)$ の固有値平方根なので特異値は3,2。符号はU/V側へ吸収され、特異値は非負。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

`svd(A, full_matrices=False)`→特異値の並び・再構成誤差・U/Vの直交性を検算。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- Vと$V^T$の返り値規約に注意（NumPyはVh）。
- 特異値は負にならない。
- 固有値と特異値を同一視しない（対称PSDでは関係が特に単純）。

特に、次の主張を自力で診断できるようにする。

> 「SVDは正方可逆行列にしか使えない」

**診断**：任意の実/複素行列に存在し、長方形・特異行列で特に有用。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

擬似逆、低ランク近似、PCA、condition number、inverse problem、spectral unmixing。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

## 演習へ

[10問の演習](/exercises/la-singular-value-decomposition)
