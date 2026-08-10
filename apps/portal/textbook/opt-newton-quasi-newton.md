# Newton法と準Newton法：教科書

Course 06｜最適化｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-momentum-accelerated-gradient` で得た概念を使い、ここでは Newton法と準Newton法 へ進む。

前提として使うのは `opt-gradient-descent-convergence`、`calc-hessian-second-order` です。

## まず直感を作る

二階法は勾配だけでなく曲率を使い、局所二次モデルを解いて進行方向と距離を決める。



## 図の解説

<img src="/visuals/course-06/opt-newton-quasi-newton.png" alt="Newton法と準Newton法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ二次関数で勾配法とNewton法の軌跡を比較する。 二次近似の楕円はHessianが決める局所曲率を表す。Newton stepはgradientだけでなくこの楕円の伸びを補正して、二次モデルの最小点へ直接向かう。

## 記号・型・次元

- $g=\nabla f(x)$
- $H=\nabla²f(x)$：Hessian
- $p$：Newton step


## 正式な定義・代表式

Newton法は二次Taylor model $m(p)=f+g^Tp+\frac12p^THp$ を最小化し、$Hp=-g$ を解く。quasi-Newtonはgradient差からH/H^{-1}を近似。

代表式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\mathbf{H}_f(\mathbf{x}_k)^{-1}\nabla f(\mathbf{x}_k)
$$

です。

## なぜこの式・結論になるのか

### 1. 二次model

$f(x+p)\approx f(x)+g^Tp+\frac12p^THp$。

### 2. modelをpで微分

$\nabla_p m=g+Hp$（H symmetric）。0と置き $Hp=-g$。

### 3. なぜinverseを明示しないか

式はp=-H^{-1}gと書けるが数値実装はlinear solve。HがSPDならdescent direction。

## 教科書が省略しやすい一段を補う


### Newton stepは二次Taylor modelを直接最小化する

点xで
$$
m(p)=f(x)+g^Tp+\frac12p^THp
$$
と二次近似する。H positive definiteならmのgradientを0にして
$g+Hp=0$、よって $p=-H^{-1}g$。これがNewton step。gradientの大きさだけでなくcurvatureに応じ各directionのstepをscaleする。

Hessian構築・solveが高価ならBFGS/L-BFGSはgradient差からinverse-Hessian近似を更新する。Newtonはroot近傍でquadratic convergenceしうるが、H indefiniteならdescent directionでないこともありdamping/trust regionが必要。


### Newton法がaffine scalingに強い理由

quadratic f with SPD HではNewton step $p=-H^{-1}g$ はどのstarting pointからも一stepでminimizerへ行く。gradient descentがellipse axesで異なるscaleに苦しむのに対し、H^{-1}が各eigen directionを1/λ_iでrescaleしてcurvature差を打ち消すため。

nonquadraticではHはlocal curvatureなので一step exactではない。far from optimumではdamping/trust region、indefinite Hessianのnegative curvature処理が必要。

## 途中を飛ばさず全体をつなぐ

### Newton法と準Newton法の導出を一本につなげる

Newton法は二次Taylor model $m(p)=f+g^Tp+\frac12p^THp$ を最小化し、$Hp=-g$ を解く。quasi-Newtonはgradient差からH/H^{-1}を近似。

#### 1. 二次model

まず出発点を固定する。 $f(x+p)\approx f(x)+g^Tp+\frac12p^THp$。 次に必要になるのは「modelをpで微分」である。

#### 2. modelをpで微分

ここまでで得た結果を次の段階へ渡す。 $\nabla_p m=g+Hp$（H symmetric）。0と置き $Hp=-g$。 次に必要になるのは「なぜinverseを明示しないか」である。

#### 3. なぜinverseを明示しないか

最後に、前二段階の結果をまとめて結論へ進む。 式はp=-H^{-1}gと書けるが数値実装はlinear solve。HがSPDならdescent direction。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\mathbf{H}_f(\mathbf{x}_k)^{-1}\nabla f(\mathbf{x}_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=\frac12x^TAx-b^Tx$ ではH=A一定。Newton stepはAx=bを一回解くのでexact minimizerへ1step。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

BFGSはsecant conditionを満たしつつpositive definitenessを保つupdateで、Hessian計算costを避ける。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

nonconvexでHがindefiniteならNewton directionがdescentでない。line search/trust region/dampingが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=\frac12x^TAx-b^Tx$ ではH=A一定。Newton stepはAx=bを一回解くのでexact minimizerへ1step。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

BFGSはsecant conditionを満たしつつpositive definitenessを保つupdateで、Hessian計算costを避ける。

## 成立条件と、条件を外したときに何が壊れるか

- Hessianが正定値でないと下降方向にならないことがある。
- 線形方程式を解くコストも考える。
- Newton法と準Newton法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

nonconvexでHがindefiniteならNewton directionがdescentでない。line search/trust region/dampingが必要。

## よくある誤解を分解する

- Newton法と準Newton法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Newton法と準Newton法では、式へ数値を代入するだけでは不十分である。nonconvexでHがindefiniteならNewton directionがdescentでない。line search/trust region/dampingが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

H inverseを作らずsolve。大規模ではHessian-vector product + CG、L-BFGS。

## ここから一段だけ発展する

二次modelを「どこまで信用するか」を明示するtrust regionへ。


## このTopicを理解できたか確認する問い

- 「二次model」を式を見ずに説明できるか
- 「なぜinverseを明示しないか」までの論理を一段ずつ再現できるか
- Newton法と準Newton法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-newton-quasi-newton)　|　[スライドへ](/slides/opt-newton-quasi-newton/)
