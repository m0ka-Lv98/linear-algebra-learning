# Deep Reinforcement Learning：教科書

Course 09｜深層学習

## このTopicで解く問題

表形式のQやpolicyをニューラルnetworkへ置き換えると、何が可能になり、何が不安定になるか。

## なぜこの概念が必要か

高次元stateでは表を持てないためfunction approximationを使う。DQNはQ-learningにreplay bufferとtarget networkを加え、PPO等のactor-criticではpolicyとvalueを同時学習する。

## 図の各要素は何を表しているか

<img src="/visuals/course-09/dl-deep-reinforcement-learning.png" alt="Deep Reinforcement Learningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がenvironment step、縦軸がepisode return。raw returnは大きく揺れ、移動平均が徐々に上がる。supervised learningのようにiid fixed dataset上のlossが単調に下がるとは限らず、policyが変わると収集data分布も変わることを示す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $Q_θ(s,a)$ | networkで近似したQ |
| $θ^-$ | target network parameter |
| $D$ | replay buffer |


- $Q_\theta(s,a)$：online network。
- $Q_{\theta^-}$：target network。
- $D$：replay bufferのtransition分布。

## 中心となる式

$$
\mathcal L(\theta)=E_{(s,a,r,s\prime)\sim D}\left[(r+\gamma\max_{a\prime}Q_{\theta^-}(s\prime,a\prime)-Q_\theta(s,a))^2\right]
$$

## 中心式を前提から導く

1. tabular Q updateをsquared TD error最小化として書き換える。
2. 相関した逐次sampleをreplay bufferでshuffleする。
3. target networkを遅く更新してmoving targetを緩和する。

## なぜその変形をしてよいのか

DQNではtabular Q-learningのTD targetをnetworkへ拡張し、squared TD errorをmini-batchで最小化する。しかし同じnetworkでtargetとpredictionを同時に更新するとtarget自体が急に動く。そこで遅く更新するtarget network $\theta^-$ を使う。

連続したtransitionは強く相関するのでreplay bufferからrandom mini-batchを取り、近似的に相関を弱める。これらはBellman式を変えるのではなく、function approximationでのoptimization stabilityを改善する工夫。

## DQNでtarget networkが必要になる理由

Q-networkを $Q_\theta(s,a)$ とし、1 transition $(s,a,r,s')$ に対してtarget

$$
y=r+\gamma\max_{a'}Q_{\theta^-}(s',a')
$$

を作り、

$$
L(\theta)=(y-Q_\theta(s,a))^2
$$

を最小化する。もしtarget側も同じ $\theta$ を毎step同時更新すると、predictionが追いかける「正解」そのものが急速に動くmoving-target problemになる。$\theta^-$ を一定期間固定またはゆっくり追従させることでtarget変動を抑える。

replay bufferは連続trajectoryの強い時間相関を崩し、同じexperienceを複数回利用する。これによりdata efficiencyは上がるが、過去policyのdataを使うためoff-policy性も強くなる。

## 数値例

$r=1$, $\gamma=0.99$, target-networkの次state max Qが3なら $y=3.97$。online Qが2.5ならTD errorは1.47、squared lossは約2.16。gradientはonline networkにだけ流し、target networkへは通常stop-gradientする。

## 例題1：具体的な数値・構造で解く

**問題**：DQN sampleで $r=0.5$, $\gamma=0.9$, target networkの次state maxQ=5, current $Q=3$。TD target、error、squared lossを求めよ。

**解答**：target=$0.5+0.9\times5=5.0$。TD error=5.0-3=2.0、squared loss=4.0（1/2係数を使う実装なら2.0）。

## 例題2：別の条件で確認する

sample $(s,a,r,s')$ で $r=1$, $\gamma=0.99$, target networkのmaxQ=3ならtarget=3.97。online Qが2.5ならTD error=1.47、squared lossは約2.161。

## 結果の検算

DQNではtarget $y=r+\gamma\max_{a'}Q_{\mathrm{target}}(s',a')$ をcurrent networkの $Q(s,a)$ と分離して計算する。terminal transitionではbootstrap項を0にし、TD errorの符号に応じてcurrent Qがtarget方向へ更新されるか確認する。

## 条件を外すと何が壊れるか

replayとtarget networkを入れれば必ず収束するわけではない。off-policy + bootstrapping + nonlinear function approximationの不安定性は残り、reward scaleやexplorationにも敏感。

## よくある誤り

- supervised learningと違いtarget分布自体がpolicyとともに変わる。
- offline dataへ通常のQ-learningを無条件適用するとOOD action overestimationが起こり得る。

## 次のTopic・応用への接続

actor–critic、PPO、model-based RLへ進む。Course10のRLHFではstateがprompt+prefix、actionがtoken、policyがLMという巨大なRL問題として理解できる。

## 参考

- DQN; PPO; MIT 6.S191 Deep Reinforcement Learning

[演習へ](/exercises/dl-deep-reinforcement-learning)　|　[スライドへ](/slides/dl-deep-reinforcement-learning/)
