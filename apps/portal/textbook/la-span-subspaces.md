# spanと部分空間：教科書

## この章で理解すること

spanは「与えたベクトルの線形結合で到達できる全点」である。部分空間は、足し算とスカラー倍をしても外へ出ない集合で、必ず原点を含む。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-vectors-linear-combinations。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

spanは「与えたベクトルの線形結合で到達できる全点」である。部分空間は、足し算とスカラー倍をしても外へ出ない集合で、必ず原点を含む。

<img src="/visuals/course-02/la-span-subspaces.png" alt="spanと部分空間の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\operatorname{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_k\}=\{\sum_j c_j\mathbf{v}_j\mid c_j\in\mathbb{R}\}$。部分集合$S\subseteq\mathbb{R}^n$が部分空間なら $0\in S$、加法・スカラー倍で閉じる。

代表式：

$$
\operatorname{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_k\}
$$

## 代表式の記号を定義する

- $\mathbf{v}_1,\ldots,\mathbf{v}_k\in\mathbb{R}^n$: 生成ベクトル。
- $c_1,\ldots,c_k\in\mathbb{R}$: 任意のスカラー係数。
- $\operatorname{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_k\}$: それらの全線形結合からなる集合。
- 部分空間: zeroベクトルを含み、加法とスカラー倍に閉じた集合。

## なぜこの式になるのか

spanは定義から線形結合に閉じているため、必ず部分空間になる。逆に多くの部分空間は適切な生成ベクトルのspanとして表せる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$(1,0,1)^T$ と $(0,1,1)^T$ のspanは $\{(a,b,a+b)^T\}$ という原点を通る平面。

さらに確認問題：$v_1=(1,1,0)^T$, $v_2=(0,1,1)^T$。$x=(2,3,1)^T$ はspanに入るか。

**解答**：$c_1v_1+c_2v_2=(c_1,c_1+c_2,c_2)$。$c_1=2,c_2=1$ で $(2,3,1)$ になるので入る。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

候補集合が部分空間かは、ゼロベクトル・加法閉性・スカラー倍閉性を調べる。span membershipは $Vc=x$ が解を持つかで判定する。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 原点を通らない平面は部分空間ではない。
- 生成ベクトルの本数とspanの次元は一致しないことがある。
- spanは有限個の点ではなく無限集合。

特に、次の主張を自力で診断できるようにする。

> 「$x+y=1$ を満たす点集合は$\mathbb{R}^2$の部分空間」

**診断**：原点 $(0,0)$ が $x+y=1$ を満たさないので部分空間ではない。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

列空間、零空間、基底、固有空間など「空間」を理解する土台。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.700 Linear Algebra](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/)

## 演習へ

[10問の演習](/exercises/la-span-subspaces)
