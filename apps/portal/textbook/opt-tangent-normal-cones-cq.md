# 接錐・法錐・制約資格条件：教科書

Course 06｜最適化

## このTopicで解く問題

KKTのstationarityは、なぜ「目的勾配と制約法線の釣り合い」になるのか。

## なぜこの概念が必要か

最適点から一次的に動ける方向の集合がtangent cone。その全方向へ目的関数を減らせない条件は、負の勾配がtangent coneの極coneであるnormal coneに入ること。KKTはnormal coneを制約勾配で表現した形。

## 図の各要素は何を表しているか

<img src="/visuals/course-06/opt-tangent-normal-cones-cq.png" alt="接錐・法錐・制約資格条件の図解" style="max-height: 480px; display:block; margin:0 auto;" />

境界線より下がfeasible set C。境界点 $x^*$ から境界に沿う矢印がtangent direction、外向き垂直矢印がnormal。局所最小では目的を下げる方向 $-\nabla f$ がfeasible tangent側へ向けないので、normal coneの中に入る。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $T_C(x*)$ | feasible set C の接錐 |
| $N_C(x*)$ | 法錐 |
| $LICQ/Slater$ | 代表的な制約資格条件 |


- $C$：feasible set。
- $T_C(x^*)$：x*でのtangent cone。
- $N_C(x^*)$：normal cone。
- CQ：constraint qualification。

## 中心となる式

$$
-\nabla f(x^*)\in N_C(x^*)
$$

## 中心式を前提から導く

1. feasible direction d では小さいt>0でx*+tdが許される。
2. 局所最小なら全feasible directionで ∇f(x*)^T d≥0。
3. これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

## なぜその変形をしてよいのか

tangent cone $T_C(x^*)$ はfeasible set内から近づける一次方向の集合。局所最小なら任意 $d\in T_C$ に対して $\nabla f(x^*)^Td\ge0$。これは $-\nabla f(x^*)$ がpolar cone $T_C^\circ$ に属することを意味し、凸集合ではこれがnormal cone $N_C$。

KKTでは $N_C$ をactive constraint gradientsの非負結合で表したい。しかし制約のgradientが退化すると、その表現が正しくならない場合がある。LICQやSlaterなどconstraint qualificationは「幾何学的normal cone」と「multiplierで作るnormal」の一致を保証するために必要。

## feasible directionからnormal coneへ

制約集合 $C$ の点 $\mathbf x$ で、微小に動いても集合内に留まれる方向をtangent cone $T_C(\mathbf x)$ と考える。凸集合ならnormal coneは

$$
N_C(\mathbf x)=\{\mathbf v:\mathbf v^T(\mathbf y-\mathbf x)\le0\ \forall\mathbf y\in C\}
$$

で、feasible方向に対して外向きのベクトル集合になる。

制約付き最小化 $\min_{\mathbf x\in C}f(\mathbf x)$ の局所最適点では、どのfeasible directionへも一次的に下れない。したがって

$$
-\nabla f(\mathbf x^*)\in N_C(\mathbf x^*)
$$

がstationarityの幾何学的な形である。不等式制約のgradientがnormal coneを生成できる正則性があれば、normal vectorを非負係数の線形結合で表してKKT multiplierが現れる。

## constraint qualificationが必要な理由

制約 $g(x)=x^2\le0$ はfeasible setが $\{0\}$ だけ。しかし $g'(0)=0$ なのでconstraint gradientからnormal方向を生成できない。目的 $f(x)=x$ の最適点は0だが、stationarity $f'(0)+\lambda g'(0)=1+0=0$ を満たす $\lambda$ は存在しない。最適点なのに通常KKT multiplierが出ないのは、制約表現が退化しCQが失敗しているからである。

## 例題1：具体的な数値・構造で解く

**問題**：集合 $C=\{(x_1,x_2):x_2\ge0\}$ の境界点(0,0)でtangent coneとnormal coneを求めよ。

**解答**：feasibleな一次方向は $d_2\ge0$ なので $T_C=\{d:d_2\ge0\}$。normal coneは $v^Td\le0$ が全tangent dで成り立つv、すなわち $v_1=0,v_2\le0$。よって下向き半直線。

## 例題2：別の条件で確認する

C={x:x\le1}、$f(x)=-x$。最小化では実は下に有界でなく最小なし。一方 $f(x)=x^2$ をCで最小化するとx*=0は内部点でnormal cone={0}、gradient=0。$f(x)=-x$ を区間[-2,1]で最小化ならx*=1、$-\nabla f=1$ が右向きnormalに入る。

## 結果の検算

候補directionがtangent coneに入るかは、微小な正のstepでfeasible set内へ残れるかで確認する。normal vectorは全feasible tangent directionとの内積が非正になる向きを満たすか調べる。CQの反例ではconstraint gradientが退化してKKT multiplierが必要条件を表せなくなる点を確認する。

## 条件を外すと何が壊れるか

KKT multiplierを解けたことだけで最適性を保証しない。非凸問題ではKKTは一般に必要条件止まりで、CQが失敗すると局所最小でもmultiplierが存在しない場合がある。

## よくある誤り

- CQが壊れると制約勾配だけでnormal coneを表せない。
- KKT pointとglobal optimumを非凸問題で同一視しない。

## 次のTopic・応用への接続

この幾何を理解するとcomplementary slacknessが「active boundaryだけがnormal forceを出す」こととして読める。Fenchel dualityやprojected/proximal methodsでもnormal coneが現れる。

## 参考

- Boyd & Vandenberghe; nonlinear optimization KKT

[演習へ](/exercises/opt-tangent-normal-cones-cq)　|　[スライドへ](/slides/opt-tangent-normal-cones-cq/)
