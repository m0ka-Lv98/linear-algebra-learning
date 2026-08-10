# 不等式制約と相補性：教科書

Course 06｜最適化｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-equality-constrained-kkt` で得た概念を使い、ここでは 不等式制約と相補性 へ進む。

前提として使うのは `opt-equality-constrained-kkt` です。

## まず直感を作る

制約付き最適化では自由に動ける方向が限定され、最適点で目的勾配と制約の法線が釣り合う。



## 図の解説

<img src="/visuals/course-06/opt-inequality-constraints-kkt.png" alt="不等式制約と相補性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図の斜め直線がactive boundary $g(\mathbf x)=0$、その下側がfeasible region $g(\mathbf x)\le0$ である。点 $\mathbf x^*$ では境界に沿う矢印がtangent direction、外向き矢印が $\nabla g(\mathbf x^*)$。目的関数の等高線は $\mathbf x^*$ で境界へ接し、$\nabla f(\mathbf x^*)$ はその反対方向を向く。したがって1本のactive inequalityなら $\nabla f(\mathbf x^*)=-\lambda\nabla g(\mathbf x^*)$ と読める。図下部の active/inactive の式は、activeなら $g=0$ なので $\lambda>0$ でもよく、inactiveなら $g<0$ なのでcomplementary slacknessから $\lambda=0$ になることを示している。

## 記号・型・次元

- $g_i(x)\le0$
- $\lambda_i\ge0$
- $\lambda_i g_i(x)=0$：complementarity


## 正式な定義・代表式

convex問題でconstraint qualification下、KKTはprimal feasibility, dual feasibility, stationarity, complementarityからなる。active constraintだけがpositive multiplierを持ち得る。

代表式は

$$
\lambda_i g_i(\mathbf{x})=0,\quad\lambda_i\ge0
$$

です。

## なぜこの式・結論になるのか

### 1. inactive constraint

$g_i(x*)<0$ なら境界から余裕があり、そのconstraintはlocal tangentを制限しない。したがってλ_i=0がcomplementarityで表される。

### 2. active constraint

$g_i=0$ ではλ_i≥0がobjective gradientをfeasible側へ支えるnormal forceの係数。

### 3. stationarity

$\nabla f+\sum_iλ_i\nabla g_i=0$。等式の場合と同じnormal spanに、active inequality normalが加わる。

## 教科書が省略しやすい一段を補う


### complementary slacknessはactive constraintだけがforceを持つことを表す

inequality $g_i(x)\le0$ へmultiplier $\lambda_i\ge0$ を付ける。constraintがstrictly inactive $g_i<0$ なら、その境界はcurrent optimumを押していないので $\lambda_i=0$。activeならg_i=0でlambdaは正でもよい。これを一式で
$$
\lambda_i g_i(x)=0
$$
と書くのがcomplementary slackness。

KKTはstationarity, primal feasibility, dual feasibility, complementary slackness。convex problemで適切なconstraint qualification（Slater等）があれば必要十分になる。非凸ではKKT pointがglobal optimumとは限らない。


### 1D exampleでcomplementarityを見る

$\min (x-2)^2$ s.t. x≤1。unconstrained optimum2はinfeasibleなのでboundary x*=1。constraint g=x-1≤0、gradient f'=2(x-2)=-2 at x=1。stationarity $-2+\lambda=0$ からλ=2>0、g=0なのでλg=0。

もしconstraint x≤3ならunconstrained optimum2がfeasibleでg=-1<0、stationarityにconstraint force不要なのでλ=0。active/inactiveとmultiplierの関係を具体的に確認できる。

## 途中を飛ばさず全体をつなぐ

### 不等式制約と相補性の導出を一本につなげる

convex問題でconstraint qualification下、KKTはprimal feasibility, dual feasibility, stationarity, complementarityからなる。active constraintだけがpositive multiplierを持ち得る。

#### 1. inactive constraint

まず出発点を固定する。 $g_i(x*)<0$ なら境界から余裕があり、そのconstraintはlocal tangentを制限しない。したがってλ_i=0がcomplementarityで表される。 次に必要になるのは「active constraint」である。

#### 2. active constraint

ここまでで得た結果を次の段階へ渡す。 $g_i=0$ ではλ_i≥0がobjective gradientをfeasible側へ支えるnormal forceの係数。 次に必要になるのは「stationarity」である。

#### 3. stationarity

最後に、前二段階の結果をまとめて結論へ進む。 $\nabla f+\sum_iλ_i\nabla g_i=0$。等式の場合と同じnormal spanに、active inequality normalが加わる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\lambda_i g_i(\mathbf{x})=0,\quad\lambda_i\ge0
$$


### 具体例と一般式を往復する

本文の第一例は次の設定である。

minimize (x-2)² subject x≤1。unconstrained min2はinfeasible、境界x*=1。g=x-1, gradient f=-2 at1なので -2+λ=0→λ=2。


同じobjectiveでconstraint x≤3ならunconstrained x=2 feasibleかつinactive、λ=0。


### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

nonconvexではKKTを満たしてもglobal optimumとは限らない。constraint qualification failureでoptimumがKKTを満たさないことも。


## 例題1：小さな数値で最後まで計算する

minimize (x-2)² subject x≤1。unconstrained min2はinfeasible、境界x*=1。g=x-1, gradient f=-2 at1なので -2+λ=0→λ=2。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

同じobjectiveでconstraint x≤3ならunconstrained x=2 feasibleかつinactive、λ=0。

## 成立条件と、条件を外したときに何が壊れるか

- KKT条件には制約資格条件が関わる。
- 不等式制約では相補性を確認する。
- 不等式制約と相補性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

nonconvexではKKTを満たしてもglobal optimumとは限らない。constraint qualification failureでoptimumがKKTを満たさないことも。

## よくある誤解を分解する

- 不等式制約と相補性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

不等式制約と相補性では、式へ数値を代入するだけでは不十分である。nonconvexではKKTを満たしてもglobal optimumとは限らない。constraint qualification failureでoptimumがKKTを満たさないことも。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

solver statusとKKT residual、constraint violation、dual signを確認。scaling不良でresidual解釈が難しくなる。

## ここから一段だけ発展する

simple convex setへ直接projectionできる場合、multiplierを明示せずprojected gradientでfeasibilityを保てる。


## このTopicを理解できたか確認する問い

- 「inactive constraint」を式を見ずに説明できるか
- 「stationarity」までの論理を一段ずつ再現できるか
- 不等式制約と相補性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-inequality-constraints-kkt)　|　[スライドへ](/slides/opt-inequality-constraints-kkt/)
