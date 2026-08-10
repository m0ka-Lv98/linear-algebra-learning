# 浮動小数点数と丸め：教科書

Course 05｜数値計算｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 05 の入口として、浮動小数点数と丸め を定義から組み立てる。

前提として使うのは `prep-numerical-checks-reproducibility`、`prep-python-expressions-functions` です。

## まず直感を作る

浮動小数点は実数を有限ビットで近似するため、演算ごとに丸め誤差が入る。



## 図の解説

<img src="/visuals/course-05/num-floating-point-rounding.png" alt="浮動小数点数と丸めの図解" style="max-height: 440px; display:block; margin:0 auto;" />

0.1を繰り返し加えた誤差や桁落ちを対数スケールで見る。 真値と浮動小数点表現の差が各演算で小さく発生し、演算の並べ方によって蓄積・相殺される。近い数の減算では有効桁が失われる様子を数値差として示す。

## 記号・型・次元

- $x$：実数としての真値
- $\operatorname{fl}(x)$：浮動小数点で丸めた値
- $u$：unit roundoff
- $\delta$：相対丸め誤差


## 正式な定義・代表式

正規化された範囲内でround-to-nearestを仮定すると、1回の丸めを $\operatorname{fl}(x)=x(1+\delta), |\delta|\le u$ とmodel化できる。

代表式は

$$
\operatorname{fl}(x)=x(1+\delta),\quad |\delta|\le u
$$

です。

## なぜこの式・結論になるのか

### 1. 有限桁表現から量子化幅が生じる

浮動小数点はsignificandのbit数が有限なので、ある指数帯では表現可能数が一定間隔で並ぶ。真値は最寄りの表現可能数へ丸められる。

### 2. 相対誤差へ規格化する

正規化数ではspacingが値の大きさに比例するため、絶対誤差より $|fl(x)-x|/|x|$ を使うと指数帯によらずおよそ一定上限uで抑えられる。

### 3. 1+δ model

$fl(x)-x=x\delta$ と置けば $fl(x)=x(1+\delta)$。この局所modelを各演算へ適用して誤差伝播を解析する。

## 教科書が省略しやすい一段を補う


### 実数計算と浮動小数点計算を分ける

浮動小数点は実数を有限個のbit patternで近似する。正規化binaryでは概念的に $x=\pm(1.f)_2 2^e$ と表し、mantissaの有限桁の外は丸められる。したがって0.1のようにbinaryで有限展開できない数は入力時点ですでに近似値である。

relative rounding error model $\operatorname{fl}(x\circ y)=(x\circ y)(1+\delta)$、$|\delta|\lesssim u$ は1回の演算誤差を理想値に対する小さな摂動として表す。ただしoverflow/underflowやcatastrophic cancellationでは単純なrelative modelだけで意味を取りにくい。たとえば近い数a,bの差a-bは真値自体が小さいため、入力に含まれる絶対誤差が結果に対して巨大なrelative errorになる。



## 途中を飛ばさず全体をつなぐ

### 浮動小数点数と丸めの導出を一本につなげる

正規化された範囲内でround-to-nearestを仮定すると、1回の丸めを $\operatorname{fl}(x)=x(1+\delta), |\delta|\le u$ とmodel化できる。

#### 1. 有限桁表現から量子化幅が生じる

まず出発点を固定する。 浮動小数点はsignificandのbit数が有限なので、ある指数帯では表現可能数が一定間隔で並ぶ。真値は最寄りの表現可能数へ丸められる。 次に必要になるのは「相対誤差へ規格化する」である。

#### 2. 相対誤差へ規格化する

ここまでで得た結果を次の段階へ渡す。 正規化数ではspacingが値の大きさに比例するため、絶対誤差より $|fl(x)-x|/|x|$ を使うと指数帯によらずおよそ一定上限uで抑えられる。 次に必要になるのは「1+δ model」である。

#### 3. 1+δ model

最後に、前二段階の結果をまとめて結論へ進む。 $fl(x)-x=x\delta$ と置けば $fl(x)=x(1+\delta)$。この局所modelを各演算へ適用して誤差伝播を解析する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{fl}(x)=x(1+\delta),\quad |\delta|\le u
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

十進3桁で1.2345を丸めると1.23。相対誤差は約0.00365。値のscaleが変わると絶対誤差は変わるが相対誤差の考えは保たれる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

大きな数 $10^{16}$ に1を足してもdoubleでは変化が表現できないことがある。実数の加算則とmachine arithmeticは同一ではない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

underflow/overflow/subnormalでは単純な相対誤差modelがそのまま成立しない。NaN/Infも実数演算にはない状態。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

十進3桁で1.2345を丸めると1.23。相対誤差は約0.00365。値のscaleが変わると絶対誤差は変わるが相対誤差の考えは保たれる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

大きな数 $10^{16}$ に1を足してもdoubleでは変化が表現できないことがある。実数の加算則とmachine arithmeticは同一ではない。

## 成立条件と、条件を外したときに何が壊れるか

- 二進浮動小数点で10進小数を正確に表せない場合がある。
- 等号比較より許容誤差を使う。
- 浮動小数点数と丸めの定義と計算手順を区別し、数値例だけで一般性を判断しない。

underflow/overflow/subnormalでは単純な相対誤差modelがそのまま成立しない。NaN/Infも実数演算にはない状態。

## よくある誤解を分解する

- 浮動小数点数と丸めの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

浮動小数点数と丸めでは、式へ数値を代入するだけでは不十分である。underflow/overflow/subnormalでは単純な相対誤差modelがそのまま成立しない。NaN/Infも実数演算にはない状態。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

dtype、machine epsilon、rounding、overflow範囲を確認する。等号比較を許容誤差へ置き換えるときも、絶対/相対tolを問題scaleに合わせる。

## ここから一段だけ発展する

丸め誤差そのものと、問題が入力誤差を増幅するconditioning、algorithmが追加誤差を増幅するstabilityを次Topicで分離する。


## このTopicを理解できたか確認する問い

- 「有限桁表現から量子化幅が生じる」を式を見ずに説明できるか
- 「1+δ model」までの論理を一段ずつ再現できるか
- 浮動小数点数と丸めの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-floating-point-rounding)　|　[スライドへ](/slides/num-floating-point-rounding/)
