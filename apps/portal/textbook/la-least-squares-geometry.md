# 最小二乗法の幾何学：教科書

## この章で理解すること

方程式 $Ax=b$ が解けないとき、最小二乗法は「bに最も近い列空間上の点」を選ぶ。解そのものより、$A\hat x$ がbの直交射影になることが本質。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: orthogonal-projection, la-column-space-null-space。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

方程式 $Ax=b$ が解けないとき、最小二乗法は「bに最も近い列空間上の点」を選ぶ。解そのものより、$A\hat x$ がbの直交射影になることが本質。

<img src="/visuals/course-02/la-least-squares-geometry.png" alt="最小二乗法の幾何学の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\hat x=\arg\min_x\|Ax-b\|_2^2$。最適条件は $A^T(A\hat x-b)=0$、すなわち $A^TA\hat x=A^Tb$。

代表式：

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x}-\mathbf{b}\|_2^2
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: design matrix（説明変数を列に持つ行列）。
- $\mathbf{x}\in\mathbb{R}^n$: 推定する係数ベクトル。
- $\mathbf{b}\in\mathbb{R}^m$: 観測ベクトル。
- $\mathbf{r}=\mathbf{b}-\mathbf{A}\mathbf{x}$: 残差。最小二乗解では$\mathbf{r}$が$\operatorname{Col}(\mathbf{A})$に直交する。

## なぜこの式になるのか

目的関数を微分してもよいし、幾何学的に残差rがCol(A)へ直交することから $A^Tr=0$ を得てもよい。後者がMIT 18.06の中心的見方。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

点$(0,1),(1,2),(2,2)$へ直線 $y=c+mx$ を当てる。Aの列は定数項とx、bはy値。bをCol(A)へ射影して係数を得る。

さらに確認問題：$A=\begin{bmatrix}1\\1\end{bmatrix}$, $b=(2,4)^T$。定数$c$でbを近似する最小二乗解を求めよ。

**解答**：$c$は平均で3。$A\hat c=(3,3)^T$、残差$(-1,1)^T$はAの列$(1,1)^T$と内積0。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

design matrix Aとbを作る→QRや `lstsq` で解く→残差rを計算→$A^Tr\approx0$ を検算。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 正規方程式を数値実装の第一選択にしない（条件数を二乗しうる）。
- 最小二乗解は「元の方程式を厳密に満たす解」とは限らない。
- residual normとparameter normを混同しない。

特に、次の主張を自力で診断できるようにする。

> 「最小二乗では残差ベクトルが0になる」

**診断**：bがCol(A)に入る場合だけ0。一般には残差は非zeroだが、Col(A)へ直交する。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

線形回帰、スペクトルunmixing、校正曲線、過剰決定系。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-least-squares-geometry)
