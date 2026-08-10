# multimodal model：教科書

Course 09｜深層学習｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-graph-neural-networks` で得た概念を使い、ここでは multimodal model へ進む。

前提として使うのは `dl-attention-mechanism`、`dl-embeddings-representation-learning` です。

## まず直感を作る

multimodal modelは異なるmodalityを共通表現空間へ写し、対応するtext/imageなどを近づける。



## 図の解説

<img src="/visuals/course-09/dl-multimodal-models.png" alt="multimodal modelの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つのembedding群を共通平面でpairごとに線で結ぶ。 画像・文字など異なるencoderの表現を共通空間またはcross-attentionで結び、片方の情報がもう片方の予測へ流れる。

## 記号・型・次元

- $z_{text},z_{image}\in\mathbb R^d$
- $s=cos(z_t,z_i)$
- paired data


## 正式な定義・代表式

multimodal modelsはmodality-specific encodersとshared/aligned latent space、またはcross-attentionでinformationを融合する。

代表式は

$$
s(\mathbf{z}_{text},\mathbf{z}_{image})=\frac{\mathbf{z}_{text}^{\mathsf T}\mathbf{z}_{image}}{\|\mathbf{z}_{text}\|\|\mathbf{z}_{image}\|}
$$

です。

## なぜこの式・結論になるのか

### 1. dual encoder

text/imageを別encoderでsame d embeddingsへ。

### 2. contrastive alignment

matched pair similarityをhigh、unmatched lowにするInfoNCEでspacesをalign。

### 3. cross-attention fusion

one modality queries, other keys/valuesとしてfine-grained interaction。

## 教科書が省略しやすい一段を補う


### 異なるmodalityをどのspaceで合わせるかが設計の中心

image encoderとtext encoderを別々に使いshared embedding spaceでcontrastive alignmentする方法、tokenized visual featuresをlanguage modelへ入れる方法、cross-attentionで一方をquery・他方をkey/valueにする方法などがある。単にfeaturesをconcatenateするだけではscale/sequence/semanticsの違いを扱えない。

paired dataはalignment signalを与えるがspurious correlationsも学ぶ。modality欠損、conflicting evidence、dataset biasを評価する。text metricだけでvision grounding qualityを判断しない。



## 途中を飛ばさず全体をつなぐ

### multimodal modelの導出を一本につなげる

multimodal modelsはmodality-specific encodersとshared/aligned latent space、またはcross-attentionでinformationを融合する。

#### 1. dual encoder

まず出発点を固定する。 text/imageを別encoderでsame d embeddingsへ。 次に必要になるのは「contrastive alignment」である。

#### 2. contrastive alignment

ここまでで得た結果を次の段階へ渡す。 matched pair similarityをhigh、unmatched lowにするInfoNCEでspacesをalign。 次に必要になるのは「cross-attention fusion」である。

#### 3. cross-attention fusion

最後に、前二段階の結果をまとめて結論へ進む。 one modality queries, other keys/valuesとしてfine-grained interaction。

#### 代表式へ戻す

以上をまとめた中心式は

$$
s(\mathbf{z}_{text},\mathbf{z}_{image})=\frac{\mathbf{z}_{text}^{\mathsf T}\mathbf{z}_{image}}{\|\mathbf{z}_{text}\|\|\mathbf{z}_{image}\|}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

image-caption retrievalでmatched cosineをmaximize。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

vision-language generationではimage tokensをlanguage decoder contextへ。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

alignment score高でもmodality-specific detailが失われる場合。paired dataset bias。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

image-caption retrievalでmatched cosineをmaximize。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

vision-language generationではimage tokensをlanguage decoder contextへ。

## 成立条件と、条件を外したときに何が壊れるか

- modalityごとのscaleと欠損を考える。
- 高い類似度を因果関係とみなさない。
- multimodal modelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

alignment score高でもmodality-specific detailが失われる場合。paired dataset bias。

## よくある誤解を分解する

- multimodal modelの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

multimodal modelでは、式へ数値を代入するだけでは不十分である。alignment score高でもmodality-specific detailが失われる場合。paired dataset bias。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

normalization、temperature、batch negatives、token count imbalance。

## ここから一段だけ発展する

大規模trainingではdata/parameterをdevicesへ分散しgradient aggregationが必要。


## このTopicを理解できたか確認する問い

- 「dual encoder」を式を見ずに説明できるか
- 「cross-attention fusion」までの論理を一段ずつ再現できるか
- multimodal modelの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-multimodal-models)　|　[スライドへ](/slides/dl-multimodal-models/)
