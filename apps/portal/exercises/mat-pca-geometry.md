# PCAの幾何学：演習

Course 07｜データ解析の行列手法

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：中心化の理由

data matrix $\mathbf X\in\mathbb R^{n\times p}$ の各列平均を引いて$\mathbf X_c$を作る理由を、PCAが何のvarianceを測るかという観点から説明せよ。

<details><summary>完全解答</summary>

PCAは平均からの偏差のvarianceを最大化する方向を探す。中心化しないと$\|\mathbf X\mathbf v\|^2$にmean offsetの大きさが混ざり、原点から遠い方向を選ぶ可能性がある。$\mathbf X_c$なら各feature meanが0で、$\mathbf S=(n-1)^{-1}\mathbf X_c^{\mathsf T}\mathbf X_c$がsample covarianceになる。

</details>

## 問題2：projected varianceを導く

unit vector $\mathbf v\in\mathbb R^p$ に投影したscore $\mathbf z=\mathbf X_c\mathbf v$ のsample varianceが $\mathbf v^{\mathsf T}\mathbf S\mathbf v$ になることを示せ。

<details><summary>完全解答</summary>

中心化済みなので$\mathbf z$の平均は0。sample varianceは$(n-1)^{-1}\mathbf z^{\mathsf T}\mathbf z=(n-1)^{-1}\mathbf v^{\mathsf T}\mathbf X_c^{\mathsf T}\mathbf X_c\mathbf v=\mathbf v^{\mathsf T}\mathbf S\mathbf v$。

</details>

## 問題3：unit norm constraint

$\max_{\mathbf v}\mathbf v^{\mathsf T}\mathbf S\mathbf v$ に$\|\mathbf v\|=1$が必要な理由を示せ。

<details><summary>完全解答</summary>

constraintがなければ、varianceが正の方向$\mathbf v$について$c\mathbf v$を使うとobjectiveは$c^2\mathbf v^{\mathsf T}\mathbf S\mathbf v$となり$c\to\infty$で無限大。方向だけ比較するためscaleを固定する$\|\mathbf v\|=1$が必要。

</details>

## 問題4：eigenvalue problem

Lagrange multiplierを使って $\max_{\|\mathbf v\|=1}\mathbf v^{\mathsf T}\mathbf S\mathbf v$ から $\mathbf S\mathbf v=\lambda\mathbf v$ を導け。

<details><summary>完全解答</summary>

$L(\mathbf v,\lambda)=\mathbf v^{\mathsf T}\mathbf S\mathbf v-\lambda(\mathbf v^{\mathsf T}\mathbf v-1)$。$\mathbf S$ symmetricなので$\nabla_v L=2\mathbf S\mathbf v-2\lambda\mathbf v=0$、従って$\mathbf S\mathbf v=\lambda\mathbf v$。objective at unit eigenvectorは$\lambda$なので最大eigenvalueのeigenvectorが第1PC。

</details>

## 問題5：2D数値例

$\mathbf S=\begin{bmatrix}4&0\\0&1\end{bmatrix}$ の第1・第2principal componentとexplained variance ratioを求めよ。

<details><summary>完全解答</summary>

eigenvaluesは4,1、eigenvectorsは$\mathbf e_1,\mathbf e_2$。第1PCはx1方向、第2PCはx2方向。総variance=5なのでexplained variance ratioは第1$4/5=0.8$、第2$1/5=0.2$。

</details>

## 問題6：reconstruction errorとの同値

unit vector $\mathbf v$ へのrank-1 projection $\hat{\mathbf X}=\mathbf X_c\mathbf v\mathbf v^{\mathsf T}$ について、$\|\mathbf X_c-\hat{\mathbf X}\|_F^2=\|\mathbf X_c\|_F^2-\|\mathbf X_c\mathbf v\|_2^2$ を説明し、variance最大化との関係を述べよ。

<details><summary>完全解答</summary>

$\mathbf v\mathbf v^{\mathsf T}$はorthogonal projectorなので、各row vectorはprojected componentとorthogonal residualへPythagoras分解される。全rowで足すとFrobenius normの式になる。$\|\mathbf X_c\|_F^2$は$\mathbf v$に依存しないため、reconstruction error最小化は$\|\mathbf X_c\mathbf v\|^2$、すなわちprojected variance最大化と同値。

</details>

## 問題7：scale依存性

身長(cm)と体重(kg)の2featureにPCAを直接適用する場合とstandardize後に適用する場合で結果が変わり得る理由を説明せよ。

<details><summary>完全解答</summary>

covariance PCAは数値scaleに依存する。unitが大きくvarianceも大きいfeatureがprincipal directionを支配し得る。standardizeしてvariance 1にすると実質correlation matrix PCAとなり、relative correlation structureを強く反映する。どちらが正しいかは目的とunitに依存する。

</details>

## 問題8：SVDとの対応

$\mathbf X_c=\mathbf U\mathbf\Sigma\mathbf V^{\mathsf T}$ とするとPCA directionが$\mathbf V$になる理由を示せ。

<details><summary>完全解答</summary>

$\mathbf S=(n-1)^{-1}\mathbf X_c^{\mathsf T}\mathbf X_c=(n-1)^{-1}\mathbf V\mathbf\Sigma^{\mathsf T}\mathbf\Sigma\mathbf V^{\mathsf T}$。従ってcovariance eigenvectorsはright singular vectors$\mathbf V$、eigenvaluesは$\sigma_i^2/(n-1)$。

</details>

## 問題9：図の読み取り

scatterが細長い斜め楕円を作り、第1PCの矢印が長軸に沿う。なぜminor axisではなくmajor axisが第1PCになるか。

<details><summary>完全解答</summary>

第1PCはunit directionへのprojected varianceを最大化する。楕円のmajor axis方向へprojectionするとpointのspreadが最も大きく、minor axisは最小。covariance eigenvalueでもmajor axisに大きいeigenvalueが対応する。

</details>

## 問題10：PCAの限界

two moonsのような曲がった1次元manifoldにPCAを1成分使うと情報を失う理由を説明せよ。

<details><summary>完全解答</summary>

PCAはglobal linear subspaceへのprojectionなので、曲がったmanifoldを1本の直線で近似する。局所的には1次元でもglobalには曲率があり、異なる部分が同じprojection coordinateへ重なる可能性がある。PCAの低次元性はlinear low-rank structureを仮定している。

</details>

[教科書へ](/textbook/mat-pca-geometry)
