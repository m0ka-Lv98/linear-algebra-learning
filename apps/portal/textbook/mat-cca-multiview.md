# 正準相関分析：教科書

Course 07｜データ解析の行列手法｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-ica-independent-components` で得た概念を使い、ここでは 正準相関分析 へ進む。

前提として使うのは `prob-covariance-correlation`、`la-singular-value-decomposition` です。

## まず直感を作る

複数viewの共通構造は、別々の特徴空間で相関が最大になる射影方向として捉えられる。



## 図の解説

<img src="/visuals/course-07/mat-cca-multiview.png" alt="正準相関分析の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つのデータviewをそれぞれ1次元へ射影し、対応点の相関を見る。 2つのデータ表の射影方向を選び、射影後の相関を最大にする。個々の分散最大化ではなく、2 viewの共変動を強くする方向を探す点がPCAと異なる。

## 記号・型・次元

- $X,Y$：same samplesの2 views
- $a,b$：projection vectors
- $Xa,Yb$：canonical variates


## 正式な定義・代表式

CCAは各viewのlinear projection間correlationを最大化し、各view内scaleをcovarianceでnormalizeする。

代表式は

$$
\max_{\mathbf{a},\mathbf{b}}\operatorname{corr}(\mathbf{X}\mathbf{a},\mathbf{Y}\mathbf{b})
$$

です。

## なぜこの式・結論になるのか

### 1. correlationを書く

$corr(Xa,Yb)=a^TS_{XY}b/\sqrt{a^TS_{XX}a\;b^TS_{YY}b}$。

### 2. normalization constraint

$a^TS_{XX}a=1,b^TS_{YY}b=1$ としてcross covarianceをmaximize。

### 3. generalized eigen/SVD

whitening each view後のcross-covariance SVDへ変換できる。

## 教科書が省略しやすい一段を補う


### CCAは二つのviewのprojection correlationを最大化する

centered X,Yに対しa,bを選び $u=Xa$, $v=Yb$ のcorrelationを最大化する。scale ambiguityを除くため $a^TS_{xx}a=1$, $b^TS_{yy}b=1$ とconstraint。Lagrange条件からgeneralized eigenvalue problemへ導ける。

PCAが一つのdataset内varianceを最大化するのに対し、CCAはtwo views間covarianceを各view varianceで正規化して最大化する。high-dimensionalでcovariance singularならregularized CCAが必要。correlationはcausalityではない。



## 途中を飛ばさず全体をつなぐ

### 正準相関分析の導出を一本につなげる

CCAは各viewのlinear projection間correlationを最大化し、各view内scaleをcovarianceでnormalizeする。

#### 1. correlationを書く

まず出発点を固定する。 $corr(Xa,Yb)=a^TS_{XY}b/\sqrt{a^TS_{XX}a\;b^TS_{YY}b}$。 次に必要になるのは「normalization constraint」である。

#### 2. normalization constraint

ここまでで得た結果を次の段階へ渡す。 $a^TS_{XX}a=1,b^TS_{YY}b=1$ としてcross covarianceをmaximize。 次に必要になるのは「generalized eigen/SVD」である。

#### 3. generalized eigen/SVD

最後に、前二段階の結果をまとめて結論へ進む。 whitening each view後のcross-covariance SVDへ変換できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\max_{\mathbf{a},\mathbf{b}}\operatorname{corr}(\mathbf{X}\mathbf{a},\mathbf{Y}\mathbf{b})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

gene expressionとprotein measurementのsame samplesで共有latent axesを探す。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

X=YならPCA-like directionsと関連するがobjectiveはcross-view correlation。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

p>nでcovariance singularならnaive CCA overfit/undefined。regularized CCAが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

gene expressionとprotein measurementのsame samplesで共有latent axesを探す。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

X=YならPCA-like directionsと関連するがobjectiveはcross-view correlation。

## 成立条件と、条件を外したときに何が壊れるか

- 単純相関と因果を混同しない。
- 正則化が必要な高次元ケースがある。
- 正準相関分析の定義と計算手順を区別し、数値例だけで一般性を判断しない。

p>nでcovariance singularならnaive CCA overfit/undefined。regularized CCAが必要。

## よくある誤解を分解する

- 正準相関分析の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

正準相関分析では、式へ数値を代入するだけでは不十分である。p>nでcovariance singularならnaive CCA overfit/undefined。regularized CCAが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

train/validation split内でstandardization/covariance fit。canonical correlationのin-sample optimismに注意。

## ここから一段だけ発展する

distance geometryを低dimへ保つrandom projectionへ。


## このTopicを理解できたか確認する問い

- 「correlationを書く」を式を見ずに説明できるか
- 「generalized eigen/SVD」までの論理を一段ずつ再現できるか
- 正準相関分析の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-cca-multiview)　|　[スライドへ](/slides/mat-cca-multiview/)
