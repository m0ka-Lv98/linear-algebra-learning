# 異常検知：教科書

Course 08｜機械学習｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-dimensionality-reduction-pca-manifold` で得た概念を使い、ここでは 異常検知 へ進む。

前提として使うのは `prob-multivariate-normal-distribution`、`ml-gmm-em` です。

## まず直感を作る

異常検知は「通常データからどれだけ外れるか」のscoreを作り、閾値で判定する。



## 図の解説

<img src="/visuals/course-08/ml-anomaly-detection.png" alt="異常検知の図解" style="max-height: 440px; display:block; margin:0 auto;" />

密度の低い点を負対数尤度で高scoreにする。 高密度領域から離れた点ほど正常モデルの確率または近傍密度が小さくなる。閾値をどこに置くかでfalse positiveと見逃しが変わる。

## 記号・型・次元

- $s(x)$：anomaly score
- $s=-\log p(x)$：density-based score例
- $\tau$：decision threshold


## 正式な定義・代表式

anomaly detectionは「normal」をmodel化しrare/low-density/high-error sampleへ高score。thresholdはoperating cost/contaminationで決める。

代表式は

$$
s(\mathbf{x})=-\log p(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. density view

p(x)が小さいほどsurprisal -log pが大きい。

### 2. threshold

flag=1[s(x)>τ]。τ変更でFPR/TPR tradeoff。

### 3. high dimension caveat

high-dimensional typical setではdensity maximumとtypicalityが一致しないことがあり単純 likelihoodだけで異常を定義できない。

## 教科書が省略しやすい一段を補う


### anomaly scoreとdecision thresholdは別に設計する

modelはdensity, distance, reconstruction error等からcontinuous score s(x)を出す。flagは $1[s(x)>\tau]$。score definitionが「正常からのずれ」をどう測るか、thresholdがどのoperating pointでalarmを出すかを決めるので別問題。

labelsが少ない状況ではthresholdをcontamination assumptionで置くこともあるが、rare valid subgroupをanomalyと誤る危険がある。high-dimensional densityではtypical set問題もありraw likelihoodの小ささだけでsemantic anomalyを定義できない。deployment driftでnormal distributionが変わればrecalibrationが必要。



## 途中を飛ばさず全体をつなぐ

### 異常検知の導出を一本につなげる

anomaly detectionは「normal」をmodel化しrare/low-density/high-error sampleへ高score。thresholdはoperating cost/contaminationで決める。

#### 1. density view

まず出発点を固定する。 p(x)が小さいほどsurprisal -log pが大きい。 次に必要になるのは「threshold」である。

#### 2. threshold

ここまでで得た結果を次の段階へ渡す。 flag=1[s(x)>τ]。τ変更でFPR/TPR tradeoff。 次に必要になるのは「high dimension caveat」である。

#### 3. high dimension caveat

最後に、前二段階の結果をまとめて結論へ進む。 high-dimensional typical setではdensity maximumとtypicalityが一致しないことがあり単純 likelihoodだけで異常を定義できない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
s(\mathbf{x})=-\log p(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1D normalで|z|大のpointsがhigh score。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

autoencoder reconstruction errorはlearned manifoldからのdistance proxy。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

labelled rare classとunsupervised anomalyは同じ問題ではない。rare but valid subpopulationを誤検知し得る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1D normalで|z|大のpointsがhigh score。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

autoencoder reconstruction errorはlearned manifoldからのdistance proxy。

## 成立条件と、条件を外したときに何が壊れるか

- 異常率が低いのでaccuracyは不適切な場合が多い。
- 閾値は運用コストで決める。
- 異常検知の定義と計算手順を区別し、数値例だけで一般性を判断しない。

labelled rare classとunsupervised anomalyは同じ問題ではない。rare but valid subpopulationを誤検知し得る。

## よくある誤解を分解する

- 異常検知の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

異常検知では、式へ数値を代入するだけでは不十分である。labelled rare classとunsupervised anomalyは同じ問題ではない。rare but valid subpopulationを誤検知し得る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

thresholdはvalidation operational dataで校正。driftでnormal distributionが変わると再calibration。

## ここから一段だけ発展する

performanceはinput representation/featuresに強く依存するためfeature engineering/selectionへ。


## このTopicを理解できたか確認する問い

- 「density view」を式を見ずに説明できるか
- 「high dimension caveat」までの論理を一段ずつ再現できるか
- 異常検知の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-anomaly-detection)　|　[スライドへ](/slides/ml-anomaly-detection/)
