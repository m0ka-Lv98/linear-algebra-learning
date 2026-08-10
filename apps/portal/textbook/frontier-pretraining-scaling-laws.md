# pretrainingとscaling law：教科書

Course 10｜Frontier｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-tokenization-embeddings-context` で得た概念を使い、ここでは pretrainingとscaling law へ進む。

前提として使うのは `frontier-foundation-model-paradigm`、`dl-scaling-distributed-training` です。

## まず直感を作る

scaling lawはmodel/data/computeを増やしたときのloss改善を経験的なべき則で要約する。



## 図の解説

<img src="/visuals/course-10/frontier-pretraining-scaling-laws.png" alt="pretrainingとscaling lawの図解" style="max-height: 440px; display:block; margin:0 auto;" />

log-log軸で規模とlossの関係を描く。 横軸をmodel/data/compute規模、縦軸をlossとしてlog-logで描くと、経験的power lawはおおむね直線になる。資源配分の議論はこの傾きと飽和を読む。

## 記号・型・次元

- $N$：model parameters規模
- $D$：training tokens/data規模
- $C$：compute
- $\mathcal L$：validation/pretraining loss
- $\alpha,\beta$：empirical exponents


## 正式な定義・代表式

scaling lawsは特定範囲・model family・data regimeでlossがsize/data/computeに対しpower-law的に改善するempirical relation。物理法則ではなく測定model。compute-optimal scalingはfixed computeでN,Dの配分を考える。

代表式は

$$
\mathcal{L}(N,D,C)\approx A N^{-\alpha}+B D^{-\beta}+E
$$

です。

## なぜこの式・結論になるのか

### 1. log-log linearization

$L(N)\approx A N^{-\alpha}+E$ ならirreducible Eを除いた部分のlogは $\log A-\alpha\log N$。実験点からslopeをfit。

### 2. multiple bottlenecks

Nだけ増やしてD不足ならdata-limited、Dだけ増やしてN不足ならmodel-limited。general formは各resource contributionを含む。

### 3. compute constraint

training computeがおよそN×Dに比例する近似下でC fixedの制約を置き、lossを最小にするN,D balanceを求める。

## 教科書が省略しやすい一段を補う


### scaling lawは経験的power lawであって無条件の未来予測ではない

一定regimeでlossがmodel size N, data D, compute Cに対し power-law-likeに減るというempirical relationをlog-logでfitする。直線の傾きがmarginal returnを表し、compute budget固定ならmodel/data配分のtrade-offを議論できる。compute-optimal scalingは「最大modelを作る」ことと同じではない。

fit range, architecture, data quality, optimizer, metricが変わればlawも変わりうる。irreducible lossやdata contamination、inference costはtraining loss curveだけでは評価できない。scaling resultを使用するときはどのaxis/metric/regimeで測った経験則かを明示する。


### compute budgetを固定するとmodelだけ大きくできない

training computeは粗くparameter count N × processed tokens Dに比例するため、C固定でNを増やせばDを減らす必要がある。lossがN不足とD不足の双方から成るなら、一方だけ最大化するより両者をbalanceするoptimumがある。compute-optimal scalingがmodel/data pairを議論する理由。

実際のhardware utilizationやarchitectureでFLOPs relationは変わるため、theoretical computeとwall-clock/energyを分けてreportする。

## 途中を飛ばさず全体をつなぐ

### pretrainingとscaling lawの導出を一本につなげる

scaling lawsは特定範囲・model family・data regimeでlossがsize/data/computeに対しpower-law的に改善するempirical relation。物理法則ではなく測定model。compute-optimal scalingはfixed computeでN,Dの配分を考える。

#### 1. log-log linearization

まず出発点を固定する。 $L(N)\approx A N^{-\alpha}+E$ ならirreducible Eを除いた部分のlogは $\log A-\alpha\log N$。実験点からslopeをfit。 次に必要になるのは「multiple bottlenecks」である。

#### 2. multiple bottlenecks

ここまでで得た結果を次の段階へ渡す。 Nだけ増やしてD不足ならdata-limited、Dだけ増やしてN不足ならmodel-limited。general formは各resource contributionを含む。 次に必要になるのは「compute constraint」である。

#### 3. compute constraint

最後に、前二段階の結果をまとめて結論へ進む。 training computeがおよそN×Dに比例する近似下でC fixedの制約を置き、lossを最小にするN,D balanceを求める。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{L}(N,D,C)\approx A N^{-\alpha}+B D^{-\beta}+E
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

modelを2倍してloss改善がpredictableでも、dataset quality/domainが変われば同じfitを外挿できない。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Chinchilla型分析はparameterだけ大きくするよりdataも増やすcompute allocationを示す。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

benchmark scoreやemergent capabilityがpretraining lossの単純power lawに必ず従うわけではない。fit range外の巨大外挿はuncertain。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

modelを2倍してloss改善がpredictableでも、dataset quality/domainが変われば同じfitを外挿できない。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Chinchilla型分析はparameterだけ大きくするよりdataも増やすcompute allocationを示す。

## 成立条件と、条件を外したときに何が壊れるか

- 外挿は分布やtraining recipeが変わると外れる。
- compute-optimal balanceを考える。
- pretrainingとscaling lawの定義と計算手順を区別し、数値例だけで一般性を判断しない。

benchmark scoreやemergent capabilityがpretraining lossの単純power lawに必ず従うわけではない。fit range外の巨大外挿はuncertain。

## よくある誤解を分解する

- pretrainingとscaling lawの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

pretrainingとscaling lawでは、式へ数値を代入するだけでは不十分である。benchmark scoreやemergent capabilityがpretraining lossの単純power lawに必ず従うわけではない。fit range外の巨大外挿はuncertain。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

experiment FLOPs算定、token count、data mixture、optimizer/architectureを揃えないとscale studyを混同。confidence interval付きfit。

## ここから一段だけ発展する

pretrained modelをparameter updateせずexamples/instructionsだけでtaskへadaptするin-context learningへ。


## このTopicを理解できたか確認する問い

- 「log-log linearization」を式を見ずに説明できるか
- 「compute constraint」までの論理を一段ずつ再現できるか
- pretrainingとscaling lawの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-pretraining-scaling-laws)　|　[スライドへ](/slides/frontier-pretraining-scaling-laws/)
