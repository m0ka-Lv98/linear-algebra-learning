# 誤差逆伝播と計算graph：教科書

Course 09｜深層学習｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-perceptron-mlp` で得た概念を使い、ここでは 誤差逆伝播と計算graph へ進む。

前提として使うのは `calc-multivariable-chain-rule`、`dm-directed-graphs-dags-topological-order` です。

## まず直感を作る

backpropは計算graphを前向きに値計算し、逆向きに連鎖律で勾配を伝える。



## 図の解説

<img src="/visuals/course-09/dl-backprop-computation-graphs.png" alt="誤差逆伝播と計算graphの図解" style="max-height: 440px; display:block; margin:0 auto;" />

forward矢印とreverse gradient矢印を順にハイライトする。 forward矢印が値の計算、逆向き矢印が局所微分をchain ruleで掛け合わせるgradient計算である。同じ中間量を再利用することで全parameterの微分を効率よく得る。

## 記号・型・次元

- $y=f(x)$：node operation
- $J_f$：Jacobian
- $\bar y=\partial L/\partial y$：upstream gradient
- $\bar x=J_f^T\bar y$


## 正式な定義・代表式

backpropはmultivariable chain ruleをcomputation graphのreverse topological orderで再利用し、scalar lossの全parameter gradientを効率よく計算するreverse-mode autodiff。

代表式は

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{x}}=\mathbf{J}_f(\mathbf{x})^{\mathsf T}\frac{\partial\mathcal{L}}{\partial f}
$$

です。

## なぜこの式・結論になるのか

### 1. local linearization

$dy=J_f dx$。scalar lossのchangeは $dL=\bar y^Tdy=\bar y^TJ_fdx=(J_f^T\bar y)^Tdx$。

### 2. vector-Jacobian product

よってdownstream gradientは $\bar x=J_f^T\bar y$。full Jacobianを形成せずVJPを計算できる。

### 3. graph reuse

forwardでintermediate valuesを保存し、reverseで各edgeのlocal derivativeを一度ずつ合成する。shared nodeはgradient contributionsをsum。

## 教科書が省略しやすい一段を補う


### backpropはchain ruleの計算順序を再利用するdynamic programming

scalar loss Lがintermediate variablesを通ってparametersへ依存するとき、chain ruleは全pathのlocal derivative積の和を要求する。naiveにparameterごと再計算すると同じsubexpressionを何度も計算する。reverse-mode autodiffはforwardでintermediate valuesを保存し、reverseで各nodeのadjoint $\bar v=\partial L/\partial v$ を一度集約してparentsへ配る。

matrix layer z=Wxでは upstream gradient g_zに対し $\partial L/\partial W=g_zx^T$、$\partial L/\partial x=W^Tg_z$。このshapeを追えばtranspose位置を暗記せず導ける。backpropはoptimization algorithmではなくgradientを計算するalgorithmで、SGD/Adamはそのgradientをどう使うかの別層。


### branchがあるgraphではgradientを足す

intermediate hが二つのdownstream paths a(h),b(h)を通ってLへ寄与するなら total derivativeは各path contributionの和：
$$
\frac{dL}{dh}=\frac{\partial L}{\partial a}\frac{da}{dh}+\frac{\partial L}{\partial b}\frac{db}{dh}.
$$
reverse autodiffがnodeへincoming adjointsをaccumulateするのはこのため。chainなら掛ける、branch mergeなら足す、という二規則で大きなcomputation graphを処理できる。

vector/matrixではlocal Jacobian全体を明示せずVJP/JVPを計算することでmemory/costを抑える。

## 途中を飛ばさず全体をつなぐ

### 誤差逆伝播と計算graphの導出を一本につなげる

backpropはmultivariable chain ruleをcomputation graphのreverse topological orderで再利用し、scalar lossの全parameter gradientを効率よく計算するreverse-mode autodiff。

#### 1. local linearization

まず出発点を固定する。 $dy=J_f dx$。scalar lossのchangeは $dL=\bar y^Tdy=\bar y^TJ_fdx=(J_f^T\bar y)^Tdx$。 次に必要になるのは「vector-Jacobian product」である。

#### 2. vector-Jacobian product

ここまでで得た結果を次の段階へ渡す。 よってdownstream gradientは $\bar x=J_f^T\bar y$。full Jacobianを形成せずVJPを計算できる。 次に必要になるのは「graph reuse」である。

#### 3. graph reuse

最後に、前二段階の結果をまとめて結論へ進む。 forwardでintermediate valuesを保存し、reverseで各edgeのlocal derivativeを一度ずつ合成する。shared nodeはgradient contributionsをsum。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{x}}=\mathbf{J}_f(\mathbf{x})^{\mathsf T}\frac{\partial\mathcal{L}}{\partial f}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$z=xy$, $L=z^2$。forward z=xy。reverse dL/dz=2z、dL/dx=2z·y=2xy²、dL/dy=2z·x=2x²y。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

matrix layer z=Wxでは dL/dW=\bar z x^T, dL/dx=W^T\bar z。shapeから式を検算。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

backpropはgradient descentそのものではない。backpropはgradient計算、optimizerはそのgradientを使ってparameter update。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$z=xy$, $L=z^2$。forward z=xy。reverse dL/dz=2z、dL/dx=2z·y=2xy²、dL/dy=2z·x=2x²y。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

matrix layer z=Wxでは dL/dW=\bar z x^T, dL/dx=W^T\bar z。shapeから式を検算。

## 成立条件と、条件を外したときに何が壊れるか

- gradientのshapeを各nodeで確認する。
- 局所微分を掛ける順序を間違えない。
- 誤差逆伝播と計算graphの定義と計算手順を区別し、数値例だけで一般性を判断しない。

backpropはgradient descentそのものではない。backpropはgradient計算、optimizerはそのgradientを使ってparameter update。

## よくある誤解を分解する

- 誤差逆伝播と計算graphの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

誤差逆伝播と計算graphでは、式へ数値を代入するだけでは不十分である。backpropはgradient descentそのものではない。backpropはgradient計算、optimizerはそのgradientを使ってparameter update。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

in-place ops、detach、mixed precision、checkpointingでgraph semanticsが変わる。finite-difference gradient checkをsmall modelで。

## ここから一段だけ発展する

gradientが流れる形はactivation/loss選択に左右される。次Topicでderivativeとprobabilistic lossを整理する。


## このTopicを理解できたか確認する問い

- 「local linearization」を式を見ずに説明できるか
- 「graph reuse」までの論理を一段ずつ再現できるか
- 誤差逆伝播と計算graphの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-backprop-computation-graphs)　|　[スライドへ](/slides/dl-backprop-computation-graphs/)
