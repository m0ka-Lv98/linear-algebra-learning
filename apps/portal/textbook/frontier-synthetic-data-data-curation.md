# synthetic dataとdata curation：教科書

Course 10｜Frontier｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-long-context-memory` で得た概念を使い、ここでは synthetic dataとdata curation へ進む。

前提として使うのは `ml-problem-formulation-data-splits`、`frontier-foundation-model-evaluation` です。

## まず直感を作る

synthetic dataはmodelが生成したデータを学習へ混ぜる方法で、coverage拡張とbias増幅の両方が起こりうる。



## 図の解説

<img src="/visuals/course-10/frontier-synthetic-data-data-curation.png" alt="synthetic dataとdata curationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

real/syntheticの混合比を変えたtraining distributionを描く。 modelが生成したdataが選別・検証を経て次のtraining dataへ戻るloopを描く。品質filterが弱いと誤りやmode collapseが自己増幅しうる。

## 記号・型・次元

- $p_{real}$：real data distribution
- $p_{synthetic}$：generated data
- $\alpha$：mixture weight
- $p_{train}=\alpha p_{real}+(1-\alpha)p_{synthetic}$


## 正式な定義・代表式

synthetic dataはteacher/simulator/modelから生成したtraining examples。curationはselection, filtering, deduplication, weightingでeffective training distributionを設計する。

代表式は

$$
p_{train}=\alpha p_{real}+(1-\alpha)p_{synthetic}
$$

です。

## なぜこの式・結論になるのか

### 1. mixture distribution

real/synthetic sampling ratioがtraining expectationのweightを直接変える。

### 2. quality filter

filterはnoiseを減らす一方、filter modelのbiasでcoverageを狭める。

### 3. feedback loop

model-generated dataを反復利用するとerrors/biasがself-reinforceし得るためprovenance/real anchor evaluationが必要。

## 教科書が省略しやすい一段を補う


### synthetic data loopではselection mechanismがdistributionを決める

model-generated samplesをtrainingへ戻すとき、generator distributionそのものではなくfilter/verifier/deduplication後のdistributionが実際のtraining signalになる。quality thresholdを厳しくするとerrorは減るがdiversity loss、緩いとnoise/self-reinforcementが増える。

human dataとのmixture ratio、provenance、contamination、near-duplicateを記録する。teacher modelのbiasをstudentへ継承・増幅する可能性があるのでreal holdoutで評価する。synthetic dataはdata scarcityを自動的に解決するfree resourceではない。



## 途中を飛ばさず全体をつなぐ

### synthetic dataとdata curationの導出を一本につなげる

synthetic dataはteacher/simulator/modelから生成したtraining examples。curationはselection, filtering, deduplication, weightingでeffective training distributionを設計する。

#### 1. mixture distribution

まず出発点を固定する。 real/synthetic sampling ratioがtraining expectationのweightを直接変える。 次に必要になるのは「quality filter」である。

#### 2. quality filter

ここまでで得た結果を次の段階へ渡す。 filterはnoiseを減らす一方、filter modelのbiasでcoverageを狭める。 次に必要になるのは「feedback loop」である。

#### 3. feedback loop

最後に、前二段階の結果をまとめて結論へ進む。 model-generated dataを反復利用するとerrors/biasがself-reinforceし得るためprovenance/real anchor evaluationが必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p_{train}=\alpha p_{real}+(1-\alpha)p_{synthetic}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

math problemsをgeneratorで作りverifierでanswer check後trainingへ。generator qualityとverifier false acceptanceを別評価。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

dedupでmemorization/benchmark contaminationを減らすがnear-duplicate detection thresholdでdata loss tradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「syntheticは無料で無限」ではない。generation compute、verification、diversity、distribution mismatchが制約。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

math problemsをgeneratorで作りverifierでanswer check後trainingへ。generator qualityとverifier false acceptanceを別評価。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

dedupでmemorization/benchmark contaminationを減らすがnear-duplicate detection thresholdでdata loss tradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- 生成元modelの誤りが再帰的に増幅される可能性。
- provenanceを記録する。
- synthetic dataとdata curationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

「syntheticは無料で無限」ではない。generation compute、verification、diversity、distribution mismatchが制約。

## よくある誤解を分解する

- synthetic dataとdata curationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

synthetic dataとdata curationでは、式へ数値を代入するだけでは不十分である。「syntheticは無料で無限」ではない。generation compute、verification、diversity、distribution mismatchが制約。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

data lineage、license/provenance、real/synthetic tag、filter thresholds、contamination audit。

## ここから一段だけ発展する

physics/biology等のdomain constraintsをloss/modelへ組み込むScientific MLへ。


## このTopicを理解できたか確認する問い

- 「mixture distribution」を式を見ずに説明できるか
- 「feedback loop」までの論理を一段ずつ再現できるか
- synthetic dataとdata curationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-synthetic-data-data-curation)　|　[スライドへ](/slides/frontier-synthetic-data-data-curation/)
