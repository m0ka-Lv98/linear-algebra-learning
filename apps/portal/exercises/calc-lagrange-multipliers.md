# Lagrange乗数法：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[Lagrange乗数法](/textbook/calc-lagrange-multipliers)と対応しています。

## 問1：円上の線形関数

$x^2+y^2=1$ の下で $f=x+y$ の最大・最小を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[1,1]^T=\lambda[2x,2y]^T$ より $x=y$。$2x^2=1$ なので $x=y=\pm1/\sqrt2$。最大 $\sqrt2$、最小 $-\sqrt2$。



</details>

## 問2：和一定の積

$x+y=12$, $x,y>0$ で $xy$ を最大化せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[y,x]^T=\lambda[1,1]^T$ より $x=y$。制約から6,6、最大積36。



</details>

## 問3：楕円

$x^2+4y^2=4$ 上で $f=x$ を最大・最小化せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

幾何的にも $x$ の範囲は $[-2,2]$。Lagrangeでも $[1,0]^T=\lambda[2x,8y]^T$ から $y=0$, $x=\pm2$。



</details>

## 問4：距離最小

直線 $x+y=1$ 上で原点からの距離の二乗 $x^2+y^2$ を最小化せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[2x,2y]^T=\lambda[1,1]^T$ より $x=y$。制約で $x=y=1/2$。最小距離二乗は1/2。



</details>

## 問5：Lagrangian

$f=x^2+y^2$, 制約 $x+y=1$ のLagrangianを1つ書け。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\mathcal L=x^2+y^2-\lambda(x+y-1)$。符号規約は逆でも一貫していればよい。



</details>

## 問6：幾何学的意味

$\nabla f=\lambda\nabla g$ を図形的に説明せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

制約付き極値では目的関数の等高線と制約曲線が接し、それぞれの法線ベクトルである勾配が平行になる。



</details>

## 問7：λの意味

$\lambda$ は目的関数の最大値・最小値そのものか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

一般には違う。$\lambda$ は勾配の比例係数であり、感度として解釈できる場合はあるが目的関数値そのものではない。



</details>

## 問8：候補比較

Lagrange方程式から候補が4点出た。次に何をするか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

すべて制約を満たすか確認し、各点で $f$ を評価して最大・最小を比較する。



</details>

## 問9：正則性

標準的Lagrange条件で $\nabla g\ne0$ が重要な理由は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla g$ が制約面の法線として接空間を定めるため。$\nabla g=0$ では通常の接平面表現が壊れ、条件が候補を捉えないことがある。



</details>

## 問10：誤答診断

$\nabla f=\lambda\nabla g$ だけ解いて制約 $g=c$ を使わなかった。何が不足か。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

Lagrange条件は勾配平行条件と元の制約式を同時に満たす必要がある。制約を入れないと許されない点まで候補になる。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
