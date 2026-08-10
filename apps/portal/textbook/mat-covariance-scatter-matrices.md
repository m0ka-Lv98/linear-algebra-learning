# 共分散行列とscatter matrix：教科書

Course 07｜データ解析の行列手法｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-data-matrices-centering-scaling` で得た概念を使い、ここでは 共分散行列とscatter matrix へ進む。

前提として使うのは `prob-covariance-correlation`、`la-symmetric-matrices-spectral-theorem` です。

## まず直感を作る

同時分布は複数変数の組を一度に扱い、周辺化は不要な軸を足し合わせる操作。



## 図の解説

<img src="/visuals/course-07/mat-covariance-scatter-matrices.png" alt="共分散行列とscatter matrixの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2次元ヒートマップから行・列方向に足して周辺分布を作る。 2軸は2つの変数、各セルや密度の高さは同時にその値を取る重みを表す。一方の軸方向へ足し上げる・積分すると他方だけの周辺分布が残る。

## 記号・型・次元

- $X_c\in\mathbb R^{n\times p}$
- $S=(n-1)^{-1}X_c^TX_c\in\mathbb R^{p\times p}$
- $S_{jk}$：feature j,kのsample covariance


## 正式な定義・代表式

共分散行列はcentered feature vectorのouter product平均。$S$ はsymmetric positive semidefinite。

代表式は

$$
\mathbf{S}=\frac{1}{n-1}\mathbf{X}_c^{\mathsf T}\mathbf{X}_c
$$

です。

## なぜこの式・結論になるのか

### 1. entryを展開

$(X_c^TX_c)_{jk}=\sum_i(X_{ij}-\mu_j)(X_{ik}-\mu_k)$。これはsample covariance numerator。

### 2. quadratic form

$v^TSv=(n-1)^{-1}\|X_cv\|²\ge0$ なのでPSD。

### 3. directional variance

$X_cv$ は各sampleをdirection vへprojectしたscore。したがって $v^TSv$ はそのscore variance。

## 教科書が省略しやすい一段を補う


### covariance matrixは全方向のvarianceを一つの二次形式で持つ

centered data rowを $\mathbf x_i^T$ とし
$$
\mathbf S=\frac1{n-1}\mathbf X_c^T\mathbf X_c
$$
とする。対角S_jjはfeature j variance、非対角S_jkはcovariance。任意direction $\mathbf u$ へprojectしたscalar $z_i=\mathbf u^T\mathbf x_i$ のsample varianceは
$$
\operatorname{Var}(z)=\mathbf u^T\mathbf S\mathbf u.
$$

したがってSはcoordinate pairの表だけでなく、任意directionのspreadを返すoperator。S is PSDなのは $\mathbf u^T\mathbf S\mathbf u=(n-1)^{-1}\|\mathbf X_c\mathbf u\|^2\ge0$ から直ちに分かる。



## 途中を飛ばさず全体をつなぐ

### 共分散行列とscatter matrixの導出を一本につなげる

共分散行列はcentered feature vectorのouter product平均。$S$ はsymmetric positive semidefinite。

#### 1. entryを展開

まず出発点を固定する。 $(X_c^TX_c)_{jk}=\sum_i(X_{ij}-\mu_j)(X_{ik}-\mu_k)$。これはsample covariance numerator。 次に必要になるのは「quadratic form」である。

#### 2. quadratic form

ここまでで得た結果を次の段階へ渡す。 $v^TSv=(n-1)^{-1}\|X_cv\|²\ge0$ なのでPSD。 次に必要になるのは「directional variance」である。

#### 3. directional variance

最後に、前二段階の結果をまとめて結論へ進む。 $X_cv$ は各sampleをdirection vへprojectしたscore。したがって $v^TSv$ はそのscore variance。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{S}=\frac{1}{n-1}\mathbf{X}_c^{\mathsf T}\mathbf{X}_c
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2 featuresが完全に同じならcovariance matrixはrank1。difference direction (1,-1)のvarianceは0。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

featureを標準化してからcovarianceを取るとcorrelation matrixになる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2 featuresが完全に同じならcovariance matrixはrank1。difference direction (1,-1)のvarianceは0。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

featureを標準化してからcovarianceを取るとcorrelation matrixになる。

## 成立条件と、条件を外したときに何が壊れるか

- 相関0でも一般には独立とは限らない。
- 共分散はスケール依存。
- 共分散行列とscatter matrixの定義と計算手順を区別し、数値例だけで一般性を判断しない。

centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。

## よくある誤解を分解する

- 共分散行列とscatter matrixの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

共分散行列とscatter matrixでは、式へ数値を代入するだけでは不十分である。centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

n<pではsample covarianceはrank≤n-1でsingular。inverseを必要とする手法でregularizationが必要。

## ここから一段だけ発展する

directional varianceを最大化する方向を選ぶとPCA eigenproblemが自然に出る。


## このTopicを理解できたか確認する問い

- 「entryを展開」を式を見ずに説明できるか
- 「directional variance」までの論理を一段ずつ再現できるか
- 共分散行列とscatter matrixの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-covariance-scatter-matrices)　|　[スライドへ](/slides/mat-covariance-scatter-matrices/)
