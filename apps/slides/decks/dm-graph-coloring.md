---
theme: default
routerMode: hash
layout: cover
title: "グラフ彩色"
generatedBy: course01-10-curated-upgrade-v2
---

# グラフ彩色

Course 04｜離散数学

---

## 何を解決するか

隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。

彩色は「衝突する対象を異なる資源へ割り当てる」問題。時間割、register allocation、周波数割当などへ直結する。

---

## 図の意味

<img src="./assets/course-04/dm-graph-coloring.png" style="max-height: 350px; display:block; margin:0 auto;" />

点が頂点、線が辺。隣接する頂点には異なる色（図では異なるマーカー/ラベル）を割り当てる。三角形部分では3頂点が互いに隣接するため3色が必要で、これがcliqueによる下界を視覚化する。

---

## 記号

| 記号 | 意味 |
|---|---|
| $G=(V,E)$ | グラフ |
| $c:V→{1,…,k}$ | k彩色 |
| $χ(G)$ | 彩色数 |


- $G=(V,E)$：無向グラフ。
- $c(v)$：頂点vの色label。
- $\chi(G)$：proper coloringに必要な最小色数。

---

## 中心式

$$
(u,v)\in E\Rightarrow c(u)\ne c(v)
$$

---

## 導出

1. 色は頂点へのlabel付与。
2. 全ての辺で両端のlabelが異なることをfeasibility条件にする。
3. その条件を満たす最小kをχ(G)と定義する。

---

## 省略しない一段

proper k-coloringは写像 $c:V\to\{1,\dots,k\}$ で、各辺 $(u,v)\in E$ に対し $c(u)\ne c(v)$。最小kがchromatic number $\chi(G)$。

二部グラフは頂点集合を2群へ分け、辺が群間だけにあるので、辺が1本以上なら2-colorable。逆に奇数cycleがあると2色を交互に置いて一周したとき始点と同色が隣接し矛盾する。よって「二部グラフ iff 奇数cycleなし」という重要な関係が得られる。

---

## 手計算

**問題**：cycle $C_6$ のchromatic numberを求め、具体的な彩色を示せ。

**解答**：$C_6$ は偶数cycleなので二部グラフ。辺があるので1色は不可、頂点を交互に色A,Bで塗れば2色で可能。よって $\chi(C_6)=2$。

---

## 条件を変える

cycle $C_5$ は2色で交互に塗ると5番目と1番目が同色になるので2色不可、3色あれば可能。したがって $\chi(C_5)=3$。

---

## どこで壊れるか

greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。greedy結果は頂点順序に依存し、最適より多くの色を使う場合がある。

---

## 次へ

時間割、register allocation、frequency assignmentに対応する。機械学習でもgraph構造のconstraint satisfactionやcombinatorial optimizationの例として重要。

---

[教科書](../../textbook/dm-graph-coloring)　|　[10問の演習](../../exercises/dm-graph-coloring)

---

## 今回の問い

「グラフ彩色」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. 隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
