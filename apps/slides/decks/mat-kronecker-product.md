---
theme: default
routerMode: hash
layout: cover
title: "Kronecker product"
---

# Kronecker product

行列・ベクトル微分

---

## 問い

2つの線形構造をblock行列として組み合わせるKronecker積をどう読むか。

---

## 記号とshape

- `$\mathbf A`: first matrix (m\times n)
- `$\mathbf B`: second matrix (p\times q)
- `$\mathbf A\otimes\mathbf B`: Kronecker product (mp\times nq)

---

## 中心式

$$
\mathbf A\otimes\mathbf B=\begin{bmatrix}a_{11}\mathbf B&\cdots&a_{1n}\mathbf B\\\vdots&\ddots&\vdots\\a_{m1}\mathbf B&\cdots&a_{mn}\mathbf B\end{bmatrix}
$$

---

## 導出

- 各scalar $a_{ij}$ をblock $a_{ij}\mathbf B$ に置換する。
- 行blockは $m$、列blockは $n$ 個なので全shapeは $mp\times nq$。
- mixed-product property $(\mathbf A\otimes\mathbf B)(\mathbf C\otimes\mathbf D)=\mathbf{AC}\otimes\mathbf{BD}$ はshape条件下で成り立つ。

---

## 図

<img src="./assets/engineering-math/mat-kronecker-product.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$\begin{bmatrix}1&2\\0&1\end{bmatrix}\otimes\begin{bmatrix}1&0\\0&-1\end{bmatrix}$ は4×4 block行列になり、各blockは後者のscalar倍。

---

## 何がわかるか

separable covariance、PDE離散化、tensor product basis、vec identityに現れる。

---

## 失敗条件

elementwise積やouter productと混同しやすい。結果shapeを先に計算すれば多くの誤りを防げる。

---

## 実装検算

`np.kron(A,B)` のshapeとmanual block constructionを比較する。

---

## 式の読み方を固定する

Kronecker productでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf A$ は first matrix（m\times n）、$\mathbf B$ は second matrix（p\times q）、$\mathbf A\otimes\mathbf B$ は Kronecker product（mp\times nq）。特に行列積は一般に可換でないため、中心式 `\mathbf A\otimes\mathbf B=\begin{bmatrix}a_{11}\mathbf B&\cdots&a_{1n}\mathbf B\\\vdots&\ddots&\vdots\\a_{m1}\mathbf B&\cdots&a_{mn}\mathbf B\end{bmatrix}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $\begin{bmatrix}1&2\\0&1\end{bmatrix}\otimes\begin{bmatrix}1&0\\0&-1\end{bmatrix}$ は4×4 block行列になり、各blockは後者のscalar倍。
- 失敗条件: elementwise積やouter productと混同しやすい。結果shapeを先に計算すれば多くの誤りを防げる。
- 実装検算: `np.kron(A,B)` のshapeとmanual block constructionを比較する。

---

## 工学での位置づけ

separable covariance、PDE離散化、tensor product basis、vec identityに現れる。

中心式 `\mathbf A\otimes\mathbf B=\begin{bmatrix}a_{11}\mathbf B&\cdots&a_{1n}\mathbf B\\\vdots&\ddots&\vdots\\a_{m1}\mathbf B&\cdots&a_{mn}\mathbf B\end{bmatrix}` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Kronecker product` の記号とshapeを定義する
- `各scalar $a_{ij}$ をblock $a_{ij}\mathbf B$ に置換する。` から中心式を導く
- `$\begin{bmatrix}1&2\\0&1\end{bmatrix}\otimes\begin{bmatrix}1&0\\0&-1\end{bmatrix}$ は4×4 block行列になり、各blockは後者のscalar倍。` を最後まで追う
- `elementwise積やouter productと混同しやすい。結果shapeを先に計算すれば多くの誤りを防げる。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-vec-operator, la-matrix-multiplication

[教科書](../../textbook/mat-kronecker-product)
[10問の演習](../../exercises/mat-kronecker-product)
