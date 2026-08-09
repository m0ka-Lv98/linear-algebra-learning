# 行列ノルムと条件数：教科書

## この章で理解すること

行列ノルムは「行列がベクトルをどれだけ大きくできるか」を測り、条件数は「逆問題で入力誤差がどれだけ解へ増幅されうるか」を測る。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-singular-value-decomposition, la-inner-products-norms-angles。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

行列ノルムは「行列がベクトルをどれだけ大きくできるか」を測り、条件数は「逆問題で入力誤差がどれだけ解へ増幅されうるか」を測る。

<img src="/visuals/course-02/la-matrix-norms-condition-number.png" alt="行列ノルムと条件数の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\|A\|_2=\sigma_{\max}(A)$。可逆Aでは $\kappa_2(A)=\|A\|_2\|A^{-1}\|_2=\sigma_{\max}/\sigma_{\min}$。

代表式：

$$
\kappa_2(\mathbf{A})=\frac{\sigma_{\max}(\mathbf{A})}{\sigma_{\min}(\mathbf{A})}
$$

## 代表式の記号を定義する

- $\|\mathbf{A}\|_2=\sigma_{\max}(\mathbf{A})$: 2-normに対応するspectral norm。
- $\sigma_{\max},\sigma_{\min}$: 最大・最小特異値（可逆正方行列では$\sigma_{\min}>0$）。
- $\kappa_2(\mathbf{A})$: 2-norm条件数。入力・丸め誤差が解へどれだけ増幅され得るかの感度尺度。
- singularな行列では通常$\kappa_2=\infty$とみなす。

## なぜこの式になるのか

最大特異値方向は最も伸びる方向、最小特異値方向は最も潰れる方向。逆写像は後者を$1/\sigma_{min}$倍するため、比が大きいほど誤差に敏感。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\operatorname{diag}(100,1)$ は $\kappa_2=100$。第2方向と比較して第1方向のスケール差が大きく、逆問題の相対誤差が増幅されうる。

さらに確認問題：$A=\operatorname{diag}(5,0.1)$ の2-normと2-norm条件数を求めよ。

**解答**：特異値は5と0.1。$\|A\|_2=5$、$\kappa_2=5/0.1=50$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

用途に合うnormを選ぶ。2-norm/condition numberはSVDで評価。`cond(A)`を使い、値だけでなくスケーリングや特異値分布も確認。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 条件数はアルゴリズムの悪さではなく問題自体の感度。
- 大きなdetでも条件数が大きいことはある。
- $A^TA$を形成すると2-norm条件数が概ね二乗される。

特に、次の主張を自力で診断できるようにする。

> 「条件数が大きいのはソルバ実装が悪いから」

**診断**：条件数は問題の感度を表す。安定なアルゴリズムでもill-conditioned問題ではforward errorが大きくなりうる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

数値線形代数、WLSM、逆問題、正規方程式を避ける理由、モデルidentifiability。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

## 演習へ

[10問の演習](/exercises/la-matrix-norms-condition-number)
