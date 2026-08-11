# 指数型分布族

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-sufficient-statistics`, `stat-likelihood-maximum-likelihood`

## 1. このTopicで解く問い

多くの分布を共通のnatural parameterと十分統計量の形でどう統一するか。

指数型分布族は『何を保存し、何を変換するか』を分離すると理解しやすい。中心式の左辺を観測量、右辺を構成操作として読み、各因子の役割を一つずつ確認する。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\boldsymbol\eta$ | natural parameter | p |
| $\mathbf T(x)$ | sufficient statistic | p |
| $A$ | log-partition function | scalar |

## 3. 中心となる定義・式

$$
p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)
$$

指数型分布族では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\boldsymbol\eta$ は natural parameter（p）、$\mathbf T(x)$ は sufficient statistic（p）、$A$ は log-partition function（scalar）。中心式 `p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。指数型分布族ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. BernoulliやPoissonなどのpmf/pdfをlogへ移しparameter-dependent termsを分離する。
2. 係数をnatural parameter η、data functionをT(x)として集める。
3. normalizationを保証する項がlog-partition A(η)で、微分するとmomentsが得られる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

GLM、maximum entropy、conjugate prior、Fisher geometryの共通形式。

指数型分布族の中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` を、GLM、maximum entropy、conjugate prior、Fisher geometryの共通形式。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `supportがparameterに依存する分布は標準regular exponential familyの性質が使えない場合がある。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

Poissonでは η=logλ、T(x)=x、A(η)=e^η。$A'(η)=e^η=λ=E[X]$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![指数型分布族の図](/visuals/engineering-math/stat-exponential-family.png)

指数型分布族の図では、中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` に現れる量のうち1つを変化させる。手計算例 `Poissonでは η=logλ、T(x)=x、A(η)=e^η。$A'(η)=e^η=λ=E[X]$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

supportがparameterに依存する分布は標準regular exponential familyの性質が使えない場合がある。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

複数分布をnatural parameter形へ書き換え、Aの数値微分とsample momentを比較する。

指数型分布族の実装では、まず `複数分布をnatural parameter形へ書き換え、Aの数値微分とsample momentを比較する。` を実行する。そのうえで中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

GLM、maximum entropy、conjugate prior、Fisher geometryの共通形式。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-sufficient-statistics`, `stat-likelihood-maximum-likelihood`。これらは単なる履修順ではない。`指数型分布族` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `BernoulliやPoissonなどのpmf/pdfをlogへ移しparameter-dependent termsを分離する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` のどの項に使われているかを対応づける。

また、GLM、maximum entropy、conjugate prior、Fisher geometryの共通形式。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`指数型分布族` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `supportがparameterに依存する分布は標準regular exponential familyの性質が使えない場合がある。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `Poissonでは η=logλ、T(x)=x、A(η)=e^η。$A'(η)=e^η=λ=E[X]$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `指数型分布族` の中心式 `$p(x\mid\boldsymbol\eta)=h(x)\exp\!\left(\boldsymbol\eta^{\mathsf T}\mathbf T(x)-A(\boldsymbol\eta)\right)` を、記号表なしで再定義できるか。
- `BernoulliやPoissonなどのpmf/pdfをlogへ移しparameter-dependent termsを分離する。` から始めて、導出を途中式付きで再構成できるか。
- `Poissonでは η=logλ、T(x)=x、A(η)=e^η。$A'(η)=e^η=λ=E[X]$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `supportがparameterに依存する分布は標準regular exponential familyの性質が使えない場合がある。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `複数分布をnatural parameter形へ書き換え、Aの数値微分とsample momentを比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-exponential-family)
