# Mirror descentとBregman divergence：教科書

Course 06｜最適化

## このTopicの中心問題

Euclidean距離が自然でない確率simplexなどで、勾配法のgeometryをどう変えるか。

## まず直感

mirror descentは、現在点近傍をEuclidean二乗距離で罰する代わりに、strictly convexなmirror mapが作るBregman divergenceを使う。

## 図で固定する

<img src="/visuals/course-06/opt-mirror-descent-bregman.png" alt="Mirror descentとBregman divergenceの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $ψ$ | mirror map |
| $D_ψ(x,y)$ | Bregman divergence |
| $η$ | step size |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
x_{t+1}=\arg\min_{x\in C}\{\eta\nabla f(x_t)^Tx+D_\psi(x,x_t)\}
$$

## なぜこの式になるのか

1. 勾配で目的を一次近似する。
2. 動きすぎをDψで罰する。
3. ψ=||x||²/2ならDψ=||x-y||²/2となりprojected gradientへ戻る。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

確率simplexでnegative entropyをψに選ぶとmultiplicative/exponentiated updateが得られる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- Bregman divergenceは一般に対称でなくmetricでもない。
- mirror mapのdomainと制約集合の関係を確認する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- mirror descent classical optimization

[演習へ](/exercises/opt-mirror-descent-bregman)　|　[スライドへ](/slides/opt-mirror-descent-bregman/)
