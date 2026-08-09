# 行列をデータと線形写像として見る：教科書

## この章で理解すること

行列には二つの読み方がある。数表として行・列に意味を持たせる読み方と、入力ベクトルを別のベクトルへ移す線形写像としての読み方である。後者では「各列は標準基底がどこへ移るか」を表す。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-vectors-linear-combinations。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

行列には二つの読み方がある。数表として行・列に意味を持たせる読み方と、入力ベクトルを別のベクトルへ移す線形写像としての読み方である。後者では「各列は標準基底がどこへ移るか」を表す。

<img src="/visuals/course-02/la-matrices-data-linear-maps.png" alt="行列をデータと線形写像として見るの図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\mathbf{A}\in\mathbb{R}^{m\times n}$ は $T:\mathbb{R}^n\to\mathbb{R}^m$, $T(\mathbf{x})=\mathbf{A}\mathbf{x}$ を定める。線形性は $T(c\mathbf{x}+d\mathbf{y})=cT(\mathbf{x})+dT(\mathbf{y})$。

代表式：

$$
T(\mathbf{x})=\mathbf{A}\mathbf{x}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 線形写像を表す行列。列数$n$が入力次元、行数$m$が出力次元。
- $\mathbf{x}\in\mathbb{R}^n$: 入力ベクトル。
- $T:\mathbb{R}^n\to\mathbb{R}^m$: 行列$\mathbf{A}$が定める線形写像。
- $T(\mathbf{x})\in\mathbb{R}^m$: 出力ベクトル。

## なぜこの式になるのか

標準基底 $\mathbf{e}_j$ を入力すると $\mathbf{A}\mathbf{e}_j$ は第$j$列になる。したがって任意の入力の出力は、列ベクトルを入力成分で重み付けした線形結合になる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$\mathbf{A}=\begin{bmatrix}2&1\\0&1\end{bmatrix}$ なら $\mathbf{e}_1\mapsto(2,0)^T$、$\mathbf{e}_2\mapsto(1,1)^T$。単位正方形はこの2本を辺にもつ平行四辺形へ写る。

さらに確認問題：$\mathbf{A}=\begin{bmatrix}1&2\\-1&3\end{bmatrix}$ と $\mathbf{x}=(2,-1)^T$ に対して $T(\mathbf{x})$ を求めよ。

**解答**：$\mathbf{A}\mathbf{x}=(1\cdot2+2\cdot(-1),-1\cdot2+3\cdot(-1))^T=(0,-5)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

行列のshapeを $(m,n)$ と確認し、入力が長さ$n$、出力が長さ$m$になることを先に予測する。列の意味と行の意味を区別してから積を計算する。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 行列の行数と列数の意味を逆にしない。
- 行列を単なる表と見て、入力空間・出力空間を無視しない。
- 線形写像には原点を原点へ送る性質がある。平行移動は行列だけでは表せない。

特に、次の主張を自力で診断できるようにする。

> 「$2\times3$ 行列は $\mathbb{R}^2$ を $\mathbb{R}^3$ へ写す」

**診断**：逆である。列数3が入力次元、行数2が出力次元なので $\mathbb{R}^3\to\mathbb{R}^2$。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

ニューラルネットの線形層、回帰のdesign matrix、座標変換、画像変換はいずれもこの見方に直結する。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [OpenStax Precalculus 2e, Chapter 9: Systems of Equations and Inequalities](https://openstax.org/books/precalculus-2e/pages/9-introduction-to-systems-of-equations-and-inequalities)

## 演習へ

[10問の演習](/exercises/la-matrices-data-linear-maps)
