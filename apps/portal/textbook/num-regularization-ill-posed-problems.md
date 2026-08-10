# 正則化と悪条件・不適切問題：教科書

Course 05｜数値計算｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `num-svd-low-rank-computation` で得た概念を使い、ここでは 正則化と悪条件・不適切問題 へ進む。

前提として使うのは `num-least-squares-qr-svd`、`num-svd-low-rank-computation`、`la-matrix-norms-condition-number` です。

## まず直感を作る

逆問題では観測ノイズが小さい特異値方向で大きく増幅されるため、正則化で安定性と忠実度を調整する。



## 図の解説

<img src="/visuals/course-05/num-regularization-ill-posed-problems.png" alt="正則化と悪条件・不適切問題の図解" style="max-height: 440px; display:block; margin:0 auto;" />

λを変えたときの残差と解ノルムのトレードオフを見る。 小さい特異値方向では観測ノイズが逆演算で1/σ_i倍に増幅される。正則化はその方向の逆増幅を抑え、biasとvarianceを交換する。

## 記号・型・次元

- $\lambda\ge0$：regularization強度
- $\|Ax-b\|^2$：data fit
- $\|x\|^2$：solution size penalty


## 正式な定義・代表式

Tikhonov/ridgeはfitだけで不安定な解に、解の大きさpenaltyを加える。normal equationは $(A^TA+\lambda I)x=A^Tb$。

代表式は

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x}-\mathbf{b}\|_2^2+\lambda\|\mathbf{x}\|_2^2
$$

です。

## なぜこの式・結論になるのか

### 1. 目的関数を微分

$J(x)=\|Ax-b\|^2+\lambda\|x\|^2$。gradientは $2A^T(Ax-b)+2\lambda x$。

### 2. stationary条件

0と置き $(A^TA+\lambda I)x=A^Tb$。λ>0ならnull方向にもcurvatureが加わる。

### 3. SVD filterとして読む

各singular方向の係数は $\sigma_i/(\sigma_i^2+\lambda)$。小σ方向の $1/\sigma_i$ 爆発を抑える。

## 教科書が省略しやすい一段を補う


### Tikhonov regularizationがsmall singular directionを抑える

least squaresへ $\lambda\|x\|^2$ を加えると
$$
(A^TA+\lambda I)x=A^Tb.
$$
SVD basisで見ると各coefficientは $\sigma_i/(\sigma_i^2+\lambda)$ 倍でdata成分を受け取る。inverseの1/σ_iと比べ、σ_iが小さい方向でgainがboundedになりnoise amplificationを抑える。

lambda=0ならfit重視、large lambdaならsolution shrink。regularizationはill-posednessを魔法のように消すのでなく、data fitとprior/smoothnessのtrade-offを明示的に選ぶ。L-curve, CV, discrepancy principle等でparameter選択を検討する。


### regularization parameterの極限を確認する

ridge/Tikhonov solution filter $\sigma_i/(\sigma_i^2+\lambda)$ はλ→0でnonzero σ_iに対し1/σ_iへ近づきunregularized inverse、λ→∞で0へ近づきsolutionを0へ縮める。つまりlambdaの意味を両極端で検算できる。

small σ_i方向ではλがσ_i²より大きいとgain≈σ_i/λとなり強く抑制、large directionはほぼ1/σ_iを保つ。regularizationは全方向を一様に小さくするのでなく、spectrumに応じて相対的にsmall directionsを強く抑える。

## 途中を飛ばさず全体をつなぐ

### 正則化と悪条件・不適切問題の導出を一本につなげる

Tikhonov/ridgeはfitだけで不安定な解に、解の大きさpenaltyを加える。normal equationは $(A^TA+\lambda I)x=A^Tb$。

#### 1. 目的関数を微分

まず出発点を固定する。 $J(x)=\|Ax-b\|^2+\lambda\|x\|^2$。gradientは $2A^T(Ax-b)+2\lambda x$。 次に必要になるのは「stationary条件」である。

#### 2. stationary条件

ここまでで得た結果を次の段階へ渡す。 0と置き $(A^TA+\lambda I)x=A^Tb$。λ>0ならnull方向にもcurvatureが加わる。 次に必要になるのは「SVD filterとして読む」である。

#### 3. SVD filterとして読む

最後に、前二段階の結果をまとめて結論へ進む。 各singular方向の係数は $\sigma_i/(\sigma_i^2+\lambda)$。小σ方向の $1/\sigma_i$ 爆発を抑える。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x}-\mathbf{b}\|_2^2+\lambda\|\mathbf{x}\|_2^2
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

σ=0.001方向をnaive inverseすると1000倍。λ=0.01ならfilter≈0.09999でnoise amplificationを強く抑える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

λが大きすぎると安定だがbiasが大きく、解が0へ縮みすぎる。stabilityとfitのtradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

σ=0.001方向をnaive inverseすると1000倍。λ=0.01ならfilter≈0.09999でnoise amplificationを強く抑える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

λが大きすぎると安定だがbiasが大きく、解が0へ縮みすぎる。stabilityとfitのtradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- λ=0が常に最良ではない。
- 正則化はバイアスを導入して分散を抑える。
- 正則化と悪条件・不適切問題の定義と計算手順を区別し、数値例だけで一般性を判断しない。

regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。

## よくある誤解を分解する

- 正則化と悪条件・不適切問題の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

正則化と悪条件・不適切問題では、式へ数値を代入するだけでは不十分である。regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

λはvalidation, L-curve, GCV等で選ぶ。feature scalingがpenalty効果へ直接影響するため標準化を検討。

## ここから一段だけ発展する

large matrixではfull SVDを避けrandomized range finderでdominant subspaceを近似する方法がある。


## このTopicを理解できたか確認する問い

- 「目的関数を微分」を式を見ずに説明できるか
- 「SVD filterとして読む」までの論理を一段ずつ再現できるか
- 正則化と悪条件・不適切問題の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-regularization-ill-posed-problems)　|　[スライドへ](/slides/num-regularization-ill-posed-problems/)
