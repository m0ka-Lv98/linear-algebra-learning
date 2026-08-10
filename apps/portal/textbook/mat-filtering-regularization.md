# filteringと正則化：教科書

Course 07｜データ解析の行列手法｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-convolution-linear-systems` で得た概念を使い、ここでは filteringと正則化 へ進む。

前提として使うのは `mat-convolution-linear-systems`、`num-regularization-ill-posed-problems` です。

## まず直感を作る

Fourier表現は信号を周波数ごとの正弦波成分へ分解し、時間領域と周波数領域を往復する。



## 図の解説

<img src="/visuals/course-07/mat-filtering-regularization.png" alt="filteringと正則化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つの周波数を足した信号とDFTスペクトルを並べる。 時間/空間領域の信号を、周波数ごとのsin/cosまたは複素指数の係数へ分解する。周期の短い成分ほど高い周波数binに現れる。

## 記号・型・次元

- $H(\omega)$：frequency response
- $\hat x(\omega)=H(\omega)x(\omega)$
- $\lambda$：regularization


## 正式な定義・代表式

linear filteringはbasis coordinateごとに係数をscaleする。inverse problemのregularizationも小singular/frequency成分を抑えるfilterとして読める。

代表式は

$$
\hat{x}(\omega)=H(\omega)x(\omega)
$$

です。

## なぜこの式・結論になるのか

### 1. convolution theorem

time convolution y=h*xはfrequencyでY=HX。

### 2. low-pass

|H|をlow frequencyで1、高frequencyでsmallにするとfast variationを抑える。

### 3. regularized inverse

naive inverse1/HはH≈0でnoise増幅。Wiener/Tikhonov等はsmall H方向のgainを抑える。

## 教科書が省略しやすい一段を補う


### filteringとinverse regularizationはsingular/frequency componentsへのgain設計

linear operatorのSVD/Fourier basisでdata componentごとに見ると、inverseはsmall response directionを大きく増幅する。filterは各componentへgain g_iを掛け、noise-dominated componentsを抑える。Tikhonovのfilter factor $\sigma_i^2/(\sigma_i^2+\lambda)$ も同じ見方で理解できる。

hard cutoffは一定threshold以下を完全に捨て、soft filterは滑らかにattenuateする。signal preservationとnoise suppressionはtrade-offであり、filterを適用した後のresidualだけでなくbiasも評価する。



## 途中を飛ばさず全体をつなぐ

### filteringと正則化の導出を一本につなげる

linear filteringはbasis coordinateごとに係数をscaleする。inverse problemのregularizationも小singular/frequency成分を抑えるfilterとして読める。

#### 1. convolution theorem

まず出発点を固定する。 time convolution y=h*xはfrequencyでY=HX。 次に必要になるのは「low-pass」である。

#### 2. low-pass

ここまでで得た結果を次の段階へ渡す。 |H|をlow frequencyで1、高frequencyでsmallにするとfast variationを抑える。 次に必要になるのは「regularized inverse」である。

#### 3. regularized inverse

最後に、前二段階の結果をまとめて結論へ進む。 naive inverse1/HはH≈0でnoise増幅。Wiener/Tikhonov等はsmall H方向のgainを抑える。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{x}(\omega)=H(\omega)x(\omega)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

finite difference noiseはhigh frequencyで大きいためlow-passでsmoothできるがedgeもblurする。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

ridge SVD filter $σ/(σ²+λ)$ もfrequency filterと同じ「不安定方向gainを抑える」構造。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

filteringで消したfrequency情報は後からexact recoveryできない。denoisingとdetail loss tradeoff。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

finite difference noiseはhigh frequencyで大きいためlow-passでsmoothできるがedgeもblurする。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

ridge SVD filter $σ/(σ²+λ)$ もfrequency filterと同じ「不安定方向gainを抑える」構造。

## 成立条件と、条件を外したときに何が壊れるか

- sampling rateとNyquist周波数を確認する。
- 位相情報も信号再構成に必要。
- filteringと正則化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

filteringで消したfrequency情報は後からexact recoveryできない。denoisingとdetail loss tradeoff。

## よくある誤解を分解する

- filteringと正則化の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

filteringと正則化では、式へ数値を代入するだけでは不十分である。filteringで消したfrequency情報は後からexact recoveryできない。denoisingとdetail loss tradeoff。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

phase response、boundary/windowを確認。filter designとdata leakage（future data使用）もtime seriesで重要。

## ここから一段だけ発展する

次はnonnegative constraintを使うfactorization NMFへ。


## このTopicを理解できたか確認する問い

- 「convolution theorem」を式を見ずに説明できるか
- 「regularized inverse」までの論理を一段ずつ再現できるか
- filteringと正則化の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-filtering-regularization)　|　[スライドへ](/slides/mat-filtering-regularization/)
