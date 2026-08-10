# 非線形方程式の求根法：教科書

Course 05｜数値計算｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `num-convergence-orders-stopping` で得た概念を使い、ここでは 非線形方程式の求根法 へ進む。

前提として使うのは `num-convergence-orders-stopping`、`calc-derivatives-rates` です。

## まず直感を作る

求根法はf(x)=0を直接解けないとき、現在点から次の近似点を反復的に作る。



## 図の解説

<img src="/visuals/course-05/num-root-finding.png" alt="非線形方程式の求根法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

Newton法の接線と根へのジャンプをアニメーションで追う。 曲線がf(x)、現在点で引いた接線とx軸の交点が次のNewton反復である。接線による一次近似を0と置いて解くため、x_{k+1}=x_k-f(x_k)/f'(x_k)が現れる。

## 記号・型・次元

- $f(x)=0$：求める根
- $x_k$：現在の近似
- $f^{\prime}(x_k)$：現在点の接線傾き


## 正式な定義・代表式

Newton法は現在点でfを一次Taylor近似し、その接線の根を次の近似とする。

代表式は

$$
x_{k+1}=x_k-\frac{f(x_k)}{f^{\prime}(x_k)}
$$

です。

## なぜこの式・結論になるのか

### 1. 一次Taylor近似

$f(x_k+h)\approx f(x_k)+f^{\prime}(x_k)h$。真の根付近では左辺を0にしたい。

### 2. 接線の根を解く

$0=f(x_k)+f^{\prime}(x_k)h$ から $h=-f(x_k)/f^{\prime}(x_k)$。

### 3. 更新式

$x_{k+1}=x_k+h=x_k-f(x_k)/f^{\prime}(x_k)$。単なる公式でなく局所線形modelを毎回解き直している。

## 教科書が省略しやすい一段を補う


### Newton法をTaylor一次近似から導く

現在点x_kの近くで
$$
f(x)\approx f(x_k)+f'(x_k)(x-x_k).
$$
rootでは左辺を0にしたいので、この直線近似のrootを解くと
$$
x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}.
$$
つまりNewton法は「接線のx切片へ移動する」algorithmである。simple root近傍かつf'が0でなければTaylor二次項からquadratic convergenceが導ける。

しかし初期値が遠い、f'が小さい、複数rootや極値近傍がある場合は発散・cycle・別rootへの収束が起こりうる。bisectionは遅いがsign changeを保つinterval内でglobal guaranteeを持つので、実装ではbracketingとNewtonを組み合わせることが多い。



## 途中を飛ばさず全体をつなぐ

### 非線形方程式の求根法の導出を一本につなげる

Newton法は現在点でfを一次Taylor近似し、その接線の根を次の近似とする。

#### 1. 一次Taylor近似

まず出発点を固定する。 $f(x_k+h)\approx f(x_k)+f^{\prime}(x_k)h$。真の根付近では左辺を0にしたい。 次に必要になるのは「接線の根を解く」である。

#### 2. 接線の根を解く

ここまでで得た結果を次の段階へ渡す。 $0=f(x_k)+f^{\prime}(x_k)h$ から $h=-f(x_k)/f^{\prime}(x_k)$。 次に必要になるのは「更新式」である。

#### 3. 更新式

最後に、前二段階の結果をまとめて結論へ進む。 $x_{k+1}=x_k+h=x_k-f(x_k)/f^{\prime}(x_k)$。単なる公式でなく局所線形modelを毎回解き直している。

#### 代表式へ戻す

以上をまとめた中心式は

$$
x_{k+1}=x_k-\frac{f(x_k)}{f^{\prime}(x_k)}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=x^2-2$, x0=1。x1=1.5, x2=1.41667, x3≈1.41422 と $\sqrt2$ へ急速に近づく。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

bisectionは符号変化区間を半分にして線形収束だが、連続性とbracketがあれば頑健。Newtonは速いが初期値依存。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$f^{\prime}(x_k)=0$ では更新不能。導関数が極小、rootから遠い、multiple rootでは発散・遅い・別根へ行くことがある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=x^2-2$, x0=1。x1=1.5, x2=1.41667, x3≈1.41422 と $\sqrt2$ へ急速に近づく。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

bisectionは符号変化区間を半分にして線形収束だが、連続性とbracketがあれば頑健。Newtonは速いが初期値依存。

## 成立条件と、条件を外したときに何が壊れるか

- 導関数が小さい点ではNewton法が不安定。
- 初期値によって別の根へ収束することがある。
- 非線形方程式の求根法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

$f^{\prime}(x_k)=0$ では更新不能。導関数が極小、rootから遠い、multiple rootでは発散・遅い・別根へ行くことがある。

## よくある誤解を分解する

- 非線形方程式の求根法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

非線形方程式の求根法では、式へ数値を代入するだけでは不十分である。$f^{\prime}(x_k)=0$ では更新不能。導関数が極小、rootから遠い、multiple rootでは発散・遅い・別根へ行くことがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

Newtonにbracketing/line searchを組み合わせるhybrid法が実務的。residualとstepを両方監視する。

## ここから一段だけ発展する

非線形systemではfをvector、導関数をJacobianへ置換し、各stepで線形系を解く。


## このTopicを理解できたか確認する問い

- 「一次Taylor近似」を式を見ずに説明できるか
- 「更新式」までの論理を一段ずつ再現できるか
- 非線形方程式の求根法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-root-finding)　|　[スライドへ](/slides/num-root-finding/)
