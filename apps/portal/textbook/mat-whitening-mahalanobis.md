# whiteningとMahalanobis距離：教科書

Course 07｜データ解析の行列手法｜Topic 05/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-pca-svd-computation` で得た概念を使い、ここでは whiteningとMahalanobis距離 へ進む。

前提として使うのは `prob-multivariate-normal-distribution`、`la-quadratic-forms-positive-definite` です。

## まず直感を作る

PCAはデータの分散が大きい直交方向を順に選び、低次元へ射影する。



## 図の解説

<img src="/visuals/course-07/mat-whitening-mahalanobis.png" alt="whiteningとMahalanobis距離の図解" style="max-height: 440px; display:block; margin:0 auto;" />

細長い点群と主成分軸、射影点を描く。 点群の最も長い方向が第一主成分である。各点をその軸へ直交射影した座標の分散が最大になる方向を探す問題が固有値/SVDへつながる。

## 記号・型・次元

- $\Sigma=V\Lambda V^T$
- $z=\Lambda^{-1/2}V^T(x-\mu)$：whitened coordinate
- $d_M²=(x-\mu)^T\Sigma^{-1}(x-\mu)$


## 正式な定義・代表式

whiteningはcovarianceをIへ変換。Mahalanobis distanceはwhitened spaceのEuclidean distanceと等しい。

代表式は

$$
d_M^2=(\mathbf{x}-\boldsymbol{\mu})^{\mathsf T}\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})
$$

です。

## なぜこの式・結論になるのか

### 1. linear transform covariance

$Cov(A(X-\mu))=A\Sigma A^T$。

### 2. A=Λ^{-1/2}V^T

$A\Sigma A^T=Λ^{-1/2}V^TVΛV^TVΛ^{-1/2}=I$。

### 3. distance

$\|z\|²=(x-\mu)^TVΛ^{-1}V^T(x-\mu)=(x-\mu)^TΣ^{-1}(x-\mu)$。

## 教科書が省略しやすい一段を補う


### whiteningはcovariance楕円をunit sphereへ変換する

covariance $S=V\Lambda V^T$ with positive eigenvaluesとする。centered vectorへ
$z=\Lambda^{-1/2}V^T(x-\mu)$
を適用すると
$\operatorname{Cov}(z)=I$。V^Tでprincipal axesへ回転し、各軸をstandard deviation $\sqrt\lambda_i$ で割る二段階。

このcoordinateでEuclidean squared distanceは
$$
\|z\|^2=(x-\mu)^TS^{-1}(x-\mu),
$$
すなわちMahalanobis distance。varianceが大きいdirectionの差は相対的に小さく、varianceが小さいdirectionは大きく評価される。small eigenvaluesではnoiseも増幅するためregularizationが必要。



## 途中を飛ばさず全体をつなぐ

### whiteningとMahalanobis距離の導出を一本につなげる

whiteningはcovarianceをIへ変換。Mahalanobis distanceはwhitened spaceのEuclidean distanceと等しい。

#### 1. linear transform covariance

まず出発点を固定する。 $Cov(A(X-\mu))=A\Sigma A^T$。 次に必要になるのは「A=Λ^{-1/2}V^T」である。

#### 2. A=Λ^{-1/2}V^T

ここまでで得た結果を次の段階へ渡す。 $A\Sigma A^T=Λ^{-1/2}V^TVΛV^TVΛ^{-1/2}=I$。 次に必要になるのは「distance」である。

#### 3. distance

最後に、前二段階の結果をまとめて結論へ進む。 $\|z\|²=(x-\mu)^TVΛ^{-1}V^T(x-\mu)=(x-\mu)^TΣ^{-1}(x-\mu)$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
d_M^2=(\mathbf{x}-\boldsymbol{\mu})^{\mathsf T}\mathbf{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

variance100のdirectionで差5はsmall in SD units、variance1 direction差5はlarge。Mahalanobisはこのscaleを反映。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

correlated ellipseでEuclidean nearestとMahalanobis nearestが変わる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Σ singularならordinary inverse不可。small eigenvaluesもnoise amplification。pseudoinverse/regularizationが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

variance100のdirectionで差5はsmall in SD units、variance1 direction差5はlarge。Mahalanobisはこのscaleを反映。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

correlated ellipseでEuclidean nearestとMahalanobis nearestが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- whiteningとMahalanobis距離の定義と計算手順を区別し、数値例だけで一般性を判断しない。

Σ singularならordinary inverse不可。small eigenvaluesもnoise amplification。pseudoinverse/regularizationが必要。

## よくある誤解を分解する

- whiteningとMahalanobis距離の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

whiteningとMahalanobis距離では、式へ数値を代入するだけでは不十分である。Σ singularならordinary inverse不可。small eigenvaluesもnoise amplification。pseudoinverse/regularizationが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

Cholesky solveでdistance計算、inverseを作らない。estimated covarianceのshrinkageも検討。

## ここから一段だけ発展する

noise covarianceでwhitenしてleast squaresを解くとGLS/WLSへつながる。


## このTopicを理解できたか確認する問い

- 「linear transform covariance」を式を見ずに説明できるか
- 「distance」までの論理を一段ずつ再現できるか
- whiteningとMahalanobis距離の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-whitening-mahalanobis)　|　[スライドへ](/slides/mat-whitening-mahalanobis/)
