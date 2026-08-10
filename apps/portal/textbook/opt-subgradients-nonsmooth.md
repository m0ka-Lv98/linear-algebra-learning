# 劣勾配と非滑らか最適化：教科書

Course 06｜最適化

## このTopicで解く問題

|x|やL1正則化のように微分できない点があっても、凸最適化をどう続けるか。

## なぜこの概念が必要か

凸関数では接線の代わりに「関数を下から支える直線・超平面」の傾きを使える。その傾き集合がsubdifferential。

## 図の各要素は何を表しているか

<img src="/visuals/course-06/opt-subgradients-nonsmooth.png" alt="劣勾配と非滑らか最適化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

V字型の $f(x)=|x|$ を描き、x=0で複数の支持直線を重ねる。傾きgが[-1,1]なら直線 $f(0)+g(x-0)=gx$ は常にV字の下側にあるので、これら全部が0でのsubgradient。微分不能だから「傾きがない」のではなく「許される支持傾きが集合になる」。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $f$ | 凸関数 |
| $g$ | 点xでの劣勾配 |
| $∂f(x)$ | 劣勾配全体の集合 |


- $f:\mathbb R^n\to\mathbb R\cup\{+\infty\}$：凸関数。
- $g$：subgradient。
- $\partial f(x)$：xでの全subgradient集合。

## 中心となる式

$$
g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y
$$

## 中心式を前提から導く

1. 滑らかな凸関数の一次supporting inequalityを一般化する。
2. 微分不能点では1本の接線でなく複数のsupporting hyperplaneが存在し得る。
3. 0∈∂f(x*)なら全yで f(y)≥f(x*) なのでx*はglobal minimizer。

## なぜその変形をしてよいのか

凸関数で $g\in\partial f(x)$ とは全yに対し $f(y)\ge f(x)+g^T(y-x)$。微分可能なら凸性の一次条件から $\partial f(x)=\{\nabla f(x)\}$。非滑らかな点では集合が複数要素を持つ。

最適性条件 $0\in\partial f(x^*)$ は強力で、定義へg=0を代入すれば $f(y)\ge f(x^*)$ for all y。つまり凸問題ではglobal minimumを直接保証する。

## derivativeがなくても「下から支える傾き」は定義できる

凸関数 $f:\mathbb R^n\to\mathbb R$ に対し、点 $\mathbf x$ でベクトル $\mathbf g$ がsubgradientであるとは、全ての $\mathbf y$ について

$$
f(\mathbf y)\ge f(\mathbf x)+\mathbf g^T(\mathbf y-\mathbf x)
$$

が成り立つこと。右辺は $\mathbf x$ で関数に接し、全域でgraphの下側にあるaffine functionである。

$f(x)=|x|$ では $x>0$ のsubgradientは1、$x<0$ は-1。$x=0$ では任意の $g\in[-1,1]$ が

$$
|y|\ge gy
$$

を満たすので $\partial f(0)=[-1,1]$。微分不能点でも「傾き集合」を持てる。

## 最適性条件

凸関数では

$$
\mathbf0\in\partial f(\mathbf x^*)
$$

なら $f(\mathbf y)\ge f(\mathbf x^*)$ が全 $\mathbf y$ で成り立つため、$\mathbf x^*$ はglobal minimizer。smoothな $\nabla f=0$ の自然な拡張である。

## 例題1：具体的な数値・構造で解く

**問題**：$f(x)=|x-2|$ の $x=2$ におけるsubdifferentialを求め、0が含まれることから最小点を確認せよ。

**解答**：$u=x-2$ と置けば $|u|$ の0でのsubdifferentialは[-1,1]。したがって $\partial f(2)=[-1,1]$。0を含むので凸最適性条件からx=2はglobal minimizer。

## 例題2：別の条件で確認する

$f(x)=|x|+2x$。x>0でsubgradientは3、x<0で1、x=0で[-1,1]+2=[1,3]。0を含まないので0は最小ではなく、実際x→-∞でf→-∞となる。

## 結果の検算

候補gがsubgradientなら、定義不等式 $f(y)\ge f(x)+g^T(y-x)$ が任意yで成り立つ必要がある。$f(x)=|x|$ のx=0なら $g\in[-1,1]$ の端点と内部値を代入し、$g=2$ のような範囲外では具体的に不等式が破れることを確認する。

## 条件を外すと何が壊れるか

subgradientは任意の「左右微分の中間値」ではない。非凸関数では凸subdifferentialの定義が空になることもあり、Clarke subgradient等別概念が必要。

## よくある誤り

- 任意の方向ベクトルを劣勾配と呼ばない。
- 非凸関数へ凸subgradientの結論をそのまま移さない。

## 次のTopic・応用への接続

L1正則化、hinge loss、proximal gradientへつながる。soft-thresholdingは $0\in$ smooth gradient + L1 subgradient から導ける。

## 参考

- Boyd & Vandenberghe Convex Optimization

[演習へ](/exercises/opt-subgradients-nonsmooth)　|　[スライドへ](/slides/opt-subgradients-nonsmooth/)
