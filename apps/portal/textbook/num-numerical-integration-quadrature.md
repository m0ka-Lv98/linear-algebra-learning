# 数値積分と求積法：教科書

Course 05｜数値計算｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `num-numerical-differentiation` で得た概念を使い、ここでは 数値積分と求積法 へ進む。

前提として使うのは `num-errors-conditioning-stability`、`calc-integrals-fundamental-theorem`、`num-polynomial-interpolation` です。

## まず直感を作る

数値積分は曲線下を有限個の簡単な面積へ分割して足し合わせる。



## 図の解説

<img src="/visuals/course-05/num-numerical-integration-quadrature.png" alt="数値積分と求積法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

台形則の分割数を増やし、真の面積へ近づく様子を見る。 区間を小区間へ分け、各小区間の面積近似を足したものが数値積分である。長方形・台形・高次近似で曲線下の面積への追従の仕方が変わる。

## 記号・型・次元

- $[a,b]$：積分区間
- $h=(b-a)/n$
- $x_i=a+ih$
- trapezoidal rule：各小区間を台形で近似


## 正式な定義・代表式

複合台形則は各区間でfを一次補間し、その積分を足す。代表式は端点weight1、内部weight2の形。

代表式は

$$
\int_a^bf(x)dx\approx\frac{h}{2}[f(a)+2\sum f(x_i)+f(b)]
$$

です。

## なぜこの式・結論になるのか

### 1. 1区間で線形補間

$[x_i,x_{i+1}]$ で曲線を端点を結ぶ直線へ置換。その積分は台形面積 $h(f_i+f_{i+1})/2$。

### 2. 全区間を足す

隣接区間で内部点f_iが2回現れるため、端点1回・内部2回の複合式になる。

### 3. 誤差次数

Taylorまたは補間誤差を積分すると、十分滑らかなfでglobal error O(h²)。

## 教科書が省略しやすい一段を補う


### quadrature ruleは積分をweighted sumへ置き換える

積分 $\int_a^bf(x)dx$ をnodes x_iでのfunction valuesだけから近似する形
$\sum_i w_i f(x_i)$ を考える。trapezoidal ruleは区間内をlinear interpolationしてその面積を積分したもの。Simpson ruleはquadratic interpolationを積分したものと理解できる。

Taylor展開またはinterpolation remainderを積分するとerror orderが出る。step hを半分にしたとき理論orderどおりerrorが減るかを実測することで実装検証できる。oscillatory/singular/infinite intervalでは標準ruleの仮定が崩れるのでvariable transformやspecialized quadratureが必要。



## 途中を飛ばさず全体をつなぐ

### 数値積分と求積法の導出を一本につなげる

複合台形則は各区間でfを一次補間し、その積分を足す。代表式は端点weight1、内部weight2の形。

#### 1. 1区間で線形補間

まず出発点を固定する。 $[x_i,x_{i+1}]$ で曲線を端点を結ぶ直線へ置換。その積分は台形面積 $h(f_i+f_{i+1})/2$。 次に必要になるのは「全区間を足す」である。

#### 2. 全区間を足す

ここまでで得た結果を次の段階へ渡す。 隣接区間で内部点f_iが2回現れるため、端点1回・内部2回の複合式になる。 次に必要になるのは「誤差次数」である。

#### 3. 誤差次数

最後に、前二段階の結果をまとめて結論へ進む。 Taylorまたは補間誤差を積分すると、十分滑らかなfでglobal error O(h²)。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\int_a^bf(x)dx\approx\frac{h}{2}[f(a)+2\sum f(x_i)+f(b)]
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=x$ は直線なので台形則でexact。0〜1を何分割しても1/2。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x)=x^2$, 0〜1をh=0.5で2区間：0.25[0+2(0.25)+1]=0.375、真値1/3。細分化で近づく。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

discontinuityやsingularityがあると滑らかさに基づく誤差orderが崩れる。uniform細分化が非効率な場合はadaptive quadrature。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=x$ は直線なので台形則でexact。0〜1を何分割しても1/2。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x)=x^2$, 0〜1をh=0.5で2区間：0.25[0+2(0.25)+1]=0.375、真値1/3。細分化で近づく。

## 成立条件と、条件を外したときに何が壊れるか

- 滑らかさで収束次数が変わる。
- 刻み幅と評価点数を混同しない。
- 数値積分と求積法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

discontinuityやsingularityがあると滑らかさに基づく誤差orderが崩れる。uniform細分化が非効率な場合はadaptive quadrature。

## よくある誤解を分解する

- 数値積分と求積法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

数値積分と求積法では、式へ数値を代入するだけでは不十分である。discontinuityやsingularityがあると滑らかさに基づく誤差orderが崩れる。uniform細分化が非効率な場合はadaptive quadrature。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

数値積分libraryはabsolute/relative tolerance、function evaluation数を返すことが多い。値だけでなくerror estimateを確認する。

## ここから一段だけ発展する

高次補間を積分してSimpson/Gauss quadratureへ進める。Monte Carloは次元が高いとき別の収束特性を持つ。


## このTopicを理解できたか確認する問い

- 「1区間で線形補間」を式を見ずに説明できるか
- 「誤差次数」までの論理を一段ずつ再現できるか
- 数値積分と求積法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-numerical-integration-quadrature)　|　[スライドへ](/slides/num-numerical-integration-quadrature/)
