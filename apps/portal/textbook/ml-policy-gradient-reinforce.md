# policy gradientとREINFORCE：教科書

Course 08｜機械学習

## このTopicの中心問題

価値のargmaxを介さず、確率policyそのものを期待returnが増える方向へどう更新するか。

## まず直感

trajectory確率のlog微分を使うと、環境遷移を微分せずに期待returnのgradientをpolicyのlog-probabilityで表せる。

## 図で固定する

<img src="/visuals/course-08/ml-policy-gradient-reinforce.png" alt="policy gradientとREINFORCEの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $π_θ(a|s)$ | parameter θ のpolicy |
| $τ$ | trajectory |
| $G_t$ | return |
| $J(θ)$ | 期待return |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\nabla_\theta J(\theta)=E_\pi\left[\sum_t G_t\nabla_\theta\log\pi_\theta(A_t|S_t)\right]
$$

## なぜこの式になるのか

1. $J=E_{τ\sim p_θ}[R(τ)]$ を積分/和で書く。
2. $\nabla p_θ=p_θ\nabla\log p_θ$ のlog-derivative trickを使う。
3. 環境transitionはθに依存しないのでtrajectory log-probabilityのgradientはpolicy log-probabilityの和だけ残る。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

良いreturnを得たactionのlog-probabilityを上げ、悪いreturnでは下げる。baselineを引いても期待gradientは変えずvarianceを減らせる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- returnを微分するのではない。
- 高variance estimatorなのでbaseline/advantageが重要。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- REINFORCE; Stanford CS229 policy search

[演習へ](/exercises/ml-policy-gradient-reinforce)　|　[スライドへ](/slides/ml-policy-gradient-reinforce/)
