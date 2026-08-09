# Hessianと二次近似：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[Hessianと二次近似](/textbook/calc-hessian-second-order)と対応しています。

## 問1：Hessian

$f=x^2+3xy+2y^2$ のHessianを求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$H=\begin{bmatrix}2&3\\3&4\end{bmatrix}$。



</details>

## 問2：対称性

十分滑らかな関数でHessianが対称になる理由を述べよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

Clairautの定理により混合偏微分 $f_{xy}=f_{yx}$ が成り立つため。



</details>

## 問3：局所最小

$f=x^2+y^2$ の原点をHessianで分類せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$H=\mathrm{diag}(2,2)$ は正定値。原点は厳密な局所最小。



</details>

## 問4：局所最大

$f=-x^2-2y^2$ の原点を分類せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$H=\mathrm{diag}(-2,-4)$ は負定値。厳密な局所最大。



</details>

## 問5：鞍点

$f=x^2-y^2$ の原点を分類せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

固有値2,-2で不定。原点は鞍点。



</details>

## 問6：2変数判定

停留点で $f_{xx}=2,f_{yy}=5,f_{xy}=1$。分類せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$D=2\cdot5-1=9>0$ かつ $f_{xx}>0$ なので局所最小。



</details>

## 問7：判定不能

停留点で $D=0$ のとき何が言えるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

二階微分判定だけでは結論できない。高次項や別の解析が必要。



</details>

## 問8：二次形式

$H=I$, $\mathbf h=[a,b]^T$ のとき $\mathbf h^TH\mathbf h$ は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$a^2+b^2\ge0$。非ゼロなら正なので $I$ は正定値。



</details>

## 問9：Taylor二次

停留点 $\mathbf x^*$ の近傍で二次近似を書け。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f(\mathbf x^*)=0$ なので $f(\mathbf x^*+\mathbf h)\approx f(\mathbf x^*)+\frac12\mathbf h^TH_f(\mathbf x^*)\mathbf h$。



</details>

## 問10：誤答診断

Hessianの全成分が正なら正定値、と判断した。なぜ危険か。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

成分が正であることと二次形式が全方向で正であることは別。正定値は固有値や主座小行列などで判定する。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
