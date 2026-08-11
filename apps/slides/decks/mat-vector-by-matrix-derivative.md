---
theme: default
routerMode: hash
layout: cover
title: "ベクトルを行列で微分する"
---

# ベクトルを行列で微分する

行列・ベクトル微分

---

## 問い

行列入力からベクトル出力への微分を、巨大な4階tensorを避けてどう扱うか。

---

## 記号とshape

- `$\mathbf X`: matrix input (m\times n)
- `$\mathbf y`: vector output (p)
- `$\operatorname{vec}(\mathbf X)`: vectorized input (mn)
- `$\mathbf J`: Jacobian (p\times mn)

---

## 中心式

$$
d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)
$$

---

## 導出

- 行列要素 $X_{ij}$ を独立座標と見なして $\operatorname{vec}(\mathbf X)$ に並べる。
- 各出力 $y_k$ を各座標で偏微分すると $p\times mn$ Jacobianが得られる。
- 実装ではtensor全体を作らずJVP/VJPとして作用だけ計算するのが普通である。

---

## 図

<img src="./assets/engineering-math/mat-vector-by-matrix-derivative.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。

---

## 何がわかるか

画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。

---

## 失敗条件

4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。

---

## 実装検算

autodiffの`jvp`でdirectional actionを計算し、full Jacobianを作った結果と小規模例で照合する。

---

## 式の読み方を固定する

ベクトルを行列で微分するでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf X$ は matrix input（m\times n）、$\mathbf y$ は vector output（p）、$\operatorname{vec}(\mathbf X)$ は vectorized input（mn）、$\mathbf J$ は Jacobian（p\times mn）。特に行列積は一般に可換でないため、中心式 `d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。
- 失敗条件: 4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。
- 実装検算: autodiffの`jvp`でdirectional actionを計算し、full Jacobianを作った結果と小規模例で照合する。

---

## 工学での位置づけ

画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。

中心式 `d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `ベクトルを行列で微分する` の記号とshapeを定義する
- `行列要素 $X_{ij}$ を独立座標と見なして $\operatorname{vec}(\mathbf X)$ に並べる。` から中心式を導く
- `$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。` を最後まで追う
- `4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-vector-by-vector-derivative, mat-scalar-by-matrix-derivative

[教科書](../../textbook/mat-vector-by-matrix-derivative)
[10問の演習](../../exercises/mat-vector-by-matrix-derivative)
