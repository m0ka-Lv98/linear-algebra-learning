# 線形回帰：教科書

Course 08｜機械学習｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-problem-formulation-data-splits` で得た概念を使い、ここでは 線形回帰 へ進む。

前提として使うのは `mat-ols-design-matrices`、`opt-gradient-descent-convergence` です。

## まず直感を作る

回帰は入力から平均的な出力を説明・予測する関係をモデル化する。



## 図の解説

<img src="/visuals/course-08/ml-linear-regression.png" alt="線形回帰の図解" style="max-height: 440px; display:block; margin:0 auto;" />

散布点、回帰線、残差を同時に描く。 点が観測値、線がモデル予測、点から線までの縦の差が残差である。二乗残差を合計する最小二乗では、大きな残差ほど強く目的関数へ効く。

## 記号・型・次元

- $x\in\mathbb R^p$
- $\beta\in\mathbb R^p$
- $b$：intercept
- $\hat y=x^T\beta+b$


## 正式な定義・代表式

linear regressionはfeatureのaffine combinationでconditional mean/targetを近似し、通常squared lossを最小化する。statistical inferenceよりprediction pipelineに重点。

代表式は

$$
\hat{y}=\mathbf{x}^{\mathsf T}\boldsymbol{\beta}+b
$$

です。

## なぜこの式・結論になるのか

### 1. linear score

各feature contribution β_jx_jを足し、interceptでoriginをずらす。

### 2. squared loss

Gaussian noise MLEまたはEuclidean fitから $\sum(y_i-\hat y_i)^2$。

### 3. regularization/validation

parameter estimationはCourse07 OLSを使い、MLではλやfeaturesをvalidationで選びtest riskを評価。

## 教科書が省略しやすい一段を補う


### MLとしてのlinear regressionでは「fit」と「評価」を分ける

model $\hat y=\mathbf x^T\boldsymbol\beta+b$ はparameterにlinear。trainingではsquared lossを最小化し、Course07のOLS/regularized solverを使える。Gaussian noiseを仮定すればMLEと一致するが、prediction目的ではGaussianityがなくてもsquared-error predictorとして定義できる。

feature map $\phi(x)$ を使えば $\hat y=\boldsymbol\beta^T\phi(x)$ はparameterにlinearなままraw inputにはnonlinear。expressivityを上げるほどtraining errorは下がりやすいがgeneralizationは保証されないので、feature degreeやregularizationはvalidationで選ぶ。coefficient interpretationはcorrelated features・scaling・extrapolationで変わるためprediction accuracyと因果解釈を混同しない。



## 途中を飛ばさず全体をつなぐ

### 線形回帰の導出を一本につなげる

linear regressionはfeatureのaffine combinationでconditional mean/targetを近似し、通常squared lossを最小化する。statistical inferenceよりprediction pipelineに重点。

#### 1. linear score

まず出発点を固定する。 各feature contribution β_jx_jを足し、interceptでoriginをずらす。 次に必要になるのは「squared loss」である。

#### 2. squared loss

ここまでで得た結果を次の段階へ渡す。 Gaussian noise MLEまたはEuclidean fitから $\sum(y_i-\hat y_i)^2$。 次に必要になるのは「regularization/validation」である。

#### 3. regularization/validation

最後に、前二段階の結果をまとめて結論へ進む。 parameter estimationはCourse07 OLSを使い、MLではλやfeaturesをvalidationで選びtest riskを評価。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{y}=\mathbf{x}^{\mathsf T}\boldsymbol{\beta}+b
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

house priceをarea, ageでfit。β_areaは他feature固定時のlinear marginal effect。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

polynomial feature x²を追加すればparameterにlinearなままnonlinear curveを表現できる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

extrapolationでlinear assumptionが壊れ、train range外で非現実的予測。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

house priceをarea, ageでfit。β_areaは他feature固定時のlinear marginal effect。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

polynomial feature x²を追加すればparameterにlinearなままnonlinear curveを表現できる。

## 成立条件と、条件を外したときに何が壊れるか

- 予測と因果を混同しない。
- 外挿では不確実性が増える。
- 線形回帰の定義と計算手順を区別し、数値例だけで一般性を判断しない。

extrapolationでlinear assumptionが壊れ、train range外で非現実的予測。

## よくある誤解を分解する

- 線形回帰の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

線形回帰では、式へ数値を代入するだけでは不十分である。extrapolationでlinear assumptionが壊れ、train range外で非現実的予測。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

pipeline内でscaling/feature transformをfit。metricsはMSE/MAE等目的に合わせる。

## ここから一段だけ発展する

binary targetではlinear scoreを0〜1 probabilityへmapするlogistic regressionへ。


## このTopicを理解できたか確認する問い

- 「linear score」を式を見ずに説明できるか
- 「regularization/validation」までの論理を一段ずつ再現できるか
- 線形回帰の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-linear-regression)　|　[スライドへ](/slides/ml-linear-regression/)
