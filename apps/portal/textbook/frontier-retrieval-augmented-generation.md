# Retrieval-Augmented Generation：教科書

Course 10｜Frontier｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-parameter-efficient-finetuning` で得た概念を使い、ここでは Retrieval-Augmented Generation へ進む。

前提として使うのは `frontier-foundation-model-paradigm`、`ml-knn-distance-methods` です。

## まず直感を作る

RAGはqueryで外部文書を検索し、取得文書をcontextへ入れて生成することで知識を補う。



## 図の解説

<img src="/visuals/course-10/frontier-retrieval-augmented-generation.png" alt="Retrieval-Augmented Generationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

query→embedding→retrieval→context→generationを段階表示する。 queryからretrieverが外部文書を選び、その文書をcontextとしてgeneratorへ渡す。最終出力はparameter内部知識だけでなく検索結果に条件づけられる。

## 記号・型・次元

- $x$：query
- $d$：retrieved document/chunk
- $\mathcal D_k$：top-k retrieved set
- $p(d|x)$：retriever weight
- $p(y|x,d)$：generator


## 正式な定義・代表式

RAGはretrievalとgenerationをcomposeし、外部corpusをquery時knowledge sourceとして使う。概念式はlatent document dを周辺化してoutput probabilityを作る。

代表式は

$$
p(y\mid x)=\sum_{d\in\mathcal{D}_k}p(y\mid x,d)p(d\mid x)
$$

です。

## なぜこの式・結論になるのか

### 1. documentをlatent evidenceとみなす

dが未確定ならtotal probabilityにより $p(y|x)=\sum_d p(y,d|x)=\sum_dp(y|x,d)p(d|x)$。

### 2. top-k approximation

全corpus sumは不可能なのでretrieverが高score dだけ $\mathcal D_k$ へ絞る。ここでretrieval recall lossが入る。

### 3. context generation

実systemではselected chunksをprompt/contextへ配置しgeneratorがcondition。retrieval failureとgeneration misuseを分離して評価する。

## 教科書が省略しやすい一段を補う


### RAGはretrievalとgenerationの二つの誤差源を持つ

query qからdocuments zをretrieveし、generatorが $p(y\mid q,z)$ を出す。概念的には
$$
p(y\mid q)=\sum_z p(z\mid q)p(y\mid q,z)
$$
のようにretrieval uncertaintyとconditional generationを分けて考えられる。実装ではtop-k documentsへ近似してcontextへ連結することが多い。

answer failureがretriever missなのか、relevant documentはあったがgeneratorが使えなかったのかを分離評価する。chunking, embedding, index, reranking, context ordering, citation groundingがそれぞれsystem parameter。外部knowledgeを入れれば自動的にtruthfulになるわけではない。


### retrieval recallとanswer faithfulnessを別テストにする

gold evidence documentがあるdatasetなら、まずretriever top-kにgoldが入るrecall@kを測る。次にgold evidenceを強制的にcontextへ与えてgeneratorが正答できるoracle-retrieval testを行う。前者が低ければretrieval、後者が低ければgeneration/use-of-contextが主因。

end-to-end answer scoreだけでは二つを分離できない。citationは文書を付けただけでなくclaimが引用範囲にentailされるかを検証する。

## 途中を飛ばさず全体をつなぐ

### Retrieval-Augmented Generationの導出を一本につなげる

RAGはretrievalとgenerationをcomposeし、外部corpusをquery時knowledge sourceとして使う。概念式はlatent document dを周辺化してoutput probabilityを作る。

#### 1. documentをlatent evidenceとみなす

まず出発点を固定する。 dが未確定ならtotal probabilityにより $p(y|x)=\sum_d p(y,d|x)=\sum_dp(y|x,d)p(d|x)$。 次に必要になるのは「top-k approximation」である。

#### 2. top-k approximation

ここまでで得た結果を次の段階へ渡す。 全corpus sumは不可能なのでretrieverが高score dだけ $\mathcal D_k$ へ絞る。ここでretrieval recall lossが入る。 次に必要になるのは「context generation」である。

#### 3. context generation

最後に、前二段階の結果をまとめて結論へ進む。 実systemではselected chunksをprompt/contextへ配置しgeneratorがcondition。retrieval failureとgeneration misuseを分離して評価する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(y\mid x)=\sum_{d\in\mathcal{D}_k}p(y\mid x,d)p(d\mid x)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

質問に対しcorrect manual sectionがtop-3に入ればgeneratorは引用付き回答可能。top-k全てirrelevantならgeneratorだけで事実を回復する保証なし。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

kを増やすとrecallは上がるがcontext dilution/token cost/conflicting docsも増える。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

質問に対しcorrect manual sectionがtop-3に入ればgeneratorは引用付き回答可能。top-k全てirrelevantならgeneratorだけで事実を回復する保証なし。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

kを増やすとrecallは上がるがcontext dilution/token cost/conflicting docsも増える。

## 成立条件と、条件を外したときに何が壊れるか

- retrieval失敗とgeneration失敗を分離評価する。
- 引用元がcontextに本当に存在するか確認する。
- Retrieval-Augmented Generationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。

## よくある誤解を分解する

- Retrieval-Augmented Generationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Retrieval-Augmented Generationでは、式へ数値を代入するだけでは不十分である。RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

retrieval hit@k, MRR, answer correctness, citation supportを別metric。chunking/index version/corpus snapshotを記録。

## ここから一段だけ発展する

retrieverの基盤となるdense vector similarityとapproximate nearest-neighbor indexを次に分解する。


## このTopicを理解できたか確認する問い

- 「documentをlatent evidenceとみなす」を式を見ずに説明できるか
- 「context generation」までの論理を一段ずつ再現できるか
- Retrieval-Augmented Generationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-retrieval-augmented-generation)　|　[スライドへ](/slides/frontier-retrieval-augmented-generation/)
