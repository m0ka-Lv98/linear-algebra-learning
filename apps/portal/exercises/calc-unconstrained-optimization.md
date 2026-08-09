# 多変数の制約なし最適化：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[多変数の制約なし最適化](/textbook/calc-unconstrained-optimization)と対応しています。

## 問1：停留点

$f=(x-2)^2+(y+1)^2$ の停留点を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f=[2(x-2),2(y+1)]^T=0$ より $(2,-1)$。



</details>

## 問2：分類

上の停留点をHessianで分類せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$H=2I$ は正定値なので厳密な局所最小。さらに関数は凸なので大域最小。



</details>

## 問3：鞍点

$f=x^2-y^2$ の停留点と分類を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

勾配0より原点。Hessianの固有値2,-2なので鞍点。



</details>

## 問4：凸性

微分可能な凸関数で $\nabla f(\mathbf x^*)=0$ なら何が言えるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\mathbf x^*$ は大域最小。凸関数では局所最小と大域最小が一致する。



</details>

## 問5：GD 1 step

$f=x^2+y^2$, $\mathbf x_0=[2,-1]^T$, $\eta=0.1$。1step後を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f=[4,-2]^T$。$\mathbf x_1=[2,-1]-0.1[4,-2]=[1.6,-0.8]^T$。



</details>

## 問6：符号

gradient descentでなぜ $-\nabla f$ を使うか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$-\nabla f$ は単位方向あたりで関数を最も速く減らす最急降下方向だから。



</details>

## 問7：step size

$\eta$ が極端に大きいと何が起こりうるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

最小点を大きく飛び越えて振動・発散することがある。



</details>

## 問8：二次関数

$f(\mathbf x)=\frac12\mathbf x^TA\mathbf x-\mathbf b^T\mathbf x$ で $A$ 対称とする。勾配を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\nabla f=A\mathbf x-\mathbf b$。



</details>

## 問9：線形方程式

上の二次関数で停留条件を書け。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$A\mathbf x^*=\mathbf b$。$A$ が正定値ならこの解は一意な大域最小。



</details>

## 問10：誤答診断

$\nabla f=0$ を解いて「大域最小」とだけ書いた。追加で何を確認すべきか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

Hessianによる局所分類、または凸性など大域最小を保証する条件を確認する。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
