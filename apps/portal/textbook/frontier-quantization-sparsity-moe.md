# quantization・sparsity・Mixture of Experts：教科書

Course 10｜Frontier｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-uncertainty-calibration-abstention` で得た概念を使い、ここでは quantization・sparsity・Mixture of Experts へ進む。

前提として使うのは `dl-efficient-training-inference`、`num-sparse-matrices-preconditioning` です。

## まず直感を作る

効率化は精度を保ちながらparameter数、bit幅、active expert、計算量を減らす。



## 図の解説

<img src="/visuals/course-10/frontier-quantization-sparsity-moe.png" alt="quantization・sparsity・Mixture of Expertsの図解" style="max-height: 440px; display:block; margin:0 auto;" />

dense modelとlow-rank/quantized/MoEの計算ブロックを比較する。 大きな重み行列全体を更新せず、低rank補正など少数parameterだけを学習する経路を描く。計算・memory削減と表現力の交換がある。

## 記号・型・次元

- $b$：quantization bit width
- $W_q$：quantized weights
- $g_e(x)$：expert routing weights
- $TopK$：selected experts


## 正式な定義・代表式

quantizationはnumeric precision、sparsityはzero structure、MoEはinput-dependent sparse expert activationでeffective compute/memoryを制御。

代表式は

$$
\mathbf{y}=\sum_{e\in\operatorname{TopK}(g(\mathbf{x}))}g_e(\mathbf{x})f_e(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. quantization

continuous weight rangeをfinite levelsへmap。scale/zero-point等でdequantize approximationしmemory bandwidth削減。

### 2. sparsity

zero weights/activationsをskipできればcompute削減。ただしhardware kernelがstructureを利用できる必要。

### 3. MoE

router g(x)がtop-k expertsだけ実行し、parameter capacityを増やしつつper-token active computeを制限。load balancingが必要。

## 教科書が省略しやすい一段を補う


### efficiencyは三つの異なる構造を利用する

quantizationはweight/activation数値precisionを減らしmemory bandwidthとmatmul costを下げる。sparsityはzero/removed weightsを増やし、hardware/softwareがskipできればspeedup。MoEは多くのexpertsを持ちながらrouterがtokenごと一部だけactivateし、total parametersとactive computeを分離する。

いずれもtheoretical FLOPs削減がwall-clock speedupに直結するとは限らない。quantization error, sparse kernel overhead, MoE communication/load imbalanceを実hardwareで測る。quality degradationはaverage scoreだけでrare/subgroup failuresも確認する。



## 途中を飛ばさず全体をつなぐ

### quantization・sparsity・Mixture of Expertsの導出を一本につなげる

quantizationはnumeric precision、sparsityはzero structure、MoEはinput-dependent sparse expert activationでeffective compute/memoryを制御。

#### 1. quantization

まず出発点を固定する。 continuous weight rangeをfinite levelsへmap。scale/zero-point等でdequantize approximationしmemory bandwidth削減。 次に必要になるのは「sparsity」である。

#### 2. sparsity

ここまでで得た結果を次の段階へ渡す。 zero weights/activationsをskipできればcompute削減。ただしhardware kernelがstructureを利用できる必要。 次に必要になるのは「MoE」である。

#### 3. MoE

最後に、前二段階の結果をまとめて結論へ進む。 router g(x)がtop-k expertsだけ実行し、parameter capacityを増やしつつper-token active computeを制限。load balancingが必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{y}=\sum_{e\in\operatorname{TopK}(g(\mathbf{x}))}g_e(\mathbf{x})f_e(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

FP16→INT8でweight storage概ねhalfだがscales/metadata/kernel overheadありexact latencyはhardware依存。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

MoE 64 experts中2 activeならtotal parameterは巨大でもtokenあたりexpert computeは2個分。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

parameter countとFLOPsだけでlatencyを予測できない。memory movement/communication/router imbalance。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

FP16→INT8でweight storage概ねhalfだがscales/metadata/kernel overheadありexact latencyはhardware依存。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

MoE 64 experts中2 activeならtotal parameterは巨大でもtokenあたりexpert computeは2個分。

## 成立条件と、条件を外したときに何が壊れるか

- 圧縮率だけでなくlatencyとmemoryを実測する。
- hardware依存の速度差を考える。
- quantization・sparsity・Mixture of Expertsの定義と計算手順を区別し、数値例だけで一般性を判断しない。

parameter countとFLOPsだけでlatencyを予測できない。memory movement/communication/router imbalance。

## よくある誤解を分解する

- quantization・sparsity・Mixture of Expertsの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

quantization・sparsity・Mixture of Expertsでは、式へ数値を代入するだけでは不十分である。parameter countとFLOPsだけでlatencyを予測できない。memory movement/communication/router imbalance。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

quality vs p50/p99 latency, throughput, peak memory, energy、hardware-specific kernelsでbenchmark。

## ここから一段だけ発展する

sequence length自体がattention costを増やすためlong context/memory architectureへ。


## このTopicを理解できたか確認する問い

- 「quantization」を式を見ずに説明できるか
- 「MoE」までの論理を一段ずつ再現できるか
- quantization・sparsity・Mixture of Expertsの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-quantization-sparsity-moe)　|　[スライドへ](/slides/frontier-quantization-sparsity-moe/)
