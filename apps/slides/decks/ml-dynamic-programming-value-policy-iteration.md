---
theme: default
routerMode: hash
layout: cover
title: "value iterationとpolicy iteration"
generatedBy: course01-10-curated-upgrade-v2
---

# value iterationとpolicy iteration

Course 08｜機械学習

---

## 何を解決するか

modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。

最適Bellman operatorは「1step行動を選び、その後も最適に行動する」backup。γ<1ならsup normでcontractionなので反復が一意の固定点V*へ収束する。

---

## 図の意味

<img src="./assets/course-08/ml-dynamic-programming-value-policy-iteration.png" style="max-height: 350px; display:block; margin:0 auto;" />

横軸にstateを並べ、反復kごとのvalueを複数曲線で表示する。terminalや高reward stateの値が最初に決まり、Bellman backupを繰り返すほど遠いstateへdiscountされながら情報が伝播する。GIFはこのbackward propagationを反復ごとに示す。

---

## 記号

| 記号 | 意味 |
|---|---|
| $T*$ | Bellman optimality operator |
| $V_k$ | k回目のvalue estimate |
| $Q*$ | 最適action value |


- $V_k(s)$：k回目のvalue推定。
- $T^*$：optimal Bellman operator。
- $V^*$：$T^*V^*=V^*$ を満たすoptimal value。

---

## 中心式

$$
V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]
$$

---

## 導出

1. Bellman optimality equationを固定点方程式 V*=T*V* と読む。
2. T*はγ-contractionなので Banach fixed-point theoremにより反復収束。
3. V*から各状態でargmax actionを選んでgreedy optimal policyを得る。

---

## 省略しない一段

optimality operator $T^*$ を $(T^*V)(s)=\max_a\sum_{s'}P(s'|s,a)[r+\gamma V(s')]$ と定義する。任意V,Wについてmaxの差を上から評価すると $\|T^*V-T^*W\|_\infty\le\gamma\|V-W\|_\infty$。$0\le\gamma<1$ ならcontraction。

Banach fixed-point theoremにより一意な固定点 $V^*$ があり、value iteration $V_{k+1}=T^*V_k$ は任意初期値から収束する。policy iterationは固定policyの線形方程式を解くevaluationと、greedy actionへ変えるimprovementを交互に行う。

---

## 手計算

**問題**：state Sで a1はreward2でterminal、a2はreward0でTへ進み、Tからreward6でterminal、$\gamma=0.5$。Sでのoptimal actionをBellman backupで求めよ。

**解答**：$Q(S,a1)=2$。$Q(S,a2)=0+0.5V(T)$ で $V(T)=6$ だから3。3>2なのでa2がoptimal。

---

## 条件を変える

state Sでaction a1は即reward1でterminal、a2はreward0でstate Tへ、Tはreward4でterminal、$\gamma=0.5$。a1価値1、a2価値0+0.5*4=2なのでoptimal actionはa2。

---

## どこで壊れるか

$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。finite-horizonやproper stochastic shortest pathなど別条件が必要。

---

## 次へ

value iterationはfixed-point numerical methodとしてCourse05の収束理論と同型。次のTDではoperatorの期待値を1本のsampleで近似する。

---

[教科書](../../textbook/ml-dynamic-programming-value-policy-iteration)　|　[10問の演習](../../exercises/ml-dynamic-programming-value-policy-iteration)

---

## 今回の問い

「value iterationとpolicy iteration」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
