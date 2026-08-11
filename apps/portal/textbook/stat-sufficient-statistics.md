# 十分統計量

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-likelihood-maximum-likelihood`, `prob-conditional-probability-independence`

## 1. このTopicで解く問い

parameter推定に必要なdata情報を、損失なく低次元要約できる条件は何か。

十分統計量の計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $T(y)$ | statistic | compressed data |
| $g$ | theta-dependent factor | scalar |
| $h$ | theta-independent factor | scalar |

## 3. 中心となる定義・式

$$
p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)
$$

十分統計量では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$T(y)$ は statistic（compressed data）、$g$ は theta-dependent factor（scalar）、$h$ は theta-independent factor（scalar）。中心式 `p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。十分統計量ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. likelihood factorization theoremを使う。
2. parameter依存部分がdataを $T(\mathbf y)$ 経由でしか見ないなら、conditional distribution of data given Tはθに依存しない。
3. したがってTはθについてlikelihood情報を失わない。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

streaming estimation、data compression、exponential family理解の基礎。

十分統計量の中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` を、streaming estimation、data compression、exponential family理解の基礎。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `「情報を失わない」は任意目的に対してではなくparameter θの推定というmodel内の意味。model misspecification下では別。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

Poisson iid sample $X_i\sim Pois(\lambda)$ ではlikelihoodは $e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$ なので $\sum X_i$ が十分統計量。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![十分統計量の図](/visuals/engineering-math/stat-sufficient-statistics.png)

十分統計量の図では、中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` に現れる量のうち1つを変化させる。手計算例 `Poisson iid sample $X_i\sim Pois(\lambda)$ ではlikelihoodは $e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$ なので $\sum X_i$ が十分統計量。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

「情報を失わない」は任意目的に対してではなくparameter θの推定というmodel内の意味。model misspecification下では別。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

raw dataとsufficient statisticだけからMLEが同じになる例をコードで確かめる。

十分統計量の実装では、まず `raw dataとsufficient statisticだけからMLEが同じになる例をコードで確かめる。` を実行する。そのうえで中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

streaming estimation、data compression、exponential family理解の基礎。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-likelihood-maximum-likelihood`, `prob-conditional-probability-independence`。これらは単なる履修順ではない。`十分統計量` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `likelihood factorization theoremを使う。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` のどの項に使われているかを対応づける。

また、streaming estimation、data compression、exponential family理解の基礎。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`十分統計量` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `「情報を失わない」は任意目的に対してではなくparameter θの推定というmodel内の意味。model misspecification下では別。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `Poisson iid sample $X_i\sim Pois(\lambda)$ ではlikelihoodは $e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$ なので $\sum X_i$ が十分統計量。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `十分統計量` の中心式 `$p(\mathbf y\mid\theta)=g(T(\mathbf y),\theta)h(\mathbf y)` を、記号表なしで再定義できるか。
- `likelihood factorization theoremを使う。` から始めて、導出を途中式付きで再構成できるか。
- `Poisson iid sample $X_i\sim Pois(\lambda)$ ではlikelihoodは $e^{-n\lambda}\lambda^{\sum x_i}/\prod x_i!$ なので $\sum X_i$ が十分統計量。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `「情報を失わない」は任意目的に対してではなくparameter θの推定というmodel内の意味。model misspecification下では別。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `raw dataとsufficient statisticだけからMLEが同じになる例をコードで確かめる。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-sufficient-statistics)
