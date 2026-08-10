# Foundation modelの設計原理：教科書

Course 10｜Frontier｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 10 の入口として、Foundation modelの設計原理 を定義から組み立てる。

前提として使うのは `dl-transformers`、`dl-scaling-distributed-training` です。

## まず直感を作る

Foundation modelは大規模な事前学習で汎用表現・生成能力を獲得し、下流taskへ適応する。



## 図の解説

<img src="/visuals/course-10/frontier-foundation-model-paradigm.png" alt="Foundation modelの設計原理の図解" style="max-height: 440px; display:block; margin:0 auto;" />

pretraining→adaptation→taskの流れを大きなpipelineとして描く。 大量dataでpretrainingした共通modelを、prompt・retrieval・fine-tuning等で個別taskへ適応する。基盤部分を共有するため下流taskごとの学習量を減らせる。

## 記号・型・次元

- $x_1,\ldots,x_T$：token sequence
- $p_\theta$：parameter θのmodel distribution
- $x_{<t}$：時刻tより前のtokens
- $T$：sequence length


## 正式な定義・代表式

autoregressive foundation modelはjoint sequence probabilityをchain ruleでnext-token conditionalsの積へ分解し、大規模dataで同一prediction objectiveを学習する。foundation modelという語はarchitectureだけでなく、pretraining後に多taskへadaptする運用paradigmも含む。

代表式は

$$
p_\theta(x_1,\ldots,x_T)=\prod_{t=1}^{T}p_\theta(x_t\mid x_{<t})
$$

です。

## なぜこの式・結論になるのか

### 1. probability chain rule

$p(x_1,\ldots,x_T)=p(x_1)p(x_2|x_1)\cdots p(x_T|x_{<T})$。独立仮定ではなく確率のchain rule。

### 2. training loss

negative logを取ると積が和へ変わり $-\sum_t\log p_\theta(x_t|x_{<t})$。teacher forcingで各positionをsupervisionとして使える。

### 3. generation

推論時はmodel predictionから次tokenを選びcontextへ追加し、再びconditionalを計算する。このautoregressive loopがtrainingのparallel next-token evaluationと異なる。

## 教科書が省略しやすい一段を補う


### foundation modelを「巨大な一個のtask model」と考えない

pretrainingでは広いdata distribution上のself-supervised objectiveを最適化し、parameter内部に再利用可能なrepresentation/conditional distributionを作る。downstreamではprompting, retrieval, fine-tuning, tool use等で同じbase modelを異なるtaskへ条件付ける。したがってsystem performanceはbase weightsだけでなくadaptation layerを含む。

大規模化はcapabilityを増やしうるが、training objectiveがdesired behaviorを完全に指定するわけではない。pretraining loss, downstream task score, alignment/safety evaluationを別levelで測る。Course10では後続技術をこの「base model + context/adaptation + external system」の分解に沿って積み上げる。



## 途中を飛ばさず全体をつなぐ

### Foundation modelの設計原理の導出を一本につなげる

autoregressive foundation modelはjoint sequence probabilityをchain ruleでnext-token conditionalsの積へ分解し、大規模dataで同一prediction objectiveを学習する。foundation modelという語はarchitectureだけでなく、pretraining後に多taskへadaptする運用paradigmも含む。

#### 1. probability chain rule

まず出発点を固定する。 $p(x_1,\ldots,x_T)=p(x_1)p(x_2|x_1)\cdots p(x_T|x_{<T})$。独立仮定ではなく確率のchain rule。 次に必要になるのは「training loss」である。

#### 2. training loss

ここまでで得た結果を次の段階へ渡す。 negative logを取ると積が和へ変わり $-\sum_t\log p_\theta(x_t|x_{<t})$。teacher forcingで各positionをsupervisionとして使える。 次に必要になるのは「generation」である。

#### 3. generation

最後に、前二段階の結果をまとめて結論へ進む。 推論時はmodel predictionから次tokenを選びcontextへ追加し、再びconditionalを計算する。このautoregressive loopがtrainingのparallel next-token evaluationと異なる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p_\theta(x_1,\ldots,x_T)=\prod_{t=1}^{T}p_\theta(x_t\mid x_{<t})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

3-token sequence probabilityはp(x1)p(x2|x1)p(x3|x1,x2)。各factorが低ければjointも低くなる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

same pretrained modelをclassification, generation, retrieval-augmented taskへprompt/fine-tuneしてadaptするのがfoundation paradigm。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

3-token sequence probabilityはp(x1)p(x2|x1)p(x3|x1,x2)。各factorが低ければjointも低くなる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

same pretrained modelをclassification, generation, retrieval-augmented taskへprompt/fine-tuneしてadaptするのがfoundation paradigm。

## 成立条件と、条件を外したときに何が壊れるか

- 事前学習lossの改善と下流能力は一対一ではない。
- data/model/computeの相互依存を見る。
- Foundation modelの設計原理の定義と計算手順を区別し、数値例だけで一般性を判断しない。

next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。

## よくある誤解を分解する

- Foundation modelの設計原理の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Foundation modelの設計原理では、式へ数値を代入するだけでは不十分である。next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

token-level cross entropy、padding mask、context truncation、data deduplicationを記録。generationはtemperature/top-p等decoder settingで出力distributionが変わる。

## ここから一段だけ発展する

next-token modelが扱う最小単位tokenと、そのembedding/context representationを次に理解する。


## このTopicを理解できたか確認する問い

- 「probability chain rule」を式を見ずに説明できるか
- 「generation」までの論理を一段ずつ再現できるか
- Foundation modelの設計原理の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-foundation-model-paradigm)　|　[スライドへ](/slides/frontier-foundation-model-paradigm/)
