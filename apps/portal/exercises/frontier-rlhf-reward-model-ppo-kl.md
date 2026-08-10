# RLHF：reward model・PPO・KL制御：演習

Course 10｜Frontier

[教科書](/textbook/frontier-rlhf-reward-model-ppo-kl)

## 問題1

policy Aの期待reward改善が0.7、referenceからのKLが0.2、$\beta=1.5$ とする。KL正則化objectiveの改善量を求めよ。

<details><summary>完全解答</summary>

$0.7-1.5\times0.2=0.4$。rewardだけなら0.7だが、distribution shift cost 0.3を引く。

</details>

## 問題2

「RLHF：reward model・PPO・KL制御」の導出を、最初の段階「1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。」から始めて中心式まで再構成せよ。途中で「reward modelはpairwise preference $y_w\succ y_l$ を $P(y_w\succ y_l|x)=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))$ とmodel化し、binary log lossで学ぶ。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。
2. learned rewardをRL objectiveにする。
3. KL penaltyでreferenceからのdistribution shiftを制限し、PPO等で近似更新する。

reward modelはpairwise preference $y_w\succ y_l$ を $P(y_w\succ y_l|x)=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))$ とmodel化し、binary log lossで学ぶ。絶対rewardの原点は識別できず、differenceが重要。

policy stageでは $E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta||\pi_{ref})$ を最大化する。KL項はreward modelの誤差を突いて極端なdistributionへ移るreward hacking/overoptimizationを抑える。PPOはimportance ratioを使い、1 batchでの更新幅をclipする近似的trust-region法。

</details>

## 問題3

図 `/visuals/course-10/frontier-rlhf-reward-model-ppo-kl.png` では「左上の同一promptからchosen/rejected response pairがreward model学習へ入り、$r_\phi(x,y)$ を作る。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-rlhf-reward-model-ppo-kl.png" alt="RLHF：reward model・PPO・KL制御の図解" style="max-height: 480px; display:block; margin:0 auto;" />

左上の同一promptからchosen/rejected response pairがreward model学習へ入り、$r_\phi(x,y)$ を作る。別経路でSFT policyがresponseをrolloutし、そのrewardを受けてPPO updateされる。reference policyは更新せず、current policyとのKLを計算して「rewardを上げるがSFTから離れすぎない」制約として働く。2つのtraining loopを区別して読む。

</details>

## 問題4

「RLHF：reward model・PPO・KL制御」の第二例「reward差 $r_w-r_l=1.2$ ならpreference probabilityは $\sigma(1.2)\approx0.769$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

reward差 $r_w-r_l=1.2$ ならpreference probabilityは $\sigma(1.2)\approx0.769$。policy updateでrewardが0.5増えてもKL penaltyが0.4、$\beta=2$ ならnet objective変化は0.5-0.8=-0.3となり、その移動は抑えられる。

</details>

## 問題5

RLHF：reward model・PPO・KL制御で reward model、trainable policy、reference policy、KL penalty係数 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-rlhf-reward-model-ppo-kl` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $r_φ(x,y)$ | reward model |
| $π_θ$ | trainable policy |
| $π_ref$ | reference policy |
| $β$ | KL penalty係数 |


- $r_\phi(x,y)$：reward model score。
- $\pi_\theta$：更新するpolicy、$\pi_{ref}$：固定reference policy。
- $\beta>0$：KL penalty係数。

</details>

## 問題6

警告「reward model scoreを「人間価値の真値」とみなさない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

reward model scoreを「人間価値の真値」とみなさない。training preference分布外では誤差が大きくなり得る。またPPO clipとKL penaltyは同じ役割ではなく、前者はupdate ratio、後者はreferenceからのdistribution shiftを制御する。

</details>

## 問題7

よくある誤り「reward model scoreをground truth utilityとみなさない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- reward model scoreをground truth utilityとみなさない。
- KL係数とreward scaleのconventionを明示する。

reward model scoreを「人間価値の真値」とみなさない。training preference分布外では誤差が大きくなり得る。またPPO clipとKL penaltyは同じ役割ではなく、前者はupdate ratio、後者はreferenceからのdistribution shiftを制御する。

</details>

## 問題8

「RLHF：reward model・PPO・KL制御」の例題1を再計算し、その結果に対して次の検算を実行せよ：reward modelのpairwise lossとpolicy updateのobjectiveを混ぜない。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$0.7-1.5\times0.2=0.4$。rewardだけなら0.7だが、distribution shift cost 0.3を引く。

検算：
reward modelのpairwise lossとpolicy updateのobjectiveを混ぜない。policy側ではlearned rewardから $\beta\,\mathrm{KL}(\pi_\theta\|\pi_{\mathrm{ref}})$ を引く符号になっているか確認し、$\beta$ を大きくするとreferenceからの乖離が抑えられる方向へ働くかを見る。

</details>

## 問題9

後続への接続「DPOはKL-regularized optimal policyとBradley–Terry preference modelを組み合わせ、明示的reward model+online RLを使わずpairwise classification objectiveへ変形する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

DPOはKL-regularized optimal policyとBradley–Terry preference modelを組み合わせ、明示的reward model+online RLを使わずpairwise classification objectiveへ変形する。次のRLVRではrewardを人間選好でなくverifierから得る。

</details>

## 問題10

中心問題「人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ J(\theta)=E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x)) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「reward model scoreを「人間価値の真値」とみなさない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $r_φ(x,y)$ | reward model |
| $π_θ$ | trainable policy |
| $π_ref$ | reference policy |
| $β$ | KL penalty係数 |


- $r_\phi(x,y)$：reward model score。
- $\pi_\theta$：更新するpolicy、$\pi_{ref}$：固定reference policy。
- $\beta>0$：KL penalty係数。

中心式：
$$
J(\theta)=E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x))
$$

導出：
1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。
2. learned rewardをRL objectiveにする。
3. KL penaltyでreferenceからのdistribution shiftを制限し、PPO等で近似更新する。

根拠：
reward modelはpairwise preference $y_w\succ y_l$ を $P(y_w\succ y_l|x)=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l))$ とmodel化し、binary log lossで学ぶ。絶対rewardの原点は識別できず、differenceが重要。

policy stageでは $E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta||\pi_{ref})$ を最大化する。KL項はreward modelの誤差を突いて極端なdistributionへ移るreward hacking/overoptimizationを抑える。PPOはimportance ratioを使い、1 batchでの更新幅をclipする近似的trust-region法。

具体例：
**問題**：policy Aの期待reward改善が0.7、referenceからのKLが0.2、$\beta=1.5$ とする。KL正則化objectiveの改善量を求めよ。

**解答**：$0.7-1.5\times0.2=0.4$。rewardだけなら0.7だが、distribution shift cost 0.3を引く。

失敗条件：
reward model scoreを「人間価値の真値」とみなさない。training preference分布外では誤差が大きくなり得る。またPPO clipとKL penaltyは同じ役割ではなく、前者はupdate ratio、後者はreferenceからのdistribution shiftを制御する。

</details>
