# 最小二乗法の数値解法：教科書

Course 05｜数値計算｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `num-sparse-matrices-preconditioning` で得た概念を使い、ここでは 最小二乗法の数値解法 へ進む。

前提として使うのは `la-least-squares-computation-pseudoinverse`、`la-gram-schmidt-qr`、`num-errors-conditioning-stability` です。

## まず直感を作る

方程式を厳密に満たせないとき、残差ベクトルの長さを最小にする近似解を選ぶ。



## 図の解説

<img src="/visuals/course-05/num-least-squares-qr-svd.png" alt="最小二乗法の数値解法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

散布点へ直線を当て、縦方向の残差平方和が最小になる線を比較する。 観測ベクトルbをAの列空間へ直交射影した点がA x_hatで、残差r=b-A x_hatは列空間に垂直になる。QRはこの直交座標を数値的に安定に作る。

## 記号・型・次元

- $A\in\mathbb R^{m\times n},m\ge n$
- $Q^TQ=I$
- $R$：upper triangular
- $r=b-Ax$：residual


## 正式な定義・代表式

最小二乗をnormal equationで解くとcondition numberが二乗される。QRなら $A=QR$ として直交変換でnormを保ち、triangular least squaresへ変換する。

代表式は

$$
\mathbf{A}=\mathbf{Q}\mathbf{R},\quad\min\|\mathbf{R}\mathbf{x}-\mathbf{Q}^{\mathsf T}\mathbf{b}\|_2
$$

です。

## なぜこの式・結論になるのか

### 1. QRで残差normを変換

$\|Ax-b\|=\|QRx-b\|=\|Q^Tb-Rx\|$（full Qなら直交変換が2-norm保存）。

### 2. rangeとorthogonal complementへ分解

thin QRではbをQ列空間成分 $Q^Tb$ と直交残差へ分ける。xで変えられるのは列空間成分だけ。

### 3. R系を解く

full column rankならR可逆で $Rx=Q^Tb$。normal equationのA^TA形成を避けるためconditioningを悪化させにくい。

## 教科書が省略しやすい一段を補う


### normal equationがconditionを悪化させる理由

full-column-rank Aのleast squaresでnormal equation $A^TAx=A^Tb$ は正しいが、singular values of $A^TA$ は $\sigma_i(A)^2$。したがって
$$
\kappa_2(A^TA)=\kappa_2(A)^2,
$$
となり、もともとのsensitivityを二乗してしまう。

QRならA=QR、Q^TQ=Iより $Rx=Q^Tb$ を解く。orthogonal Qは2-normを保つので余計なcondition悪化を生みにくい。rank deficiencyや非常にill-conditionedな場合はSVDでsmall singular directionsを直接診断できる。closed form inverseを作るより、problem structureに応じてQR/SVD solverを選ぶ。


### normal equation・QR・SVDを同じproblemで比較する

Aのsingular valuesを1と10^{-4}とするとκ(A)=10^4だがκ(A^TA)=10^8。normal equationはsmall directionの情報をsquareしてさらにscale separationを広げる。QRはorthogonal transformationsでnormを保ちながらtriangular solveへ変換。SVDは各singular directionを明示し、rank thresholdを設定できる。

したがって「どれも理論上同じ解」でもfinite precisionでは同じqualityではない。moderate well-conditioned full rankならQR、rank/conditioning診断が重要ならSVD、normal equationは理論理解や条件の良い特定場面に限定して考える。

## 途中を飛ばさず全体をつなぐ

### 最小二乗法の数値解法の導出を一本につなげる

最小二乗をnormal equationで解くとcondition numberが二乗される。QRなら $A=QR$ として直交変換でnormを保ち、triangular least squaresへ変換する。

#### 1. QRで残差normを変換

まず出発点を固定する。 $\|Ax-b\|=\|QRx-b\|=\|Q^Tb-Rx\|$（full Qなら直交変換が2-norm保存）。 次に必要になるのは「rangeとorthogonal complementへ分解」である。

#### 2. rangeとorthogonal complementへ分解

ここまでで得た結果を次の段階へ渡す。 thin QRではbをQ列空間成分 $Q^Tb$ と直交残差へ分ける。xで変えられるのは列空間成分だけ。 次に必要になるのは「R系を解く」である。

#### 3. R系を解く

最後に、前二段階の結果をまとめて結論へ進む。 full column rankならR可逆で $Rx=Q^Tb$。normal equationのA^TA形成を避けるためconditioningを悪化させにくい。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{A}=\mathbf{Q}\mathbf{R},\quad\min\|\mathbf{R}\mathbf{x}-\mathbf{Q}^{\mathsf T}\mathbf{b}\|_2
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Aの列がほぼ依存だとκ(A)=10^6ならκ(A^TA)≈10^12。normal equationは有効桁を大きく失う一方QRが有利。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

rank-deficient/極端に悪条件ならSVDで小さいsingular valueを明示し、minimum-normやtruncationを選べる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

理論上同じ解式でもfloating-pointでは同じ精度ではない。$(A^TA)^{-1}A^Tb$ を標準実装としない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Aの列がほぼ依存だとκ(A)=10^6ならκ(A^TA)≈10^12。normal equationは有効桁を大きく失う一方QRが有利。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

rank-deficient/極端に悪条件ならSVDで小さいsingular valueを明示し、minimum-normやtruncationを選べる。

## 成立条件と、条件を外したときに何が壊れるか

- 正規方程式だけが解法ではない。
- 悪条件ではQRやSVDが安定。
- 最小二乗法の数値解法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

理論上同じ解式でもfloating-pointでは同じ精度ではない。$(A^TA)^{-1}A^Tb$ を標準実装としない。

## よくある誤解を分解する

- 最小二乗法の数値解法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

最小二乗法の数値解法では、式へ数値を代入するだけでは不十分である。理論上同じ解式でもfloating-pointでは同じ精度ではない。$(A^TA)^{-1}A^Tb$ を標準実装としない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

`lstsq`のdriver、rank threshold、residual返却条件を確認。explicit Qが不要ならHouseholder reflectorsをcompactに保存する。

## ここから一段だけ発展する

SVDはrankと感度をsingular valueで直接見せ、low-rank computationへつながる。


## このTopicを理解できたか確認する問い

- 「QRで残差normを変換」を式を見ずに説明できるか
- 「R系を解く」までの論理を一段ずつ再現できるか
- 最小二乗法の数値解法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-least-squares-qr-svd)　|　[スライドへ](/slides/num-least-squares-qr-svd/)
