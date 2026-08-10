# 勾配降下法と収束：教科書

Course 06｜最適化｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-line-search-step-size` で得た概念を使い、ここでは 勾配降下法と収束 へ進む。

前提として使うのは `opt-line-search-step-size` です。

## まず直感を作る

一階法は局所の傾きを使って下降方向を作り、step sizeが一歩の大きさを決める。



## 図の解説

<img src="/visuals/course-06/opt-gradient-descent-convergence.png" alt="勾配降下法と収束の図解" style="max-height: 440px; display:block; margin:0 auto;" />

楕円等高線上で勾配降下の軌跡を追う。 楕円等高線に垂直な矢印がgradient、その反対向きが局所的な最急降下方向である。軌跡がジグザグするのは方向ごとの曲率が異なるためである。

## 記号・型・次元

- $x_{k+1}=x_k-\eta_k\nabla f(x_k)$
- $\eta_k$：learning rate
- $L$：smoothness
- $\mu$：strong convexity


## 正式な定義・代表式

gradientはsteepest ascent方向なのでnegative gradientが局所のsteepest descent。L-smoothならη≤1/L等で下降を保証し、strong convexならlinear rateを得る。

代表式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta_k\nabla f(\mathbf{x}_k)
$$

です。

## なぜこの式・結論になるのか

### 1. directionの導出

unit pで一次変化は∇f^Tp。Cauchy–Schwarzより最小はp=-∇f/||∇f||。

### 2. descent lemmaへ代入

$f(x-ηg)\le f(x)-η||g||²+\frac L2η²||g||²$。η≤1/Lなら少なくとも $η/2||g||²$ 下がる。

### 3. strong convex rate

μ-strong convexityとsmoothnessを組み合わせるとfunction gap/point errorが概ね $(1-μη)^k$ で減る。κ=L/μがrateを支配。

## 教科書が省略しやすい一段を補う


### gradient descentの減少式をdescent lemmaから導く

L-smooth fで $y=x-\eta\nabla f(x)$ をdescent lemmaへ代入すると
$$
f(y)\le f(x)-\eta\|\nabla f\|^2+\frac{L\eta^2}{2}\|\nabla f\|^2
=f(x)-\eta(1-L\eta/2)\|\nabla f\|^2.
$$
したがって0<η<2/Lならfunction valueは減少する。

さらにμ-strong convexならgradient normとoptimality gapが結び付き、適切なηでgapが幾何級数的に減る。convexだがstrong convexでない場合は通常sublinear。rateの違いはalgorithm名ではなく、objectiveが持つcurvature assumptionsから出る。


### quadraticでcondition numberとzig-zagを数式化する

$f(x)=\frac12x^TAx$ with SPD Aならgradient=Ax、iterationは $x_{k+1}=(I-\eta A)x_k$。A eigenbasisで各componentは $1-\eta\lambda_i$ 倍。全方向を収束させるには最大absolute factor<1が必要。

optimal fixed ηはspectrum endpointsに依存し、large κ=λ_max/λ_minではslow directionが残る。contour ellipseが細長いほどzig-zag/slow convergenceという図と、このeigencomponent updateが同じ現象を表す。

## 途中を飛ばさず全体をつなぐ

### 勾配降下法と収束の導出を一本につなげる

gradientはsteepest ascent方向なのでnegative gradientが局所のsteepest descent。L-smoothならη≤1/L等で下降を保証し、strong convexならlinear rateを得る。

#### 1. directionの導出

まず出発点を固定する。 unit pで一次変化は∇f^Tp。Cauchy–Schwarzより最小はp=-∇f/||∇f||。 次に必要になるのは「descent lemmaへ代入」である。

#### 2. descent lemmaへ代入

ここまでで得た結果を次の段階へ渡す。 $f(x-ηg)\le f(x)-η||g||²+\frac L2η²||g||²$。η≤1/Lなら少なくとも $η/2||g||²$ 下がる。 次に必要になるのは「strong convex rate」である。

#### 3. strong convex rate

最後に、前二段階の結果をまとめて結論へ進む。 μ-strong convexityとsmoothnessを組み合わせるとfunction gap/point errorが概ね $(1-μη)^k$ で減る。κ=L/μがrateを支配。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta_k\nabla f(\mathbf{x}_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=\frac12ax²$。更新x_{k+1}=(1-ηa)x_k。収束条件は|1-ηa|<1、すなわち0<η<2/a。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

2D楕円quadraticでeigenvalue差が大きいとzig-zagし遅い。scalingでκを減らすと改善。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

ηが2/L以上だと簡単なquadraticでもoscillate/diverge。gradient方向が正しくてもstepで失敗する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=\frac12ax²$。更新x_{k+1}=(1-ηa)x_k。収束条件は|1-ηa|<1、すなわち0<η<2/a。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

2D楕円quadraticでeigenvalue差が大きいとzig-zagし遅い。scalingでκを減らすと改善。

## 成立条件と、条件を外したときに何が壊れるか

- step sizeが大きすぎると発散、小さすぎると遅い。
- 勾配のスケールは変数のスケールに依存する。
- 勾配降下法と収束の定義と計算手順を区別し、数値例だけで一般性を判断しない。

ηが2/L以上だと簡単なquadraticでもoscillate/diverge。gradient方向が正しくてもstepで失敗する。

## よくある誤解を分解する

- 勾配降下法と収束の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

勾配降下法と収束では、式へ数値を代入するだけでは不十分である。ηが2/L以上だと簡単なquadraticでもoscillate/diverge。gradient方向が正しくてもstepで失敗する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

lossだけでなくgradient norm、validation、step sizeをlog。floating-pointで「lossが完全単調」を必須にしないoptimizerもある。

## ここから一段だけ発展する

past gradientsを利用してvalley方向のoscillationを抑えるmomentum/accelerated methodsへ。


## このTopicを理解できたか確認する問い

- 「directionの導出」を式を見ずに説明できるか
- 「strong convex rate」までの論理を一段ずつ再現できるか
- 勾配降下法と収束の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-gradient-descent-convergence)　|　[スライドへ](/slides/opt-gradient-descent-convergence/)
