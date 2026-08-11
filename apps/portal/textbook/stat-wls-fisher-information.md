# WLSのFisher情報

**分野:** Fisher情報・統計推定
**Prerequisites:** `mat-wls-inverse-variance`, `stat-fisher-information-matrix`, `stat-estimator-covariance`

## 1. このTopicで解く問い

detectorごと・sampleごとにnoise varianceが異なるとき、情報行列をどう重み付けするか。

WLSのFisher情報の理解確認には、中心式を小さな数値例へ落とし、次に条件を一つだけ破った反例を見る方法が有効である。公式の適用範囲まで含めて理解できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf X$ | design/signature matrix | m\times p |
| $\mathbf\Sigma$ | noise covariance | m\times m |
| $\mathbf W=\mathbf\Sigma^{-1}$ | precision matrix | m\times m |

## 3. 中心となる定義・式

$$
\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X
$$

WLSのFisher情報では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\mathbf X$ は design/signature matrix（m\times p）、$\mathbf\Sigma$ は noise covariance（m\times m）、$\mathbf W=\mathbf\Sigma^{-1}$ は precision matrix（m\times m）。中心式 `\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。WLSのFisher情報ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. Gaussian model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\mathbf\Sigma)$ のlog-likelihoodを書く。
2. $\boldsymbol\beta$ で二回微分するとHessianは $-\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X$。
3. negative expectationを取っても同じなのでWLS information matrixになる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

Poisson-like detector noiseを考慮したspectral unmixing、heteroscedastic regression、sensor fusion。

WLSのFisher情報の中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` を、Poisson-like detector noiseを考慮したspectral unmixing、heteroscedastic regression、sensor fusion。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `weightを観測値から推定してparameter依存する場合、固定Wの単純式だけではcovarianceを完全に表さない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf W=\operatorname{diag}(1,0.25)$ なら第2measurementはvarianceが4倍で情報寄与が1/4になる。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![WLSのFisher情報の図](/visuals/engineering-math/stat-wls-fisher-information.png)

WLSのFisher情報の図では、中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` に現れる量のうち1つを変化させる。手計算例 `$\mathbf W=\operatorname{diag}(1,0.25)$ なら第2measurementはvarianceが4倍で情報寄与が1/4になる。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

weightを観測値から推定してparameter依存する場合、固定Wの単純式だけではcovarianceを完全に表さない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`X.T @ W @ X` の固有値をcell/sampleごとに比較し、weak information方向を調べる。

WLSのFisher情報の実装では、まず ``X.T @ W @ X` の固有値をcell/sampleごとに比較し、weak information方向を調べる。` を実行する。そのうえで中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

Poisson-like detector noiseを考慮したspectral unmixing、heteroscedastic regression、sensor fusion。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-wls-inverse-variance`, `stat-fisher-information-matrix`, `stat-estimator-covariance`。これらは単なる履修順ではない。`WLSのFisher情報` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `Gaussian model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\mathbf\Sigma)$ のlog-likelihoodを書く。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` のどの項に使われているかを対応づける。

また、Poisson-like detector noiseを考慮したspectral unmixing、heteroscedastic regression、sensor fusion。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`WLSのFisher情報` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `weightを観測値から推定してparameter依存する場合、固定Wの単純式だけではcovarianceを完全に表さない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf W=\operatorname{diag}(1,0.25)$ なら第2measurementはvarianceが4倍で情報寄与が1/4になる。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `WLSのFisher情報` の中心式 `$\mathbf I(\boldsymbol\beta)=\mathbf X^{\mathsf T}\mathbf\Sigma^{-1}\mathbf X=\mathbf X^{\mathsf T}\mathbf W\mathbf X` を、記号表なしで再定義できるか。
- `Gaussian model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\mathbf\Sigma)$ のlog-likelihoodを書く。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf W=\operatorname{diag}(1,0.25)$ なら第2measurementはvarianceが4倍で情報寄与が1/4になる。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `weightを観測値から推定してparameter依存する場合、固定Wの単純式だけではcovarianceを完全に表さない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``X.T @ W @ X` の固有値をcell/sampleごとに比較し、weak information方向を調べる。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-wls-fisher-information)
