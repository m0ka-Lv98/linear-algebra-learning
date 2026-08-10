# GANとadversarial training：教科書

Course 09｜深層学習｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-autoencoders-vae` で得た概念を使い、ここでは GANとadversarial training へ進む。

前提として使うのは `stat-likelihood-maximum-likelihood`、`opt-nonconvex-diagnostics-hyperparameters` です。

## まず直感を作る

生成modelはデータ分布そのものを近似し、新しい標本を作る。adversarial学習ではgeneratorとdiscriminatorが競う。



## 図の解説

<img src="/visuals/course-09/dl-gans-adversarial-training.png" alt="GANとadversarial trainingの図解" style="max-height: 440px; display:block; margin:0 auto;" />

実データ分布と生成分布が反復で近づく様子を見る。 generatorが潜在変数から標本を作り、discriminatorが実データとの識別を試みる。両者の目的が対抗するminimax構造として学習が進む。

## 記号・型・次元

- $G(z)$：generator
- $D(x)$：real probability discriminator
- $p_{data},p_z$


## 正式な定義・代表式

GANはdiscriminatorがreal/fake分類をmax、generatorがfakeをrealらしくしてminするtwo-player objective。ideal discriminatorを代入するとdistribution divergence最小化に関係。

代表式は

$$
\min_G\max_D\;\mathbb{E}_{x\sim p_{data}}\log D(x)+\mathbb{E}_{z}\log(1-D(G(z)))
$$

です。

## なぜこの式・結論になるのか

### 1. D fixedでpointwise maximize

各xで $p_data\log D+p_g\log(1-D)$ をDについて最大化すると $D^*=p_data/(p_data+p_g)$。

### 2. generator objective

D*をvalueへ代入するとconstant + 2·JS divergence。global optimum p_g=p_data。

### 3. practical generator loss

original minimaxはDが強いとgradient saturationしやすく、non-saturating -log D(G(z))を使うことが多い。

## 教科書が省略しやすい一段を補う


### discriminatorとgeneratorが同じobjectiveを逆方向に動かす

original GANは
$\min_G\max_D E_{data}\log D(x)+E_z\log(1-D(G(z)))$。fixed Gでoptimal discriminatorは density ratioから $D^*(x)=p_{data}/(p_{data}+p_g)$。これを代入するとgeneratorはJensen–Shannon divergenceに関係するobjectiveをminimizeする。

実際にはsaturating gradient, mode collapse, training oscillationがありnonconvex game dynamicsはordinary minimizationと異なる。WGAN等はdistance/objectiveを変える。sample qualityだけでmode coverageを判断しない。



## 途中を飛ばさず全体をつなぐ

### GANとadversarial trainingの導出を一本につなげる

GANはdiscriminatorがreal/fake分類をmax、generatorがfakeをrealらしくしてminするtwo-player objective。ideal discriminatorを代入するとdistribution divergence最小化に関係。

#### 1. D fixedでpointwise maximize

まず出発点を固定する。 各xで $p_data\log D+p_g\log(1-D)$ をDについて最大化すると $D^*=p_data/(p_data+p_g)$。 次に必要になるのは「generator objective」である。

#### 2. generator objective

ここまでで得た結果を次の段階へ渡す。 D*をvalueへ代入するとconstant + 2·JS divergence。global optimum p_g=p_data。 次に必要になるのは「practical generator loss」である。

#### 3. practical generator loss

最後に、前二段階の結果をまとめて結論へ進む。 original minimaxはDが強いとgradient saturationしやすく、non-saturating -log D(G(z))を使うことが多い。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_G\max_D\;\mathbb{E}_{x\sim p_{data}}\log D(x)+\mathbb{E}_{z}\log(1-D(G(z)))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1D mixture targetをgenerator mappingでapproximate。Dはdensity ratio signalを提供。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

conditional GANはlabel/contextをG,D双方へ与えconditioned generation。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

minimax理論optimumが存在してもtraining dynamicsがそこへ安定収束する保証はない。mode collapse。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1D mixture targetをgenerator mappingでapproximate。Dはdensity ratio signalを提供。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

conditional GANはlabel/contextをG,D双方へ与えconditioned generation。

## 成立条件と、条件を外したときに何が壊れるか

- mode collapseなど分布全体を覆えない失敗がある。
- loss値だけで生成品質を判断しない。
- GANとadversarial trainingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

minimax理論optimumが存在してもtraining dynamicsがそこへ安定収束する保証はない。mode collapse。

## よくある誤解を分解する

- GANとadversarial trainingの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

GANとadversarial trainingでは、式へ数値を代入するだけでは不十分である。minimax理論optimumが存在してもtraining dynamicsがそこへ安定収束する保証はない。mode collapse。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

separate optimizer steps, spectral norm/gradient penalty等。FID等evaluation sample size。

## ここから一段だけ発展する

likelihood-free adversarialとは別に、noise addition/reversalでlikelihood-related generative modelingをするdiffusionへ。


## このTopicを理解できたか確認する問い

- 「D fixedでpointwise maximize」を式を見ずに説明できるか
- 「practical generator loss」までの論理を一段ずつ再現できるか
- GANとadversarial trainingの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-gans-adversarial-training)　|　[スライドへ](/slides/dl-gans-adversarial-training/)
