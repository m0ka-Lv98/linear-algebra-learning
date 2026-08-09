# 積分と微積分学の基本定理：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[積分と微積分学の基本定理](/textbook/calc-integrals-fundamental-theorem)と対応しています。

## 問1：Riemann和の意味

$\sum f(x_i^*)\Delta x$ の $f(x_i^*)$ と $\Delta x$ は何を表すか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

各小区間での代表的な高さと小区間の幅。積は細長い長方形の符号付き面積を近似する。



</details>

## 問2：基本積分

$\int_0^3 2x\,dx$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

原始関数は $x^2$。$[x^2]_0^3=9$。



</details>

## 問3：符号付き面積

$\int_{-2}^{2}x\,dx$ を求め、0になる理由を説明せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

奇関数を対称区間で積分するので0。左右の符号付き面積が打ち消す。



</details>

## 問4：幾何学的面積

$y=x$ と $x$ 軸で、$-1\le x\le1$ に囲まれる総面積を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\int_{-1}^0(-x)dx+\int_0^1x dx=1/2+1/2=1$。



</details>

## 問5：FTC

$F(x)=\int_1^x(t^2+1)dt$ の $F'(x)$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

FTCより $F'(x)=x^2+1$。



</details>

## 問6：変数上端

$G(x)=\int_0^{3x}\sin t\,dt$ の微分を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$G'(x)=\sin(3x)\cdot3=3\sin(3x)$。



</details>

## 問7：上下端逆転

$\int_2^0 x\,dx$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[x^2/2]_2^0=0-2=-2$。上下端を交換すると符号が反転する。



</details>

## 問8：積分定数

不定積分 $\int 4x^3dx$ を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$x^4+C$。$C$ は任意定数。定積分では差を取るため積分定数は相殺される。



</details>

## 問9：単位

速度 $v(t)$ が m/s、時間 $t$ が s のとき $\int v(t)dt$ の単位は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

m/s × s = m。速度の積分は位置の変化量。



</details>

## 問10：誤答診断

$\int_0^1x^2dx=x^3/3+C|_0^1=1/3+C$ とした答案の誤りは。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

定積分では同じ原始関数を上下端で引くので定数 $C$ は相殺される。答えは $1/3$。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
