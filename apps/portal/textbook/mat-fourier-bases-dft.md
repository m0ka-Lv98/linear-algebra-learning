# Fourier基底とDFT：教科書

Course 07｜データ解析の行列手法｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-robust-regression-m-estimators` で得た概念を使い、ここでは Fourier基底とDFT へ進む。

前提として使うのは `prep-exponents-logarithms`、`la-orthogonal-orthonormal-bases` です。

## まず直感を作る

Fourier表現は信号を周波数ごとの正弦波成分へ分解し、時間領域と周波数領域を往復する。



## 図の解説

<img src="/visuals/course-07/mat-fourier-bases-dft.png" alt="Fourier基底とDFTの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つの周波数を足した信号とDFTスペクトルを並べる。 時間/空間領域の信号を、周波数ごとのsin/cosまたは複素指数の係数へ分解する。周期の短い成分ほど高い周波数binに現れる。

## 記号・型・次元

- $x_n,n=0,\ldots,N-1$
- $X_k$：frequency coefficient
- $e^{-2\pi i kn/N}$：complex sinusoid basis


## 正式な定義・代表式

DFTはlength-N vectorをorthogonal complex exponential basisへ展開するcoordinate transform。inverse DFTで元vectorを再構成。

代表式は

$$
X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i kn/N}
$$

です。

## なぜこの式・結論になるのか

### 1. basis orthogonality

$\sum_{n=0}^{N-1}e^{2\pi i(k-l)n/N}=0$ for k≠l, =N for k=l。geometric seriesから従う。

### 2. inner productでcoefficient

orthogonal basisへのprojectionとして $X_k=\sum_n x_ne^{-2πikn/N}$。normalization conventionはforward/inverseで分配。

### 3. reconstruction

$x_n=(1/N)\sum_kX_ke^{2πikn/N}$。orthogonalityでcross termsが消える。

## 教科書が省略しやすい一段を補う


### DFTはsignalをorthogonal complex exponential basisへ座標変換する

length N sequence x_nに対しbasis $e^{-i2\pi kn/N}$ を使い
$X_k=\sum_{n=0}^{N-1}x_ne^{-i2\pi kn/N}$。異なるkのbasis inner productは有限geometric seriesにより0、同じkならNなのでorthogonal basisになる。inverse DFTはこのbasis coefficientsからsignalを再構成する。

frequency bin kはN sample中k cyclesのoscillation。real signalではconjugate symmetryがある。FFTはDFTの定義を変えず、even/odd indexへ分割して同じ計算をO(N log N)へ再利用するalgorithm。



## 途中を飛ばさず全体をつなぐ

### Fourier基底とDFTの導出を一本につなげる

DFTはlength-N vectorをorthogonal complex exponential basisへ展開するcoordinate transform。inverse DFTで元vectorを再構成。

#### 1. basis orthogonality

まず出発点を固定する。 $\sum_{n=0}^{N-1}e^{2\pi i(k-l)n/N}=0$ for k≠l, =N for k=l。geometric seriesから従う。 次に必要になるのは「inner productでcoefficient」である。

#### 2. inner productでcoefficient

ここまでで得た結果を次の段階へ渡す。 orthogonal basisへのprojectionとして $X_k=\sum_n x_ne^{-2πikn/N}$。normalization conventionはforward/inverseで分配。 次に必要になるのは「reconstruction」である。

#### 3. reconstruction

最後に、前二段階の結果をまとめて結論へ進む。 $x_n=(1/N)\sum_kX_ke^{2πikn/N}$。orthogonalityでcross termsが消える。

#### 代表式へ戻す

以上をまとめた中心式は

$$
X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i kn/N}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

constant signal x_n=1はDC k=0 coefficient Nのみ、他frequency0。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

alternating +1,-1 (even N)はNyquist frequencyへ集中。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

DFT bin外frequencyの有限window sinusoidは1 binだけでなくspectral leakage。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

constant signal x_n=1はDC k=0 coefficient Nのみ、他frequency0。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

alternating +1,-1 (even N)はNyquist frequencyへ集中。

## 成立条件と、条件を外したときに何が壊れるか

- sampling rateとNyquist周波数を確認する。
- 位相情報も信号再構成に必要。
- Fourier基底とDFTの定義と計算手順を区別し、数値例だけで一般性を判断しない。

DFT bin外frequencyの有限window sinusoidは1 binだけでなくspectral leakage。

## よくある誤解を分解する

- Fourier基底とDFTの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Fourier基底とDFTでは、式へ数値を代入するだけでは不十分である。DFT bin外frequencyの有限window sinusoidは1 binだけでなくspectral leakage。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

FFTはDFTと同じ数学変換をO(N log N)で計算。normalization、frequency ordering、real FFT shapeを確認。

## ここから一段だけ発展する

frequency domainでconvolutionがpointwise multiplicationになる。


## このTopicを理解できたか確認する問い

- 「basis orthogonality」を式を見ずに説明できるか
- 「reconstruction」までの論理を一段ずつ再現できるか
- Fourier基底とDFTの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-fourier-bases-dft)　|　[スライドへ](/slides/mat-fourier-bases-dft/)
