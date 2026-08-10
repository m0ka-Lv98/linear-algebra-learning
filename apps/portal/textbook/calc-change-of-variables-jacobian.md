# 変数変換とJacobian determinant：教科書

Course 01｜微積分

## このTopicの中心問題

座標変換で積分するとき、なぜJacobian determinantの絶対値を掛けるのか。

## まず直感

Jacobian matrixは局所的な線形変換。小さな長方形は平行四辺形へ移り、その面積倍率が determinant の絶対値になる。

## 図で固定する

<img src="/visuals/course-01/calc-change-of-variables-jacobian.png" alt="変数変換とJacobian determinantの図解" style="max-height: 460px; display:block; margin:0 auto;" />

### 動きで確認する

<img src="/visuals/course-01/calc-change-of-variables-jacobian.gif" alt="calc-change-of-variables-jacobian animation" style="max-height: 420px; display:block; margin:0 auto;" />


図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $T(u,v)=(x,y)$ | 座標変換 |
| $J_T$ | TのJacobian matrix |
| $det J_T$ | 局所面積の符号付き倍率 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
dx\,dy=|\det J_T(u,v)|\,du\,dv
$$

## なぜこの式になるのか

1. 微小変位は $d\mathbf{x}\approx J_T d\mathbf{u}$。
2. 2本の微小基底ベクトルが作る平行四辺形の面積倍率は |det J_T|。
3. Riemann和の各セル面積を変換し、極限を取る。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

極座標 x=r cosθ, y=r sinθ では det J=r。よって dA=r dr dθ。rを忘れると面積が過小評価される。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- detではなく|det|を面積倍率に使う。
- Jacobian matrixそのものとdeterminantを混同しない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- MIT 18.02SC Change of Variables

[演習へ](/exercises/calc-change-of-variables-jacobian)　|　[スライドへ](/slides/calc-change-of-variables-jacobian/)
