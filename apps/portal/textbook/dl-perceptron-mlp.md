# perceptronと多層network：教科書

Course 09｜深層学習｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 09 の入口として、perceptronと多層network を定義から組み立てる。

前提として使うのは `ml-logistic-regression`、`calc-multivariable-chain-rule` です。

## まず直感を作る

ニューラルネットは線形変換と非線形変換を層状に合成し、複雑な関数を表現する。



## 図の解説

<img src="/visuals/course-09/dl-perceptron-mlp.png" alt="perceptronと多層networkの図解" style="max-height: 440px; display:block; margin:0 auto;" />

入力→hidden→出力のノードと重みの流れを描く。 ノードがactivation、辺が重み付き線形変換である。各層で線形変換の後に非線形関数を挟むため、層を重ねても単一の線形写像には潰れない。

## 記号・型・次元

- $x\in\mathbb R^d$：input
- $W\in\mathbb R^{h\times d}$：weight matrix
- $b\in\mathbb R^h$：bias
- $\phi$：activation
- $h=\phi(Wx+b)$


## 正式な定義・代表式

neural layerはaffine mapの後にnonlinear activationを適用する。MLPはこのlayerを合成し、linear modelでは表せないpiecewise/nonlinear functionを構成する。

代表式は

$$
\mathbf{h}=\phi(\mathbf{W}\mathbf{x}+\mathbf{b})
$$

です。

## なぜこの式・結論になるのか

### 1. affine map

$z=Wx+b$ はinput featureのlinear combination。各rowが1 hidden unitのpre-activation。

### 2. nonlinearityの必要性

activationがidentityならlayerを何段重ねても $W_L\cdots W_1x+\tilde b$ という1つのaffine mapに畳める。

### 3. composition

nonlinear φを挟むことでactivation patternごとに異なるlinear regionを作り、depthで複雑なcompositionを表現できる。

## 教科書が省略しやすい一段を補う


### 多層化で何が増えるのかを式で追う

1層は $\mathbf h=\phi(\mathbf W\mathbf x+\mathbf b)$。もしactivation φを外せば、二層linear mapsは $W_2(W_1x)= (W_2W_1)x$ と一つのlinear mapへ潰れる。したがってdepthだけではnonlinearityは増えず、activationを挟むことでinput spaceをpiecewise/nonlinearに折り曲げられる。

各layerでvector dimensionを明示し、$W_\ell\in\mathbb R^{d_\ell\times d_{\ell-1}}$、$h_\ell\in\mathbb R^{d_\ell}$ とする。parameter count、forward cost、representation dimensionがどこで増えるかをshapeから確認する。universal approximationは「有限dataで簡単に学習できる」ことを保証する定理ではない。



## 途中を飛ばさず全体をつなぐ

### perceptronと多層networkの導出を一本につなげる

neural layerはaffine mapの後にnonlinear activationを適用する。MLPはこのlayerを合成し、linear modelでは表せないpiecewise/nonlinear functionを構成する。

#### 1. affine map

まず出発点を固定する。 $z=Wx+b$ はinput featureのlinear combination。各rowが1 hidden unitのpre-activation。 次に必要になるのは「nonlinearityの必要性」である。

#### 2. nonlinearityの必要性

ここまでで得た結果を次の段階へ渡す。 activationがidentityならlayerを何段重ねても $W_L\cdots W_1x+\tilde b$ という1つのaffine mapに畳める。 次に必要になるのは「composition」である。

#### 3. composition

最後に、前二段階の結果をまとめて結論へ進む。 nonlinear φを挟むことでactivation patternごとに異なるlinear regionを作り、depthで複雑なcompositionを表現できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{h}=\phi(\mathbf{W}\mathbf{x}+\mathbf{b})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1D ReLU unit $h=max(0,wx+b)$ はthreshold点で傾きが変わる折れ線。複数unitを足すとpiecewise linear curveを作れる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

XORはsingle linear separatorで解けないがhidden layerで中間featuresを作れば分類可能。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

activationを全layerでlinearにするとparameter数が増えてもfunction classはlinearのまま。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1D ReLU unit $h=max(0,wx+b)$ はthreshold点で傾きが変わる折れ線。複数unitを足すとpiecewise linear curveを作れる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

XORはsingle linear separatorで解けないがhidden layerで中間featuresを作れば分類可能。

## 成立条件と、条件を外したときに何が壊れるか

- 非線形活性化がなければ多層線形networkも1層線形と同等。
- shapeを層ごとに追う。
- perceptronと多層networkの定義と計算手順を区別し、数値例だけで一般性を判断しない。

activationを全layerでlinearにするとparameter数が増えてもfunction classはlinearのまま。

## よくある誤解を分解する

- perceptronと多層networkの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

perceptronと多層networkでは、式へ数値を代入するだけでは不十分である。activationを全layerでlinearにするとparameter数が増えてもfunction classはlinearのまま。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

batch dimensionとfeature dimensionを明記。bias broadcasting、activation placement、parameter initializationをunit test。

## ここから一段だけ発展する

networkを学習するにはlossから各parameterへ微分を効率よく伝えるbackpropagationが必要。


## このTopicを理解できたか確認する問い

- 「affine map」を式を見ずに説明できるか
- 「composition」までの論理を一段ずつ再現できるか
- perceptronと多層networkの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-perceptron-mlp)　|　[スライドへ](/slides/dl-perceptron-mlp/)
