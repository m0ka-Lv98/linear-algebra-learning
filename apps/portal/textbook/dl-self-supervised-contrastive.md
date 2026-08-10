# 自己教師あり・contrastive学習：教科書

Course 09｜深層学習｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-diffusion-score-models` で得た概念を使い、ここでは 自己教師あり・contrastive学習 へ進む。

前提として使うのは `la-inner-products-norms-angles`、`ml-feature-engineering-selection` です。

## まず直感を作る

contrastive学習は正例pairを近づけ、負例を遠ざけることでラベルなしに表現空間を整える。



## 図の解説

<img src="/visuals/course-09/dl-self-supervised-contrastive.png" alt="自己教師あり・contrastive学習の図解" style="max-height: 440px; display:block; margin:0 auto;" />

embedding平面でpositive pairが集まりnegativeが離れる様子を見る。 同じ対象の2 viewを近づけ、異なる対象を遠ざける。埋め込み空間の距離/角度がsemantic similarityを表すようにlossを設計する。

## 記号・型・次元

- $z,z^+$：positive pair embeddings
- $z_j$：negatives
- $s$：similarity
- $\tau$：temperature


## 正式な定義・代表式

contrastive learningはaugmentation等で同一意味のpositiveを近づけ、other samplesを相対的に遠ざけるclassification-like InfoNCE objective。

代表式は

$$
\mathcal{L}_{\mathrm{InfoNCE}}=-\log\frac{e^{s(z,z^+)/\tau}}{\sum_j e^{s(z,z_j)/\tau}}
$$

です。

## なぜこの式・結論になるのか

### 1. logits

$s(z,z_j)/τ$ をcandidate logitsとみなす。

### 2. softmax probability

positive j=+ のsoftmax probabilityを高めるnegative log likelihoodがInfoNCE。

### 3. temperature

τ小でsimilarity differencesを拡大しhard negativesへgradient集中。

## 教科書が省略しやすい一段を補う


### positive/negative pairがrepresentation geometryを作る

同一sampleのaugmentation pairをpositive、他samplesをnegativeとし、normalized embeddingsのsimilarityでInfoNCE lossを作る。positive similarityを上げるだけだと全sample同じvectorへのcollapseが可能なので、denominatorのnegative competitionまたは別のanti-collapse mechanismが必要。

augmentationは「何を同じ意味とみなすか」というinvariance assumption。画像でcolorを大きく変えてよいtaskと色がlabelのtaskでは適切augmentationが違う。pretraining objectiveの良さはdownstream transferで評価する。



## 途中を飛ばさず全体をつなぐ

### 自己教師あり・contrastive学習の導出を一本につなげる

contrastive learningはaugmentation等で同一意味のpositiveを近づけ、other samplesを相対的に遠ざけるclassification-like InfoNCE objective。

#### 1. logits

まず出発点を固定する。 $s(z,z_j)/τ$ をcandidate logitsとみなす。 次に必要になるのは「softmax probability」である。

#### 2. softmax probability

ここまでで得た結果を次の段階へ渡す。 positive j=+ のsoftmax probabilityを高めるnegative log likelihoodがInfoNCE。 次に必要になるのは「temperature」である。

#### 3. temperature

最後に、前二段階の結果をまとめて結論へ進む。 τ小でsimilarity differencesを拡大しhard negativesへgradient集中。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{L}_{\mathrm{InfoNCE}}=-\log\frac{e^{s(z,z^+)/\tau}}{\sum_j e^{s(z,z_j)/\tau}}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

同imageのcrop/color augmentをpositive、other imagesをnegative。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

negative-free methodsはcollapse回避にasymmetry/variance constraints等別機構。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

augmentationがsemantic labelを壊すと「同じにすべきでない」pairを近づける。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

同imageのcrop/color augmentをpositive、other imagesをnegative。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

negative-free methodsはcollapse回避にasymmetry/variance constraints等別機構。

## 成立条件と、条件を外したときに何が壊れるか

- augmentationが意味を壊すと学習も壊れる。
- temperatureがsoftmaxの鋭さを調整する。
- 自己教師あり・contrastive学習の定義と計算手順を区別し、数値例だけで一般性を判断しない。

augmentationがsemantic labelを壊すと「同じにすべきでない」pairを近づける。

## よくある誤解を分解する

- 自己教師あり・contrastive学習の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

自己教師あり・contrastive学習では、式へ数値を代入するだけでは不十分である。augmentationがsemantic labelを壊すと「同じにすべきでない」pairを近づける。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

embedding normalization、batch size/negative queue、distributed all-gather semantics。

## ここから一段だけ発展する

learned discrete/continuous representationsをembedding matrixとして整理する。


## このTopicを理解できたか確認する問い

- 「logits」を式を見ずに説明できるか
- 「temperature」までの論理を一段ずつ再現できるか
- 自己教師あり・contrastive学習の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-self-supervised-contrastive)　|　[スライドへ](/slides/dl-self-supervised-contrastive/)
