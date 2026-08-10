# policy gradientとREINFORCE：演習

Course 08｜機械学習

[教科書](/textbook/ml-policy-gradient-reinforce)

## 問題1

2-action softmax policyでlogitが $(0,0)$。action1を選びadvantage=2を得た。$\nabla_{z_1}\log\pi(a_1)=1-\pi(a_1)$ を使い、logit1に対するgradient contributionを求めよ。

<details><summary>完全解答</summary>

$\pi(a_1)=0.5$ なので derivative=0.5。advantage2を掛けてgradient contribution=1。gradient ascentならz1を増やす方向。

</details>

## 問題2

「policy gradientとREINFORCE」の導出を、最初の段階「1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。」から始めて中心式まで再構成せよ。途中で「trajectory $\tau=(s_0,a_0,\dots)$ の確率は初期分布・環境transition・policy確率の積。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。
2. $\nabla p_θ=p_θ\nabla\log p_θ$ のlog-derivative trickを使う。
3. 環境transitionはθに依存しないのでtrajectory log-probabilityのgradientはpolicy log-probabilityの和だけ残る。

trajectory $\tau=(s_0,a_0,\dots)$ の確率は初期分布・環境transition・policy確率の積。環境transitionがparameter $\theta$ に依存しないとき、$\nabla_\theta\log p_\theta(\tau)=\sum_t\nabla\log\pi_\theta(a_t|s_t)$。

$J=\sum_\tau p_\theta(\tau)R(\tau)$ を微分し、$\nabla p=p\nabla\log p$ を使うとpolicy gradient estimatorが得られる。baseline $b(s_t)$ はactionに依存しなければ期待gradientを変えず、varianceを減らせる。

</details>

## 問題3

図 `/visuals/course-08/ml-policy-gradient-reinforce.png` では「横軸が学習update、縦軸が良いactionのpolicy probability。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-08/ml-policy-gradient-reinforce.png" alt="policy gradientとREINFORCEの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸が学習update、縦軸が良いactionのpolicy probability。returnの高いtrajectoryに含まれたactionのlog-probabilityをgradientで上げると、確率が徐々に1へ寄る。価値関数のargmaxを介さず、確率分布そのものを動かす。

</details>

## 問題4

「policy gradientとREINFORCE」の第二例「2 action softmaxで現在 $\pi(a_1)=0.5$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

2 action softmaxで現在 $\pi(a_1)=0.5$。あるepisodeでa1を選び正のadvantageを得たなら $\nabla\log\pi(a_1)$ 方向へparameterを更新し、a1のlogitを相対的に上げる。

</details>

## 問題5

policy gradientとREINFORCEで parameter θ のpolicy、trajectory、return、期待return は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`ml-policy-gradient-reinforce` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $π_θ(a|s)$ | parameter θ のpolicy |
| $τ$ | trajectory |
| $G_t$ | return |
| $J(θ)$ | 期待return |


- $\theta$：policy parameter。
- $J(\theta)$：expected return objective。
- $G_t$：時刻t以降のreturn。
- $\nabla\log\pi_\theta(A_t|S_t)$：score function。

</details>

## 問題6

警告「returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。REINFORCEはunbiasedでもsample efficiencyが低い。

</details>

## 問題7

よくある誤り「returnを微分するのではない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- returnを微分するのではない。
- 高variance estimatorなのでbaseline/advantageが重要。

returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。REINFORCEはunbiasedでもsample efficiencyが低い。

</details>

## 問題8

「policy gradientとREINFORCE」の例題1を再計算し、その結果に対して次の検算を実行せよ：policy gradientでは各stateで $\sum_a\pi_\theta(a|s)=1$ を確認したうえで、positive returnを持つsampleが選択actionのlog-probabilityを上げる向きへ寄与するかを見る。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$\pi(a_1)=0.5$ なので derivative=0.5。advantage2を掛けてgradient contribution=1。gradient ascentならz1を増やす方向。

検算：
policy gradientでは各stateで $\sum_a\pi_\theta(a|s)=1$ を確認したうえで、positive returnを持つsampleが選択actionのlog-probabilityを上げる向きへ寄与するかを見る。さらに score function の期待値 $E_{a\sim\pi}[\nabla_\theta\log\pi_\theta(a|s)]=0$ を使うと、state-only baselineを引いても期待gradientが変わらないことを検算できる。

</details>

## 問題9

後続への接続「actor–criticはcriticでadvantageを推定しvarianceを下げる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

actor–criticはcriticでadvantageを推定しvarianceを下げる。PPOはpolicy更新幅を制限し、Course10のRLHFでLLM policyを更新する中心手法の一つになる。

</details>

## 問題10

中心問題「価値のargmaxを介さず、確率policyそのものを期待returnが増える方向へどう更新するか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \nabla_\theta J(\theta)=E_\pi\left[\sum_t G_t\nabla_\theta\log\pi_\theta(A_t|S_t)\right] $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $π_θ(a|s)$ | parameter θ のpolicy |
| $τ$ | trajectory |
| $G_t$ | return |
| $J(θ)$ | 期待return |


- $\theta$：policy parameter。
- $J(\theta)$：expected return objective。
- $G_t$：時刻t以降のreturn。
- $\nabla\log\pi_\theta(A_t|S_t)$：score function。

中心式：
$$
\nabla_\theta J(\theta)=E_\pi\left[\sum_t G_t\nabla_\theta\log\pi_\theta(A_t|S_t)\right]
$$

導出：
1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。
2. $\nabla p_θ=p_θ\nabla\log p_θ$ のlog-derivative trickを使う。
3. 環境transitionはθに依存しないのでtrajectory log-probabilityのgradientはpolicy log-probabilityの和だけ残る。

根拠：
trajectory $\tau=(s_0,a_0,\dots)$ の確率は初期分布・環境transition・policy確率の積。環境transitionがparameter $\theta$ に依存しないとき、$\nabla_\theta\log p_\theta(\tau)=\sum_t\nabla\log\pi_\theta(a_t|s_t)$。

$J=\sum_\tau p_\theta(\tau)R(\tau)$ を微分し、$\nabla p=p\nabla\log p$ を使うとpolicy gradient estimatorが得られる。baseline $b(s_t)$ はactionに依存しなければ期待gradientを変えず、varianceを減らせる。

具体例：
**問題**：2-action softmax policyでlogitが $(0,0)$。action1を選びadvantage=2を得た。$\nabla_{z_1}\log\pi(a_1)=1-\pi(a_1)$ を使い、logit1に対するgradient contributionを求めよ。

**解答**：$\pi(a_1)=0.5$ なので derivative=0.5。advantage2を掛けてgradient contribution=1。gradient ascentならz1を増やす方向。

失敗条件：
returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。REINFORCEはunbiasedでもsample efficiencyが低い。

</details>
