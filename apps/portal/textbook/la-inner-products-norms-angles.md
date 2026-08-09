# 内積・ノルム・角度：教科書

## この章で理解すること

内積は二つのベクトルの「向きの一致度」を数値化し、ノルムは長さを与える。角度はこの二つを正規化した量として得られる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-vectors-linear-combinations。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

内積は二つのベクトルの「向きの一致度」を数値化し、ノルムは長さを与える。角度はこの二つを正規化した量として得られる。

<img src="/visuals/course-02/la-inner-products-norms-angles.png" alt="内積・ノルム・角度の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

標準内積は $\langle x,y\rangle=x^Ty$、$\|x\|_2=\sqrt{x^Tx}$、非零ベクトルの角度は $\cos\theta=(x^Ty)/(\|x\|_2\|y\|_2)$。

代表式：

$$
\cos\theta=\frac{\mathbf{x}^{\mathsf T}\mathbf{y}}{\|\mathbf{x}\|_2\|\mathbf{y}\|_2}
$$

## 代表式の記号を定義する

- $\mathbf{x},\mathbf{y}\in\mathbb{R}^n$: 比較する非zeroベクトル。
- $\mathbf{x}^{\mathsf T}\mathbf{y}$: Euclidean内積。
- $\|\mathbf{x}\|_2$: Euclidean norm（2-norm）。
- $\theta\in[0,\pi]$: 2ベクトルのなす角。

## なぜこの式になるのか

Cauchy–Schwarz不等式により $|x^Ty|\le\|x\|\|y\|$ なので比は[-1,1]に入り、余弦として解釈できる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$x=(1,1)^T$, $y=(1,0)^T$。内積1、長さ$\sqrt2$と1なので $\cos\theta=1/\sqrt2$、$\theta=45^\circ$。

さらに確認問題：$x=(2,-1,2)^T$, $y=(1,2,0)^T$ の内積とノルムを求めよ。

**解答**：$x^Ty=2-2+0=0$。$\|x\|_2=3$、$\|y\|_2=\sqrt5$。したがって直交。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

内積→各ノルム→0ベクトルでないこと確認→cosを計算。数値誤差でcosがわずかに[-1,1]を外れたらclipしてacosする。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 0ベクトルとの角度は定義しない。
- 内積0は直交を意味するが、独立性一般とは別概念。
- cosine similarityとEuclidean distanceは異なる尺度。

特に、次の主張を自力で診断できるようにする。

> 「内積が小さければ必ず角度が90度に近い」

**診断**：スケール依存なので誤り。角度を見るにはノルムで正規化したcosineを使う。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

射影、Gram–Schmidt、類似度、最小二乗、正規直交基底の基礎。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-inner-products-norms-angles)
