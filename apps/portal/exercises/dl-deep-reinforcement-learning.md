# Deep Reinforcement Learning：演習

Course 09｜深層学習

[教科書](/textbook/dl-deep-reinforcement-learning)

## 問題1

DQN sampleで $r=0.5$, $\gamma=0.9$, target networkの次state maxQ=5, current $Q=3$。TD target、error、squared lossを求めよ。

<details><summary>完全解答</summary>

target=$0.5+0.9\times5=5.0$。TD error=5.0-3=2.0、squared loss=4.0（1/2係数を使う実装なら2.0）。

</details>

## 問題2

「Deep Reinforcement Learning」の導出を、最初の段階「1. tabular Q updateをsquared TD error最小化として書き換える。」から始めて中心式まで再構成せよ。途中で「DQNではtabular Q-learningのTD targetをnetworkへ拡張し、squared TD errorをmini-batchで最小化する。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. tabular Q updateをsquared TD error最小化として書き換える。
2. 相関した逐次sampleをreplay bufferでshuffleする。
3. target networkを遅く更新してmoving targetを緩和する。

DQNではtabular Q-learningのTD targetをnetworkへ拡張し、squared TD errorをmini-batchで最小化する。しかし同じnetworkでtargetとpredictionを同時に更新するとtarget自体が急に動く。そこで遅く更新するtarget network $\theta^-$ を使う。

連続したtransitionは強く相関するのでreplay bufferからrandom mini-batchを取り、近似的に相関を弱める。これらはBellman式を変えるのではなく、function approximationでのoptimization stabilityを改善する工夫。

</details>

## 問題3

図 `/visuals/course-09/dl-deep-reinforcement-learning.png` では「横軸がenvironment step、縦軸がepisode return。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-09/dl-deep-reinforcement-learning.png" alt="Deep Reinforcement Learningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がenvironment step、縦軸がepisode return。raw returnは大きく揺れ、移動平均が徐々に上がる。supervised learningのようにiid fixed dataset上のlossが単調に下がるとは限らず、policyが変わると収集data分布も変わることを示す。

</details>

## 問題4

「Deep Reinforcement Learning」の第二例「sample $(s,a,r,s')$ で $r=1$, $\gamma=0.99$, target networkのmaxQ=3ならtarget=3.97。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

sample $(s,a,r,s')$ で $r=1$, $\gamma=0.99$, target networkのmaxQ=3ならtarget=3.97。online Qが2.5ならTD error=1.47、squared lossは約2.161。

</details>

## 問題5

Deep Reinforcement Learningで networkで近似したQ、target network parameter、replay buffer は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`dl-deep-reinforcement-learning` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $Q_θ(s,a)$ | networkで近似したQ |
| $θ^-$ | target network parameter |
| $D$ | replay buffer |


- $Q_\theta(s,a)$：online network。
- $Q_{\theta^-}$：target network。
- $D$：replay bufferのtransition分布。

</details>

## 問題6

警告「replayとtarget networkを入れれば必ず収束するわけではない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

replayとtarget networkを入れれば必ず収束するわけではない。off-policy + bootstrapping + nonlinear function approximationの不安定性は残り、reward scaleやexplorationにも敏感。

</details>

## 問題7

よくある誤り「supervised learningと違いtarget分布自体がpolicyとともに変わる。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- supervised learningと違いtarget分布自体がpolicyとともに変わる。
- offline dataへ通常のQ-learningを無条件適用するとOOD action overestimationが起こり得る。

replayとtarget networkを入れれば必ず収束するわけではない。off-policy + bootstrapping + nonlinear function approximationの不安定性は残り、reward scaleやexplorationにも敏感。

</details>

## 問題8

「Deep Reinforcement Learning」の例題1を再計算し、その結果に対して次の検算を実行せよ：DQNではtarget $y=r+\gamma\max_{a'}Q_{\mathrm{target}}(s',a')$ をcurrent networkの $Q(s,a)$ と分離して計算する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

target=$0.5+0.9\times5=5.0$。TD error=5.0-3=2.0、squared loss=4.0（1/2係数を使う実装なら2.0）。

検算：
DQNではtarget $y=r+\gamma\max_{a'}Q_{\mathrm{target}}(s',a')$ をcurrent networkの $Q(s,a)$ と分離して計算する。terminal transitionではbootstrap項を0にし、TD errorの符号に応じてcurrent Qがtarget方向へ更新されるか確認する。

</details>

## 問題9

後続への接続「actor–critic、PPO、model-based RLへ進む。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

actor–critic、PPO、model-based RLへ進む。Course10のRLHFではstateがprompt+prefix、actionがtoken、policyがLMという巨大なRL問題として理解できる。

</details>

## 問題10

中心問題「表形式のQやpolicyをニューラルnetworkへ置き換えると、何が可能になり、何が不安定になるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \mathcal L(\theta)=E_{(s,a,r,s\prime)\sim D}\left[(r+\gamma\max_{a\prime}Q_{\theta^-}(s\prime,a\prime)-Q_\theta(s,a))^2\right] $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「replayとtarget networkを入れれば必ず収束するわけではない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $Q_θ(s,a)$ | networkで近似したQ |
| $θ^-$ | target network parameter |
| $D$ | replay buffer |


- $Q_\theta(s,a)$：online network。
- $Q_{\theta^-}$：target network。
- $D$：replay bufferのtransition分布。

中心式：
$$
\mathcal L(\theta)=E_{(s,a,r,s\prime)\sim D}\left[(r+\gamma\max_{a\prime}Q_{\theta^-}(s\prime,a\prime)-Q_\theta(s,a))^2\right]
$$

導出：
1. tabular Q updateをsquared TD error最小化として書き換える。
2. 相関した逐次sampleをreplay bufferでshuffleする。
3. target networkを遅く更新してmoving targetを緩和する。

根拠：
DQNではtabular Q-learningのTD targetをnetworkへ拡張し、squared TD errorをmini-batchで最小化する。しかし同じnetworkでtargetとpredictionを同時に更新するとtarget自体が急に動く。そこで遅く更新するtarget network $\theta^-$ を使う。

連続したtransitionは強く相関するのでreplay bufferからrandom mini-batchを取り、近似的に相関を弱める。これらはBellman式を変えるのではなく、function approximationでのoptimization stabilityを改善する工夫。

具体例：
**問題**：DQN sampleで $r=0.5$, $\gamma=0.9$, target networkの次state maxQ=5, current $Q=3$。TD target、error、squared lossを求めよ。

**解答**：target=$0.5+0.9\times5=5.0$。TD error=5.0-3=2.0、squared loss=4.0（1/2係数を使う実装なら2.0）。

失敗条件：
replayとtarget networkを入れれば必ず収束するわけではない。off-policy + bootstrapping + nonlinear function approximationの不安定性は残り、reward scaleやexplorationにも敏感。

</details>
