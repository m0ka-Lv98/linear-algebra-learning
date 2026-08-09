# 直交射影：教科書

## この章で理解すること

直交射影は、ある部分空間の中で元のベクトルに最も近い点を選ぶ操作。残差はその部分空間に直交する。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-span-subspaces, la-inner-products-norms-angles, la-orthogonal-orthonormal-bases。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

直交射影は、ある部分空間の中で元のベクトルに最も近い点を選ぶ操作。残差はその部分空間に直交する。

<img src="/visuals/course-02/orthogonal-projection.png" alt="直交射影の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

Qが部分空間Sの正規直交基底を列にもつとき $P=QQ^T$、$\hat b=Pb$。残差 $r=b-\hat b$ は $Q^Tr=0$。

代表式：

$$
\mathbf{P}=\mathbf{Q}\mathbf{Q}^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathbf{Q}\in\mathbb{R}^{m\times k}$: 射影先部分空間の正規直交基底を列に持つ行列。
- $\mathbf{P}=\mathbf{Q}\mathbf{Q}^{\mathsf T}\in\mathbb{R}^{m\times m}$: その部分空間への直交射影行列。
- $\mathbf{x}\in\mathbb{R}^m$: 射影する入力。
- $\mathbf{P}\mathbf{x}$: 部分空間上で$\mathbf{x}$に最も近い点。

## なぜこの式になるのか

最短点では、空間内のどの方向へ少し動いても距離を一次的に減らせない。その条件が残差と空間内方向の内積0、すなわち直交条件になる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

x軸への射影なら $Q=(1,0)^T$、$P=\begin{bmatrix}1&0\\0&0\end{bmatrix}$。$b=(2,3)^T$ は $(2,0)^T$ へ射影され、残差$(0,3)^T$はx軸に直交。

さらに確認問題：$u=(1,2)^T$ 方向へ $b=(3,1)^T$ を射影せよ。

**解答**：$\operatorname{proj}_u b=(u^Tb)/(u^Tu)u=(5/5)u=(1,2)^T$。残差 $(2,-1)^T$ はuと内積0。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

正規直交基底Qを用意→$Q^Tb$で座標を取る→$Q(Q^Tb)$で元空間へ戻す。非正規直交Aなら $A(A^TA)^{-1}A^T$（full column rank時）。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 射影ベクトルと残差を取り違えない。
- 一般のAで $AA^T$ を射影行列と思わない。
- 射影行列は $P^2=P$、直交射影ならさらに$P^T=P$。

特に、次の主張を自力で診断できるようにする。

> 「射影後のベクトルと元ベクトルは必ず直交する」

**診断**：直交するのは射影ベクトルではなく残差 $b-Pb$ と射影先部分空間。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

最小二乗、PCA、信号分解、部分空間法。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/orthogonal-projection)
