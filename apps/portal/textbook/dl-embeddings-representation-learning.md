# embeddingと表現学習：教科書

Course 09｜深層学習｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-self-supervised-contrastive` で得た概念を使い、ここでは embeddingと表現学習 へ進む。

前提として使うのは `la-low-rank-approximation`、`dl-self-supervised-contrastive` です。

## まず直感を作る

embeddingは離散IDを連続ベクトルへ写し、類似性や関係を幾何として扱えるようにする。



## 図の解説

<img src="/visuals/course-09/dl-embeddings-representation-learning.png" alt="embeddingと表現学習の図解" style="max-height: 440px; display:block; margin:0 auto;" />

token点群を2次元へ描き、近い概念が近く配置される模式図を見る。 離散IDが連続ベクトルへ写され、近いベクトル同士が似た文脈や意味を持つよう学習される。距離・内積が後続modelの計算単位になる。

## 記号・型・次元

- $E\in\mathbb R^{V\times d}$：embedding table
- $1_i$：one-hot token
- $e_i=E^T1_i$


## 正式な定義・代表式

embedding lookupはone-hot vectorへのlinear mapで、discrete IDをdense learned vectorへ写す。geometryはtraining objectiveが決める。

代表式は

$$
\mathbf{e}_i=\mathbf{E}^{\mathsf T}\mathbf{1}_i
$$

です。

## なぜこの式・結論になるのか

### 1. one-hot multiplication

$E^T1_i$ はEのi-th rowを選ぶ。lookupはmatrix multiplyのsparse special case。

### 2. similarity

dot/cosineでembedding geometryを評価するが、meaningはobjective/context依存。

### 3. shared embedding

input/output weights tying等でparameter/geometryを共有できる。

## 教科書が省略しやすい一段を補う


### embeddingはlookup tableでも学習されたmetric spaceでもある

discrete token/category ID iをembedding matrix Eのi行へ写す操作はone-hot vector e_iに対する $E^Te_i$ と同じlinear lookup。training gradientは使用されたrowsへ更新され、similar context/task signalを受けるIDsが近いvectorsになりうる。

similarityをcosine/dot product/Euclideanのどれで測るかでgeometryが変わる。normがconfidence/frequencyを担う場合cosineで消える。embedding visualizationはlow-dimensional projection distortionを含むため、近さだけでsemantic categoryを断定しない。



## 途中を飛ばさず全体をつなぐ

### embeddingと表現学習の導出を一本につなげる

embedding lookupはone-hot vectorへのlinear mapで、discrete IDをdense learned vectorへ写す。geometryはtraining objectiveが決める。

#### 1. one-hot multiplication

まず出発点を固定する。 $E^T1_i$ はEのi-th rowを選ぶ。lookupはmatrix multiplyのsparse special case。 次に必要になるのは「similarity」である。

#### 2. similarity

ここまでで得た結果を次の段階へ渡す。 dot/cosineでembedding geometryを評価するが、meaningはobjective/context依存。 次に必要になるのは「shared embedding」である。

#### 3. shared embedding

最後に、前二段階の結果をまとめて結論へ進む。 input/output weights tying等でparameter/geometryを共有できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{e}_i=\mathbf{E}^{\mathsf T}\mathbf{1}_i
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

vocab50k,d=768ならtable 38.4M parameters。one-hot 50k dimensionをexplicit生成不要。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

categorical ID embeddingも同じ数学で、ordinal relationは自動仮定しない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

cosine近い=causal/semantic equivalentを保証しない。dataset biasを反映。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

vocab50k,d=768ならtable 38.4M parameters。one-hot 50k dimensionをexplicit生成不要。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

categorical ID embeddingも同じ数学で、ordinal relationは自動仮定しない。

## 成立条件と、条件を外したときに何が壊れるか

- 距離の意味は学習目的に依存する。
- indexとembedding vectorを混同しない。
- embeddingと表現学習の定義と計算手順を区別し、数値例だけで一般性を判断しない。

cosine近い=causal/semantic equivalentを保証しない。dataset biasを反映。

## よくある誤解を分解する

- embeddingと表現学習の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

embeddingと表現学習では、式へ数値を代入するだけでは不十分である。cosine近い=causal/semantic equivalentを保証しない。dataset biasを反映。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

padding index、OOV、normalization、vocab resize。

## ここから一段だけ発展する

node IDs/featuresをgraph neighborhood aggregationで更新するGNNへ。


## このTopicを理解できたか確認する問い

- 「one-hot multiplication」を式を見ずに説明できるか
- 「shared embedding」までの論理を一段ずつ再現できるか
- embeddingと表現学習の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-embeddings-representation-learning)　|　[スライドへ](/slides/dl-embeddings-representation-learning/)
