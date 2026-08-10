# 推論RLとverifiable reward：演習

Course 10｜Frontier

[教科書](/textbook/frontier-reasoning-rl-rlvr)

## 問題1

4 rolloutのrewardが [1,1,0,0]。group meanをbaselineとしてcentered rewardを求めよ。

<details><summary>完全解答</summary>

平均は0.5。centered rewardは [0.5,0.5,-0.5,-0.5]。正解rolloutのlog-probabilityを相対的に上げ、不正解を下げる信号になる。

</details>

## 問題2

「推論RLとverifiable reward」の導出を、最初の段階「1. promptから複数rolloutをsampleする。」から始めて中心式まで再構成せよ。途中で「verifiable taskではreward function $r(x,y)$ を自動計算できる。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. promptから複数rolloutをsampleする。
2. verifierで各responseへrewardを付ける。
3. relative/normalized rewardをpolicy gradient estimatorへ入れ、policy collapseを防ぐregularizationと併用する。

verifiable taskではreward function $r(x,y)$ を自動計算できる。policyから複数responseをsampleし、group内でrewardをcenter/normalizeしてadvantage相当の信号を作り、log-policy gradientで確率を更新する手法が使える。

重要なのは「verifierが測れること」と「望ましい推論のすべて」が同じではないこと。final answerだけをrewardすると、途中 reasoningのfaithfulnessやstyle、安全性はobjectiveに含まれない。policy regularizationやdiversity確保が必要。

</details>

## 問題3

図 `/visuals/course-10/frontier-reasoning-rl-rlvr.png` では「複数のrolloutを横に並べ、verifierが各responseへ0/1または連続rewardを返す。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-reasoning-rl-rlvr.png" alt="推論RLとverifiable rewardの図解" style="max-height: 480px; display:block; margin:0 auto;" />

複数のrolloutを横に並べ、verifierが各responseへ0/1または連続rewardを返す。正解rolloutと不正解rolloutのreward差がpolicy update信号になる。人間rankではなくunit test・symbolic checker等が直接評価する点を示す。

</details>

## 問題4

「推論RLとverifiable reward」の第二例「8 rollout中3本がchecker正解でreward1、5本が0。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

8 rollout中3本がchecker正解でreward1、5本が0。group平均0.375なら、正解rolloutのcentered rewardは+0.625、不正解は-0.375。これをlog-prob gradientへ掛けると相対的に正解trajectoryを上げる。

</details>

## 問題5

推論RLとverifiable rewardで 検証器からのreward、group/rollout集合、各sampleのadvantage相当量 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-reasoning-rl-rlvr` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $r(x,y)$ | 検証器からのreward |
| $G$ | group/rollout集合 |
| $A_i$ | 各sampleのadvantage相当量 |


- $x$：問題prompt、$y$：sampled rollout/response。
- $r(x,y)$：verifierが返すreward。
- $\pi_\theta$：更新するpolicy。

</details>

## 問題6

警告「verifier loopholeがあるとreward hackingが起きる。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

verifier loopholeがあるとreward hackingが起きる。unit testが不十分ならtestだけ通す不正実装を高rewardにしてしまう。reward specificationそのものを検証する必要がある。

</details>

## 問題7

よくある誤り「verifierが測らないreadabilityやsafetyは自動的に改善しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- verifierが測らないreadabilityやsafetyは自動的に改善しない。
- reward hackingとdata leakageを監視する。

verifier loopholeがあるとreward hackingが起きる。unit testが不十分ならtestだけ通す不正実装を高rewardにしてしまう。reward specificationそのものを検証する必要がある。

</details>

## 問題8

「推論RLとverifiable reward」の例題1を再計算し、その結果に対して次の検算を実行せよ：verifierが返すrewardを具体的なrolloutへ適用し、正解/不正解群でadvantageの符号が期待通りか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

平均は0.5。centered rewardは [0.5,0.5,-0.5,-0.5]。正解rolloutのlog-probabilityを相対的に上げ、不正解を下げる信号になる。

検算：
verifierが返すrewardを具体的なrolloutへ適用し、正解/不正解群でadvantageの符号が期待通りか確認する。最終答案だけを検証する場合、途中推論の品質はrewardに直接含まれていないことも診断項目として残す。

</details>

## 問題9

後続への接続「RLHFのpreference rewardと同じpolicy optimization基盤を使いつつ、feedback sourceが自動verifierへ変わる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

RLHFのpreference rewardと同じpolicy optimization基盤を使いつつ、feedback sourceが自動verifierへ変わる。reasoning model evaluationではpass@kとsample diversityも重要。

</details>

## 問題10

中心問題「数学・codingのように答えを自動検証できる課題では、preference modelを介さずどのようにRL信号を作れるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \max_\theta\;E_{y\sim\pi_\theta(\cdot|x)}[r(x,y)]\quad\text{with policy regularization} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「verifier loopholeがあるとreward hackingが起きる。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $r(x,y)$ | 検証器からのreward |
| $G$ | group/rollout集合 |
| $A_i$ | 各sampleのadvantage相当量 |


- $x$：問題prompt、$y$：sampled rollout/response。
- $r(x,y)$：verifierが返すreward。
- $\pi_\theta$：更新するpolicy。

中心式：
$$
\max_\theta\;E_{y\sim\pi_\theta(\cdot|x)}[r(x,y)]\quad\text{with policy regularization}
$$

導出：
1. promptから複数rolloutをsampleする。
2. verifierで各responseへrewardを付ける。
3. relative/normalized rewardをpolicy gradient estimatorへ入れ、policy collapseを防ぐregularizationと併用する。

根拠：
verifiable taskではreward function $r(x,y)$ を自動計算できる。policyから複数responseをsampleし、group内でrewardをcenter/normalizeしてadvantage相当の信号を作り、log-policy gradientで確率を更新する手法が使える。

重要なのは「verifierが測れること」と「望ましい推論のすべて」が同じではないこと。final answerだけをrewardすると、途中 reasoningのfaithfulnessやstyle、安全性はobjectiveに含まれない。policy regularizationやdiversity確保が必要。

具体例：
**問題**：4 rolloutのrewardが [1,1,0,0]。group meanをbaselineとしてcentered rewardを求めよ。

**解答**：平均は0.5。centered rewardは [0.5,0.5,-0.5,-0.5]。正解rolloutのlog-probabilityを相対的に上げ、不正解を下げる信号になる。

失敗条件：
verifier loopholeがあるとreward hackingが起きる。unit testが不十分ならtestだけ通す不正実装を高rewardにしてしまう。reward specificationそのものを検証する必要がある。

</details>
