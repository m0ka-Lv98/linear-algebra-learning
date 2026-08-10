# long contextとmemory：教科書

Course 10｜Frontier｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-quantization-sparsity-moe` で得た概念を使い、ここでは long contextとmemory へ進む。

前提として使うのは `frontier-agents-planning-memory`、`dl-attention-mechanism` です。

## まず直感を作る

long contextではtoken数Tに対するattention計算量とmemoryが支配的になり、検索・圧縮・sparse化との設計trade-offが生じる。



## 図の解説

<img src="/visuals/course-10/frontier-long-context-memory.png" alt="long contextとmemoryの図解" style="max-height: 440px; display:block; margin:0 auto;" />

context長に対するO(T²)曲線とlinear近似を比較する。 context長が伸びるとattentionの組合せが増え、計算・memoryも増える。外部memoryやretrievalは全情報を常時attentionへ載せない別解になる。

## 記号・型・次元

- $T$：context length
- $d$：hidden/head dimension
- $O(T^2d)$：dense attention score cost概形
- $M$：external memory


## 正式な定義・代表式

long-context problemはtoken数を増やすだけでなくcompute/memory、position generalization、information retrieval/usageを含む。external memoryはcontext window外stateをretrieveして補う。

代表式は

$$
\operatorname{cost}_{attention}=O(T^2d)
$$

です。

## なぜこの式・結論になるのか

### 1. quadratic score matrix

QK^TはT×T pair scoresを作るためdense attention time/memoryがT²に増加（implementation variantあり）。

### 2. long context≠effective use

modelが位置遠方情報をretrieve/composeできるかはcapacity/evaluation別問題。needle testだけで全reasoningを保証しない。

### 3. memory hierarchy

recent working context、compressed summary、retrieval storeを階層化し必要情報だけcontextへ戻す。

## 教科書が省略しやすい一段を補う


### context window拡大とmemory systemは同じ問題への別解

standard attentionはlength Lでpair interactions O(L²) memory/computeを持つ。windowを長くして全履歴を直接入れる方法に対し、retrieval/external memoryは必要なinformationだけを選んでcontextへ戻す。compression/summarizationはinformationを失う代わりにtoken budgetを節約する。

long-context benchmarkではneedle retrievalだけでなくmulti-hop, distractor robustness, position sensitivityを測る。window内に存在する情報をmodelが確実に使えるとは限らない。persistent memoryではprivacy, stale facts, deletion/update semanticsも必要。


### 全履歴投入とretrievalのcomputeを比較する

L tokensをfull attentionへ入れるcostはlayerあたり概ねO(L²d)。履歴が10倍ならattention pairは100倍。一方retrievalはindex searchでtop-k chunksだけをcontextへ戻すためgeneration側Lを制御できるが、retrieval missという新しいerror sourceを作る。

したがってlong windowとRAGは単純な代替関係ではなく、latency, recall, update freshness, privacyを含むsystem trade-off。

## 途中を飛ばさず全体をつなぐ

### long contextとmemoryの導出を一本につなげる

long-context problemはtoken数を増やすだけでなくcompute/memory、position generalization、information retrieval/usageを含む。external memoryはcontext window外stateをretrieveして補う。

#### 1. quadratic score matrix

まず出発点を固定する。 QK^TはT×T pair scoresを作るためdense attention time/memoryがT²に増加（implementation variantあり）。 次に必要になるのは「long context≠effective use」である。

#### 2. long context≠effective use

ここまでで得た結果を次の段階へ渡す。 modelが位置遠方情報をretrieve/composeできるかはcapacity/evaluation別問題。needle testだけで全reasoningを保証しない。 次に必要になるのは「memory hierarchy」である。

#### 3. memory hierarchy

最後に、前二段階の結果をまとめて結論へ進む。 recent working context、compressed summary、retrieval storeを階層化し必要情報だけcontextへ戻す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{cost}_{attention}=O(T^2d)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Tを2倍にするとnaive attention score entriesは4倍。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

agent memoryで全trajectoryを毎回promptせずrelevant eventsをretrieve。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

context windowが1M tokens対応でも1M全体を均等に理解/recallできるとは限らない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Tを2倍にするとnaive attention score entriesは4倍。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

agent memoryで全trajectoryを毎回promptせずrelevant eventsをretrieve。

## 成立条件と、条件を外したときに何が壊れるか

- 最大context長と有効に使えるcontextは同じでない。
- 位置依存の性能劣化を測る。
- long contextとmemoryの定義と計算手順を区別し、数値例だけで一般性を判断しない。

context windowが1M tokens対応でも1M全体を均等に理解/recallできるとは限らない。

## よくある誤解を分解する

- long contextとmemoryの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

long contextとmemoryでは、式へ数値を代入するだけでは不十分である。context windowが1M tokens対応でも1M全体を均等に理解/recallできるとは限らない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

prefill vs decode latency、KV cache memory、position tests、lost-in-middle等をmeasure。

## ここから一段だけ発展する

training context/dataを増やすだけでなくsynthetic dataとcurationでdata distributionを設計する。


## このTopicを理解できたか確認する問い

- 「quadratic score matrix」を式を見ずに説明できるか
- 「memory hierarchy」までの論理を一段ずつ再現できるか
- long contextとmemoryの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-long-context-memory)　|　[スライドへ](/slides/frontier-long-context-memory/)
