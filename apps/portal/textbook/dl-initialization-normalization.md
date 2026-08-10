# 初期化とnormalization：教科書

Course 09｜深層学習｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-activation-loss-functions` で得た概念を使い、ここでは 初期化とnormalization へ進む。

前提として使うのは `prob-expectation-variance-moments`、`dl-backprop-computation-graphs` です。

## まず直感を作る

normalizationは中間表現のスケールを整え、residual connectionは恒等経路を残して深いnetworkの学習を助ける。



## 図の解説

<img src="/visuals/course-09/dl-initialization-normalization.png" alt="初期化とnormalizationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

層を通る前後のactivation分布を比較する。 層へ入るactivation分布と正規化後の分布を比較する。尺度を制御することでoptimization landscapeとgradient scaleを扱いやすくする。

## 記号・型・次元

- $Var(W_{ij})$：initial weight variance
- $\mu_B,\sigma_B^2$：mini-batch statistics
- $\gamma,\beta$：learned affine params


## 正式な定義・代表式

initializationはlayerを通るactivation/gradient varianceが爆発・消失しないscaleを選ぶ。BatchNormはbatch statisticsでnormalize後learned scale/shift。

代表式は

$$
\operatorname{BN}(x)=\gamma\frac{x-\mu_B}{\sqrt{\sigma_B^2+\varepsilon}}+\beta
$$

です。

## なぜこの式・結論になるのか

### 1. variance propagation

$z_i=\sum_jW_{ij}x_j$。independent zero-mean近似でVar(z_i)=fan_in·Var(W)·Var(x)。これをVar(x)程度に保つためVar(W)∝1/fan_in。

### 2. activationに合わせる

ReLUはnegative halfを0にするためHe initializationはroughly 2/fan_in、linear/tanhはXavier系。

### 3. BatchNorm

$\hat x=(x-\mu_B)/\sqrt{\sigma_B²+ε}$ でbatch mean0 variance約1、 затем γ\hat x+βで必要scaleを学習。

## 教科書が省略しやすい一段を補う


### variance propagationからinitialization scaleを決める

independent zero-mean inputs/weightsを仮定するとlinear layer output varianceはおよそfan-in×Var(W)×Var(x)。depthごとにvarianceが増減しないようVar(W)をfan-inの逆数scaleにするのがXavier/He initializationの出発点。activationによるvariance変化も考慮する。

normalizationはbatch/layer等どのaxisでmean/varianceを取るかが違う。LayerNormはtoken/feature内をnormalizationしsequence/batch sizeに依存しにくい。normalizationは単なるdistribution beautificationではなくparameterizationとgradient scaleを変えoptimizationを助ける。train/eval behaviorが異なるBatchNormではrunning statisticsの扱いに注意。



## 途中を飛ばさず全体をつなぐ

### 初期化とnormalizationの導出を一本につなげる

initializationはlayerを通るactivation/gradient varianceが爆発・消失しないscaleを選ぶ。BatchNormはbatch statisticsでnormalize後learned scale/shift。

#### 1. variance propagation

まず出発点を固定する。 $z_i=\sum_jW_{ij}x_j$。independent zero-mean近似でVar(z_i)=fan_in·Var(W)·Var(x)。これをVar(x)程度に保つためVar(W)∝1/fan_in。 次に必要になるのは「activationに合わせる」である。

#### 2. activationに合わせる

ここまでで得た結果を次の段階へ渡す。 ReLUはnegative halfを0にするためHe initializationはroughly 2/fan_in、linear/tanhはXavier系。 次に必要になるのは「BatchNorm」である。

#### 3. BatchNorm

最後に、前二段階の結果をまとめて結論へ進む。 $\hat x=(x-\mu_B)/\sqrt{\sigma_B²+ε}$ でbatch mean0 variance約1、 затем γ\hat x+βで必要scaleを学習。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{BN}(x)=\gamma\frac{x-\mu_B}{\sqrt{\sigma_B^2+\varepsilon}}+\beta
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1000 inputsでweight variance1ならpreactivation variance約1000倍。1/fan_in scaleで抑える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

LayerNormはsample内feature方向でstatisticsを取り、sequence modelでbatch sizeに依存しにくい。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

BatchNormのtraining batch statisticsとinference running statisticsを混同するとprediction shift。small batchではestimate noise。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1000 inputsでweight variance1ならpreactivation variance約1000倍。1/fan_in scaleで抑える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

LayerNormはsample内feature方向でstatisticsを取り、sequence modelでbatch sizeに依存しにくい。

## 成立条件と、条件を外したときに何が壊れるか

- trainとinferenceで統計量の扱いが異なる方式がある。
- residual加算はshape一致が必要。
- 初期化とnormalizationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

BatchNormのtraining batch statisticsとinference running statisticsを混同するとprediction shift。small batchではestimate noise。

## よくある誤解を分解する

- 初期化とnormalizationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

初期化とnormalizationでは、式へ数値を代入するだけでは不十分である。BatchNormのtraining batch statisticsとinference running statisticsを混同するとprediction shift。small batchではestimate noise。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

frameworkのfan_in/fan_out mode、eps、momentum convention確認。train/eval mode test。

## ここから一段だけ発展する

良いgradientを得てもupdate rule/regularizationがtraining dynamicsを決める。


## このTopicを理解できたか確認する問い

- 「variance propagation」を式を見ずに説明できるか
- 「BatchNorm」までの論理を一段ずつ再現できるか
- 初期化とnormalizationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-initialization-normalization)　|　[スライドへ](/slides/dl-initialization-normalization/)
