# RLHF：reward model・PPO・KL制御：教科書

Course 10｜Frontier

## このTopicの中心問題

人間のpairwise preferenceをrewardへ変換し、policyをreferenceから離しすぎず改善する標準RLHF pipelineはどうつながるか。

## まず直感

まずchosen/rejected比較からreward modelを学び、そのrewardを最大化するようpolicyをRLで更新する。ただしreward modelの穴を突くoveroptimizationを抑えるためreference policyとのKL penaltyを使う。

## 図で固定する

<img src="/visuals/course-10/frontier-rlhf-reward-model-ppo-kl.png" alt="RLHF：reward model・PPO・KL制御の図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $r_φ(x,y)$ | reward model |
| $π_θ$ | trainable policy |
| $π_ref$ | reference policy |
| $β$ | KL penalty係数 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
J(\theta)=E_{y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\|\pi_{ref}(\cdot|x))
$$

## なぜこの式になるのか

1. pairwise preferenceをBradley–Terry型 $P(y_w\succ y_l)=σ(r_w-r_l)$ で学習する。
2. learned rewardをRL objectiveにする。
3. KL penaltyでreferenceからのdistribution shiftを制限し、PPO等で近似更新する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

同一promptに複数応答を生成し、人間rankからreward modelを作り、policy rollout→reward→PPO updateを反復する。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- reward model scoreをground truth utilityとみなさない。
- KL係数とreward scaleのconventionを明示する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- InstructGPT arXiv:2203.02155
- PPO arXiv:1707.06347

[演習へ](/exercises/frontier-rlhf-reward-model-ppo-kl)　|　[スライドへ](/slides/frontier-rlhf-reward-model-ppo-kl/)
