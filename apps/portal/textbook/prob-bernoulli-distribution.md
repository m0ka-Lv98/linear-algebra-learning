# Bernoulli分布

**分野:** 確率分布
**Prerequisites:** `prob-random-variables-cdf-pmf-pdf`

## 1. このTopicで解く問い

成功/失敗の1回試行を、最小の離散確率モデルとしてどう表すか。

Bernoulli分布を工学で使うときは、理想式の成立条件と測定系の近似条件を分ける必要がある。理想式が正しくても、noise modelやsampling条件が違えば推定解釈は変わる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $X$ | 0/1 random variable | scalar |
| $p$ | success probability | 0\le p\le1 |

## 3. 中心となる定義・式

$$
P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)
$$

Bernoulli分布はsupport・normalization・momentの3点を同時に確認すると理解しやすい。$X$ は 0/1 random variable（scalar）、$p$ は success probability（0\le p\le1）。中心式 `P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` が非負で全support上の総和/積分が1になること、期待値やvarianceがsample simulationと一致することを別々に確認する。分布名だけを覚えず、どの生成機構がこの形を生むかまで結び付ける。

中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Bernoulli分布ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $P(X=1)=p$、$P(X=0)=1-p$ を1つの式へまとめる。
2. $E[X]=0(1-p)+1p=p$。
3. $X^2=X$ なので $\operatorname{Var}(X)=E[X]-E[X]^2=p(1-p)$。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

故障有無、クリック、検出/非検出、classification labelの基本model。

Bernoulli分布の中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` を、故障有無、クリック、検出/非検出、classification labelの基本model。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `試行間依存や個体ごとのp変動が強い場合、単一Bernoulli parameterではheterogeneityを表せない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$p=0.3$ なら $P(X=1)=0.3$、平均0.3、分散0.21。1000回sampleすれば標本平均はおよそ0.3へ近づく。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Bernoulli分布の図](/visuals/engineering-math/prob-bernoulli-distribution.png)

Bernoulli分布の図では、中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` に現れる量のうち1つを変化させる。手計算例 `$p=0.3$ なら $P(X=1)=0.3$、平均0.3、分散0.21。1000回sampleすれば標本平均はおよそ0.3へ近づく。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

試行間依存や個体ごとのp変動が強い場合、単一Bernoulli parameterではheterogeneityを表せない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`rng.binomial(1,p,size=N)` の平均・分散を理論値と比較する。

Bernoulli分布の実装では、まず ``rng.binomial(1,p,size=N)` の平均・分散を理論値と比較する。` を実行する。そのうえで中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

故障有無、クリック、検出/非検出、classification labelの基本model。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `prob-random-variables-cdf-pmf-pdf`。これらは単なる履修順ではない。`Bernoulli分布` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$P(X=1)=p$、$P(X=0)=1-p$ を1つの式へまとめる。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` のどの項に使われているかを対応づける。

また、故障有無、クリック、検出/非検出、classification labelの基本model。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Bernoulli分布` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `試行間依存や個体ごとのp変動が強い場合、単一Bernoulli parameterではheterogeneityを表せない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$p=0.3$ なら $P(X=1)=0.3$、平均0.3、分散0.21。1000回sampleすれば標本平均はおよそ0.3へ近づく。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Bernoulli分布` の中心式 `$P(X=x)=p^x(1-p)^{1-x},\quad x\in\{0,1\},\quad E[X]=p,\ \operatorname{Var}(X)=p(1-p)` を、記号表なしで再定義できるか。
- `$P(X=1)=p$、$P(X=0)=1-p$ を1つの式へまとめる。` から始めて、導出を途中式付きで再構成できるか。
- `$p=0.3$ なら $P(X=1)=0.3$、平均0.3、分散0.21。1000回sampleすれば標本平均はおよそ0.3へ近づく。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `試行間依存や個体ごとのp変動が強い場合、単一Bernoulli parameterではheterogeneityを表せない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``rng.binomial(1,p,size=N)` の平均・分散を理論値と比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/prob-bernoulli-distribution)
