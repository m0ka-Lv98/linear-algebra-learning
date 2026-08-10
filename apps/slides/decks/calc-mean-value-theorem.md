---
theme: default
routerMode: hash
layout: cover
title: "平均値の定理"
---

# 平均値の定理

Course 01｜微積分

---

## 今回の問い

区間全体の平均変化率と、ある一点の瞬間変化率が一致するのはなぜか。

---

## 直感

区間の両端を結ぶ割線と平行な接線が途中に存在する、という局所微分と大域変化を結ぶ定理。単調性、誤差評価、収束証明の基礎になる。

---

## 図解

<img src="./assets/course-01/calc-mean-value-theorem.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
f\prime(c)=\frac{f(b)-f(a)}{b-a}
$$

---

## 導出

1. 割線の傾きを m と置く。
2. $g(x)=f(x)-mx$ を作ると g(a)=g(b)。
3. Rolleの定理により g′(c)=0、したがって f′(c)=m。

---

## 小さい例

f(x)=x², [1,3] の平均変化率は4。f′(x)=2xなので c=2 で一致する。

---

## 条件を外すと

- 端点での微分可能性は不要だが連続性は必要。
- 存在を保証するだけで c が一意とは限らない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/calc-mean-value-theorem)

[10問の演習](../../exercises/calc-mean-value-theorem)
