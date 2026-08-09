# LU分解：教科書

## この章で理解すること

LU分解はガウス消去を「一度分解として保存」する方法である。$L$ に消去係数、$U$ に消去後の上三角行列を持たせる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-linear-systems-elimination。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

LU分解はガウス消去を「一度分解として保存」する方法である。$L$ に消去係数、$U$ に消去後の上三角行列を持たせる。

<img src="/visuals/course-02/la-lu-factorization.png" alt="LU分解の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

適切なpivot条件の下で $\mathbf{A}=\mathbf{L}\mathbf{U}$。実用上は行交換を含め $\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}$ とすることが多い。

代表式：

$$
\mathbf{A}=\mathbf{L}\mathbf{U}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{n\times n}$: 分解対象の行列。
- $\mathbf{L}$: 対角成分を1とする下三角行列（lower triangular matrix）。
- $\mathbf{U}$: 上三角行列（upper triangular matrix）。
- pivotingを含む実装では$\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}$とし、$\mathbf{P}$は行交換を表す置換行列。

## なぜこの式になるのか

ガウス消去で使う「行$i$から$m_{ij}$倍のpivot行を引く」操作を逆に集めると、下三角行列$L$になる。右辺が変わってもAが同じなら分解を再利用できる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$\mathbf{A}=\begin{bmatrix}2&1\\4&3\end{bmatrix}$ は $L=\begin{bmatrix}1&0\\2&1\end{bmatrix}$, $U=\begin{bmatrix}2&1\\0&1\end{bmatrix}$。

さらに確認問題：$A=\begin{bmatrix}1&2\\3&8\end{bmatrix}$ をpivotingなしでLU分解せよ。

**解答**：第1pivotで係数3を使うので $L=\begin{bmatrix}1&0\\3&1\end{bmatrix}$、$U=\begin{bmatrix}1&2\\0&2\end{bmatrix}$。積を戻すとAになる。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

pivoting付きLUを作る→$Ly=Pb$ を前進代入→$Ux=y$ を後退代入。複数の右辺を解くとき特に有利。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- pivotingなしLUが常に安定とは限らない。
- $L$ の対角を1とする流儀など規約を確認する。
- 分解と「逆行列を求めること」を混同しない。

特に、次の主張を自力で診断できるようにする。

> 「LU分解できればpivotingは不要」

**診断**：存在と数値安定性は別。小さいpivotを使うと丸め誤差が増幅されるため、実装では部分pivotingを伴う $PA=LU$ が標準。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

多数の右辺を持つ線形系、数値線形代数、最適化内部の線形ソルバで使われる。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-lu-factorization)
