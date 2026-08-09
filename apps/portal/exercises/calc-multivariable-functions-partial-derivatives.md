# 多変数関数と偏微分：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[多変数関数と偏微分](/textbook/calc-multivariable-functions-partial-derivatives)と対応しています。

## 問1：shape

$f(x,y)=x+y^2$ はどの空間からどの空間への写像か。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

入力 $(x,y)\in\mathbb R^2$、出力は実数なので $f:\mathbb R^2\to\mathbb R$。



</details>

## 問2：x偏微分

$f=x^3y+2y^2$ の $f_x$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y$ を定数として $f_x=3x^2y$。



</details>

## 問3：y偏微分

同じ $f=x^3y+2y^2$ の $f_y$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$x$ を定数として $f_y=x^3+4y$。



</details>

## 問4：点で評価

$f=x^2+xy$ の $f_x(1,3)$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f_x=2x+y$、よって $2+3=5$。



</details>

## 問5：二階偏微分

$f=x^2y^2$ の $f_{xx}$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f_x=2xy^2$、さらに $x$ で偏微分して $f_{xx}=2y^2$。



</details>

## 問6：混合偏微分

$f=x^2y^3$ の $f_{xy}$ と $f_{yx}$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f_{xy}=6xy^2$、$f_{yx}=6xy^2$。一致する。



</details>

## 問7：等高線

$f(x,y)=x^2+y^2$ の等高線 $f=4$ は何か。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$x^2+y^2=4$、原点中心半径2の円。



</details>

## 問8：解釈

$f_x(a,b)>0$ は何を意味するか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y=b$ を固定し $x$ を増やす方向へ少し動くと、点 $(a,b)$ 近傍で $f$ が増えることを表す。



</details>

## 問9：固定変数

$f(x,y)=\sin(xy)$ の $f_x$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y$ を定数とみなし連鎖律より $f_x=y\cos(xy)$。



</details>

## 問10：誤答診断

$f=x^2y$ の $f_x$ を $2x$ とした。何を落としているか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y$ は定数だが消えるわけではない。$x^2y$ を $x$ で微分すると $2xy$。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
