# 深層modelの評価・robustness・安全性：教科書

Course 09｜深層学習｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-efficient-training-inference` で得た概念を使い、ここでは 深層modelの評価・robustness・安全性 へ進む。

前提として使うのは `ml-uncertainty-interpretability-monitoring`、`stat-hypothesis-testing` です。

## まず直感を作る

robustnessと安全性では平均性能だけでなく、摂動・分布変化・悪意ある入力での最悪挙動を調べる。



## 図の解説

<img src="/visuals/course-09/dl-evaluation-robustness-safety.png" alt="深層modelの評価・robustness・安全性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

通常入力と摂動入力のloss分布を比較する。 入力からmodel出力、評価・監視までの経路上でfailure modeを置く。robustness・misuse・distribution shiftなど異なるリスクを同一指標へ潰さない。

## 記号・型・次元

- $\delta$：input perturbation
- $\|\delta\|\le\varepsilon$
- $L(f(x+\delta),y)$：adversarial loss
- robustness/safety metrics


## 正式な定義・代表式

robust evaluationはdistribution shift, adversarial perturbation, subgroup failure等を通常accuracyと分離。adversarial robustnessはallowed perturbation set内worst-case lossで定式化できる。

代表式は

$$
\max_{\|\boldsymbol{\delta}\|\le\varepsilon}\mathcal{L}(f(\mathbf{x}+\boldsymbol{\delta}),y)
$$

です。

## なぜこの式・結論になるのか

### 1. inner maximization

fixed modelでallowed δ内lossを最大化しworst-case exampleを探す。

### 2. outer training/evaluation

robust trainingならparameterをそのworst-case lossを小さくする方向へ。evaluationではattack strength不足をfalse robustnessと区別。

### 3. safety broadening

robustnessだけでなくmisuse, harmful outputs, privacy, calibration, monitoring等は別metric/experiment。

## 教科書が省略しやすい一段を補う


### average test scoreの外側にfailure distributionを見る

deep modelはiid test accuracyだけでなくdistribution shift, perturbation, subgroup, calibration, OOD, adversarial/misuse contextで挙動が変わる。robustness testは「少し入力を変えて意味は同じ」条件を明確にし、attack strengthやthreat modelを定義する。

safetyはtechnical failureとhuman/system misuseを含み、single benchmarkへ還元できない。model version, prompt/data, decoding settingsを固定し、failure taxonomyとseverityを記録する。evaluation data leakageやbenchmark overfittingも監視する。



## 途中を飛ばさず全体をつなぐ

### 深層modelの評価・robustness・安全性の導出を一本につなげる

robust evaluationはdistribution shift, adversarial perturbation, subgroup failure等を通常accuracyと分離。adversarial robustnessはallowed perturbation set内worst-case lossで定式化できる。

#### 1. inner maximization

まず出発点を固定する。 fixed modelでallowed δ内lossを最大化しworst-case exampleを探す。 次に必要になるのは「outer training/evaluation」である。

#### 2. outer training/evaluation

ここまでで得た結果を次の段階へ渡す。 robust trainingならparameterをそのworst-case lossを小さくする方向へ。evaluationではattack strength不足をfalse robustnessと区別。 次に必要になるのは「safety broadening」である。

#### 3. safety broadening

最後に、前二段階の結果をまとめて結論へ進む。 robustnessだけでなくmisuse, harmful outputs, privacy, calibration, monitoring等は別metric/experiment。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\max_{\|\boldsymbol{\delta}\|\le\varepsilon}\mathcal{L}(f(\mathbf{x}+\boldsymbol{\delta}),y)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

FGSM/PGDでsmall norm perturbationにaccuracyが落ちるか比較。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

corruption benchmarkでblur/noise/lightingごとにperformance breakdown。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

1種類のattackに耐えた=安全/robust全般ではない。threat model外failureは未評価。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

FGSM/PGDでsmall norm perturbationにaccuracyが落ちるか比較。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

corruption benchmarkでblur/noise/lightingごとにperformance breakdown。

## 成立条件と、条件を外したときに何が壊れるか

- benchmarkに合わせすぎると未知の失敗を見逃す。
- 安全性は単一metricで表せない。
- 深層modelの評価・robustness・安全性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

1種類のattackに耐えた=安全/robust全般ではない。threat model外failureは未評価。

## よくある誤解を分解する

- 深層modelの評価・robustness・安全性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

深層modelの評価・robustness・安全性では、式へ数値を代入するだけでは不十分である。1種類のattackに耐えた=安全/robust全般ではない。threat model外failureは未評価。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

clean vs robust accuracy、attack parameters、random restarts、subgroup metrics、model versionを記録。

## ここから一段だけ発展する

Course10ではfoundation model規模でpretraining, adaptation, retrieval, agents, alignment/evaluationへ発展する。


## このTopicを理解できたか確認する問い

- 「inner maximization」を式を見ずに説明できるか
- 「safety broadening」までの論理を一段ずつ再現できるか
- 深層modelの評価・robustness・安全性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-evaluation-robustness-safety)　|　[スライドへ](/slides/dl-evaluation-robustness-safety/)
