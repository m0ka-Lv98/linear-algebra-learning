# Transformer：教科書

Course 09｜深層学習｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-attention-mechanism` で得た概念を使い、ここでは Transformer へ進む。

前提として使うのは `dl-attention-mechanism`、`dl-initialization-normalization` です。

## まず直感を作る

attentionはqueryとkeyの類似度から重みを作り、valueの加重平均で必要な情報を取り出す。



## 図の解説

<img src="/visuals/course-09/dl-transformers.png" alt="Transformerの図解" style="max-height: 440px; display:block; margin:0 auto;" />

attention matrixのheatmapで各tokenがどこを見るか可視化する。 行がquery、列がkey、セルがsoftmax後のattention weightである。各行の重み付き和でvalueを混ぜるため、queryごとに参照先が変わる。

## 記号・型・次元

- $H\in\mathbb R^{T\times d}$：token states
- $MHA(H)$：multi-head self-attention
- $FFN$：position-wise MLP
- $LN$：LayerNorm


## 正式な定義・代表式

Transformer blockはattentionによるtoken間mixingとFFNによるfeature-wise nonlinear transformをresidual pathで積み重ねる。

代表式は

$$
\mathbf{H}^{\prime}=\operatorname{LN}(\mathbf{H}+\operatorname{MHA}(\mathbf{H}))
$$

です。

## なぜこの式・結論になるのか

### 1. multi-head

各headでdifferent Q,K,V projectionsを作りattention、head outputsをconcat+linear projection。

### 2. residual block

$H\leftarrow H+MHA(H)$、then $H\leftarrow H+FFN(H)$（pre/post-LN variant）。identity pathでinformation/gradientを運ぶ。

### 3. position

self-attention aloneはpermutation equivariantなのでsequence orderを区別するにはpositional encoding/relative bias等を追加。

## 教科書が省略しやすい一段を補う


### Transformer blockを「attentionだけ」と理解しない

Transformer layerはmulti-head attentionでtoken間情報をmixし、position-wise feed-forward networkで各token representationをnonlinear変換し、residual+normalizationで深いoptimizationを安定化する。multi-headではhidden dimensionを複数subspacesへprojectionし異なるrelationを並列に捉える。

sequence orderはattention自体にはpermutation equivariantなのでposition informationを別途入れる。causal LMではfuture maskでtoken tが≤tだけを見る。attention matrix costがsequence length Lに対しO(L²)になることがlong-context efficiency問題の出発点。


### causal language modelのshapeを一層追う

batch B, length L, hidden dならhidden HはB×L×d。各headのQ,K,VはB×L×d_h、score $QK^T$ はB×L×L。causal maskでupper triangleを禁止しsoftmax、Vと掛けてB×L×d_hへ戻す。heads concat後B×L×d。

このshapeからattention memoryがL²に増える理由が直接分かる。FFNは各position independently d→d_ff→dだがattentionがpositions間をmixする。

## 途中を飛ばさず全体をつなぐ

### Transformerの導出を一本につなげる

Transformer blockはattentionによるtoken間mixingとFFNによるfeature-wise nonlinear transformをresidual pathで積み重ねる。

#### 1. multi-head

まず出発点を固定する。 各headでdifferent Q,K,V projectionsを作りattention、head outputsをconcat+linear projection。 次に必要になるのは「residual block」である。

#### 2. residual block

ここまでで得た結果を次の段階へ渡す。 $H\leftarrow H+MHA(H)$、then $H\leftarrow H+FFN(H)$（pre/post-LN variant）。identity pathでinformation/gradientを運ぶ。 次に必要になるのは「position」である。

#### 3. position

最後に、前二段階の結果をまとめて結論へ進む。 self-attention aloneはpermutation equivariantなのでsequence orderを区別するにはpositional encoding/relative bias等を追加。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{H}^{\prime}=\operatorname{LN}(\mathbf{H}+\operatorname{MHA}(\mathbf{H}))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

one headはlocal syntactic relation、anotherはlong-range dependencyなどdifferent subspacesを学習し得る。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

causal decoderはtriangular maskでnext-token autoregressive factorization。encoderはbidirectional maskなし。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「Transformer=attentionだけ」ではない。FFN, residual, normalization, positional informationがblockの重要要素。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

one headはlocal syntactic relation、anotherはlong-range dependencyなどdifferent subspacesを学習し得る。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

causal decoderはtriangular maskでnext-token autoregressive factorization。encoderはbidirectional maskなし。

## 成立条件と、条件を外したときに何が壊れるか

- softmax前のscaleが重要。
- padding/causal maskの意味を区別する。
- Transformerの定義と計算手順を区別し、数値例だけで一般性を判断しない。

「Transformer=attentionだけ」ではない。FFN, residual, normalization, positional informationがblockの重要要素。

## よくある誤解を分解する

- Transformerの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Transformerでは、式へ数値を代入するだけでは不十分である。「Transformer=attentionだけ」ではない。FFN, residual, normalization, positional informationがblockの重要要素。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

pre-LN/post-LN、RoPE、GQA等variantで式が変わる。model configを明示。

## ここから一段だけ発展する

residual/normalizationがなぜvery deep networkのoptimizationを支えるか次Topicで分離して見る。


## このTopicを理解できたか確認する問い

- 「multi-head」を式を見ずに説明できるか
- 「position」までの論理を一段ずつ再現できるか
- Transformerの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-transformers)　|　[スライドへ](/slides/dl-transformers/)
