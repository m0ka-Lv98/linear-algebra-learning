---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "特異値分解"
---

# 特異値分解

Course 02｜線形代数

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。


SVDは任意の行列を「入力側の直交回転 → 軸ごとの伸縮 → 出力側の直交回転」に分ける。固有分解より適用範囲が広く、長方形・rank不足でも使える。

---

## 直感を先に作る

SVDは任意の行列を「入力側の直交回転 → 軸ごとの伸縮 → 出力側の直交回転」に分ける。固有分解より適用範囲が広く、長方形・rank不足でも使える。

---

## 図で確認

<img src="./assets/course-02/la-singular-value-decomposition.png" style="max-height: 340px; display:block; margin:0 auto;" />

---

## 図のどこを見るか

- 入力と出力を区別する
- 方向・長さ・部分空間・残差のどれが変わるか見る
- 数式の各項と図の要素を対応させる

---

## 記号とshape

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 任意の実行列。
- $\mathbf{U}$: 左特異ベクトル、$\mathbf{V}$: 右特異ベクトルを持つ直交（または列正規直交）行列。
- $\mathbf{\Sigma}$: 非負の特異値$\sigma_1\ge\sigma_2\ge\cdots\ge0$を対角に持つ行列。
- SVDはsingular value decomposition（特異値分解）。$\mathbf{A}\mathbf{v}_i=\sigma_i\mathbf{u}_i$。

- 行列 $\mathbf{A}\in\mathbb{R}^{m\times n}$ は $n$ 次元入力を $m$ 次元出力へ写す
- ベクトル・行列は初出時に次元を固定する
- shapeが合うことと数学的条件が成立することは別

---

## 代表式

$$
\mathbf{A}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

式を「左辺の意味 → 右辺の操作 → 条件」の順に読む。

---

## なぜ成り立つ？

$A^TA v_i=\sigma_i^2 v_i$ から右特異ベクトルを得て、$u_i=Av_i/\sigma_i$ とする。特異値は各直交方向の伸縮倍率。

---

## 小さな例

$A=\operatorname{diag}(3,1)$ ではU=V=I、Σ=diag(3,1)。単位円は長軸3、短軸1の楕円へ写る。

---

## 手計算

$A=\begin{bmatrix}3&0\\0&-2\end{bmatrix}$ の特異値を求めよ。

**答え:** $A^TA=\operatorname{diag}(9,4)$ の固有値平方根なので特異値は3,2。符号はU/V側へ吸収され、特異値は非負。

---

## 計算手順

`svd(A, full_matrices=False)`→特異値の並び・再構成誤差・U/Vの直交性を検算。

---

## 失敗条件

- Vと$V^T$の返り値規約に注意（NumPyはVh）。
- 特異値は負にならない。
- 固有値と特異値を同一視しない（対称PSDでは関係が特に単純）。

---

## 誤答を診断

「「SVDは正方可逆行列にしか使えない」」

→ 任意の実/複素行列に存在し、長方形・特異行列で特に有用。

---

## 数値実装では

- 理論式とアルゴリズムを分ける
- 小さい例で期待値を作る
- 残差・rank・直交性・再構成誤差などで検算する

---

## 後続への接続

擬似逆、低ランク近似、PCA、condition number、inverse problem、spectral unmixing。

---

## 理解確認

1. 定義を式なしで説明できるか
2. 代表式の各記号を定義できるか
3. 条件を外した反例を作れるか
4. 手計算と実装結果を照合できるか

[教科書](../../textbook/la-singular-value-decomposition) / [演習](../../exercises/la-singular-value-decomposition)
