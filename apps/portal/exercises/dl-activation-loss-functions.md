# activation関数とloss：演習

Course 09｜深層学習

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：ReLUの微分

$\operatorname{ReLU}(z)=\max(0,z)$ のderivativeを$z<0,z>0$で求め、$z=0$で何が起こるか説明せよ。

<details><summary>完全解答</summary>

$z<0$ではconstant0なのでderivative0、$z>0$ではidentityなので1。$z=0$では左右微分が0と1で一致せず通常の微分は存在しない。実装では0など特定のsubgradient conventionを選ぶ。

</details>

## 問題2：sigmoid saturation

$\sigma'(z)=\sigma(z)(1-\sigma(z))$ を使い、$z=0$と$z=8$付近のgradient magnitudeを比較せよ。

<details><summary>完全解答</summary>

$z=0$では$\sigma=0.5$なのでderivative0.25で最大。$z=8$では$\sigma\approx0.999665$、derivative$\approx0.000335$。saturated regionではgradientが非常に小さく、深いchainでvanishingへ寄与する。

</details>

## 問題3：BCEの数値比較

positive label$y=1$に対しprediction$p=0.9$と$p=0.1$のbinary cross-entropyを計算せよ。

<details><summary>完全解答</summary>

$y=1$では$L=-\log p$。$p=0.9$なら$L\approx0.105$、$p=0.1$なら$L\approx2.303$。誤って高confidenceなpredictionほど大きく罰される。

</details>

## 問題4：likelihoodからBCE

Bernoulli likelihoodから $L=-y\log p-(1-y)\log(1-p)$ を導け。

<details><summary>完全解答</summary>

Bernoulli pmfは$p^y(1-p)^{1-y}$。maximum likelihoodはlogを取ってもargmaxが同じで、negative logをminimizeする。$-\log p^y(1-p)^{1-y}=-y\log p-(1-y)\log(1-p)$。

</details>

## 問題5：sigmoid+BCEのgradient simplification

$p=\sigma(z)$のとき$\partial L/\partial z=p-y$を導き、なぜこの組合せが計算上便利か述べよ。

<details><summary>完全解答</summary>

$dL/dp=-y/p+(1-y)/(1-p)$、$dp/dz=p(1-p)$なので積が$p-y$へ簡約する。sigmoid derivativeの小さいfactorがalgebraicallycancelされる形になり、logit-level lossとしてstableに実装しやすい。ただし前段へのgradientはparameter/inputを通じて依然影響を受ける。

</details>

## 問題6：softmax cross-entropy

3 class logits $(2,1,0)$ のsoftmax probabilityを求め、true classが1番目のcross-entropyを計算せよ。

<details><summary>完全解答</summary>

$e^2,e^1,e^0\approx7.389,2.718,1$、sum=11.107。probabilities$\approx(0.665,0.245,0.090)$。true class1のCEは$-\log0.665\approx0.408$。

</details>

## 問題7：MSEをclassificationへ使う場合

binary classificationでsigmoid outputにMSEを使うことがBCEより一般にoptimization上不利になり得る理由を述べよ。

<details><summary>完全解答</summary>

MSE+sigmoidではgradientにadditional sigmoid derivative$p(1-p)$が掛かり、誤分類でsaturatedしたときgradientがさらに小さくなる。BCEはBernoulli likelihoodと整合しlogit gradientが$p-y$へ簡約する。MSEが数学的に禁止ではないがprobabilistic modelとgradient geometryが異なる。

</details>

## 問題8：dead ReLU

あるReLU unitが全training sampleでpre-activation$z<0$になった場合、standard ReLUでそのunitが回復しにくい理由を説明せよ。

<details><summary>完全解答</summary>

そのregionではReLU derivativeが0なので、そのunitへ流れるlocal gradientが0になりweight/biasがgradient descentで更新されない。Leaky ReLU等はnegative sideにsmall slopeを残してこのfailureを緩和する。

</details>

## 問題9：stable logit loss

$y=1,z=-1000$のBCEをnaiveにsigmoid→logで計算する問題と、logit formでの概算lossを述べよ。

<details><summary>完全解答</summary>

sigmoid(-1000)はfloating pointで0へunderflowしやすく$-\log0=\infty$。stable BCE-with-logitsではpositive labelのlossは$\operatorname{softplus}(-z)=\log(1+e^{1000})\approx1000$として有限に扱える。

</details>

## 問題10：図を統合して説明

activation/loss図の左側activation曲線と右側BCE曲線を使い、「network内部のnonlinearity」と「training objective」の役割を区別せよ。

<details><summary>完全解答</summary>

activationはhidden/logit computationのmappingを定め、signal/gradient propagationを変える。一方lossはmodel outputとtargetの不一致をscalar objectiveへ変換する。例えばsigmoidはlogitをprobabilityへ写し、BCEはそのprobabilityにBernoulli targetがどれだけ整合するかを測る。両者は組で使われても同じ概念ではない。

</details>

[教科書へ](/textbook/dl-activation-loss-functions)
