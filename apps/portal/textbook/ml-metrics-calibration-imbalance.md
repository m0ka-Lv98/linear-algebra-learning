# 評価指標・calibration・class imbalance：教科書

Course 08｜機械学習｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-model-selection-cross-validation` で得た概念を使い、ここでは 評価指標・calibration・class imbalance へ進む。

前提として使うのは `stat-hypothesis-testing`、`ml-softmax-multiclass` です。

## まず直感を作る

calibrationは予測確率0.8の集合で実際に約80%当たるかを確認する。



## 図の解説

<img src="/visuals/course-08/ml-metrics-calibration-imbalance.png" alt="評価指標・calibration・class imbalanceの図解" style="max-height: 440px; display:block; margin:0 auto;" />

reliability diagramと理想対角線を描く。 予測確率を横軸、実際の陽性率を縦軸に置き、対角線に近いほど確率の意味が校正されている。accuracyが高くてもcalibrationが良いとは限らない。

## 記号・型・次元

- $TP,FP,FN,TN$
- $Precision=TP/(TP+FP)$
- $Recall=TP/(TP+FN)$
- $p(x)$：predicted probability


## 正式な定義・代表式

classification metricはerror cost/prevalenceに依存。calibrationは「予測確率qの集合で実際のpositive率もq」になる性質でranking accuracyとは別。

代表式は

$$
\operatorname{Precision}=\frac{TP}{TP+FP}
$$

です。

## なぜこの式・結論になるのか

### 1. confusion counts

thresholdでprobabilityをhard labelへすると4 counts。

### 2. precision dependence on prevalence

false positive数はnegative population sizeに依存するためsame TPR/FPRでもprevalenceでprecision変化。

### 3. calibration

ideal: E[Y|\hat p=q]=q。ECEはbin approximationでconfidence-accuracy gapをweighted sum。

## 教科書が省略しやすい一段を補う


### metricはmodelの性質ではなくdecision problemとの組合せ

thresholdを置けばTP/FP/FN/TNが決まり、precision/recall/specificity等が出る。prevalenceが変わるとsame TPR/FPRでもprecisionは変わるため、deployment base rateを無視したmetric比較は危険。ROC-AUCはranking、PR-AUCはpositive retrievalに重点を置き、どちらもspecific operating thresholdのcostを直接表さない。

calibrationは $P(Y=1\mid\hat p\approx q)\approx q$ というprobability meaning。AUCを保ったままtemperature scalingでcalibrationを改善できるためrankingとcalibrationは別軸。thresholdはbusiness/clinical costと合わせてvalidation dataで決める。



## 途中を飛ばさず全体をつなぐ

### 評価指標・calibration・class imbalanceの導出を一本につなげる

classification metricはerror cost/prevalenceに依存。calibrationは「予測確率qの集合で実際のpositive率もq」になる性質でranking accuracyとは別。

#### 1. confusion counts

まず出発点を固定する。 thresholdでprobabilityをhard labelへすると4 counts。 次に必要になるのは「precision dependence on prevalence」である。

#### 2. precision dependence on prevalence

ここまでで得た結果を次の段階へ渡す。 false positive数はnegative population sizeに依存するためsame TPR/FPRでもprevalenceでprecision変化。 次に必要になるのは「calibration」である。

#### 3. calibration

最後に、前二段階の結果をまとめて結論へ進む。 ideal: E[Y|\hat p=q]=q。ECEはbin approximationでconfidence-accuracy gapをweighted sum。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{Precision}=\frac{TP}{TP+FP}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

rare disease prevalence1%ではFPR5%でもfalse positivesが多数になりprecision低くなり得る。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

model AUC high but overconfident; temperature scalingでranking unchanged/calibration改善可能。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

accuracy99%はprevalence99%でall-negative predictorでも達成し得る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

rare disease prevalence1%ではFPR5%でもfalse positivesが多数になりprecision低くなり得る。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

model AUC high but overconfident; temperature scalingでranking unchanged/calibration改善可能。

## 成立条件と、条件を外したときに何が壊れるか

- AUCが高くてもcalibrationが良いとは限らない。
- class imbalanceでは複数指標を見る。
- 評価指標・calibration・class imbalanceの定義と計算手順を区別し、数値例だけで一般性を判断しない。

accuracy99%はprevalence99%でall-negative predictorでも達成し得る。

## よくある誤解を分解する

- 評価指標・calibration・class imbalanceの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

評価指標・calibration・class imbalanceでは、式へ数値を代入するだけでは不十分である。accuracy99%はprevalence99%でall-negative predictorでも達成し得る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

PR-AUC/ROC-AUC、macro/micro、thresholdはbusiness costと共に。calibrationはheld-out data。

## ここから一段だけ発展する

deployment後はuncertainty, explanation, drift monitoringを統合する。


## このTopicを理解できたか確認する問い

- 「confusion counts」を式を見ずに説明できるか
- 「calibration」までの論理を一段ずつ再現できるか
- 評価指標・calibration・class imbalanceの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-metrics-calibration-imbalance)　|　[スライドへ](/slides/ml-metrics-calibration-imbalance/)
