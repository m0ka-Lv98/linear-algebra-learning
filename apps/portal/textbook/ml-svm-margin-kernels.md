# SVM・margin・kernel：教科書

Course 08｜機械学習｜Topic 10/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-boosting-gradient-boosting` で得た概念を使い、ここでは SVM・margin・kernel へ進む。

前提として使うのは `opt-inequality-constraints-kkt`、`la-inner-products-norms-angles` です。

## まず直感を作る

kernel法は高次元特徴写像を明示せず内積だけ計算し、非線形境界を線形問題として扱う。



## 図の解説

<img src="/visuals/course-08/ml-svm-margin-kernels.png" alt="SVM・margin・kernelの図解" style="max-height: 440px; display:block; margin:0 auto;" />

元空間で非線形な点群が特徴空間で線形分離可能になる模式図を見る。 入力空間で曲がった境界も、類似度kernelを通じた高次元特徴空間では線形境界として表せる。実際の高次元座標を明示せず内積だけ計算する。

## 記号・型・次元

- $w,b$：hyperplane
- $y_i\in\{-1,1\}$
- $y_i(w^Tx_i+b)\ge1$：canonical margin constraint


## 正式な定義・代表式

hard-margin SVMはseparable dataでgeometric marginを最大化。scale normalizationによりminimize 1/2||w||² subject to constraints。

代表式は

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

です。

## なぜこの式・結論になるのか

### 1. distance to hyperplane

point xのsigned distanceは $(w^Tx+b)/||w||$。

### 2. scale ambiguity除去

(cw,cb)はsame boundaryなのでclosest pointsのfunctional marginを1へnormalize。

### 3. margin width

closest positive/negative hyperplanes distanceは2/||w||。maximizing margin= minimizing ||w||²/2。

## 教科書が省略しやすい一段を補う


### margin最大化からobjective $\|w\|^2/2$ が出る

hyperplane $w^Tx+b=0$ までのsigned distanceは $(w^Tx+b)/\|w\|$。(w,b)をconstant倍してもboundaryは同じなので、nearest training pointsのfunctional marginを1へnormalizeし $y_i(w^Tx_i+b)\ge1$ と置ける。positive/negative supporting hyperplanes間のdistanceは2/||w||、したがってmargin最大化は||w||最小化と同値。

soft marginではslackとC penaltyでviolationを許す。dualではtraining dataがinner productだけを通じて現れkernel化できる。feature scalingがdistance/margin geometryを変えるためpreprocessingはSVMの一部。


### soft marginのCを極端で読む

primal $\frac12\|w\|^2+C\sum_i\xi_i$。C→∞ではviolationを非常に高く罰し、separableに近ければhard-marginへ。C→0ではmargin regularizationが支配しtraining violationsを多く許す。したがってCは「大きいほど高性能」ではなくfitとmarginのtrade-off。

support vectorsはconstraint activeまたはslackを持つpointsで、dual coefficient nonzero。boundaryから遠いpointsを少し動かしてもsolutionが変わらない場合がある。

## 途中を飛ばさず全体をつなぐ

### SVM・margin・kernelの導出を一本につなげる

hard-margin SVMはseparable dataでgeometric marginを最大化。scale normalizationによりminimize 1/2||w||² subject to constraints。

#### 1. distance to hyperplane

まず出発点を固定する。 point xのsigned distanceは $(w^Tx+b)/||w||$。 次に必要になるのは「scale ambiguity除去」である。

#### 2. scale ambiguity除去

ここまでで得た結果を次の段階へ渡す。 (cw,cb)はsame boundaryなのでclosest pointsのfunctional marginを1へnormalize。 次に必要になるのは「margin width」である。

#### 3. margin width

最後に、前二段階の結果をまとめて結論へ進む。 closest positive/negative hyperplanes distanceは2/||w||。maximizing margin= minimizing ||w||²/2。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

nonseparableはslack ξとC penaltyのsoft margin。C largeはviolation重視。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

nonseparableはslack ξとC penaltyのsoft margin。C largeはviolation重視。

## 成立条件と、条件を外したときに何が壊れるか

- kernel matrixの正定値性を確認する。
- scale parameterで境界の複雑さが変わる。
- SVM・margin・kernelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

## よくある誤解を分解する

- SVM・margin・kernelの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

SVM・margin・kernelでは、式へ数値を代入するだけでは不十分である。feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

dual/kernel solver vs linear primal solverをn,pで選ぶ。C/γをvalidation。

## ここから一段だけ発展する

dual内でdataはinner productsだけに現れ、kernel trickが可能になる。


## このTopicを理解できたか確認する問い

- 「distance to hyperplane」を式を見ずに説明できるか
- 「margin width」までの論理を一段ずつ再現できるか
- SVM・margin・kernelの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-svm-margin-kernels)　|　[スライドへ](/slides/ml-svm-margin-kernels/)
