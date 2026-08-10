---
theme: default
routerMode: hash
layout: cover
title: "MDPとBellman方程式"
generatedBy: course01-10-curated-upgrade-v2
---

# MDPとBellman方程式

Course 08｜機械学習

---

## 何を解決するか

逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。

MDPは現在状態が与えられれば未来の遷移分布が過去全体に依存しないMarkov性を仮定する。価値関数は将来報酬の割引和の期待値。

---

## 図の意味

<img src="./assets/course-08/ml-mdp-bellman-equations.png" style="max-height: 350px; display:block; margin:0 auto;" />

各円がstate $s$、stateから出る矢印の種類がaction $a$。矢印には遷移確率 $P(s'|s,a)$ と即時reward $r$ が付く。policy $\pi(a|s)$ はstateでどのactionを選ぶ確率。Bellman式は「今の1step reward」と「次stateの価値」を矢印ごとの確率で平均して現在stateの価値へ戻す。

---

## 記号

| 記号 | 意味 |
|---|---|
| $S_t$ | 時刻tの状態 |
| $A_t$ | 行動 |
| $R_{t+1}$ | 報酬 |
| $γ∈[0,1)$ | 割引率 |
| $π(a|s)$ | policy |


- $\mathcal S,\mathcal A$：state/action集合。
- $P(s'|s,a)$：遷移確率。
- $\pi(a|s)$：policy。
- $V^\pi(s)=E_\pi[G_t|S_t=s]$：policy value。
- $E_\pi$：policyとtransitionが作るtrajectory分布での期待値。

---

## 中心式

$$
V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]
$$

---

## 導出

1. return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。
2. 先頭1stepを分離して $G_t=R_{t+1}+γG_{t+1}$。
3. 状態sで条件付き期待値を取るとBellman expectation equation。

---

## 省略しない一段

MDPを $(\mathcal S,\mathcal A,P,R,\gamma)$ と定義する。Markov性は次stateとrewardの条件付き分布が現在state/actionだけで決まるという仮定。policy $\pi(a|s)$ を固定するとtrajectory分布が決まり、discounted return $G_t=\sum_{k=0}^\infty\gamma^kR_{t+k+1}$ を定義できる。

$G_t=R_{t+1}+\gamma G_{t+1}$ と1step分離し、$S_t=s$ の条件付き期待値を取ると $V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})|S_t=s]$。有限stateならこれはVについての連立一次方程式 $\mathbf V=\mathbf r_\pi+\gamma P_\pi\mathbf V$。

---

## 手計算

**問題**：2状態A,B。A→Bでreward1、B→Bでreward2、どちらも確率1、$\gamma=0.5$。固定policyの $V(A),V(B)$ をBellman方程式から解け。

**解答**：$V(B)=2+0.5V(B)$ なので $V(B)=4$。次に $V(A)=1+0.5V(B)=3$。

---

## 条件を変える

2状態A,B。policy固定でA→Bが確率1、reward1、B→Bが確率1、reward2、$\gamma=0.5$。$V(B)=2+0.5V(B)$ より4。$V(A)=1+0.5V(B)=3$。Bellman式を連立で解ける。

---

## どこで壊れるか

reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。$\gamma=1$ のcontinuing taskではreturnが発散する場合があり、有限性の条件を確認する。

---

## 次へ

modelが既知ならBellman operatorを反復するdynamic programming、未知ならsampleで期待値を置き換えるTD/Q-learning、policyを直接微分するpolicy gradientへ進む。

---

[教科書](../../textbook/ml-mdp-bellman-equations)　|　[10問の演習](../../exercises/ml-mdp-bellman-equations)

---

## 今回の問い

「MDPとBellman方程式」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. 逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
