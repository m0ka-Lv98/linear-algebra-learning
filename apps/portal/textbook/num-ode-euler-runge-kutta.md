# 常微分方程式・Euler法・Runge–Kutta法：教科書

Course 05｜数値計算｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `num-randomized-numerical-linear-algebra` で得た概念を使い、ここでは 常微分方程式・Euler法・Runge–Kutta法 へ進む。

前提として使うのは `calc-derivatives-rates`、`calc-integrals-fundamental-theorem`、`num-convergence-orders-stopping` です。

## まず直感を作る

ODE数値解法は微分方程式が与える局所傾きを短い時間ステップで積み重ねる。



## 図の解説

<img src="/visuals/course-05/num-ode-euler-runge-kutta.png" alt="常微分方程式・Euler法・Runge–Kutta法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

Euler法の折れ線と真の解を、刻み幅を変えながら比較する。 曲線が真の解、離散点が数値解である。各ステップでは現在点の微分方程式が与える傾きを使って次点を予測し、刻み幅が局所誤差と安定性の双方に効く。

## 記号・型・次元

- $y^{\prime}=f(t,y)$：初期値問題
- $h$：time step
- $t_k=t_0+kh$
- $y_k\approx y(t_k)$


## 正式な定義・代表式

forward Eulerは微分方程式を一次Taylorで離散化し $y_{k+1}=y_k+h f(t_k,y_k)$。Runge–Kuttaは区間内の複数slopeを組み合わせ高次精度を得る。

代表式は

$$
y_{k+1}=y_k+h f(t_k,y_k)
$$

です。

## なぜこの式・結論になるのか

### 1. Taylor展開

$y(t+h)=y(t)+hy^{\prime}(t)+O(h^2)$。ODEから $y^{\prime}=f(t,y)$。

### 2. 高次項を捨てる

$y(t+h)\approx y(t)+hf(t,y(t))$。真値y(t)を近似y_kで置換してEuler更新。

### 3. 局所からglobal error

1step truncation O(h²)でも約1/h回積み重なるためfixed intervalのglobal errorはO(h)。

## 教科書が省略しやすい一段を補う


### Euler法はODEそのもののTaylor一次近似

ODE $y'=f(t,y)$ に対しTaylor展開は
$$
y(t+h)=y(t)+hy'(t)+O(h^2)=y(t)+hf(t,y(t))+O(h^2).
$$
未知のtrue y(t)をcurrent numerical y_nで置き換えた
$y_{n+1}=y_n+hf(t_n,y_n)$
がexplicit Euler。1step local truncation O(h²)がN≈1/h step蓄積し、適切な安定性のもとglobal error O(h)になる。

Runge–Kuttaは1step内で複数傾きを評価し、高次Taylor情報をderivative formulaを直接計算せず組み合わせる。orderが高いほど常に有利ではなく、function evaluation costとstabilityを含めて選ぶ。



## 途中を飛ばさず全体をつなぐ

### 常微分方程式・Euler法・Runge–Kutta法の導出を一本につなげる

forward Eulerは微分方程式を一次Taylorで離散化し $y_{k+1}=y_k+h f(t_k,y_k)$。Runge–Kuttaは区間内の複数slopeを組み合わせ高次精度を得る。

#### 1. Taylor展開

まず出発点を固定する。 $y(t+h)=y(t)+hy^{\prime}(t)+O(h^2)$。ODEから $y^{\prime}=f(t,y)$。 次に必要になるのは「高次項を捨てる」である。

#### 2. 高次項を捨てる

ここまでで得た結果を次の段階へ渡す。 $y(t+h)\approx y(t)+hf(t,y(t))$。真値y(t)を近似y_kで置換してEuler更新。 次に必要になるのは「局所からglobal error」である。

#### 3. 局所からglobal error

最後に、前二段階の結果をまとめて結論へ進む。 1step truncation O(h²)でも約1/h回積み重なるためfixed intervalのglobal errorはO(h)。

#### 代表式へ戻す

以上をまとめた中心式は

$$
y_{k+1}=y_k+h f(t_k,y_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$y^{\prime}=-y,y(0)=1,h=0.1$。Eulerでy1=0.9、y2=0.81。真値e^-0.2≈0.8187。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

RK4は4つのslopeを使いglobal O(h^4)。同じhでEulerより高精度だが1step costも高い。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

hを粗くすると高精度法でも失敗。さらにstiff問題ではexplicit法が精度上十分小さくなくてもstabilityのため極小hを要求する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$y^{\prime}=-y,y(0)=1,h=0.1$。Eulerでy1=0.9、y2=0.81。真値e^-0.2≈0.8187。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

RK4は4つのslopeを使いglobal O(h^4)。同じhでEulerより高精度だが1step costも高い。

## 成立条件と、条件を外したときに何が壊れるか

- 安定性と精度は別問題。
- 硬い方程式では陽解法の刻み幅制約が厳しい。
- 常微分方程式・Euler法・Runge–Kutta法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

hを粗くすると高精度法でも失敗。さらにstiff問題ではexplicit法が精度上十分小さくなくてもstabilityのため極小hを要求する。

## よくある誤解を分解する

- 常微分方程式・Euler法・Runge–Kutta法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

常微分方程式・Euler法・Runge–Kutta法では、式へ数値を代入するだけでは不十分である。hを粗くすると高精度法でも失敗。さらにstiff問題ではexplicit法が精度上十分小さくなくてもstabilityのため極小hを要求する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

adaptive solverはlocal error estimateからhを調整する。rtol/atol、event detection、dense outputの意味を確認。

## ここから一段だけ発展する

次Topicでtest equationを使い、accuracyとは別のstability regionを調べる。


## このTopicを理解できたか確認する問い

- 「Taylor展開」を式を見ずに説明できるか
- 「局所からglobal error」までの論理を一段ずつ再現できるか
- 常微分方程式・Euler法・Runge–Kutta法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-ode-euler-runge-kutta)　|　[スライドへ](/slides/num-ode-euler-runge-kutta/)
