# 微分法則と一変数の連鎖律：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[微分法則と一変数の連鎖律](/textbook/calc-differentiation-rules-chain-rule)と対応しています。

## 問1：和と定数倍

$y=4x^3-5x+7$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=12x^2-5$。定数7の微分は0。



</details>

## 問2：積の微分

$y=x^2\sin x$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=2x\sin x+x^2\cos x$。



</details>

## 問3：商の微分

$y=(x^2+1)/x$ を商の公式で微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=[2x\cdot x-(x^2+1)]/x^2=(x^2-1)/x^2$。



</details>

## 問4：単層連鎖律

$y=(2x+3)^7$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=7(2x+3)^6\cdot2=14(2x+3)^6$。



</details>

## 問5：指数の合成

$y=e^{x^2-1}$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=e^{x^2-1}\cdot2x$。



</details>

## 問6：対数の合成

$y=\ln(1+x^2)$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=2x/(1+x^2)$。



</details>

## 問7：三角関数の合成

$y=\cos(3x^2)$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=-\sin(3x^2)\cdot6x=-6x\sin(3x^2)$。



</details>

## 問8：多層合成

$y=\sin(e^{2x})$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=\cos(e^{2x})\cdot e^{2x}\cdot2$。



</details>

## 問9：積＋連鎖律

$y=x(1+x^2)^3$ を微分せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$y'=(1+x^2)^3+x\cdot3(1+x^2)^2\cdot2x=(1+x^2)^2(1+7x^2)$。



</details>

## 問10：誤答診断

$(x^2+1)^5$ の微分を $5(x^2+1)^4$ とした。何が不足しているか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

内側 $x^2+1$ の微分 $2x$ が不足。正しくは $10x(x^2+1)^4$。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
