# RLHF：reward model・PPO・KL制御

Course 10｜Frontier

まずchosen/rejected比較からreward modelを学び、そのrewardを最大化するようpolicyをRLで更新する。ただしreward modelの穴を突くoveroptimizationを抑えるためreference policyとのKL penaltyを使う。

## 到達目標

- 人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/frontier-rlhf-reward-model-ppo-kl)
- [演習](/exercises/frontier-rlhf-reward-model-ppo-kl)
- [スライド](/slides/frontier-rlhf-reward-model-ppo-kl/)
