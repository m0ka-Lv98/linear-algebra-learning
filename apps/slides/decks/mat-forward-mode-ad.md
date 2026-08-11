---
theme: default
routerMode: hash
layout: cover
title: "Forward-mode AD"
---

# Forward-mode AD

行列・ベクトル微分

---

## 問い

入力方向が少ないとき、tangentを前向きに伝えて微分を効率化するには。

---

## 記号とshape

- `$v`: primal value (node shape)
- `$\dot v`: tangent (node shape)

---

## 中心式

$$
(v,\dot v)\mapsto\bigl(\phi(v),\mathbf J_\phi(v)\dot v\bigr)
$$

---

## 導出

- 入力にseed tangent $\dot{\mathbf x}=\mathbf v$ を置く。
- 各nodeでprimalとtangentを同時に評価するdual-number的更新を行う。
- 最終tangentはJVP $\mathbf J_f\mathbf v$ になる。

---

## 図

<img src="./assets/engineering-math/mat-forward-mode-ad.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$f(x_1,x_2)=x_1x_2+\exp x_1$、seed $(1,0)$ なら出力tangentは $x_2+\exp x_1$、つまり $\partial f/\partial x_1$。

---

## 何がわかるか

parameter数が少なくstate数が多いsimulation sensitivityやJVPに向く。

---

## 失敗条件

入力次元が非常に大きくscalar outputだけ欲しい場合、各basis seedが必要になりreverse-modeより不利。

---

## 実装検算

同じ関数で複数seedを流し、明示Jacobianの各列と一致することを確認する。

---

## 式の読み方を固定する

Forward-mode ADでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$v$ は primal value（node shape）、$\dot v$ は tangent（node shape）。特に行列積は一般に可換でないため、中心式 `(v,\dot v)\mapsto\bigl(\phi(v),\mathbf J_\phi(v)\dot v\bigr)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $f(x_1,x_2)=x_1x_2+\exp x_1$、seed $(1,0)$ なら出力tangentは $x_2+\exp x_1$、つまり $\partial f/\partial x_1$。
- 失敗条件: 入力次元が非常に大きくscalar outputだけ欲しい場合、各basis seedが必要になりreverse-modeより不利。
- 実装検算: 同じ関数で複数seedを流し、明示Jacobianの各列と一致することを確認する。

---

## 工学での位置づけ

parameter数が少なくstate数が多いsimulation sensitivityやJVPに向く。

中心式 `(v,\dot v)\mapsto\bigl(\phi(v),\mathbf J_\phi(v)\dot v\bigr)` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Forward-mode AD` の記号とshapeを定義する
- `入力にseed tangent $\dot{\mathbf x}=\mathbf v$ を置く。` から中心式を導く
- `$f(x_1,x_2)=x_1x_2+\exp x_1$、seed $(1,0)$ なら出力tangentは $x_2+\exp x_1$、つまり $\partial f/\partial x_1$。` を最後まで追う
- `入力次元が非常に大きくscalar outputだけ欲しい場合、各basis seedが必要になりreverse-modeより不利。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-automatic-differentiation, mat-jacobian-vector-product

[教科書](../../textbook/mat-forward-mode-ad)
[10問の演習](../../exercises/mat-forward-mode-ad)
