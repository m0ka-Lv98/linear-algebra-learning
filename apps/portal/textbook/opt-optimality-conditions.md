# 最適性条件：教科書

Course 06｜最適化｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-smoothness-strong-convexity` で得た概念を使い、ここでは 最適性条件 へ進む。

前提として使うのは `opt-smoothness-strong-convexity` です。

## まず直感を作る

最適性条件は「これ以上改善できる方向がない」ことを勾配や劣勾配で表す。



## 図の解説

<img src="/visuals/course-06/opt-optimality-conditions.png" alt="最適性条件の図解" style="max-height: 440px; display:block; margin:0 auto;" />

等高線上で勾配が0になる点と境界点を比較する。 内部点では下降可能な方向が残らないためgradientが0になる。境界がある場合は許される方向だけで改善不能という条件へ変わり、単純なgradient=0では足りない。

## 記号・型・次元

- $\partial f(x)$：subdifferential
- $0\in\partial f(x^*)$：convex最適性条件
- $\nabla f(x^*)=0$：smooth unconstrainedの場合


## 正式な定義・代表式

differentiable convex fでは $\nabla f(x^*)=0$ がglobal optimumの必要十分条件。nonsmooth convexでは0がsubgradient集合に入ることへ一般化。

代表式は

$$
\mathbf{0}\in\partial f(\mathbf{x}^{\ast})
$$

です。

## なぜこの式・結論になるのか

### 1. convex first-order inequality

$f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。

### 2. g=0ならglobal lower bound

0∈∂f(x*)なら $f(y)\ge f(x*)$ for all y。

### 3. smooth case

differentiableなら∂f={∇f}なので条件は∇f=0。非convexではstationaryは必要でもglobal十分でない。

## 教科書が省略しやすい一段を補う


### 一階条件を方向微分から作る

unconstrained differentiable problemのlocal minimum x*で、任意direction dに対し小さいtの両符号で $f(x^*+td)\ge f(x^*)$。したがって一変数関数φ(t)=f(x*+td)はt=0で極小なので
$\phi'(0)=\nabla f(x^*)^Td=0$。
全dで内積0ならgradient=0。

constraintがあると全directionへ動けないので条件は「feasible directionでdirectional derivative≥0」へ変わる。二階条件ではHessianがpositive semidefinite必要、positive definiteならstrict local minimumの十分条件。convexなら一階条件だけでglobal optimumになる。



## 途中を飛ばさず全体をつなぐ

### 最適性条件の導出を一本につなげる

differentiable convex fでは $\nabla f(x^*)=0$ がglobal optimumの必要十分条件。nonsmooth convexでは0がsubgradient集合に入ることへ一般化。

#### 1. convex first-order inequality

まず出発点を固定する。 $f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。 次に必要になるのは「g=0ならglobal lower bound」である。

#### 2. g=0ならglobal lower bound

ここまでで得た結果を次の段階へ渡す。 0∈∂f(x*)なら $f(y)\ge f(x*)$ for all y。 次に必要になるのは「smooth case」である。

#### 3. smooth case

最後に、前二段階の結果をまとめて結論へ進む。 differentiableなら∂f={∇f}なので条件は∇f=0。非convexではstationaryは必要でもglobal十分でない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{0}\in\partial f(\mathbf{x}^{\ast})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x)=x^3$ は∇f(0)=0だがminimumでない。convexityが十分性に必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x)=x^3$ は∇f(0)=0だがminimumでない。convexityが十分性に必要。

## 成立条件と、条件を外したときに何が壊れるか

- 必要条件と十分条件を区別する。
- 非凸では停留点が鞍点のことがある。
- 最適性条件の定義と計算手順を区別し、数値例だけで一般性を判断しない。

gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

## よくある誤解を分解する

- 最適性条件の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

最適性条件では、式へ数値を代入するだけでは不十分である。gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

solver stopではgradient normだけでなくconstraint violation/KKT residualをproblem typeに応じて見る。

## ここから一段だけ発展する

最適方向が分かってもstep sizeが不適切なら下降しない。line searchへ進む。


## このTopicを理解できたか確認する問い

- 「convex first-order inequality」を式を見ずに説明できるか
- 「smooth case」までの論理を一段ずつ再現できるか
- 最適性条件の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-optimality-conditions)　|　[スライドへ](/slides/opt-optimality-conditions/)
