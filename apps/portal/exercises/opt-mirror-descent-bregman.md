# Mirror descentとBregman divergence：演習

Course 06｜最適化

[教科書](/textbook/opt-mirror-descent-bregman)

## 問題1

$\psi(x)=\tfrac12\|x\|_2^2$ のBregman divergenceが $\tfrac12\|x-y\|_2^2$ になることを展開して示せ。

<details><summary>完全解答</summary>

$D_\psi(x,y)=\tfrac12\|x\|^2-\tfrac12\|y\|^2-y^T(x-y)=\tfrac12\|x\|^2+\tfrac12\|y\|^2-y^Tx=\tfrac12\|x-y\|^2$。

</details>

## 問題2

「Mirror descentとBregman divergence」の導出を、最初の段階「1. 勾配で目的を一次近似する。」から始めて中心式まで再構成せよ。途中で「Bregman divergenceはstrictly convex differentiable $\psi$ から $D_\psi(x,y)=\psi(x)-\psi(y)-\nabla\psi(y)^T(x-y)$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 勾配で目的を一次近似する。
2. 動きすぎをDψで罰する。
3. ψ=||x||²/2ならDψ=||x-y||²/2となりprojected gradientへ戻る。

Bregman divergenceはstrictly convex differentiable $\psi$ から $D_\psi(x,y)=\psi(x)-\psi(y)-\nabla\psi(y)^T(x-y)$。凸性により非負だが、一般に対称でもtriangle inequalityを満たす距離でもない。

mirror descentは目的を $f(x_t)+\nabla f(x_t)^T(x-x_t)$ と一次近似し、前点から離れるpenaltyをEuclidean二乗距離ではなく $D_\psi(x,x_t)$ にする。$\psi=\|x\|^2/2$ なら通常のprojected gradient。negative entropyならsimplexに自然なmultiplicative updateが出る。

</details>

## 問題3

図 `/visuals/course-06/opt-mirror-descent-bregman.png` では「三角形が2次元probability simplex $x_1,x_2\ge0$, $x_1+x_2\le1$。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-06/opt-mirror-descent-bregman.png" alt="Mirror descentとBregman divergenceの図解" style="max-height: 480px; display:block; margin:0 auto;" />

三角形が2次元probability simplex $x_1,x_2\ge0$, $x_1+x_2\le1$。点列は境界を越えずに内部を曲がって進む。Euclideanで真っ直ぐ投影するのではなく、選んだmirror mapが作るgeometryで「近さ」を測って更新することを示す。

</details>

## 問題4

「Mirror descentとBregman divergence」の第二例「simplex上で $\psi(x)=\sum_i x_i\log x_i$ を使うと、一階条件から $x_{t+1,i}\propto x_{t,i}e^{-\eta g_i}$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

simplex上で $\psi(x)=\sum_i x_i\log x_i$ を使うと、一階条件から $x_{t+1,i}\propto x_{t,i}e^{-\eta g_i}$。正値性を保ち、最後に総和1へ正規化する。

</details>

## 問題5

Mirror descentとBregman divergenceで mirror map、Bregman divergence、step size は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`opt-mirror-descent-bregman` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $ψ$ | mirror map |
| $D_ψ(x,y)$ | Bregman divergence |
| $η$ | step size |


- $C$：feasible convex set。
- $\psi$：strictly convex mirror function。
- $D_\psi(x,y)$：Bregman divergence。
- $\eta>0$：step size。

</details>

## 問題6

警告「Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。またmirror mapのdomain境界でgradientが発散する場合があるため、初期点とdomainを確認する。

</details>

## 問題7

よくある誤り「Bregman divergenceは一般に対称でなくmetricでもない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- Bregman divergenceは一般に対称でなくmetricでもない。
- mirror mapのdomainと制約集合の関係を確認する。

Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。またmirror mapのdomain境界でgradientが発散する場合があるため、初期点とdomainを確認する。

</details>

## 問題8

「Mirror descentとBregman divergence」の例題1を再計算し、その結果に対して次の検算を実行せよ：update後の点が制約集合に残っているかを最初に確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$D_\psi(x,y)=\tfrac12\|x\|^2-\tfrac12\|y\|^2-y^T(x-y)=\tfrac12\|x\|^2+\tfrac12\|y\|^2-y^Tx=\tfrac12\|x-y\|^2$。

検算：
update後の点が制約集合に残っているかを最初に確認する。simplex上のentropy mirror mapなら各成分が正で総和1に正規化されている必要がある。Euclidean mirror mapを選んだ極限では通常のgradient descentへ戻ることも式から検算できる。

</details>

## 問題9

後続への接続「exponentiated gradient、online learning、natural gradientと関係する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

exponentiated gradient、online learning、natural gradientと関係する。確率分布・positive coneなどEuclidean座標が不自然な問題でgeometry選択が重要になる。

</details>

## 問題10

中心問題「Euclidean距離が自然でない確率simplexなどで、勾配法のgeometryをどう変えるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ x_{t+1}=\arg\min_{x\in C}\{\eta\nabla f(x_t)^Tx+D_\psi(x,x_t)\} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $ψ$ | mirror map |
| $D_ψ(x,y)$ | Bregman divergence |
| $η$ | step size |


- $C$：feasible convex set。
- $\psi$：strictly convex mirror function。
- $D_\psi(x,y)$：Bregman divergence。
- $\eta>0$：step size。

中心式：
$$
x_{t+1}=\arg\min_{x\in C}\{\eta\nabla f(x_t)^Tx+D_\psi(x,x_t)\}
$$

導出：
1. 勾配で目的を一次近似する。
2. 動きすぎをDψで罰する。
3. ψ=||x||²/2ならDψ=||x-y||²/2となりprojected gradientへ戻る。

根拠：
Bregman divergenceはstrictly convex differentiable $\psi$ から $D_\psi(x,y)=\psi(x)-\psi(y)-\nabla\psi(y)^T(x-y)$。凸性により非負だが、一般に対称でもtriangle inequalityを満たす距離でもない。

mirror descentは目的を $f(x_t)+\nabla f(x_t)^T(x-x_t)$ と一次近似し、前点から離れるpenaltyをEuclidean二乗距離ではなく $D_\psi(x,x_t)$ にする。$\psi=\|x\|^2/2$ なら通常のprojected gradient。negative entropyならsimplexに自然なmultiplicative updateが出る。

具体例：
**問題**：$\psi(x)=\tfrac12\|x\|_2^2$ のBregman divergenceが $\tfrac12\|x-y\|_2^2$ になることを展開して示せ。

**解答**：$D_\psi(x,y)=\tfrac12\|x\|^2-\tfrac12\|y\|^2-y^T(x-y)=\tfrac12\|x\|^2+\tfrac12\|y\|^2-y^Tx=\tfrac12\|x-y\|^2$。

失敗条件：
Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。またmirror mapのdomain境界でgradientが発散する場合があるため、初期点とdomainを確認する。

</details>
