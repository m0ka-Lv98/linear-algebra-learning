# bias–varianceと正則化：教科書

Course 08｜機械学習｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-feature-engineering-selection` で得た概念を使い、ここでは bias–varianceと正則化 へ進む。

前提として使うのは `stat-estimators-bias-variance-mse`、`ml-problem-formulation-data-splits` です。

## まず直感を作る

モデル複雑度を上げるとbiasは下がりvarianceが上がりやすく、汎化誤差には最適な中間がある。



## 図の解説

<img src="/visuals/course-08/ml-bias-variance-regularization.png" alt="bias–varianceと正則化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

複雑度に対するtrain/test errorのU字曲線を描く。 単純すぎるモデルは複数標本で似た予測をするが系統誤差が大きく、複雑すぎるモデルは標本ごとに予測が大きく揺れる。

## 記号・型・次元

- $f(x)=E[Y|X=x]$
- $\hat f_D$：dataset Dで学習したmodel
- $\sigma^2$：irreducible noise


## 正式な定義・代表式

squared prediction errorのexpectationはnoise + squared bias + varianceへ分解できる（pointwise）。regularizationはbiasを増やしvarianceを減らすことがある。

代表式は

$$
\mathbb{E}[(Y-\hat{f}(X))^2]=\text{bias}^2+\text{variance}+\text{noise}
$$

です。

## なぜこの式・結論になるのか

### 1. errorをtrue regression function周りで分ける

$Y-\hat f=(Y-f)+(f-E_D\hat f)+(E_D\hat f-\hat f)$。

### 2. 期待値でcross terms消える

noise conditional mean0、model fluctuation dataset平均0によりcross termsが消える。

### 3. 三成分

$E[(Y-\hat f)^2]=noise+bias²+variance$。

## 教科書が省略しやすい一段を補う


### bias–variance分解は「datasetを取り直す」思考実験

同じdata-generating distributionからtraining set Dを何度も取り直し、それぞれmodel $\hat f_D$ をfitする。point xでprediction平均 $E_D\hat f_D(x)$ とtrue regression function f(x)の差がbias、datasetごとのprediction fluctuationがvariance。

squared lossでは noise + bias² + varianceへ分解できる。model complexityを上げると通常bias低下・variance上昇、regularizationは逆方向に動かすことがある。ただしこの図式は単純なmonotonic lawではなく、modern overparameterized modelではdouble descent等もある。まずtraining/validation curvesで実際のfailure modeを診断する。


### train errorとtest errorの典型的な違いを式で考える

training procedureがdata Dにadaptするため $\hat R_{train}(\hat f_D)$ はsame D上で小さく偏る。model classを広げればminimized training riskは増えない。一方population riskはvariance増大で悪化し得る。したがってtraining errorのmonotonic decreaseからgeneralization optimumを選べない。

regularization parameter λはtraining objectiveに入るが、選択基準はheld-out risk。目的関数を最小にしたλ=0がbestとは限らない。

## 途中を飛ばさず全体をつなぐ

### bias–varianceと正則化の導出を一本につなげる

squared prediction errorのexpectationはnoise + squared bias + varianceへ分解できる（pointwise）。regularizationはbiasを増やしvarianceを減らすことがある。

#### 1. errorをtrue regression function周りで分ける

まず出発点を固定する。 $Y-\hat f=(Y-f)+(f-E_D\hat f)+(E_D\hat f-\hat f)$。 次に必要になるのは「期待値でcross terms消える」である。

#### 2. 期待値でcross terms消える

ここまでで得た結果を次の段階へ渡す。 noise conditional mean0、model fluctuation dataset平均0によりcross termsが消える。 次に必要になるのは「三成分」である。

#### 3. 三成分

最後に、前二段階の結果をまとめて結論へ進む。 $E[(Y-\hat f)^2]=noise+bias²+variance$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbb{E}[(Y-\hat{f}(X))^2]=\text{bias}^2+\text{variance}+\text{noise}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

high-degree polynomialはlow train bias but high dataset-to-dataset variance。ridgeでcoefficients shrinkしvariance低下。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

kNNでk small high variance, k large high bias。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

train errorだけではbias/variance balanceを選べない。complex modelほど通常train errorは下がる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

high-degree polynomialはlow train bias but high dataset-to-dataset variance。ridgeでcoefficients shrinkしvariance低下。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

kNNでk small high variance, k large high bias。

## 成立条件と、条件を外したときに何が壊れるか

- noiseはモデルで消せない。
- 単一datasetだけでbias/varianceを直接分離できない。
- bias–varianceと正則化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

train errorだけではbias/variance balanceを選べない。complex modelほど通常train errorは下がる。

## よくある誤解を分解する

- bias–varianceと正則化の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

bias–varianceと正則化では、式へ数値を代入するだけでは不十分である。train errorだけではbias/variance balanceを選べない。complex modelほど通常train errorは下がる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

learning curves, CV variance、seed variation。

## ここから一段だけ発展する

hyperparameter/model choiceをcross-validationでestimateする。


## このTopicを理解できたか確認する問い

- 「errorをtrue regression function周りで分ける」を式を見ずに説明できるか
- 「三成分」までの論理を一段ずつ再現できるか
- bias–varianceと正則化の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-bias-variance-regularization)　|　[スライドへ](/slides/ml-bias-variance-regularization/)
