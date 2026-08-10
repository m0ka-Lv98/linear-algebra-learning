# 凸集合と凸関数：教科書

Course 06｜最適化｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-problem-formulation-objectives-constraints` で得た概念を使い、ここでは 凸集合と凸関数 へ進む。

前提として使うのは `opt-problem-formulation-objectives-constraints`、`la-span-subspaces` です。

## まず直感を作る

凸性があると局所最小が大域最小になり、最適化の幾何が大幅に単純になる。



## 図の解説

<img src="/visuals/course-06/opt-convex-sets-functions.png" alt="凸集合と凸関数の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2点を結ぶ線分と関数グラフを描き、chordより下にある条件を見る。 2点を結ぶ線分全体が集合内に残るのが凸集合である。関数では2点を結ぶchordよりgraphが上へ出ないことがJensen型不等式に対応する。

## 記号・型・次元

- $\theta\in[0,1]$
- $\theta x+(1-\theta)y$：2点を結ぶ線分上の点
- $\mathcal C$：convex set
- $f$：convex function


## 正式な定義・代表式

集合Cがconvexとは任意x,y∈Cの線分全体がC内。fがconvexとはgraphがchord以下、すなわち $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$。

代表式は

$$
f(\theta\mathbf{x}+(1-\theta)\mathbf{y})\le\theta f(\mathbf{x})+(1-\theta)f(\mathbf{y})
$$

です。

## なぜこの式・結論になるのか

### 1. 線分のparameterization

θ=0でy、θ=1でx、その間がstraight segment。これを全て含むことが凸集合。

### 2. 関数のepigraphで見る

epigraph $\{(x,t):t\ge f(x)\}$ がconvexであることとf convexは同値。chordよりgraphが下という幾何になる。

### 3. local minimumがglobal

convex fでlocal minimizer x*より低いyがあると、x*とyの線分上のx*近傍でもconvexityによりfが下がりlocal minimumに矛盾。

## 教科書が省略しやすい一段を補う


### convexityがlocal informationをglobal guaranteeへ変える

set Cがconvexとは任意x,y∈Cと0≤t≤1に対し $tx+(1-t)y\in C$。function fがconvexとは
$$
f(tx+(1-t)y)\le tf(x)+(1-t)f(y).
$$
微分可能なら $f(y)\ge f(x)+\nabla f(x)^T(y-x)$、つまり全graphが各tangent planeの上にあることと同値。

この不等式でstationary point $\nabla f(x^*)=0$ を代入すると $f(y)\ge f(x^*)$ が全yで成り立つため、local minimumがglobal minimumになる。凸性の価値は「曲線が丸い」ことではなく、一階条件だけで大域最適性を保証できる点にある。


### Hessian criterionは二階Taylorから理解する

C² functionでHessian PSD everywhereなら任意line $\phi(t)=f(x+t(y-x))$ のsecond derivative $\phi''(t)=(y-x)^TH(y-x)\ge0$。一変数convexityが全lineで成立するためfはconvex。逆もinteriorで同様にHessian PSDが必要。

このcriterionは計算しやすいが、nonsmooth convex function |x| のようにHessianが存在しなくてもconvexな例がある。定義→一階criterion→二階criterionは仮定が順に強くなる。

## 途中を飛ばさず全体をつなぐ

### 凸集合と凸関数の導出を一本につなげる

集合Cがconvexとは任意x,y∈Cの線分全体がC内。fがconvexとはgraphがchord以下、すなわち $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$。

#### 1. 線分のparameterization

まず出発点を固定する。 θ=0でy、θ=1でx、その間がstraight segment。これを全て含むことが凸集合。 次に必要になるのは「関数のepigraphで見る」である。

#### 2. 関数のepigraphで見る

ここまでで得た結果を次の段階へ渡す。 epigraph $\{(x,t):t\ge f(x)\}$ がconvexであることとf convexは同値。chordよりgraphが下という幾何になる。 次に必要になるのは「local minimumがglobal」である。

#### 3. local minimumがglobal

最後に、前二段階の結果をまとめて結論へ進む。 convex fでlocal minimizer x*より低いyがあると、x*とyの線分上のx*近傍でもconvexityによりfが下がりlocal minimumに矛盾。

#### 代表式へ戻す

以上をまとめた中心式は

$$
f(\theta\mathbf{x}+(1-\theta)\mathbf{y})\le\theta f(\mathbf{x})+(1-\theta)f(\mathbf{y})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

quadratic f(x)=x²はconvex。second derivative2>0。line segment inequalityも平方完成で確認できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

annulusは非convex。内側の穴をまたぐ2点のmidpointが集合外。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

constraintの各式がlinearでも「≠」やdiscrete constraintを入れるとfeasible setが非convexになることがある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

quadratic f(x)=x²はconvex。second derivative2>0。line segment inequalityも平方完成で確認できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

annulusは非convex。内側の穴をまたぐ2点のmidpointが集合外。

## 成立条件と、条件を外したときに何が壊れるか

- 凸集合と凸関数を区別する。
- 強凸性は単なる厳密凸性より強い。
- 凸集合と凸関数の定義と計算手順を区別し、数値例だけで一般性を判断しない。

constraintの各式がlinearでも「≠」やdiscrete constraintを入れるとfeasible setが非convexになることがある。

## よくある誤解を分解する

- 凸集合と凸関数の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

凸集合と凸関数では、式へ数値を代入するだけでは不十分である。constraintの各式がlinearでも「≠」やdiscrete constraintを入れるとfeasible setが非convexになることがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

CVX/DCPはcomposition ruleでconvexityを機械検証する。solverが「local optimum」と返す非convex problemとconvex guaranteeを区別。

## ここから一段だけ発展する

convexityだけでなくsmoothnessとstrong convexityを入れるとgradient methodのrateを定量化できる。


## このTopicを理解できたか確認する問い

- 「線分のparameterization」を式を見ずに説明できるか
- 「local minimumがglobal」までの論理を一段ずつ再現できるか
- 凸集合と凸関数の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-convex-sets-functions)　|　[スライドへ](/slides/opt-convex-sets-functions/)
