# 変数変換とJacobian determinant：教科書

Course 01｜微積分

## このTopicで解く問題

座標変換で積分するとき、なぜJacobian determinantの絶対値を掛けるのか。

## なぜこの概念が必要か

Jacobian matrixは局所的な線形変換。小さな長方形は平行四辺形へ移り、その面積倍率が determinant の絶対値になる。

## 図の各要素は何を表しているか

<img src="/visuals/course-01/calc-change-of-variables-jacobian.png" alt="変数変換とJacobian determinantの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左側の $(u,v)$ 平面にある小さな正方形格子が、写像 $T$ により右側の $(x,y)$ 平面で平行四辺形状に変形している。1セルの2本の辺ベクトルはJacobian $J_T$ の2列で近似され、その平行四辺形の面積が $|\det J_T|\,du\,dv$。GIFは恒等写像から変形を連続的に進め、局所面積倍率が生まれる様子を示す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $T(u,v)=(x,y)$ | 座標変換 |
| $J_T$ | TのJacobian matrix |
| $det J_T$ | 局所面積の符号付き倍率 |


- $T(u,v)=(x(u,v),y(u,v))$：座標変換。
- $J_T$：TのJacobian matrix。
- $|\det J_T|$：局所面積倍率。

## 中心となる式

$$
dx\,dy=|\det J_T(u,v)|\,du\,dv
$$

## 中心式を前提から導く

1. 微小変位は $d\mathbf{x}\approx J_T d\mathbf{u}$。
2. 2本の微小基底ベクトルが作る平行四辺形の面積倍率は |det J_T|。
3. Riemann和の各セル面積を変換し、極限を取る。

## なぜその変形をしてよいのか

微小変位 $d\mathbf u=(du,dv)^T$ に対し $T(\mathbf u+d\mathbf u)-T(\mathbf u)\approx J_T(\mathbf u)d\mathbf u$。したがって、u方向とv方向の微小辺はそれぞれJacobianの第1列、第2列へ写る。

2次元で2本のベクトルが張る平行四辺形の符号付き面積は行列式。積分で必要なのは面積の大きさなので絶対値を取る。1対1で滑らかな変換ならRiemann和の各セルについてこの局所倍率を掛け、極限で変数変換公式を得る。

## 線形変換で面積倍率を先に確認する

まず線形変換 $\mathbf x=\mathbf A\mathbf u$ を考える。u平面の単位正方形の2辺 $\mathbf e_1,\mathbf e_2$ は、x平面で $\mathbf A\mathbf e_1$, $\mathbf A\mathbf e_2$ へ写る。これらが張る平行四辺形の面積は

$$
|\det\mathbf A|.
$$

非線形写像 $T$ でも微小範囲では

$$
T(\mathbf u+\Delta\mathbf u)
\approx T(\mathbf u)+J_T(\mathbf u)\Delta\mathbf u
$$

と線形近似できるため、局所面積倍率が $|\det J_T|$ になる。

## 変数変換公式

Tが領域UからDへの適切な1対1滑らかな写像で、Jacobian determinantが0でないとすると

$$
\iint_D f(x,y)\,dx\,dy
=\iint_U f(T(u,v))\,|\det J_T(u,v)|\,du\,dv.
$$

右辺では二つの変更が同時に起きる。(1) 関数の入力を $(x,y)=T(u,v)$ へ置換する、(2) 面積要素をJacobian倍率で補正する。片方だけ変えると別の積分になる。

## 極座標で円の面積を検算する

単位円では $0\le r\le1$, $0\le\theta\le2\pi$、Jacobianはrなので

$$
\iint_{x^2+y^2\le1}1\,dA
=\int_0^{2\pi}\int_0^1r\,dr\,d\theta
=2\pi\cdot\frac12=\pi.
$$

既知の円面積と一致するため、r factorの必要性を独立に検算できる。

## 例題1：具体的な数値・構造で解く

**問題**：変換 $x=2u+v$, $y=u-v$ のJacobian determinantを求め、uv平面の面積1の小領域がxy平面で何倍の面積になるか答えよ。

**解答**：$J=\begin{bmatrix}2&1\\1&-1\end{bmatrix}$、$\det J=-3$。面積倍率は絶対値3なので、面積1は面積3へ写る。負号は向き反転を表す。

## 例題2：別の条件で確認する

極座標 $x=r\cos\theta$, $y=r\sin\theta$ では $J=\begin{bmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{bmatrix}$。行列式は $r(\cos^2\theta+\sin^2\theta)=r$ なので $dA=r\,dr\,d\theta$。

## 結果の検算

変換後の面積要素を直接検算する。線形写像なら単位正方形の2本の辺を行列で写し、その2ベクトルが張る平行四辺形の面積を幾何的に計算する。その値が $|\det J|$ と一致することを確認する。極座標では小さな扇形の面積が約 $r\,dr\,d\theta$ になることとも照合する。

## 条件を外すと何が壊れるか

$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。また絶対値を外すと向きを反転する変換で面積が負になってしまう。

## よくある誤り

- detではなく|det|を面積倍率に使う。
- Jacobian matrixそのものとdeterminantを混同しない。

## 次のTopic・応用への接続

確率変数変換の密度公式にも同じJacobianが現れる。normalizing flowでは、この局所体積変化をlog-determinantとして尤度へ加える。

## 参考

- MIT 18.02SC Change of Variables

[演習へ](/exercises/calc-change-of-variables-jacobian)　|　[スライドへ](/slides/calc-change-of-variables-jacobian/)
