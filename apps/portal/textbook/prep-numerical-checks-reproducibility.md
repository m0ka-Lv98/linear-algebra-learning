# 数値検算と再現性：教科書

Course 00｜学習準備

## このTopicの中心問題

「コードが動いた」から「計算が正しい」へ進むため、何を記録・検算するか。

## まず直感

再現性はseedだけではない。入力、version、dtype、tolerance、algorithm、environmentを記録し、小さい既知例・極端例・invariantで検算する。

## 図で固定する

<img src="/visuals/course-00/prep-numerical-checks-reproducibility.png" alt="数値検算と再現性の図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $ε_abs$ | absolute tolerance |
| $ε_rel$ | relative tolerance |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
|x-\hat x|\le \varepsilon_{abs}+\varepsilon_{rel}|x|
$$

## なぜこの式になるのか

1. exact equalityが不適切な浮動小数点比較を避ける。
2. scaleが小さい領域はabsolute tolerance、大きい領域はrelative toleranceで扱う。
3. expected invariantやreference solutionと併用する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

0.1+0.2を0.3と==比較するよりnp.isclose相当の許容誤差比較を使う。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- seed固定だけでhardware/library差まで完全再現できると思わない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- numerical reproducibility basics

[演習へ](/exercises/prep-numerical-checks-reproducibility)　|　[スライドへ](/slides/prep-numerical-checks-reproducibility/)
