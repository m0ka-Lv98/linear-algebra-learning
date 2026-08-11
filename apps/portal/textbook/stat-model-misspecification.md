# Model misspecification

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-likelihood-maximum-likelihood`, `stat-estimator-covariance`

## 1. このTopicで解く問い

真のdata-generating processが仮定model外にあるとき、推定誤差をvarianceだけでなくbiasとしてどう分離するか。

Model misspecificationでは、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\boldsymbol\delta$ | systematic model mismatch | m |
| $\boldsymbol\varepsilon$ | zero-mean random noise | m |

## 3. 中心となる定義・式

$$
\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon
$$

Model misspecificationでは、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\boldsymbol\delta$ は systematic model mismatch（m）、$\boldsymbol\varepsilon$ は zero-mean random noise（m）。中心式 `\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Model misspecificationではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. observationを $\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\delta+\boldsymbol\varepsilon$ と分解する。
2. WLS solutionへ代入してlinear operatorを各項へ分配する。
3. $\delta$ 項は系統bias、$\varepsilon$ 項はstochastic spreadとして別に解析できる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

AF basis不足、sensor calibration error、omitted variable biasの理解に重要。

Model misspecificationの中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` を、AF basis不足、sensor calibration error、omitted variable biasの理解に重要。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `residualが小さくてもmodel errorがparameter spaceへ吸収される場合がある。good fitとunbiased estimationは同義ではない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

1 detectorだけ未モデル化offsetが1あると、そのoffsetがpseudoinverse/WLS operatorを通じ複数parameterへ漏れる。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Model misspecificationの図](/visuals/engineering-math/stat-model-misspecification.png)

Model misspecificationの図では、中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` に現れる量のうち1つを変化させる。手計算例 `1 detectorだけ未モデル化offsetが1あると、そのoffsetがpseudoinverse/WLS operatorを通じ複数parameterへ漏れる。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

residualが小さくてもmodel errorがparameter spaceへ吸収される場合がある。good fitとunbiased estimationは同義ではない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

既知のδをsimulationへ加え、推定mean shiftとnoise-only covarianceを別々に測定する。

Model misspecificationの実装では、まず `既知のδをsimulationへ加え、推定mean shiftとnoise-only covarianceを別々に測定する。` を実行する。そのうえで中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

AF basis不足、sensor calibration error、omitted variable biasの理解に重要。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-likelihood-maximum-likelihood`, `stat-estimator-covariance`。これらは単なる履修順ではない。`Model misspecification` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `observationを $\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\delta+\boldsymbol\varepsilon$ と分解する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` のどの項に使われているかを対応づける。

また、AF basis不足、sensor calibration error、omitted variable biasの理解に重要。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Model misspecification` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `residualが小さくてもmodel errorがparameter spaceへ吸収される場合がある。good fitとunbiased estimationは同義ではない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `1 detectorだけ未モデル化offsetが1あると、そのoffsetがpseudoinverse/WLS operatorを通じ複数parameterへ漏れる。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Model misspecification` の中心式 `$\hat{\boldsymbol\beta}-\boldsymbol\beta=(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\delta+(\mathbf X^{\mathsf T}\mathbf W\mathbf X)^{-1}\mathbf X^{\mathsf T}\mathbf W\boldsymbol\varepsilon` を、記号表なしで再定義できるか。
- `observationを $\mathbf y=\mathbf X\boldsymbol\beta+\boldsymbol\delta+\boldsymbol\varepsilon$ と分解する。` から始めて、導出を途中式付きで再構成できるか。
- `1 detectorだけ未モデル化offsetが1あると、そのoffsetがpseudoinverse/WLS operatorを通じ複数parameterへ漏れる。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `residualが小さくてもmodel errorがparameter spaceへ吸収される場合がある。good fitとunbiased estimationは同義ではない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `既知のδをsimulationへ加え、推定mean shiftとnoise-only covarianceを別々に測定する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-model-misspecification)
