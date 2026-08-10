# 接錐・法錐・制約資格条件：演習

Course 06｜最適化

[教科書](/textbook/opt-tangent-normal-cones-cq)

## 問題1

集合 $C=\{(x_1,x_2):x_2\ge0\}$ の境界点(0,0)でtangent coneとnormal coneを求めよ。

<details><summary>完全解答</summary>

feasibleな一次方向は $d_2\ge0$ なので $T_C=\{d:d_2\ge0\}$。normal coneは $v^Td\le0$ が全tangent dで成り立つv、すなわち $v_1=0,v_2\le0$。よって下向き半直線。

</details>

## 問題2

「接錐・法錐・制約資格条件」の導出を、最初の段階「1. feasible direction d では小さいt>0でx*+tdが許される。」から始めて中心式まで再構成せよ。途中で「tangent cone $T_C(x^*)$ はfeasible set内から近づける一次方向の集合。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. feasible direction d では小さいt>0でx*+tdが許される。
2. 局所最小なら全feasible directionで ∇f(x*)^T d≥0。
3. これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

tangent cone $T_C(x^*)$ はfeasible set内から近づける一次方向の集合。局所最小なら任意 $d\in T_C$ に対して $\nabla f(x^*)^Td\ge0$。これは $-\nabla f(x^*)$ がpolar cone $T_C^\circ$ に属することを意味し、凸集合ではこれがnormal cone $N_C$。

KKTでは $N_C$ をactive constraint gradientsの非負結合で表したい。しかし制約のgradientが退化すると、その表現が正しくならない場合がある。LICQやSlaterなどconstraint qualificationは「幾何学的normal cone」と「multiplierで作るnormal」の一致を保証するために必要。

</details>

## 問題3

図 `/visuals/course-06/opt-tangent-normal-cones-cq.png` では「境界線より下がfeasible set C。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-06/opt-tangent-normal-cones-cq.png" alt="接錐・法錐・制約資格条件の図解" style="max-height: 480px; display:block; margin:0 auto;" />

境界線より下がfeasible set C。境界点 $x^*$ から境界に沿う矢印がtangent direction、外向き垂直矢印がnormal。局所最小では目的を下げる方向 $-\nabla f$ がfeasible tangent側へ向けないので、normal coneの中に入る。

</details>

## 問題4

「接錐・法錐・制約資格条件」の第二例「C={x:x\le1}、$f(x)=-x$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

C={x:x\le1}、$f(x)=-x$。最小化では実は下に有界でなく最小なし。一方 $f(x)=x^2$ をCで最小化するとx*=0は内部点でnormal cone={0}、gradient=0。$f(x)=-x$ を区間[-2,1]で最小化ならx*=1、$-\nabla f=1$ が右向きnormalに入る。

</details>

## 問題5

接錐・法錐・制約資格条件で feasible set C の接錐、法錐、代表的な制約資格条件 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`opt-tangent-normal-cones-cq` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $T_C(x*)$ | feasible set C の接錐 |
| $N_C(x*)$ | 法錐 |
| $LICQ/Slater$ | 代表的な制約資格条件 |


- $C$：feasible set。
- $T_C(x^*)$：x*でのtangent cone。
- $N_C(x^*)$：normal cone。
- CQ：constraint qualification。

</details>

## 問題6

警告「KKT multiplierを解けたことだけで最適性を保証しない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

KKT multiplierを解けたことだけで最適性を保証しない。非凸問題ではKKTは一般に必要条件止まりで、CQが失敗すると局所最小でもmultiplierが存在しない場合がある。

</details>

## 問題7

よくある誤り「CQが壊れると制約勾配だけでnormal coneを表せない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- CQが壊れると制約勾配だけでnormal coneを表せない。
- KKT pointとglobal optimumを非凸問題で同一視しない。

KKT multiplierを解けたことだけで最適性を保証しない。非凸問題ではKKTは一般に必要条件止まりで、CQが失敗すると局所最小でもmultiplierが存在しない場合がある。

</details>

## 問題8

「接錐・法錐・制約資格条件」の例題1を再計算し、その結果に対して次の検算を実行せよ：候補directionがtangent coneに入るかは、微小な正のstepでfeasible set内へ残れるかで確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

feasibleな一次方向は $d_2\ge0$ なので $T_C=\{d:d_2\ge0\}$。normal coneは $v^Td\le0$ が全tangent dで成り立つv、すなわち $v_1=0,v_2\le0$。よって下向き半直線。

検算：
候補directionがtangent coneに入るかは、微小な正のstepでfeasible set内へ残れるかで確認する。normal vectorは全feasible tangent directionとの内積が非正になる向きを満たすか調べる。CQの反例ではconstraint gradientが退化してKKT multiplierが必要条件を表せなくなる点を確認する。

</details>

## 問題9

後続への接続「この幾何を理解するとcomplementary slacknessが「active boundaryだけがnormal forceを出す」こととして読める。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

この幾何を理解するとcomplementary slacknessが「active boundaryだけがnormal forceを出す」こととして読める。Fenchel dualityやprojected/proximal methodsでもnormal coneが現れる。

</details>

## 問題10

中心問題「KKTのstationarityは、なぜ「目的勾配と制約法線の釣り合い」になるのか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ -\nabla f(x^*)\in N_C(x^*) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「KKT multiplierを解けたことだけで最適性を保証しない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $T_C(x*)$ | feasible set C の接錐 |
| $N_C(x*)$ | 法錐 |
| $LICQ/Slater$ | 代表的な制約資格条件 |


- $C$：feasible set。
- $T_C(x^*)$：x*でのtangent cone。
- $N_C(x^*)$：normal cone。
- CQ：constraint qualification。

中心式：
$$
-\nabla f(x^*)\in N_C(x^*)
$$

導出：
1. feasible direction d では小さいt>0でx*+tdが許される。
2. 局所最小なら全feasible directionで ∇f(x*)^T d≥0。
3. これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

根拠：
tangent cone $T_C(x^*)$ はfeasible set内から近づける一次方向の集合。局所最小なら任意 $d\in T_C$ に対して $\nabla f(x^*)^Td\ge0$。これは $-\nabla f(x^*)$ がpolar cone $T_C^\circ$ に属することを意味し、凸集合ではこれがnormal cone $N_C$。

KKTでは $N_C$ をactive constraint gradientsの非負結合で表したい。しかし制約のgradientが退化すると、その表現が正しくならない場合がある。LICQやSlaterなどconstraint qualificationは「幾何学的normal cone」と「multiplierで作るnormal」の一致を保証するために必要。

具体例：
**問題**：集合 $C=\{(x_1,x_2):x_2\ge0\}$ の境界点(0,0)でtangent coneとnormal coneを求めよ。

**解答**：feasibleな一次方向は $d_2\ge0$ なので $T_C=\{d:d_2\ge0\}$。normal coneは $v^Td\le0$ が全tangent dで成り立つv、すなわち $v_1=0,v_2\le0$。よって下向き半直線。

失敗条件：
KKT multiplierを解けたことだけで最適性を保証しない。非凸問題ではKKTは一般に必要条件止まりで、CQが失敗すると局所最小でもmultiplierが存在しない場合がある。

</details>
