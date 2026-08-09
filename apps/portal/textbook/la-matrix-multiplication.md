# 行列積：教科書

## この章で理解すること

行列積は「写像の合成」である。要素ごとの積ではない。$\mathbf{B}$ を先に作用させ、その結果へ $\mathbf{A}$ を作用させる写像が $\mathbf{A}\mathbf{B}$ である。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-matrices-data-linear-maps, prep-sums-products-indices。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

行列積は「写像の合成」である。要素ごとの積ではない。$\mathbf{B}$ を先に作用させ、その結果へ $\mathbf{A}$ を作用させる写像が $\mathbf{A}\mathbf{B}$ である。

<img src="/visuals/course-02/la-matrix-multiplication.png" alt="行列積の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\mathbf{A}\in\mathbb{R}^{m\times n}$、$\mathbf{B}\in\mathbb{R}^{n\times p}$ のとき $\mathbf{C}=\mathbf{A}\mathbf{B}\in\mathbb{R}^{m\times p}$、$c_{ij}=\sum_{k=1}^n a_{ik}b_{kj}$。

代表式：

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$、$\mathbf{B}\in\mathbb{R}^{n\times p}$: 掛け合わせる2行列。
- $\mathbf{C}=\mathbf{A}\mathbf{B}\in\mathbb{R}^{m\times p}$: 積の行列。
- $a_{ik},b_{kj},c_{ij}$: 各行列の対応する成分。
- $k$: $\mathbf{A}$の列と$\mathbf{B}$の行を走査する総和添字。

## なぜこの式になるのか

第$j$列について $(\mathbf{A}\mathbf{B})_{:j}=\mathbf{A}(\mathbf{B}_{:j})$。つまり積の各列は、$\mathbf{B}$ の列を $\mathbf{A}$ で変換したもの。これが合成の意味を最も直接に示す。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$\mathbf{A}=\begin{bmatrix}1&2\\0&1\end{bmatrix}$、$\mathbf{B}=\begin{bmatrix}2&0\\1&3\end{bmatrix}$ なら $\mathbf{A}\mathbf{B}=\begin{bmatrix}4&6\\1&3\end{bmatrix}$。

さらに確認問題：$\mathbf{A}=\begin{bmatrix}1&-1&2\\0&2&1\end{bmatrix}$、$\mathbf{B}=\begin{bmatrix}2&1\\1&0\\-1&3\end{bmatrix}$ の積を求めよ。

**解答**：$\mathbf{A}\mathbf{B}=\begin{bmatrix}-1&7\\1&3\end{bmatrix}$。例えば左上は $1\cdot2+(-1)\cdot1+2\cdot(-1)=-1$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

まず内側の次元が一致するか確認する。次に「行×列」の内積として各要素を計算するか、列ごとに $\mathbf{A}\mathbf{b}_j$ を計算する。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 一般に $\mathbf{A}\mathbf{B}\neq\mathbf{B}\mathbf{A}$。
- Hadamard積（要素ごとの積）と混同しない。
- 積のshapeは外側の次元 $(m,p)$ になる。

特に、次の主張を自力で診断できるようにする。

> 「$\mathbf{A}\mathbf{B}$ が定義されれば $\mathbf{B}\mathbf{A}$ も必ず定義される」

**診断**：誤り。$\mathbf{A}$ が $2\times3$、$\mathbf{B}$ が $3\times4$ なら $AB$ は定義されるが $BA$ は $4$ と $2$ が一致せず定義されない。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

複数の線形層の合成、基底変換、共分散変換、連鎖的な座標変換で不可欠。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [OpenStax Precalculus 2e, Chapter 9: Systems of Equations and Inequalities](https://openstax.org/books/precalculus-2e/pages/9-introduction-to-systems-of-equations-and-inequalities)

## 演習へ

[10問の演習](/exercises/la-matrix-multiplication)
