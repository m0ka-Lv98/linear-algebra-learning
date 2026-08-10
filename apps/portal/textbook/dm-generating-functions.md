# 母関数：教科書

Course 04｜離散数学

## このTopicで解く問題

数列全体を1本の形式的な級数へ埋め込むと、漸化式がなぜ代数計算へ変わるのか。

## なぜこの概念が必要か

母関数 A(x)=Σa_nx^n は、係数に数列を保存した形式的power series。index shiftがxの掛け算へ変換されるため、漸化式を方程式として解ける。

## 図の各要素は何を表しているか

<img src="/visuals/course-04/dm-generating-functions.png" alt="母関数の図解" style="max-height: 480px; display:block; margin:0 auto;" />

棒グラフの第n本の高さが数列係数 $a_n$。母関数 $A(x)=a_0+a_1x+a_2x^2+\cdots$ は、この係数列を1つの形式的級数へ格納する。xを掛けると棒のindexが1つ右へずれるため、漸化式のshiftが代数的な掛け算へ変わる。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $a_n$ | 数列 |
| $A(x)$ | 通常母関数 |
| $[x^n]A(x)$ | x^nの係数 |


- $a_n$：数列係数。
- $A(x)=\sum_{n\ge0}a_nx^n$：ordinary generating function。
- x：係数shiftを記録する形式変数。

## 中心となる式

$$
A(x)=\sum_{n\ge0}a_nx^n
$$

## 中心式を前提から導く

1. 漸化式の両辺にx^nを掛けてnについて足す。
2. a_{n-1}のshiftはxA(x)として表せる。
3. A(x)の代数方程式を解き、部分分数等で係数を読み戻す。

## なぜその変形をしてよいのか

母関数では解析的収束より「係数を操作する形式的冪級数」として扱うことが多い。$A(x)=\sum_{n\ge0}a_nx^n$ にxを掛けると $xA=\sum_{n\ge1}a_{n-1}x^n$。index shiftが明示的に表せる。

例えばFibonacci $F_n=F_{n-1}+F_{n-2}$ に対し、n≥2で両辺へ $x^n$ を掛けて和を取り、初期項を分離すると $F(x)-x=xF(x)+x^2F(x)$。したがって $F(x)=x/(1-x-x^2)$。ここから部分分数で閉形式も得られる。

## 数列を「係数」として1つの式へ埋め込む

数列 $a_0,a_1,\ldots$ のordinary generating functionを

$$
A(x)=\sum_{n=0}^\infty a_nx^n
$$

と定義する。ここではまず解析的収束より形式的冪級数として、係数操作を数列操作へ対応させる。

$xA(x)$ の $x^n$ 係数は $a_{n-1}$ なのでindex shiftを表す。二つの級数の積

$$
A(x)B(x)=\sum_{n\ge0}\left(\sum_{k=0}^n a_kb_{n-k}\right)x^n
$$

では係数がconvolutionになる。

## Fibonacci recurrenceを解く例

$F_0=0,F_1=1,F_n=F_{n-1}+F_{n-2}$ とし $F(x)=\sum_{n\ge0}F_nx^n$。recurrenceを係数ごとに足すと

$$
F(x)-x=xF(x)+x^2F(x)
$$

だから

$$
F(x)=\frac{x}{1-x-x^2}.
$$

recurrenceが代数方程式へ変わった。さらに分母を因数分解すればBinet formulaへ進める。

## 例題1：具体的な数値・構造で解く

**問題**：漸化式 $a_n=a_{n-1}+1$ ($n\ge1$), $a_0=0$ の母関数を求め、係数から $a_n$ を復元せよ。

**解答**：$A=\sum_{n\ge0}a_nx^n$。$A=xA+\sum_{n\ge1}x^n=xA+x/(1-x)$。よって $A=x/(1-x)^2$。$1/(1-x)^2=\sum_{n\ge0}(n+1)x^n$ なので $A=\sum_{n\ge1}n x^n$、ゆえに $a_n=n$。

## 例題2：別の条件で確認する

$a_n=2a_{n-1}$, $a_0=1$ なら $A-1=2xA$、よって $A=1/(1-2x)=\sum(2x)^n$。係数比較から $a_n=2^n$。

## 結果の検算

生成関数の恒等式を得たら、$x^0,x^1,x^2$ の係数を展開して元の数列・漸化式と一致するか確認する。閉形式を導いた場合も最初の数項を直接計算し、initial conditionを満たすかを検算する。

## 条件を外すと何が壊れるか

形式的母関数で係数操作をしている段階と、実数xへ代入して解析関数として扱う段階を混同しない。収束半径を必要とする議論では別途確認する。

## よくある誤り

- 解析的収束が不要な形式的母関数の議論と、関数としての収束を区別する。
- 初期条件の補正項を落とさない。

## 次のTopic・応用への接続

組合せ数え上げ、確率母関数、z-transform、漸化式解析へ広がる。Course 05の差分方程式・signal processingとも接続する。

## 参考

- MIT Mathematics for Computer Science: Generating Functions

[演習へ](/exercises/dm-generating-functions)　|　[スライドへ](/slides/dm-generating-functions/)
