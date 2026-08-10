# policy gradientとREINFORCE：教科書

Course 08｜機械学習

## このTopicで解く問題

価値のargmaxを介さず、確率policyそのものを期待returnが増える方向へどう更新するか。

## なぜこの概念が必要か

trajectory確率のlog微分を使うと、環境遷移を微分せずに期待returnのgradientをpolicyのlog-probabilityで表せる。

## 図の各要素は何を表しているか

<img src="/visuals/course-08/ml-policy-gradient-reinforce.png" alt="policy gradientとREINFORCEの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸が学習update、縦軸が良いactionのpolicy probability。returnの高いtrajectoryに含まれたactionのlog-probabilityをgradientで上げると、確率が徐々に1へ寄る。価値関数のargmaxを介さず、確率分布そのものを動かす。

## 記号・型・定義域

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

## 中心となる式

$$
\nabla_\theta J(\theta)=E_\pi\left[\sum_t G_t\nabla_\theta\log\pi_\theta(A_t|S_t)\right]
$$

## 中心式を前提から導く

1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。
2. $\nabla p_θ=p_θ\nabla\log p_θ$ のlog-derivative trickを使う。
3. 環境transitionはθに依存しないのでtrajectory log-probabilityのgradientはpolicy log-probabilityの和だけ残る。

## なぜその変形をしてよいのか

trajectory $\tau=(s_0,a_0,\dots)$ の確率は初期分布・環境transition・policy確率の積。環境transitionがparameter $\theta$ に依存しないとき、$\nabla_\theta\log p_\theta(\tau)=\sum_t\nabla\log\pi_\theta(a_t|s_t)$。

$J=\sum_\tau p_\theta(\tau)R(\tau)$ を微分し、$\nabla p=p\nabla\log p$ を使うとpolicy gradient estimatorが得られる。baseline $b(s_t)$ はactionに依存しなければ期待gradientを変えず、varianceを減らせる。

## log-derivative trickを省略しない

policy parameterを $\theta$、trajectoryを $\tau$、returnを $R(\tau)$ とする。目的は

$$
J(\theta)=E_{\tau\sim p_\theta}[R(\tau)]
=\sum_\tau p_\theta(\tau)R(\tau).
$$

微分して

$$
\nabla J
=\sum_\tau \nabla p_\theta(\tau)R(\tau)
=\sum_\tau p_\theta(\tau)\nabla\log p_\theta(\tau)R(\tau).
$$

trajectory確率は

$$
p_\theta(\tau)=p(s_0)\prod_t \pi_\theta(a_t|s_t)P(s_{t+1}|s_t,a_t).
$$

環境transition $P$ は $\theta$ に依存しないのでlog微分するとpolicy項だけ残り、

$$
\nabla J
=E\left[R(\tau)\sum_t\nabla\log\pi_\theta(a_t|s_t)\right].
$$

これがREINFORCE estimatorの核。環境の微分可能性を仮定していない点が重要である。

baseline $b(s_t)$ を引いても $E_{a\sim\pi}[\nabla\log\pi(a|s)b(s)]=0$ なので期待gradientは変わらず、varianceだけを減らせる。

## 例題1：具体的な数値・構造で解く

**問題**：2-action softmax policyでlogitが $(0,0)$。action1を選びadvantage=2を得た。$\nabla_{z_1}\log\pi(a_1)=1-\pi(a_1)$ を使い、logit1に対するgradient contributionを求めよ。

**解答**：$\pi(a_1)=0.5$ なので derivative=0.5。advantage2を掛けてgradient contribution=1。gradient ascentならz1を増やす方向。

## 例題2：別の条件で確認する

2 action softmaxで現在 $\pi(a_1)=0.5$。あるepisodeでa1を選び正のadvantageを得たなら $\nabla\log\pi(a_1)$ 方向へparameterを更新し、a1のlogitを相対的に上げる。

## 結果の検算

policy gradientでは各stateで $\sum_a\pi_\theta(a|s)=1$ を確認したうえで、positive returnを持つsampleが選択actionのlog-probabilityを上げる向きへ寄与するかを見る。さらに score function の期待値 $E_{a\sim\pi}[\nabla_\theta\log\pi_\theta(a|s)]=0$ を使うと、state-only baselineを引いても期待gradientが変わらないことを検算できる。

## 条件を外すと何が壊れるか

returnを大きくしたactionを無条件に上げるだけでは、stateごとの差やbaselineを無視して高varianceになる。REINFORCEはunbiasedでもsample efficiencyが低い。

## よくある誤り

- returnを微分するのではない。
- 高variance estimatorなのでbaseline/advantageが重要。

## 次のTopic・応用への接続

actor–criticはcriticでadvantageを推定しvarianceを下げる。PPOはpolicy更新幅を制限し、Course10のRLHFでLLM policyを更新する中心手法の一つになる。

## 参考

- REINFORCE; Stanford CS229 policy search

[演習へ](/exercises/ml-policy-gradient-reinforce)　|　[スライドへ](/slides/ml-policy-gradient-reinforce/)
