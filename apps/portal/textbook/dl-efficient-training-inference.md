# 効率的学習と推論：教科書

Course 09｜深層学習｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-scaling-distributed-training` で得た概念を使い、ここでは 効率的学習と推論 へ進む。

前提として使うのは `num-svd-low-rank-computation`、`dl-scaling-distributed-training` です。

## まず直感を作る

効率化は精度を保ちながらparameter数、bit幅、active expert、計算量を減らす。



## 図の解説

<img src="/visuals/course-09/dl-efficient-training-inference.png" alt="効率的学習と推論の図解" style="max-height: 440px; display:block; margin:0 auto;" />

dense modelとlow-rank/quantized/MoEの計算ブロックを比較する。 大きな重み行列全体を更新せず、低rank補正など少数parameterだけを学習する経路を描く。計算・memory削減と表現力の交換がある。

## 記号・型・次元

- $W\in\mathbb R^{d_{out}\times d_{in}}$
- $\Delta W=BA$ with rank r
- $r\ll d$
- quantization bit-width


## 正式な定義・代表式

efficiency methodsはcompute/memory/communicationを減らしつつqualityを保つ。LoRAはbase W固定でlow-rank updateを学習。

代表式は

$$
\mathbf{W}^{\prime}=\mathbf{W}+\mathbf{B}\mathbf{A}
$$

です。

## なぜこの式・結論になるのか

### 1. parameter count

full update d_out d_inに対しLoRAはr(d_out+d_in)。r smallで大幅削減。

### 2. forward

$Wx+BAx$。B,Aをmerge可能な場合inference extra costを消せる。

### 3. quantization

float weightsをfinite levelsへmapしmemory/bandwidth削減するがquantization errorが入る。

## 教科書が省略しやすい一段を補う


### efficiency techniqueは「同じmodelを速くする」以外も含む

mixed precisionはlower precision matmulでthroughputを上げつつmaster weights/loss scalingでunderflowを管理。gradient checkpointingはactivationsを保存せずbackward時に再計算しmemoryとcomputeを交換する。LoRA等はtrainable parameter subspaceを低rankへ制限する。

inferenceではquantization, pruning, distillation, KV cache, batchingがlatency/throughput/memoryを別々に変える。accuracyだけでなくhardware-specific speedとenergyを実測し、numerical approximationがrare failuresへ与える影響も評価する。



## 途中を飛ばさず全体をつなぐ

### 効率的学習と推論の導出を一本につなげる

efficiency methodsはcompute/memory/communicationを減らしつつqualityを保つ。LoRAはbase W固定でlow-rank updateを学習。

#### 1. parameter count

まず出発点を固定する。 full update d_out d_inに対しLoRAはr(d_out+d_in)。r smallで大幅削減。 次に必要になるのは「forward」である。

#### 2. forward

ここまでで得た結果を次の段階へ渡す。 $Wx+BAx$。B,Aをmerge可能な場合inference extra costを消せる。 次に必要になるのは「quantization」である。

#### 3. quantization

最後に、前二段階の結果をまとめて結論へ進む。 float weightsをfinite levelsへmapしmemory/bandwidth削減するがquantization errorが入る。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{W}^{\prime}=\mathbf{W}+\mathbf{B}\mathbf{A}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

4096×4096 full matrix16.8M params、r=8 LoRAは約65k trainable params。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

KV cache量はsequence length×layers×heads等に増えlong context inference bottleneck。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

compression率だけで評価するとquality degradation/latency kernel supportを見落とす。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

4096×4096 full matrix16.8M params、r=8 LoRAは約65k trainable params。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

KV cache量はsequence length×layers×heads等に増えlong context inference bottleneck。

## 成立条件と、条件を外したときに何が壊れるか

- 圧縮率だけでなくlatencyとmemoryを実測する。
- hardware依存の速度差を考える。
- 効率的学習と推論の定義と計算手順を区別し、数値例だけで一般性を判断しない。

compression率だけで評価するとquality degradation/latency kernel supportを見落とす。

## よくある誤解を分解する

- 効率的学習と推論の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

効率的学習と推論では、式へ数値を代入するだけでは不十分である。compression率だけで評価するとquality degradation/latency kernel supportを見落とす。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

actual hardware throughput, memory peak, end-to-end latencyをbenchmark。

## ここから一段だけ発展する

最後にrobustness/safetyを「accuracy以外のfailure modes」として評価する。


## このTopicを理解できたか確認する問い

- 「parameter count」を式を見ずに説明できるか
- 「quantization」までの論理を一段ずつ再現できるか
- 効率的学習と推論の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-efficient-training-inference)　|　[スライドへ](/slides/dl-efficient-training-inference/)
