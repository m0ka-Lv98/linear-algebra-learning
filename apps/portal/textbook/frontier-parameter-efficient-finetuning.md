# parameter-efficient fine-tuning：教科書

Course 10｜Frontier｜Topic 05/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-in-context-learning-prompting` で得た概念を使い、ここでは parameter-efficient fine-tuning へ進む。

前提として使うのは `dl-efficient-training-inference`、`opt-proximal-gradient` です。

## まず直感を作る

parameter-efficient fine-tuningは基礎weightを固定し、小さい追加parameterだけ学習してtaskへ適応する。



## 図の解説

<img src="/visuals/course-10/frontier-parameter-efficient-finetuning.png" alt="parameter-efficient fine-tuningの図解" style="max-height: 440px; display:block; margin:0 auto;" />

大きなWに低rank BAを加えるブロック図を見る。 固定した大きな重みWに低rank補正BAを足す。rank rを小さくすると学習parameterは大幅に減るが、更新方向はその低次元部分空間に制限される。

## 記号・型・次元

- $W\in\mathbb R^{d_o\times d_i}$：frozen base weight
- $A\in\mathbb R^{r\times d_i}$
- $B\in\mathbb R^{d_o\times r}$
- $\Delta W=(\alpha/r)BA$
- $r\ll\min(d_i,d_o)$


## 正式な定義・代表式

LoRAはfull weight updateをlow-rank factor BAでparameterizeしbase Wをfreeze。trainable parameter/memoryを減らしtask adaptationを行う。

代表式は

$$
\mathbf{W}^{\prime}=\mathbf{W}+\frac{\alpha}{r}\mathbf{B}\mathbf{A}
$$

です。

## なぜこの式・結論になるのか

### 1. low-rank hypothesis

adaptationに必要なweight changeがfull rankを必要としないと仮定し、ΔW=BA。rank(BA)≤r。

### 2. parameter count

full d_od_iに対しLoRAはr(d_i+d_o)。rが小さいほど大幅削減。

### 3. scaled update

$W^{\prime}x=Wx+(\alpha/r)B(Ax)$。Aでlow-dimensional directionへprojectしBでoutput spaceへ戻す。

## 教科書が省略しやすい一段を補う


### LoRAで更新をlow-rankに制限すると何が減るか

pretrained weight $W\in\mathbb R^{d_{out}\times d_{in}}$ をfreezeし、updateを $\Delta W=BA$、$B\in\mathbb R^{d_{out}\times r}$、$A\in\mathbb R^{r\times d_{in}}$ with r≪min dims とする。trainable parametersは $d_{out}d_{in}$ から $r(d_{out}+d_{in})$ へ減る。

forwardは $(W+BA)x$。merge可能ならinference時にWへ加算できる。low-rank assumptionはupdate directionsを制限するので、r, target modules, scalingがcapacityを決める。parameter countが減ってもactivation memoryやoptimizer state、data qualityの問題が全て消えるわけではない。


### low-rank updateのrank上限を確認する

$\Delta W=BA$ のrankは $\operatorname{rank}(\Delta W)\le r$。したがってfull fine-tuningで可能な任意matrix updateを表せるわけではない。rを増やせばexpressivityとtrainable memoryが増える。

複数adaptersをmergeする場合、sum of low-rank updatesのrankは増えうる。adapter switching/combinationはbase Wを共有しtask-specific stateを分離できるが、optimizer stateやdata pipelineもversion管理する。

## 途中を飛ばさず全体をつなぐ

### parameter-efficient fine-tuningの導出を一本につなげる

LoRAはfull weight updateをlow-rank factor BAでparameterizeしbase Wをfreeze。trainable parameter/memoryを減らしtask adaptationを行う。

#### 1. low-rank hypothesis

まず出発点を固定する。 adaptationに必要なweight changeがfull rankを必要としないと仮定し、ΔW=BA。rank(BA)≤r。 次に必要になるのは「parameter count」である。

#### 2. parameter count

ここまでで得た結果を次の段階へ渡す。 full d_od_iに対しLoRAはr(d_i+d_o)。rが小さいほど大幅削減。 次に必要になるのは「scaled update」である。

#### 3. scaled update

最後に、前二段階の結果をまとめて結論へ進む。 $W^{\prime}x=Wx+(\alpha/r)B(Ax)$。Aでlow-dimensional directionへprojectしBでoutput spaceへ戻す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{W}^{\prime}=\mathbf{W}+\frac{\alpha}{r}\mathbf{B}\mathbf{A}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

4096×4096 layerのfull update約16.8M paramsに対しr=8なら65,536 trainable params（bias等除く）。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

multiple adaptersをsame baseへtaskごと保存できる。merge可能な構成ではinference weightへ加算。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

low-rank adapterが全taskでfull fine-tuningと同品質になる保証はない。rank/location/data量でcapacity不足。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

4096×4096 layerのfull update約16.8M paramsに対しr=8なら65,536 trainable params（bias等除く）。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

multiple adaptersをsame baseへtaskごと保存できる。merge可能な構成ではinference weightへ加算。

## 成立条件と、条件を外したときに何が壊れるか

- rankが小さすぎると表現力不足。
- base model versionとadapterの対応を管理する。
- parameter-efficient fine-tuningの定義と計算手順を区別し、数値例だけで一般性を判断しない。

low-rank adapterが全taskでfull fine-tuningと同品質になる保証はない。rank/location/data量でcapacity不足。

## よくある誤解を分解する

- parameter-efficient fine-tuningの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

parameter-efficient fine-tuningでは、式へ数値を代入するだけでは不十分である。low-rank adapterが全taskでfull fine-tuningと同品質になる保証はない。rank/location/data量でcapacity不足。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

target modules、rank、alpha、dropout、base quantization、adapter mergeを記録。trainable param countをverify。

## ここから一段だけ発展する

weightsへ知識を入れず、query時に外部文書を検索してcontextへ供給するRAGへ。


## このTopicを理解できたか確認する問い

- 「low-rank hypothesis」を式を見ずに説明できるか
- 「scaled update」までの論理を一段ずつ再現できるか
- parameter-efficient fine-tuningの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-parameter-efficient-finetuning)　|　[スライドへ](/slides/frontier-parameter-efficient-finetuning/)
