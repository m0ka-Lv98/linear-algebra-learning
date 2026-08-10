# Monte Carlo・TD・Q-learning：演習

Course 08｜機械学習

[教科書](/textbook/ml-monte-carlo-td-q-learning)

## 問題1

$Q(s,a)=1.5$, reward2, $\gamma=0.8$, 次stateのmaxQ=3, $\alpha=0.25$。Q-learning 1step後のQを求めよ。

<details><summary>完全解答</summary>

target=$2+0.8\times3=4.4$。TD error=4.4-1.5=2.9。update=$1.5+0.25\times2.9=2.225$。

</details>

## 問題2

「Monte Carlo・TD・Q-learning」の導出を、最初の段階「1. Bellman optimality targetを未知期待値のsampleで近似する。」から始めて中心式まで再構成せよ。途中で「Monte Carloはepisode終了後に実現return $G_t$ をtargetにするのでunbiasedに近いがvarianceが大きく、途中更新できない。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. Bellman optimality targetを未知期待値のsampleで近似する。
2. 現在Qとsample targetとの差をTD errorとする。
3. stochastic approximationとしてQをTD error方向へ更新する。

Monte Carloはepisode終了後に実現return $G_t$ をtargetにするのでunbiasedに近いがvarianceが大きく、途中更新できない。TD(0)は $R_{t+1}+\gamma V(S_{t+1})$ をtargetにして現在推定を一部使うbootstrap。

Q-learningではoptimal Bellman target $Y_t=R_{t+1}+\gamma\max_aQ(S_{t+1},a)$ をsample 1本で作り、$Q\leftarrow Q+\alpha(Y-Q)$。behavior policyが探索を続け適切なstep size条件などが満たされるtabular settingでoptimal Qへ収束する。

</details>

## 問題3

図 `/visuals/course-08/ml-monte-carlo-td-q-learning.png` では「横軸がupdate回数、縦軸がQ推定値。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-08/ml-monte-carlo-td-q-learning.png" alt="Monte Carlo・TD・Q-learningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がupdate回数、縦軸がQ推定値。破線がBellman targetに対応する真の値で、sampleに基づくupdateが揺れながら近づく。terminal報酬が直前state-actionから前方へ徐々に伝わるというbootstrappingの特徴を表す。

</details>

## 問題4

「Monte Carlo・TD・Q-learning」の第二例「$Q(s,a)=2$, reward=1, $\gamma=0.9$, 次stateのmaxQ=4, $\alpha=0.5$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

$Q(s,a)=2$, reward=1, $\gamma=0.9$, 次stateのmaxQ=4, $\alpha=0.5$。target=4.6、TD error=2.6、新Q=2+0.5*2.6=3.3。

</details>

## 問題5

Monte Carlo・TD・Q-learningで learning rate、TD error、action value は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`ml-monte-carlo-td-q-learning` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $α$ | learning rate |
| $δ_t$ | TD error |
| $Q(s,a)$ | action value |


- $Q(s,a)$：state-action value推定。
- $\alpha$：learning rate。
- $R_{t+1}+\gamma\max_aQ(S_{t+1},a)$：1step TD target。

</details>

## 問題6

警告「Q-learningがoff-policyだから探索不要という意味ではない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

Q-learningがoff-policyだから探索不要という意味ではない。未訪問actionの価値は学べない。function approximationとbootstrappingとoff-policyを組み合わせると不安定化する「deadly triad」にも注意。

</details>

## 問題7

よくある誤り「Q-learningのmax targetとSARSAのon-policy next actionを混同しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- Q-learningのmax targetとSARSAのon-policy next actionを混同しない。
- function approximation + off-policy + bootstrappingの不安定性に注意する。

Q-learningがoff-policyだから探索不要という意味ではない。未訪問actionの価値は学べない。function approximationとbootstrappingとoff-policyを組み合わせると不安定化する「deadly triad」にも注意。

</details>

## 問題8

「Monte Carlo・TD・Q-learning」の例題1を再計算し、その結果に対して次の検算を実行せよ：TD/Q-learningではtargetを先に固定する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

target=$2+0.8\times3=4.4$。TD error=4.4-1.5=2.9。update=$1.5+0.25\times2.9=2.225$。

検算：
TD/Q-learningではtargetを先に固定する。Q-learningなら

$$
y=r+\gamma\max_{a'}Q(s',a')
$$

を計算し、TD error $\delta=y-Q(s,a)$ の符号を確認する。$\alpha>0$ なら更新 $Q\leftarrow Q+\alpha\delta$ はtarget方向へ動かなければならない。terminal stateではbootstrap項を0にする。

</details>

## 問題9

後続への接続「Deep Q-NetworkはQ tableをneural networkへ置き換え、replay bufferとtarget networkで不安定性を緩和する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

Deep Q-NetworkはQ tableをneural networkへ置き換え、replay bufferとtarget networkで不安定性を緩和する。

</details>

## 問題10

中心問題「遷移modelが未知でも、経験sampleだけから価値関数をどう学ぶか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)] $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「Q-learningがoff-policyだから探索不要という意味ではない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $α$ | learning rate |
| $δ_t$ | TD error |
| $Q(s,a)$ | action value |


- $Q(s,a)$：state-action value推定。
- $\alpha$：learning rate。
- $R_{t+1}+\gamma\max_aQ(S_{t+1},a)$：1step TD target。

中心式：
$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]
$$

導出：
1. Bellman optimality targetを未知期待値のsampleで近似する。
2. 現在Qとsample targetとの差をTD errorとする。
3. stochastic approximationとしてQをTD error方向へ更新する。

根拠：
Monte Carloはepisode終了後に実現return $G_t$ をtargetにするのでunbiasedに近いがvarianceが大きく、途中更新できない。TD(0)は $R_{t+1}+\gamma V(S_{t+1})$ をtargetにして現在推定を一部使うbootstrap。

Q-learningではoptimal Bellman target $Y_t=R_{t+1}+\gamma\max_aQ(S_{t+1},a)$ をsample 1本で作り、$Q\leftarrow Q+\alpha(Y-Q)$。behavior policyが探索を続け適切なstep size条件などが満たされるtabular settingでoptimal Qへ収束する。

具体例：
**問題**：$Q(s,a)=1.5$, reward2, $\gamma=0.8$, 次stateのmaxQ=3, $\alpha=0.25$。Q-learning 1step後のQを求めよ。

**解答**：target=$2+0.8\times3=4.4$。TD error=4.4-1.5=2.9。update=$1.5+0.25\times2.9=2.225$。

失敗条件：
Q-learningがoff-policyだから探索不要という意味ではない。未訪問actionの価値は学べない。function approximationとbootstrappingとoff-policyを組み合わせると不安定化する「deadly triad」にも注意。

</details>
