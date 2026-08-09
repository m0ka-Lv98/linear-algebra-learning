# 直交基底と正規直交基底：教科書

## この章で理解すること

直交基底では各方向が干渉しない。さらに長さ1へ正規化した正規直交基底なら、座標係数は単純な内積で取り出せる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-inner-products-norms-angles, la-basis-coordinates-dimension。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

直交基底では各方向が干渉しない。さらに長さ1へ正規化した正規直交基底なら、座標係数は単純な内積で取り出せる。

<img src="/visuals/course-02/la-orthogonal-orthonormal-bases.png" alt="直交基底と正規直交基底の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$q_i^Tq_j=0\;(i\neq j)$ で直交、さらに $\|q_i\|=1$ なら正規直交。列をQに並べると $Q^TQ=I$。正方なら $Q^{-1}=Q^T$。

代表式：

$$
\mathbf{Q}^{\mathsf T}\mathbf{Q}=\mathbf{I}
$$

## 代表式の記号を定義する

- $\mathbf{Q}\in\mathbb{R}^{m\times k}$: 列に基底ベクトルを並べた行列。
- $\mathbf{Q}^{\mathsf T}$: $\mathbf{Q}$の転置。
- $\mathbf{I}\in\mathbb{R}^{k\times k}$: 単位行列。
- $\mathbf{Q}^{\mathsf T}\mathbf{Q}=\mathbf{I}$は列同士が互いに直交し、各列の2-normが1であることを表す。

## なぜこの式になるのか

$x=\sum_i c_iq_i$ に $q_j^T$ を掛けると交差項が0になり、正規直交なら $c_j=q_j^Tx$。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$q_1=(1,1)^T/\sqrt2$, $q_2=(1,-1)^T/\sqrt2$ は正規直交。$x=(3,1)^T$ の係数は $(2\sqrt2,\sqrt2)$。

さらに確認問題：$q_1=(3,4)^T/5$ と $q_2=(-4,3)^T/5$ が正規直交か確認せよ。

**解答**：各ノルムは1、内積は $(-12+12)/25=0$。よって正規直交。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

内積行列 $Q^TQ$ を計算しIになるか確認。浮動小数点では `allclose` を使う。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 直交だけでは各列の長さが1とは限らない。
- 長方形Qでは $Q^TQ=I$ でも $QQ^T=I$ とは限らない。
- 「正規」と「正規直交」を混同しない。

特に、次の主張を自力で診断できるようにする。

> 「列が正規直交なら長方形Qでも $QQ^T=I$」

**診断**：$Q^TQ=I$ は列空間側の恒等だが、$QQ^T$ は列空間への射影。列が空間全体を張る正方QのときだけI。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

QR、射影、数値安定な最小二乗、固有ベクトル、SVD。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-orthogonal-orthonormal-bases)
