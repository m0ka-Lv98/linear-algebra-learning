# policy gradientとREINFORCE

Course 08｜機械学習

trajectory確率のlog微分を使うと、環境遷移を微分せずに期待returnのgradientをpolicyのlog-probabilityで表せる。

## 到達目標

- 価値のargmaxを介さず、確率policyそのものを期待returnが増える方向へどう更新するか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/ml-policy-gradient-reinforce)
- [演習](/exercises/ml-policy-gradient-reinforce)
- [スライド](/slides/ml-policy-gradient-reinforce/)
