# scalingと分散学習：教科書

Course 09｜深層学習｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-multimodal-models` で得た概念を使い、ここでは scalingと分散学習 へ進む。

前提として使うのは `num-verification-benchmarking-reproducibility`、`opt-stochastic-gradient` です。

## まず直感を作る

分散学習は複数deviceでgradientやparameterを分担し、通信と計算を同期させる。



## 図の解説

<img src="/visuals/course-09/dl-scaling-distributed-training.png" alt="scalingと分散学習の図解" style="max-height: 440px; display:block; margin:0 auto;" />

複数workerのgradientがall-reduceで平均される流れを描く。 同じmodelのgradientを複数workerで計算して集約するdata parallelと、model自体を分割するmodel parallelの通信位置が異なる。

## 記号・型・次元

- $P$：workers
- $g_p$：worker gradient
- $g=P^{-1}\sum g_p$
- data/model/tensor parallelism


## 正式な定義・代表式

data parallelはmini-batchをworkersへ分けgradient averageしsingle larger batch gradientと一致（loss averaging convention下）。model parallelはparameter/activationsを分割。

代表式は

$$
\mathbf{g}=\frac{1}{P}\sum_{p=1}^{P}\mathbf{g}_p
$$

です。

## なぜこの式・結論になるのか

### 1. local gradient sum

global batch loss meanはall samples gradient average。worker equal batchならlocal meansをaverage。

### 2. all-reduce

communicationでsum/averageし全replica同じupdate。

### 3. scaling bottleneck

computeはP倍近く増えてもcommunication/synchronization/imbalanceでlinear speedupしない。

## 教科書が省略しやすい一段を補う


### data parallelではgradient aggregationが数学的同値性を作る

batchをworkersへ分け、各workerがlocal gradient sumを計算しall-reduceで平均すれば、同じglobal batchをsingle deviceで計算したgradientと（floating-order差を除き）一致する。communication volumeとcompute overlapがthroughputを決める。

model/tensor/pipeline parallelはparameters/activationsを分割し、通信位置が異なる。global batch sizeが大きくなるとoptimization dynamicsも変わるのでlearning rate/warmupを調整する。speedupはdevice数に線形とは限らず、communication・imbalance・memory bottleneckを測る。



## 途中を飛ばさず全体をつなぐ

### scalingと分散学習の導出を一本につなげる

data parallelはmini-batchをworkersへ分けgradient averageしsingle larger batch gradientと一致（loss averaging convention下）。model parallelはparameter/activationsを分割。

#### 1. local gradient sum

まず出発点を固定する。 global batch loss meanはall samples gradient average。worker equal batchならlocal meansをaverage。 次に必要になるのは「all-reduce」である。

#### 2. all-reduce

ここまでで得た結果を次の段階へ渡す。 communicationでsum/averageし全replica同じupdate。 次に必要になるのは「scaling bottleneck」である。

#### 3. scaling bottleneck

最後に、前二段階の結果をまとめて結論へ進む。 computeはP倍近く増えてもcommunication/synchronization/imbalanceでlinear speedupしない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{g}=\frac{1}{P}\sum_{p=1}^{P}\mathbf{g}_p
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

8 GPUs each batch32→global batch256。learning-rate retuningが必要な場合。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

large modelが1 GPU memoryに収まらなければtensor/pipeline sharding。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

gradient averageをsumのまま使うとeffective learning rateがP倍になるframework conventionがある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

8 GPUs each batch32→global batch256。learning-rate retuningが必要な場合。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

large modelが1 GPU memoryに収まらなければtensor/pipeline sharding。

## 成立条件と、条件を外したときに何が壊れるか

- 通信帯域がbottleneckになる。
- global batch sizeとlearning rateの関係を確認する。
- scalingと分散学習の定義と計算手順を区別し、数値例だけで一般性を判断しない。

gradient averageをsumのまま使うとeffective learning rateがP倍になるframework conventionがある。

## よくある誤解を分解する

- scalingと分散学習の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

scalingと分散学習では、式へ数値を代入するだけでは不十分である。gradient averageをsumのまま使うとeffective learning rateがP倍になるframework conventionがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

DDP synchronization, mixed precision, checkpoint sharding, determinism。

## ここから一段だけ発展する

training/inference costを下げるlow-rank adapters, quantization, pruning等へ。


## このTopicを理解できたか確認する問い

- 「local gradient sum」を式を見ずに説明できるか
- 「scaling bottleneck」までの論理を一段ずつ再現できるか
- scalingと分散学習の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-scaling-distributed-training)　|　[スライドへ](/slides/dl-scaling-distributed-training/)
