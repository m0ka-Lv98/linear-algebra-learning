# privacy・governance・研究実践：教科書

Course 10｜Frontier｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-scientific-machine-learning` で得た概念を使い、ここでは privacy・governance・研究実践 へ進む。

前提として使うのは `stat-bayesian-inference-map`、`frontier-alignment-safety-policies` です。

## まず直感を作る

privacyとgovernanceはmodel性能だけでなく、data access、risk、audit、再現性をsystemとして管理する。



## 図の解説

<img src="/visuals/course-10/frontier-privacy-governance-research-practice.png" alt="privacy・governance・研究実践の図解" style="max-height: 440px; display:block; margin:0 auto;" />

data→training→deployment→auditのlifecycleを描く。 data収集、学習、評価、deployment、monitoringの各段階にprivacy・権限・auditのcontrol pointを置く。技術対策と運用制度を別レイヤで管理する。

## 記号・型・次元

- $D,D^{\prime}$：1 recordだけ異なるneighboring datasets
- $M$：randomized mechanism
- $(\varepsilon,\delta)$：differential privacy parameters
- $S$：output event


## 正式な定義・代表式

differential privacyはneighboring datasetsでoutput distributionが大きく変わらないことをformal guaranteeする。governanceはprivacyだけでなくdata rights, audit, documentation, deployment accountabilityを含む。

代表式は

$$
\mathbb{P}(M(D)\in S)\le e^{\varepsilon}\mathbb{P}(M(D^{\prime})\in S)+\delta
$$

です。

## なぜこの式・結論になるのか

### 1. neighbor comparison

1人のrecord有無で $P(M(D)\in S)$ と $P(M(D\prime)\in S)$ を全Sで比較。

### 2. multiplicative+additive bound

$P_D(S)\le e^\varepsilon P_{D\prime}(S)+\delta$。ε小ほどdistributionsが近くsingle-record influenceを制限。

### 3. composition

multiple DP mechanismsを同dataへ適用するとprivacy lossが累積するためbudget accountingが必要。

## 教科書が省略しやすい一段を補う


### privacy・governanceはdeployment後の付録ではなくdata lifecycle全体

data collectionでconsent/provenance、trainingでaccess/control、evaluationでsensitive leakage、deploymentでlogging/retention、更新でdeletion/versioningを管理する。differential privacyはneighboring datasets間のoutput distribution比をboundしindividual contributionの識別可能性を制御するが、utilityとのtrade-offを持つ。

governanceではmodel cardだけでなくdecision rights, audit trail, incident response, change managementを定義する。法令・組織policyは地域/時点で変わるため、教材では原理と検証手順を扱い、実運用時は最新の正式要件を確認する。



## 途中を飛ばさず全体をつなぐ

### privacy・governance・研究実践の導出を一本につなげる

differential privacyはneighboring datasetsでoutput distributionが大きく変わらないことをformal guaranteeする。governanceはprivacyだけでなくdata rights, audit, documentation, deployment accountabilityを含む。

#### 1. neighbor comparison

まず出発点を固定する。 1人のrecord有無で $P(M(D)\in S)$ と $P(M(D\prime)\in S)$ を全Sで比較。 次に必要になるのは「multiplicative+additive bound」である。

#### 2. multiplicative+additive bound

ここまでで得た結果を次の段階へ渡す。 $P_D(S)\le e^\varepsilon P_{D\prime}(S)+\delta$。ε小ほどdistributionsが近くsingle-record influenceを制限。 次に必要になるのは「composition」である。

#### 3. composition

最後に、前二段階の結果をまとめて結論へ進む。 multiple DP mechanismsを同dataへ適用するとprivacy lossが累積するためbudget accountingが必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbb{P}(M(D)\in S)\le e^{\varepsilon}\mathbb{P}(M(D^{\prime})\in S)+\delta
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

DP-SGDはper-example gradient clipping+noiseでtraining mechanismのprivacyをboundし、accountantでεを算定。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

model card/data sheet/eval reportでintended use, limitations, data provenance, known failuresをdocument。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

DP-SGDはper-example gradient clipping+noiseでtraining mechanismのprivacyをboundし、accountantでεを算定。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

model card/data sheet/eval reportでintended use, limitations, data provenance, known failuresをdocument。

## 成立条件と、条件を外したときに何が壊れるか

- privacy guaranteeとaccess controlを混同しない。
- policyは運用監査まで含めて実効性を持つ。
- privacy・governance・研究実践の定義と計算手順を区別し、数値例だけで一般性を判断しない。

「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。

## よくある誤解を分解する

- privacy・governance・研究実践の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

privacy・governance・研究実践では、式へ数値を代入するだけでは不十分である。「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

privacy accountant assumptions、access logs、retention、consent/license、incident response、reproducible research artifact。

## ここから一段だけ発展する

Course 10の終点では、新手法を追う際も「定義→仮定→実験設計→uncertainty→failure mode→governance」の順序で検証する習慣を残す。


## このTopicを理解できたか確認する問い

- 「neighbor comparison」を式を見ずに説明できるか
- 「composition」までの論理を一段ずつ再現できるか
- privacy・governance・研究実践の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-privacy-governance-research-practice)　|　[スライドへ](/slides/frontier-privacy-governance-research-practice/)
