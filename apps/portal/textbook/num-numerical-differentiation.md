# 数値微分：教科書

Course 05｜数値計算｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `num-splines-piecewise-approximation` で得た概念を使い、ここでは 数値微分 へ進む。

前提として使うのは `num-errors-conditioning-stability`、`calc-taylor-approximation` です。

## まず直感を作る

有限差分は微分を近傍点の差で近似し、刻み幅hに打切り誤差と丸め誤差のトレードオフがある。



## 図の解説

<img src="/visuals/course-05/num-numerical-differentiation.png" alt="数値微分の図解" style="max-height: 440px; display:block; margin:0 auto;" />

hを変えて近似誤差がU字型になる様子を見る。 真の関数と近似関数の縦の差が局所誤差である。近似次数や刻み幅を変えたとき、その差が理論上の次数どおり縮むかを図で確認する。

## 記号・型・次元

- $h$：有限差分step
- $f^{\prime}(x)$：求める導関数
- 截断誤差：Taylor高次項を捨てた誤差
- 丸め誤差：有限精度による誤差


## 正式な定義・代表式

中心差分は $[f(x+h)-f(x-h)]/(2h)$ で、Taylor展開から截断誤差O(h²)。

代表式は

$$
f^{\prime}(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

です。

## なぜこの式・結論になるのか

### 1. 前後Taylor展開

$f(x\pm h)=f(x)\pm hf^{\prime}(x)+h^2f^{\prime\prime}/2\pm h^3f^{(3)}/6+\cdots$。

### 2. 引き算で偶数次を消す

$f(x+h)-f(x-h)=2hf^{\prime}(x)+h^3f^{(3)}(x)/3+\cdots$。

### 3. 2hで割る

中心差分 = $f^{\prime}(x)+O(h^2)$。ただしhを小さくしすぎると近い数の差で丸め誤差が増幅する。

## 教科書が省略しやすい一段を補う


### truncation errorとrounding errorが逆向きに働く

Taylor展開からforward difference
$$
\frac{f(x+h)-f(x)}{h}=f'(x)+\frac h2f''(\xi)
$$
なのでtruncation errorはO(h)。central differenceは奇数次項が相殺されO(h²)になる。

しかしhを無限に小さくすれば良いわけではない。f(x+h)とf(x)が非常に近くなるとsubtraction cancellationが起き、各function valueのrounding errorをhで割るためおよそO(u/h)に増幅される。総誤差はtruncationとroundingの和にU字型のtrade-offを持つ。automatic differentiationはこの有限差分近似とは異なりchain ruleをmachine precisionで伝播する。



## 途中を飛ばさず全体をつなぐ

### 数値微分の導出を一本につなげる

中心差分は $[f(x+h)-f(x-h)]/(2h)$ で、Taylor展開から截断誤差O(h²)。

#### 1. 前後Taylor展開

まず出発点を固定する。 $f(x\pm h)=f(x)\pm hf^{\prime}(x)+h^2f^{\prime\prime}/2\pm h^3f^{(3)}/6+\cdots$。 次に必要になるのは「引き算で偶数次を消す」である。

#### 2. 引き算で偶数次を消す

ここまでで得た結果を次の段階へ渡す。 $f(x+h)-f(x-h)=2hf^{\prime}(x)+h^3f^{(3)}(x)/3+\cdots$。 次に必要になるのは「2hで割る」である。

#### 3. 2hで割る

最後に、前二段階の結果をまとめて結論へ進む。 中心差分 = $f^{\prime}(x)+O(h^2)$。ただしhを小さくしすぎると近い数の差で丸め誤差が増幅する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
f^{\prime}(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=x^2$, x=1なら中心差分は任意hで [(1+h)²-(1-h)²]/2h=2 とexact。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$e^x$ ではhを10倍小さくすると最初は誤差約1/100へ減るが、machine precision付近では逆に増えるU字curve。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=x^2$, x=1なら中心差分は任意hで [(1+h)²-(1-h)²]/2h=2 とexact。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$e^x$ ではhを10倍小さくすると最初は誤差約1/100へ減るが、machine precision付近では逆に増えるU字curve。

## 成立条件と、条件を外したときに何が壊れるか

- hを小さくすれば無限に精度が上がるわけではない。
- 前進差分と中心差分で次数が違う。
- 数値微分の定義と計算手順を区別し、数値例だけで一般性を判断しない。

「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。

## よくある誤解を分解する

- 数値微分の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

数値微分では、式へ数値を代入するだけでは不十分である。「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

automatic differentiationはfinite differenceと異なり、演算graphのchain ruleでmachine precision精度の導関数を得る。gradient checkには中心差分を使える。

## ここから一段だけ発展する

積分も局所近似を区間全体へ足すことで数値化できる。


## このTopicを理解できたか確認する問い

- 「前後Taylor展開」を式を見ずに説明できるか
- 「2hで割る」までの論理を一段ずつ再現できるか
- 数値微分の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-numerical-differentiation)　|　[スライドへ](/slides/num-numerical-differentiation/)
