# CNNと畳み込み：教科書

Course 09｜深層学習｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-optimization-regularization` で得た概念を使い、ここでは CNNと畳み込み へ進む。

前提として使うのは `mat-convolution-linear-systems`、`dl-perceptron-mlp` です。

## まず直感を作る

CNNは局所kernelを共有して画像上を走査し、位置ごとの同じパターンを検出する。



## 図の解説

<img src="/visuals/course-09/dl-cnn-convolution.png" alt="CNNと畳み込みの図解" style="max-height: 440px; display:block; margin:0 auto;" />

小さな画像上を3×3 kernelが移動してfeature mapを作る。 小さなkernelが画像上を共有されながら走査する。同じ重みを位置ごとに再利用するためparameter数を抑えつつ局所patternを検出できる。

## 記号・型・次元

- $x_{i,j,c}$：input feature map
- $w_{a,b,c,k}$：kernel
- $y_{i,j,k}$：output
- stride/padding


## 正式な定義・代表式

CNNはspatially shared local kernelsでfeaturesを抽出。weight sharingによりtranslation-equivariant structureとparameter efficiencyを得る。

代表式は

$$
y_{i,j,k}=\sum_{a,b,c}w_{a,b,c,k}x_{i+a,j+b,c}
$$

です。

## なぜこの式・結論になるのか

### 1. local receptive field

output位置(i,j)は近傍patchのweighted sum。full dense connectivityではない。

### 2. weight sharing

同じkernel wを全位置で使うため、inputをshiftするとboundary effectsを除きfeature mapもshift。

### 3. multi-channel

kernelはinput channels cをsumしoutput channel kを作る。shape formulaをstride/padding/kernel sizeから計算。

## 教科書が省略しやすい一段を補う


### convolutionがtranslation structureを利用する

2D convolutionはsmall kernel weightsを全positionで共有し、各local patchとのinner productを取る。fully connected layerなら位置ごと別parameterだが、weight sharingでparameter countをkernel size×channelsに抑える。同じfeature detectorが画像のどこに現れても反応するtranslation equivarianceが得られる。

stride/padding/dilationでoutput spatial shapeとreceptive fieldが変わる。multiple layersを重ねるとlocal kernelsでもeffective receptive fieldが広がる。pooling/strideはresolutionを落としinvarianceを増やす一方fine localizationを失う。



## 途中を飛ばさず全体をつなぐ

### CNNと畳み込みの導出を一本につなげる

CNNはspatially shared local kernelsでfeaturesを抽出。weight sharingによりtranslation-equivariant structureとparameter efficiencyを得る。

#### 1. local receptive field

まず出発点を固定する。 output位置(i,j)は近傍patchのweighted sum。full dense connectivityではない。 次に必要になるのは「weight sharing」である。

#### 2. weight sharing

ここまでで得た結果を次の段階へ渡す。 同じkernel wを全位置で使うため、inputをshiftするとboundary effectsを除きfeature mapもshift。 次に必要になるのは「multi-channel」である。

#### 3. multi-channel

最後に、前二段階の結果をまとめて結論へ進む。 kernelはinput channels cをsumしoutput channel kを作る。shape formulaをstride/padding/kernel sizeから計算。

#### 代表式へ戻す

以上をまとめた中心式は

$$
y_{i,j,k}=\sum_{a,b,c}w_{a,b,c,k}x_{i+a,j+b,c}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

3×3 edge kernelはimageのlocal intensity differenceへresponse。same kernelが全位置でedge detector。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

1×1 convolutionはspatial mixingせずchannel linear combination。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

padding choiceでstrict equivarianceがboundaryで壊れる。rotation invarianceはstandard convolutionから自動で得られない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

3×3 edge kernelはimageのlocal intensity differenceへresponse。same kernelが全位置でedge detector。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

1×1 convolutionはspatial mixingせずchannel linear combination。

## 成立条件と、条件を外したときに何が壊れるか

- stride/paddingで出力shapeが変わる。
- 畳み込み実装は数学的convolutionと向きが異なる場合がある。
- CNNと畳み込みの定義と計算手順を区別し、数値例だけで一般性を判断しない。

padding choiceでstrict equivarianceがboundaryで壊れる。rotation invarianceはstandard convolutionから自動で得られない。

## よくある誤解を分解する

- CNNと畳み込みの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

CNNと畳み込みでは、式へ数値を代入するだけでは不十分である。padding choiceでstrict equivarianceがboundaryで壊れる。rotation invarianceはstandard convolutionから自動で得られない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

frameworkはcross-correlation conventionが一般的。NCHW/NHWC shape、dilation/groups確認。

## ここから一段だけ発展する

spatial grid以外のordered sequenceではshared recurrent stateやattentionを使う。まずRNN。


## このTopicを理解できたか確認する問い

- 「local receptive field」を式を見ずに説明できるか
- 「multi-channel」までの論理を一段ずつ再現できるか
- CNNと畳み込みの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-cnn-convolution)　|　[スライドへ](/slides/dl-cnn-convolution/)
