# 畳み込みと線形時不変系：教科書

Course 07｜データ解析の行列手法｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-fourier-bases-dft` で得た概念を使い、ここでは 畳み込みと線形時不変系 へ進む。

前提として使うのは `mat-fourier-bases-dft`、`la-matrices-data-linear-maps` です。

## まず直感を作る

畳み込みはkernelをずらしながら局所的な積和を取り、線形時不変系の応答を表す。



## 図の解説

<img src="/visuals/course-07/mat-convolution-linear-systems.png" alt="畳み込みと線形時不変系の図解" style="max-height: 440px; display:block; margin:0 auto;" />

短い1D信号上をkernelが移動する様子を描く。 kernelを信号上でずらしながら局所内積を取る操作を描く。Fourier領域ではこの畳み込みが周波数成分ごとの積へ変わる。

## 記号・型・次元

- $x$：input sequence
- $h$：impulse response/kernel
- $y=x*h$
- $h_{n-k}$：shifted kernel


## 正式な定義・代表式

linear time-invariant systemはimpulse responsesのlinear combinationとしてoutputを表せ、その式がconvolution。DFTでconvolution theoremにより積へ変換。

代表式は

$$
(x*h)_n=\sum_k x_k h_{n-k}
$$

です。

## なぜこの式・結論になるのか

### 1. inputをimpulse basisへ

$x=\sum_kx_k\delta_{n-k}$。

### 2. linearity+shift invariance

impulse δ shifted bykへのresponseはh_{n-k}。係数x_kでscaleし全て足す。

### 3. convolution formula

$y_n=\sum_kx_kh_{n-k}$。Fourier basisはLTI operatorのeigenfunctionsなのでfrequencyごとにH(ω)倍。

## 教科書が省略しやすい一段を補う


### LTI systemがconvolutionで完全に記述できる理由

任意discrete signalはimpulsesのlinear combination $x[n]=\sum_kx[k]\delta[n-k]$。linear time-invariant system Tへ入れると、linearityでoutputは各impulse responseの和、time invarianceで $T\delta[n-k]=h[n-k]$。よって
$$
y[n]=\sum_kx[k]h[n-k]=(x*h)[n].
$$

complex exponentialはLTIのeigenfunctionであり、convolutionはFourier domainでmultiplicationになる。filter設計はtime-domain kernelとfrequency responseの二つの表現を往復する問題。boundary handling（circular/zero padding等）は実装上のsystem定義を変える。



## 途中を飛ばさず全体をつなぐ

### 畳み込みと線形時不変系の導出を一本につなげる

linear time-invariant systemはimpulse responsesのlinear combinationとしてoutputを表せ、その式がconvolution。DFTでconvolution theoremにより積へ変換。

#### 1. inputをimpulse basisへ

まず出発点を固定する。 $x=\sum_kx_k\delta_{n-k}$。 次に必要になるのは「linearity+shift invariance」である。

#### 2. linearity+shift invariance

ここまでで得た結果を次の段階へ渡す。 impulse δ shifted bykへのresponseはh_{n-k}。係数x_kでscaleし全て足す。 次に必要になるのは「convolution formula」である。

#### 3. convolution formula

最後に、前二段階の結果をまとめて結論へ進む。 $y_n=\sum_kx_kh_{n-k}$。Fourier basisはLTI operatorのeigenfunctionsなのでfrequencyごとにH(ω)倍。

#### 代表式へ戻す

以上をまとめた中心式は

$$
(x*h)_n=\sum_k x_k h_{n-k}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

moving average h=(1/3,1/3,1/3)は近傍3点を平均しhigh-frequency variationを減らす。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

image blurも2D convolution。boundary padding choiceでedge behaviorが変わる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

correlationとconvolutionはkernel reversalの有無が異なる。DL libraryの“conv”はcross-correlation実装が多い。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

moving average h=(1/3,1/3,1/3)は近傍3点を平均しhigh-frequency variationを減らす。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

image blurも2D convolution。boundary padding choiceでedge behaviorが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- convolutionとcorrelationの反転の違いに注意。
- 境界条件で出力長が変わる。
- 畳み込みと線形時不変系の定義と計算手順を区別し、数値例だけで一般性を判断しない。

correlationとconvolutionはkernel reversalの有無が異なる。DL libraryの“conv”はcross-correlation実装が多い。

## よくある誤解を分解する

- 畳み込みと線形時不変系の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

畳み込みと線形時不変系では、式へ数値を代入するだけでは不十分である。correlationとconvolutionはkernel reversalの有無が異なる。DL libraryの“conv”はcross-correlation実装が多い。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

direct O(NK) vs FFT O(N log N)、small kernelではdirectが速いことも。padding/strideを仕様化。

## ここから一段だけ発展する

frequency response H(ω)を設計してfiltering/regularizationへ。


## このTopicを理解できたか確認する問い

- 「inputをimpulse basisへ」を式を見ずに説明できるか
- 「convolution formula」までの論理を一段ずつ再現できるか
- 畳み込みと線形時不変系の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-convolution-linear-systems)　|　[スライドへ](/slides/mat-convolution-linear-systems/)
