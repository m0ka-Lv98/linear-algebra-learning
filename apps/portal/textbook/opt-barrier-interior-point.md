# barrier法と内点法：教科書

Course 06｜最適化｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-projected-gradient` で得た概念を使い、ここでは barrier法と内点法 へ進む。

前提として使うのは `opt-inequality-constraints-kkt`、`prep-exponents-logarithms` です。

## まず直感を作る

制約付き最適化では自由に動ける方向が限定され、最適点で目的勾配と制約の法線が釣り合う。



## 図の解説

<img src="/visuals/course-06/opt-barrier-interior-point.png" alt="barrier法と内点法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

等高線と制約曲線、接点を描く。 制約境界上の接線方向では目的関数を一次的に改善できない。そのため目的gradientは境界の法線、すなわち制約gradientの線形結合になる。

## 記号・型・次元

- $g_i(x)<0$：strict interior
- $\phi(x)=-\sum\log(-g_i(x))$
- $t$：objective/barrier tradeoff parameter


## 正式な定義・代表式

log barrierはboundaryへ近づくと∞となるpenaltyでstrict feasibilityを保つ。$t f(x)+\phi(x)$ をt増加しながら解くcentral path。

代表式は

$$
\phi(\mathbf{x})=-\sum_i\log(-g_i(\mathbf{x}))
$$

です。

## なぜこの式・結論になるのか

### 1. boundaryで発散

$g_i(x)\uparrow0^-$ なら $-\log(-g_i)\to\infty$。infeasible側ではlog未定義。

### 2. KKTとの関係

barrier optimumのstationarityから multiplierを $λ_i=1/(-t g_i)$ と読め、$λ_i(-g_i)=1/t$。t→∞でcomplementarity0へ近づく。

### 3. central path

tを段階的に増やし前解をwarm startするとinteriorを通りKKT solutionへ近づく。

## 教科書が省略しやすい一段を補う


### barrierは境界へ近づくcostを無限大にする

inequality g_i(x)<0に対しlog barrier
$$
\phi(x)=-\sum_i\log(-g_i(x))
$$
はboundary $g_i\to0^-$ で∞へ発散する。constrained problemを $f(x)+\mu\phi(x)$ のunconstrained sequenceへ置き換え、μ→0でcentral pathをoptimumへ近づける。

penaltyがconstraint violationを外側から罰するのに対しbarrierはfeasible interiorから出られなくする。Newton法で各barrier subproblemを解くとinterior-point methodになる。strictly feasible starting pointやself-concordance等、理論条件も区別する。



## 途中を飛ばさず全体をつなぐ

### barrier法と内点法の導出を一本につなげる

log barrierはboundaryへ近づくと∞となるpenaltyでstrict feasibilityを保つ。$t f(x)+\phi(x)$ をt増加しながら解くcentral path。

#### 1. boundaryで発散

まず出発点を固定する。 $g_i(x)\uparrow0^-$ なら $-\log(-g_i)\to\infty$。infeasible側ではlog未定義。 次に必要になるのは「KKTとの関係」である。

#### 2. KKTとの関係

ここまでで得た結果を次の段階へ渡す。 barrier optimumのstationarityから multiplierを $λ_i=1/(-t g_i)$ と読め、$λ_i(-g_i)=1/t$。t→∞でcomplementarity0へ近づく。 次に必要になるのは「central path」である。

#### 3. central path

最後に、前二段階の結果をまとめて結論へ進む。 tを段階的に増やし前解をwarm startするとinteriorを通りKKT solutionへ近づく。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\phi(\mathbf{x})=-\sum_i\log(-g_i(\mathbf{x}))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

minimize x subject x>0ではbarrier tx-log x。derivative t-1/x=0からx=1/t、t↑で境界optimum0へ近づく。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

linear programming interior pointはpolytope内部を通るためsimplexのvertex-to-vertex移動と異なる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

初期strict feasible pointがない/見つけにくい場合はphase-Iが必要。barrier objective1回だけではexact constrained solutionでない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

minimize x subject x>0ではbarrier tx-log x。derivative t-1/x=0からx=1/t、t↑で境界optimum0へ近づく。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

linear programming interior pointはpolytope内部を通るためsimplexのvertex-to-vertex移動と異なる。

## 成立条件と、条件を外したときに何が壊れるか

- KKT条件には制約資格条件が関わる。
- 不等式制約では相補性を確認する。
- barrier法と内点法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

初期strict feasible pointがない/見つけにくい場合はphase-Iが必要。barrier objective1回だけではexact constrained solutionでない。

## よくある誤解を分解する

- barrier法と内点法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

barrier法と内点法では、式へ数値を代入するだけでは不十分である。初期strict feasible pointがない/見つけにくい場合はphase-Iが必要。barrier objective1回だけではexact constrained solutionでない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

Newton system solveが主要cost。primal/dual residualとduality gapでstop。

## ここから一段だけ発展する

barrierのmultiplier解釈からLagrange dualityを体系化する。


## このTopicを理解できたか確認する問い

- 「boundaryで発散」を式を見ずに説明できるか
- 「central path」までの論理を一段ずつ再現できるか
- barrier法と内点法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-barrier-interior-point)　|　[スライドへ](/slides/opt-barrier-interior-point/)
