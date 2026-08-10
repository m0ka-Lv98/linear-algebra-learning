# mechanistic interpretability：教科書

Course 10｜Frontier｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-foundation-model-evaluation` で得た概念を使い、ここでは mechanistic interpretability へ進む。

前提として使うのは `dl-attention-mechanism`、`la-linear-maps-change-of-basis` です。

## まず直感を作る

mechanistic interpretabilityは内部activationや回路を観測し、特定の計算がどのcomponentで実現されるかを追う。



## 図の解説

<img src="/visuals/course-10/frontier-interpretability-mechanistic.png" alt="mechanistic interpretabilityの図解" style="max-height: 440px; display:block; margin:0 auto;" />

layerごとのactivationをnode graphとして強調する。 内部activationや重みから観測可能な量を抽出し、入力変更との因果的関係を検証する。可視化されたcorrelationだけで機構を断定しない。

## 記号・型・次元

- $h^{(l)}$：layer l activations
- $F_l$：layer transform
- feature/circuit/probe


## 正式な定義・代表式

mechanistic interpretabilityはinternal activations/weightsを介してmodel computationの因果的構造を理解しようとする。correlational probeとcausal interventionを区別する。

代表式は

$$
\mathbf{h}^{(l+1)}=F_l(\mathbf{h}^{(l)})
$$

です。

## なぜこの式・結論になるのか

### 1. layer composition

$h^{l+1}=F_l(h^l)$。behaviorは多数layers/pathsのcomposition。

### 2. probe

activationからpropertyをpredictできることはinformation presenceを示すが、そのinformationがbehaviorに使われることを証明しない。

### 3. intervention

activation patching/ablation等でinternal variableを変えoutput effectを測りcausal relevanceを検査。

## 教科書が省略しやすい一段を補う


### activation correlationからmechanismへ進むには介入が必要

neuron/feature activationとinput conceptの相関を見つけても、そのunitがoutputを因果的に担うとは限らない。activation patching, ablation, causal tracing等でinternal stateを操作しoutput changeを測ることでmechanistic hypothesisを検証する。

Transformerではattention head, MLP feature, residual streamが相互作用しdistributed representationを持つ。単一attention mapを「modelがここを見た理由」と解釈するのは不十分。hypothesis→intervention→prediction→replicationのscientific workflowとして扱う。


### patching experimentのcontrolを置く

clean inputでcorrect output、corrupted inputでfailureを作り、clean runの特定activationをcorrupted runへpatchしてperformanceが回復するか測る。回復すればそのactivationがrelevant causal pathwayの候補。

ただしpatch magnitude/out-of-distribution state、multiple redundant pathwaysがconfoundになる。random layer/control positionsやreverse interventionでspecificityを確認する。

## 途中を飛ばさず全体をつなぐ

### mechanistic interpretabilityの導出を一本につなげる

mechanistic interpretabilityはinternal activations/weightsを介してmodel computationの因果的構造を理解しようとする。correlational probeとcausal interventionを区別する。

#### 1. layer composition

まず出発点を固定する。 $h^{l+1}=F_l(h^l)$。behaviorは多数layers/pathsのcomposition。 次に必要になるのは「probe」である。

#### 2. probe

ここまでで得た結果を次の段階へ渡す。 activationからpropertyをpredictできることはinformation presenceを示すが、そのinformationがbehaviorに使われることを証明しない。 次に必要になるのは「intervention」である。

#### 3. intervention

最後に、前二段階の結果をまとめて結論へ進む。 activation patching/ablation等でinternal variableを変えoutput effectを測りcausal relevanceを検査。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{h}^{(l+1)}=F_l(\mathbf{h}^{(l)})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

particular head ablationでspecific task scoreが落ちるか、matched controlsと比較。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

linear probe high accuracyでもnetworkがそのlinear directionをdecisionに使うとは限らない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

attention visualizationだけでreasoning circuitを確定しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

particular head ablationでspecific task scoreが落ちるか、matched controlsと比較。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

linear probe high accuracyでもnetworkがそのlinear directionをdecisionに使うとは限らない。

## 成立条件と、条件を外したときに何が壊れるか

- 相関するactivationが因果的役割とは限らない。
- 介入実験で検証する。
- mechanistic interpretabilityの定義と計算手順を区別し、数値例だけで一般性を判断しない。

attention visualizationだけでreasoning circuitを確定しない。

## よくある誤解を分解する

- mechanistic interpretabilityの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

mechanistic interpretabilityでは、式へ数値を代入するだけでは不十分である。attention visualizationだけでreasoning circuitを確定しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

baseline/control, multiple examples, layer normalization confounds, reproducible hooks。

## ここから一段だけ発展する

internal understandingだけでなくoutput confidenceをcalibrateし必要ならabstainするdecision policyへ。


## このTopicを理解できたか確認する問い

- 「layer composition」を式を見ずに説明できるか
- 「intervention」までの論理を一段ずつ再現できるか
- mechanistic interpretabilityの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-interpretability-mechanistic)　|　[スライドへ](/slides/frontier-interpretability-mechanistic/)
