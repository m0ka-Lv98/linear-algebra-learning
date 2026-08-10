# robust regressionとM推定：教科書

Course 07｜データ解析の行列手法｜Topic 10/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-ridge-lasso-elastic-net` で得た概念を使い、ここでは robust regressionとM推定 へ進む。

前提として使うのは `stat-estimators-bias-variance-mse`、`opt-problem-formulation-objectives-constraints` です。

## まず直感を作る

robust regressionは大きな残差の影響を二乗損失より弱め、外れ値に引っ張られにくくする。



## 図の解説

<img src="/visuals/course-07/mat-robust-regression-m-estimators.png" alt="robust regressionとM推定の図解" style="max-height: 440px; display:block; margin:0 auto;" />

外れ値を含む散布図へOLSとHuber型の線を比較する。 二乗損失は大きな残差を二乗で強く罰するのに対し、Huber等は尾で増加を緩める。外れ値が回帰線をどれだけ引っ張るかの差として表れる。

## 記号・型・次元

- $r_i=y_i-x_i^Tβ$
- $\rho(r)$：residual loss
- $\psi(r)=\rho^{\prime}(r)$：influence score


## 正式な定義・代表式

M-estimatorは $\sum_i\rho(r_i)$ を最小化。quadraticよりtail growthを弱めるHuber等でlarge residualのinfluenceを制限する。

代表式は

$$
\min_{\boldsymbol{\beta}}\sum_{i=1}^{n}\rho(r_i)
$$

です。

## なぜこの式・結論になるのか

### 1. OLS influence

$\rho=r²/2$ ならψ=rでresidual大きさに比例し無制限に影響。

### 2. Huber

小|r|でquadratic、大|r|でlinear。ψはclipされlarge outlierのgradient contributionがbounded。

### 3. IRLS view

ψ(r)=w(r)r と書けばiterationごとにresidual-dependent weightのWLSとして解ける。

## 教科書が省略しやすい一段を補う


### squared lossのinfluenceが無限に増える問題を抑える

OLS score equationは $\sum_i x_i r_i=0$ で、large residual r_iの寄与が線形に増え続ける。M-estimatorは $\sum_i\rho(r_i)$ をminimizeし、derivative $\psi(r)=\rho'(r)$ がbounded/slow-growingになるlossを選ぶ。Huber lossはsmall residualでquadratic、largeでlinear。

IRLSではcurrent residualからweight $w_i=\psi(r_i)/r_i$ を作りweighted LSを反復する。outlier robustnessは「外れ値を無視する」ことではなく、そのinfluenceを制限すること。high-leverage pointはresidualが小さくても強い影響を持つため別診断が必要。



## 途中を飛ばさず全体をつなぐ

### robust regressionとM推定の導出を一本につなげる

M-estimatorは $\sum_i\rho(r_i)$ を最小化。quadraticよりtail growthを弱めるHuber等でlarge residualのinfluenceを制限する。

#### 1. OLS influence

まず出発点を固定する。 $\rho=r²/2$ ならψ=rでresidual大きさに比例し無制限に影響。 次に必要になるのは「Huber」である。

#### 2. Huber

ここまでで得た結果を次の段階へ渡す。 小|r|でquadratic、大|r|でlinear。ψはclipされlarge outlierのgradient contributionがbounded。 次に必要になるのは「IRLS view」である。

#### 3. IRLS view

最後に、前二段階の結果をまとめて結論へ進む。 ψ(r)=w(r)r と書けばiterationごとにresidual-dependent weightのWLSとして解ける。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\boldsymbol{\beta}}\sum_{i=1}^{n}\rho(r_i)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1点だけ巨大outlierを追加するとOLS lineが大きく引かれるがHuber fitは移動が小さい。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

leverage outlier（xが極端）はresidual robustnessだけでは十分でない。design spaceの診断も必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

robust estimatorも万能でなく、contamination割合やloss tuningでbias/efficiency tradeoff。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1点だけ巨大outlierを追加するとOLS lineが大きく引かれるがHuber fitは移動が小さい。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

leverage outlier（xが極端）はresidual robustnessだけでは十分でない。design spaceの診断も必要。

## 成立条件と、条件を外したときに何が壊れるか

- robustは外れ値を自動的に正しい値へ直す方法ではない。
- scale推定も重要。
- robust regressionとM推定の定義と計算手順を区別し、数値例だけで一般性を判断しない。

robust estimatorも万能でなく、contamination割合やloss tuningでbias/efficiency tradeoff。

## よくある誤解を分解する

- robust regressionとM推定の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

robust regressionとM推定では、式へ数値を代入するだけでは不十分である。robust estimatorも万能でなく、contamination割合やloss tuningでbias/efficiency tradeoff。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

scale estimateとHuber thresholdを同時に管理。convergence of IRLSをmonitor。

## ここから一段だけ発展する

ここからsignal basisへ移り、Fourier基底で「dataを別coordinateで見る」考えを使う。


## このTopicを理解できたか確認する問い

- 「OLS influence」を式を見ずに説明できるか
- 「IRLS view」までの論理を一段ずつ再現できるか
- robust regressionとM推定の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-robust-regression-m-estimators)　|　[スライドへ](/slides/mat-robust-regression-m-estimators/)
