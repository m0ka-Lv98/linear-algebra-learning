# 重み付き最小二乗法（WLS）：教科書

Course 02｜線形代数｜Topic 19/29

## このTopicの位置づけ

Topic 17–18では、通常のleast squaresで

$$
\|\mathbf A\mathbf x-\mathbf b\|_2^2
=
\sum_{i=1}^{m} r_i^2
$$

を最小化した。ここで $r_i$ は残差の第 $i$ 成分である。

この式は、すべての残差成分を同じ尺度・同じ重さで数えている。ところが問題によっては「第1成分の誤差1」と「第2成分の誤差1」を同じ大きさの失敗として扱いたくないことがある。そこで、各残差にあらかじめ正の重みを与える。

このTopicでは、まず**正の対角重み**だけを扱う。確率・分散・共分散はCourse 03で、positive definite matrixはTopic 24、Cholesky分解はTopic 25で正式に学ぶ。そのため、一般のcovariance matrixを使ったgeneralized least squaresはここでは先取りしない。

**前提Topic**：Topic 13 内積、Topic 17 最小二乗、Topic 18 最小二乗計算。

## まず直感を作る

通常のleast squaresでは残差ベクトル

$$
\mathbf r=(r_1,\ldots,r_m)^T
$$

の長さを

$$
\|\mathbf r\|_2^2=r_1^2+\cdots+r_m^2
$$

で測った。

WLSでは、各方向を先に

$$
\sqrt{w_1},\ldots,\sqrt{w_m}
$$

倍してからEuclidean lengthを測る。$w_i$ が大きければ第 $i$ 成分のずれが強く罰せられ、$w_i$ が小さければ同じ絶対残差でも影響が小さくなる。

したがってWLSの本質は「新しい回帰公式」ではなく、**残差空間で距離の測り方を変えること**である。

## 図の解説

<img src="/visuals/course-02/la-weighted-least-squares-introduction.png" alt="重み付き最小二乗法の図解" style="max-height:430px;display:block;margin:0 auto;" />

図では、各観測点のそばに異なる大きさの縦方向の目安が描かれている。ここではそれを確率的な「標準偏差」とはまだ解釈せず、単に**残差ごとの重みの違い**を視覚化している。

重みが大きい点では、同じ縦ずれでも目的関数への寄与 $w_i r_i^2$ が大きくなる。そのため推定直線は、その点から大きく離れることを避ける方向へ動く。重みが小さい点では同じずれを比較的弱く評価する。

この違いは、データ点そのものを上下へ動かしているのではない。**どのずれをどれだけ大きな誤差として数えるか**を変えている。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$：design matrix。
- $\mathbf x\in\mathbb R^n$：未知係数。
- $\mathbf b\in\mathbb R^m$：観測ベクトル。
- $\mathbf r=\mathbf b-\mathbf A\mathbf x\in\mathbb R^m$：残差。
- $w_i>0$：第 $i$ 残差へ与えるscalar weight。
- $\mathbf W=\operatorname{diag}(w_1,\ldots,w_m)\in\mathbb R^{m\times m}$：対角重み行列。

このTopicでは $w_i$ は**問題設定として与えられる正の数**とする。確率的な決め方は後続Courseへ送る。

## 1. scalar formから出発する

WLSの目的関数を

$$
\boxed{
J(\mathbf x)=
\sum_{i=1}^{m} w_i r_i^2
}
$$

と定義する。

$w_i=1$ がすべての $i$ で成立すれば

$$
J(\mathbf x)=\sum_i r_i^2
$$

なので、通常のleast squaresへ戻る。

つまりWLSは通常LSを含む一般化である。

## 2. なぜ行列式が $r^TWr$ になるのか

$\mathbf W$ は対角行列なので

$$
\mathbf W\mathbf r
=
\begin{bmatrix}
w_1r_1\\
\vdots\\
w_mr_m
\end{bmatrix}.
$$

左から $\mathbf r^T$ を掛けると

$$
\mathbf r^T\mathbf W\mathbf r
=r_1(w_1r_1)+\cdots+r_m(w_mr_m).
$$

したがって

$$
\boxed{
\mathbf r^T\mathbf W\mathbf r
=
\sum_{i=1}^{m}w_i r_i^2
}.
$$

よってWLSは

$$
\boxed{
\hat{\mathbf x}
=
\arg\min_{\mathbf x}
(\mathbf b-\mathbf A\mathbf x)^T
\mathbf W
(\mathbf b-\mathbf A\mathbf x)
}
$$

と書ける。

## 3. なぜ $\sqrt{w_i}$ でscaleすれば通常LSになるのか

正の重み $w_i>0$ なので $\sqrt{w_i}$ が実数として定義できる。

$$
\mathbf D
=
\operatorname{diag}(\sqrt{w_1},\ldots,\sqrt{w_m})
$$

と置く。すると

$$
\mathbf D^T\mathbf D
=
\operatorname{diag}(w_1,\ldots,w_m)
=
\mathbf W.
$$

$\mathbf D$ は対角なので $\mathbf D^T=\mathbf D$ だが、式の構造を見せるため $\mathbf D^T\mathbf D$ と書いている。

目的関数は

$$
\begin{aligned}
\mathbf r^T\mathbf W\mathbf r
&=\mathbf r^T\mathbf D^T\mathbf D\mathbf r\\
&=(\mathbf D\mathbf r)^T(\mathbf D\mathbf r)\\
&=\|\mathbf D\mathbf r\|_2^2.
\end{aligned}
$$

したがって

$$
\boxed{
J(\mathbf x)
=
\|\mathbf D(\mathbf b-\mathbf A\mathbf x)\|_2^2
}.
$$

ここで

$$
\widetilde{\mathbf A}=\mathbf D\mathbf A,
\qquad
\widetilde{\mathbf b}=\mathbf D\mathbf b
$$

と置けば

$$
J(\mathbf x)
=
\|\widetilde{\mathbf b}-
\widetilde{\mathbf A}\mathbf x\|_2^2.
$$

つまりWLSは、各方程式を $\sqrt{w_i}$ 倍した後に通常のleast squaresを解くことと同じ。

## 4. weighted normal equationを導く

変換後の通常least squaresにTopic 17のnormal equationを適用する。

$$
\widetilde{\mathbf A}^T
\widetilde{\mathbf A}\hat{\mathbf x}
=
\widetilde{\mathbf A}^T
\widetilde{\mathbf b}.
$$

$\widetilde{\mathbf A}=\mathbf D\mathbf A$、$\widetilde{\mathbf b}=\mathbf D\mathbf b$ を代入する。

左辺は

$$
(\mathbf D\mathbf A)^T
(\mathbf D\mathbf A)
=
\mathbf A^T\mathbf D^T\mathbf D\mathbf A
=
\mathbf A^T\mathbf W\mathbf A.
$$

右辺は

$$
(\mathbf D\mathbf A)^T\mathbf D\mathbf b
=
\mathbf A^T\mathbf D^T\mathbf D\mathbf b
=
\mathbf A^T\mathbf W\mathbf b.
$$

したがって

$$
\boxed{
\mathbf A^T\mathbf W\mathbf A\hat{\mathbf x}
=
\mathbf A^T\mathbf W\mathbf b
}.
$$

この式は突然の新公式ではない。**重みでscaleした通常least squaresのnormal equation**である。

## 5. weighted orthogonalityはどう読むか

$\hat{\mathbf r}=\mathbf b-\mathbf A\hat{\mathbf x}$ とすると、weighted normal equationは

$$
\boxed{
\mathbf A^T\mathbf W\hat{\mathbf r}=\mathbf0
}
$$

と書ける。

対角 $\mathbf W$ の場合、これは

$$
(\mathbf D\mathbf A)^T
(\mathbf D\hat{\mathbf r})=0
$$

と同じ。

つまり元の空間で普通に $\hat{\mathbf r}$ が列空間へ直交するのではなく、**重みでscaleした空間では、scale後の残差がscale後の列空間へ直交する**。

これがWLSの幾何である。

## 6. 小さな数値例：重みを変えると解がどう動くか

未知scalar $x$ で三つの値を近似する最も単純な問題を考える。

$$
\mathbf A=
\begin{bmatrix}
1\\1\\1
\end{bmatrix},
\qquad
\mathbf b=
\begin{bmatrix}
0\\2\\10
\end{bmatrix}.
$$

モデルは三つの観測を一つの定数 $x$ で近似する。

### 通常LS

すべての重みを1とすると

$$
J(x)=x^2+(2-x)^2+(10-x)^2.
$$

normal equationでも、単純に平均を取っても

$$
\hat x=\frac{0+2+10}{3}=4.
$$

### 第3観測の重みを小さくする

$$
\mathbf W=
\operatorname{diag}(1,1,0.1)
$$

とする。weighted normal equationは

$$
\mathbf A^T\mathbf W\mathbf A\hat x
=
\mathbf A^T\mathbf W\mathbf b.
$$

左辺の係数は

$$
\mathbf A^T\mathbf W\mathbf A
=1+1+0.1=2.1.
$$

右辺は

$$
\mathbf A^T\mathbf W\mathbf b
=1\cdot0+1\cdot2+0.1\cdot10=3.
$$

したがって

$$
\boxed{
\hat x=\frac{3}{2.1}\approx1.43
}.
$$

通常LSの4から大きく下がった。第3観測10を「無視した」のではない。重み0.1で目的関数へ残しているが、他の二点より弱く影響させた結果である。

## 7. 重み全体を同じ定数倍しても解が変わらない理由

すべての重みを正の定数 $c>0$ 倍すると

$$
J_c(\mathbf x)
=cJ(\mathbf x).
$$

任意の二つの候補 $\mathbf x_1,\mathbf x_2$ について

$$
J(\mathbf x_1)<J(\mathbf x_2)
$$

なら

$$
cJ(\mathbf x_1)<cJ(\mathbf x_2).
$$

したがって最小点の位置は変わらない。変わるのは目的関数値のscaleだけ。

この性質から、WLSで本質的なのは重みの**相対比**であることが分かる。

## 8. 0重みや負の重みをどう考えるか

このTopicでは $w_i>0$ と仮定した。

### $w_i=0$

第 $i$ 残差の寄与

$$
w_i r_i^2
$$

が常に0になる。その観測は目的関数から完全に無視される。数学的に扱える場合もあるが、$\mathbf D$ はその方向で逆変換できなくなり、解の一意性にも影響しうる。

### $w_i<0$

残差を大きくするほど目的関数が小さくなる方向が生じうる。これは「距離の二乗」としての意味を失う。そのためleast-squaresの重みとしては正の重みを基本とする。

## 9. 確率的なinverse-variance weightingは後で学ぶ

実際の計測では、観測ごとにばらつきが異なるとき

$$
w_i\propto\frac{1}{\text{variance}_i}
$$

とする考え方がよく現れる。

ただし、ここでvarianceを未定義のまま詳しく使うと学習順を飛ばす。したがってこのCourseでは

- WLSの線形代数：正の重みが**与えられた**として解く。
- Course 03：random variable、variance、covarianceを定義する。
- その後：なぜinverse varianceが統計的に自然なのかを導く。

という順序にする。

## 10. 一般の重み行列への拡張も後で行う

このTopicでは

$$
\mathbf W=\operatorname{diag}(w_1,\ldots,w_m)
$$

だけを扱った。

残差成分どうしの関係まで含める場合は、非対角成分を持つ一般の対称重み行列が必要になる。しかしその説明には

- positive definite matrix（Topic 24）
- Cholesky factorization（Topic 25）
- covariance matrix（Course 03）

が必要である。

したがってgeneralized least squaresやfull covariance weightingは、これらを学んだ後の発展として扱う。

## 成立条件・壊れる場合

- このTopicでは $w_i>0$ を仮定する。
- $\mathbf W$ は対角行列とし、一般の相関構造はまだ扱わない。
- 重みを大きくすることは、その残差成分のずれを目的関数で強く罰することを意味する。
- 全重みを同じ正定数倍してもminimizerは変わらない。
- 重みの「正しい選び方」は線形代数だけでは決まらない。問題の物理・測定モデル、後には確率モデルが必要になる。

## ここから先へ進む順序

このTopicでは

$$
\text{ordinary LS}
\rightarrow
\text{positive diagonal weights}
\rightarrow
\text{row scaling by }\sqrt{w_i}
\rightarrow
\text{weighted normal equation}
$$

までを理解する。

その後、Topic 24–25でpositive definite matrixとCholeskyを学び、Course 03でvariance/covarianceを学んだ後に、一般のcovariance-weighted least squaresへ拡張できる。

## テストで説明できる状態の目安

- $\sum_i w_i r_i^2$ と $\mathbf r^T\mathbf W\mathbf r$ の一致を成分から示せる。
- $\mathbf D=\operatorname{diag}(\sqrt{w_i})$ で通常LSへ変換できる理由を示せる。
- weighted normal equationを変換後のnormal equationから導ける。
- 重みを変えたとき解がどちらへ動くか、小さな例で予測・計算できる。
- inverse varianceやfull covarianceを、このTopicの前提として使わず「後続の統計的解釈」と区別できる。

## 外部教材との照合

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

通常least squaresを基礎にし、WLSはまずrow scalingとして導入した。統計的な重みの意味はCourse 03以降へ明示的に送っている。

## 演習

[このTopicの10問の演習](/exercises/la-weighted-least-squares-introduction)
