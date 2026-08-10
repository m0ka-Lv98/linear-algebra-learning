# 不等式制約と相補性：演習

Course 06｜最適化

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：4条件を書き分ける

$\min_{\mathbf x} f(\mathbf x)$ subject to $g_i(\mathbf x)\le0$ のKKT条件をprimal feasibility, dual feasibility, complementary slackness, stationarityに分けて書け。

<details><summary>完全解答</summary>

primal feasibility: $g_i(\mathbf x^*)\le0$。dual feasibility: $\lambda_i^*\ge0$。complementary slackness: $\lambda_i^*g_i(\mathbf x^*)=0$。stationarity: $\nabla f(\mathbf x^*)+\sum_i\lambda_i^*\nabla g_i(\mathbf x^*)=\mathbf0$。等式制約があればそのgradientとfree-sign multiplierもstationarityへ加える。

</details>

## 問題2：active制約の1次元例

$\min_x (x-2)^2$ subject to $x\le1$ をKKTで解け。$x^*$と$\lambda^*$を求め、4条件をすべて確認せよ。

<details><summary>完全解答</summary>

$g(x)=x-1\le0$。unconstrained minimizer2はinfeasibleなので候補$x^*=1$。stationarityは$2(x-2)+\lambda=0$なので$x=1$で$-2+\lambda=0$、$\lambda^*=2$。primal: $g(1)=0$、dual:$2\ge0$、complementarity:$2\cdot0=0$、stationarity:$-2+2=0$。convex objectiveとaffine constraintなのでglobal optimum。

</details>

## 問題3：inactive制約

$\min_x (x-2)^2$ subject to $x\le3$ をKKTで解き、なぜ$\lambda^*=0$になるか説明せよ。

<details><summary>完全解答</summary>

unconstrained minimizer$x^*=2$がfeasibleで$g(2)=-1<0$。complementary slackness $\lambda g=0$ で$g\ne0$なので$\lambda=0$。stationarityも$2(2-2)+0=0$。境界がoptimumを押していないためdual forceは不要。

</details>

## 問題4：図のgradient balance

KKT図でactive boundaryの外向き法線が$\nabla g(\mathbf x^*)$、目的gradientがその反対向きに描かれている。なぜ $\nabla f(\mathbf x^*)=-\lambda\nabla g(\mathbf x^*)$ となり、$\lambda\ge0$が必要か。

<details><summary>完全解答</summary>

境界上でfeasibleなtangent方向へ一次的に目的を下げられないため、$-\nabla f$はfeasible setのnormal coneに入る。1本のsmooth active inequalityがnormal coneを生成する場合、そのnormalは非負倍$\lambda\nabla g$で表される。よって$-\nabla f=\lambda\nabla g$、すなわちstationarity。負の$\lambda$だとnormal coneと逆向きになり、inequalityのdual feasibilityに反する。

</details>

## 問題5：2変数KKT

$\min_{x,y}(x-2)^2+(y-1)^2$ subject to $x+y\le2$ を解け。

<details><summary>完全解答</summary>

unconstrained minimizer(2,1)は$x+y=3>2$でinfeasible。$g=x+y-2$。stationarity: $2(x-2)+\lambda=0$, $2(y-1)+\lambda=0$。activeとして$x+y=2$。前2式から$x=2-\lambda/2$, $y=1-\lambda/2$、和$3-\lambda=2$なので$\lambda=1$。よって$(x^*,y^*)=(1.5,0.5)$。$\lambda\ge0$、$g=0$、stationarity成立。strictly convexなので一意global optimum。

</details>

## 問題6：CQ失敗反例

$\min_x x$ subject to $x^2\le0$ で最適点は$x=0$なのに通常KKT multiplierが存在しないことを示せ。

<details><summary>完全解答</summary>

feasible setは$x=0$だけなので最適点は0。$g(x)=x^2$で$g'(0)=0$、$f'(0)=1$。stationarityは$1+\lambda\cdot0=0$となり、どの$\lambda$でも不可能。constraint gradientがzeroに退化しnormal directionを表せないためCQが失敗している。

</details>

## 問題7：nonconvexでKKTは十分でない

unconstrained problem $\min_x x^3$ の$x=0$がstationarityを満たすがminimumでないことを使い、「KKT point=global optimum」が一般に誤りである理由を説明せよ。

<details><summary>完全解答</summary>

unconstrained KKTはgradient zeroに相当し、$f'(0)=0$。しかし$x<0$で$x^3<0=f(0)$なので0はlocal minimumでもない。制約付き非凸問題でも同様にKKTは通常necessary candidate conditionで、convexity等がなければglobal optimalityは保証されない。

</details>

## 問題8：KKT residualの計算

候補点で $g=-0.01$, $\lambda=0.4$, stationarity residual norm=0.003 とする。complementarity residual $|\lambda g|$ を求め、何を追加確認すべきか述べよ。

<details><summary>完全解答</summary>

$|\lambda g|=|0.4\times(-0.01)|=0.004$。これだけで合格とは言えず、primal violation $\max(g,0)$、dual violation $\max(-\lambda,0)$、stationarity residual、各量のscaleやsolver toleranceを一緒に確認する。

</details>

## 問題9：sign convention

制約を$g(x)\le0$ではなく$h(x)\ge0$と書いた場合、multiplier signをそのまま$\lambda\ge0$としてよいか。$h=-g$として説明せよ。

<details><summary>完全解答</summary>

Lagrangian conventionに依存する。$g\le0$に$+\lambda g$, $\lambda\ge0$を使うなら、$h=-g\ge0$を同じ形へ直すと$-h\le0$なので$+\lambda(-h)$。$h$を直接$+\mu h$と書くなら$\mu\le0$が対応する。制約向きを変えたらmultiplier sign conventionも整合させる。

</details>

## 問題10：総合診断

solverが$x^*$を返したが、objectiveは小さく、constraint violationは$10^{-7}$、stationarity residualは$10^{-1}$だった。KKT観点で何を結論できるか。

<details><summary>完全解答</summary>

primal feasibilityは良さそうだがstationarityが大きく、KKT pointとして十分収束したとは言いにくい。objective値だけでoptimalと判断せず、scaling、gradient計算、dual multiplier、停止条件を確認し、必要ならより厳しいtoleranceや再scaleで再solveする。

</details>

[教科書へ](/textbook/opt-inequality-constraints-kkt)
