# MDPとBellman方程式：演習

Course 08｜機械学習

[教科書](/textbook/ml-mdp-bellman-equations)

## 問題1

2状態A,B。A→Bでreward1、B→Bでreward2、どちらも確率1、$\gamma=0.5$。固定policyの $V(A),V(B)$ をBellman方程式から解け。

<details><summary>完全解答</summary>

$V(B)=2+0.5V(B)$ なので $0.5V(B)=2$、従って $V(B)=4$。Aでは次stateが確率1でBなので $V(A)=1+0.5V(B)=1+2=3$。両方を元のBellman式へ代入すると、B側は$4=2+2$、A側は$3=1+2$となり検算できる。

</details>

## 問題2

「MDPとBellman方程式」の導出を、最初の段階「1. return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。」から始めて中心式まで再構成せよ。途中で「MDPを $(\mathcal S,\mathcal A,P,R,\gamma)$ と定義する。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。
2. 先頭1stepを分離して $G_t=R_{t+1}+γG_{t+1}$。
3. 状態sで条件付き期待値を取るとBellman expectation equation。

MDPを $(\mathcal S,\mathcal A,P,R,\gamma)$ と定義する。Markov性は次stateとrewardの条件付き分布が現在state/actionだけで決まるという仮定。policy $\pi(a|s)$ を固定するとtrajectory分布が決まり、discounted return $G_t=\sum_{k=0}^\infty\gamma^kR_{t+k+1}$ を定義できる。

$G_t=R_{t+1}+\gamma G_{t+1}$ と1step分離し、$S_t=s$ の条件付き期待値を取ると $V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})|S_t=s]$。有限stateならこれはVについての連立一次方程式 $\mathbf V=\mathbf r_\pi+\gamma P_\pi\mathbf V$。

</details>

## 問題3

図 `/visuals/course-08/ml-mdp-bellman-equations.png` では「各円がstate $s$、stateから出る矢印の種類がaction $a$。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-08/ml-mdp-bellman-equations.png" alt="MDPとBellman方程式の図解" style="max-height: 480px; display:block; margin:0 auto;" />

各円がstate $s$、stateから出る矢印の種類がaction $a$。矢印には遷移確率 $P(s'|s,a)$ と即時reward $r$ が付く。policy $\pi(a|s)$ はstateでどのactionを選ぶ確率。Bellman式は「今の1step reward」と「次stateの価値」を矢印ごとの確率で平均して現在stateの価値へ戻す。

</details>

## 問題4

「MDPとBellman方程式」の第二例「Aでは50%でAへ戻りreward 0、50%でBへ移りreward 2。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

Aでは50%でAへ戻りreward 0、50%でBへ移りreward 2。Bでは必ずBへ戻りreward 1、割引率を $\gamma=0.5$ とする。

Bについて

$$
V(B)=1+0.5V(B)
$$

なので $V(B)=2$。Aについては

$$
\begin{aligned}
V(A)
&=0.5\{0+0.5V(A)\}+0.5\{2+0.5V(B)\}\\
&=0.25V(A)+1.5.
\end{aligned}
$$

したがって $0.75V(A)=1.5$、よって $V(A)=2$。この例では「rewardの期待」と「次state valueの期待」を同じ遷移確率で平均する必要がある。

</details>

## 問題5

MDPとBellman方程式で 時刻tの状態、行動、報酬、割引率 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`ml-mdp-bellman-equations` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $S_t$ | 時刻tの状態 |
| $A_t$ | 行動 |
| $R_{t+1}$ | 報酬 |
| $γ∈[0,1)$ | 割引率 |
| $π(a|s)$ | policy |


- $\mathcal S,\mathcal A$：state/action集合。
- $P(s'|s,a)$：遷移確率。
- $\pi(a|s)$：policy。
- $V^\pi(s)=E_\pi[G_t|S_t=s]$：policy value。
- $E_\pi$：policyとtransitionが作るtrajectory分布での期待値。

</details>

## 問題6

警告「reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。$\gamma=1$ のcontinuing taskではreturnが発散する場合があり、有限性の条件を確認する。

</details>

## 問題7

よくある誤り「rewardとvalueを同じ量と思わない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- rewardとvalueを同じ量と思わない。
- discount γ の位置を1stepずらさない。

reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。$\gamma=1$ のcontinuing taskではreturnが発散する場合があり、有限性の条件を確認する。

</details>

## 問題8

「MDPとBellman方程式」の例題1を再計算し、その結果に対して次の検算を実行せよ：求めた各state valueをBellman方程式の右辺へ戻す。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$V(B)=2+0.5V(B)$ なので $0.5V(B)=2$、従って $V(B)=4$。Aでは次stateが確率1でBなので $V(A)=1+0.5V(B)=1+2=3$。両方を元のBellman式へ代入すると、B側は$4=2+2$、A側は$3=1+2$となり検算できる。

検算：
求めた各state valueをBellman方程式の右辺へ戻す。例題1では

$$
2+0.5\times4=4,\qquad 1+0.5\times4=3
$$

となり、$V(B)=4$, $V(A)=3$ と一致する。確率的遷移がある場合は各stateから出る遷移確率の和が1であることも同時に確認する。

</details>

## 問題9

後続への接続「modelが既知ならBellman operatorを反復するdynamic programming、未知ならsampleで期待値を置き換えるTD/Q-learning、policyを直接微分するpolicy gradientへ進む。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

modelが既知ならBellman operatorを反復するdynamic programming、未知ならsampleで期待値を置き換えるTD/Q-learning、policyを直接微分するpolicy gradientへ進む。

</details>

## 問題10

中心問題「逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s] $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $S_t$ | 時刻tの状態 |
| $A_t$ | 行動 |
| $R_{t+1}$ | 報酬 |
| $γ∈[0,1)$ | 割引率 |
| $π(a|s)$ | policy |


- $\mathcal S,\mathcal A$：state/action集合。
- $P(s'|s,a)$：遷移確率。
- $\pi(a|s)$：policy。
- $V^\pi(s)=E_\pi[G_t|S_t=s]$：policy value。
- $E_\pi$：policyとtransitionが作るtrajectory分布での期待値。

中心式：
$$
V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]
$$

導出：
1. return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。
2. 先頭1stepを分離して $G_t=R_{t+1}+γG_{t+1}$。
3. 状態sで条件付き期待値を取るとBellman expectation equation。

根拠：
MDPを $(\mathcal S,\mathcal A,P,R,\gamma)$ と定義する。Markov性は次stateとrewardの条件付き分布が現在state/actionだけで決まるという仮定。policy $\pi(a|s)$ を固定するとtrajectory分布が決まり、discounted return $G_t=\sum_{k=0}^\infty\gamma^kR_{t+k+1}$ を定義できる。

$G_t=R_{t+1}+\gamma G_{t+1}$ と1step分離し、$S_t=s$ の条件付き期待値を取ると $V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})|S_t=s]$。有限stateならこれはVについての連立一次方程式 $\mathbf V=\mathbf r_\pi+\gamma P_\pi\mathbf V$。

具体例：
**問題**：2状態A,B。A→Bでreward1、B→Bでreward2、どちらも確率1、$\gamma=0.5$。固定policyの $V(A),V(B)$ をBellman方程式から解け。

**解答**：$V(B)=2+0.5V(B)$ なので $0.5V(B)=2$、従って $V(B)=4$。Aでは次stateが確率1でBなので $V(A)=1+0.5V(B)=1+2=3$。両方を元のBellman式へ代入すると、B側は$4=2+2$、A側は$3=1+2$となり検算できる。

失敗条件：
reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。$\gamma=1$ のcontinuing taskではreturnが発散する場合があり、有限性の条件を確認する。

</details>
