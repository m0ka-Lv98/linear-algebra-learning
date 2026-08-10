# 不確実性・calibration・abstention：教科書

Course 10｜Frontier｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-interpretability-mechanistic` で得た概念を使い、ここでは 不確実性・calibration・abstention へ進む。

前提として使うのは `ml-uncertainty-interpretability-monitoring`、`stat-confidence-intervals` です。

## まず直感を作る

abstentionは確信度が低い入力で無理に回答せず、閾値以下を保留することでriskを制御する。



## 図の解説

<img src="/visuals/course-10/frontier-uncertainty-calibration-abstention.png" alt="不確実性・calibration・abstentionの図解" style="max-height: 440px; display:block; margin:0 auto;" />

confidence thresholdを動かしcoverageとerrorのtrade-offを見る。 予測分布の広がりや複数sampleの不一致を不確実性指標とし、閾値以上ならabstainする。回答率と誤答率のtrade-offを曲線として評価する。

## 記号・型・次元

- $p_k$：class/answer confidence proxy
- $\tau$：abstention threshold
- $coverage=P(accept)$
- $risk=P(error|accept)$


## 正式な定義・代表式

selective predictionはuncertain casesでabstainし、coverageとaccepted-riskをtradeoff。calibrationはconfidenceとempirical correctnessの対応。generative LMsではtoken probability以外のuncertainty signalsも検討。

代表式は

$$
\hat{y}=\begin{cases}\arg\max_k p_k,&\max_kp_k\ge\tau\\\text{abstain},&\text{otherwise}\end{cases}
$$

です。

## なぜこの式・結論になるのか

### 1. decision rule

max confidence≥τならanswer、otherwise abstain。τを上げるとcoverage通常低下。

### 2. selective risk

accept subsetだけのerrorをmeasure。良いuncertainty rankingならlow-confidence casesを除くほどrisk低下。

### 3. calibration

confidence qのcasesでcorrect fraction≈qがideal。distribution shiftでcalibrationは崩れる。

## 教科書が省略しやすい一段を補う


### abstentionはcoverageとriskを明示的に交換する

confidence/uncertainty score u(x)にthresholdを置き、難しいinputでは回答しないsystemを考える。thresholdを厳しくするとcoverage（回答率）は下がるがaccepted casesのriskは下げられる。risk–coverage curveでtrade-offを測る。

sequence probabilityはlength/tokenizationに依存し、raw max probabilityがsemantic correctness probabilityではない。self-consistency, ensemble, calibrated verifier等も完全ではない。calibrationはdeployment distributionで検証し、shift時に崩れる可能性を監視する。


### selective accuracyを実際に計算する

100 casesのconfidenceを並べ、lowest-confidence20をabstainしてremaining80中76 correctならcoverage=.8, selective accuracy=.95。abstentionなしで90/100=.90ならaccuracyは改善したが20 casesを人間/別systemへ回すcostが増える。

thresholdを動かしてrisk–coverage curveを作り、operation requirement（最低coverage/最大error）からpointを選ぶ。

## 途中を飛ばさず全体をつなぐ

### 不確実性・calibration・abstentionの導出を一本につなげる

selective predictionはuncertain casesでabstainし、coverageとaccepted-riskをtradeoff。calibrationはconfidenceとempirical correctnessの対応。generative LMsではtoken probability以外のuncertainty signalsも検討。

#### 1. decision rule

まず出発点を固定する。 max confidence≥τならanswer、otherwise abstain。τを上げるとcoverage通常低下。 次に必要になるのは「selective risk」である。

#### 2. selective risk

ここまでで得た結果を次の段階へ渡す。 accept subsetだけのerrorをmeasure。良いuncertainty rankingならlow-confidence casesを除くほどrisk低下。 次に必要になるのは「calibration」である。

#### 3. calibration

最後に、前二段階の結果をまとめて結論へ進む。 confidence qのcasesでcorrect fraction≈qがideal。distribution shiftでcalibrationは崩れる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{y}=\begin{cases}\arg\max_k p_k,&\max_kp_k\ge\tau\\\text{abstain},&\text{otherwise}\end{cases}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

τ=0.9で50%coverage,error2%; τ=0.6で90%coverage,error8%のようなrisk-coverage curve。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

RAG evidence absenceをuncertainty featureに含めるとconfidenceを下げるpolicy。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

softmax/token probabilityが高い=事実正しいではない。model can be confidently wrong。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

τ=0.9で50%coverage,error2%; τ=0.6で90%coverage,error8%のようなrisk-coverage curve。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

RAG evidence absenceをuncertainty featureに含めるとconfidenceを下げるpolicy。

## 成立条件と、条件を外したときに何が壊れるか

- confidenceがcalibratedとは限らない。
- coverage低下のコストも評価する。
- 不確実性・calibration・abstentionの定義と計算手順を区別し、数値例だけで一般性を判断しない。

softmax/token probabilityが高い=事実正しいではない。model can be confidently wrong。

## よくある誤解を分解する

- 不確実性・calibration・abstentionの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

不確実性・calibration・abstentionでは、式へ数値を代入するだけでは不十分である。softmax/token probabilityが高い=事実正しいではない。model can be confidently wrong。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

calibration set、OOD subgroup、abstain utility/cost、risk-coverage/AURC。

## ここから一段だけ発展する

serving costを抑えつつqualityを保つquantization/sparsity/MoEへ。


## このTopicを理解できたか確認する問い

- 「decision rule」を式を見ずに説明できるか
- 「calibration」までの論理を一段ずつ再現できるか
- 不確実性・calibration・abstentionの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-uncertainty-calibration-abstention)　|　[スライドへ](/slides/frontier-uncertainty-calibration-abstention/)
