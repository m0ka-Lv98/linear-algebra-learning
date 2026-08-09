# 基底・座標・次元：教科書

## この章で理解すること

基底は「空間を重複なく生成する最小限の方向セット」。座標は、基底を使ってベクトルを再現する係数である。次元は基底ベクトルの本数で、基底の選び方によらない。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-linear-independence。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

基底は「空間を重複なく生成する最小限の方向セット」。座標は、基底を使ってベクトルを再現する係数である。次元は基底ベクトルの本数で、基底の選び方によらない。

<img src="/visuals/course-02/la-basis-coordinates-dimension.png" alt="基底・座標・次元の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\mathcal{B}=(v_1,\ldots,v_k)$ が空間Vをspanし独立なら基底。$x=\sum_i c_i v_i$ の係数列 $[x]_\mathcal{B}=(c_1,\ldots,c_k)^T$ が座標。

代表式：

$$
[\mathbf{x}]_{\mathcal{B}}=[c_1,\ldots,c_k]^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathcal{B}=(\mathbf{v}_1,\ldots,\mathbf{v}_k)$: 順序付きの基底。
- $\mathbf{x}$: 基底$\mathcal{B}$で表したいベクトル。
- $[\mathbf{x}]_{\mathcal{B}}\in\mathbb{R}^k$: $\mathcal{B}$に関する座標ベクトル。
- $c_i$: $\mathbf{x}=\sum_i c_i\mathbf{v}_i$を満たす座標成分。

## なぜこの式になるのか

spanにより全ベクトルを表現でき、独立性により表現の一意性が保証される。この2条件が「座標系」として機能する理由。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$\mathcal{B}=((1,1)^T,(1,-1)^T)$。$x=(4,2)^T$ は $3(1,1)+1(1,-1)$ なので $[x]_\mathcal{B}=(3,1)^T$。

さらに確認問題：$B=((1,0,1)^T,(0,1,1)^T)$ が張る平面で $x=(2,-1,1)^T$ のB座標を求めよ。

**解答**：$c_1(1,0,1)+c_2(0,1,1)=(c_1,c_2,c_1+c_2)$。$c_1=2,c_2=-1$ で3成分目も1。よって座標は $(2,-1)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

基底ベクトルを列にしたBを作り $Bc=x$ を解いて座標cを得る。基底なら正方かつ可逆（空間全体の場合）。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 座標ベクトルと元のベクトルを同じものとみなさない。
- 基底は順序付きと考える。順序を変えると座標成分も変わる。
- 生成集合が基底になるには独立性も必要。

特に、次の主張を自力で診断できるようにする。

> 「同じベクトルなら、どの基底でも座標成分は同じ」

**診断**：座標は基底依存。幾何的ベクトルは同じでも、基底を変えると係数は変わる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

基底変換、固有ベクトル基底、Fourier/PCA表現の理解に直結。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.700 Linear Algebra](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/)

## 演習へ

[10問の演習](/exercises/la-basis-coordinates-dimension)
