# kernel methodと特徴写像：教科書

Course 08｜機械学習｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-svm-margin-kernels` で得た概念を使い、ここでは kernel methodと特徴写像 へ進む。

前提として使うのは `ml-svm-margin-kernels`、`la-quadratic-forms-positive-definite` です。

## まず直感を作る

kernel法は高次元特徴写像を明示せず内積だけ計算し、非線形境界を線形問題として扱う。



## 図の解説

<img src="/visuals/course-08/ml-kernel-methods-feature-maps.png" alt="kernel methodと特徴写像の図解" style="max-height: 440px; display:block; margin:0 auto;" />

元空間で非線形な点群が特徴空間で線形分離可能になる模式図を見る。 入力空間で曲がった境界も、類似度kernelを通じた高次元特徴空間では線形境界として表せる。実際の高次元座標を明示せず内積だけ計算する。

## 記号・型・次元

- $\phi(x)$：possibly high-dimensional feature map
- $k(x,x^{\prime})=\langle\phi(x),\phi(x^{\prime})\rangle$
- $K$：Gram matrix


## 正式な定義・代表式

kernel methodはfeature vectorsを明示せずinner productsだけ計算。valid PSD kernelはあるHilbert feature spaceのinner productとして解釈できる。

代表式は

$$
k(\mathbf{x},\mathbf{x}^{\prime})=\langle\phi(\mathbf{x}),\phi(\mathbf{x}^{\prime})\rangle
$$

です。

## なぜこの式・結論になるのか

### 1. dual representation

many regularized linear problemsのsolutionはtraining features spanにあり $w=\sum_iα_i\phi(x_i)$。

### 2. prediction

$w^T\phi(x)=\sum_iα_i\langle\phi(x_i),\phi(x)\rangle=\sum_iα_ik(x_i,x)$。

### 3. kernel trick

φをexplicitに構築せずkだけ評価できる。

## 教科書が省略しやすい一段を補う


### kernel trickは「nonlinear modelを魔法でlinear化」ではない

feature map $\phi(x)$ のinner productだけがalgorithmに現れるなら $k(x,x')=\phi(x)^T\phi(x')$ を直接計算でき、explicit high-dimensional vectorを作らず同じ結果を得る。representer theorem型の構造でsolutionがtraining feature span $w=\sum_i\alpha_i\phi(x_i)$ にあると、predictionは $\sum_i\alpha_i k(x_i,x)$。

valid kernelでは任意finite samplesのGram matrix KがPSD。arbitrary similarityをkernelと呼べない。n×n Gram memoryはlarge nでbottleneckとなり、Nyström/random features等で近似する。kernel choiceはimplicit feature geometryを選ぶこと。


### RBF kernelのscale parameterを距離から読む

$k(x,x')=\exp(-\gamma\|x-x'\|^2)$。γ小なら遠いpointsでもsimilarity高くsmooth/low-complexity function、γ大なら近傍だけ強く結びboundaryが細かくなりhigh varianceになりやすい。feature scalingがdistanceを変えるためγの意味もscale依存。

Gram eigenvaluesがnumerical near-zeroならsolver conditioningも悪くなる。kernel parameterはmodel complexity parameterとしてCV内で選ぶ。

## 途中を飛ばさず全体をつなぐ

### kernel methodと特徴写像の導出を一本につなげる

kernel methodはfeature vectorsを明示せずinner productsだけ計算。valid PSD kernelはあるHilbert feature spaceのinner productとして解釈できる。

#### 1. dual representation

まず出発点を固定する。 many regularized linear problemsのsolutionはtraining features spanにあり $w=\sum_iα_i\phi(x_i)$。 次に必要になるのは「prediction」である。

#### 2. prediction

ここまでで得た結果を次の段階へ渡す。 $w^T\phi(x)=\sum_iα_i\langle\phi(x_i),\phi(x)\rangle=\sum_iα_ik(x_i,x)$。 次に必要になるのは「kernel trick」である。

#### 3. kernel trick

最後に、前二段階の結果をまとめて結論へ進む。 φをexplicitに構築せずkだけ評価できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
k(\mathbf{x},\mathbf{x}^{\prime})=\langle\phi(\mathbf{x}),\phi(\mathbf{x}^{\prime})\rangle
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

polynomial kernel $(x^Tx^{\prime}+c)^2$ はdegree≤2 feature inner productに対応。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

RBF kernelはinfinite-dimensional feature interpretationを持つがGram matrix n×n。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

arbitrary similarity functionはvalid kernelではない。GramがPSDでないとstandard convex kernel method性質が崩れる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

polynomial kernel $(x^Tx^{\prime}+c)^2$ はdegree≤2 feature inner productに対応。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

RBF kernelはinfinite-dimensional feature interpretationを持つがGram matrix n×n。

## 成立条件と、条件を外したときに何が壊れるか

- kernel matrixの正定値性を確認する。
- scale parameterで境界の複雑さが変わる。
- kernel methodと特徴写像の定義と計算手順を区別し、数値例だけで一般性を判断しない。

arbitrary similarity functionはvalid kernelではない。GramがPSDでないとstandard convex kernel method性質が崩れる。

## よくある誤解を分解する

- kernel methodと特徴写像の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

kernel methodと特徴写像では、式へ数値を代入するだけでは不十分である。arbitrary similarity functionはvalid kernelではない。GramがPSDでないとstandard convex kernel method性質が崩れる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

kernel matrix memoryO(n²)がbottleneck。Nyström/random Fourier featuresでapproximate。

## ここから一段だけ発展する

unsupervisedでcentroidを最適化するk-meansへ。


## このTopicを理解できたか確認する問い

- 「dual representation」を式を見ずに説明できるか
- 「kernel trick」までの論理を一段ずつ再現できるか
- kernel methodと特徴写像の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-kernel-methods-feature-maps)　|　[スライドへ](/slides/ml-kernel-methods-feature-maps/)
