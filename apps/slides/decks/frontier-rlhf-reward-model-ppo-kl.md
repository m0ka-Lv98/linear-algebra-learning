---
theme: default
routerMode: hash
layout: cover
title: "RLHF：reward model・PPO・KL制御"
generatedBy: course01-10-curated-upgrade-v2
---

# RLHF：reward model・PPO・KL制御

Course 10｜Frontier

---

## 何を解決するか

人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。

まずchosen/rejected比較からreward modelを学び、そのrewardを最大化するようpolicyをRLで更新する。ただしreward modelの穴を突くoveroptimizationを抑えるためreference policyとのKL penaltyを使う。

---

## 図の意味

<img src="./assets/course-10/frontier-rlhf-reward-model-ppo-kl.png" style="max-height: 350px; display:block; margin:0 auto;" />

左上の同一promptからchosen/rejected response pairがreward model学習へ入り、$r_\phi(x,y)$ を作る。別経路でSFT policyがresponseをrolloutし、そのrewardを受けてPPO updateされる。reference policyは更新せず、current policyとのKLを計算して「rewardを上げるがSFTから離れすぎない」制約として働く。2つのtraining loopを区別して読む。

---

## 記号

| 記号 | 意味 |
|---|---|
| $r_φ(x,y)$ | reward model |
| $π_θ$ | trainable policy |
| $π_ref$ | reference policy |
| $β$ | KL penalty係数 |


- $r_\phi(x,y)$：reward model score。
- $\pi_\theta$：更新するpolicy、$\pi_{ref}$：固定reference policy。
- $\beta>0$：KL penalty係数。

---

## 中心式

$$
J(\theta)=E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x))
$$

---

## 導出

1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。
2. learned rewardをRL objectiveにする。
3. KL penaltyでreferenceからのdistribution shiftを制限し、PPO等で近似更新する。

---

## 省略しない一段

reward modelはpairwise preference $y_w\succ y_l$ を $P(y_w\succ y_l|x)=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))$ とmodel化し、binary log lossで学ぶ。絶対rewardの原点は識別できず、differenceが重要。

policy stageでは $E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta||\pi_{ref})$ を最大化する。KL項はreward modelの誤差を突いて極端なdistributionへ移るreward hacking/overoptimizationを抑える。PPOはimportance ratioを使い、1 batchでの更新幅をclipする近似的trust-region法。

---

## 手計算

**問題**：policy Aの期待reward改善が0.7、referenceからのKLが0.2、$\beta=1.5$ とする。KL正則化objectiveの改善量を求めよ。

**解答**：$0.7-1.5\times0.2=0.4$。rewardだけなら0.7だが、distribution shift cost 0.3を引く。

---

## 条件を変える

reward差 $r_w-r_l=1.2$ ならpreference probabilityは $\sigma(1.2)\approx0.769$。policy updateでrewardが0.5増えてもKL penaltyが0.4、$\beta=2$ ならnet objective変化は0.5-0.8=-0.3となり、その移動は抑えられる。

---

## どこで壊れるか

reward model scoreを「人間価値の真値」とみなさない。training preference分布外では誤差が大きくなり得る。またPPO clipとKL penaltyは同じ役割ではなく、前者はupdate ratio、後者はreferenceからのdistribution shiftを制御する。

---

## 次へ

DPOはKL-regularized optimal policyとBradley–Terry preference modelを組み合わせ、明示的reward model+online RLを使わずpairwise classification objectiveへ変形する。次のRLVRではrewardを人間選好でなくverifierから得る。

---

[教科書](../../textbook/frontier-rlhf-reward-model-ppo-kl)　|　[10問の演習](../../exercises/frontier-rlhf-reward-model-ppo-kl)

---

## 今回の問い

「RLHF：reward model・PPO・KL制御」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. 人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
