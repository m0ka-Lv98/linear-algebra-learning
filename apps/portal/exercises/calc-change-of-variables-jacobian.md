# 変数変換とJacobian determinant：演習

Course 01｜微積分

[教科書](/textbook/calc-change-of-variables-jacobian)

## 問題1

変換 $x=2u+v$, $y=u-v$ のJacobian determinantを求め、uv平面の面積1の小領域がxy平面で何倍の面積になるか答えよ。

<details><summary>完全解答</summary>

$J=\begin{bmatrix}2&1\\1&-1\end{bmatrix}$、$\det J=-3$。面積倍率は絶対値3なので、面積1は面積3へ写る。負号は向き反転を表す。

</details>

## 問題2

「変数変換とJacobian determinant」の導出を、最初の段階「1. 微小変位は $d\mathbf{x}\approx J_T d\mathbf{u}$。」から始めて中心式まで再構成せよ。途中で「微小変位 $d\mathbf u=(du,dv)^T$ に対し $T(\mathbf u+d\mathbf u)-T(\mathbf u)\approx J_T(\mathbf u)d\mathbf u$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 微小変位は $d\mathbf{x}\approx J_T d\mathbf{u}$。
2. 2本の微小基底ベクトルが作る平行四辺形の面積倍率は |det J_T|。
3. Riemann和の各セル面積を変換し、極限を取る。

微小変位 $d\mathbf u=(du,dv)^T$ に対し $T(\mathbf u+d\mathbf u)-T(\mathbf u)\approx J_T(\mathbf u)d\mathbf u$。したがって、u方向とv方向の微小辺はそれぞれJacobianの第1列、第2列へ写る。

2次元で2本のベクトルが張る平行四辺形の符号付き面積は行列式。積分で必要なのは面積の大きさなので絶対値を取る。1対1で滑らかな変換ならRiemann和の各セルについてこの局所倍率を掛け、極限で変数変換公式を得る。

</details>

## 問題3

図 `/visuals/course-01/calc-change-of-variables-jacobian.png` では「左側の $(u,v)$ 平面にある小さな正方形格子が、写像 $T$ により右側の $(x,y)$ 平面で平行四辺形状に変形している。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-01/calc-change-of-variables-jacobian.png" alt="変数変換とJacobian determinantの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左側の $(u,v)$ 平面にある小さな正方形格子が、写像 $T$ により右側の $(x,y)$ 平面で平行四辺形状に変形している。1セルの2本の辺ベクトルはJacobian $J_T$ の2列で近似され、その平行四辺形の面積が $|\det J_T|\,du\,dv$。GIFは恒等写像から変形を連続的に進め、局所面積倍率が生まれる様子を示す。

</details>

## 問題4

「変数変換とJacobian determinant」の第二例「極座標 $x=r\cos\theta$, $y=r\sin\theta$ では $J=\begin{bmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{bmatrix}$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

極座標 $x=r\cos\theta$, $y=r\sin\theta$ では $J=\begin{bmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{bmatrix}$。行列式は $r(\cos^2\theta+\sin^2\theta)=r$ なので $dA=r\,dr\,d\theta$。

</details>

## 問題5

変数変換とJacobian determinantで 座標変換、TのJacobian matrix、局所面積の符号付き倍率 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`calc-change-of-variables-jacobian` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $T(u,v)=(x,y)$ | 座標変換 |
| $J_T$ | TのJacobian matrix |
| $det J_T$ | 局所面積の符号付き倍率 |


- $T(u,v)=(x(u,v),y(u,v))$：座標変換。
- $J_T$：TのJacobian matrix。
- $|\det J_T|$：局所面積倍率。

</details>

## 問題6

警告「$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。また絶対値を外すと向きを反転する変換で面積が負になってしまう。

</details>

## 問題7

よくある誤り「detではなく|det|を面積倍率に使う。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- detではなく|det|を面積倍率に使う。
- Jacobian matrixそのものとdeterminantを混同しない。

$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。また絶対値を外すと向きを反転する変換で面積が負になってしまう。

</details>

## 問題8

「変数変換とJacobian determinant」の例題1を再計算し、その結果に対して次の検算を実行せよ：変換後の面積要素を直接検算する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$J=\begin{bmatrix}2&1\\1&-1\end{bmatrix}$、$\det J=-3$。面積倍率は絶対値3なので、面積1は面積3へ写る。負号は向き反転を表す。

検算：
変換後の面積要素を直接検算する。線形写像なら単位正方形の2本の辺を行列で写し、その2ベクトルが張る平行四辺形の面積を幾何的に計算する。その値が $|\det J|$ と一致することを確認する。極座標では小さな扇形の面積が約 $r\,dr\,d\theta$ になることとも照合する。

</details>

## 問題9

後続への接続「確率変数変換の密度公式にも同じJacobianが現れる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

確率変数変換の密度公式にも同じJacobianが現れる。normalizing flowでは、この局所体積変化をlog-determinantとして尤度へ加える。

</details>

## 問題10

中心問題「座標変換で積分するとき、なぜJacobian determinantの絶対値を掛けるのか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ dx\,dy=|\det J_T(u,v)|\,du\,dv $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $T(u,v)=(x,y)$ | 座標変換 |
| $J_T$ | TのJacobian matrix |
| $det J_T$ | 局所面積の符号付き倍率 |


- $T(u,v)=(x(u,v),y(u,v))$：座標変換。
- $J_T$：TのJacobian matrix。
- $|\det J_T|$：局所面積倍率。

中心式：
$$
dx\,dy=|\det J_T(u,v)|\,du\,dv
$$

導出：
1. 微小変位は $d\mathbf{x}\approx J_T d\mathbf{u}$。
2. 2本の微小基底ベクトルが作る平行四辺形の面積倍率は |det J_T|。
3. Riemann和の各セル面積を変換し、極限を取る。

根拠：
微小変位 $d\mathbf u=(du,dv)^T$ に対し $T(\mathbf u+d\mathbf u)-T(\mathbf u)\approx J_T(\mathbf u)d\mathbf u$。したがって、u方向とv方向の微小辺はそれぞれJacobianの第1列、第2列へ写る。

2次元で2本のベクトルが張る平行四辺形の符号付き面積は行列式。積分で必要なのは面積の大きさなので絶対値を取る。1対1で滑らかな変換ならRiemann和の各セルについてこの局所倍率を掛け、極限で変数変換公式を得る。

具体例：
**問題**：変換 $x=2u+v$, $y=u-v$ のJacobian determinantを求め、uv平面の面積1の小領域がxy平面で何倍の面積になるか答えよ。

**解答**：$J=\begin{bmatrix}2&1\\1&-1\end{bmatrix}$、$\det J=-3$。面積倍率は絶対値3なので、面積1は面積3へ写る。負号は向き反転を表す。

失敗条件：
$|\det J|=0$ の点では局所的に面積が潰れ、通常の1対1な座標変換として扱えない。また絶対値を外すと向きを反転する変換で面積が負になってしまう。

</details>
