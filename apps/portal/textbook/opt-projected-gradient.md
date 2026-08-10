# 射影勾配法：教科書

Course 06｜最適化｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-inequality-constraints-kkt` で得た概念を使い、ここでは 射影勾配法 へ進む。

前提として使うのは `opt-convex-sets-functions`、`orthogonal-projection` です。

## まず直感を作る

制約付き最適化では自由に動ける方向が限定され、最適点で目的勾配と制約の法線が釣り合う。



## 図の解説

<img src="/visuals/course-06/opt-projected-gradient.png" alt="射影勾配法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

等高線と制約曲線、接点を描く。 制約境界上の接線方向では目的関数を一次的に改善できない。そのため目的gradientは境界の法線、すなわち制約gradientの線形結合になる。

## 記号・型・次元

- $\mathcal C$：closed convex feasible set
- $\Pi_C(z)=\arg\min_{x\in C}\|x-z\|$
- $\eta$：step


## 正式な定義・代表式

projected gradientは一度unconstrained gradient stepを取り、最も近いfeasible点へEuclidean projectionする。

代表式は

$$
\mathbf{x}_{k+1}=\Pi_{\mathcal{C}}(\mathbf{x}_k-\eta\nabla f(\mathbf{x}_k))
$$

です。

## なぜこの式・結論になるのか

### 1. gradient step

$z=x_k-η∇f(x_k)$ はconstraintを無視した下降候補。

### 2. projection

$x_{k+1}=Π_C(z)$ でfeasibleへ戻す。convex closed Cではprojectionは一意。

### 3. fixed point optimality

optimum x*では $x*=Π_C(x*-η∇f(x*))$ がfirst-order optimalityと対応する。

## 教科書が省略しやすい一段を補う


### gradient stepをfeasible setへ戻す

constraint set Cがsimple convexなら、まずunconstrained step $z=x-\eta\nabla f(x)$、次にEuclidean projection
$$
x^+=\Pi_C(z)=\arg\min_{y\in C}\|y-z\|^2
$$
を取る。projection optimalityから $(z-x^+)^T(y-x^+)\le0$ for all y∈C が得られ、これがconstrained descent analysisに使われる。

box constraintなら各componentをclip、simplexなら専用projection。projectionが高価なCではbarrier/proximal/Frank–Wolfe等が適する。



## 途中を飛ばさず全体をつなぐ

### 射影勾配法の導出を一本につなげる

projected gradientは一度unconstrained gradient stepを取り、最も近いfeasible点へEuclidean projectionする。

#### 1. gradient step

まず出発点を固定する。 $z=x_k-η∇f(x_k)$ はconstraintを無視した下降候補。 次に必要になるのは「projection」である。

#### 2. projection

ここまでで得た結果を次の段階へ渡す。 $x_{k+1}=Π_C(z)$ でfeasibleへ戻す。convex closed Cではprojectionは一意。 次に必要になるのは「fixed point optimality」である。

#### 3. fixed point optimality

最後に、前二段階の結果をまとめて結論へ進む。 optimum x*では $x*=Π_C(x*-η∇f(x*))$ がfirst-order optimalityと対応する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\Pi_{\mathcal{C}}(\mathbf{x}_k-\eta\nabla f(\mathbf{x}_k))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

box constraint [0,1]^nならprojectionは各成分clip。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

probability simplex projectionは単純clip後normalizeではなくthresholdを解く必要がある。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

nonconvex Cではnearest pointが複数になり、projection mapが不連続/algorithmがlocal trap。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

box constraint [0,1]^nならprojectionは各成分clip。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

probability simplex projectionは単純clip後normalizeではなくthresholdを解く必要がある。

## 成立条件と、条件を外したときに何が壊れるか

- KKT条件には制約資格条件が関わる。
- 不等式制約では相補性を確認する。
- 射影勾配法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

nonconvex Cではnearest pointが複数になり、projection mapが不連続/algorithmがlocal trap。

## よくある誤解を分解する

- 射影勾配法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

射影勾配法では、式へ数値を代入するだけでは不十分である。nonconvex Cではnearest pointが複数になり、projection mapが不連続/algorithmがlocal trap。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

projection costがobjective gradientより高い場合もある。constraint-specific efficient projectionを利用。

## ここから一段だけ発展する

projectionが難しいinequality制約はbarrierでinteriorから境界へ近づく方法がある。


## このTopicを理解できたか確認する問い

- 「gradient step」を式を見ずに説明できるか
- 「fixed point optimality」までの論理を一段ずつ再現できるか
- 射影勾配法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-projected-gradient)　|　[スライドへ](/slides/opt-projected-gradient/)
