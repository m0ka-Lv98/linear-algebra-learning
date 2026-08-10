# 接錐・法錐・制約資格条件：教科書

Course 06｜最適化

## このTopicの中心問題

KKTのstationarityは、なぜ「目的勾配と制約法線の釣り合い」になるのか。

## まず直感

最適点から一次的に動ける方向の集合がtangent cone。その全方向へ目的関数を減らせない条件は、負の勾配がtangent coneの極coneであるnormal coneに入ること。KKTはnormal coneを制約勾配で表現した形。

## 図で固定する

<img src="/visuals/course-06/opt-tangent-normal-cones-cq.png" alt="接錐・法錐・制約資格条件の図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $T_C(x*)$ | feasible set C の接錐 |
| $N_C(x*)$ | 法錐 |
| $LICQ/Slater$ | 代表的な制約資格条件 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
-\nabla f(x^*)\in N_C(x^*)
$$

## なぜこの式になるのか

1. feasible direction d では小さいt>0でx*+tdが許される。
2. 局所最小なら全feasible directionで ∇f(x*)^T d≥0。
3. これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

半空間 x≤1 の境界x=1ではfeasible directionはd≤0、normal coneは非負方向。目的勾配が左向きなら負勾配が右向きnormalに入る。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- CQが壊れると制約勾配だけでnormal coneを表せない。
- KKT pointとglobal optimumを非凸問題で同一視しない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Boyd & Vandenberghe; nonlinear optimization KKT

[演習へ](/exercises/opt-tangent-normal-cones-cq)　|　[スライドへ](/slides/opt-tangent-normal-cones-cq/)
