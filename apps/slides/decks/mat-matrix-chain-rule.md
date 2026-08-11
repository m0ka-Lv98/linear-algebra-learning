---
theme: default
routerMode: hash
layout: cover
title: "Matrix chain rule"
---

# Matrix chain rule

行列・ベクトル微分

---

## 問い

合成されたvector/matrix functionの微分を、shapeを壊さずどうつなぐか。

---

## 記号とshape

- `$\mathbf x`: input (n)
- `$g`: intermediate map (n\to p)
- `$f`: outer map (p\to m)
- `$\mathbf J`: Jacobian (output\times input)

---

## 中心式

$$
\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)
$$

---

## 導出

- $d\mathbf z=\mathbf J_gd\mathbf x$、$d\mathbf y=\mathbf J_fd\mathbf z$ と局所線形化する。
- 中間変数 $d\mathbf z$ を代入すると $d\mathbf y=\mathbf J_f\mathbf J_gd\mathbf x$。
- 積の内側次元 $p$ が一致することがchain ruleのshape checkになる。

---

## 図

<img src="./assets/engineering-math/mat-matrix-chain-rule.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。

---

## 何がわかるか

computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。

---

## 失敗条件

Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。

---

## 実装検算

小さい合成関数でfull Jacobian積とautodiffのJacobianを比較する。

---

## 式の読み方を固定する

Matrix chain ruleでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf x$ は input（n）、$g$ は intermediate map（n\to p）、$f$ は outer map（p\to m）、$\mathbf J$ は Jacobian（output\times input）。特に行列積は一般に可換でないため、中心式 `\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。
- 失敗条件: Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。
- 実装検算: 小さい合成関数でfull Jacobian積とautodiffのJacobianを比較する。

---

## 工学での位置づけ

computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。

中心式 `\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Matrix chain rule` の記号とshapeを定義する
- `$d\mathbf z=\mathbf J_gd\mathbf x$、$d\mathbf y=\mathbf J_fd\mathbf z$ と局所線形化する。` から中心式を導く
- `$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。` を最後まで追う
- `Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-vector-by-vector-derivative, mat-vector-by-matrix-derivative

[教科書](../../textbook/mat-matrix-chain-rule)
[10問の演習](../../exercises/mat-matrix-chain-rule)
