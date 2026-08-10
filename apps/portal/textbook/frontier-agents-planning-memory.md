# agent・planning・memory：教科書

Course 10｜Frontier｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-tool-use-function-calling` で得た概念を使い、ここでは agent・planning・memory へ進む。

前提として使うのは `frontier-tool-use-function-calling`、`dm-directed-graphs-dags-topological-order` です。

## まず直感を作る

agentは観測→状態更新→action/tool選択→結果観測を繰り返す閉ループsystem。



## 図の解説

<img src="/visuals/course-10/frontier-agents-planning-memory.png" alt="agent・planning・memoryの図解" style="max-height: 440px; display:block; margin:0 auto;" />

plan, act, observe, memoryの循環を矢印で描く。 model出力がtool actionを選び、tool observationが次のmodel入力へ戻るloopを描く。単発生成と違い、外部状態の変化を観測しながら複数stepで方針を更新する。

## 記号・型・次元

- $\tau=(s_0,a_0,o_1,\ldots,s_T)$：trajectory
- $g$：goal
- $m_t$：external/working memory
- $T$：horizon


## 正式な定義・代表式

agentはobservation→reason/state update→actionを繰り返し、long-horizon goalを達成するsystem。planningはfuture action sequence/contingencies、memoryはcontext外も含むstate persistence。

代表式は

$$
\tau=(s_0,a_0,o_1,\ldots,s_T)
$$

です。

## なぜこの式・結論になるのか

### 1. one-stepからtrajectoryへ

単発tool callではa_0だけ。multi-stepではaction resultが次stateを変え、future choiceへ依存。

### 2. planning

goalをsubgoalsへ分解し、preconditions/dependenciesを順序付ける。environment feedbackでplanを再計画。

### 3. memory selection

全historyを無限contextへ入れられないため、working context・summary・retrieval memoryなどで必要stateをselect。

## 教科書が省略しやすい一段を補う


### agentは「LLMを何回も呼ぶ」だけではない

state s_tからmodel/policyがaction a_tを選び、environment/tool observation o_{t+1}でstateを更新するloopとして整理できる。single-turn generationと違い、途中結果に応じてplanを修正できる。memoryはcontext内working memory、external persistent store、retrieval mechanismを分ける。

planning depthを増やすほどcost/latency/error accumulationも増える。termination condition、budget、tool permission、verification stepを設ける。self-reflection textが正しさを保証するわけではなく、external checksやdeterministic validatorsを利用できるtaskではそちらを優先する。


### loopのfailure probabilityがstep数で蓄積する

各stepが独立に成功確率pだとして単純化すると、全m step成功はp^m。p=0.99でもm=50なら約0.605。実際にはerrors correlatedだが、「1step modelが高精度だから長いagentも同じ精度」という推論が誤りだと分かる。

checkpoint/verification/replanningでerror propagationを途中で止める。長いchainを作るほど良いのではなく、必要なexternal state transitionsだけに分解する。

## 途中を飛ばさず全体をつなぐ

### agent・planning・memoryの導出を一本につなげる

agentはobservation→reason/state update→actionを繰り返し、long-horizon goalを達成するsystem。planningはfuture action sequence/contingencies、memoryはcontext外も含むstate persistence。

#### 1. one-stepからtrajectoryへ

まず出発点を固定する。 単発tool callではa_0だけ。multi-stepではaction resultが次stateを変え、future choiceへ依存。 次に必要になるのは「planning」である。

#### 2. planning

ここまでで得た結果を次の段階へ渡す。 goalをsubgoalsへ分解し、preconditions/dependenciesを順序付ける。environment feedbackでplanを再計画。 次に必要になるのは「memory selection」である。

#### 3. memory selection

最後に、前二段階の結果をまとめて結論へ進む。 全historyを無限contextへ入れられないため、working context・summary・retrieval memoryなどで必要stateをselect。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\tau=(s_0,a_0,o_1,\ldots,s_T)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

trip task: requirements収集→search→compare→calendar check→booking前confirmation。各stepのresultが次へ。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

ReAct型はreasoning/action/observationをinterleaveしexternal feedbackでplanを更新。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

長いplanを最初に固定し続けるとenvironment change/failed actionでerror propagation。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

trip task: requirements収集→search→compare→calendar check→booking前confirmation。各stepのresultが次へ。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

ReAct型はreasoning/action/observationをinterleaveしexternal feedbackでplanを更新。

## 成立条件と、条件を外したときに何が壊れるか

- tool出力を無条件に信頼しない。
- 停止条件とbudgetを明示する。
- agent・planning・memoryの定義と計算手順を区別し、数値例だけで一般性を判断しない。

長いplanを最初に固定し続けるとenvironment change/failed actionでerror propagation。

## よくある誤解を分解する

- agent・planning・memoryの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

agent・planning・memoryでは、式へ数値を代入するだけでは不十分である。長いplanを最初に固定し続けるとenvironment change/failed actionでerror propagation。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

state machine、max steps、loop detection、tool budgets、checkpoint/recovery、memory provenance。

## ここから一段だけ発展する

agentが複数になるとcoordination/game-theoretic interactionとcommunication overheadが追加される。


## このTopicを理解できたか確認する問い

- 「one-stepからtrajectoryへ」を式を見ずに説明できるか
- 「memory selection」までの論理を一段ずつ再現できるか
- agent・planning・memoryの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-agents-planning-memory)　|　[スライドへ](/slides/frontier-agents-planning-memory/)
