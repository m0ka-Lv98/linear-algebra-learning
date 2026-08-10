# Scientific Machine Learning：教科書

Course 10｜Frontier｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-synthetic-data-data-curation` で得た概念を使い、ここでは Scientific Machine Learning へ進む。

前提として使うのは `num-ode-euler-runge-kutta`、`dl-perceptron-mlp` です。

## まず直感を作る

Scientific MLは観測dataのlossと物理法則・方程式の残差を同時に最小化して、data不足を構造知識で補う。



## 図の解説

<img src="/visuals/course-10/frontier-scientific-machine-learning.png" alt="Scientific Machine Learningの図解" style="max-height: 440px; display:block; margin:0 auto;" />

data pointとphysics residualを同じ目的関数へ合流させる。 物理・科学modelが与える制約とdata-driven modelを同じ計算graphで結ぶ。単なる予測精度だけでなく保存則・境界条件・不確実性も評価対象になる。

## 記号・型・次元

- $L_{data}$：observation fit
- $L_{physics}$：equation/constraint residual
- $\lambda$：balance
- $u_\theta$：learned field/model


## 正式な定義・代表式

Scientific MLはdata-driven learningにdifferential equations, conservation laws, simulators, symmetries等のscientific structureを組み込む。PINN型ではdata lossとphysics residualを同時最適化。

代表式は

$$
\mathcal{L}=\mathcal{L}_{data}+\lambda\mathcal{L}_{physics}
$$

です。

## なぜこの式・結論になるのか

### 1. governing equation residual

PDE/ODE $F[u]=0$ にmodel $u_θ$ を代入しcollocation pointsで $r=F[u_θ]$。autodiffでderivatives計算。

### 2. combined objective

$L=L_{data}+λL_{physics}$。λはunits/scale/optimization dynamicsを調整。

### 3. inverse problem

unknown physical parametersもθと一緒にfitし、data+equationがidentifiabilityを補う場合。

## 教科書が省略しやすい一段を補う


### data fitへ科学的制約を加える位置を明確にする

scientific MLではobservation lossだけでなくPDE residual, conservation law, symmetry, boundary/initial conditions等をobjective/architecture/data generationへ組み込む。PINNならautodiffでmodel output derivativesを計算しdifferential equation residualをpenalizeする。

constraintをsoft penaltyにするとweightingがaccuracy/stabilityを左右し、hard architecture constraintとは保証が違う。simulation dataとexperimental dataのmodel discrepancy、不確実性、extrapolationを評価する。物理法則を入れたから常にordinary numerical solverより良いとは限らずbaseline比較が必要。



## 途中を飛ばさず全体をつなぐ

### Scientific Machine Learningの導出を一本につなげる

Scientific MLはdata-driven learningにdifferential equations, conservation laws, simulators, symmetries等のscientific structureを組み込む。PINN型ではdata lossとphysics residualを同時最適化。

#### 1. governing equation residual

まず出発点を固定する。 PDE/ODE $F[u]=0$ にmodel $u_θ$ を代入しcollocation pointsで $r=F[u_θ]$。autodiffでderivatives計算。 次に必要になるのは「combined objective」である。

#### 2. combined objective

ここまでで得た結果を次の段階へ渡す。 $L=L_{data}+λL_{physics}$。λはunits/scale/optimization dynamicsを調整。 次に必要になるのは「inverse problem」である。

#### 3. inverse problem

最後に、前二段階の結果をまとめて結論へ進む。 unknown physical parametersもθと一緒にfitし、data+equationがidentifiabilityを補う場合。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{L}=\mathcal{L}_{data}+\lambda\mathcal{L}_{physics}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

heat equationのtemperature fieldをsparse measurementsとPDE residualからfit。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

neural operatorは個別solutionでなくfunction-to-function mapをmultiple PDE instancesから学ぶ。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

physics lossが小さい=真のphysical solution一意とは限らない。boundary/initial conditions、model error、identifiabilityが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

heat equationのtemperature fieldをsparse measurementsとPDE residualからfit。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

neural operatorは個別solutionでなくfunction-to-function mapをmultiple PDE instancesから学ぶ。

## 成立条件と、条件を外したときに何が壊れるか

- physics constraintが誤っていればbiasになる。
- 単位と無次元化を確認する。
- Scientific Machine Learningの定義と計算手順を区別し、数値例だけで一般性を判断しない。

physics lossが小さい=真のphysical solution一意とは限らない。boundary/initial conditions、model error、identifiabilityが必要。

## よくある誤解を分解する

- Scientific Machine Learningの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Scientific Machine Learningでは、式へ数値を代入するだけでは不十分である。physics lossが小さい=真のphysical solution一意とは限らない。boundary/initial conditions、model error、identifiabilityが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

units/non-dimensionalization、collocation sampling、residual scales、baseline numerical solver comparison。

## ここから一段だけ発展する

最後にprivacy/governance/research practiceでtechnical performance以外のconstraintsとevidence standardsを統合する。


## このTopicを理解できたか確認する問い

- 「governing equation residual」を式を見ずに説明できるか
- 「inverse problem」までの論理を一段ずつ再現できるか
- Scientific Machine Learningの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-scientific-machine-learning)　|　[スライドへ](/slides/frontier-scientific-machine-learning/)
