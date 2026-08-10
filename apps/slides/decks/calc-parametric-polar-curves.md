---
theme: default
routerMode: hash
layout: cover
title: "媒介変数表示と極座標"
---

# 媒介変数表示と極座標

Course 01｜微積分

---

## 今回の問い

xを独立変数にできない曲線を、媒介変数や極座標でどう扱うか。

---

## 直感

曲線を時間tに沿って動く点 (x(t),y(t)) として表せば、縦線を含む曲線も自然に表現できる。極座標は距離rと角度θで点を表す。

---

## 図解

<img src="./assets/course-01/calc-parametric-polar-curves.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)
$$

---

## 導出

1. x,yの両方をtの関数とみなす。
2. 連鎖律で dy/dt=(dy/dx)(dx/dt)。
3. dx/dt≠0なら dy/dx について解く。

---

## 小さい例

x=cos t,y=sin t は単位円。dy/dx=cos t/(-sin t)=-cot t。

---

## 条件を外すと

- dx/dt=0の点で比を機械適用しない。
- 極座標では同じ点に複数表現がある。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/calc-parametric-polar-curves)

[10問の演習](../../exercises/calc-parametric-polar-curves)
