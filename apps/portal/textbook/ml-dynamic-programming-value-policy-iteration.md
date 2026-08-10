# value iterationとpolicy iteration：教科書

Course 08｜機械学習

## このTopicの中心問題

modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。

## まず直感

最適Bellman operatorは「1step行動を選び、その後も最適に行動する」backup。γ<1ならsup normでcontractionなので反復が一意の固定点V*へ収束する。

## 図で固定する

<img src="/visuals/course-08/ml-dynamic-programming-value-policy-iteration.png" alt="value iterationとpolicy iterationの図解" style="max-height: 460px; display:block; margin:0 auto;" />

### 動きで確認する

<img src="/visuals/course-08/ml-dynamic-programming-value-policy-iteration.gif" alt="ml-dynamic-programming-value-policy-iteration animation" style="max-height: 420px; display:block; margin:0 auto;" />


図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $T*$ | Bellman optimality operator |
| $V_k$ | k回目のvalue estimate |
| $Q*$ | 最適action value |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]
$$

## なぜこの式になるのか

1. Bellman optimality equationを固定点方程式 V*=T*V* と読む。
2. T*はγ-contractionなので Banach fixed-point theoremにより反復収束。
3. V*から各状態でargmax actionを選んでgreedy optimal policyを得る。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

小さなgrid worldでterminalから価値が後方へ伝播する様子を反復で確認する。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- policy evaluationとpolicy improvementを混同しない。
- γ=1のcontinuing taskで同じcontraction議論を無条件に使わない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Stanford CS229 MDP/value iteration

[演習へ](/exercises/ml-dynamic-programming-value-policy-iteration)　|　[スライドへ](/slides/ml-dynamic-programming-value-policy-iteration/)
