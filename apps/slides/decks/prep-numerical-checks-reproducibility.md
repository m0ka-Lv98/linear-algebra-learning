---
theme: default
routerMode: hash
layout: cover
title: "数値検算と再現性"
---

# 数値検算と再現性

Course 00｜学習準備

---

## 何を身につけるか

浮動小数点の結果をexact equalityで判定せず、独立な検算と再現可能な実験条件をどう残すか。

---

## 図

<img src="./assets/course-00/prep-numerical-checks-reproducibility.png" style="max-height: 350px; display:block; margin:0 auto;" />

横軸が参照値の大きさ、縦軸が許容誤差。$\text{atol}+\text{rtol}|x|$ は0付近ではabsolute tolerance、値が大きい領域ではrelative toleranceが支配する。1本の固定閾値よりscaleの違う値を比較しやすい。

---

## 定義と理由

floating pointでは0.1を2進数でexactに表せないため、`0.1+0.2==0.3` が偽になることがある。比較は $|x-y|\le\text{atol}+\text{rtol}|y|$ のようにscaleを考える。

検算は同じ式をもう一度計算するだけでなく、独立な性質を使う。線形方程式ならresidual $\|A\hat x-b\|$、SVDなら再構成誤差と直交性、確率なら総和1。

randomnessを使う場合はseed、library version、dtype、input、parameterを記録する。

---

## 具体例

計算値1.0000001と参照1.0をatol=1e-8, rtol=1e-6で比較すると誤差1e-7 <=1.01e-6なので一致扱い。

---

## ここで誤ると

「seedを固定したから完全再現」とは限らない。GPU kernelや並列reduction、library version差でbitwise結果が変わることがある。

---

## 次へ

全Courseの数値例・ML experimentの基本作法。

---

[教科書](../../textbook/prep-numerical-checks-reproducibility)　|　[演習](../../exercises/prep-numerical-checks-reproducibility)
