# Monte Carlo・TD・Q-learning：教科書

Course 08｜機械学習

## このTopicで解く問題

遷移modelが未知でも、経験sampleだけから価値関数をどう学ぶか。

## なぜこの概念が必要か

Monte Carloはepisode完了後の実returnをtargetにする。TDは1step先の現在推定値をbootstrapping targetにする。Q-learningはoff-policy TD control。

## 図の各要素は何を表しているか

<img src="/visuals/course-08/ml-monte-carlo-td-q-learning.png" alt="Monte Carlo・TD・Q-learningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がupdate回数、縦軸がQ推定値。破線がBellman targetに対応する真の値で、sampleに基づくupdateが揺れながら近づく。terminal報酬が直前state-actionから前方へ徐々に伝わるというbootstrappingの特徴を表す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $α$ | learning rate |
| $δ_t$ | TD error |
| $Q(s,a)$ | action value |


- $Q(s,a)$：state-action value推定。
- $\alpha$：learning rate。
- $R_{t+1}+\gamma\max_aQ(S_{t+1},a)$：1step TD target。

## 中心となる式

$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]
$$

## 中心式を前提から導く

1. Bellman optimality targetを未知期待値のsampleで近似する。
2. 現在Qとsample targetとの差をTD errorとする。
3. stochastic approximationとしてQをTD error方向へ更新する。

## なぜその変形をしてよいのか

Monte Carloはepisode終了後に実現return $G_t$ をtargetにするのでunbiasedに近いがvarianceが大きく、途中更新できない。TD(0)は $R_{t+1}+\gamma V(S_{t+1})$ をtargetにして現在推定を一部使うbootstrap。

Q-learningではoptimal Bellman target $Y_t=R_{t+1}+\gamma\max_aQ(S_{t+1},a)$ をsample 1本で作り、$Q\leftarrow Q+\alpha(Y-Q)$。behavior policyが探索を続け適切なstep size条件などが満たされるtabular settingでoptimal Qへ収束する。

## MCとTDのtargetを同じ式で比較する

state valueを更新するとき、Monte Carloはepisode末まで観測した

$$
G_t=R_{t+1}+\gamma R_{t+2}+\cdots
$$

をtargetにする。TD(0)は

$$
Y_t^{TD}=R_{t+1}+\gamma V(S_{t+1})
$$

をtargetにする。TDは現在推定値 $V(S_{t+1})$ を使うためbiasを持ち得るが、episode完了を待たずに更新でき、しばしばvarianceが小さい。

Q-learningはcontrolへ拡張して

$$
\delta_t=R_{t+1}+\gamma\max_{a'}Q(S_{t+1},a')-Q(S_t,A_t),
$$

$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha_t\delta_t.
$$

behavior policyが選んだactionに関係なくtarget側ではgreedy actionを使うためoff-policyである。

## 数値updateを完全に追う

$Q(s,a)=2$, $r=1$, $\gamma=0.9$, 次stateのQが $[3,4]$, $\alpha=0.5$ ならtargetは $1+0.9\times4=4.6$。TD errorは $4.6-2=2.6$、新しいQは $2+0.5\times2.6=3.3$。更新後値をtargetと取り違えない。

## 例題1：具体的な数値・構造で解く

**問題**：$Q(s,a)=1.5$, reward2, $\gamma=0.8$, 次stateのmaxQ=3, $\alpha=0.25$。Q-learning 1step後のQを求めよ。

**解答**：target=$2+0.8\times3=4.4$。TD error=4.4-1.5=2.9。update=$1.5+0.25\times2.9=2.225$。

## 例題2：別の条件で確認する

$Q(s,a)=2$, reward=1, $\gamma=0.9$, 次stateのmaxQ=4, $\alpha=0.5$。target=4.6、TD error=2.6、新Q=2+0.5*2.6=3.3。

## 結果の検算

TD/Q-learningではtargetを先に固定する。Q-learningなら

$$
y=r+\gamma\max_{a'}Q(s',a')
$$

を計算し、TD error $\delta=y-Q(s,a)$ の符号を確認する。$\alpha>0$ なら更新 $Q\leftarrow Q+\alpha\delta$ はtarget方向へ動かなければならない。terminal stateではbootstrap項を0にする。

## 条件を外すと何が壊れるか

Q-learningがoff-policyだから探索不要という意味ではない。未訪問actionの価値は学べない。function approximationとbootstrappingとoff-policyを組み合わせると不安定化する「deadly triad」にも注意。

## よくある誤り

- Q-learningのmax targetとSARSAのon-policy next actionを混同しない。
- function approximation + off-policy + bootstrappingの不安定性に注意する。

## 次のTopic・応用への接続

Deep Q-NetworkはQ tableをneural networkへ置き換え、replay bufferとtarget networkで不安定性を緩和する。

## 参考

- Stanford CS229 Q-learning

[演習へ](/exercises/ml-monte-carlo-td-q-learning)　|　[スライドへ](/slides/ml-monte-carlo-td-q-learning/)
