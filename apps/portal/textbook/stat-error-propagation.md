# 誤差伝播

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-delta-method`, `prob-covariance-correlation`

## 1. このTopicで解く問い

入力measurementのcovarianceが、derived quantityへどう伝播するか。

誤差伝播では、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf\Sigma_x$ | input covariance | n\times n |
| $\mathbf J_f$ | sensitivity Jacobian | m\times n |
| $\mathbf\Sigma_y$ | output covariance | m\times m |

## 3. 中心となる定義・式

$$
\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}
$$

誤差伝播では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\mathbf\Sigma_x$ は input covariance（n\times n）、$\mathbf J_f$ は sensitivity Jacobian（m\times n）、$\mathbf\Sigma_y$ は output covariance（m\times m）。中心式 `\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。誤差伝播ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $f(\mathbf x)$ をmean付近でlinearizeする。
2. $d\mathbf y\approx\mathbf J_fd\mathbf x$。
3. covariance of linear transformの公式を適用する。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

sensor fusion、calibration、unmixing後spreadの一次評価。

誤差伝播の中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` を、sensor fusion、calibration、unmixing後spreadの一次評価。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `input correlationを無視するとcross termを失う。大きなuncertaintyではlinearization自体も不十分。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$y=x_1+2x_2$、independent variances 1と4なら $\operatorname{Var}(y)=1^2\cdot1+2^2\cdot4=17$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![誤差伝播の図](/visuals/engineering-math/stat-error-propagation.png)

誤差伝播の図では、中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` に現れる量のうち1つを変化させる。手計算例 `$y=x_1+2x_2$、independent variances 1と4なら $\operatorname{Var}(y)=1^2\cdot1+2^2\cdot4=17$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

input correlationを無視するとcross termを失う。大きなuncertaintyではlinearization自体も不十分。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

correlated Gaussian inputsをMonte Carloで流し、Jacobian covariance近似と比較する。

誤差伝播の実装では、まず `correlated Gaussian inputsをMonte Carloで流し、Jacobian covariance近似と比較する。` を実行する。そのうえで中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

sensor fusion、calibration、unmixing後spreadの一次評価。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-delta-method`, `prob-covariance-correlation`。これらは単なる履修順ではない。`誤差伝播` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$f(\mathbf x)$ をmean付近でlinearizeする。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` のどの項に使われているかを対応づける。

また、sensor fusion、calibration、unmixing後spreadの一次評価。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`誤差伝播` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `input correlationを無視するとcross termを失う。大きなuncertaintyではlinearization自体も不十分。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$y=x_1+2x_2$、independent variances 1と4なら $\operatorname{Var}(y)=1^2\cdot1+2^2\cdot4=17$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `誤差伝播` の中心式 `$\mathbf\Sigma_y\approx\mathbf J_f\mathbf\Sigma_x\mathbf J_f^{\mathsf T}` を、記号表なしで再定義できるか。
- `$f(\mathbf x)$ をmean付近でlinearizeする。` から始めて、導出を途中式付きで再構成できるか。
- `$y=x_1+2x_2$、independent variances 1と4なら $\operatorname{Var}(y)=1^2\cdot1+2^2\cdot4=17$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `input correlationを無視するとcross termを失う。大きなuncertaintyではlinearization自体も不十分。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `correlated Gaussian inputsをMonte Carloで流し、Jacobian covariance近似と比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-error-propagation)
