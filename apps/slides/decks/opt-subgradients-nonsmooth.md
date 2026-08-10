---
theme: default
routerMode: hash
layout: cover
title: "劣勾配と非滑らか最適化"
---

# 劣勾配と非滑らか最適化

Course 06｜最適化

---

## 今回の問い

|x|やL1正則化のように微分できない点があっても、凸最適化をどう続けるか。

---

## 直感

凸関数では接線の代わりに「関数を下から支える直線・超平面」の傾きを使える。その傾き集合がsubdifferential。

---

## 図解

<img src="./assets/course-06/opt-subgradients-nonsmooth.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y
$$

---

## 導出

1. 滑らかな凸関数の一次supporting inequalityを一般化する。
2. 微分不能点では1本の接線でなく複数のsupporting hyperplaneが存在し得る。
3. 0∈∂f(x*)なら全yで f(y)≥f(x*) なのでx*はglobal minimizer。

---

## 小さい例

f(x)=|x|では x>0で∂f={1}, x<0で{-1}, x=0で[-1,1]。0∈∂f(0)なので0が最小。

---

## 条件を外すと

- 任意の方向ベクトルを劣勾配と呼ばない。
- 非凸関数へ凸subgradientの結論をそのまま移さない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/opt-subgradients-nonsmooth)

[10問の演習](../../exercises/opt-subgradients-nonsmooth)
