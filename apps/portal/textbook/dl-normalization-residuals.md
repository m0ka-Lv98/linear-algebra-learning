# residual connectionとnormalization：教科書

Course 09｜深層学習｜Topic 10/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-transformers` で得た概念を使い、ここでは residual connectionとnormalization へ進む。

前提として使うのは `dl-initialization-normalization` です。

## まず直感を作る

normalizationは中間表現のスケールを整え、residual connectionは恒等経路を残して深いnetworkの学習を助ける。



## 図の解説

<img src="/visuals/course-09/dl-normalization-residuals.png" alt="residual connectionとnormalizationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

層を通る前後のactivation分布を比較する。 層へ入るactivation分布と正規化後の分布を比較する。尺度を制御することでoptimization landscapeとgradient scaleを扱いやすくする。

## 記号・型・次元

- $y=x+F(x)$：residual block
- $J=I+J_F$：local Jacobian
- $LN(x)$：feature-wise normalization


## 正式な定義・代表式

residual connectionはidentity mapをexplicit pathとして持ち、desired mappingをresidual Fとして学ぶ。normalizationはactivation scaleを制御する。

代表式は

$$
\mathbf{y}=\mathbf{x}+F(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. identity solution

F=0ならblockはexact identity。deep stackが少なくともinformationを通すparameterizationを持つ。

### 2. gradient path

Jacobian $I+J_F$ なのでbackpropにidentity contributionがあり、pure product J_Fのみよりgradient propagationを助ける。

### 3. LayerNorm

各token feature vector内mean/varianceでnormalizeしlearned γ,β。batch statisticsに依存しない。

## 教科書が省略しやすい一段を補う


### residual connectionはidentity pathを明示的に残す

block $y=x+F(x)$ のJacobianは $I+J_F$。gradientはidentity経路を通って直接前層へ流れる成分を持つため、深いcompositionが毎回完全な変換を学ぶよりoptimizationしやすい。Fが0ならidentityをexactly表せる点も重要。

Pre-LN/Post-LNでnormalization位置がgradient dynamicsを変える。residual additionにはshape一致が必要で、dimension変更時はprojectionを使う。residualはinformationを必ず保存する保証ではなく、networkが必要ならFでcancel/transformできるparameterization。



## 途中を飛ばさず全体をつなぐ

### residual connectionとnormalizationの導出を一本につなげる

residual connectionはidentity mapをexplicit pathとして持ち、desired mappingをresidual Fとして学ぶ。normalizationはactivation scaleを制御する。

#### 1. identity solution

まず出発点を固定する。 F=0ならblockはexact identity。deep stackが少なくともinformationを通すparameterizationを持つ。 次に必要になるのは「gradient path」である。

#### 2. gradient path

ここまでで得た結果を次の段階へ渡す。 Jacobian $I+J_F$ なのでbackpropにidentity contributionがあり、pure product J_Fのみよりgradient propagationを助ける。 次に必要になるのは「LayerNorm」である。

#### 3. LayerNorm

最後に、前二段階の結果をまとめて結論へ進む。 各token feature vector内mean/varianceでnormalizeしlearned γ,β。batch statisticsに依存しない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{y}=\mathbf{x}+F(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

100 blocksでもeach residual smallならstateはincremental updatesとして変化。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

pre-LNはsub-layer前にLNしresidual streamにidentity pathを保ちやすい。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

residualならgradient problemが完全解決するわけではなくscale/init/depthでinstability。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

100 blocksでもeach residual smallならstateはincremental updatesとして変化。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

pre-LNはsub-layer前にLNしresidual streamにidentity pathを保ちやすい。

## 成立条件と、条件を外したときに何が壊れるか

- trainとinferenceで統計量の扱いが異なる方式がある。
- residual加算はshape一致が必要。
- residual connectionとnormalizationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

residualならgradient problemが完全解決するわけではなくscale/init/depthでinstability。

## よくある誤解を分解する

- residual connectionとnormalizationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

residual connectionとnormalizationでは、式へ数値を代入するだけでは不十分である。residualならgradient problemが完全解決するわけではなくscale/init/depthでinstability。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

eps, RMSNorm vs LayerNorm, residual scalingをconfig確認。

## ここから一段だけ発展する

representationをlatent variableとしてprobabilisticにmodelするVAEへ。


## このTopicを理解できたか確認する問い

- 「identity solution」を式を見ずに説明できるか
- 「LayerNorm」までの論理を一段ずつ再現できるか
- residual connectionとnormalizationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-normalization-residuals)　|　[スライドへ](/slides/dl-normalization-residuals/)
