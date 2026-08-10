# graph neural network：教科書

Course 09｜深層学習｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-embeddings-representation-learning` で得た概念を使い、ここでは graph neural network へ進む。

前提として使うのは `mat-graph-spectral-methods`、`dm-graphs-representations-degrees` です。

## まず直感を作る

GNNは各nodeが近傍nodeの表現を集約して更新し、graph構造を表現へ取り込む。



## 図の解説

<img src="/visuals/course-09/dl-graph-neural-networks.png" alt="graph neural networkの図解" style="max-height: 440px; display:block; margin:0 auto;" />

graph上で1-hop,2-hopと情報が広がる様子を見る。 各nodeが隣接nodeからmessageを受け取り、集約して自分の表現を更新する。graphの頂点順を変えても同じ結果になる集約が必要である。

## 記号・型・次元

- $h_v^{(l)}$：node v representation
- $\mathcal N(v)$：neighbors
- $AGG$：permutation-invariant aggregation


## 正式な定義・代表式

message-passing GNNはneighbor representationsをaggregateしself representationとcombine。node orderingに依らないようsum/mean/max等を使う。

代表式は

$$
\mathbf{h}_v^{(l+1)}=\phi(\mathbf{W}\operatorname{AGG}\{\mathbf{h}_u^{(l)}:u\in\mathcal{N}(v)\})
$$

です。

## なぜこの式・結論になるのか

### 1. set input

neighborsは順序のない集合なのでaggregationはpermutation invariantであるべき。

### 2. message+update

$m_v=AGG\{h_u:u\in N(v)\}$、$h_v^{l+1}=\phi(W[h_v,m_v])$ 等。

### 3. receptive field

L layersでinformationは最大L-hopまで伝わる。

## 教科書が省略しやすい一段を補う


### message passingはpermutation symmetryを満たす必要がある

node vのupdateを $h_v^{(l+1)}=\phi(h_v^{(l)},\operatorname{AGG}\{\psi(h_v,h_u,e_{uv}):u\in N(v)\})$ と書く。neighbor集合には順序がないのでAGGはsum/mean/max等permutation-invariantでなければgraph labelingの並べ替えで結果が変わってしまう。

layersを重ねるとL-hop neighborhood情報を集める。深すぎるとrepresentationsが似るover-smoothing、long-range information bottleneckが起こる。graph structure自体のbiasを利用するmodelで、iid tabular networkとは前提が違う。



## 途中を飛ばさず全体をつなぐ

### graph neural networkの導出を一本につなげる

message-passing GNNはneighbor representationsをaggregateしself representationとcombine。node orderingに依らないようsum/mean/max等を使う。

#### 1. set input

まず出発点を固定する。 neighborsは順序のない集合なのでaggregationはpermutation invariantであるべき。 次に必要になるのは「message+update」である。

#### 2. message+update

ここまでで得た結果を次の段階へ渡す。 $m_v=AGG\{h_u:u\in N(v)\}$、$h_v^{l+1}=\phi(W[h_v,m_v])$ 等。 次に必要になるのは「receptive field」である。

#### 3. receptive field

最後に、前二段階の結果をまとめて結論へ進む。 L layersでinformationは最大L-hopまで伝わる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{h}_v^{(l+1)}=\phi(\mathbf{W}\operatorname{AGG}\{\mathbf{h}_u^{(l)}:u\in\mathcal{N}(v)\})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

mean aggregationでnode featureをneighbors平均とcombine。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

graph convolution matrix formではnormalized adjacency multiplication。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

deep message passingでoversmoothingしnodesが似すぎる。heterophily graphでneighbor averaging不適切。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

mean aggregationでnode featureをneighbors平均とcombine。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

graph convolution matrix formではnormalized adjacency multiplication。

## 成立条件と、条件を外したときに何が壊れるか

- 層を深くするとover-smoothingが起こりうる。
- 有向/無向でmessage設計が変わる。
- graph neural networkの定義と計算手順を区別し、数値例だけで一般性を判断しない。

deep message passingでoversmoothingしnodesが似すぎる。heterophily graphでneighbor averaging不適切。

## よくある誤解を分解する

- graph neural networkの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

graph neural networkでは、式へ数値を代入するだけでは不十分である。deep message passingでoversmoothingしnodesが似すぎる。heterophily graphでneighbor averaging不適切。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

sparse adjacency, batching disjoint graphs, self-loop/normalization convention。

## ここから一段だけ発展する

異なるmodalitiesをcommon representationへalignするmultimodal learningへ。


## このTopicを理解できたか確認する問い

- 「set input」を式を見ずに説明できるか
- 「receptive field」までの論理を一段ずつ再現できるか
- graph neural networkの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-graph-neural-networks)　|　[スライドへ](/slides/dl-graph-neural-networks/)
