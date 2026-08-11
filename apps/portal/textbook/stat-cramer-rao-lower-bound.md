# Cramér–Rao下界

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-fisher-information-matrix`, `stat-estimator-covariance`

## 1. このTopicで解く問い

unbiased estimatorのvarianceに、data情報量からどんな理論的下限が課されるか。

Cramér–Rao下界の計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf I$ | Fisher information | p\times p |
| $\succeq$ | positive-semidefinite ordering | matrix relation |

## 3. 中心となる定義・式

$$
\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}
$$

Cramér–Rao下界では、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$\mathbf I$ は Fisher information（p\times p）、$\succeq$ は positive-semidefinite ordering（matrix relation）。中心式 `\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Cramér–Rao下界ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. unbiasednessから $E[\hat\theta]=\theta$ をparameterで微分する。
2. estimation errorとscoreのcovariance関係を得る。
3. Cauchy–Schwarzのmatrix版を適用するとcovariance minus inverse FisherがPSDになる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

sensor design、parameter precisionの理論限界、algorithm比較のbenchmark。

Cramér–Rao下界の中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` を、sensor design、parameter precisionの理論限界、algorithm比較のbenchmark。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `biased estimator、boundary parameter、nonregular modelでは通常形をそのまま適用できない。下限達成可能性も別問題。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

Bernoulli n sampleのp推定では $I(p)=n/[p(1-p)]$ なのでvariance下限は $p(1-p)/n$。sample meanがこれを達成する。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Cramér–Rao下界の図](/visuals/engineering-math/stat-cramer-rao-lower-bound.png)

Cramér–Rao下界の図では、中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` に現れる量のうち1つを変化させる。手計算例 `Bernoulli n sampleのp推定では $I(p)=n/[p(1-p)]$ なのでvariance下限は $p(1-p)/n$。sample meanがこれを達成する。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

biased estimator、boundary parameter、nonregular modelでは通常形をそのまま適用できない。下限達成可能性も別問題。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

simulationでefficient estimatorのsample varianceとCRLBを比較し、有限標本差も見る。

Cramér–Rao下界の実装では、まず `simulationでefficient estimatorのsample varianceとCRLBを比較し、有限標本差も見る。` を実行する。そのうえで中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

sensor design、parameter precisionの理論限界、algorithm比較のbenchmark。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-fisher-information-matrix`, `stat-estimator-covariance`。これらは単なる履修順ではない。`Cramér–Rao下界` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `unbiasednessから $E[\hat\theta]=\theta$ をparameterで微分する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` のどの項に使われているかを対応づける。

また、sensor design、parameter precisionの理論限界、algorithm比較のbenchmark。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Cramér–Rao下界` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `biased estimator、boundary parameter、nonregular modelでは通常形をそのまま適用できない。下限達成可能性も別問題。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `Bernoulli n sampleのp推定では $I(p)=n/[p(1-p)]$ なのでvariance下限は $p(1-p)/n$。sample meanがこれを達成する。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Cramér–Rao下界` の中心式 `$\operatorname{Cov}(\hat{\boldsymbol\theta})\succeq\mathbf I(\boldsymbol\theta)^{-1}` を、記号表なしで再定義できるか。
- `unbiasednessから $E[\hat\theta]=\theta$ をparameterで微分する。` から始めて、導出を途中式付きで再構成できるか。
- `Bernoulli n sampleのp推定では $I(p)=n/[p(1-p)]$ なのでvariance下限は $p(1-p)/n$。sample meanがこれを達成する。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `biased estimator、boundary parameter、nonregular modelでは通常形をそのまま適用できない。下限達成可能性も別問題。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `simulationでefficient estimatorのsample varianceとCRLBを比較し、有限標本差も見る。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-cramer-rao-lower-bound)
