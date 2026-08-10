# Foundation model評価：教科書

Course 10｜Frontier｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-alignment-safety-policies` で得た概念を使い、ここでは Foundation model評価 へ進む。

前提として使うのは `ml-metrics-calibration-imbalance`、`stat-hypothesis-testing` です。

## まず直感を作る

Foundation model評価ではtask平均だけでなく、subgroup、variance、judge bias、contaminationを分離して測る。



## 図の解説

<img src="/visuals/course-10/frontier-foundation-model-evaluation.png" alt="Foundation model評価の図解" style="max-height: 440px; display:block; margin:0 auto;" />

複数benchmarkのscoreとconfidence intervalを並べる。 taskごとの入力→出力→scoringを分離し、平均scoreだけでなくslice・failure type・contaminationも追う。benchmark値は測定設計の結果である。

## 記号・型・次元

- $s_A^{(i)},s_B^{(i)}$：item iのmodel scores
- $\hat\Delta=n^{-1}\sum(s_A-s_B)$：paired effect estimate
- $n$：evaluation items


## 正式な定義・代表式

foundation model evaluationはtask definition、dataset sampling、scoring、uncertainty、contamination、judge biasを含むmeasurement problem。paired comparisonはitem difficultyを共有してvarianceを減らす。

代表式は

$$
\widehat{\Delta}=\frac{1}{n}\sum_i(s_A^{(i)}-s_B^{(i)})
$$

です。

## なぜこの式・結論になるのか

### 1. paired differences

$d_i=s_A^{(i)}-s_B^{(i)}$ を作るとitem-specific common difficultyが差でcancel。

### 2. mean+uncertainty

$\hat\Delta=\bar d$、SE≈s_d/√n。point estimateだけでranking certaintyを語らない。

### 3. multiple dimensions

accuracy, calibration, latency, cost, safety等は1 scalarへ安易にcollapseせずtradeoffとして報告。

## 教科書が省略しやすい一段を補う


### benchmark scoreは測定instrumentの出力

evaluation item distribution, prompt format, decoding, few-shot setup, scoring ruleが変わればscoreも変わる。したがってmodelの単一の「能力値」ではなく、特定protocol下の測定結果。contaminationやtraining overlapはestimateを上方に偏らせる。

平均だけでなくtask/subgroup slice、confidence interval、failure taxonomy、cost/latencyを報告する。LLM-as-judgeを使う場合judge bias/order sensitivity/self-preferenceをcalibrateし、人間/ground-truth subsetと照合する。versioned eval harnessで再現可能にする。


### confidence intervalをbenchmarkにも付ける

N independent binary itemsのaccuracy $\hat p$ はsampling variabilityを持ち、rough standard error $\sqrt{\hat p(1-\hat p)/N}$。modelsの差が数tenths pointでもNが小さければnoise範囲かもしれない。paired bootstrap等で同じitems上の差を直接評価する方がよい。

benchmark leaderboardのpoint estimateだけで順位を断定せず、variance, judge randomness, prompt sensitivityを含める。

## 途中を飛ばさず全体をつなぐ

### Foundation model評価の導出を一本につなげる

foundation model evaluationはtask definition、dataset sampling、scoring、uncertainty、contamination、judge biasを含むmeasurement problem。paired comparisonはitem difficultyを共有してvarianceを減らす。

#### 1. paired differences

まず出発点を固定する。 $d_i=s_A^{(i)}-s_B^{(i)}$ を作るとitem-specific common difficultyが差でcancel。 次に必要になるのは「mean+uncertainty」である。

#### 2. mean+uncertainty

ここまでで得た結果を次の段階へ渡す。 $\hat\Delta=\bar d$、SE≈s_d/√n。point estimateだけでranking certaintyを語らない。 次に必要になるのは「multiple dimensions」である。

#### 3. multiple dimensions

最後に、前二段階の結果をまとめて結論へ進む。 accuracy, calibration, latency, cost, safety等は1 scalarへ安易にcollapseせずtradeoffとして報告。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\widehat{\Delta}=\frac{1}{n}\sum_i(s_A^{(i)}-s_B^{(i)})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

同じ1000 promptsでA/Bを評価しbootstrap CI of paired score difference。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

LLM judge使用時はposition/order/blind labelsをrandomizeしhuman subsetでvalidate。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

leaderboard差0.2ptをn/variance無視して「優位」と断言できない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

同じ1000 promptsでA/Bを評価しbootstrap CI of paired score difference。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

LLM judge使用時はposition/order/blind labelsをrandomizeしhuman subsetでvalidate。

## 成立条件と、条件を外したときに何が壊れるか

- 単一leaderboard順位を能力そのものとみなさない。
- test contaminationを確認する。
- Foundation model評価の定義と計算手順を区別し、数値例だけで一般性を判断しない。

leaderboard差0.2ptをn/variance無視して「優位」と断言できない。

## よくある誤解を分解する

- Foundation model評価の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Foundation model評価では、式へ数値を代入するだけでは不十分である。leaderboard差0.2ptをn/variance無視して「優位」と断言できない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

eval prompt/version/model snapshot、sampling temperature、judge rubric、contamination check、raw per-item results。

## ここから一段だけ発展する

aggregate scoreで見えない内部mechanismをinterpretabilityで調べる。


## このTopicを理解できたか確認する問い

- 「paired differences」を式を見ずに説明できるか
- 「multiple dimensions」までの論理を一段ずつ再現できるか
- Foundation model評価の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-foundation-model-evaluation)　|　[スライドへ](/slides/frontier-foundation-model-evaluation/)
