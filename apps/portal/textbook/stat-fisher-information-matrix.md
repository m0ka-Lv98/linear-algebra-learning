# Fisher情報行列

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-likelihood-maximum-likelihood`, `prob-multivariate-normal-distribution`, `calc-gradient-directional-derivative`, `calc-hessian-second-order`

## 1. このTopicで解く問い

複数parameterを同時推定するとき、dataが各方向について持つ局所情報量をどう行列化するか。

Fisher情報行列の計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\boldsymbol\theta$ | parameter vector | p |
| $\ell$ | log-likelihood | scalar |
| $\mathbf s=\nabla_\theta\ell$ | score | p |
| $\mathbf I$ | Fisher information matrix | p\times p |

## 3. 中心となる定義・式

$$
\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]
$$

Fisher情報行列では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\boldsymbol\theta$ は parameter vector（p）、$\ell$ は log-likelihood（scalar）、$\mathbf s=\nabla_\theta\ell$ は score（p）、$\mathbf I$ は Fisher information matrix（p\times p）。中心式 `\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Fisher情報行列ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. log-likelihoodの一次微分をscore vector $\mathbf s$ と定義する。
2. regularity condition下で $E[\mathbf s]=0$ なので、そのsecond momentはcovarianceになる。
3. 微分と積分の交換を使うとscore outer productの期待値とnegative expected Hessianが一致する。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

experimental design、Hotspot Matrix、inverse problem、MLE uncertaintyを同じ行列構造で結ぶ。

Fisher情報行列の中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` を、experimental design、Hotspot Matrix、inverse problem、MLE uncertaintyを同じ行列構造で結ぶ。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `parameterが非識別、boundary上、regularity condition違反では通常のFisher/CRLB近似が崩れる。小固有値方向は情報不足を示す。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

Gaussian linear model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\sigma^2\mathbf I)$ では $\mathbf I(\boldsymbol\beta)=\sigma^{-2}\mathbf X^{\mathsf T}\mathbf X$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Fisher情報行列の図](/visuals/engineering-math/stat-fisher-information-matrix.png)

Fisher情報行列の図では、中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` に現れる量のうち1つを変化させる。手計算例 `Gaussian linear model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\sigma^2\mathbf I)$ では $\mathbf I(\boldsymbol\beta)=\sigma^{-2}\mathbf X^{\mathsf T}\mathbf X$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

parameterが非識別、boundary上、regularity condition違反では通常のFisher/CRLB近似が崩れる。小固有値方向は情報不足を示す。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

score outer productのMonte Carlo平均とnegative Hessianの数値平均を同一modelで比較する。

Fisher情報行列の実装では、まず `score outer productのMonte Carlo平均とnegative Hessianの数値平均を同一modelで比較する。` を実行する。そのうえで中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

experimental design、Hotspot Matrix、inverse problem、MLE uncertaintyを同じ行列構造で結ぶ。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-likelihood-maximum-likelihood`, `prob-multivariate-normal-distribution`, `calc-gradient-directional-derivative`, `calc-hessian-second-order`。これらは単なる履修順ではない。`Fisher情報行列` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `log-likelihoodの一次微分をscore vector $\mathbf s$ と定義する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` のどの項に使われているかを対応づける。

また、experimental design、Hotspot Matrix、inverse problem、MLE uncertaintyを同じ行列構造で結ぶ。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Fisher情報行列` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `parameterが非識別、boundary上、regularity condition違反では通常のFisher/CRLB近似が崩れる。小固有値方向は情報不足を示す。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `Gaussian linear model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\sigma^2\mathbf I)$ では $\mathbf I(\boldsymbol\beta)=\sigma^{-2}\mathbf X^{\mathsf T}\mathbf X$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Fisher情報行列` の中心式 `$\mathbf I(\boldsymbol\theta)=E\!\left[\mathbf s(\boldsymbol\theta)\mathbf s(\boldsymbol\theta)^{\mathsf T}\right]=-E\!\left[\nabla_{\boldsymbol\theta}^2\ell(\boldsymbol\theta)\right]` を、記号表なしで再定義できるか。
- `log-likelihoodの一次微分をscore vector $\mathbf s$ と定義する。` から始めて、導出を途中式付きで再構成できるか。
- `Gaussian linear model $\mathbf y\sim N(\mathbf X\boldsymbol\beta,\sigma^2\mathbf I)$ では $\mathbf I(\boldsymbol\beta)=\sigma^{-2}\mathbf X^{\mathsf T}\mathbf X$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `parameterが非識別、boundary上、regularity condition違反では通常のFisher/CRLB近似が崩れる。小固有値方向は情報不足を示す。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `score outer productのMonte Carlo平均とnegative Hessianの数値平均を同一modelで比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-fisher-information-matrix)
