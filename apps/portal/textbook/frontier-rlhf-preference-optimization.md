# RLHFとpreference optimization：教科書

Course 10｜Frontier｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-multi-agent-systems` で得た概念を使い、ここでは RLHFとpreference optimization へ進む。

前提として使うのは `opt-stochastic-gradient`、`ml-logistic-regression` です。

## まず直感を作る

preference optimizationは候補応答の比較データから、望ましい応答を相対的に高確率にする。



## 図の解説

<img src="/visuals/course-10/frontier-rlhf-preference-optimization.png" alt="RLHFとpreference optimizationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

chosen/rejected pairからpolicy更新へ流れるpipelineを描く。 同じpromptへの複数応答の選好比較から、望ましい出力方向を学ぶ。DPO等では選好された応答と非選好応答の相対log-probabilityを直接最適化する。

## 記号・型・次元

- $x$：prompt
- $y_w,y_l$：preferred/rejected responses
- $\pi_\theta$：policy
- $\pi_{ref}$：reference policy
- $\beta$：deviation strength


## 正式な定義・代表式

preference optimizationはhuman/model pairwise preferencesからrelative quality signalを学びpolicyをalign。DPOは特定RLHF model下でreward model+RL loopをlog-ratio classification objectiveへ変形した方法。

代表式は

$$
\mathcal{L}_{DPO}=-\log\sigma(\beta[\log\pi_\theta(y_w\mid x)-\log\pi_\theta(y_l\mid x)-\Delta_{ref}])
$$

です。

## なぜこの式・結論になるのか

### 1. relative preference

absolute scoreより $P(y_w\succ y_l|x)$ をmodel化。Bradley–Terry型でreward differenceをsigmoidへ。

### 2. policy-reward relation

KL-regularized optimal policyではrewardが $\beta\log[\pi^*(y|x)/\pi_{ref}(y|x)]$ とconstantで表せる。

### 3. DPO objective

reward differenceへlog policy ratioを代入し、preferred pair probabilityのnegative logを直接minimizeする。

## 教科書が省略しやすい一段を補う


### preference dataは「正解label」ではなく相対比較を与える

prompt xに対しchosen y_w と rejected y_l のpairから、reward modelやdirect preference objectiveは「どちらをより好むか」を学ぶ。RLHFではreward model→policy optimizationという段階、DPO型ではreference policyとのlog-ratioを使いpairwise preferenceを直接policy objectiveへ変換する。

preferenceはannotator population, rubric, contextに依存しabsolute truthではない。reward hacking, verbosity bias, style preference等を切り分ける。alignment dataへのfitとbroad capability/safety generalizationを別evaluationで測る。


### preference probability modelを式で読む

Bradley–Terry型では reward差から $P(y_w\succ y_l|x)=\sigma(r(x,y_w)-r(x,y_l))$ とmodel化する。DPOはoptimal policyとrewardの関係を使い、chosen/rejectedのpolicy-vs-reference log-ratio差をlogistic objectiveで直接増やす。

重要なのはreference policyが「元のbehaviorからの離れすぎ」を測る基準になること。beta等のparameterでpreference fitとdeviationを調整する。

## 途中を飛ばさず全体をつなぐ

### RLHFとpreference optimizationの導出を一本につなげる

preference optimizationはhuman/model pairwise preferencesからrelative quality signalを学びpolicyをalign。DPOは特定RLHF model下でreward model+RL loopをlog-ratio classification objectiveへ変形した方法。

#### 1. relative preference

まず出発点を固定する。 absolute scoreより $P(y_w\succ y_l|x)$ をmodel化。Bradley–Terry型でreward differenceをsigmoidへ。 次に必要になるのは「policy-reward relation」である。

#### 2. policy-reward relation

ここまでで得た結果を次の段階へ渡す。 KL-regularized optimal policyではrewardが $\beta\log[\pi^*(y|x)/\pi_{ref}(y|x)]$ とconstantで表せる。 次に必要になるのは「DPO objective」である。

#### 3. DPO objective

最後に、前二段階の結果をまとめて結論へ進む。 reward differenceへlog policy ratioを代入し、preferred pair probabilityのnegative logを直接minimizeする。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{L}_{DPO}=-\log\sigma(\beta[\log\pi_\theta(y_w\mid x)-\log\pi_\theta(y_l\mid x)-\Delta_{ref}])
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

same promptにhelpful correct responseとless preferred response pairを作り、preferred log-ratioをreference relativeに増やす。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

βが大きい/小さいconventionでreferenceからのdeviation tradeoffが変わるためpaper/implementation定義を確認。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

preference data自体がbiased/inconsistentならoptimizerはそのbiasを学ぶ。preference=ground-truth safetyではない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

same promptにhelpful correct responseとless preferred response pairを作り、preferred log-ratioをreference relativeに増やす。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

βが大きい/小さいconventionでreferenceからのdeviation tradeoffが変わるためpaper/implementation定義を確認。

## 成立条件と、条件を外したときに何が壊れるか

- preference dataのbiasがpolicyへ入る。
- reward hackingやoveroptimizationを監視する。
- RLHFとpreference optimizationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

preference data自体がbiased/inconsistentならoptimizerはそのbiasを学ぶ。preference=ground-truth safetyではない。

## よくある誤解を分解する

- RLHFとpreference optimizationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

RLHFとpreference optimizationでは、式へ数値を代入するだけでは不十分である。preference data自体がbiased/inconsistentならoptimizerはそのbiasを学ぶ。preference=ground-truth safetyではない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

pair construction、reference model version、length bias、chosen/rejected leakage、reward/eval separation。

## ここから一段だけ発展する

preference optimizationはalignmentの一手段。policy constraints、red teaming、system safetyを広く次Topicで扱う。


## このTopicを理解できたか確認する問い

- 「relative preference」を式を見ずに説明できるか
- 「DPO objective」までの論理を一段ずつ再現できるか
- RLHFとpreference optimizationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-rlhf-preference-optimization)　|　[スライドへ](/slides/frontier-rlhf-preference-optimization/)
