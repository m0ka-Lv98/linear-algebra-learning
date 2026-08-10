# Deep Reinforcement Learning：教科書

Course 09｜深層学習

## このTopicの中心問題

表形式のQやpolicyをニューラルnetworkへ置き換えると、何が可能になり、何が不安定になるか。

## まず直感

高次元stateでは表を持てないためfunction approximationを使う。DQNはQ-learningにreplay bufferとtarget networkを加え、PPO等のactor-criticではpolicyとvalueを同時学習する。

## 図で固定する

<img src="/visuals/course-09/dl-deep-reinforcement-learning.png" alt="Deep Reinforcement Learningの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $Q_θ(s,a)$ | networkで近似したQ |
| $θ^-$ | target network parameter |
| $D$ | replay buffer |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathcal L(\theta)=E_{(s,a,r,s\prime)\sim D}\left[(r+\gamma\max_{a\prime}Q_{\theta^-}(s\prime,a\prime)-Q_\theta(s,a))^2\right]
$$

## なぜこの式になるのか

1. tabular Q updateをsquared TD error最小化として書き換える。
2. 相関した逐次sampleをreplay bufferでshuffleする。
3. target networkを遅く更新してmoving targetを緩和する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

画像stateのAtariではCNNがQ(s,a)を出し、ε-greedyで行動を選ぶ。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- supervised learningと違いtarget分布自体がpolicyとともに変わる。
- offline dataへ通常のQ-learningを無条件適用するとOOD action overestimationが起こり得る。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- DQN; PPO; MIT 6.S191 Deep Reinforcement Learning

[演習へ](/exercises/dl-deep-reinforcement-learning)　|　[スライドへ](/slides/dl-deep-reinforcement-learning/)
