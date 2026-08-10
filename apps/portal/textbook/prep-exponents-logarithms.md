# 指数と対数：教科書

Course 00｜学習準備

## このTopicの目的

指数法則と対数法則を、定義域の条件まで含めて使い、指数的な積を加法へ変換するにはどうするか。

## 図の意味

<img src="/visuals/course-00/prep-exponents-logarithms.png" alt="指数と対数の図解" style="max-height: 480px; display:block; margin:0 auto;" />

指数関数 $y=e^x$ と自然対数 $y=\log x$ が直線 $y=x$ に関して鏡映になっている。これは互いが逆関数で、$\log(e^x)=x$、$e^{\log x}=x$（x>0）を図示する。

## 定義から順に理解する

指数法則 $a^{x+y}=a^xa^y$, $(a^x)^y=a^{xy}$ は $a>0$ を基本にする。自然指数 $e^x$ の逆関数が自然対数 $\log x$ で、定義域はx>0。

対数法則 $\log(xy)=\log x+\log y$、$\log(x^p)=p\log x$ は正のx,yで成立する。対数は非常に大きな積を和へ変えるため、likelihoodの積をlog-likelihoodの和へ変える統計で特に重要。

## 実数指数をどう考えるか

整数指数では $a^n$ は同じ数をn回掛ける操作。負整数では $a^{-n}=1/a^n$、有理数では $a^{p/q}=\sqrt[q]{a^p}$ と拡張する。実数指数 $a^x$ は連続性を保つよう極限で定義できる。実数範囲で一般の $x$ を扱うため、ここでは底 $a>0$ を基本とする。

自然指数関数 $e^x$ は特に

$$
\frac{d}{dx}e^x=e^x
$$

となる底 $e$ を使う指数関数で、微積分と確率で最も自然に現れる。

## logは「指数を取り出す」逆関数

$y=e^x$ と $x=\log y$ は同値。したがって

$$
e^{\log y}=y\quad(y>0),\qquad
\log(e^x)=x.
$$

積を和へ変える性質は逆関数の定義と指数法則から導ける。$x,y>0$ なら

$$
e^{\log x+\log y}=e^{\log x}e^{\log y}=xy,
$$

両辺へlogを適用して $\log(xy)=\log x+\log y$。

## log-sum-expでoverflowを避ける

後のsoftmaxでは $\log\sum_i e^{z_i}$ が現れる。大きな $z_i$ を直接指数化するとoverflowしやすいが、$m=\max_i z_i$ として

$$
\log\sum_i e^{z_i}
=m+\log\sum_i e^{z_i-m}
$$

とすれば指数部は0以下になる。代数的に同じ式でも数値安定性が違う典型例である。

## 具体例

$e^{2\log3}=e^{\log9}=9$。$\log(1/8)=\log 1-\log8=-3\log2$。

## 条件を外すと

$\log(x+y)=\log x+\log y$ は一般に偽。x=y=1なら左辺はlog2、右辺は0。

## 後続Courseでどう使うか

微積分の指数・対数微分、確率のlog-likelihood、softmax/log-sum-expへ接続。

[演習へ](/exercises/prep-exponents-logarithms)　|　[スライドへ](/slides/prep-exponents-logarithms/)
