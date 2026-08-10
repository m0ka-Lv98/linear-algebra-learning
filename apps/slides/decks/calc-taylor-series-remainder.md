---
theme: default
routerMode: hash
layout: cover
title: "Taylor級数・剰余・収束半径"
---

# Taylor級数・剰余・収束半径

Course 01｜微積分

---

## 今回の問い

有限次数のTaylor近似を無限級数へ伸ばすと、いつ元の関数そのものになるのか。

---

## 直感

Taylor多項式を高次数へしただけでは自動的に関数へ一致しない。差 R_n(x) が0へ行くことを別に確認する必要がある。

---

## 図解

<img src="./assets/course-01/calc-taylor-series-remainder.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}
$$

---

## 導出

1. n次まで導関数を一致させた差 $R_n$ を考える。
2. Rolleの定理を繰り返す補助関数から Lagrange 剰余形を得る。
3. 右辺が n→∞ で0へ行く範囲でTaylor級数がfへ一致する。

---

## 小さい例

e^x の0周りでは |R_n(x)|≤e^{|x|}|x|^{n+1}/(n+1)!→0。したがって全実数でTaylor級数へ一致する。

---

## 条件を外すと

- Taylor級数が形式的に書けることと関数へ収束することを同一視しない。
- 近似中心から遠い点では有限次数誤差を評価する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/calc-taylor-series-remainder)

[10問の演習](../../exercises/calc-taylor-series-remainder)
