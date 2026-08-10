# 不等式制約・相補性・KKT：教科書

Course 06｜最適化

## このTopicの中心問題

KKT条件を公式として暗記せず、feasible directionとnormal coneからどう導くか。

## まず直感

最適点では実行可能な一次方向へ目的を下げられない。したがって負の目的勾配はfeasible tangent coneのpolarであるnormal coneに入る。CQの下でnormal coneをactive constraint gradientの非負結合として表すとKKTになる。

## 図で固定する

<img src="/visuals/course-06/opt-inequality-constraints-kkt.png" alt="不等式制約・相補性・KKTの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $g_i(x)≤0$ | 不等式制約 |
| $λ_i≥0$ | Lagrange multiplier |
| $T_C,N_C$ | 接錐・法錐 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)=0,\quad \lambda_i g_i(x^*)=0
$$

## なぜこの式になるのか

1. 局所最小では全feasible direction dに対し∇f^T d≥0。
2. よって-∇f∈N_C。
3. LICQ/Slater等の適切な条件下でactive constraintのgradientがnormal coneを生成する。
4. inactive constraintはg_i<0なので局所境界を作らずλ_i=0。activeではg_i=0でλ_i≥0が可能。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

min (x-2)² s.t. x≤1。x*=1、f′=-2、g′=1なので -2+λ=0→λ=2。x≤3ならx*=2はinactiveでλ=0。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- CQ failureではKKTが必要条件にならない場合がある。
- 非凸ではKKTだけでglobal optimalityを保証しない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Boyd & Vandenberghe Convex Optimization

[演習へ](/exercises/opt-inequality-constraints-kkt)　|　[スライドへ](/slides/opt-inequality-constraints-kkt/)
