# matrix completion：教科書

Course 07｜データ解析の行列手法｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-random-projections-jl` で得た概念を使い、ここでは matrix completion へ進む。

前提として使うのは `la-low-rank-approximation`、`opt-proximal-gradient` です。

## まず直感を作る

低ランク近似はデータの主要な方向だけ残し、情報を圧縮する。



## 図の解説

<img src="/visuals/course-07/mat-matrix-completion.png" alt="matrix completionの図解" style="max-height: 440px; display:block; margin:0 auto;" />

行列画像を特異値1個、2個、…と増やして再構成する。 特異値を大きい順に並べると、各rank-1成分がデータをどれだけ強く説明するかが見える。小さい特異値の成分を落とすと低rank近似になる。

## 記号・型・次元

- $\Omega$：observed index set
- $P_\Omega$：observed entriesだけ残すoperator
- $\|M\|_*$：nuclear norm


## 正式な定義・代表式

low-rank matrix completionはobserved entriesに一致しつつrankを小さくするmatrixを探す。rank minimizationは難しいためconvex surrogate nuclear normを使うことがある。

代表式は

$$
\min_{\mathbf{M}}\|\mathbf{M}\|_*\quad\text{s.t. }P_{\Omega}(\mathbf{M})=P_{\Omega}(\mathbf{X})
$$

です。

## なぜこの式・結論になるのか

### 1. low-rank assumption

$M=UV^T$ with small rならdegrees of freedomがmnより小さく、missing entriesへconstraintを共有できる。

### 2. rank surrogate

nuclear normはsingular valuesのL1 sumでrankのconvex surrogate。

### 3. observation constraint

$P_\Omega(M)=P_\Omega(X)$ を満たす範囲で||M||_*をminimize。recoveryにはincoherence/random sampling等条件が必要。

## 教科書が省略しやすい一段を補う


### low-rankだけではmissing entriesを一意に復元できない

一部index Ωだけ観測したmatrix Mからlow-rank Xを求める。直接rank minimizationはnonconvex/combinatorialなので、convex surrogate nuclear norm $\|X\|_*=\sum_i\sigma_i$ をminimizeしobserved entriesを一致させる定式化がある。

ただしlow-rankだけで十分ではない。観測が特定rowだけに偏る、singular vectorsがcoordinate axesに集中する等ではunobserved partを決められない。incoherenceとrandom-enough samplingがrecovery theoryに必要。推薦systemではmissing-not-at-randomも問題になる。



## 途中を飛ばさず全体をつなぐ

### matrix completionの導出を一本につなげる

low-rank matrix completionはobserved entriesに一致しつつrankを小さくするmatrixを探す。rank minimizationは難しいためconvex surrogate nuclear normを使うことがある。

#### 1. low-rank assumption

まず出発点を固定する。 $M=UV^T$ with small rならdegrees of freedomがmnより小さく、missing entriesへconstraintを共有できる。 次に必要になるのは「rank surrogate」である。

#### 2. rank surrogate

ここまでで得た結果を次の段階へ渡す。 nuclear normはsingular valuesのL1 sumでrankのconvex surrogate。 次に必要になるのは「observation constraint」である。

#### 3. observation constraint

最後に、前二段階の結果をまとめて結論へ進む。 $P_\Omega(M)=P_\Omega(X)$ を満たす範囲で||M||_*をminimize。recoveryにはincoherence/random sampling等条件が必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\mathbf{M}}\|\mathbf{M}\|_*\quad\text{s.t. }P_{\Omega}(\mathbf{M})=P_{\Omega}(\mathbf{X})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

user-item rating matrixをlatent factorsで補完。ただしmissing-not-at-randomならbias。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

noisy observationsではhard equalityでなくobserved squared loss+nuclear penalty。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

1列しか観測されない等、sampling patternが偏るとlow-rankでも一意recovery不能。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

user-item rating matrixをlatent factorsで補完。ただしmissing-not-at-randomならbias。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

noisy observationsではhard equalityでなくobserved squared loss+nuclear penalty。

## 成立条件と、条件を外したときに何が壊れるか

- 打ち切りrankは情報量と誤差のトレードオフ。
- Frobenius誤差とspectral誤差の意味を区別する。
- matrix completionの定義と計算手順を区別し、数値例だけで一般性を判断しない。

1列しか観測されない等、sampling patternが偏るとlow-rankでも一意recovery不能。

## よくある誤解を分解する

- matrix completionの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

matrix completionでは、式へ数値を代入するだけでは不十分である。1列しか観測されない等、sampling patternが偏るとlow-rankでも一意recovery不能。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

alternating factorizationはscalableだがnonconvex。validationはobserved held-out entriesで。

## ここから一段だけ発展する

graphにもmatrix spectrumがあり、Laplacian eigenvectorsでgeometryを捉える。


## このTopicを理解できたか確認する問い

- 「low-rank assumption」を式を見ずに説明できるか
- 「observation constraint」までの論理を一段ずつ再現できるか
- matrix completionの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-matrix-completion)　|　[スライドへ](/slides/mat-matrix-completion/)
