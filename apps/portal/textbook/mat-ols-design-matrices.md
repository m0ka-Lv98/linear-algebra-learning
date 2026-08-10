# OLSとdesign matrix：教科書

Course 07｜データ解析の行列手法｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-whitening-mahalanobis` で得た概念を使い、ここでは OLSとdesign matrix へ進む。

前提として使うのは `la-least-squares-geometry`、`stat-linear-regression-probabilistic-model` です。

## まず直感を作る

回帰は入力から平均的な出力を説明・予測する関係をモデル化する。



## 図の解説

<img src="/visuals/course-07/mat-ols-design-matrices.png" alt="OLSとdesign matrixの図解" style="max-height: 440px; display:block; margin:0 auto;" />

散布点、回帰線、残差を同時に描く。 点が観測値、線がモデル予測、点から線までの縦の差が残差である。二乗残差を合計する最小二乗では、大きな残差ほど強く目的関数へ効く。

## 記号・型・次元

- $X\in\mathbb R^{n\times p}$：design matrix
- $y\in\mathbb R^n$
- $\beta\in\mathbb R^p$
- $r=y-X\beta$


## 正式な定義・代表式

OLSはresidual 2-normを最小化。full column rankなら normal equation $X^TX\hat\beta=X^Ty$。幾何的にはyをcol(X)へorthogonal projection。

代表式は

$$
\hat{\boldsymbol{\beta}}=\arg\min_{\boldsymbol{\beta}}\|\mathbf{X}\boldsymbol{\beta}-\mathbf{y}\|_2^2
$$

です。

## なぜこの式・結論になるのか

### 1. objective gradient

$J=\|y-Xβ\|²=(y-Xβ)^T(y-Xβ)$。gradient $-2X^T(y-Xβ)$。

### 2. stationarity

$X^Tr=0$。residualは全design columnに直交。

### 3. solve

full column rankならX^TX SPDでinvertible。理論式は $(X^TX)^{-1}X^Ty$、numerically QR/SVDを使う。

## 教科書が省略しやすい一段を補う


### design matrixは全sampleのlinear modelを一つの写像にする

各sample $y_i=\mathbf x_i^T\boldsymbol\beta+\varepsilon_i$ を縦に積むと
$\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\varepsilon$。OLSは $\|X\beta-y\|^2$ minimizationで、optimal residualがcolumn space of Xにorthogonalだから $X^T(X\hat\beta-y)=0$。full-column-rankならnormal equationを解ける。

interceptを含めるならXにones columnを追加する。categorical dummy codingやinteractionもcolumnsを追加する操作。rank deficiencyは「説明変数が多い」だけでなく、columns間にexact linear relationがあることを意味し、coefficient uniquenessを壊す。



## 途中を飛ばさず全体をつなぐ

### OLSとdesign matrixの導出を一本につなげる

OLSはresidual 2-normを最小化。full column rankなら normal equation $X^TX\hat\beta=X^Ty$。幾何的にはyをcol(X)へorthogonal projection。

#### 1. objective gradient

まず出発点を固定する。 $J=\|y-Xβ\|²=(y-Xβ)^T(y-Xβ)$。gradient $-2X^T(y-Xβ)$。 次に必要になるのは「stationarity」である。

#### 2. stationarity

ここまでで得た結果を次の段階へ渡す。 $X^Tr=0$。residualは全design columnに直交。 次に必要になるのは「solve」である。

#### 3. solve

最後に、前二段階の結果をまとめて結論へ進む。 full column rankならX^TX SPDでinvertible。理論式は $(X^TX)^{-1}X^Ty$、numerically QR/SVDを使う。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{\boldsymbol{\beta}}=\arg\min_{\boldsymbol{\beta}}\|\mathbf{X}\boldsymbol{\beta}-\mathbf{y}\|_2^2
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

切片column1とx columnでstraight line fit。normal equationsはresidual sum=0とresidual-x inner product=0。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

collinear columnsではβ非一意でもfitted value Xβは一意になる場合。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

X^TX inverse formulaをrank checkなしに使うと失敗。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

切片column1とx columnでstraight line fit。normal equationsはresidual sum=0とresidual-x inner product=0。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

collinear columnsではβ非一意でもfitted value Xβは一意になる場合。

## 成立条件と、条件を外したときに何が壊れるか

- 予測と因果を混同しない。
- 外挿では不確実性が増える。
- OLSとdesign matrixの定義と計算手順を区別し、数値例だけで一般性を判断しない。

X^TX inverse formulaをrank checkなしに使うと失敗。

## よくある誤解を分解する

- OLSとdesign matrixの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

OLSとdesign matrixでは、式へ数値を代入するだけでは不十分である。X^TX inverse formulaをrank checkなしに使うと失敗。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

QR/SVD `lstsq`。intercept duplication、categorical dummy trap、feature scalingを確認。

## ここから一段だけ発展する

観測noise varianceが異なるとEuclidean residual normが自然でなく、inverse-variance WLSへ。


## このTopicを理解できたか確認する問い

- 「objective gradient」を式を見ずに説明できるか
- 「solve」までの論理を一段ずつ再現できるか
- OLSとdesign matrixの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-ols-design-matrices)　|　[スライドへ](/slides/mat-ols-design-matrices/)
