# 集合・関数・写像：教科書

Course 00｜学習準備

## このTopicの目的

関数を「式」ではなく、定義域の各要素を終域のちょうど1要素へ対応させる写像としてどう読むか。

## 図の意味

<img src="/visuals/course-00/prep-sets-functions-mappings.png" alt="集合・関数・写像の図解" style="max-height: 480px; display:block; margin:0 auto;" />

左の点集合が定義域 $A$、右が終域 $B$。各左点から矢印がちょうど1本出ていることが「関数」である条件。同じ右点へ複数矢印が入るのは許される。右側で実際に矢印が到達した点だけを集めた集合が値域 $f(A)$ で、終域B全体とは一致しない場合がある。

## 定義から順に理解する

### 集合
$x\in A$ はxが集合Aの要素、$A\subseteq B$ はAの全要素がBにも属することを表す。和集合 $A\cup B$、共通部分 $A\cap B$、差集合 $A\setminus B$ を定義する。

### 関数
$f:A\to B$ は、各 $x\in A$ に対してただ1つの $f(x)\in B$ を対応させる規則。Aが定義域、Bが終域。値域は $f(A)=\{f(x):x\in A\}\subseteq B$。

### 単射・全射・全単射
単射は $f(x_1)=f(x_2)\Rightarrow x_1=x_2$。全射は $f(A)=B$。両方なら全単射で、逆関数 $f^{-1}:B\to A$ を定義できる。

## imageとpreimageを区別する

部分集合 $S\subseteq A$ に対して

$$
f(S)=\{f(x):x\in S\}\subseteq B
$$

をimageと呼ぶ。一方 $T\subseteq B$ に対して

$$
f^{-1}(T)=\{x\in A:f(x)\in T\}
$$

をpreimageと呼ぶ。ここで $f^{-1}(T)$ は、関数 $f$ 自体に逆関数が存在しなくても定義できる。

例として $f(x)=x^2$ とすると、$f^{-1}([1,4])=[-2,-1]\cup[1,2]$。$f$ は $\mathbb R\to\mathbb R$ では全単射でないが、集合のpreimageは問題なく取れる。

## 合成関数では定義域を確認する

$f:A\to B$、$g:B\to C$ なら

$$
(g\circ f)(x)=g(f(x))
$$

で $g\circ f:A\to C$。$f(x)$ が必ず $g$ の定義域へ入ることが必要である。

たとえば $f(x)=x-2$、$g(u)=\sqrt u$ とすると、式 $g(f(x))=\sqrt{x-2}$ は $x\ge2$ でしか実数値を持たない。「式を代入できた」だけでは関数の定義域は確定しない。

## 単射・全射を方程式として検査する

単射を調べるときは $f(x_1)=f(x_2)$ から $x_1=x_2$ が必ず従うかを調べる。全射を調べるときは任意の $y\in B$ に対して方程式 $f(x)=y$ を満たす $x\in A$ が存在するかを見る。この2つを分離すると逆関数の存在条件が明確になる。

## 具体例

**例**：$f:\mathbb R\to\mathbb R$, $f(x)=x^2$ は単射でも全射でもない。終域を $[0,\infty)$ に変えれば全射だが単射ではない。定義域を $[0,\infty)$ にも制限すると全単射になり $f^{-1}(y)=\sqrt y$。

## 条件を外すと

「式が同じなら同じ関数」ではない。$x^2:\mathbb R\to\mathbb R$ と $x^2:[0,\infty)\to[0,\infty)$ は定義域・終域が違う別の関数。

## 後続Courseでどう使うか

線形写像、確率変数、loss function、neural networkはすべて集合間の写像として読める。

[演習へ](/exercises/prep-sets-functions-mappings)　|　[スライドへ](/slides/prep-sets-functions-mappings/)
