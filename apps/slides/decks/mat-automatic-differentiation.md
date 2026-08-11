---
theme: default
routerMode: hash
layout: cover
title: "Automatic differentiation"
---

# Automatic differentiation

行列・ベクトル微分

---

## 問い

symbolic微分でも有限差分でもなく、programの演算列からmachine precisionの微分をどう得るか。

---

## 記号とshape

- `$v_k`: computational graph node (scalar/vector)
- `$\phi_k`: elementary operation (local map)
- `$\dot v_k`: propagated tangent (same shape as node)

---

## 中心式

$$
v_k=\phi_k(v_{pa(k)}),\qquad \dot v_k=\sum_j\frac{\partial\phi_k}{\partial v_j}\dot v_j
$$

---

## 導出

- programを加算・乗算・expなどのelementary operationへ分解する。
- 各operationの局所微分を既知としてchain ruleで伝播する。
- forwardならtangent、reverseならcotangentを蓄積し、式をsymbolicに展開する必要はない。

---

## 図

<img src="./assets/engineering-math/mat-automatic-differentiation.png" style="max-height: 380px; display:block; margin:0 auto;" />

---

## 小さな例

$f(x)=\sin(x^2)$ を $v_1=x^2$、$v_2=\sin v_1$ と分ければ、局所微分の積で $2x\cos(x^2)$ が得られる。

---

## 何がわかるか

scientific computing、deep learning、optimizationで大規模gradientを実用的に計算する。

---

## 失敗条件

ADは数値誤差ゼロではない。floating point演算の丸めは残り、nondifferentiable branchでは定義するsubgradient規約にも依存する。

---

## 実装検算

解析微分・finite difference・ADの3者を小関数で比較し、finite differenceだけstep size依存があることを見る。

---

## 式の読み方を固定する

Automatic differentiationでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$v_k$ は computational graph node（scalar/vector）、$\phi_k$ は elementary operation（local map）、$\dot v_k$ は propagated tangent（same shape as node）。特に行列積は一般に可換でないため、中心式 `v_k=\phi_k(v_{pa(k)}),\qquad \dot v_k=\sum_j\frac{\partial\phi_k}{\partial v_j}\dot v_j` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

---

## 極限・反例で検算

- 手計算例: $f(x)=\sin(x^2)$ を $v_1=x^2$、$v_2=\sin v_1$ と分ければ、局所微分の積で $2x\cos(x^2)$ が得られる。
- 失敗条件: ADは数値誤差ゼロではない。floating point演算の丸めは残り、nondifferentiable branchでは定義するsubgradient規約にも依存する。
- 実装検算: 解析微分・finite difference・ADの3者を小関数で比較し、finite differenceだけstep size依存があることを見る。

---

## 工学での位置づけ

scientific computing、deep learning、optimizationで大規模gradientを実用的に計算する。

中心式 `v_k=\phi_k(v_{pa(k)}),\qquad \dot v_k=\sum_j\frac{\partial\phi_k}{\partial v_j}\dot v_j` のどの量が観測・未知parameter・weight・frequency成分に対応するかを区別する。

---

## 試験で書けるべきこと

- `Automatic differentiation` の記号とshapeを定義する
- `programを加算・乗算・expなどのelementary operationへ分解する。` から中心式を導く
- `$f(x)=\sin(x^2)$ を $v_1=x^2$、$v_2=\sin v_1$ と分ければ、局所微分の積で $2x\cos(x^2)$ が得られる。` を最後まで追う
- `ADは数値誤差ゼロではない。floating point演算の丸めは残り、nondifferentiable branchでは定義するsubgradient規約にも依存する。` がなぜ問題か説明する

---

## 接続

Prerequisites: mat-matrix-chain-rule, mat-jacobian-vector-product

[教科書](../../textbook/mat-automatic-differentiation)
[10問の演習](../../exercises/mat-automatic-differentiation)
