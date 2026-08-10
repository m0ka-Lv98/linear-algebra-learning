---
theme: default
routerMode: hash
layout: cover
title: "NumPy配列・shape・indexing"
---

# NumPy配列・shape・indexing

Course 00｜学習準備

---

## 今回の問い

shapeとaxisを予測してからNumPy演算を実行できるか。

---

## 直感

配列は値だけでなくshape・dtype・axisの意味を持つ。数学上同じ3成分でも(3,), (3,1), (1,3)は別shapeでbroadcasting/行列積が変わる。

---

## 図解

<img src="./assets/course-00/prep-numpy-arrays-shapes.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
(m,n)@(n,p)\to(m,p)
$$

---

## 導出

1. 行列積では左の最後axisと右の対応axisがcontractされる。
2. 2Dならinner dimension nが一致する。
3. 残るm,pが出力shape。

---

## 小さい例

A.shape=(2,3), B.shape=(3,4)ならA@Bは(2,4)。A[:,1]は(2,), A[:,1:2]は(2,1)。

---

## 条件を外すと

- axis=0を単に「縦」と暗記しない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-numpy-arrays-shapes)

[10問の演習](../../exercises/prep-numpy-arrays-shapes)
