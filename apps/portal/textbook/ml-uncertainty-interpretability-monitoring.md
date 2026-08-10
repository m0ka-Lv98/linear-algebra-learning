# 不確実性・解釈・監視：教科書

Course 08｜機械学習｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-metrics-calibration-imbalance` で得た概念を使い、ここでは 不確実性・解釈・監視 へ進む。

前提として使うのは `stat-bayesian-inference-map`、`ml-model-selection-cross-validation` です。

## まず直感を作る

運用では予測精度だけでなく、入力分布、確信度、失敗例、時間変化を監視する。



## 図の解説

<img src="/visuals/course-08/ml-uncertainty-interpretability-monitoring.png" alt="不確実性・解釈・監視の図解" style="max-height: 440px; display:block; margin:0 auto;" />

時間に沿うfeature driftとerror rateを並べる。 学習時と運用時の分布を重ね、入力・予測・性能指標のどこが変わったかを追う。distribution shift検知と性能劣化確認は別の問題である。

## 記号・型・次元

- $\hat p$：predictive confidence
- $ECE$：calibration error proxy
- $P_{train},P_{deploy}$：distributions
- $drift$：distribution change


## 正式な定義・代表式

production MLではpoint predictionだけでなくuncertainty、failure explanation、input/performance driftを監視する。validation metricはdeployment distributionが変われば保証されない。

代表式は

$$
\operatorname{ECE}=\sum_b\frac{|B_b|}{n}|\operatorname{acc}(B_b)-\operatorname{conf}(B_b)|
$$

です。

## なぜこの式・結論になるのか

### 1. uncertainty source分離

aleatoric noiseとepistemic/model uncertaintyを概念上分ける。confidence score=真のuncertaintyとは限らない。

### 2. interpretability scope

feature attributionはmodel behavior説明であり因果効果とは限らない。global/localを区別。

### 3. monitor loop

input drift→prediction distribution→label available時 performance/calibrationを時系列監視し、retrain triggerを事前定義。

## 教科書が省略しやすい一段を補う


### deploymentでは「予測値」以外のstateを監視する

uncertaintyにはirreducible/aleatoricとmodel/data不足由来のepistemicを概念上分ける。softmax max probabilityは必ずしもwell-calibrated uncertaintyではない。interpretability methodもmodel association/sensitivityを示すもので、feature causeを自動的に証明しない。

monitoringではinput distribution, prediction distribution, confidence/calibration, labels available時のperformanceを時系列で分けて追う。input driftがあってもperformanceが保たれる場合、driftなしでもconcept changeでperformanceが落ちる場合がある。alert→diagnosis→retrain/rollbackのdecision ruleまで設計して初めて運用systemになる。



## 途中を飛ばさず全体をつなぐ

### 不確実性・解釈・監視の導出を一本につなげる

production MLではpoint predictionだけでなくuncertainty、failure explanation、input/performance driftを監視する。validation metricはdeployment distributionが変われば保証されない。

#### 1. uncertainty source分離

まず出発点を固定する。 aleatoric noiseとepistemic/model uncertaintyを概念上分ける。confidence score=真のuncertaintyとは限らない。 次に必要になるのは「interpretability scope」である。

#### 2. interpretability scope

ここまでで得た結果を次の段階へ渡す。 feature attributionはmodel behavior説明であり因果効果とは限らない。global/localを区別。 次に必要になるのは「monitor loop」である。

#### 3. monitor loop

最後に、前二段階の結果をまとめて結論へ進む。 input drift→prediction distribution→label available時 performance/calibrationを時系列監視し、retrain triggerを事前定義。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{ECE}=\sum_b\frac{|B_b|}{n}|\operatorname{acc}(B_b)-\operatorname{conf}(B_b)|
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

camera sensor changeでinput brightness distribution drift。accuracy label遅延前にfeature driftを検知できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

subgroup別calibrationでoverall ECEだけでは隠れるfailureを発見。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

SHAP importanceが高いfeatureを「原因」と断定するのは誤り。model association explanation。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

camera sensor changeでinput brightness distribution drift。accuracy label遅延前にfeature driftを検知できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

subgroup別calibrationでoverall ECEだけでは隠れるfailureを発見。

## 成立条件と、条件を外したときに何が壊れるか

- offline scoreだけで本番性能を保証できない。
- 解釈指標の安定性も確認する。
- 不確実性・解釈・監視の定義と計算手順を区別し、数値例だけで一般性を判断しない。

SHAP importanceが高いfeatureを「原因」と断定するのは誤り。model association explanation。

## よくある誤解を分解する

- 不確実性・解釈・監視の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

不確実性・解釈・監視では、式へ数値を代入するだけでは不十分である。SHAP importanceが高いfeatureを「原因」と断定するのは誤り。model association explanation。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

logging schema、privacy、label delay、alert false positivesを設計。model/data/version lineage。

## ここから一段だけ発展する

Course09ではmodel classをdeep networksへ拡張するが、split/metric/calibration/monitoring原則はそのまま必要。


## このTopicを理解できたか確認する問い

- 「uncertainty source分離」を式を見ずに説明できるか
- 「monitor loop」までの論理を一段ずつ再現できるか
- 不確実性・解釈・監視の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-uncertainty-interpretability-monitoring)　|　[スライドへ](/slides/ml-uncertainty-interpretability-monitoring/)
