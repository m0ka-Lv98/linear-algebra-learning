# 対角化と行列の累乗：教科書

## この章で理解すること

十分な数の独立な固有ベクトルがあると、行列を固有ベクトル基底で見るだけで対角行列になる。すると累乗は固有値を累乗するだけになる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-eigenvalues-eigenvectors, la-basis-coordinates-dimension。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

十分な数の独立な固有ベクトルがあると、行列を固有ベクトル基底で見るだけで対角行列になる。すると累乗は固有値を累乗するだけになる。

<img src="/visuals/course-02/la-diagonalization-matrix-powers.png" alt="対角化と行列の累乗の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A=V\Lambda V^{-1}$ なら $A^k=V\Lambda^kV^{-1}$。Vの列は独立な固有ベクトル、Λは対応固有値を対角に並べる。

代表式：

$$
\mathbf{A}^{k}=\mathbf{V}\mathbf{\Lambda}^{k}\mathbf{V}^{-1}
$$

## 代表式の記号を定義する

- $\mathbf{V}$: 独立な固有ベクトルを列に並べた可逆行列。
- $\mathbf{\Lambda}$: 対応する固有値を対角に並べた対角行列。
- $k$: 非負整数の累乗回数。
- 対角化可能なら$\mathbf{A}=\mathbf{V}\mathbf{\Lambda}\mathbf{V}^{-1}$であり、累乗は対角成分ごとの累乗へ還元できる。

## なぜこの式になるのか

$A(Ve_i)=\lambda_i(Ve_i)$ なので $AV=V\Lambda$。右から$V^{-1}$を掛ければ分解が得られる。累乗では中間の$V^{-1}V$が消える。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}2&0\\0&3\end{bmatrix}$ は既に対角。$A^5=\operatorname{diag}(32,243)$。非対角でも固有基底へ移れば同様。

さらに確認問題：$A=\operatorname{diag}(1/2,2)$ の $A^4(1,1)^T$ を求めよ。

**解答**：$A^4=\operatorname{diag}(1/16,16)$ なので結果は $(1/16,16)^T$。各固有方向が独立に倍率を累乗する。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

固有値・固有ベクトルを求める→Vがfull rankか確認→$V^{-1}AV$が対角になるか検算。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- すべての行列が対角化可能ではない。
- 固有値の重複だけで不可とは言えない。幾何重複度を見る。
- 数値計算で ill-conditioned V は不安定。

特に、次の主張を自力で診断できるようにする。

> 「固有値が全部実数なら必ず対角化できる」

**診断**：誤り。例 $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ は実固有値1のみだが独立固有ベクトルが1本しかなく対角化できない。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

差分方程式、Markov chain、行列指数、長時間反復の解析。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-diagonalization-matrix-powers)
