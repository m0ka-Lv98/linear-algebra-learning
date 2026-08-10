# activation関数とloss：教科書

Course 09｜深層学習

## このTopicの中心問題

activationとlossを「慣例」ではなく勾配伝播と確率modelからどう選ぶか。

## まず直感

activationは線形層の合成に非線形性を入れる。lossは観測modelのnegative log-likelihoodとして導ける場合が多く、出力activationと組で数値安定性・gradientを読む。

## 図で固定する

<img src="/visuals/course-09/dl-activation-loss-functions.png" alt="activation関数とlossの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $z$ | pre-activation/logit |
| $a=φ(z)$ | activation output |
| $L$ | loss |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\operatorname{ReLU}(z)=\max(0,z),\qquad \frac{\partial L_{BCE}}{\partial z}=\sigma(z)-y
$$

## なぜこの式になるのか

1. ReLUはz>0でderivative1、z<0で0。
2. binary classificationでは Bernoulli NLL がBCE。
3. $p=σ(z)$ とchain ruleを使うと $dL/dz=p-y$ まで簡約される。
4. BCEWithLogits等はsigmoid+logをまとめてlog-sum-exp形で安定計算する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

z=0,y=1ならp=0.5、gradient=-0.5。gradient descentでzが増え正例確率を上げる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- classificationにMSEが数学的に禁止という意味ではない。
- sigmoid/tanh飽和域とReLU dead unitの失敗modeを区別する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- deep learning standard likelihood losses

[演習へ](/exercises/dl-activation-loss-functions)　|　[スライドへ](/slides/dl-activation-loss-functions/)
