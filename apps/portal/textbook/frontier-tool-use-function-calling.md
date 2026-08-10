# tool useとfunction calling：教科書

Course 10｜Frontier｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-vector-databases-search` で得た概念を使い、ここでは tool useとfunction calling へ進む。

前提として使うのは `dm-algorithm-specifications-correctness`、`frontier-in-context-learning-prompting` です。

## まず直感を作る

agentは観測→状態更新→action/tool選択→結果観測を繰り返す閉ループsystem。



## 図の解説

<img src="/visuals/course-10/frontier-tool-use-function-calling.png" alt="tool useとfunction callingの図解" style="max-height: 440px; display:block; margin:0 auto;" />

plan, act, observe, memoryの循環を矢印で描く。 model出力がtool actionを選び、tool observationが次のmodel入力へ戻るloopを描く。単発生成と違い、外部状態の変化を観測しながら複数stepで方針を更新する。

## 記号・型・次元

- $s_t$：current state/context
- $\mathcal T$：available tools/schema
- $a_t$：tool callまたはlanguage action
- $\pi(a_t|s_t,\mathcal T)$：action policy


## 正式な定義・代表式

tool-using modelはnatural-language generationに加えstructured actionを選択し、external environment resultをobservationとして次stepへ取り込む。function callingはaction spaceをschemaで制約するinterface。

代表式は

$$
\pi(a_t\mid s_t,\mathcal{T})
$$

です。

## なぜこの式・結論になるのか

### 1. action selection

current stateとtool descriptionsからaction name+argumentsを生成。schema validationでsyntax spaceを狭める。

### 2. environment transition

tool executionはmodel内部knowledgeではなくexternal stateを変化/照会しobservation o_{t+1}を返す。

### 3. closed loop

新observationをcontextへ加え、次action/answerを選ぶ。one-shot text completionからinteractive decision processへ。

## 教科書が省略しやすい一段を補う


### tool useはlanguage outputを外部state transitionへ接続する

modelがstructured argumentsを生成し、runtimeがschema validation後にtool/APIを実行し、observationをcontextへ戻す。したがってmodel textそのものがDB変更や計算を直接行うのではなく、**proposal → validation → execution → observation** の境界がある。

tool schema, permission, idempotency, timeout/error, retryをsystem側で定義する。unsafe argumentsを自然言語instructionだけで防ぐのではなくruntime validationを持つ。tool resultは外部sourceなのでprovenance/freshnessを保持し、modelが古いmemoryで上書きしないようgroundingする。



## 途中を飛ばさず全体をつなぐ

### tool useとfunction callingの導出を一本につなげる

tool-using modelはnatural-language generationに加えstructured actionを選択し、external environment resultをobservationとして次stepへ取り込む。function callingはaction spaceをschemaで制約するinterface。

#### 1. action selection

まず出発点を固定する。 current stateとtool descriptionsからaction name+argumentsを生成。schema validationでsyntax spaceを狭める。 次に必要になるのは「environment transition」である。

#### 2. environment transition

ここまでで得た結果を次の段階へ渡す。 tool executionはmodel内部knowledgeではなくexternal stateを変化/照会しobservation o_{t+1}を返す。 次に必要になるのは「closed loop」である。

#### 3. closed loop

最後に、前二段階の結果をまとめて結論へ進む。 新observationをcontextへ加え、次action/answerを選ぶ。one-shot text completionからinteractive decision processへ。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\pi(a_t\mid s_t,\mathcal{T})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

currency conversion: live rate tool→result→calculation→answer。model memoryだけよりfresh dataを使える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

calendar writeはreadよりside effectが大きいためconfirmation/permission policyを別に設計。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

JSON schemaに合うcallでもsemantically正しい/安全とは限らない。wrong recipient/delete action等。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

currency conversion: live rate tool→result→calculation→answer。model memoryだけよりfresh dataを使える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

calendar writeはreadよりside effectが大きいためconfirmation/permission policyを別に設計。

## 成立条件と、条件を外したときに何が壊れるか

- tool出力を無条件に信頼しない。
- 停止条件とbudgetを明示する。
- tool useとfunction callingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

JSON schemaに合うcallでもsemantically正しい/安全とは限らない。wrong recipient/delete action等。

## よくある誤解を分解する

- tool useとfunction callingの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

tool useとfunction callingでは、式へ数値を代入するだけでは不十分である。JSON schemaに合うcallでもsemantically正しい/安全とは限らない。wrong recipient/delete action等。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

tool allowlist、argument validation、timeouts、idempotency、retry、audit log、user confirmation boundaries。

## ここから一段だけ発展する

複数tool stepsをgoal達成まで組むとagent planning/memory problemになる。


## このTopicを理解できたか確認する問い

- 「action selection」を式を見ずに説明できるか
- 「closed loop」までの論理を一段ずつ再現できるか
- tool useとfunction callingの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-tool-use-function-calling)　|　[スライドへ](/slides/frontier-tool-use-function-calling/)
