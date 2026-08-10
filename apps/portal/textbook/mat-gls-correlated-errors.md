# GLSと相関誤差：教科書

Course 07｜データ解析の行列手法｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-wls-inverse-variance` で得た概念を使い、ここでは GLSと相関誤差 へ進む。

前提として使うのは `mat-wls-inverse-variance`、`prob-multivariate-normal-distribution` です。

## まず直感を作る

観測ごとの信頼度が異なるとき、残差を同じ重みで扱わず、分散の小さい観測を強く反映する。



## 図の解説

<img src="/visuals/course-07/mat-gls-correlated-errors.png" alt="GLSと相関誤差の図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ散布点にOLSと逆分散WLSを当て、誤差バーの小さい点へ線が寄る様子を見る。 各点から回帰線への残差に異なる重みが掛かる。分散の小さい観測ほど信頼度が高いとき1/σ_i²で重くするのはGaussian likelihoodから導かれる。

## 記号・型・次元

- $Cov(\varepsilon)=\Sigma\succ0$
- $\Sigma^{-1}$：precision
- $L L^T=\Sigma$：Cholesky


## 正式な定義・代表式

GLSはcorrelated Gaussian noiseでnegative log likelihoodに現れるMahalanobis residual $r^T\Sigma^{-1}r$ を最小化する。

代表式は

$$
\min_{\boldsymbol{\beta}}(\mathbf{y}-\mathbf{X}\boldsymbol{\beta})^{\mathsf T}\mathbf{\Sigma}^{-1}(\mathbf{y}-\mathbf{X}\boldsymbol{\beta})
$$

です。

## なぜこの式・結論になるのか

### 1. Gaussian log likelihood

$-\log p(y|β)=const+\frac12r^TΣ^{-1}r+\frac12\log|Σ|$。Σ fixedならβに関係するのはquadratic term。

### 2. whitening

$Σ=LL^T$ とし $L^{-1}r$ のEuclidean normを最小化。$r^TΣ^{-1}r=\|L^{-1}r\|²$。

### 3. GLS normal equation

$X^TΣ^{-1}X\hatβ=X^TΣ^{-1}y$。WLSはΣ diagonalのspecial case。

## 教科書が省略しやすい一段を補う


### GLSは相関誤差をwhiteningしてOLSへ戻す

$\varepsilon\sim N(0,\Sigma)$ としoff-diagonal covarianceを許すとnegative log likelihoodは
$$
(y-X\beta)^T\Sigma^{-1}(y-X\beta)
$$
(up to constants)。Cholesky $\Sigma=LL^T$ なら両辺へ $L^{-1}$ を作用させ、$y'=L^{-1}y$, $X'=L^{-1}X$ とするとerror covarianceはI。したがってGLSはwhitened coordinatesでOLS。

WLSはSigma diagonalの特別な場合。correlationを無視してOLS coefficientがunbiasedな場合でもstandard errorやefficiencyが悪化しうる。Sigma estimationとmodel misspecificationを別問題として診断する。


### correlationがeffective informationを減らす例

二観測が同じvariance σ²、correlation ρなら covariance matrixは $\sigma^2\begin{bmatrix}1&\rho\\\rho&1\end{bmatrix}$。ρ→1では二観測がほぼ同じnoiseを共有し、独立2回分のinformationはない。OLSで「n=2 independent」と扱うstandard errorは過小評価し得る。

GLS whiteningはsum/difference directionsへ回転し、それぞれvariance σ²(1+ρ), σ²(1-ρ)でscaleする。correlation matrixのeigen directionsとして理解できる。

## 途中を飛ばさず全体をつなぐ

### GLSと相関誤差の導出を一本につなげる

GLSはcorrelated Gaussian noiseでnegative log likelihoodに現れるMahalanobis residual $r^T\Sigma^{-1}r$ を最小化する。

#### 1. Gaussian log likelihood

まず出発点を固定する。 $-\log p(y|β)=const+\frac12r^TΣ^{-1}r+\frac12\log|Σ|$。Σ fixedならβに関係するのはquadratic term。 次に必要になるのは「whitening」である。

#### 2. whitening

ここまでで得た結果を次の段階へ渡す。 $Σ=LL^T$ とし $L^{-1}r$ のEuclidean normを最小化。$r^TΣ^{-1}r=\|L^{-1}r\|²$。 次に必要になるのは「GLS normal equation」である。

#### 3. GLS normal equation

最後に、前二段階の結果をまとめて結論へ進む。 $X^TΣ^{-1}X\hatβ=X^TΣ^{-1}y$。WLSはΣ diagonalのspecial case。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\boldsymbol{\beta}}(\mathbf{y}-\mathbf{X}\boldsymbol{\beta})^{\mathsf T}\mathbf{\Sigma}^{-1}(\mathbf{y}-\mathbf{X}\boldsymbol{\beta})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

time series residualが隣接時点でpositive correlatedなら独立WLSよりeffective informationが少ない。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Σ=σ²Iならconstant scaleがcancelしOLSへ戻る。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Σ estimated poorly/singularならinverse unstable。correlation structureを無視したstandard errorsは過小評価し得る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

time series residualが隣接時点でpositive correlatedなら独立WLSよりeffective informationが少ない。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Σ=σ²Iならconstant scaleがcancelしOLSへ戻る。

## 成立条件と、条件を外したときに何が壊れるか

- Wは通常対称正定値を想定する。
- 重みを大きくする意味は「その点を信頼する」こと。
- GLSと相関誤差の定義と計算手順を区別し、数値例だけで一般性を判断しない。

Σ estimated poorly/singularならinverse unstable。correlation structureを無視したstandard errorsは過小評価し得る。

## よくある誤解を分解する

- GLSと相関誤差の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

GLSと相関誤差では、式へ数値を代入するだけでは不十分である。Σ estimated poorly/singularならinverse unstable。correlation structureを無視したstandard errorsは過小評価し得る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

Cholesky triangular solveでwhitenしinverseを作らない。structured covariance(AR,block)を利用。

## ここから一段だけ発展する

regularizationはnoise modelとは別にcoefficient complexityへconstraint/penaltyを加える。


## このTopicを理解できたか確認する問い

- 「Gaussian log likelihood」を式を見ずに説明できるか
- 「GLS normal equation」までの論理を一段ずつ再現できるか
- GLSと相関誤差の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-gls-correlated-errors)　|　[スライドへ](/slides/mat-gls-correlated-errors/)
