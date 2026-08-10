# vector searchとindex：教科書

Course 10｜Frontier｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-retrieval-augmented-generation` で得た概念を使い、ここでは vector searchとindex へ進む。

前提として使うのは `la-inner-products-norms-angles`、`ml-knn-distance-methods` です。

## まず直感を作る

vector searchはqueryと文書をembeddingへ写し、近傍探索で意味的に近い候補を返す。



## 図の解説

<img src="/visuals/course-10/frontier-vector-databases-search.png" alt="vector searchとindexの図解" style="max-height: 440px; display:block; margin:0 auto;" />

query点とvector database点群、top-k近傍を描く。 query embeddingとdocument embeddingの距離/類似度を計算し、近い候補を上位へ返す。indexは全件比較を近似・高速化するためのdata structureである。

## 記号・型・次元

- $q,x\in\mathbb R^d$：query/item embeddings
- $sim(q,x)$：cosine/dot/L2由来score
- $k$：neighbors
- ANN index


## 正式な定義・代表式

vector searchはembedding spaceでsimilarity最大/距離最小itemsを探索。vector databaseはindexingに加えmetadata/filter/update/persistence等system機能を持つ。

代表式は

$$
\operatorname{sim}(\mathbf{q},\mathbf{x})=\frac{\mathbf{q}^{\mathsf T}\mathbf{x}}{\|\mathbf{q}\|\|\mathbf{x}\|}
$$

です。

## なぜこの式・結論になるのか

### 1. cosine normalization

$cos(q,x)=q^Tx/(||q||||x||)$。両vector unit normalizeならcosine=dot product。

### 2. exact search cost

N vectors全てscore計算はO(Nd)。N大でlatency/memory bandwidth支配。

### 3. ANN tradeoff

HNSW/IVF/PQ等はcandidateを近似的に絞りsearch speed/memoryとrecallをtradeoff。

## 教科書が省略しやすい一段を補う


### approximate nearest-neighbor indexはexact similarityを捨てて速度を得る

embedding $q,d_i\in\mathbb R^p$ のdot/cosine/Euclidean similarityでtop-kを求めるexact searchはN documentsに対しO(Np)。ANN indexはgraph, inverted quantization, tree等のstructureで候補を絞り、recallとlatency/memoryを交換する。

cosine similarityならnormalization後dot productと同値。metric choiceとembedding training objectiveが一致しているか確認する。index recall@k、end-to-end retrieval recall、answer qualityは別指標で、ANN approximation errorだけをRAG failureの全てとみなさない。



## 途中を飛ばさず全体をつなぐ

### vector searchとindexの導出を一本につなげる

vector searchはembedding spaceでsimilarity最大/距離最小itemsを探索。vector databaseはindexingに加えmetadata/filter/update/persistence等system機能を持つ。

#### 1. cosine normalization

まず出発点を固定する。 $cos(q,x)=q^Tx/(||q||||x||)$。両vector unit normalizeならcosine=dot product。 次に必要になるのは「exact search cost」である。

#### 2. exact search cost

ここまでで得た結果を次の段階へ渡す。 N vectors全てscore計算はO(Nd)。N大でlatency/memory bandwidth支配。 次に必要になるのは「ANN tradeoff」である。

#### 3. ANN tradeoff

最後に、前二段階の結果をまとめて結論へ進む。 HNSW/IVF/PQ等はcandidateを近似的に絞りsearch speed/memoryとrecallをtradeoff。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{sim}(\mathbf{q},\mathbf{x})=\frac{\mathbf{q}^{\mathsf T}\mathbf{x}}{\|\mathbf{q}\|\|\mathbf{x}\|}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

unit normalized embeddingsなら最大inner product searchでcosine top-kを得られる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

metadata filterを先/後どちらで適用するかでrecall/latencyが変わる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

embedding similarityがsemantic truth/authorizationを保証しない。access controlはvector distanceと別layer。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

unit normalized embeddingsなら最大inner product searchでcosine top-kを得られる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

metadata filterを先/後どちらで適用するかでrecall/latencyが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- cosineとEuclideanの選択はnormalizationに依存する。
- ANNは近似なのでrecallを測る。
- vector searchとindexの定義と計算手順を区別し、数値例だけで一般性を判断しない。

embedding similarityがsemantic truth/authorizationを保証しない。access controlはvector distanceと別layer。

## よくある誤解を分解する

- vector searchとindexの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

vector searchとindexでは、式へ数値を代入するだけでは不十分である。embedding similarityがsemantic truth/authorizationを保証しない。access controlはvector distanceと別layer。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

recall@k vs exact baseline、p95 latency、index build/update cost、dimension、distance conventionをbenchmark。

## ここから一段だけ発展する

retrieved knowledgeだけでなくcalculator/API/code等へactionを出すtool useへ。


## このTopicを理解できたか確認する問い

- 「cosine normalization」を式を見ずに説明できるか
- 「ANN tradeoff」までの論理を一段ずつ再現できるか
- vector searchとindexの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-vector-databases-search)　|　[スライドへ](/slides/frontier-vector-databases-search/)
