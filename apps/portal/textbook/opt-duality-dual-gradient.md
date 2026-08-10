# Lagrange双対とdual gradient：教科書

Course 06｜最適化｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-barrier-interior-point` で得た概念を使い、ここでは Lagrange双対とdual gradient へ進む。

前提として使うのは `opt-inequality-constraints-kkt` です。

## まず直感を作る

双対問題は制約違反へ価格を付け、元問題の下界を与える別の最適化問題を作る。



## 図の解説

<img src="/visuals/course-06/opt-duality-dual-gradient.png" alt="Lagrange双対とdual gradientの図解" style="max-height: 440px; display:block; margin:0 auto;" />

primal値とdual値のgapを棒で比較する。 primalの実行可能点から得る上界/下界と、dual変数から得る境界値の間のgapを描く。強双対では最適点でこのgapが0になる。

## 記号・型・次元

- $\mathcal L(x,λ)=f(x)+λ^Tg(x)$
- $q(λ)=\inf_x\mathcal L(x,λ)$：dual function
- $p^*$：primal optimum
- $d^*$：dual optimum


## 正式な定義・代表式

dual functionは任意dual-feasible λに対しprimal optimumのlower boundを与える。convex+Slater等でstrong duality $d^*=p^*$。

代表式は

$$
g(\boldsymbol{\lambda})=\inf_{\mathbf{x}}\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})
$$

です。

## なぜこの式・結論になるのか

### 1. lower bound

feasible xでg_i(x)≤0, λ_i≥0なのでλ^Tg≤0、よってL(x,λ)≤f(x)。さらにq(λ)=inf_x L≤L(x,λ)≤f(x)。

### 2. best lower bound

λを選んでq(λ)を最大化すれば最も強いlower bound。これがdual problem。

### 3. gap

$p^*-d^*≥0$ がweak duality。strong dualityならgap0でprimal/dual双方のoptimality certificateになる。

## 教科書が省略しやすい一段を補う


### dual functionが必ずlower boundになる理由

Lagrangian $L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\nu^Th(x)$、$\lambda\ge0$。feasible xでは $g_i\le0$ なので $L(x,\lambda,\nu)\le f(x)$。さらにdual function $q(\lambda,\nu)=\inf_xL(x,\lambda,\nu)$ は任意feasible xのf以下。したがってdual maximizationはprimal optimumへのlower boundを最も高くする問題。

weak dualityは常に成り立つ。convex+Slater等でstrong dualityならgap0。dual variablesはconstraint RHSを少し変えたときoptimal valueがどう変わるかというshadow priceとしても解釈できる。


### dual gapをoptimality certificateとして使う

primal feasible x gives upper bound f(x) for minimization、dual feasible multipliers give lower bound q(λ,ν)。したがって
$0\le f(x)-q(λ,ν)$。
このgapがsmallなら真のoptimum p*は二つの間にあるためsuboptimalityを直接boundできる。

iterative algorithmsでgradient normだけでなくduality gapをstopping criterionに使えるのはこのため。strong dualityがないnonconvex problemではgapが0にならない可能性がある。

## 途中を飛ばさず全体をつなぐ

### Lagrange双対とdual gradientの導出を一本につなげる

dual functionは任意dual-feasible λに対しprimal optimumのlower boundを与える。convex+Slater等でstrong duality $d^*=p^*$。

#### 1. lower bound

まず出発点を固定する。 feasible xでg_i(x)≤0, λ_i≥0なのでλ^Tg≤0、よってL(x,λ)≤f(x)。さらにq(λ)=inf_x L≤L(x,λ)≤f(x)。 次に必要になるのは「best lower bound」である。

#### 2. best lower bound

ここまでで得た結果を次の段階へ渡す。 λを選んでq(λ)を最大化すれば最も強いlower bound。これがdual problem。 次に必要になるのは「gap」である。

#### 3. gap

最後に、前二段階の結果をまとめて結論へ進む。 $p^*-d^*≥0$ がweak duality。strong dualityならgap0でprimal/dual双方のoptimality certificateになる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
g(\boldsymbol{\lambda})=\inf_{\mathbf{x}}\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

簡単なquadratic+linear constraintでdualを解析し、primal solutionと同じobjectiveを得るとstrong dualityを確認できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

resource constraintのλはconstraint RHSを少し緩めたときのoptimal value sensitivity（shadow price）として解釈できる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

簡単なquadratic+linear constraintでdualを解析し、primal solutionと同じobjectiveを得るとstrong dualityを確認できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

resource constraintのλはconstraint RHSを少し緩めたときのoptimal value sensitivity（shadow price）として解釈できる。

## 成立条件と、条件を外したときに何が壊れるか

- 弱双対と強双対を区別する。
- dual variableの符号制約を確認する。
- Lagrange双対とdual gradientの定義と計算手順を区別し、数値例だけで一般性を判断しない。

nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。

## よくある誤解を分解する

- Lagrange双対とdual gradientの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Lagrange双対とdual gradientでは、式へ数値を代入するだけでは不十分である。nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

dual gradient/subgradientではinner inf solve accuracyも影響。primal recoveryとfeasibilityを別監視。

## ここから一段だけ発展する

nonsmooth regularizerを分離して扱うproximal operatorはdualityとも深く関係するが、まずproximal gradientを構成する。


## このTopicを理解できたか確認する問い

- 「lower bound」を式を見ずに説明できるか
- 「gap」までの論理を一段ずつ再現できるか
- Lagrange双対とdual gradientの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-duality-dual-gradient)　|　[スライドへ](/slides/opt-duality-dual-gradient/)
