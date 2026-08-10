---
theme: default
routerMode: hash
layout: cover
title: "二部matchingとHallの定理"
generatedBy: course01-10-curated-upgrade-v2
---

# 二部matchingとHallの定理

Course 04｜離散数学

---

## 何を解決するか

左側の全頂点を重複なく右側へ割り当てられる条件は何か。

matchingは端点を共有しない辺集合。Hallの条件は、左側のどんな部分集合を取っても候補となる右頂点が人数以上あることを要求する。

---

## 図の意味

<img src="./assets/course-04/dm-bipartite-matching-hall.png" style="max-height: 350px; display:block; margin:0 auto;" />

左集合Lと右集合Rを左右に分け、候補関係を細線、選ばれたmatchingを太線で示す。matchingでは同じ頂点へ太線が2本入らない。Hall条件は左の任意部分集合Sから到達できる右側近傍 $N(S)$ の個数がS以上であることを要求する。

---

## 記号

| 記号 | 意味 |
|---|---|
| $G=(L∪R,E)$ | 二部グラフ |
| $N(S)$ | S⊆Lの隣接頂点集合 |
| $M$ | matching |


- $G=(L\cup R,E)$：二部グラフ。
- $N(S)$：左部分集合Sの右側近傍集合。
- matching：端点を共有しない辺集合。

---

## 中心式

$$
\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|
$$

---

## 導出

1. 条件が必要なのは鳩の巣原理から直ちに分かる。
2. 十分性は最大matchingを仮定し、未matching頂点から交互道を探索する。
3. 増加路が無いとHall違反集合を構成でき、矛盾。

---

## 省略しない一段

必要性は鳩の巣原理。Sの全頂点を異なる右頂点へ割り当てるなら、その候補集合 $N(S)$ に少なくとも|S|個必要。

十分性の直感はaugmenting path。最大matchingが左を飽和しないと仮定し、未matching左頂点から「非matching辺→matching辺」を交互にたどる。右側の未matching頂点へ到達すればmatchingを反転して1本増やせるので最大性に矛盾。到達できなければ探索集合からHall違反を構成できる。

---

## 手計算

**問題**：L={A,B,C}, R={1,2,3}、近傍が A:{1}, B:{1,2}, C:{2,3} のときHall条件を確認し、Lを飽和するmatchingを1つ示せ。

**解答**：各単集合は近傍1以上。{A,B}の近傍{1,2}で2、{B,C}は{1,2,3}で3、{A,C}も{1,2,3}で3、全体も3。Hall成立。matching A-1, B-2, C-3。

---

## 条件を変える

L={A,B,C}, R={1,2,3}、候補 A:{1,2}, B:{2,3}, C:{1,3}。単集合・2要素集合・全体のすべてで近傍数が集合サイズ以上なのでHall条件を満たし、例えばA-1,B-2,C-3がperfect matching。

---

## どこで壊れるか

各頂点が少なくとも1候補を持つだけでは不十分。A,B,Cが全員{1,2}しか候補を持たなければ各自のdegreeは2でも、S={A,B,C}で|N(S)|=2<3なので完全割当不能。

---

## 次へ

assignment問題、network flow、marriage theorem、resource allocationへつながる。maximum matchingアルゴリズムの正しさもaugmenting pathで理解できる。

---

[教科書](../../textbook/dm-bipartite-matching-hall)　|　[10問の演習](../../exercises/dm-bipartite-matching-hall)

---

## 今回の問い

「二部matchingとHallの定理」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 左側の全頂点を重複なく右側へ割り当てられる条件は何か。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. 左側の全頂点を重複なく右側へ割り当てられる条件は何か。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
