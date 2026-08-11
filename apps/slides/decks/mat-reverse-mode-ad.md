---
theme: default
routerMode: hash
layout: cover
title: "Reverse-mode AD"
---

# Reverse-mode AD

行列・ベクトル微分

---

## 問い

scalar出力から非常に多い入力parameterへgradientを1回の逆伝播で得るには。

---

## 記号とshape

- `$v_k`: forward node value (node shape)
- `$\bar v_k`: adjoint/cotangent (same shape)
- `$L`: final scalar objective (1)

---

## 中心式

$$
\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}
$$

---

## 導出

- forward passで中間値を保存する。
- 出力にseed $\bar L=1$ を置き、graphを逆順にたどる。
- 各edgeでlocal derivativeを掛けて親nodeへcotangentを加算する。

---

## 図

<img src="./assets/engineering-math/mat-reverse-mode-ad.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。

---

## 何がわかるか

deep learningのbackprop、scalar objectiveを持つoptimizationの標準。

---

## 失敗条件

memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。

---

## 実装検算

reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。

---

## 式の読み方を固定する

Reverse-mode ADでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$v_k$ は forward node value（node shape）、$\bar v_k$ は adjoint/cotangent（same shape）、$L$ は final scalar objective（1）。特に行列積は一般に可換でないため、中心式 `\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。
- 失敗条件: memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。
- 実装検算: reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。

---

## 工学での位置づけ

deep learningのbackprop、scalar objectiveを持つoptimizationの標準。

中心式 `\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Reverse-mode AD` の記号とshapeを定義する
- `forward passで中間値を保存する。` から中心式を導く
- `$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。` を最後まで追う
- `memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-automatic-differentiation, mat-vector-jacobian-product

[教科書](../../textbook/mat-reverse-mode-ad)
[10問の演習](../../exercises/mat-reverse-mode-ad)
