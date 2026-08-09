# 重み付き最小二乗法の導入：教科書

## この章で理解すること

重み付き最小二乗（WLS）は、残差をすべて同じ重要度で数えるのではなく、信頼度や分散に応じて方向ごとのペナルティを変える。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-least-squares-geometry。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

重み付き最小二乗（WLS）は、残差をすべて同じ重要度で数えるのではなく、信頼度や分散に応じて方向ごとのペナルティを変える。

<img src="/visuals/course-02/la-weighted-least-squares-introduction.png" alt="重み付き最小二乗法の導入の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\hat x=\arg\min_x (Ax-b)^T W(Ax-b)$。$W\succ0$ なら $C^TC=W$ を満たすCで $\|C(Ax-b)\|_2^2$ と等価。

代表式：

$$
\min_{\mathbf{x}}(\mathbf{A}\mathbf{x}-\mathbf{b})^{\mathsf T}\mathbf{W}(\mathbf{A}\mathbf{x}-\mathbf{b})
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: design matrix。
- $\mathbf{x}\in\mathbb{R}^n$: 推定係数、$\mathbf{b}\in\mathbb{R}^m$: 観測。
- $\mathbf{W}\in\mathbb{R}^{m\times m}$: 対称正定値または半正定値の重み行列。
- WLSはweighted least squares（重み付き最小二乗法）。対角$\mathbf{W}$なら各観測の残差へ異なる重みを付ける。

## なぜこの式になるのか

独立な観測誤差の分散が$\sigma_i^2$なら、$W=\operatorname{diag}(1/\sigma_i^2)$ とすると、ばらつきの小さい観測をより強く合わせる。これはwhitening後の通常LSと同じ。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

2観測の残差が同じ1でも、分散が1と9なら逆分散重みは1と1/9。第1観測のずれを第2より9倍強く罰する。

さらに確認問題：定数$c$を観測 $b=(1,5)^T$ に合わせる。重み $w=(4,1)$ のWLS解を求めよ。

**解答**：目的は $4(c-1)^2+(c-5)^2$。微分 $8(c-1)+2(c-5)=0$ より $10c-18=0$、$c=1.8$。重い第1観測へ近い。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

誤差共分散または重みを定義→Wが対称正定値か確認→Cholesky等でwhitening→QR/SVDでLSを解く。normal equationを直接形成しない。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 重みを「大きい分散ほど大きく」設定しない（逆分散が基本）。
- Wのスケール全体を定数倍しても最適解は変わらないが目的値は変わる。
- 相関誤差では対角Wだけでは不十分。

特に、次の主張を自力で診断できるようにする。

> 「WLSの重みを全部2倍すると推定値も2倍になる」

**診断**：目的関数全体が2倍になるだけでargminは同じ。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

ユーザーのWLSM学習、heteroscedastic regression、センサ統合、spectral unmixing。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.086, Lecture 22: Weighted Least Squares](https://ocw.mit.edu/courses/18-086-mathematical-methods-for-engineers-ii-spring-2006/resources/lecture-22-weighted-least-squares/)

## 演習へ

[10問の演習](/exercises/la-weighted-least-squares-introduction)
