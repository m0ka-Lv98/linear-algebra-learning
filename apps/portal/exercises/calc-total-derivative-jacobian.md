# 全微分とJacobian：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[全微分とJacobian](/textbook/calc-total-derivative-jacobian)と対応しています。

## 問1：shape

$\mathbf f:\mathbb R^3\to\mathbb R^2$ のJacobianのshapeは。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

出力次元×入力次元なので $2\times3$。



</details>

## 問2：Jacobian計算

$\mathbf f(x,y)=[x+y,xy]^T$ のJacobianを求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$J=\begin{bmatrix}1&1\\y&x\end{bmatrix}$。



</details>

## 問3：点で評価

上の $J$ を $(2,3)$ で評価せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\begin{bmatrix}1&1\\3&2\end{bmatrix}$。



</details>

## 問4：線形近似

$(2,3)$ で $d\mathbf x=[0.1,0]^T$ のとき出力変化を一次近似せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$Jd\mathbf x=[0.1,0.3]^T$。



</details>

## 問5：scalar output

$f(x,y)=x^2+3y$ のJacobianと勾配の関係を書け。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$J_f=[2x,3]$、$\nabla f=[2x,3]^T$ なので $J_f=\nabla f^T$。



</details>

## 問6：全微分

$f=x^2y$ の全微分 $df$ を書け。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f_x=2xy,f_y=x^2$ より $df=2xy\,dx+x^2\,dy$。



</details>

## 問7：接平面近似

$f=x^2+y^2$ を $(1,1)$ 近傍で一次近似せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f(1,1)=2,\nabla f=[2,2]^T$。よって $f(x,y)\approx2+2(x-1)+2(y-1)$。



</details>

## 問8：shape検算

$J$ が $4\times3$, $d\mathbf x$ が $3\times1$ のとき $Jd\mathbf x$ のshapeは。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$4\times1$。出力次元4に一致する。



</details>

## 問9：一次近似の限界

なぜ $d\mathbf x$ が大きいと $Jd\mathbf x$ の近似誤差が増えやすいか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

Jacobianは点の近くでの一次項だけを使うため。二次以上の非線形項が無視できなくなる。



</details>

## 問10：誤答診断

$\mathbb R^2\to\mathbb R^3$ のJacobianを $2\times3$ とした。正しいshapeと理由は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$3\times2$。行が3つの出力、列が2つの入力。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
