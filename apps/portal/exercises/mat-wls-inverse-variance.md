# WLSと逆分散重み：演習

Course 07｜データ解析の行列手法

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：Gaussian likelihoodから逆分散重み

独立誤差$\varepsilon_i\sim N(0,\sigma_i^2)$、$y_i=\mathbf x_i^{\mathsf T}\boldsymbol\beta+\varepsilon_i$ とする。negative log-likelihoodからWLS objectiveを導け。

<details><summary>完全解答</summary>

likelihoodは各$i$で$(2\pi\sigma_i^2)^{-1/2}\exp[-r_i^2/(2\sigma_i^2)]$。negative logを足すと$\boldsymbol\beta$依存部分は$\frac12\sum_i r_i^2/\sigma_i^2$。従って$w_i=1/\sigma_i^2$、$\mathbf W=\operatorname{diag}(w_i)$として$r^{\mathsf T}\mathbf W r$を最小化する。

</details>

## 問題2：weighted normal equation

$J(\boldsymbol\beta)=(\mathbf y-\mathbf X\boldsymbol\beta)^{\mathsf T}\mathbf W(\mathbf y-\mathbf X\boldsymbol\beta)$、$\mathbf W$ symmetricとする。gradientを計算してnormal equationを導け。

<details><summary>完全解答</summary>

展開またはmatrix calculusより$\nabla_\beta J=-2\mathbf X^{\mathsf T}\mathbf W(\mathbf y-\mathbf X\boldsymbol\beta)$。zeroと置くと$\mathbf X^{\mathsf T}\mathbf W\mathbf X\hat\beta=\mathbf X^{\mathsf T}\mathbf W\mathbf y$。invertibleなら$\hat\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\mathbf y$。

</details>

## 問題3：scalar meanのWLS

共通平均$\mu$を観測$y=(0,2,10)$へfitする。weights $(1,1,0.1)$ のWLS推定値を求め、OLS平均4と比較せよ。

<details><summary>完全解答</summary>

$\hat\mu=\sum_iw_i y_i/\sum_iw_i=(0+2+1)/(1+1+0.1)=3/2.1=10/7\approx1.429$。大きい10のweightが0.1なのでOLSの4より影響が弱い。

</details>

## 問題4：全weightのscale

すべてのweightを$c>0$倍してもWLS minimizerが変わらないことを示せ。

<details><summary>完全解答</summary>

objectiveは$J_c=\sum_i(cw_i)r_i^2=cJ$。$c>0$は全candidateに同じpositive scaleを掛けるだけなのでargminは同じ。normal equationでも両辺に$c$が掛かりcancelする。

</details>

## 問題5：whiteningとの同値

$\mathbf W=\mathbf D^{\mathsf T}\mathbf D$ とする。WLSがtransformed data $\tilde{\mathbf X}=\mathbf D\mathbf X$, $\tilde{\mathbf y}=\mathbf D\mathbf y$ のOLSと同値であることを示せ。

<details><summary>完全解答</summary>

$J=(y-X\beta)^TW(y-X\beta)=(y-X\beta)^TD^TD(y-X\beta)=\|D(y-X\beta)\|^2=\|\tilde y-\tilde X\beta\|^2$。従って同じ$\beta$を最小化する。diagonal inverse-variance weightsなら$D=\operatorname{diag}(1/\sigma_i)$でresidualをstandard deviation単位へscaleする。

</details>

## 問題6：重みの向き

観測Aの標準偏差が1、観測Bが3なら、inverse variance WLSでA:Bのweight比はいくつか。

<details><summary>完全解答</summary>

varianceは1と9なのでweightsは1と1/9。比は9:1。標準偏差の逆数1:1/3ではなく、**varianceの逆数**を使う。

</details>

## 問題7：誤ったweightの影響

実際には高noiseな観測へ誤って大きいweightを与えた場合、WLS推定とreported uncertaintyにどんな問題が起こり得るか。

<details><summary>完全解答</summary>

高noise点を過信してfitがその点へ引かれ、効率が悪化しbias-likeな有限標本挙動も起こり得る。さらにweight modelを正しいvarianceとみなしてstandard errorを計算すると不確実性を過小/過大評価する。robust/sandwich SEやvariance model診断が必要な場合がある。

</details>

## 問題8：zero/negative weight

weight $w_i=0$ と $w_i<0$ の違いをobjectiveのgeometryから説明せよ。

<details><summary>完全解答</summary>

$w_i=0$はそのresidualをobjectiveから無視するためsemi-definite objectiveになり、identifiabilityが落ちることがある。$w_i<0$ではresidualを大きくするとobjectiveが下がる方向が生まれ、least-squares distanceとしての意味が壊れ、下に有界でない場合もある。variance由来weightは正である。

</details>

## 問題9：WLS residual orthogonality

WLS optimumで $\mathbf X^{\mathsf T}\mathbf W\mathbf r=0$ となる意味を、whitened spaceで説明せよ。

<details><summary>完全解答</summary>

$D^TD=W$とすると$X^TWr=(DX)^T(Dr)=0$。つまりraw Euclidean spaceではなく、scaleされたspaceでresidual $Dr$ がtransformed column space $\operatorname{Col}(DX)$にorthogonal。WLSはweighted geometryのprojectionである。

</details>

## 問題10：WLSからGLSへ

誤差に相関がありcovariance $\mathbf\Sigma$ がdiagonalでないとき、diagonal WLSだけでは不十分な理由とGLS objectiveを書け。

<details><summary>完全解答</summary>

diagonal weightsは各観測のvarianceだけを扱い、cross-covarianceを無視する。covarianceがpositive definiteならGLSは $(y-X\beta)^T\Sigma^{-1}(y-X\beta)$ を最小化する。Cholesky等で$L L^T=\Sigma$なら$L^{-1}$でwhiteningしてOLSへ帰着できる。

</details>

[教科書へ](/textbook/mat-wls-inverse-variance)
