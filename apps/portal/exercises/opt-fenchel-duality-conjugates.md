# Fenchel共役とFenchel双対：演習

Course 06｜最適化

[教科書](/textbook/opt-fenchel-duality-conjugates)

## 問題1

$f(x)=|x|$ のFenchel共役を求めよ。

<details><summary>完全解答</summary>

$f^*(y)=\sup_x(yx-|x|)$。$|y|\le1$ なら $yx\le|x|$ なのでsup=0（x=0で達成）。$|y|>1$ なら符号を合わせて|x|→∞とすると無限大。したがって $f^*(y)=0$ for $|y|\le1$, $+\infty$ otherwise。

</details>

## 問題2

「Fenchel共役とFenchel双対」の導出を、最初の段階「1. 定義から任意x,yについて y^Tx-f(x)≤f*(y)。」から始めて中心式まで再構成せよ。途中で「定義 $f^*(y)=\sup_x(y^Tx-f(x))$ から任意xについて $y^Tx-f(x)\le f^*(y)$、すなわちFenchel–Young $f(x)+f^*(y)\ge x^Ty$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 定義から任意x,yについて y^Tx-f(x)≤f*(y)。
2. 並べ替えて f(x)+f*(y)≥x^Ty (Fenchel–Young)。
3. 等号条件 y∈∂f(x) がprimal-dual最適性を与える。

定義 $f^*(y)=\sup_x(y^Tx-f(x))$ から任意xについて $y^Tx-f(x)\le f^*(y)$、すなわちFenchel–Young $f(x)+f^*(y)\ge x^Ty$。

等号はxがsupremumを達成する条件 $0\in\partial_x[f(x)-y^Tx]$、すなわち $y\in\partial f(x)$ と一致する。smooth strict convexなら $y=\nabla f(x)$ と $x=\nabla f^*(y)$ が双対座標変換になる。

</details>

## 問題3

図 `/visuals/course-06/opt-fenchel-duality-conjugates.png` では「凸関数 $f(x)=x^2/2$ と、その下に接する傾きyの直線を描く。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-06/opt-fenchel-duality-conjugates.png" alt="Fenchel共役とFenchel双対の図解" style="max-height: 480px; display:block; margin:0 auto;" />

凸関数 $f(x)=x^2/2$ と、その下に接する傾きyの直線を描く。$yx-f(x)$ の最大値は、傾きyを固定したとき直線をどこまで上へ持ち上げられるかを測り、その高さが $f^*(y)$。接点では $y\in\partial f(x)$。

</details>

## 問題4

「Fenchel共役とFenchel双対」の第二例「$f(x)=x^2/2$ では $yx-x^2/2$ をxで最大化。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

$f(x)=x^2/2$ では $yx-x^2/2$ をxで最大化。微分 $y-x=0$ からx=y、値は $y^2/2$。したがって $f^*(y)=y^2/2$。

</details>

## 問題5

Fenchel共役とFenchel双対で Fenchel共役、primal変数、dual変数 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`opt-fenchel-duality-conjugates` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $f*$ | Fenchel共役 |
| $x$ | primal変数 |
| $y$ | dual変数 |


- $f^*$：fのFenchel conjugate。
- $x$：primal variable、$y$：dual slope。
- $\sup$：上限（達成されない場合もある）。

</details>

## 問題6

警告「supremumが有限とは限らない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

supremumが有限とは限らない。$f(x)=0$ for all x ならy≠0で $yx$ は無限に大きくでき、$f^*(y)=+\infty$。extended-real-valued convex functionとして扱う理由である。

</details>

## 問題7

よくある誤り「Legendre transformと完全に同じ条件だと思わない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- Legendre transformと完全に同じ条件だと思わない。
- supが有限になる定義域を確認する。

supremumが有限とは限らない。$f(x)=0$ for all x ならy≠0で $yx$ は無限に大きくでき、$f^*(y)=+\infty$。extended-real-valued convex functionとして扱う理由である。

</details>

## 問題8

「Fenchel共役とFenchel双対」の例題1を再計算し、その結果に対して次の検算を実行せよ：計算した共役 $f^*(y)$ についてFenchel–Young不等式 $f(x)+f^*(y)\ge x^Ty$ を数値代入で確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$f^*(y)=\sup_x(yx-|x|)$。$|y|\le1$ なら $yx\le|x|$ なのでsup=0（x=0で達成）。$|y|>1$ なら符号を合わせて|x|→∞とすると無限大。したがって $f^*(y)=0$ for $|y|\le1$, $+\infty$ otherwise。

検算：
計算した共役 $f^*(y)$ についてFenchel–Young不等式 $f(x)+f^*(y)\ge x^Ty$ を数値代入で確認する。微分可能な凸関数なら等号条件 $y=\nabla f(x)$ も確認し、primal/dual対応が整合するかを見る。

</details>

## 問題9

後続への接続「Lagrange duality、regularization、exponential family、mirror descentに現れる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

Lagrange duality、regularization、exponential family、mirror descentに現れる。entropyの共役がlog-sum-expになる関係はsoftmaxとも直結する。

</details>

## 問題10

中心問題「関数を傾き空間へ写すFenchel共役が、なぜ双対問題と正則化の理解に役立つか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ f^*(y)=\sup_x\{y^Tx-f(x)\} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「supremumが有限とは限らない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $f*$ | Fenchel共役 |
| $x$ | primal変数 |
| $y$ | dual変数 |


- $f^*$：fのFenchel conjugate。
- $x$：primal variable、$y$：dual slope。
- $\sup$：上限（達成されない場合もある）。

中心式：
$$
f^*(y)=\sup_x\{y^Tx-f(x)\}
$$

導出：
1. 定義から任意x,yについて y^Tx-f(x)≤f*(y)。
2. 並べ替えて f(x)+f*(y)≥x^Ty (Fenchel–Young)。
3. 等号条件 y∈∂f(x) がprimal-dual最適性を与える。

根拠：
定義 $f^*(y)=\sup_x(y^Tx-f(x))$ から任意xについて $y^Tx-f(x)\le f^*(y)$、すなわちFenchel–Young $f(x)+f^*(y)\ge x^Ty$。

等号はxがsupremumを達成する条件 $0\in\partial_x[f(x)-y^Tx]$、すなわち $y\in\partial f(x)$ と一致する。smooth strict convexなら $y=\nabla f(x)$ と $x=\nabla f^*(y)$ が双対座標変換になる。

具体例：
**問題**：$f(x)=|x|$ のFenchel共役を求めよ。

**解答**：$f^*(y)=\sup_x(yx-|x|)$。$|y|\le1$ なら $yx\le|x|$ なのでsup=0（x=0で達成）。$|y|>1$ なら符号を合わせて|x|→∞とすると無限大。したがって $f^*(y)=0$ for $|y|\le1$, $+\infty$ otherwise。

失敗条件：
supremumが有限とは限らない。$f(x)=0$ for all x ならy≠0で $yx$ は無限に大きくでき、$f^*(y)=+\infty$。extended-real-valued convex functionとして扱う理由である。

</details>
