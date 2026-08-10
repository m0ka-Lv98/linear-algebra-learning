# alignment・安全policy・red teaming：教科書

Course 10｜Frontier｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-rlhf-preference-optimization` で得た概念を使い、ここでは alignment・安全policy・red teaming へ進む。

前提として使うのは `dl-evaluation-robustness-safety`、`frontier-rlhf-preference-optimization` です。

## まず直感を作る

alignmentとred teamingは、意図したpolicyと実際のmodel挙動の差を攻撃的テストで探す。



## 図の解説

<img src="/visuals/course-10/frontier-alignment-safety-policies.png" alt="alignment・安全policy・red teamingの図解" style="max-height: 440px; display:block; margin:0 auto;" />

通常testとadversarial testを分けた評価matrixを描く。 model capabilityの経路に対し、policy・preference・safety constraint・evaluationを別レイヤとして重ねる。性能向上と望ましい振る舞いは同じ目的関数ではない。

## 記号・型・次元

- $\mathcal X_{adv}$：adversarial/test space
- $Risk(f,x)$：harm/failure score
- $P$：policy/constraints
- threat model


## 正式な定義・代表式

alignment/safetyはmodel behaviorをintended goals/constraintsへ合わせ、adversarial misuse・accidental failure・distribution shiftを評価/mitigateするsystem problem。single scalar metricではない。

代表式は

$$
\max_{x\in\mathcal{X}_{adv}}\operatorname{Risk}(f_\theta,x)
$$

です。

## なぜこの式・結論になるのか

### 1. threat model

誰が何をでき、何を守るかを定義しないと「安全」の検証範囲が決まらない。

### 2. worst-case search

$\max_{x\in X_{adv}}Risk$ はred-team/adversarial evaluationの抽象形。search methodが弱いとriskを過小評価。

### 3. defense in depth

model training, policy classifier, tool permissions, sandbox, confirmation, monitoring等をlayer化しsingle failureをsystem harmへ直結させない。

## 教科書が省略しやすい一段を補う


### capability evaluationとsafety controlを別layerとして設計する

alignmentはdesired policy/specificationにbehaviorを近づける問題で、pretraining capabilityそのものと同一ではない。policy constraints, refusal behavior, tool permissions, monitoring, red teamingをsystem層へ配置する。安全性は「危険promptへの拒否率」だけでなくfalse refusal, jailbreak robustness, side effects, misuse contextを含む。

red teamingはfailureを探す探索であり、見つからなかったことが安全証明にはならない。threat modelとattacker capability、evaluation coverageを明示し、mitigation後にregression testsを残す。



## 途中を飛ばさず全体をつなぐ

### alignment・安全policy・red teamingの導出を一本につなげる

alignment/safetyはmodel behaviorをintended goals/constraintsへ合わせ、adversarial misuse・accidental failure・distribution shiftを評価/mitigateするsystem problem。single scalar metricではない。

#### 1. threat model

まず出発点を固定する。 誰が何をでき、何を守るかを定義しないと「安全」の検証範囲が決まらない。 次に必要になるのは「worst-case search」である。

#### 2. worst-case search

ここまでで得た結果を次の段階へ渡す。 $\max_{x\in X_{adv}}Risk$ はred-team/adversarial evaluationの抽象形。search methodが弱いとriskを過小評価。 次に必要になるのは「defense in depth」である。

#### 3. defense in depth

最後に、前二段階の結果をまとめて結論へ進む。 model training, policy classifier, tool permissions, sandbox, confirmation, monitoring等をlayer化しsingle failureをsystem harmへ直結させない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\max_{x\in\mathcal{X}_{adv}}\operatorname{Risk}(f_\theta,x)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

tool agentでread-only questionとmoney transferに同じpermission thresholdを使わずimpact別control。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

jailbreak benchmarkだけでなくbenign refusal/utilityも測りover-refusal tradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

特定benchmark scoreが高い=all-context safeではない。unknown attacks/distribution shiftを残す。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

tool agentでread-only questionとmoney transferに同じpermission thresholdを使わずimpact別control。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

jailbreak benchmarkだけでなくbenign refusal/utilityも測りover-refusal tradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- 既知attackに強いことと一般安全性は同じでない。
- policy違反率だけで有用性を無視しない。
- alignment・安全policy・red teamingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

特定benchmark scoreが高い=all-context safeではない。unknown attacks/distribution shiftを残す。

## よくある誤解を分解する

- alignment・安全policy・red teamingの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

alignment・安全policy・red teamingでは、式へ数値を代入するだけでは不十分である。特定benchmark scoreが高い=all-context safeではない。unknown attacks/distribution shiftを残す。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

incident taxonomy、red-team dataset version、policy changes、false positive/negative、human escalation。

## ここから一段だけ発展する

安全を含むfoundation model evaluationをstatistical experimentとして設計する。


## このTopicを理解できたか確認する問い

- 「threat model」を式を見ずに説明できるか
- 「defense in depth」までの論理を一段ずつ再現できるか
- alignment・安全policy・red teamingの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-alignment-safety-policies)　|　[スライドへ](/slides/frontier-alignment-safety-policies/)
