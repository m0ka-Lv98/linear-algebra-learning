# 多変数の連鎖律：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[多変数の連鎖律](/textbook/calc-multivariable-chain-rule)と対応しています。

## 問1：経路1

$z=x^2+y$, $x=t^2,y=3t$ の $dz/dt$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$z_x=2x,z_y=1,x'=2t,y'=3$。よって $dz/dt=2x(2t)+3=4t^3+3$。



</details>

## 問2：経路2

$z=xy$, $x=e^t,y=\sin t$ の $dz/dt$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$dz/dt=y e^t+x\cos t=e^t(\sin t+\cos t)$。



</details>

## 問3：shape

$g:\mathbb R^4\to\mathbb R^2$, $f:\mathbb R^2\to\mathbb R^3$。$J_fJ_g$ のshapeは。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$J_f$ は $3\times2$、$J_g$ は $2\times4$、積は $3\times4$。



</details>

## 問4：順序

なぜ一般に $J_gJ_f$ ではいけないか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

関数の適用順は $\mathbf x\xrightarrow{g}\mathbb R^p\xrightarrow{f}\mathbb R^m$。線形近似も入力側から $J_g$、次に $J_f$ が作用するので積は $J_fJ_g$。shapeも通常逆では合わない。



</details>

## 問5：scalar合成

$y=\ln(1+x^2)$ を連鎖律で微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

外側 $\ln u$ の微分 $1/u$、内側 $u=1+x^2$ の微分 $2x$。よって $2x/(1+x^2)$。



</details>

## 問6：共有入力

$u=x^2,v=x^3,z=u+v$。計算グラフで $dz/dx$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$z_u=z_v=1$ なので $dz/dx=1\cdot2x+1\cdot3x^2=2x+3x^2$。



</details>

## 問7：複数経路

$u=x^2,z=u^2+x$ の $dz/dx$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$x$ は $u$ 経路と直接経路の2つを持つ。$dz/dx=2u\cdot2x+1=4x^3+1$。



</details>

## 問8：評価点

$z=x^2+y^2,x=t,y=2t$ の $t=1$ で $dz/dt$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$dz/dt=2x+2y\cdot2=2t+8t=10t$、よって10。



</details>

## 問9：1変数との関係

Jacobian連鎖律が1変数連鎖律へ戻ることを説明せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

全次元が1ならJacobianは $1\times1$ 行列、つまり通常の導関数。積 $J_fJ_g$ は $f'(g(x))g'(x)$ になる。



</details>

## 問10：誤答診断

$z=f(x,y(t))$ の微分で $f_x$ の項も入れた。$x$ が定数ならどうなるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$dx/dt=0$ なので $f_x\,dx/dt$ は0。依存していない経路からの寄与はない。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
