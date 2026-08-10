---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "道・閉路・連結性"
---

# 道・閉路・連結性

Course 04｜離散数学と証明｜Topic 17/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

道・閉路・連結性の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `dm-graphs-representations-degrees` で得た概念を使い、ここでは 道・閉路・連結性 へ進む。

---

## 直感

グラフは頂点と辺で関係を表し、道・連結性・次数は局所と大域の構造をつなぐ。



---

## 図解

<img src="./assets/course-04/dm-paths-cycles-connectivity.png" style="max-height: 350px; display:block; margin:0 auto;" />

小さなグラフで次数、最短路、連結成分を色分けする。 頂点が対象、辺が対象間の関係である。pathは隣接辺を順にたどる列、cycleは始点へ戻るpathであり、連結性や到達可能性を図上で直接確認できる。

---

## 記号と代表式

- $u,v\in V$：vertex
- path：隣接edgeを連続して辿るvertex列
- $d(u,v)$：最短path長
- connected component：互いに到達可能な最大集合

$$
d(u,v)=\min\{\text{path length}\}
$$

---

## 導出 1

長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。

---

## 導出 2

同値関係なのでvertex集合は互いに交わらないconnected componentへ分割される。

---

## 例題

無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

---

## 条件を変えるとどうなるか

有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

---

## よくある誤解

道・閉路・連結性では、式へ数値を代入するだけでは不十分である。有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

BFS/DFSでvisitedを管理しないとcycleで無限探索し得る。graph representationでcomplexityも変わる。

---

## 一段先へ

cycleを持たないconnected graphがtree。最小edge数でconnectednessを保つ構造として次Topicへ。

---

## 自分で説明できるか

- 「到達可能性の3性質」を式を見ずに説明できるか
- 「最短距離の三角不等式」までの論理を一段ずつ再現できるか
- 道・閉路・連結性の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/dm-paths-cycles-connectivity)
- [10問の演習](../../exercises/dm-paths-cycles-connectivity)
