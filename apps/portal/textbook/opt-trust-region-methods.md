# trust region法：教科書

Course 06｜最適化｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-newton-quasi-newton` で得た概念を使い、ここでは trust region法 へ進む。

前提として使うのは `opt-newton-quasi-newton` です。

## まず直感を作る

二階法は勾配だけでなく曲率を使い、局所二次モデルを解いて進行方向と距離を決める。



## 図の解説

<img src="/visuals/course-06/opt-trust-region-methods.png" alt="trust region法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ二次関数で勾配法とNewton法の軌跡を比較する。 二次近似の楕円はHessianが決める局所曲率を表す。Newton stepはgradientだけでなくこの楕円の伸びを補正して、二次モデルの最小点へ直接向かう。

## 記号・型・次元

- $m_k(p)$：local model
- $\Delta_k$：trust radius
- $\rho_k$：actual/predicted reduction比


## 正式な定義・代表式

trust regionはlocal modelを半径Δ内だけ信用し、その制約内でstepを選ぶ。実際の改善と予測を比較してΔを更新。

代表式は

$$
\min_{\|\mathbf{p}\|\le\Delta_k} m_k(\mathbf{p})
$$

です。

## なぜこの式・結論になるのか

### 1. model誤差の局所性

Taylor modelはpが小さいほど高次項が小さい。そこで||p||≤Δを課す。

### 2. reduction ratio

$\rho=(f(x)-f(x+p))/(m(0)-m(p))$。1に近ければmodelが当たり、負なら予測と逆。

### 3. radius update

ρが高ければΔを拡大、低ければ縮小/step reject。step sizeとmodel reliabilityを同時管理。

## 教科書が省略しやすい一段を補う


### trust regionは「二次modelをどこまで信じるか」を同時に決める

局所model m_k(p)を $\|p\|\le\Delta_k$ の範囲だけで最小化する。実際の減少 $f(x_k)-f(x_k+p)$ とmodel予測減少 $m_k(0)-m_k(p)$ の比
$$
\rho_k=\frac{\text{actual reduction}}{\text{predicted reduction}}
$$
を見て、modelが当たればstepを受け入れregionを広げ、外れれば拒否/縮小する。

line searchがdirectionを先に決め長さだけ調整するのに対し、trust regionはregion内でdirectionとlengthを同時に選ぶ。indefinite Hessianでもboundary directionへ逃がせるためnonconvex Newton stabilizationとして重要。



## 途中を飛ばさず全体をつなぐ

### trust region法の導出を一本につなげる

trust regionはlocal modelを半径Δ内だけ信用し、その制約内でstepを選ぶ。実際の改善と予測を比較してΔを更新。

#### 1. model誤差の局所性

まず出発点を固定する。 Taylor modelはpが小さいほど高次項が小さい。そこで||p||≤Δを課す。 次に必要になるのは「reduction ratio」である。

#### 2. reduction ratio

ここまでで得た結果を次の段階へ渡す。 $\rho=(f(x)-f(x+p))/(m(0)-m(p))$。1に近ければmodelが当たり、負なら予測と逆。 次に必要になるのは「radius update」である。

#### 3. radius update

最後に、前二段階の結果をまとめて結論へ進む。 ρが高ければΔを拡大、低ければ縮小/step reject。step sizeとmodel reliabilityを同時管理。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\|\mathbf{p}\|\le\Delta_k} m_k(\mathbf{p})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Newton stepが遠すぎると悪化するproblemでも、小さいtrust region内のCauchy stepから安全に進める。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

quadratic objectiveならmodel exactなのでρ=1（数値誤差除く）となりradiusを広げやすい。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Δを固定して小さすぎると極端に遅い。大きすぎるとtrustという考えが失われる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Newton stepが遠すぎると悪化するproblemでも、小さいtrust region内のCauchy stepから安全に進める。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

quadratic objectiveならmodel exactなのでρ=1（数値誤差除く）となりradiusを広げやすい。

## 成立条件と、条件を外したときに何が壊れるか

- Hessianが正定値でないと下降方向にならないことがある。
- 線形方程式を解くコストも考える。
- trust region法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

Δを固定して小さすぎると極端に遅い。大きすぎるとtrustという考えが失われる。

## よくある誤解を分解する

- trust region法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

trust region法では、式へ数値を代入するだけでは不十分である。Δを固定して小さすぎると極端に遅い。大きすぎるとtrustという考えが失われる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

subproblemをexactに解く必要はなくdogleg/truncated CG等。accept/rejectとradius logを残す。

## ここから一段だけ発展する

coordinate/subspaceを限定して解く方法も「一度に探索する自由度を制限する」別アプローチ。


## このTopicを理解できたか確認する問い

- 「model誤差の局所性」を式を見ずに説明できるか
- 「radius update」までの論理を一段ずつ再現できるか
- trust region法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-trust-region-methods)　|　[スライドへ](/slides/opt-trust-region-methods/)
