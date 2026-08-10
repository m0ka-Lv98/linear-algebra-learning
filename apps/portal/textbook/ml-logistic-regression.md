# logistic回帰：教科書

Course 08｜機械学習｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-linear-regression` で得た概念を使い、ここでは logistic回帰 へ進む。

前提として使うのは `stat-likelihood-maximum-likelihood`、`opt-convex-sets-functions` です。

## まず直感を作る

分類器は入力からクラス確率またはスコアを作り、決定境界でクラスを分ける。



## 図の解説

<img src="/visuals/course-08/ml-logistic-regression.png" alt="logistic回帰の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2クラス点群と確率等高線、decision boundaryを描く。 背景の確率面がP(y=1|x)、その0.5等高線がdecision boundary、点が観測データである。モデルの連続な確率出力と離散な最終分類を区別できる。

## 記号・型・次元

- $z=x^Tw+b$
- $\sigma(z)=1/(1+e^{-z})$
- $p=P(Y=1|x)$


## 正式な定義・代表式

logistic regressionはlog-oddsをlinear model $\log[p/(1-p)]=z$ と仮定し、Bernoulli likelihoodを最大化する。

代表式は

$$
p(y=1\mid\mathbf{x})=\sigma(\mathbf{x}^{\mathsf T}\mathbf{w}+b)
$$

です。

## なぜこの式・結論になるのか

### 1. log-oddsからprobability

$p/(1-p)=e^z$ をpについて解くと $p=e^z/(1+e^z)=\sigma(z)$。

### 2. negative log likelihood

Bernoulli likelihood $p^y(1-p)^{1-y}$ の-negative logはbinary cross entropy。

### 3. decision boundary

p=0.5 iff z=0なのでboundaryは $x^Tw+b=0$。thresholdを変えるとboundary levelが変わる。

## 教科書が省略しやすい一段を補う


### log-odds仮定からlossと境界まで一続きに導く

linear score $z=\mathbf w^T\mathbf x+b$ をlog-oddsと置く：$\log\{p/(1-p)\}=z$。指数を取って $p/(1-p)=e^z$、pについて解けば $p=1/(1+e^{-z})$。この段階でsigmoidは「便利な0–1変換」として選んだのではなく、log-oddsをlinearにする仮定から必然的に出る。

Bernoulli likelihoodは $p^y(1-p)^{1-y}$。negative logを取ると $-y\log p-(1-y)\log(1-p)$、datasetで足したものがbinary cross entropy。decision threshold 0.5ならp=0.5⇔z=0なのでhyperplane $\mathbf w^T\mathbf x+b=0$ が境界。loss、probability、hard classificationは同じものではなく三段階を分ける。


### cross entropyをzだけの式へ変えて数値安定性を見る

y∈{0,1}, p=σ(z)とするとlossは $-y\log\sigma(z)-(1-y)\log(1-\sigma(z))$。これは
$$
\log(1+e^z)-yz
$$
と同値。zが非常に負/正でもsoftplus/logaddexpを使えば、sigmoidを先に0/1へ丸めてlog(0)を取る危険を避けられる。

微分はσ(z)-y、二階微分はσ(z)(1-σ(z))≥0。linear logitsならobjectiveはconvexで、local optimum問題はない（regularity/separationによるfinite solution issuesは別）。

## 途中を飛ばさず全体をつなぐ

### logistic回帰の導出を一本につなげる

logistic regressionはlog-oddsをlinear model $\log[p/(1-p)]=z$ と仮定し、Bernoulli likelihoodを最大化する。

#### 1. log-oddsからprobability

まず出発点を固定する。 $p/(1-p)=e^z$ をpについて解くと $p=e^z/(1+e^z)=\sigma(z)$。 次に必要になるのは「negative log likelihood」である。

#### 2. negative log likelihood

ここまでで得た結果を次の段階へ渡す。 Bernoulli likelihood $p^y(1-p)^{1-y}$ の-negative logはbinary cross entropy。 次に必要になるのは「decision boundary」である。

#### 3. decision boundary

最後に、前二段階の結果をまとめて結論へ進む。 p=0.5 iff z=0なのでboundaryは $x^Tw+b=0$。thresholdを変えるとboundary levelが変わる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(y=1\mid\mathbf{x})=\sigma(\mathbf{x}^{\mathsf T}\mathbf{w}+b)
$$


### 具体例と一般式を往復する

本文の第一例は次の設定である。

z=ln3ならodds3:1、p=3/4。linear score差はprobability差として非線形に圧縮。


class imbalanceでthreshold0.5がbestとは限らない。precision/recall costで選ぶ。


### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

sigmoid出力はmodel probabilityであり自動的にcalibratedではない。misspecification/regularizationでずれる。


## 例題1：小さな数値で最後まで計算する

z=ln3ならodds3:1、p=3/4。linear score差はprobability差として非線形に圧縮。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

class imbalanceでthreshold0.5がbestとは限らない。precision/recall costで選ぶ。

## 成立条件と、条件を外したときに何が壊れるか

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- logistic回帰の定義と計算手順を区別し、数値例だけで一般性を判断しない。

sigmoid出力はmodel probabilityであり自動的にcalibratedではない。misspecification/regularizationでずれる。

## よくある誤解を分解する

- logistic回帰の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

logistic回帰では、式へ数値を代入するだけでは不十分である。sigmoid出力はmodel probabilityであり自動的にcalibratedではない。misspecification/regularizationでずれる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

stable `logaddexp`/BCEWithLogitsを使いsigmoid後logを直接取らない。

## ここから一段だけ発展する

binaryをK classesへ一般化するとsoftmax。


## このTopicを理解できたか確認する問い

- 「log-oddsからprobability」を式を見ずに説明できるか
- 「decision boundary」までの論理を一段ずつ再現できるか
- logistic回帰の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-logistic-regression)　|　[スライドへ](/slides/ml-logistic-regression/)
