---
theme: default
routerMode: hash
layout: cover
title: "状態機械と不変量"
---

# 状態機械と不変量

Course 04｜離散数学

---

## 今回の問い

時間とともに状態が変わる系の正しさを、毎step追わずにどう証明するか。

---

## 直感

状態機械は「状態」と「許される遷移」を明示する。不変量は初期状態で真で、遷移しても真のまま残る性質なので、到達可能状態全体を一括して制約できる。

---

## 図解

<img src="./assets/course-04/dm-state-machines-invariants.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]
$$

---

## 導出

1. 初期状態でIを確認する。
2. 任意の1step遷移がIを保存することを示す。
3. 帰納法により任意step後の到達可能状態でIが成り立つ。

---

## 小さい例

コインを2枚ずつ裏返す操作では表向き枚数の偶奇が保存される、などのparity invariantで到達不能状態を示せる。

---

## 条件を外すと

- 観察した数stepだけから不変と断定しない。
- 安全性不変量と停止性は別の証明。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/dm-state-machines-invariants)

[10問の演習](../../exercises/dm-state-machines-invariants)
