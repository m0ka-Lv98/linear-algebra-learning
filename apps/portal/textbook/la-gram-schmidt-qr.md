# Gram–Schmidt法とQR分解：教科書

## この章で理解すること

Gram–Schmidt法は、同じspanを保ったまま、ベクトル集合から互いに直交する方向を順番に取り出す。QR分解はその結果を行列としてまとめたもの。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-orthogonal-orthonormal-bases, orthogonal-projection。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

Gram–Schmidt法は、同じspanを保ったまま、ベクトル集合から互いに直交する方向を順番に取り出す。QR分解はその結果を行列としてまとめたもの。

<img src="/visuals/course-02/la-gram-schmidt-qr.png" alt="Gram–Schmidt法とQR分解の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

独立な列 $a_1,\ldots,a_n$ から $u_j=a_j-\sum_{i<j}\operatorname{proj}_{q_i}a_j$、$q_j=u_j/\|u_j\|$。すると $A=QR$。

代表式：

$$
\mathbf{A}=\mathbf{Q}\mathbf{R}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 独立な列を持つ入力行列（基本形）。
- $\mathbf{Q}\in\mathbb{R}^{m\times n}$: 同じ列空間を張る正規直交列を持つ行列。
- $\mathbf{R}\in\mathbb{R}^{n\times n}$: 上三角行列。
- QR分解は$\mathbf{A}$の列座標を直交基底$\mathbf{Q}$上の係数$\mathbf{R}$へ分離する。

## なぜこの式になるのか

新しい列から既に確保した直交方向の成分をすべて引けば、その残りは既存のq_iすべてに直交する。Rは各a_jのQ基底座標を持つ上三角行列。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$a_1=(1,1)^T$, $a_2=(1,0)^T$。$q_1=(1,1)/\sqrt2$、$u_2=(1,0)-(1/\sqrt2)q_1=(1/2,-1/2)$、$q_2=(1,-1)/\sqrt2$。

さらに確認問題：$a_1=(1,0,1)^T$, $a_2=(1,1,0)^T$ のGram–Schmidt第2残差 $u_2$ を求めよ。

**解答**：$q_1=a_1/\sqrt2$。$q_1^Ta_2=1/\sqrt2$ なので射影は $(1/2,0,1/2)^T$。よって $u_2=(1/2,1,-1/2)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

列を順に処理し、既存qへの射影を引く→ノルムで割る。実装では古典Gram–Schmidtよりmodified Gram–SchmidtやHouseholder QRが安定。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 入力列が従属だと途中の残差ノルムが0になる。
- 数値計算で古典GSは直交性を失いやすい。
- QとRのshapeを確認する（reduced QRかfull QRか）。

特に、次の主張を自力で診断できるようにする。

> 「Gram–Schmidtは入力ベクトルのspanを変える」

**診断**：各新ベクトルは元の列の線形結合であり、逆に元の列もQの線形結合で再現できるのでspanは同じ。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

最小二乗の安定解法、正規直交基底の生成、Krylov法。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-gram-schmidt-qr)
