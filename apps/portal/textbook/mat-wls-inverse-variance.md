# WLSと逆分散重み：教科書

Course 07｜データ解析の行列手法｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-ols-design-matrices` で得た概念を使い、ここでは WLSと逆分散重み へ進む。

前提として使うのは `la-weighted-least-squares-introduction`、`stat-linear-regression-probabilistic-model` です。

## まず直感を作る

観測ごとの信頼度が異なるとき、残差を同じ重みで扱わず、分散の小さい観測を強く反映する。



## 図の解説

<img src="/visuals/course-07/mat-wls-inverse-variance.png" alt="WLSと逆分散重みの図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ散布点にOLSと逆分散WLSを当て、誤差バーの小さい点へ線が寄る様子を見る。 各点から回帰線への残差に異なる重みが掛かる。分散の小さい観測ほど信頼度が高いとき1/σ_i²で重くするのはGaussian likelihoodから導かれる。

## 記号・型・次元

- $W=diag(w_1,\ldots,w_n)\succ0$
- $w_i=1/\sigma_i²$：独立heteroscedastic noiseのinverse variance
- $r=y-Xβ$


## 正式な定義・代表式

WLSは $r^TWr=\sum_iw_ir_i²$ を最小化。$W$ がnoise precisionならGaussian likelihoodとも一致。

代表式は

$$
\hat{\boldsymbol{\beta}}=(\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{y}
$$

です。

## なぜこの式・結論になるのか

### 1. なぜinverse varianceか

$\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。

### 2. gradient

$J=(y-Xβ)^TW(y-Xβ)$。W symmetricとしてgradient $-2X^TW(y-Xβ)$。

### 3. weighted normal equation

$X^TWX\hatβ=X^TWy$。full weighted column rankなら解式。さらに $W^{1/2}$ でwhitenするとordinary LS on $W^{1/2}X,W^{1/2}y$。

## 教科書が省略しやすい一段を補う


### 逆分散重みはGaussian likelihoodから強制される

independent errors $\varepsilon_i\sim N(0,\sigma_i^2)$ とするとnegative log likelihoodのbeta依存部分は
$$
\frac12\sum_i\frac{(y_i-x_i^T\beta)^2}{\sigma_i^2}.
$$
したがってvarianceが小さい、つまり精密な観測ほどweight $w_i=1/\sigma_i^2$ が大きくなる。恣意的な「信頼度スコア」ではなく確率modelから出る。

matrixではW=diag(w_i)、objective $(y-X\beta)^TW(y-X\beta)$。$W^{1/2}$ を掛ければ $\|W^{1/2}y-W^{1/2}X\beta\|^2$ というordinary LSへ変換できる。weightsをdataから推定する場合、その不確実性は別途残る。


### 2点の平均でinverse-variance weightingを確認する

同じmean μを測る独立観測 y1,y2 with variances σ1²,σ2²についてWLSは
$\min_\mu (y_1-\mu)^2/\sigma_1^2+(y_2-\mu)^2/\sigma_2^2$。
derivative=0から
$$
\hat\mu=\frac{y_1/\sigma_1^2+y_2/\sigma_2^2}{1/\sigma_1^2+1/\sigma_2^2}.
$$
variance小さい測定が大きいweightを持つ。σ1→0ならestimateはy1へ近づく。この極限でweightの向きが直感と一致するか検算できる。

## 途中を飛ばさず全体をつなぐ

### WLSと逆分散重みの導出を一本につなげる

WLSは $r^TWr=\sum_iw_ir_i²$ を最小化。$W$ がnoise precisionならGaussian likelihoodとも一致。

#### 1. なぜinverse varianceか

まず出発点を固定する。 $\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。 次に必要になるのは「gradient」である。

#### 2. gradient

ここまでで得た結果を次の段階へ渡す。 $J=(y-Xβ)^TW(y-Xβ)$。W symmetricとしてgradient $-2X^TW(y-Xβ)$。 次に必要になるのは「weighted normal equation」である。

#### 3. weighted normal equation

最後に、前二段階の結果をまとめて結論へ進む。 $X^TWX\hatβ=X^TWy$。full weighted column rankなら解式。さらに $W^{1/2}$ でwhitenするとordinary LS on $W^{1/2}X,W^{1/2}y$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{\boldsymbol{\beta}}=(\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{y}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

全σ同じならW=cIでobjectiveがconstant倍され、OLSと同じβ。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

全σ同じならW=cIでobjectiveがconstant倍され、OLSと同じβ。

## 成立条件と、条件を外したときに何が壊れるか

- Wは通常対称正定値を想定する。
- 重みを大きくする意味は「その点を信頼する」こと。
- WLSと逆分散重みの定義と計算手順を区別し、数値例だけで一般性を判断しない。

weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

## よくある誤解を分解する

- WLSと逆分散重みの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

WLSと逆分散重みでは、式へ数値を代入するだけでは不十分である。weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

normal equationを明示形成せずweighted QR。極端なweight ratioはconditioning悪化。Wをsampleごとに推定した場合、その不確実性も考慮。

## ここから一段だけ発展する

noiseが観測間でcorrelatedならdiagonal Wでは足りず、full covariance Σ^{-1}を使うGLSへ。


## このTopicを理解できたか確認する問い

- 「なぜinverse varianceか」を式を見ずに説明できるか
- 「weighted normal equation」までの論理を一段ずつ再現できるか
- WLSと逆分散重みの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-wls-inverse-variance)　|　[スライドへ](/slides/mat-wls-inverse-variance/)
