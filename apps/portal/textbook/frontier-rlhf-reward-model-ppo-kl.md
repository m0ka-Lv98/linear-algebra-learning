# RLHF：reward model・PPO・KL制御：教科書

Course 10｜Frontier

## このTopicで解く問題

人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。

## なぜこの概念が必要か

まずchosen/rejected比較からreward modelを学び、そのrewardを最大化するようpolicyをRLで更新する。ただしreward modelの穴を突くoveroptimizationを抑えるためreference policyとのKL penaltyを使う。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-rlhf-reward-model-ppo-kl.png" alt="RLHF：reward model・PPO・KL制御の図解" style="max-height: 480px; display:block; margin:0 auto;" />

左上の同一promptからchosen/rejected response pairがreward model学習へ入り、$r_\phi(x,y)$ を作る。別経路でSFT policyがresponseをrolloutし、そのrewardを受けてPPO updateされる。reference policyは更新せず、current policyとのKLを計算して「rewardを上げるがSFTから離れすぎない」制約として働く。2つのtraining loopを区別して読む。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $r_φ(x,y)$ | reward model |
| $π_θ$ | trainable policy |
| $π_ref$ | reference policy |
| $β$ | KL penalty係数 |


- $r_\phi(x,y)$：reward model score。
- $\pi_\theta$：更新するpolicy、$\pi_{ref}$：固定reference policy。
- $\beta>0$：KL penalty係数。

## 中心となる式

$$
J(\theta)=E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x))
$$

## 中心式を前提から導く

1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。
2. learned rewardをRL objectiveにする。
3. KL penaltyでreferenceからのdistribution shiftを制限し、PPO等で近似更新する。

## なぜその変形をしてよいのか

reward modelはpairwise preference $y_w\succ y_l$ を $P(y_w\succ y_l|x)=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))$ とmodel化し、binary log lossで学ぶ。絶対rewardの原点は識別できず、differenceが重要。

policy stageでは $E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta||\pi_{ref})$ を最大化する。KL項はreward modelの誤差を突いて極端なdistributionへ移るreward hacking/overoptimizationを抑える。PPOはimportance ratioを使い、1 batchでの更新幅をclipする近似的trust-region法。

## reward modelのpairwise likelihood

同一prompt $x$ に対し、人間がchosen $y_w$ をrejected $y_l$ より好むとする。reward model $r_\phi(x,y)$ で

$$
P(y_w\succ y_l|x)
=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))
$$

と置けばnegative log-likelihoodは

$$
\mathcal L_{RM}
=-\log\sigma(r_w-r_l).
$$

reward全体へ同じ定数を足してもdifferenceは変わらないため、pairwise dataだけではrewardの絶対原点は識別されない。

## policy objectiveとKL control

reward modelができた後、policyは概念的に

$$
J(\theta)=E_{y\sim\pi_\theta(\cdot|x)}[r_\phi(x,y)]
-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x))
$$

を大きくしたい。第1項だけならreward modelの穴を突く極端なresponseへ移る可能性がある。第2項はSFT/reference policyから離れることへ価格を付ける。

PPOでは旧policyに対するprobability ratio $\rho_t=\pi_\theta(a_t|s_t)/\pi_{old}(a_t|s_t)$ とadvantage $A_t$ を使い、$\rho_t$ が1から大きく外れるupdateをclipする。**PPO clipは1回のupdate幅、KL penaltyはreference policyからの累積distance**を主に制御するため、同一のものではない。

## 例題1：具体的な数値・構造で解く

**問題**：policy Aの期待reward改善が0.7、referenceからのKLが0.2、$\beta=1.5$ とする。KL正則化objectiveの改善量を求めよ。

**解答**：$0.7-1.5\times0.2=0.4$。rewardだけなら0.7だが、distribution shift cost 0.3を引く。

## 例題2：別の条件で確認する

reward差 $r_w-r_l=1.2$ ならpreference probabilityは $\sigma(1.2)\approx0.769$。policy updateでrewardが0.5増えてもKL penaltyが0.4、$\beta=2$ ならnet objective変化は0.5-0.8=-0.3となり、その移動は抑えられる。

## 結果の検算

reward modelのpairwise lossとpolicy updateのobjectiveを混ぜない。policy側ではlearned rewardから $\beta\,\mathrm{KL}(\pi_\theta\|\pi_{\mathrm{ref}})$ を引く符号になっているか確認し、$\beta$ を大きくするとreferenceからの乖離が抑えられる方向へ働くかを見る。

## 条件を外すと何が壊れるか

reward model scoreを「人間価値の真値」とみなさない。training preference分布外では誤差が大きくなり得る。またPPO clipとKL penaltyは同じ役割ではなく、前者はupdate ratio、後者はreferenceからのdistribution shiftを制御する。

## よくある誤り

- reward model scoreをground truth utilityとみなさない。
- KL係数とreward scaleのconventionを明示する。

## 次のTopic・応用への接続

DPOはKL-regularized optimal policyとBradley–Terry preference modelを組み合わせ、明示的reward model+online RLを使わずpairwise classification objectiveへ変形する。次のRLVRではrewardを人間選好でなくverifierから得る。

## 参考

- InstructGPT arXiv:2203.02155
- PPO arXiv:1707.06347

[演習へ](/exercises/frontier-rlhf-reward-model-ppo-kl)　|　[スライドへ](/slides/frontier-rlhf-reward-model-ppo-kl/)
