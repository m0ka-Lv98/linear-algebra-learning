# Monte Carlo・TD・Q-learning：教科書

Course 08｜機械学習

## このTopicの中心問題

遷移modelが未知でも、経験sampleだけから価値関数をどう学ぶか。

## まず直感

Monte Carloはepisode完了後の実returnをtargetにする。TDは1step先の現在推定値をbootstrapping targetにする。Q-learningはoff-policy TD control。

## 図で固定する

<img src="/visuals/course-08/ml-monte-carlo-td-q-learning.png" alt="Monte Carlo・TD・Q-learningの図解" style="max-height: 460px; display:block; margin:0 auto;" />

### 動きで確認する

<img src="/visuals/course-08/ml-monte-carlo-td-q-learning.gif" alt="ml-monte-carlo-td-q-learning animation" style="max-height: 420px; display:block; margin:0 auto;" />


図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $α$ | learning rate |
| $δ_t$ | TD error |
| $Q(s,a)$ | action value |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]
$$

## なぜこの式になるのか

1. Bellman optimality targetを未知期待値のsampleで近似する。
2. 現在Qとsample targetとの差をTD errorとする。
3. stochastic approximationとしてQをTD error方向へ更新する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

terminal直前の成功報酬がまず直前state-actionへ入り、episodeを重ねると前の状態へ伝播する。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- Q-learningのmax targetとSARSAのon-policy next actionを混同しない。
- function approximation + off-policy + bootstrappingの不安定性に注意する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Stanford CS229 Q-learning

[演習へ](/exercises/ml-monte-carlo-td-q-learning)　|　[スライドへ](/slides/ml-monte-carlo-td-q-learning/)
