# 滑らかさと強凸性：教科書

Course 06｜最適化｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-convex-sets-functions` で得た概念を使い、ここでは 滑らかさと強凸性 へ進む。

前提として使うのは `opt-convex-sets-functions`、`calc-hessian-second-order` です。

## まず直感を作る

凸性があると局所最小が大域最小になり、最適化の幾何が大幅に単純になる。



## 図の解説

<img src="/visuals/course-06/opt-smoothness-strong-convexity.png" alt="滑らかさと強凸性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2点を結ぶ線分と関数グラフを描き、chordより下にある条件を見る。 2点を結ぶ線分全体が集合内に残るのが凸集合である。関数では2点を結ぶchordよりgraphが上へ出ないことがJensen型不等式に対応する。

## 記号・型・次元

- $L$：gradient Lipschitz定数
- $\mu>0$：strong convexity定数
- $\nabla f$：gradient
- $\|\cdot\|_2$：Euclidean norm


## 正式な定義・代表式

L-smoothとはgradientが $\|\nabla f(x)-\nabla f(y)\|\le L\|x-y\|$。μ-strongly convexとはconvex lower tangentに $\mu\|x-y\|²/2$ のcurvatureが加わる。

代表式は

$$
\frac{\mu}{2}\|\mathbf{x}-\mathbf{y}\|_2^2\le f(\mathbf{x})-f(\mathbf{y})-\nabla f(\mathbf{y})^{\mathsf T}(\mathbf{x}-\mathbf{y})
$$

です。

## なぜこの式・結論になるのか

### 1. smoothnessからupper quadratic bound

線分上でgradient変化を積分すると $f(x)\le f(y)+\nabla f(y)^T(x-y)+\frac L2\|x-y\|²$。

### 2. strong convexityのlower bound

$f(x)\ge f(y)+\nabla f(y)^T(x-y)+\frac\mu2\|x-y\|²$。

### 3. condition ratio

quadraticではeigenvalueが[μ,L]に入り、κ=L/μが等高線の細長さとfirst-order convergenceの難しさを表す。

## 教科書が省略しやすい一段を補う


### smoothnessとstrong convexityは上・下から二次式で挟む

L-smoothはgradientがL-Lipschitzで、descent lemma
$$
f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\|y-x\|^2
$$
を与える。functionが局所線形近似から上へどれだけ曲がれるかを制限する。

μ-strong convexityは逆に
$$
f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac\mu2\|y-x\|^2
$$
で下から曲率を保証する。二つがそろうとcondition number L/μがoptimization difficultyを表し、gradient descentのlinear convergence rateへ現れる。μ=0の単なるconvexではminimumがflat directionに沿って一意でない場合がある。



## 途中を飛ばさず全体をつなぐ

### 滑らかさと強凸性の導出を一本につなげる

L-smoothとはgradientが $\|\nabla f(x)-\nabla f(y)\|\le L\|x-y\|$。μ-strongly convexとはconvex lower tangentに $\mu\|x-y\|²/2$ のcurvatureが加わる。

#### 1. smoothnessからupper quadratic bound

まず出発点を固定する。 線分上でgradient変化を積分すると $f(x)\le f(y)+\nabla f(y)^T(x-y)+\frac L2\|x-y\|²$。 次に必要になるのは「strong convexityのlower bound」である。

#### 2. strong convexityのlower bound

ここまでで得た結果を次の段階へ渡す。 $f(x)\ge f(y)+\nabla f(y)^T(x-y)+\frac\mu2\|x-y\|²$。 次に必要になるのは「condition ratio」である。

#### 3. condition ratio

最後に、前二段階の結果をまとめて結論へ進む。 quadraticではeigenvalueが[μ,L]に入り、κ=L/μが等高線の細長さとfirst-order convergenceの難しさを表す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\frac{\mu}{2}\|\mathbf{x}-\mathbf{y}\|_2^2\le f(\mathbf{x})-f(\mathbf{y})-\nabla f(\mathbf{y})^{\mathsf T}(\mathbf{x}-\mathbf{y})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x)=\frac12x^TAx$ with SPD Aならμ=λmin(A), L=λmax(A)。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x)=x^4$ はconvexだがglobalなstrong convexity定数μ>0は持たない（0付近のcurvatureが0）。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

convexとstrongly convexを同一視するとunique minimizerやlinear convergenceを誤って保証する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x)=\frac12x^TAx$ with SPD Aならμ=λmin(A), L=λmax(A)。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x)=x^4$ はconvexだがglobalなstrong convexity定数μ>0は持たない（0付近のcurvatureが0）。

## 成立条件と、条件を外したときに何が壊れるか

- 凸集合と凸関数を区別する。
- 強凸性は単なる厳密凸性より強い。
- 滑らかさと強凸性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

convexとstrongly convexを同一視するとunique minimizerやlinear convergenceを誤って保証する。

## よくある誤解を分解する

- 滑らかさと強凸性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

滑らかさと強凸性では、式へ数値を代入するだけでは不十分である。convexとstrongly convexを同一視するとunique minimizerやlinear convergenceを誤って保証する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

L,μを正確に知らない場合line searchやestimateを使う。feature scaling/preconditioningはeffective κを改善。

## ここから一段だけ発展する

これらの定数を使い、stationary conditionとglobal optimalityを次に整理する。


## このTopicを理解できたか確認する問い

- 「smoothnessからupper quadratic bound」を式を見ずに説明できるか
- 「condition ratio」までの論理を一段ずつ再現できるか
- 滑らかさと強凸性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-smoothness-strong-convexity)　|　[スライドへ](/slides/opt-smoothness-strong-convexity/)
