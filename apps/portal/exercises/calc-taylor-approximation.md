# Taylor展開と局所近似：演習

大学初年次の定期試験を想定した10問。**問題→自力で解く→解答で途中式と条件を照合**の順で使う。

教科書の[Taylor展開と局所近似](/textbook/calc-taylor-approximation)と対応しています。

## 問1：一次近似

$e^x$ を $x=0$ の周りで一次近似せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$e^0=1,(e^x)'|_0=1$ より $e^x\approx1+x$。



</details>

## 問2：二次近似

$e^x$ の0周り2次Taylor多項式を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$P_2(x)=1+x+x^2/2$。



</details>

## 問3：sin

$\sin x$ の0周り3次Taylor多項式を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\sin x=x-x^3/6+O(x^5)$ なので3次多項式は $x-x^3/6$。



</details>

## 問4：cos

$\cos x$ の0周り4次Taylor多項式を求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$1-x^2/2+x^4/24$。



</details>

## 問5：中心1

$f(x)=\ln x$ を $a=1$ の周りで2次近似せよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f(1)=0,f'(1)=1,f''(1)=-1$。よって $\ln x\approx(x-1)-(x-1)^2/2$。



</details>

## 問6：数値近似

$\sqrt{1.02}$ を $\sqrt{x}$ の $a=1$ における一次近似で求めよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$\sqrt{x}\approx1+(x-1)/2$ より $1.01$。



</details>

## 問7：係数の意味

Taylor多項式の $k$ 次係数が $f^{(k)}(a)/k!$ になる理由を簡潔に述べよ。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$k$ 回微分して $x=a$ を代入すると $(x-a)^k$ の項から $k!$ が出るため、元の $k$ 階導関数 $f^{(k)}(a)$ に一致させるには $k!$ で割る。



</details>

## 問8：誤差次数

2次Taylor近似で、条件が満たされるとき誤差は一般に $|x-a|$ の何次から現れるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

次の3次から。Lagrange余剰項は $(x-a)^3$ に比例する。



</details>

## 問9：極小との接続

$f'(a)=0,f''(a)>0$ のとき2次近似から何がわかるか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

$f(a)+\frac12f''(a)(x-a)^2$ で二次項が正なので、十分近くでは $a$ が局所最小であることを示唆する。



</details>

## 問10：誤答診断

$a=2$ 周りの展開なのに $P_2(x)=f(2)+f'(2)x+f''(2)x^2/2$ とした。何が誤りか。

<details><summary>ヒント</summary>

まず定義・成立条件・使う公式を1行で書き、その後に計算する。答えが出たら符号・単位・shape・定義域のうち該当するものを検算する。

</details>

<details><summary>完全解答</summary>

中心からの変位 $(x-2)$ を使う必要がある。正しくは $f(2)+f'(2)(x-2)+f''(2)(x-2)^2/2$。



</details>

## 採点用セルフチェック

- 最終結果だけでなく、必要な途中式がある。
- 定理・判定法を使う条件を確認している。
- 「存在しない」「判定不能」「候補」などを勝手に「0」「最小」へ置き換えていない。
- 記号の意味を説明できる。
- 解答を閉じた状態で8/10以上なら、次Topicへ進む目安になる。
