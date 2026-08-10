# ADMMと分割法：教科書

Course 06｜最適化｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-adaptive-optimizers` で得た概念を使い、ここでは ADMMと分割法 へ進む。

前提として使うのは `opt-duality-dual-gradient`、`opt-proximal-gradient` です。

## まず直感を作る

近接法は非滑らかな項を直接微分せず、近接写像で「縮める」操作として扱う。



## 図の解説

<img src="/visuals/course-06/opt-admm-splitting.png" alt="ADMMと分割法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

L1近接写像のsoft-thresholdingを入力値ごとに描く。 gradient step後の点をそのまま採用せず、正則化項を含むproximal subproblemで近い点へ戻す。L1なら成分ごとのsoft-thresholdingとして0へ吸着する。

## 記号・型・次元

- $f(x)+g(z)$
- $Ax+Bz=c$
- $\rho>0$：penalty
- $u$：scaled dual variable


## 正式な定義・代表式

ADMMはaugmented Lagrangianをx,zで交互最小化し、dual updateでconstraint consistencyを促す。分離構造を活用する。

代表式は

$$
\min f(\mathbf{x})+g(\mathbf{z})\quad\text{s.t. }\mathbf{A}\mathbf{x}+\mathbf{B}\mathbf{z}=\mathbf{c}
$$

です。

## なぜこの式・結論になるのか

### 1. variable split

難しい一問題をx側fとz側gに分け、等式constraintで一致させる。

### 2. augmented term

Lagrangianに $\frac\rho2\|Ax+Bz-c\|²$ を足し、primal violationへcurvatureを与える。

### 3. 交互update

xをz,u固定でmin、zをx,u固定でmin、uをresidual方向へupdate。各block subproblemが簡単なら全体が効率化。

## 教科書が省略しやすい一段を補う


### variable splittingで難しい和を二つの簡単なsubproblemへ分ける

$\min f(x)+g(z)$ s.t. x=z と書き、augmented Lagrangianへquadratic penaltyを加える。ADMMはx-minimization、z-minimization、dual updateを交互に行う。f側はdata fit、g側はproximal regularizerのように、それぞれ得意なsolverを使える。

quadratic penaltyだけではconstraint enforcementにlarge parameterが必要になりconditionが悪化しやすいが、dual updateがconstraint residualを積分的に補正する。primal residual x-zとdual residualの両方を停止条件に使う。


### augmented termがconsensusをどう押すか

scaled formでx-updateはf plus quadratic distance to z-u、z-updateはg plus distance to x+u、u-updateはconstraint violation x-zを累積する。uは過去のresidualを記憶し、同じ方向のviolationが続くと次subproblemを強く補正する。

penalty ρを上げるとprimal consensusを強めるがsubproblem conditioning/dual progressが変わる。primal/dual residual balanceに応じρをadaptする実装もある。

## 途中を飛ばさず全体をつなぐ

### ADMMと分割法の導出を一本につなげる

ADMMはaugmented Lagrangianをx,zで交互最小化し、dual updateでconstraint consistencyを促す。分離構造を活用する。

#### 1. variable split

まず出発点を固定する。 難しい一問題をx側fとz側gに分け、等式constraintで一致させる。 次に必要になるのは「augmented term」である。

#### 2. augmented term

ここまでで得た結果を次の段階へ渡す。 Lagrangianに $\frac\rho2\|Ax+Bz-c\|²$ を足し、primal violationへcurvatureを与える。 次に必要になるのは「交互update」である。

#### 3. 交互update

最後に、前二段階の結果をまとめて結論へ進む。 xをz,u固定でmin、zをx,u固定でmin、uをresidual方向へupdate。各block subproblemが簡単なら全体が効率化。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min f(\mathbf{x})+g(\mathbf{z})\quad\text{s.t. }\mathbf{A}\mathbf{x}+\mathbf{B}\mathbf{z}=\mathbf{c}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Lassoでx=z constraintに分けるとx-stepはleast squares、z-stepはsoft-thresholdingに分離できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

distributed consensusでは各worker local x_iを更新しglobal zへ一致させる形。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

nonconvex/不適切ρでは標準convex ADMM収束保証が使えない。subproblemを不正確に解く影響もある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Lassoでx=z constraintに分けるとx-stepはleast squares、z-stepはsoft-thresholdingに分離できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

distributed consensusでは各worker local x_iを更新しglobal zへ一致させる形。

## 成立条件と、条件を外したときに何が壊れるか

- proxは単なるgradient stepではない。
- step sizeと正則化係数の積を確認する。
- ADMMと分割法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

nonconvex/不適切ρでは標準convex ADMM収束保証が使えない。subproblemを不正確に解く影響もある。

## よくある誤解を分解する

- ADMMと分割法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

ADMMと分割法では、式へ数値を代入するだけでは不十分である。nonconvex/不適切ρでは標準convex ADMM収束保証が使えない。subproblemを不正確に解く影響もある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

primal residual r=Ax+Bz-c と dual residualを別々にmonitorしρをadaptive調整することがある。

## ここから一段だけ発展する

最後に、convex guaranteeのない現実のnonconvex problemで何を診断し、hyperparameter outer loopと分けるか整理する。


## このTopicを理解できたか確認する問い

- 「variable split」を式を見ずに説明できるか
- 「交互update」までの論理を一段ずつ再現できるか
- ADMMと分割法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-admm-splitting)　|　[スライドへ](/slides/opt-admm-splitting/)
