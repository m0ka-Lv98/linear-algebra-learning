# ODEの安定性・硬さ・陰解法：教科書

Course 05｜数値計算｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `num-ode-euler-runge-kutta` で得た概念を使い、ここでは ODEの安定性・硬さ・陰解法 へ進む。

前提として使うのは `num-ode-euler-runge-kutta`、`num-errors-conditioning-stability` です。

## まず直感を作る

ODE数値解法は微分方程式が与える局所傾きを短い時間ステップで積み重ねる。



## 図の解説

<img src="/visuals/course-05/num-ode-stability-stiffness.png" alt="ODEの安定性・硬さ・陰解法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

Euler法の折れ線と真の解を、刻み幅を変えながら比較する。 曲線が真の解、離散点が数値解である。各ステップでは現在点の微分方程式が与える傾きを使って次点を予測し、刻み幅が局所誤差と安定性の双方に効く。

## 記号・型・次元

- $y^{\prime}=\lambda y$：test equation
- $z=h\lambda$
- $R(z)$：数値法のamplification factor


## 正式な定義・代表式

数値安定性は真の解が減衰する問題で離散解も不要に増幅しないこと。implicit Eulerでは $y_{k+1}=y_k/(1-h\lambda)$。

代表式は

$$
y_{k+1}=y_k+h\lambda y_{k+1}
$$

です。

## なぜこの式・結論になるのか

### 1. explicit Euler

$y_{k+1}=(1+h\lambda)y_k$。反復で $|1+z|^k$ なので減衰には $|1+z|<1$。

### 2. implicit Euler

$y_{k+1}=y_k+h\lambda y_{k+1}$ を解いて $y_{k+1}=y_k/(1-z)$。負実λでは任意h>0でmodulus<1。

### 3. stiffness

速い減衰modeの大きい|λ|がexplicit stepを極小に制限する一方、興味あるslow dynamicsは長時間scale。accuracyでなくstabilityがstepを決める状態。

## 教科書が省略しやすい一段を補う


### test equationでstability regionを調べる理由

線形test equation $y'=\lambda y$ にEulerを適用すると
$y_{n+1}=(1+h\lambda)y_n$。true solutionがdecayするRe(λ)<0でも、numerical solutionがdecayするには
$$
|1+h\lambda|<1
$$
が必要。これがEulerのstability region。

stiff systemでは非常にfast-decay modeがあるためaccuracy上必要なhよりstability制約がはるかに厳しくなる。implicit Eulerはamplification $1/(1-h\lambda)$ でnegative real axisに強く、大きいhでもstable。ただし各stepでnonlinear/linear solveが必要になる。


### accuracyを満たしてもunstableになり得る

$y'=-1000y$ のtrue solutionは急速に0へdecay。explicit Euler factorは1-1000h。h=0.01ならfactor=-9でabsolute value>1、true solutionはdecayなのにnumerical solutionは符号を変えながら爆発する。stabilityにはh<0.002が必要。

implicit Euler factorは1/(1+1000h)なので任意h>0でabsolute<1。stiffnessとは「fast modeをaccuracy上追う必要が薄くてもexplicit stabilityのためtiny hを強制される」状況として理解できる。

## 途中を飛ばさず全体をつなぐ

### ODEの安定性・硬さ・陰解法の導出を一本につなげる

数値安定性は真の解が減衰する問題で離散解も不要に増幅しないこと。implicit Eulerでは $y_{k+1}=y_k/(1-h\lambda)$。

#### 1. explicit Euler

まず出発点を固定する。 $y_{k+1}=(1+h\lambda)y_k$。反復で $|1+z|^k$ なので減衰には $|1+z|<1$。 次に必要になるのは「implicit Euler」である。

#### 2. implicit Euler

ここまでで得た結果を次の段階へ渡す。 $y_{k+1}=y_k+h\lambda y_{k+1}$ を解いて $y_{k+1}=y_k/(1-z)$。負実λでは任意h>0でmodulus<1。 次に必要になるのは「stiffness」である。

#### 3. stiffness

最後に、前二段階の結果をまとめて結論へ進む。 速い減衰modeの大きい|λ|がexplicit stepを極小に制限する一方、興味あるslow dynamicsは長時間scale。accuracyでなくstabilityがstepを決める状態。

#### 代表式へ戻す

以上をまとめた中心式は

$$
y_{k+1}=y_k+h\lambda y_{k+1}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

λ=-100, h=0.05。explicit factor=1-5=-4で発散、真解は減衰。implicit factor=1/6で安定。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

h=0.005ならexplicit factor0.5で安定だが、長時間積分では大量stepが必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

implicit法は「無条件に正確」ではない。A-stableでも大hでは位相/振幅誤差が大きい。stabilityとaccuracyを区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

λ=-100, h=0.05。explicit factor=1-5=-4で発散、真解は減衰。implicit factor=1/6で安定。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

h=0.005ならexplicit factor0.5で安定だが、長時間積分では大量stepが必要。

## 成立条件と、条件を外したときに何が壊れるか

- 安定性と精度は別問題。
- 硬い方程式では陽解法の刻み幅制約が厳しい。
- ODEの安定性・硬さ・陰解法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

implicit法は「無条件に正確」ではない。A-stableでも大hでは位相/振幅誤差が大きい。stabilityとaccuracyを区別する。

## よくある誤解を分解する

- ODEの安定性・硬さ・陰解法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

ODEの安定性・硬さ・陰解法では、式へ数値を代入するだけでは不十分である。implicit法は「無条件に正確」ではない。A-stableでも大hでは位相/振幅誤差が大きい。stabilityとaccuracyを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

stiff solver(BDF/Radau)のJacobian利用でcostが変わる。solver failure理由をstep underflow等まで記録。

## ここから一段だけ発展する

ODE以外の高次元積分・期待値ではsamplingに基づくMonte Carloが別の数値道具として現れる。


## このTopicを理解できたか確認する問い

- 「explicit Euler」を式を見ずに説明できるか
- 「stiffness」までの論理を一段ずつ再現できるか
- ODEの安定性・硬さ・陰解法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-ode-stability-stiffness)　|　[スライドへ](/slides/num-ode-stability-stiffness/)
