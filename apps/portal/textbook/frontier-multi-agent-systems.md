# multi-agent system：教科書

Course 10｜Frontier｜Topic 10/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-agents-planning-memory` で得た概念を使い、ここでは multi-agent system へ進む。

前提として使うのは `frontier-agents-planning-memory`、`dm-graphs-representations-degrees` です。

## まず直感を作る

multi-agent systemでは複数agentのpolicyが互いの結果へ影響し、協調・競争・通信設計が重要になる。



## 図の解説

<img src="/visuals/course-10/frontier-multi-agent-systems.png" alt="multi-agent systemの図解" style="max-height: 440px; display:block; margin:0 auto;" />

複数agentと共有環境のmessage流れを描く。 複数agentが異なる役割・状態を持ち、messageや共有環境を介して相互作用する。agent数を増やすだけでは協調が保証されず、通信protocolと責任分担が必要になる。

## 記号・型・次元

- $\pi_i$：agent i policy
- $U_i$：utility/objective
- $m_{ij}$：messages
- $n$：agents


## 正式な定義・代表式

multi-agent systemでは各agentがlocal information/roleを持ち、communication・coordination・competitionを通じjoint outcomeを作る。単一agentの並列コピーではない。

代表式は

$$
\max_{\pi_1,\ldots,\pi_n}\sum_i U_i(\pi_1,\ldots,\pi_n)
$$

です。

## なぜこの式・結論になるのか

### 1. joint policy

outcomeは $(\pi_1,\ldots,\pi_n)$ の相互作用に依存。各agent optimumがglobal optimumと一致するとは限らない。

### 2. division of labor

task decompositionでparallelism/専門化できるが、subtask interfacesとshared constraintsが必要。

### 3. coordination cost

messages/consensus/redundant workが増えるためagent数を増やせば単調にperformance向上とは限らない。

## 教科書が省略しやすい一段を補う


### agent数を増やすと情報量よりcoordination problemが増える

複数agentsへroleを分けるとparallel searchやspecializationが可能だが、shared objective, communication protocol, conflict resolution, stopping ruleが必要。全agentが同じmodel/dataならerrorsもcorrelatedしうるため、多数決だけでindependent verificationにはならない。

central coordinator型、peer-to-peer、debate等でinformation flowが異なる。evaluationではsingle-agent baselineと同じtoken/tool budgetで比較し、quality gainが単にcompute増加によるものかcoordination designによるものか分ける。



## 途中を飛ばさず全体をつなぐ

### multi-agent systemの導出を一本につなげる

multi-agent systemでは各agentがlocal information/roleを持ち、communication・coordination・competitionを通じjoint outcomeを作る。単一agentの並列コピーではない。

#### 1. joint policy

まず出発点を固定する。 outcomeは $(\pi_1,\ldots,\pi_n)$ の相互作用に依存。各agent optimumがglobal optimumと一致するとは限らない。 次に必要になるのは「division of labor」である。

#### 2. division of labor

ここまでで得た結果を次の段階へ渡す。 task decompositionでparallelism/専門化できるが、subtask interfacesとshared constraintsが必要。 次に必要になるのは「coordination cost」である。

#### 3. coordination cost

最後に、前二段階の結果をまとめて結論へ進む。 messages/consensus/redundant workが増えるためagent数を増やせば単調にperformance向上とは限らない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\max_{\pi_1,\ldots,\pi_n}\sum_i U_i(\pi_1,\ldots,\pi_n)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

researcher→critic→synthesizer rolesでindependent evidence collectionとreviewを分担。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

two agentsがsame resourceを書き換える場合locking/transactionが必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

majority voteはagents errorsがstrongly correlatedなら改善しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

researcher→critic→synthesizer rolesでindependent evidence collectionとreviewを分担。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

two agentsがsame resourceを書き換える場合locking/transactionが必要。

## 成立条件と、条件を外したときに何が壊れるか

- 個別最適が全体最適とは限らない。
- 通信コストと誤情報伝播を見る。
- multi-agent systemの定義と計算手順を区別し、数値例だけで一般性を判断しない。

majority voteはagents errorsがstrongly correlatedなら改善しない。

## よくある誤解を分解する

- multi-agent systemの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

multi-agent systemでは、式へ数値を代入するだけでは不十分である。majority voteはagents errorsがstrongly correlatedなら改善しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

role prompt、shared memory permissions、message protocol、termination/arbiter、cost attribution。

## ここから一段だけ発展する

behaviorをhuman preferenceへadaptするRLHF/preference optimizationへ。


## このTopicを理解できたか確認する問い

- 「joint policy」を式を見ずに説明できるか
- 「coordination cost」までの論理を一段ずつ再現できるか
- multi-agent systemの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-multi-agent-systems)　|　[スライドへ](/slides/frontier-multi-agent-systems/)
