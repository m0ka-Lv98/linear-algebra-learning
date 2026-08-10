# 乱択数値線形代数：教科書

Course 05｜数値計算｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `num-regularization-ill-posed-problems` で得た概念を使い、ここでは 乱択数値線形代数 へ進む。

前提として使うのは `num-svd-low-rank-computation`、`prob-expectation-variance-moments`、`dm-discrete-probability-indicators-randomized-algorithms` です。

## まず直感を作る

乱択法は高次元構造を完全に読む代わりに、ランダムな部分空間へ写して主要情報を安価に捉える。



## 図の解説

<img src="/visuals/course-05/num-randomized-numerical-linear-algebra.png" alt="乱択数値線形代数の図解" style="max-height: 440px; display:block; margin:0 auto;" />

高次元点間距離が低次元射影でも概ね保たれる様子を見る。 高次元点群を低次元へ写しても、ランダム写像を適切に正規化すれば点間距離が概ね保存される。元の距離と写像後距離の対応を散布として確認する。

## 記号・型・次元

- $\Omega\in\mathbb R^{n\times(k+p)}$：random test matrix
- $Y=A\Omega$：sampled range
- $Q$：Yのorthonormal basis


## 正式な定義・代表式

randomized range finderはrandom directionsをAへ通し、Aのdominant column spaceを高確率で捉える。

代表式は

$$
\mathbf{Y}=\mathbf{A}\mathbf{\Omega}
$$

です。

## なぜこの式・結論になるのか

### 1. random probeを通す

$Y=A\Omega=U\Sigma V^T\Omega$。V^TΩはrandom係数を各right singular directionへ与える。

### 2. 大singular方向が強く出る

Σが係数をσ_i倍するためdominant singular subspaceがYで強調される。

### 3. small matrixへ圧縮

Q=orth(Y)を作り、$B=Q^TA$ のSVDを解けば大行列Aを小さいsubspace内で近似できる。

## 教科書が省略しやすい一段を補う


### random projectionでrangeを先に小さく近似する

large matrix Aのtop rank-r subspaceを求めたいとき、random matrix $\Omega$ を掛け $Y=A\Omega$ を作る。Aが強く伸ばすsingular directionsほどYに強く現れるため、Yのorthonormal basis Qはdominant rangeを高確率で捉える。以後small matrix $Q^TA$ をSVDすればcostを減らせる。

oversamplingとpower iterationはmiss probabilityやslow spectral decayを補う。randomized algorithmではseedだけでなく、期待誤差/高確率bound、rank target、oversampling sizeを記録し、deterministic baselineとの誤差比較を行う。



## 途中を飛ばさず全体をつなぐ

### 乱択数値線形代数の導出を一本につなげる

randomized range finderはrandom directionsをAへ通し、Aのdominant column spaceを高確率で捉える。

#### 1. random probeを通す

まず出発点を固定する。 $Y=A\Omega=U\Sigma V^T\Omega$。V^TΩはrandom係数を各right singular directionへ与える。 次に必要になるのは「大singular方向が強く出る」である。

#### 2. 大singular方向が強く出る

ここまでで得た結果を次の段階へ渡す。 Σが係数をσ_i倍するためdominant singular subspaceがYで強調される。 次に必要になるのは「small matrixへ圧縮」である。

#### 3. small matrixへ圧縮

最後に、前二段階の結果をまとめて結論へ進む。 Q=orth(Y)を作り、$B=Q^TA$ のSVDを解けば大行列Aを小さいsubspace内で近似できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{Y}=\mathbf{A}\mathbf{\Omega}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

10000×10000だがeffective rank20なら、Ωを30列程度にしてAΩを計算し30次元subspaceへ圧縮できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

spectrum decayが遅い場合はpower iteration $(AA^T)^qA\Omega$ でdominant方向を強調するがmatvec costが増える。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

randomizedだから常に速いわけではない。matrixが小さい、rankが高い、data movementが支配的ならfull deterministic法が有利。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

10000×10000だがeffective rank20なら、Ωを30列程度にしてAΩを計算し30次元subspaceへ圧縮できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

spectrum decayが遅い場合はpower iteration $(AA^T)^qA\Omega$ でdominant方向を強調するがmatvec costが増える。

## 成立条件と、条件を外したときに何が壊れるか

- 乱数seedと再現性を記録する。
- 射影次元が小さすぎると歪みが大きい。
- 乱択数値線形代数の定義と計算手順を区別し、数値例だけで一般性を判断しない。

randomizedだから常に速いわけではない。matrixが小さい、rankが高い、data movementが支配的ならfull deterministic法が有利。

## よくある誤解を分解する

- 乱択数値線形代数の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

乱択数値線形代数では、式へ数値を代入するだけでは不十分である。randomizedだから常に速いわけではない。matrixが小さい、rankが高い、data movementが支配的ならfull deterministic法が有利。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

random seed、oversampling p、power qを記録。qualityは $\|A-QQ^TA\|$ やdownstream errorで検証する。

## ここから一段だけ発展する

randomnessを「計算量削減」に使う考えはMonte Carloにも共通するが、目的と収束率は異なる。


## このTopicを理解できたか確認する問い

- 「random probeを通す」を式を見ずに説明できるか
- 「small matrixへ圧縮」までの論理を一段ずつ再現できるか
- 乱択数値線形代数の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-randomized-numerical-linear-algebra)　|　[スライドへ](/slides/num-randomized-numerical-linear-algebra/)
