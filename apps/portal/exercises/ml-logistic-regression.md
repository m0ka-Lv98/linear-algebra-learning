# logistic回帰：演習

Course 08｜機械学習

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：log-oddsからsigmoid

$\log\frac{p}{1-p}=z$ を$p$について解き、$p=\sigma(z)$を導け。

<details><summary>完全解答</summary>

指数を取ると$p/(1-p)=e^z$。$p=e^z(1-p)$より$p(1+e^z)=e^z$、従って$p=e^z/(1+e^z)=1/(1+e^{-z})=\sigma(z)$。

</details>

## 問題2：Bernoulli likelihoodからBCE

label $y\in\{0,1\}$、predicted probability$p$のBernoulli likelihood $p^y(1-p)^{1-y}$ からnegative log-likelihoodを求めよ。

<details><summary>完全解答</summary>

$-\log[p^y(1-p)^{1-y}]=-y\log p-(1-y)\log(1-p)$。これがbinary cross-entropy。独立sampleなら全sampleで和または平均を取る。

</details>

## 問題3：数値prediction

$\mathbf x=(2,-1)$、$\mathbf w=(0.8,0.5)$、$b=-0.2$ のときlogitと$p(y=1|x)$を求めよ。

<details><summary>完全解答</summary>

$z=2(0.8)+(-1)(0.5)-0.2=0.9$。$p=\sigma(0.9)=1/(1+e^{-0.9})\approx0.711$。threshold 0.5ならclass1。

</details>

## 問題4：decision boundary

なぜthreshold 0.5のdecision boundaryが$\mathbf x^T\mathbf w+b=0$になるか。

<details><summary>完全解答</summary>

sigmoidはstrictly increasingで$\sigma(0)=0.5$。従って$p=0.5\iff z=0$。$z=\mathbf x^T\mathbf w+b$なのでboundaryはhyperplane$\mathbf x^T\mathbf w+b=0$。thresholdを0.5以外にすればboundaryのinterceptは変わる。

</details>

## 問題5：logit gradient

1 sampleのBCEで$p=\sigma(z)$とする。$\partial L/\partial z=p-y$ を導け。

<details><summary>完全解答</summary>

$L=-y\log p-(1-y)\log(1-p)$。$dL/dp=-y/p+(1-y)/(1-p)$、$dp/dz=p(1-p)$。積を取ると $dL/dz=-y(1-p)+(1-y)p=p-y$。

</details>

## 問題6：weight gradient

$z=\mathbf x^T\mathbf w+b$ と前問を使い、1 sampleの$\nabla_w L$を求めよ。

<details><summary>完全解答</summary>

chain ruleで$\nabla_wL=(\partial L/\partial z)(\partial z/\partial w)=(p-y)\mathbf x$。batchでは各sampleの$(p_i-y_i)x_i$を和または平均する。

</details>

## 問題7：完全分離

linearly separable dataでregularizationなしlogistic MLEの有限解が存在しない場合がある理由を説明せよ。

<details><summary>完全解答</summary>

分離hyperplaneの向きを保って$\|w\|$を大きくすると、positive sampleのlogitは$+\infty$、negativeは$-\infty$へ進み、likelihoodは1へ近づき続ける。有限parameterでmaximumに到達せずnormが発散し得る。L2 regularization等が有限解を与える。

</details>

## 問題8：calibrationとclassification

accuracyが高いlogistic classifierでもprobability calibrationが悪いことがある。accuracyとcalibrationが何を測るか区別せよ。

<details><summary>完全解答</summary>

accuracyはthreshold後のclass labelが合った割合。calibrationは予測probability0.8のsample群で実際に約80% positiveか等、probabilityの頻度解釈を測る。同じranking/boundaryでもprobability scaleが過信・過小信頼ならcalibrationは悪い。

</details>

## 問題9：numerical stability

BCEを`sigmoid(z)`の後に`log(p)`で直接計算すると$|z|$が大きいとき問題になる理由と対策を述べよ。

<details><summary>完全解答</summary>

large positive/negative logitではfloating pointで$p$が1や0へroundし、$\log(0)$やcancellationが起こる。実装はlogitsから直接`softplus`/log-sum-exp形式でBCEを計算する（例 $\max(z,0)-yz+\log(1+e^{-|z|})$）。

</details>

## 問題10：総合2-point fit

1次元で$x=-1$は$y=0$、$x=1$は$y=1$。$b=0$として$w>0$を大きくするとlossがどう変化するか説明せよ。

<details><summary>完全解答</summary>

logitsは$-w$と$+w$。両sampleのcorrect-class probabilityは$\sigma(w)$なのでtotal NLLは$-2\log\sigma(w)$。$w$を大きくすると$\sigma(w)\to1$でloss$\to0$、有限$w$で0にはならない。これは完全分離でMLE normが発散する最小例。

</details>

[教科書へ](/textbook/ml-logistic-regression)
