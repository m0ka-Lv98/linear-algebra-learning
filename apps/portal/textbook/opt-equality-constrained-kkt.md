# 等式制約とKKT条件：教科書

Course 06｜最適化｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-coordinate-conjugate-directions` で得た概念を使い、ここでは 等式制約とKKT条件 へ進む。

前提として使うのは `calc-lagrange-multipliers`、`opt-optimality-conditions` です。

## まず直感を作る

制約付き最適化では自由に動ける方向が限定され、最適点で目的勾配と制約の法線が釣り合う。



## 図の解説

<img src="/visuals/course-06/opt-equality-constrained-kkt.png" alt="等式制約とKKT条件の図解" style="max-height: 440px; display:block; margin:0 auto;" />

等高線と制約曲線、接点を描く。 制約境界上の接線方向では目的関数を一次的に改善できない。そのため目的gradientは境界の法線、すなわち制約gradientの線形結合になる。

## 記号・型・次元

- $g(x)=0$：m本の等式制約
- $J_g\in\mathbb R^{m\times n}$：constraint Jacobian
- $\lambda\in\mathbb R^m$：multipliers
- $\mathcal L=f+\lambda^Tg$


## 正式な定義・代表式

regularな等式制約optimumではobjective gradientがfeasible tangent spaceに直交し、constraint gradientsのspanに入るため $\nabla f+J_g^T\lambda=0$。

代表式は

$$
\nabla f(\mathbf{x})+\mathbf{J}_g(\mathbf{x})^{\mathsf T}\boldsymbol{\lambda}=\mathbf{0}
$$

です。

## なぜこの式・結論になるのか

### 1. feasible tangent

constraint curve x(t)でg(x(t))=0を微分すると $J_g d=0$。feasible first-order direction dはnull(Jg)。

### 2. optimumでdirectional derivative zero

全feasible tangent dに対し $\nabla f^Td=0$。つまり∇fはnull(Jg)のorthogonal complement。

### 3. fundamental subspace relation

$null(J_g)^\perp=range(J_g^T)$ なのであるλで $\nabla f=-J_g^Tλ$。constraint g=0と連立。

## 教科書が省略しやすい一段を補う


### Lagrange multiplierを接空間の直交条件から導く

等式constraint h(x)=0のfeasible tangent dは $J_h(x)d=0$。local optimumでは全feasible dで $\nabla f^Td=0$。線形代数より null space of J_h に直交するvectorは row space of J_h に属するため
$$
\nabla f(x^*)+J_h(x^*)^T\lambda=0.
$$
これがstationarity。

Lagrangian $L=f+\lambda^Th$ を定義するとstationarityは $\nabla_xL=0$、さらにprimal feasibility h=0。regularity（constraint gradients independent等）が壊れるとmultiplier existenceが保証されない場合がある。


### block linear systemとしてKKTを解く

quadratic $\min\frac12x^THx+c^Tx$ s.t. Ax=bではstationarity $Hx+c+A^T\lambda=0$ とconstraintをまとめ
$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}x\\\lambda\end{bmatrix}
=\begin{bmatrix}-c\\b\end{bmatrix}.
$$
このsaddle-point systemはconstraint forces λとprimal xを同時に解く。A rankやH on null(A)のpositive definitenessがuniquenessへ関係する。

## 途中を飛ばさず全体をつなぐ

### 等式制約とKKT条件の導出を一本につなげる

regularな等式制約optimumではobjective gradientがfeasible tangent spaceに直交し、constraint gradientsのspanに入るため $\nabla f+J_g^T\lambda=0$。

#### 1. feasible tangent

まず出発点を固定する。 constraint curve x(t)でg(x(t))=0を微分すると $J_g d=0$。feasible first-order direction dはnull(Jg)。 次に必要になるのは「optimumでdirectional derivative zero」である。

#### 2. optimumでdirectional derivative zero

ここまでで得た結果を次の段階へ渡す。 全feasible tangent dに対し $\nabla f^Td=0$。つまり∇fはnull(Jg)のorthogonal complement。 次に必要になるのは「fundamental subspace relation」である。

#### 3. fundamental subspace relation

最後に、前二段階の結果をまとめて結論へ進む。 $null(J_g)^\perp=range(J_g^T)$ なのであるλで $\nabla f=-J_g^Tλ$。constraint g=0と連立。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\nabla f(\mathbf{x})+\mathbf{J}_g(\mathbf{x})^{\mathsf T}\boldsymbol{\lambda}=\mathbf{0}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f=x²+y²$, constraint x+y=1。stationarity (2x,2y)+λ(1,1)=0からx=y、制約で1/2ずつ。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

線形quadratic equalityではblock KKT systemをsolveしてx,λを同時に得る。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

constraint gradientがzero/rank deficientだとregularityが壊れ、multiplier存在/一意性の標準議論が使えない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f=x²+y²$, constraint x+y=1。stationarity (2x,2y)+λ(1,1)=0からx=y、制約で1/2ずつ。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

線形quadratic equalityではblock KKT systemをsolveしてx,λを同時に得る。

## 成立条件と、条件を外したときに何が壊れるか

- KKT条件には制約資格条件が関わる。
- 不等式制約では相補性を確認する。
- 等式制約とKKT条件の定義と計算手順を区別し、数値例だけで一般性を判断しない。

constraint gradientがzero/rank deficientだとregularityが壊れ、multiplier存在/一意性の標準議論が使えない。

## よくある誤解を分解する

- 等式制約とKKT条件の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

等式制約とKKT条件では、式へ数値を代入するだけでは不十分である。constraint gradientがzero/rank deficientだとregularityが壊れ、multiplier存在/一意性の標準議論が使えない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

KKT matrixはindefinite。generic SPD solverを使わずappropriate factorization/Schur complementを選ぶ。

## ここから一段だけ発展する

inequalityではactiveかinactiveかが未知になり、multiplier非負性とcomplementarityが追加される。


## このTopicを理解できたか確認する問い

- 「feasible tangent」を式を見ずに説明できるか
- 「fundamental subspace relation」までの論理を一段ずつ再現できるか
- 等式制約とKKT条件の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-equality-constrained-kkt)　|　[スライドへ](/slides/opt-equality-constrained-kkt/)
