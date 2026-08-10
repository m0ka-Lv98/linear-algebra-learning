# Fenchel共役とFenchel双対：教科書

Course 06｜最適化

## このTopicで解く問題

関数を傾き空間へ写すFenchel共役が、なぜ双対問題と正則化の理解に役立つか。

## なぜこの概念が必要か

共役 f*(y) は「傾きyを持つ線形関数がfからどれだけ上へ離れられるか」の最大値。Fenchel–Young不等式を通じてprimalとdualを結ぶ。

## 図の各要素は何を表しているか

<img src="/visuals/course-06/opt-fenchel-duality-conjugates.png" alt="Fenchel共役とFenchel双対の図解" style="max-height: 480px; display:block; margin:0 auto;" />

凸関数 $f(x)=x^2/2$ と、その下に接する傾きyの直線を描く。$yx-f(x)$ の最大値は、傾きyを固定したとき直線をどこまで上へ持ち上げられるかを測り、その高さが $f^*(y)$。接点では $y\in\partial f(x)$。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $f*$ | Fenchel共役 |
| $x$ | primal変数 |
| $y$ | dual変数 |


- $f^*$：fのFenchel conjugate。
- $x$：primal variable、$y$：dual slope。
- $\sup$：上限（達成されない場合もある）。

## 中心となる式

$$
f^*(y)=\sup_x\{y^Tx-f(x)\}
$$

## 中心式を前提から導く

1. 定義から任意x,yについて y^Tx-f(x)≤f*(y)。
2. 並べ替えて f(x)+f*(y)≥x^Ty (Fenchel–Young)。
3. 等号条件 y∈∂f(x) がprimal-dual最適性を与える。

## なぜその変形をしてよいのか

定義 $f^*(y)=\sup_x(y^Tx-f(x))$ から任意xについて $y^Tx-f(x)\le f^*(y)$、すなわちFenchel–Young $f(x)+f^*(y)\ge x^Ty$。

等号はxがsupremumを達成する条件 $0\in\partial_x[f(x)-y^Tx]$、すなわち $y\in\partial f(x)$ と一致する。smooth strict convexなら $y=\nabla f(x)$ と $x=\nabla f^*(y)$ が双対座標変換になる。

## conjugateは「傾きyでどこまで線形関数を上げられるか」

関数 $f$ のFenchel conjugateを

$$
f^*(\mathbf y)=\sup_{\mathbf x}\{\mathbf y^T\mathbf x-f(\mathbf x)\}
$$

と定義する。定義から任意の $\mathbf x,\mathbf y$ について

$$
f(\mathbf x)+f^*(\mathbf y)\ge\mathbf y^T\mathbf x
$$

が直ちに得られる。これがFenchel–Young inequality。

$f(x)=x^2/2$ なら最大化するxは微分して $y-x=0$ より $x=y$、したがって $f^*(y)=y^2/2$。

## primalからdualを作る基本形

$$
\min_{\mathbf x} f(\mathbf x)+g(A\mathbf x)
$$

に補助変数 $\mathbf z=A\mathbf x$ とdual変数 $\mathbf y$ を導入するとLagrangianは

$$
L=f(\mathbf x)+g(\mathbf z)+\mathbf y^T(A\mathbf x-\mathbf z).
$$

$\mathbf x,\mathbf z$ についてinfを取るとconjugate定義から

$$
\max_{\mathbf y}-f^*(-A^T\mathbf y)-g^*(\mathbf y)
$$

がdual。conjugateは単なる別関数ではなく、Lagrangianのinfimumを閉形式へ変換する道具である。

## 例題1：具体的な数値・構造で解く

**問題**：$f(x)=|x|$ のFenchel共役を求めよ。

**解答**：$f^*(y)=\sup_x(yx-|x|)$。$|y|\le1$ なら $yx\le|x|$ なのでsup=0（x=0で達成）。$|y|>1$ なら符号を合わせて|x|→∞とすると無限大。したがって $f^*(y)=0$ for $|y|\le1$, $+\infty$ otherwise。

## 例題2：別の条件で確認する

$f(x)=x^2/2$ では $yx-x^2/2$ をxで最大化。微分 $y-x=0$ からx=y、値は $y^2/2$。したがって $f^*(y)=y^2/2$。

## 結果の検算

計算した共役 $f^*(y)$ についてFenchel–Young不等式 $f(x)+f^*(y)\ge x^Ty$ を数値代入で確認する。微分可能な凸関数なら等号条件 $y=\nabla f(x)$ も確認し、primal/dual対応が整合するかを見る。

## 条件を外すと何が壊れるか

supremumが有限とは限らない。$f(x)=0$ for all x ならy≠0で $yx$ は無限に大きくでき、$f^*(y)=+\infty$。extended-real-valued convex functionとして扱う理由である。

## よくある誤り

- Legendre transformと完全に同じ条件だと思わない。
- supが有限になる定義域を確認する。

## 次のTopic・応用への接続

Lagrange duality、regularization、exponential family、mirror descentに現れる。entropyの共役がlog-sum-expになる関係はsoftmaxとも直結する。

## 参考

- Boyd & Vandenberghe Convex Optimization

[演習へ](/exercises/opt-fenchel-duality-conjugates)　|　[スライドへ](/slides/opt-fenchel-duality-conjugates/)
