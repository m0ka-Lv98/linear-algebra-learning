# Optimal experimental design

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-experimental-design`, `stat-fisher-information-matrix`

## 1. このTopicで解く問い

Fisher情報行列をscalar objectiveへ変換してdesignを最適化する代表基準は何か。

Optimal experimental designは『何を保存し、何を変換するか』を分離すると理解しやすい。中心式の左辺を観測量、右辺を構成操作として読み、各因子の役割を一つずつ確認する。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf I(\xi)$ | information matrix | p\times p |
| $D-optimality$ | maximize information ellipsoid volume reduction | criterion |
| $A-optimality$ | minimize average variance | criterion |

## 3. 中心となる定義・式

$$
D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})
$$

Optimal experimental designでは、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\mathbf I(\xi)$ は information matrix（p\times p）、$D-optimality$ は maximize information ellipsoid volume reduction（criterion）、$A-optimality$ は minimize average variance（criterion）。中心式 `D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Optimal experimental designではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. parameter covariance lower boundを $\mathbf I^{-1}$ と結ぶ。
2. どのscalar summaryを重視するかでA/D/E-optimalityを定義する。
3. D-optではdetの積、A-optではvariance対角和という異なるtrade-offが生じる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

panel design、sensor geometry、sampling scheduleの数理最適化。

Optimal experimental designの中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` を、panel design、sensor geometry、sampling scheduleの数理最適化。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `criterionが違えばdesignも変わる。logdetが高くても特定parameterのvarianceが目的に合うとは限らない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

information eigenvaluesが(10,1)と(4,4)ならdetは10 vs16でD-optは後者、trace inverseは1.1 vs0.5でA-optも後者を好む。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Optimal experimental designの図](/visuals/engineering-math/stat-optimal-experimental-design.png)

Optimal experimental designの図では、中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` に現れる量のうち1つを変化させる。手計算例 `information eigenvaluesが(10,1)と(4,4)ならdetは10 vs16でD-optは後者、trace inverseは1.1 vs0.5でA-optも後者を好む。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

criterionが違えばdesignも変わる。logdetが高くても特定parameterのvarianceが目的に合うとは限らない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

candidate information matricesでA/D/E criteriaを一覧化し、選択がどう変わるか確認する。

Optimal experimental designの実装では、まず `candidate information matricesでA/D/E criteriaを一覧化し、選択がどう変わるか確認する。` を実行する。そのうえで中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

panel design、sensor geometry、sampling scheduleの数理最適化。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-experimental-design`, `stat-fisher-information-matrix`。これらは単なる履修順ではない。`Optimal experimental design` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `parameter covariance lower boundを $\mathbf I^{-1}$ と結ぶ。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` のどの項に使われているかを対応づける。

また、panel design、sensor geometry、sampling scheduleの数理最適化。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Optimal experimental design` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `criterionが違えばdesignも変わる。logdetが高くても特定parameterのvarianceが目的に合うとは限らない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `information eigenvaluesが(10,1)と(4,4)ならdetは10 vs16でD-optは後者、trace inverseは1.1 vs0.5でA-optも後者を好む。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Optimal experimental design` の中心式 `$D\text{-optimal}:\ \max_\xi\log\det\mathbf I(\xi),\quad A\text{-optimal}:\ \min_\xi\operatorname{tr}(\mathbf I(\xi)^{-1})` を、記号表なしで再定義できるか。
- `parameter covariance lower boundを $\mathbf I^{-1}$ と結ぶ。` から始めて、導出を途中式付きで再構成できるか。
- `information eigenvaluesが(10,1)と(4,4)ならdetは10 vs16でD-optは後者、trace inverseは1.1 vs0.5でA-optも後者を好む。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `criterionが違えばdesignも変わる。logdetが高くても特定parameterのvarianceが目的に合うとは限らない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `candidate information matricesでA/D/E criteriaを一覧化し、選択がどう変わるか確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-optimal-experimental-design)
