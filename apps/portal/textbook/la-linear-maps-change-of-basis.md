# 線形写像と基底変換：教科書

## この章で理解すること

同じ線形写像でも、基底を変えると行列表現は変わる。基底変換は「幾何学的対象を変える」のではなく「座標の書き方を変える」操作である。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-basis-coordinates-dimension, la-matrices-data-linear-maps。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

同じ線形写像でも、基底を変えると行列表現は変わる。基底変換は「幾何学的対象を変える」のではなく「座標の書き方を変える」操作である。

<img src="/visuals/course-02/la-linear-maps-change-of-basis.png" alt="線形写像と基底変換の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$P_{C\leftarrow B}$ はB座標をC座標へ変換し $[x]_C=P_{C\leftarrow B}[x]_B$。同一空間の線形写像Aは $[T]_C=P^{-1}[T]_B P$ のようにsimilarityで変わる。

代表式：

$$
[\mathbf{x}]_{\mathcal{C}}=\mathbf{P}_{\mathcal{C}\leftarrow\mathcal{B}}[\mathbf{x}]_{\mathcal{B}}
$$

## 代表式の記号を定義する

- $\mathcal{B},\mathcal{C}$: 同じベクトル空間の2つの順序付き基底。
- $[\mathbf{x}]_{\mathcal{B}},[\mathbf{x}]_{\mathcal{C}}$: 同じ幾何学的ベクトル$\mathbf{x}$の各基底での座標。
- $\mathbf{P}_{\mathcal{C}\leftarrow\mathcal{B}}$: $\mathcal{B}$座標を$\mathcal{C}$座標へ変換する基底変換行列。
- 矢印$\mathcal{C}\leftarrow\mathcal{B}$は「入力が$\mathcal{B}$、出力が$\mathcal{C}$」を表す。

## なぜこの式になるのか

まずB座標から実ベクトルへ戻し、次にC座標へ読み替える。この2段階を合成したものが基底変換行列。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$B=((1,1),(1,-1))$, 標準基底E。$P_{E\leftarrow B}=\begin{bmatrix}1&1\\1&-1\end{bmatrix}$。B座標$(3,1)$は標準座標$(4,2)$へ変わる。

さらに確認問題：$B=((1,1)^T,(1,-1)^T)$。$[x]_B=(2,-1)^T$ を標準座標へ変換せよ。

**解答**：$x=2(1,1)-1(1,-1)=(1,3)^T$。変換行列を使っても $\begin{bmatrix}1&1\\1&-1\end{bmatrix}(2,-1)^T=(1,3)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

「どこからどこへ」を添字で固定する→基底ベクトルを適切な座標で列に並べる→必要なら逆行列で逆方向を得る。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- $P_{C\leftarrow B}$ と $P_{B\leftarrow C}$ を取り違えない。
- similarity変換の左右の順序を暗記だけで使わない。
- 基底変更で固有値は変わらない。

特に、次の主張を自力で診断できるようにする。

> 「基底を変えるとベクトル自体も別の幾何学的ベクトルになる」

**診断**：変わるのは座標表示。対象ベクトルや線形写像そのものは同じ。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

固有分解、対角化、PCA、物理の座標系、表現学習で同じ対象を便利な座標へ移す。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.700 Linear Algebra](https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/)

## 演習へ

[10問の演習](/exercises/la-linear-maps-change-of-basis)
