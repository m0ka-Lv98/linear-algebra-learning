# 非負値行列因子分解：教科書

Course 07｜データ解析の行列手法｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-filtering-regularization` で得た概念を使い、ここでは 非負値行列因子分解 へ進む。

前提として使うのは `la-low-rank-approximation`、`opt-projected-gradient` です。

## まず直感を作る

行列因子分解は観測行列を少数の潜在成分の積として説明する。



## 図の解説

<img src="/visuals/course-07/mat-nmf-nonnegative-factors.png" alt="非負値行列因子分解の図解" style="max-height: 440px; display:block; margin:0 auto;" />

元行列と2因子、再構成行列をheatmapで並べる。 データ行列を少数の基底と係数へ分ける。NMFなら両方を非負に制約するため、加法的なparts representationとして各成分を解釈しやすい。

## 記号・型・次元

- $X\ge0$
- $W\in\mathbb R_+^{m\times r}$：basis
- $H\in\mathbb R_+^{r\times n}$：coefficients


## 正式な定義・代表式

NMFはnonnegative dataをnonnegative basisのadditive combinationで近似。SVDと違いorthogonalityも一意性も一般にない。

代表式は

$$
\min_{\mathbf{W},\mathbf{H}\ge0}\|\mathbf{X}-\mathbf{W}\mathbf{H}\|_F^2
$$

です。

## なぜこの式・結論になるのか

### 1. low-rank factor model

$X\approx WH$ でcolumn x_j≈Σ_k h_{kj}w_k。nonnegativeなのでsubtractive cancellationなし。

### 2. objective

Frobenius lossならmin_{W,H≥0}||X-WH||²。W固定でH convex、H固定でW convexだがjointにはnonconvex。

### 3. scale ambiguity

positive diagonal Dに対し $WH=(WD)(D^{-1}H)$。normalizationなしにbasis scaleは一意でない。

## 教科書が省略しやすい一段を補う


### nonnegativityが加法的な表現を作る

NMFはnonnegative data matrix Xを $X\approx WH$ with W,H≥0へ分解する。PCA/SVDではpositive/negative cancellationでcomponentを作れるが、NMFはsubtractionを許さないため、basis Wを足し合わせてsampleを構成するparts-based interpretationになりやすい。

objective $\|X-WH\|_F^2$ はW固定ならHでconvex、H固定ならWでconvexでもjointにはnonconvex。scale ambiguity $WH=(WD)(D^{-1}H)$、component permutationなどnon-uniquenessがある。initializationとmultiple runs、reconstruction errorだけでなくinterpretability/stabilityを確認する。



## 途中を飛ばさず全体をつなぐ

### 非負値行列因子分解の導出を一本につなげる

NMFはnonnegative dataをnonnegative basisのadditive combinationで近似。SVDと違いorthogonalityも一意性も一般にない。

#### 1. low-rank factor model

まず出発点を固定する。 $X\approx WH$ でcolumn x_j≈Σ_k h_{kj}w_k。nonnegativeなのでsubtractive cancellationなし。 次に必要になるのは「objective」である。

#### 2. objective

ここまでで得た結果を次の段階へ渡す。 Frobenius lossならmin_{W,H≥0}||X-WH||²。W固定でH convex、H固定でW convexだがjointにはnonconvex。 次に必要になるのは「scale ambiguity」である。

#### 3. scale ambiguity

最後に、前二段階の結果をまとめて結論へ進む。 positive diagonal Dに対し $WH=(WD)(D^{-1}H)$。normalizationなしにbasis scaleは一意でない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\mathbf{W},\mathbf{H}\ge0}\|\mathbf{X}-\mathbf{W}\mathbf{H}\|_F^2
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

parts-based image decompositionでW columnsがnonnegative parts、Hが各imageのmixture weights。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

r=1ならrank-1 nonnegative approximation。initializationでlocal solutionが変わる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

negative centered dataへstandard NMFは直接使えない。PCA後centered matrixとNMF inputを混同しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

parts-based image decompositionでW columnsがnonnegative parts、Hが各imageのmixture weights。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

r=1ならrank-1 nonnegative approximation。initializationでlocal solutionが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- 非一意性がある。
- 制約（非負、独立など）が解釈を決める。
- 非負値行列因子分解の定義と計算手順を区別し、数値例だけで一般性を判断しない。

negative centered dataへstandard NMFは直接使えない。PCA後centered matrixとNMF inputを混同しない。

## よくある誤解を分解する

- 非負値行列因子分解の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

非負値行列因子分解では、式へ数値を代入するだけでは不十分である。negative centered dataへstandard NMFは直接使えない。PCA後centered matrixとNMF inputを混同しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

multiple initialization、objective convergence、zero locking、scale normalizationを記録。

## ここから一段だけ発展する

NMFはnonnegative constraintでinterpretabilityを狙う。独立性をcriterionにするICAは別原理。


## このTopicを理解できたか確認する問い

- 「low-rank factor model」を式を見ずに説明できるか
- 「scale ambiguity」までの論理を一段ずつ再現できるか
- 非負値行列因子分解の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-nmf-nonnegative-factors)　|　[スライドへ](/slides/mat-nmf-nonnegative-factors/)
