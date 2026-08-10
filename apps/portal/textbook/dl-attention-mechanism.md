# attention機構：教科書

Course 09｜深層学習｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-rnn-sequence-models` で得た概念を使い、ここでは attention機構 へ進む。

前提として使うのは `la-matrix-multiplication`、`ml-softmax-multiclass` です。

## まず直感を作る

attentionはqueryとkeyの類似度から重みを作り、valueの加重平均で必要な情報を取り出す。



## 図の解説

<img src="/visuals/course-09/dl-attention-mechanism.png" alt="attention機構の図解" style="max-height: 440px; display:block; margin:0 auto;" />

attention matrixのheatmapで各tokenがどこを見るか可視化する。 行がquery、列がkey、セルがsoftmax後のattention weightである。各行の重み付き和でvalueを混ぜるため、queryごとに参照先が変わる。

## 記号・型・次元

- $Q\in\mathbb R^{n_q\times d_k}$：queries
- $K\in\mathbb R^{n_k\times d_k}$：keys
- $V\in\mathbb R^{n_k\times d_v}$：values
- $A=softmax(QK^T/\sqrt{d_k})$：attention weights


## 正式な定義・代表式

scaled dot-product attentionはquery-key similarityからrow-wise probability weightsを作り、valuesのweighted averageを出す。

代表式は

$$
\operatorname{Attention}(\mathbf{Q},\mathbf{K},\mathbf{V})=\operatorname{softmax}(\mathbf{Q}\mathbf{K}^{\mathsf T}/\sqrt{d_k})\mathbf{V}
$$

です。

## なぜこの式・結論になるのか

### 1. score matrix shape

$QK^T$ はn_q×n_k。entry q_i^Tk_jがquery iとkey jのcompatibility。

### 2. なぜ1/√d_k

independent unit-variance componentsならdot product variance≈d_k。√d_kで割りlogit scaleをO(1)にしsoftmax saturationを抑える。

### 3. weighted sum

Aの各rowはsoftmaxでsum1。$AV$ は各queryごとにvaluesのconvex weighted combination、shape n_q×d_v。

## 教科書が省略しやすい一段を補う


### scaled dot-productの $1/\sqrt{d_k}$ をvarianceから導く

query/key componentsがzero mean variance1程度で独立ならdot product $q^Tk=\sum_{j=1}^{d_k}q_jk_j$ のvarianceはおよそd_k。dimensionが増えるとlogit magnitudeが $\sqrt{d_k}$ scaleで大きくなりsoftmaxがsaturateしgradientが小さくなる。そこで
$$
\operatorname{softmax}(QK^T/\sqrt{d_k})V
$$
とscaleしlogit varianceをO(1)に保つ。

softmax rowは各queryがkeysへ割り当てるweights、Vとのweighted sumがoutput。self-attentionはQ,K,Vが同じsequence由来だがlinear projectionsは別。maskは許されないkeyのlogitを-∞相当にしてweight0にする。


### small numeric attentionを計算する

1 query qと2 keys k1,k2でscaled logitsが(0, ln3)ならsoftmax weightsは(1/4,3/4)。values v1,v2に対しoutputは $0.25v_1+0.75v_2$。attentionは「一つを選ぶ」のでなく通常soft weighted average。

queryが変われば同じkeysでもweightsが変わる。multi-headはprojection matricesを変えて複数のsimilarity geometryを同時に持つ。attention weights自体をcausal importanceと断定しない。

## 途中を飛ばさず全体をつなぐ

### attention機構の導出を一本につなげる

scaled dot-product attentionはquery-key similarityからrow-wise probability weightsを作り、valuesのweighted averageを出す。

#### 1. score matrix shape

まず出発点を固定する。 $QK^T$ はn_q×n_k。entry q_i^Tk_jがquery iとkey jのcompatibility。 次に必要になるのは「なぜ1/√d_k」である。

#### 2. なぜ1/√d_k

ここまでで得た結果を次の段階へ渡す。 independent unit-variance componentsならdot product variance≈d_k。√d_kで割りlogit scaleをO(1)にしsoftmax saturationを抑える。 次に必要になるのは「weighted sum」である。

#### 3. weighted sum

最後に、前二段階の結果をまとめて結論へ進む。 Aの各rowはsoftmaxでsum1。$AV$ は各queryごとにvaluesのconvex weighted combination、shape n_q×d_v。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{Attention}(\mathbf{Q},\mathbf{K},\mathbf{V})=\operatorname{softmax}(\mathbf{Q}\mathbf{K}^{\mathsf T}/\sqrt{d_k})\mathbf{V}
$$


### 具体例と一般式を往復する

本文の第一例は次の設定である。

1 query, 2 keys score(2,0)ならweights≈(0.881,0.119)、outputはvalue1寄り。


causal maskはfuture scoreへ-∞を加えsoftmax weight0にする。padding maskとは目的が違う。


### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

attention weightが高いことをそのままcausal importance/faithful explanationとみなせない。


## 例題1：小さな数値で最後まで計算する

1 query, 2 keys score(2,0)ならweights≈(0.881,0.119)、outputはvalue1寄り。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

causal maskはfuture scoreへ-∞を加えsoftmax weight0にする。padding maskとは目的が違う。

## 成立条件と、条件を外したときに何が壊れるか

- softmax前のscaleが重要。
- padding/causal maskの意味を区別する。
- attention機構の定義と計算手順を区別し、数値例だけで一般性を判断しない。

attention weightが高いことをそのままcausal importance/faithful explanationとみなせない。

## よくある誤解を分解する

- attention機構の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

attention機構では、式へ数値を代入するだけでは不十分である。attention weightが高いことをそのままcausal importance/faithful explanationとみなせない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

stable fused attention、mask broadcasting、head/batch dimensions。quadratic sequence memoryをmonitor。

## ここから一段だけ発展する

self-attentionをmulti-head、position information、FFN、residual/normalizationと組み合わせTransformerを作る。


## このTopicを理解できたか確認する問い

- 「score matrix shape」を式を見ずに説明できるか
- 「weighted sum」までの論理を一段ずつ再現できるか
- attention機構の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-attention-mechanism)　|　[スライドへ](/slides/dl-attention-mechanism/)
