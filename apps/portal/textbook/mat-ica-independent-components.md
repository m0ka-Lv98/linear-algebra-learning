# 独立成分分析：教科書

Course 07｜データ解析の行列手法｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-nmf-nonnegative-factors` で得た概念を使い、ここでは 独立成分分析 へ進む。

前提として使うのは `prob-joint-marginal-conditional-distributions`、`mat-whitening-mahalanobis` です。

## まず直感を作る

行列因子分解は観測行列を少数の潜在成分の積として説明する。



## 図の解説

<img src="/visuals/course-07/mat-ica-independent-components.png" alt="独立成分分析の図解" style="max-height: 440px; display:block; margin:0 auto;" />

元行列と2因子、再構成行列をheatmapで並べる。 データ行列を少数の基底と係数へ分ける。NMFなら両方を非負に制約するため、加法的なparts representationとして各成分を解釈しやすい。

## 記号・型・次元

- $s$：latent independent sources
- $A$：mixing matrix
- $x=As$
- $W\approx A^{-1}$：unmixing


## 正式な定義・代表式

ICAは観測をlinear mixtureと仮定し、componentsのstatistical independence/non-Gaussianityを利用してunmixingする。

代表式は

$$
\mathbf{x}=\mathbf{A}\mathbf{s}
$$

です。

## なぜこの式・結論になるのか

### 1. whiteningでsecond-orderを除く

center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。

### 2. なぜnon-Gaussianity

Gaussian sourcesのorthogonal rotationは同じjoint Gaussianとなりindependenceだけで方向を識別できない。

### 3. objective

kurtosis/negentropy/mutual information等を使いnon-Gaussian independent directionsを探す。

## 教科書が省略しやすい一段を補う


### uncorrelatedからindependentへ進むにはnon-Gaussianityが必要

ICA model $x=As$ はlatent components s_jがstatistically independentと仮定。まずwhiteningでcovariance Iにするとmixing ambiguityはorthogonal rotationまで減る。しかしuncorrelatedだけではrotationを決められない。

Gaussian variablesはorthogonal rotationしてもjoint Gaussian with identity covarianceでdistributionが変わらないため、all-Gaussian sourcesは識別不能。ICAはkurtosis/negentropy等non-Gaussianityを最大化して独立方向を選ぶ。scale/sign/permutation ambiguityは本質的に残る。


### なぜwhitening後も回転が残るか

whitened observation zはCov(z)=I。任意orthogonal RについてCov(Rz)=RIR^T=Iなのでsecond-order statisticsだけではRを決められない。PCA whiteningした時点でuncorrelatedにはできてもindependent componentsはまだ選べない。

そこでthird/fourth momentsやnegentropyなどGaussianからのずれを利用する。Central Limit的にindependent variablesのmixはよりGaussianに近づくため、「最もnon-Gaussianなprojection」がsource候補になるという直感がFastICA等の背景。

## 途中を飛ばさず全体をつなぐ

### 独立成分分析の導出を一本につなげる

ICAは観測をlinear mixtureと仮定し、componentsのstatistical independence/non-Gaussianityを利用してunmixingする。

#### 1. whiteningでsecond-orderを除く

まず出発点を固定する。 center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。 次に必要になるのは「なぜnon-Gaussianity」である。

#### 2. なぜnon-Gaussianity

ここまでで得た結果を次の段階へ渡す。 Gaussian sourcesのorthogonal rotationは同じjoint Gaussianとなりindependenceだけで方向を識別できない。 次に必要になるのは「objective」である。

#### 3. objective

最後に、前二段階の結果をまとめて結論へ進む。 kurtosis/negentropy/mutual information等を使いnon-Gaussian independent directionsを探す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}=\mathbf{A}\mathbf{s}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

PCAはuncorrelated、ICAはより強いindependenceを狙う。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

PCAはuncorrelated、ICAはより強いindependenceを狙う。

## 成立条件と、条件を外したときに何が壊れるか

- 非一意性がある。
- 制約（非負、独立など）が解釈を決める。
- 独立成分分析の定義と計算手順を区別し、数値例だけで一般性を判断しない。

全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

## よくある誤解を分解する

- 独立成分分析の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

独立成分分析では、式へ数値を代入するだけでは不十分である。全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

component scale/order/sign arbitrary。prewhitening、nonlinearity choice、convergenceを確認。

## ここから一段だけ発展する

2 data viewsの線形combination間のcorrelationを最大化するCCAへ。


## このTopicを理解できたか確認する問い

- 「whiteningでsecond-orderを除く」を式を見ずに説明できるか
- 「objective」までの論理を一段ずつ再現できるか
- 独立成分分析の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-ica-independent-components)　|　[スライドへ](/slides/mat-ica-independent-components/)
