# 深層学習の最適化と正則化：教科書

Course 09｜深層学習｜Topic 05/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-initialization-normalization` で得た概念を使い、ここでは 深層学習の最適化と正則化 へ進む。

前提として使うのは `opt-adaptive-optimizers`、`ml-bias-variance-regularization` です。

## まず直感を作る

確率的最適化は全データ勾配の代わりにノイズを含む推定勾配を使い、計算量と分散を交換する。



## 図の解説

<img src="/visuals/course-09/dl-optimization-regularization.png" alt="深層学習の最適化と正則化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

full gradientとmini-batch軌跡を比較する。 full gradientの滑らかな軌跡に対しmini-batch gradientは揺らぐが、期待的には同じ下降方向を推定する。学習率は進む速さとノイズ平均化の両方を制御する。

## 記号・型・次元

- $w_k$：parameters
- $g_k$：mini-batch gradient
- $m_k,v_k$：Adam moments
- $\lambda$：weight decay


## 正式な定義・代表式

DL optimizationはnonconvex stochastic setting。Adam/SGD, weight decay, dropout, early stopping等はoptimizationとgeneralization双方へ影響。

代表式は

$$
\mathbf{w}_{k+1}=\mathbf{w}_k-\eta\frac{\hat{\mathbf{m}}_k}{\sqrt{\hat{\mathbf{v}}_k}+\varepsilon}
$$

です。

## なぜこの式・結論になるのか

### 1. mini-batch gradient

full objective gradientのestimateとしてg_k。batch noiseは探索を助ける場合もあるがvariance source。

### 2. Adam scaling

EMA first/second momentsから $\hat m/(\sqrt{\hat v}+ε)$ でcoordinate scale調整。

### 3. weight decay

AdamWではloss gradientとは別に $w\leftarrow(1-ηλ)w$ を適用し、adaptive denominatorでregularizationが歪むのを避ける。

## 教科書が省略しやすい一段を補う


### deep optimizationではtraining loss低下とgeneralizationを分離する

mini-batch gradientはfull gradientのnoisy estimateで、learning-rate schedule、momentum/Adam、batch sizeがupdate dynamicsを決める。large learning rateはspeedだけでなく探索noise/implicit biasにも影響し、warmupやdecayが安定性を調整する。

weight decay, dropout, data augmentation, early stoppingは異なるmechanism。dropoutはtraining時にrandom maskを掛け、inferenceでexpectation scaleを合わせる。augmentationはlabel-preserving invarianceをdata側へ入れる。regularizationを一つの「overfit防止」語でまとめず、objective, data distribution, architecture, optimizationのどこへ作用するかを区別する。



## 途中を飛ばさず全体をつなぐ

### 深層学習の最適化と正則化の導出を一本につなげる

DL optimizationはnonconvex stochastic setting。Adam/SGD, weight decay, dropout, early stopping等はoptimizationとgeneralization双方へ影響。

#### 1. mini-batch gradient

まず出発点を固定する。 full objective gradientのestimateとしてg_k。batch noiseは探索を助ける場合もあるがvariance source。 次に必要になるのは「Adam scaling」である。

#### 2. Adam scaling

ここまでで得た結果を次の段階へ渡す。 EMA first/second momentsから $\hat m/(\sqrt{\hat v}+ε)$ でcoordinate scale調整。 次に必要になるのは「weight decay」である。

#### 3. weight decay

最後に、前二段階の結果をまとめて結論へ進む。 AdamWではloss gradientとは別に $w\leftarrow(1-ηλ)w$ を適用し、adaptive denominatorでregularizationが歪むのを避ける。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{w}_{k+1}=\mathbf{w}_k-\eta\frac{\hat{\mathbf{m}}_k}{\sqrt{\hat{\mathbf{v}}_k}+\varepsilon}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

train loss低下中でもval loss上昇ならoverfit。early stoppingはtraining timeをregularizerとして使う。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

dropoutはtrainingでrandom unitsをzeroにしco-adaptationを抑制、inference scaling conventionはframework依存。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

optimizerを変えてtraining lossが速く下がることとtest performanceが良いことは同義でない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

train loss低下中でもval loss上昇ならoverfit。early stoppingはtraining timeをregularizerとして使う。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

dropoutはtrainingでrandom unitsをzeroにしco-adaptationを抑制、inference scaling conventionはframework依存。

## 成立条件と、条件を外したときに何が壊れるか

- 学習率scheduleが収束に強く影響する。
- batchの乱数seedとshuffleを管理する。
- 深層学習の最適化と正則化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

optimizerを変えてtraining lossが速く下がることとtest performanceが良いことは同義でない。

## よくある誤解を分解する

- 深層学習の最適化と正則化の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

深層学習の最適化と正則化では、式へ数値を代入するだけでは不十分である。optimizerを変えてtraining lossが速く下がることとtest performanceが良いことは同義でない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

gradient clipping、mixed precision loss scaling、scheduler、optimizer state checkpoint。

## ここから一段だけ発展する

次にarchitecture-specific inductive biasとしてlocal translation structureを使うCNNへ。


## このTopicを理解できたか確認する問い

- 「mini-batch gradient」を式を見ずに説明できるか
- 「weight decay」までの論理を一段ずつ再現できるか
- 深層学習の最適化と正則化の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-optimization-regularization)　|　[スライドへ](/slides/dl-optimization-regularization/)
