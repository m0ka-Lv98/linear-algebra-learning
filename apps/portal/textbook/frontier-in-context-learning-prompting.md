# in-context learningとprompt設計：教科書

Course 10｜Frontier｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-pretraining-scaling-laws` で得た概念を使い、ここでは in-context learningとprompt設計 へ進む。

前提として使うのは `frontier-tokenization-embeddings-context`、`ml-problem-formulation-data-splits` です。

## まず直感を作る

in-context learningではparameterを更新せず、context内の例・指示からtaskを推論する。



## 図の解説

<img src="/visuals/course-10/frontier-in-context-learning-prompting.png" alt="in-context learningとprompt設計の図解" style="max-height: 440px; display:block; margin:0 auto;" />

instructionとfew-shot例がqueryへ情報を流す模式図を見る。 instruction・demonstration・queryが同じcontextへ入り、parameter更新なしに次token分布を変える。few-shot例はtraining dataではなく推論時条件として働く。

## 記号・型・次元

- $\mathcal C$：prompt内のinstructions/examples/context
- $x$：query
- $p(y|x,\mathcal C)$：context-conditioned output


## 正式な定義・代表式

in-context learningはmodel parametersを更新せず、context tokensに示したinstruction/examplesからforward computation内でbehaviorを変える。prompt設計はcontext construction problem。

代表式は

$$
p(y\mid x,\mathcal{C})
$$

です。

## なぜこの式・結論になるのか

### 1. conditioning viewpoint

pretrained conditional distributionに追加context Cを入れることで $p(y|x)$ から $p(y|x,C)$ へ変化。

### 2. few-shot examples

input-output pairsをcontextへ置くとattention等を通じpattern/format/task informationがcurrent query representationへ影響。

### 3. order/format sensitivity

Cはただの集合でなくsequence。example order、labels、irrelevant tokensでconditional distributionが変わるためcontrolled evaluationが必要。

## 教科書が省略しやすい一段を補う


### in-context learningはparameter updateなしにconditional distributionを変える

prompt内のinstruction/examples/queryは同じtoken sequenceとしてmodelへ入り、next-token distribution $p(y\mid context)$ を変える。few-shot examplesはgradientでweightsを書き換えるtraining samplesではなく、inference-time evidence/format specification。order, wording, distractorsでoutputが変わるのはcontext conditioningだからである。

prompt engineeringではtask instruction、input delimiters、output schema、examples、constraintsを分離してablationする。single promptで成功した例だけでrobustnessを判断せず、paraphrase/order/edge casesへ展開する。後続agent/RAGでもpromptは外部情報をmodelへ渡すinterfaceになる。



## 途中を飛ばさず全体をつなぐ

### in-context learningとprompt設計の導出を一本につなげる

in-context learningはmodel parametersを更新せず、context tokensに示したinstruction/examplesからforward computation内でbehaviorを変える。prompt設計はcontext construction problem。

#### 1. conditioning viewpoint

まず出発点を固定する。 pretrained conditional distributionに追加context Cを入れることで $p(y|x)$ から $p(y|x,C)$ へ変化。 次に必要になるのは「few-shot examples」である。

#### 2. few-shot examples

ここまでで得た結果を次の段階へ渡す。 input-output pairsをcontextへ置くとattention等を通じpattern/format/task informationがcurrent query representationへ影響。 次に必要になるのは「order/format sensitivity」である。

#### 3. order/format sensitivity

最後に、前二段階の結果をまとめて結論へ進む。 Cはただの集合でなくsequence。example order、labels、irrelevant tokensでconditional distributionが変わるためcontrolled evaluationが必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(y\mid x,\mathcal{C})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2 examplesでsentiment output formatを示し、3つ目queryだけをask。parameter updateなしでlabel vocabularyをcontextから使える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

chain-of-thoughtを要求するpromptはoutput computation/visible text behaviorを変えるが、同じtaskで常にaccuracy改善する保証はない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

promptで1回成功したexampleをgeneral capability proofにしない。prompt overfittingとtest contaminationを区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2 examplesでsentiment output formatを示し、3つ目queryだけをask。parameter updateなしでlabel vocabularyをcontextから使える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

chain-of-thoughtを要求するpromptはoutput computation/visible text behaviorを変えるが、同じtaskで常にaccuracy改善する保証はない。

## 成立条件と、条件を外したときに何が壊れるか

- 例の順序や表現で結果が変わりうる。
- promptだけで保証された制御はできない。
- in-context learningとprompt設計の定義と計算手順を区別し、数値例だけで一般性を判断しない。

promptで1回成功したexampleをgeneral capability proofにしない。prompt overfittingとtest contaminationを区別する。

## よくある誤解を分解する

- in-context learningとprompt設計の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

in-context learningとprompt設計では、式へ数値を代入するだけでは不十分である。promptで1回成功したexampleをgeneral capability proofにしない。prompt overfittingとtest contaminationを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

prompt template/version、system/user separation、temperature、few-shot examplesをartifact化して評価。

## ここから一段だけ発展する

promptだけで不足するとき、base model weightsの小部分/low-rank updateを学ぶparameter-efficient fine-tuningへ。


## このTopicを理解できたか確認する問い

- 「conditioning viewpoint」を式を見ずに説明できるか
- 「order/format sensitivity」までの論理を一段ずつ再現できるか
- in-context learningとprompt設計の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-in-context-learning-prompting)　|　[スライドへ](/slides/frontier-in-context-learning-prompting/)
