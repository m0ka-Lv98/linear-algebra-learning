# 勾配と方向微分：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[勾配と方向微分](/textbook/calc-gradient-directional-derivative)と対応しています。

## 問1：勾配

$f=x^2+xy+y^2$ の勾配を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f=[2x+y,\ x+2y]^T$。



</details>

## 問2：点での勾配

上の関数で $(1,2)$ の勾配を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[2+2,1+4]^T=[4,5]^T$。



</details>

## 問3：正規化

$\mathbf v=[3,4]^T$ を単位ベクトルにせよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\|\mathbf v\|=5$ なので $\mathbf u=[3/5,4/5]^T$。



</details>

## 問4：方向微分

$f=x^2+y^2$ の $(1,2)$ で $\mathbf u=[1,0]^T$ 方向の方向微分を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f=[2,4]^T$、内積より2。



</details>

## 問5：斜め方向

同じ点で $\mathbf u=[1,1]^T/\sqrt2$ 方向は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$(2+4)/\sqrt2=3\sqrt2$。



</details>

## 問6：最急上昇

$\nabla f(\mathbf x)=[-2,1]^T$ のとき最急上昇の単位方向を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[-2,1]^T/\sqrt5$。



</details>

## 問7：最急降下

同じ条件で最急降下の単位方向を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$[2,-1]^T/\sqrt5$。



</details>

## 問8：最大方向微分

$\|\nabla f\|=7$ の点で、単位方向に沿う方向微分の最大値は。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

7。Cauchy–Schwarzで最大は勾配ノルム。



</details>

## 問9：等高線

なぜ勾配は等高線に直交するか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

等高線の接線方向では $f$ が一階では変化せず方向微分0。方向微分は勾配との内積なので、内積0すなわち直交。



</details>

## 問10：誤答診断

方向ベクトル $[2,0]^T$ をそのまま方向微分式へ入れた。何に注意すべきか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

通常の方向微分は単位方向を使う。$[2,0]^T$ は長さ2なので $[1,0]^T$ に正規化する。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
