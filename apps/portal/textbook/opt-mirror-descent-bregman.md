# Mirror descentとBregman divergence：教科書

Course 06｜最適化

## このTopicで解く問題

Euclidean距離が自然でない確率simplexなどで、勾配法のgeometryをどう変えるか。

## なぜこの概念が必要か

mirror descentは、現在点近傍をEuclidean二乗距離で罰する代わりに、strictly convexなmirror mapが作るBregman divergenceを使う。

## 図の各要素は何を表しているか

<img src="/visuals/course-06/opt-mirror-descent-bregman.png" alt="Mirror descentとBregman divergenceの図解" style="max-height: 480px; display:block; margin:0 auto;" />

三角形が2次元probability simplex $x_1,x_2\ge0$, $x_1+x_2\le1$。点列は境界を越えずに内部を曲がって進む。Euclideanで真っ直ぐ投影するのではなく、選んだmirror mapが作るgeometryで「近さ」を測って更新することを示す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $ψ$ | mirror map |
| $D_ψ(x,y)$ | Bregman divergence |
| $η$ | step size |


- $C$：feasible convex set。
- $\psi$：strictly convex mirror function。
- $D_\psi(x,y)$：Bregman divergence。
- $\eta>0$：step size。

## 中心となる式

$$
x_{t+1}=\arg\min_{x\in C}\{\eta\nabla f(x_t)^Tx+D_\psi(x,x_t)\}
$$

## 中心式を前提から導く

1. 勾配で目的を一次近似する。
2. 動きすぎをDψで罰する。
3. ψ=||x||²/2ならDψ=||x-y||²/2となりprojected gradientへ戻る。

## なぜその変形をしてよいのか

Bregman divergenceはstrictly convex differentiable $\psi$ から $D_\psi(x,y)=\psi(x)-\psi(y)-\nabla\psi(y)^T(x-y)$。凸性により非負だが、一般に対称でもtriangle inequalityを満たす距離でもない。

mirror descentは目的を $f(x_t)+\nabla f(x_t)^T(x-x_t)$ と一次近似し、前点から離れるpenaltyをEuclidean二乗距離ではなく $D_\psi(x,x_t)$ にする。$\psi=\|x\|^2/2$ なら通常のprojected gradient。negative entropyならsimplexに自然なmultiplicative updateが出る。

## Euclidean distanceを使わないgradient step

gradient descentは

$$
\mathbf x_{t+1}=\arg\min_{\mathbf x}
\left\{\eta\nabla f(\mathbf x_t)^T\mathbf x+\frac12\|\mathbf x-\mathbf x_t\|_2^2\right\}
$$

と書ける。二次距離の代わりにstrictly convexなpotential $\psi$ から作るBregman divergence

$$
D_\psi(\mathbf x,\mathbf y)
=\psi(\mathbf x)-\psi(\mathbf y)-\nabla\psi(\mathbf y)^T(\mathbf x-\mathbf y)
$$

を使うとmirror descent

$$
\mathbf x_{t+1}=\arg\min_{\mathbf x\in C}
\left\{\eta\nabla f(\mathbf x_t)^T\mathbf x+D_\psi(\mathbf x,\mathbf x_t)\right\}
$$

になる。

制約が確率simplexならnegative entropy $\psi(\mathbf x)=\sum_i x_i\log x_i$ を選ぶと、dual座標で加法updateした後に指数化・正規化され、multiplicative weights型のupdateが出る。geometryを問題の定義域へ合わせる発想が核心である。

## 例題1：具体的な数値・構造で解く

**問題**：$\psi(x)=\tfrac12\|x\|_2^2$ のBregman divergenceが $\tfrac12\|x-y\|_2^2$ になることを展開して示せ。

**解答**：$D_\psi(x,y)=\tfrac12\|x\|^2-\tfrac12\|y\|^2-y^T(x-y)=\tfrac12\|x\|^2+\tfrac12\|y\|^2-y^Tx=\tfrac12\|x-y\|^2$。

## 例題2：別の条件で確認する

simplex上で $\psi(x)=\sum_i x_i\log x_i$ を使うと、一階条件から $x_{t+1,i}\propto x_{t,i}e^{-\eta g_i}$。正値性を保ち、最後に総和1へ正規化する。

## 結果の検算

update後の点が制約集合に残っているかを最初に確認する。simplex上のentropy mirror mapなら各成分が正で総和1に正規化されている必要がある。Euclidean mirror mapを選んだ極限では通常のgradient descentへ戻ることも式から検算できる。

## 条件を外すと何が壊れるか

Bregman divergenceを普通のmetricだと思って $D(x,y)=D(y,x)$ を使わない。またmirror mapのdomain境界でgradientが発散する場合があるため、初期点とdomainを確認する。

## よくある誤り

- Bregman divergenceは一般に対称でなくmetricでもない。
- mirror mapのdomainと制約集合の関係を確認する。

## 次のTopic・応用への接続

exponentiated gradient、online learning、natural gradientと関係する。確率分布・positive coneなどEuclidean座標が不自然な問題でgeometry選択が重要になる。

## 参考

- mirror descent classical optimization

[演習へ](/exercises/opt-mirror-descent-bregman)　|　[スライドへ](/slides/opt-mirror-descent-bregman/)
