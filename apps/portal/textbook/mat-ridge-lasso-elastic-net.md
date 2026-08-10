# ridge・Lasso・Elastic Net：教科書

Course 07｜データ解析の行列手法｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-gls-correlated-errors` で得た概念を使い、ここでは ridge・Lasso・Elastic Net へ進む。

前提として使うのは `num-regularization-ill-posed-problems`、`opt-proximal-gradient` です。

## まず直感を作る

正則化回帰はデータ適合と係数の複雑さを同時に最小化し、過学習を抑える。



## 図の解説

<img src="/visuals/course-07/mat-ridge-lasso-elastic-net.png" alt="ridge・Lasso・Elastic Netの図解" style="max-height: 440px; display:block; margin:0 auto;" />

λを増やしたときの係数パスを描く。 データ適合だけの解と、係数の大きさに罰則を加えた解を比較する。罰則を強めるほど係数は縮み、variance低下とbias増加の交換が起きる。

## 記号・型・次元

- $\lambda\ge0$
- $\|β\|_2²$：ridge penalty
- $\|β\|_1$：Lasso penalty
- $\alpha$：Elastic Net mix


## 正式な定義・代表式

penalized regressionはfitとcoefficient complexityのtradeoff。ridge smooth shrinkage、Lassoはnonsmooth cornerによりzero coefficientsを作り得る。

代表式は

$$
\min_{\boldsymbol{\beta}}\|\mathbf{X}\boldsymbol{\beta}-\mathbf{y}\|_2^2+\lambda\|\boldsymbol{\beta}\|_1
$$

です。

## なぜこの式・結論になるのか

### 1. ridge normal equation

$J=\|Xβ-y\|²+λ\|β\|²$。gradient=0から $(X^TX+λI)β=X^Ty$。

### 2. L1 geometry

L1 ballはaxis上にcorner。quadratic loss contourがboundaryへ接する点がcornerになりやすく係数0。

### 3. Bayesian view

Gaussian prior→ridge, Laplace prior→L1 MAP。ただしregularizationをpriorと解釈するにはscaling/likelihoodも含める。

## 教科書が省略しやすい一段を補う


### penaltyのgeometryがsolutionの形を変える

ridgeは $\|y-X\beta\|^2+\lambda\|\beta\|_2^2$。gradient=0から $(X^TX+\lambda I)\hat\beta=X^Ty$、small singular directionsのinverse amplificationを抑える。LassoはL1 penaltyでnondifferentiableだがconstraint ballにcornerがあり、level setとの接触がaxis上で起こりやすいためexact zero coefficientsを作る。

Elastic NetはL1+L2でsparsityとcorrelated feature stabilizationを組み合わせる。lambdaはtraining loss最小ではなくvalidation/CVでprediction goalに合わせて選ぶ。interceptをpenalizeするか、feature scalingをどうするかでsolutionが変わる。


### orthonormal designでshrinkageを直接見る

$X^TX=I$ ならOLS coefficient $z=X^Ty$。ridge solutionは $\hat\beta_j=z_j/(1+\lambda)$ と全componentをcontinuous shrink。Lassoは（scale conventionによるが）soft-threshold $\operatorname{sign}(z_j)(|z_j|-\lambda)_+$ でsmall coefficientsをexact zeroにする。

correlated designではcoordinatesがcoupleしこの単純式は崩れるが、L2/L1 penaltyの基本geometryを理解する小例として有効。

## 途中を飛ばさず全体をつなぐ

### ridge・Lasso・Elastic Netの導出を一本につなげる

penalized regressionはfitとcoefficient complexityのtradeoff。ridge smooth shrinkage、Lassoはnonsmooth cornerによりzero coefficientsを作り得る。

#### 1. ridge normal equation

まず出発点を固定する。 $J=\|Xβ-y\|²+λ\|β\|²$。gradient=0から $(X^TX+λI)β=X^Ty$。 次に必要になるのは「L1 geometry」である。

#### 2. L1 geometry

ここまでで得た結果を次の段階へ渡す。 L1 ballはaxis上にcorner。quadratic loss contourがboundaryへ接する点がcornerになりやすく係数0。 次に必要になるのは「Bayesian view」である。

#### 3. Bayesian view

最後に、前二段階の結果をまとめて結論へ進む。 Gaussian prior→ridge, Laplace prior→L1 MAP。ただしregularizationをpriorと解釈するにはscaling/likelihoodも含める。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\boldsymbol{\beta}}\|\mathbf{X}\boldsymbol{\beta}-\mathbf{y}\|_2^2+\lambda\|\boldsymbol{\beta}\|_1
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

collinear featuresでridgeはcoefficientsを安定に分配しvarianceを減らす。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Lassoはfeature scalingでpenalty相対強度が変わるため通常standardization。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Lassoが選んだfeatureが「真に重要」とは限らない。correlated featuresでは選択が不安定。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

collinear featuresでridgeはcoefficientsを安定に分配しvarianceを減らす。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Lassoはfeature scalingでpenalty相対強度が変わるため通常standardization。

## 成立条件と、条件を外したときに何が壊れるか

- L1とL2で係数の縮み方が違う。
- 標準化の有無で罰則の意味が変わる。
- ridge・Lasso・Elastic Netの定義と計算手順を区別し、数値例だけで一般性を判断しない。

Lassoが選んだfeatureが「真に重要」とは限らない。correlated featuresでは選択が不安定。

## よくある誤解を分解する

- ridge・Lasso・Elastic Netの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

ridge・Lasso・Elastic Netでは、式へ数値を代入するだけでは不十分である。Lassoが選んだfeatureが「真に重要」とは限らない。correlated featuresでは選択が不安定。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

coordinate descent/proximal gradient、CVでλ選択。intercept penalize conventionを確認。

## ここから一段だけ発展する

outlierへquadratic lossが敏感な問題はloss functionそのものをrobustに変えるM-estimationへ。


## このTopicを理解できたか確認する問い

- 「ridge normal equation」を式を見ずに説明できるか
- 「Bayesian view」までの論理を一段ずつ再現できるか
- ridge・Lasso・Elastic Netの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-ridge-lasso-elastic-net)　|　[スライドへ](/slides/mat-ridge-lasso-elastic-net/)
