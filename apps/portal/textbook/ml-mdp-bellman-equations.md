# MDPとBellman方程式：教科書

Course 08｜機械学習

## このTopicで解く問題

逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。

## なぜこの概念が必要か

MDPは現在状態が与えられれば未来の遷移分布が過去全体に依存しないMarkov性を仮定する。価値関数は将来報酬の割引和の期待値。

## 図の各要素は何を表しているか

<img src="/visuals/course-08/ml-mdp-bellman-equations.png" alt="MDPとBellman方程式の図解" style="max-height: 480px; display:block; margin:0 auto;" />

各円がstate $s$、stateから出る矢印の種類がaction $a$。矢印には遷移確率 $P(s'|s,a)$ と即時reward $r$ が付く。policy $\pi(a|s)$ はstateでどのactionを選ぶ確率。Bellman式は「今の1step reward」と「次stateの価値」を矢印ごとの確率で平均して現在stateの価値へ戻す。

## 記号・型・定義域

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

## 中心となる式

$$
V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]
$$

## 中心式を前提から導く

1. return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。
2. 先頭1stepを分離して $G_t=R_{t+1}+γG_{t+1}$。
3. 状態sで条件付き期待値を取るとBellman expectation equation。

## なぜその変形をしてよいのか

MDPを $(\mathcal S,\mathcal A,P,R,\gamma)$ と定義する。Markov性は次stateとrewardの条件付き分布が現在state/actionだけで決まるという仮定。policy $\pi(a|s)$ を固定するとtrajectory分布が決まり、discounted return $G_t=\sum_{k=0}^\infty\gamma^kR_{t+k+1}$ を定義できる。

$G_t=R_{t+1}+\gamma G_{t+1}$ と1step分離し、$S_t=s$ の条件付き期待値を取ると $V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})|S_t=s]$。有限stateならこれはVについての連立一次方程式 $\mathbf V=\mathbf r_\pi+\gamma P_\pi\mathbf V$。

## Bellman方程式を有限stateの行列で見る

policy $\pi$ を固定し、stateを $s_1,\ldots,s_m$ と並べる。$\mathbf v_\pi\in\mathbb R^m$ をvalue vector、$\mathbf r_\pi$ を各stateでの期待1-step reward、$P_\pi\in\mathbb R^{m\times m}$ をpolicy下のtransition matrixとする。するとBellman equationは

$$
\mathbf v_\pi=\mathbf r_\pi+\gamma P_\pi\mathbf v_\pi.
$$

移項して

$$
(I-\gamma P_\pi)\mathbf v_\pi=\mathbf r_\pi.
$$

$0\le\gamma<1$ ならstochastic matrix $P_\pi$ の固有値の絶対値は高々1なので $I-\gamma P_\pi$ は可逆で、valueは一意に定まる。

## 確率的な2状態例

Aでは50%でAへ戻りreward0、50%でBへ移りreward2。Bは必ずBへ戻りreward1、$\gamma=0.5$ とする。

$$
V(B)=1+0.5V(B)=2.
$$

Aでは

$$
V(A)=0.5[0+0.5V(A)]+0.5[2+0.5V(B)].
$$

$V(B)=2$ を代入して $V(A)=0.25V(A)+1.5$、したがって $V(A)=2$。rewardの期待と次state valueの期待を**同じtransition probabilityで平均する**点が重要である。

## 例題1：具体的な数値・構造で解く

**問題**：2状態A,B。A→Bでreward1、B→Bでreward2、どちらも確率1、$\gamma=0.5$。固定policyの $V(A),V(B)$ をBellman方程式から解け。

**解答**：$V(B)=2+0.5V(B)$ なので $V(B)=4$。次に $V(A)=1+0.5V(B)=3$。

## 例題2：別の条件で確認する

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

## 結果の検算

求めた各state valueをBellman方程式の右辺へ戻す。例題1では

$$
2+0.5\times4=4,\qquad 1+0.5\times4=3
$$

となり、$V(B)=4$, $V(A)=3$ と一致する。確率的遷移がある場合は各stateから出る遷移確率の和が1であることも同時に確認する。

## 条件を外すと何が壊れるか

reward $R_{t+1}$ は1stepの量、value $V(s)$ は将来returnの期待値で別物。$\gamma=1$ のcontinuing taskではreturnが発散する場合があり、有限性の条件を確認する。

## よくある誤り

- rewardとvalueを同じ量と思わない。
- discount γ の位置を1stepずらさない。

## 次のTopic・応用への接続

modelが既知ならBellman operatorを反復するdynamic programming、未知ならsampleで期待値を置き換えるTD/Q-learning、policyを直接微分するpolicy gradientへ進む。

## 参考

- Stanford CS229 reinforcement learning

[演習へ](/exercises/ml-mdp-bellman-equations)　|　[スライドへ](/slides/ml-mdp-bellman-equations/)
