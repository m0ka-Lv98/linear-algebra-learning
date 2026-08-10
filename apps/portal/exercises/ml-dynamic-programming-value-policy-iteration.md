# value iterationとpolicy iteration：演習

Course 08｜機械学習

[教科書](/textbook/ml-dynamic-programming-value-policy-iteration)

## 問題1

state Sで a1はreward2でterminal、a2はreward0でTへ進み、Tからreward6でterminal、$\gamma=0.5$。Sでのoptimal actionをBellman backupで求めよ。

<details><summary>完全解答</summary>

$Q(S,a1)=2$。$Q(S,a2)=0+0.5V(T)$ で $V(T)=6$ だから3。3>2なのでa2がoptimal。

</details>

## 問題2

「value iterationとpolicy iteration」の導出を、最初の段階「1. Bellman optimality equationを固定点方程式 V*=T*V* と読む。」から始めて中心式まで再構成せよ。途中で「optimality operator $T^*$ を $(T^*V)(s)=\max_a\sum_{s'}P(s'|s,a)[r+\gamma V(s')]$ と定義する。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. Bellman optimality equationを固定点方程式 V*=T*V* と読む。
2. T*はγ-contractionなので Banach fixed-point theoremにより反復収束。
3. V*から各状態でargmax actionを選んでgreedy optimal policyを得る。

optimality operator $T^*$ を $(T^*V)(s)=\max_a\sum_{s'}P(s'|s,a)[r+\gamma V(s')]$ と定義する。任意V,Wについてmaxの差を上から評価すると $\|T^*V-T^*W\|_\infty\le\gamma\|V-W\|_\infty$。$0\le\gamma<1$ ならcontraction。

Banach fixed-point theoremにより一意な固定点 $V^*$ があり、value iteration $V_{k+1}=T^*V_k$ は任意初期値から収束する。policy iterationは固定policyの線形方程式を解くevaluationと、greedy actionへ変えるimprovementを交互に行う。

</details>

## 問題3

図 `/visuals/course-08/ml-dynamic-programming-value-policy-iteration.png` では「横軸にstateを並べ、反復kごとのvalueを複数曲線で表示する。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-08/ml-dynamic-programming-value-policy-iteration.png" alt="value iterationとpolicy iterationの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸にstateを並べ、反復kごとのvalueを複数曲線で表示する。terminalや高reward stateの値が最初に決まり、Bellman backupを繰り返すほど遠いstateへdiscountされながら情報が伝播する。GIFはこのbackward propagationを反復ごとに示す。

</details>

## 問題4

「value iterationとpolicy iteration」の第二例「state Sでaction a1は即reward1でterminal、a2はreward0でstate Tへ、Tはreward4でterminal、$\gamma=0.5$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

state Sでaction a1は即reward1でterminal、a2はreward0でstate Tへ、Tはreward4でterminal、$\gamma=0.5$。a1価値1、a2価値0+0.5*4=2なのでoptimal actionはa2。

</details>

## 問題5

value iterationとpolicy iterationで Bellman optimality operator、k回目のvalue estimate、最適action value は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`ml-dynamic-programming-value-policy-iteration` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $T*$ | Bellman optimality operator |
| $V_k$ | k回目のvalue estimate |
| $Q*$ | 最適action value |


- $V_k(s)$：k回目のvalue推定。
- $T^*$：optimal Bellman operator。
- $V^*$：$T^*V^*=V^*$ を満たすoptimal value。

</details>

## 問題6

警告「$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。finite-horizonやproper stochastic shortest pathなど別条件が必要。

</details>

## 問題7

よくある誤り「policy evaluationとpolicy improvementを混同しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- policy evaluationとpolicy improvementを混同しない。
- γ=1のcontinuing taskで同じcontraction議論を無条件に使わない。

$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。finite-horizonやproper stochastic shortest pathなど別条件が必要。

</details>

## 問題8

「value iterationとpolicy iteration」の例題1を再計算し、その結果に対して次の検算を実行せよ：各iterationでBellman optimality operatorを同じ旧valueへ適用したか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$Q(S,a1)=2$。$Q(S,a2)=0+0.5V(T)$ で $V(T)=6$ だから3。3>2なのでa2がoptimal。

検算：
各iterationでBellman optimality operatorを同じ旧valueへ適用したか確認する。候補actionごとの $r+\gamma\sum_{s'}P(s'|s,a)V_k(s')$ を別々に計算し、その最大値が $V_{k+1}(s)$。$0\le\gamma<1$ なら2つのvalue vectorのsup norm差が反復で縮むことも収束診断に使える。

</details>

## 問題9

後続への接続「value iterationはfixed-point numerical methodとしてCourse05の収束理論と同型。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

value iterationはfixed-point numerical methodとしてCourse05の収束理論と同型。次のTDではoperatorの期待値を1本のsampleで近似する。

</details>

## 問題10

中心問題「modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)] $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $T*$ | Bellman optimality operator |
| $V_k$ | k回目のvalue estimate |
| $Q*$ | 最適action value |


- $V_k(s)$：k回目のvalue推定。
- $T^*$：optimal Bellman operator。
- $V^*$：$T^*V^*=V^*$ を満たすoptimal value。

中心式：
$$
V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]
$$

導出：
1. Bellman optimality equationを固定点方程式 V*=T*V* と読む。
2. T*はγ-contractionなので Banach fixed-point theoremにより反復収束。
3. V*から各状態でargmax actionを選んでgreedy optimal policyを得る。

根拠：
optimality operator $T^*$ を $(T^*V)(s)=\max_a\sum_{s'}P(s'|s,a)[r+\gamma V(s')]$ と定義する。任意V,Wについてmaxの差を上から評価すると $\|T^*V-T^*W\|_\infty\le\gamma\|V-W\|_\infty$。$0\le\gamma<1$ ならcontraction。

Banach fixed-point theoremにより一意な固定点 $V^*$ があり、value iteration $V_{k+1}=T^*V_k$ は任意初期値から収束する。policy iterationは固定policyの線形方程式を解くevaluationと、greedy actionへ変えるimprovementを交互に行う。

具体例：
**問題**：state Sで a1はreward2でterminal、a2はreward0でTへ進み、Tからreward6でterminal、$\gamma=0.5$。Sでのoptimal actionをBellman backupで求めよ。

**解答**：$Q(S,a1)=2$。$Q(S,a2)=0+0.5V(T)$ で $V(T)=6$ だから3。3>2なのでa2がoptimal。

失敗条件：
$\gamma=1$ の一般continuing MDPではcontraction証明が使えない。finite-horizonやproper stochastic shortest pathなど別条件が必要。

</details>
