---
theme: default
routerMode: hash
layout: cover
title: "Jacobian-vector product (JVP)"
---

# Jacobian-vector product (JVP)

行列・ベクトル微分

---

## 問い

Jacobian全体を作らず、指定方向への出力感度だけをどう計算するか。

---

## 記号とshape

- `$\mathbf J_f`: Jacobian (m\times n)
- `$\mathbf v`: input tangent (n)
- `$\mathbf J_f\mathbf v`: output tangent (m)

---

## 中心式

$$
\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}
$$

---

## 導出

- 方向 $\mathbf v$ に沿う一変数curve $\mathbf x(\epsilon)=\mathbf x+\epsilon\mathbf v$ を作る。
- chain ruleで $d f(\mathbf x(\epsilon))/d\epsilon=\mathbf J_f\mathbf v$。
- したがってfull Jacobianを保存せずforward directional derivativeとして計算できる。

---

## 図

<img src="./assets/engineering-math/mat-jacobian-vector-product.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。

---

## 何がわかるか

forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。

---

## 失敗条件

出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。

---

## 実装検算

frameworkの`jvp`と明示Jacobian `J @ v` を小規模例で一致させる。

---

## 式の読み方を固定する

Jacobian-vector product (JVP)では、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf J_f$ は Jacobian（m\times n）、$\mathbf v$ は input tangent（n）、$\mathbf J_f\mathbf v$ は output tangent（m）。特に行列積は一般に可換でないため、中心式 `\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。
- 失敗条件: 出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。
- 実装検算: frameworkの`jvp`と明示Jacobian `J @ v` を小規模例で一致させる。

---

## 工学での位置づけ

forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。

中心式 `\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Jacobian-vector product (JVP)` の記号とshapeを定義する
- `方向 $\mathbf v$ に沿う一変数curve $\mathbf x(\epsilon)=\mathbf x+\epsilon\mathbf v$ を作る。` から中心式を導く
- `$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。` を最後まで追う
- `出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-vector-by-vector-derivative, la-matrix-multiplication

[教科書](../../textbook/mat-jacobian-vector-product)
[10問の演習](../../exercises/mat-jacobian-vector-product)
