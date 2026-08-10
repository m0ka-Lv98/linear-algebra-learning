# activation関数とloss：教科書

Course 09｜深層学習｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-backprop-computation-graphs` で得た概念を使い、ここでは activation関数とloss へ進む。

前提として使うのは `stat-entropy-cross-entropy-kl-divergence`、`ml-softmax-multiclass` です。

## まず直感を作る

activation関数は線形層へ非線形性を入れ、lossは予測と目標のずれを学習信号へ変換する。



## 図の解説

<img src="/visuals/course-09/dl-activation-loss-functions.png" alt="activation関数とlossの図解" style="max-height: 440px; display:block; margin:0 auto;" />

ReLU, sigmoid, tanhの曲線と勾配が小さくなる領域を比較する。 曲線の傾きが逆伝播される局所gradientになる。sigmoid/tanhの飽和域では傾きが小さく、ReLUでは正側で一定なのでgradient伝播の性質が異なる。

## 記号・型・次元

- $\operatorname{ReLU}(x)=\max(0,x)$
- $z$：logit
- $p$：probability
- $L$：training objective


## 正式な定義・代表式

activationはrepresentation nonlinearityとgradient propagationを決め、lossはpredictionとtargetの不一致をscalar化する。classificationではsoftmax/sigmoidとlog-likelihood由来cross entropyを組み合わせる。

代表式は

$$
\operatorname{ReLU}(x)=\max(0,x)
$$

です。

## なぜこの式・結論になるのか

### 1. ReLU derivative

x>0でderivative1、x<0で0。x=0はsubgradient/convention。positive regionでsaturationしない。

### 2. binary CE from likelihood

Bernoulli likelihood $p^y(1-p)^{1-y}$ のnegative logが $-y\log p-(1-y)\log(1-p)$。

### 3. logit gradient

p=σ(z)とCEを合成すると $dL/dz=p-y$。chain ruleでsigmoid derivativeが整理され、numerically stable fused lossが使える。

## 教科書が省略しやすい一段を補う


### activationとlossはgradient flowまで含めて選ぶ

sigmoid derivativeは $\sigma(z)(1-\sigma(z))\le1/4$ なのでdeep chainで多数掛けるとgradientが小さくなりやすい。ReLUはpositive側derivative1でこの問題を緩和するがnegative側0でdead unitsが起こりうる。GELU等はsmooth gatingとして別trade-offを持つ。

classificationでsoftmax+cross entropyを組み合わせるとlogit gradientがp-yへ簡約される。これは数値的にも意味的にも扱いやすく、libraryのcombined lossはlog-sum-expでoverflowを避ける。lossをtask metricそのものと同一視せず、trainable surrogateとevaluation metricを分ける。



## 途中を飛ばさず全体をつなぐ

### activation関数とlossの導出を一本につなげる

activationはrepresentation nonlinearityとgradient propagationを決め、lossはpredictionとtargetの不一致をscalar化する。classificationではsoftmax/sigmoidとlog-likelihood由来cross entropyを組み合わせる。

#### 1. ReLU derivative

まず出発点を固定する。 x>0でderivative1、x<0で0。x=0はsubgradient/convention。positive regionでsaturationしない。 次に必要になるのは「binary CE from likelihood」である。

#### 2. binary CE from likelihood

ここまでで得た結果を次の段階へ渡す。 Bernoulli likelihood $p^y(1-p)^{1-y}$ のnegative logが $-y\log p-(1-y)\log(1-p)$。 次に必要になるのは「logit gradient」である。

#### 3. logit gradient

最後に、前二段階の結果をまとめて結論へ進む。 p=σ(z)とCEを合成すると $dL/dz=p-y$。chain ruleでsigmoid derivativeが整理され、numerically stable fused lossが使える。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{ReLU}(x)=\max(0,x)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

z=0,y=1ならp=0.5, gradient p-y=-0.5でzを上げる方向。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

tanhはboundedでzero-centeredだがlarge |z|でderivativeが小さくsaturation。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

z=0,y=1ならp=0.5, gradient p-y=-0.5でzを上げる方向。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

tanhはboundedでzero-centeredだがlarge |z|でderivativeが小さくsaturation。

## 成立条件と、条件を外したときに何が壊れるか

- 出力層のactivationとlossの組合せを確認する。
- 飽和領域でgradientが小さくなる。
- activation関数とlossの定義と計算手順を区別し、数値例だけで一般性を判断しない。

classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。

## よくある誤解を分解する

- activation関数とlossの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

activation関数とlossでは、式へ数値を代入するだけでは不十分である。classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

BCEWithLogits/CrossEntropyLossを使いlog(0)回避。reduction(mean/sum)でgradient scaleが変わる。

## ここから一段だけ発展する

deep layersでsignal/gradient scaleを保つためinitializationとnormalizationへ。


## このTopicを理解できたか確認する問い

- 「ReLU derivative」を式を見ずに説明できるか
- 「logit gradient」までの論理を一段ずつ再現できるか
- activation関数とlossの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-activation-loss-functions)　|　[スライドへ](/slides/dl-activation-loss-functions/)
