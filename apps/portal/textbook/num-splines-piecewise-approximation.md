# splineと区分的近似：教科書

Course 05｜数値計算｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `num-polynomial-interpolation` で得た概念を使い、ここでは splineと区分的近似 へ進む。

前提として使うのは `num-polynomial-interpolation`、`calc-derivatives-rates` です。

## まず直感を作る

補間は与えられた点を通る近似関数を構成し、区間内の値を推定する。



## 図の解説

<img src="/visuals/course-05/num-splines-piecewise-approximation.png" alt="splineと区分的近似の図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ点に高次多項式と区分的splineを当て、振動の違いを見る。 点は必ず通るという制約を保ちながら、1本の高次多項式と区分的低次多項式では点間の振る舞いが異なる。端での振動は「点を通る」ことと「安定に近似する」ことが別である例である。

## 記号・型・次元

- $x_i$：knot
- $s_i(x)$：区間 $[x_i,x_{i+1}]$ のcubic
- $s,s^{\prime},s^{\prime\prime}$：通常連続に接続


## 正式な定義・代表式

cubic splineは各区間を3次多項式で表し、knotで値・一次・二次導関数を接続する。boundary条件で一意化する。

代表式は

$$
s_i(x)=a_i+b_i(x-x_i)+c_i(x-x_i)^2+d_i(x-x_i)^3
$$

です。

## なぜこの式・結論になるのか

### 1. 各区間4係数

m区間なら4m未知数。各区間の両端値条件で2m、内部knotの一階・二階連続で2(m-1)条件。

### 2. 残る2自由度

合計4m-2条件なので2条件不足。natural splineなら両端二階導関数0などboundary conditionを足す。

### 3. 局所性

全体を1個の高次数多項式にせず、低次数pieceを滑らかにつなぐため局所変更の影響が比較的局所化される。

## 教科書が省略しやすい一段を補う


### splineはglobal high degreeを避けてsmoothnessを接続条件で作る

区間ごとにcubic polynomialを置けば各pieceに4 coefficientがある。隣接intervalの境界でfunction value、first derivative、second derivativeを一致させるとC² smoothな一本のcurveになる。さらにdata interpolation条件と端点boundary conditionを加えると係数が決まる。

局所pieceを使うため、一点のdata変更が全区間を激しく振動させにくく、global high-degree polynomialよりstable。natural cubic splineでは両端second derivative=0などの条件を使う。splineが「点を滑らかにつなぐ」理由は、単にcubicだからではなく、この連続性制約を系統的に課しているからである。



## 途中を飛ばさず全体をつなぐ

### splineと区分的近似の導出を一本につなげる

cubic splineは各区間を3次多項式で表し、knotで値・一次・二次導関数を接続する。boundary条件で一意化する。

#### 1. 各区間4係数

まず出発点を固定する。 m区間なら4m未知数。各区間の両端値条件で2m、内部knotの一階・二階連続で2(m-1)条件。 次に必要になるのは「残る2自由度」である。

#### 2. 残る2自由度

ここまでで得た結果を次の段階へ渡す。 合計4m-2条件なので2条件不足。natural splineなら両端二階導関数0などboundary conditionを足す。 次に必要になるのは「局所性」である。

#### 3. 局所性

最後に、前二段階の結果をまとめて結論へ進む。 全体を1個の高次数多項式にせず、低次数pieceを滑らかにつなぐため局所変更の影響が比較的局所化される。

#### 代表式へ戻す

以上をまとめた中心式は

$$
s_i(x)=a_i+b_i(x-x_i)+c_i(x-x_i)^2+d_i(x-x_i)^3
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

3点を2区間cubicで結ぶと、値一致に加え中間knotで傾き・曲率を一致させる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

linear splineはC0連続だがknotで傾きが折れる。cubic splineは通常C2で見た目・微分量も滑らか。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

boundary条件を指定せず「cubic spline」とだけ言うと解が一意でない。natural, clamped等を区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

3点を2区間cubicで結ぶと、値一致に加え中間knotで傾き・曲率を一致させる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

linear splineはC0連続だがknotで傾きが折れる。cubic splineは通常C2で見た目・微分量も滑らか。

## 成立条件と、条件を外したときに何が壊れるか

- 補間と回帰を混同しない。
- 高次多項式は端で振動しやすい。
- splineと区分的近似の定義と計算手順を区別し、数値例だけで一般性を判断しない。

boundary条件を指定せず「cubic spline」とだけ言うと解が一意でない。natural, clamped等を区別する。

## よくある誤解を分解する

- splineと区分的近似の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

splineと区分的近似では、式へ数値を代入するだけでは不十分である。boundary条件を指定せず「cubic spline」とだけ言うと解が一意でない。natural, clamped等を区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

scipy splineのbc_typeとextrapolation挙動を確認。データnoiseがある場合はinterpolating splineよりsmoothing splineが適切なこともある。

## ここから一段だけ発展する

補間多項式を使って微分・積分を近似すると数値微分・求積法へつながる。


## このTopicを理解できたか確認する問い

- 「各区間4係数」を式を見ずに説明できるか
- 「局所性」までの論理を一段ずつ再現できるか
- splineと区分的近似の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-splines-piecewise-approximation)　|　[スライドへ](/slides/num-splines-piecewise-approximation/)
