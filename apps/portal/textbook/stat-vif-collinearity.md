# VIFとcollinearity

**分野:** Fisher情報・統計推定
**Prerequisites:** `stat-estimator-covariance`, `mat-gram-matrix`

## 1. このTopicで解く問い

設計列が似ることで回帰係数varianceがどれだけ膨らむかをどう定量化するか。

VIFとcollinearityを工学で使うときは、理想式の成立条件と測定系の近似条件を分ける必要がある。理想式が正しくても、noise modelやsampling条件が違えば推定解釈は変わる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $R_j^2$ | column j regressed on other columns: coefficient of determination | [0,1) |
| $VIF_j$ | variance inflation factor | >=1 |

## 3. 中心となる定義・式

$$
\operatorname{VIF}_j=\frac{1}{1-R_j^2}
$$

VIFとcollinearityでは、likelihoodまたはestimating equationから得られる局所曲率・感度と、推定量のばらつきを区別する。$R_j^2$ は column j regressed on other columns: coefficient of determination（[0,1)）、$VIF_j$ は variance inflation factor（>=1）。中心式 `\operatorname{VIF}_j=\frac{1}{1-R_j^2}` の行列が大きい/小さいとはどのparameter方向についての話かをeigenvectorまで含めて読む。対角要素だけを見るとparameter間のtrade-offを失う。

中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。VIFとcollinearityではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. OLS covarianceは $\sigma^2(\mathbf X^{\mathsf T}\mathbf X)^{-1}$。
2. 第j列を他列へ回帰した残差normが小さいほど、独自情報が少ない。
3. その比を整理するとvariance inflationが $1/(1-R_j^2)$ で表せる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

spectral unmixingの似たsignature、multi-sensor calibration、regression diagnostics。

VIFとcollinearityの中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` を、spectral unmixingの似たsignature、multi-sensor calibration、regression diagnostics。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `VIF thresholdを機械的に絶対基準として使わない。標準化・model目的・sample sizeで解釈は変わる。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$R_j^2=0.9$ ならVIF=10で、標準誤差は独立設計と比べ概ね $\sqrt{10}\approx3.16$ 倍のscaleで膨らむ。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![VIFとcollinearityの図](/visuals/engineering-math/stat-vif-collinearity.png)

VIFとcollinearityの図では、中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` に現れる量のうち1つを変化させる。手計算例 `$R_j^2=0.9$ ならVIF=10で、標準誤差は独立設計と比べ概ね $\sqrt{10}\approx3.16$ 倍のscaleで膨らむ。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

VIF thresholdを機械的に絶対基準として使わない。標準化・model目的・sample sizeで解釈は変わる。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

各columnを他列へleast squaresし、R²由来VIFとinverse correlation matrix対角を照合する。

VIFとcollinearityの実装では、まず `各columnを他列へleast squaresし、R²由来VIFとinverse correlation matrix対角を照合する。` を実行する。そのうえで中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

spectral unmixingの似たsignature、multi-sensor calibration、regression diagnostics。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `stat-estimator-covariance`, `mat-gram-matrix`。これらは単なる履修順ではない。`VIFとcollinearity` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `OLS covarianceは $\sigma^2(\mathbf X^{\mathsf T}\mathbf X)^{-1}$。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` のどの項に使われているかを対応づける。

また、spectral unmixingの似たsignature、multi-sensor calibration、regression diagnostics。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`VIFとcollinearity` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `VIF thresholdを機械的に絶対基準として使わない。標準化・model目的・sample sizeで解釈は変わる。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$R_j^2=0.9$ ならVIF=10で、標準誤差は独立設計と比べ概ね $\sqrt{10}\approx3.16$ 倍のscaleで膨らむ。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `VIFとcollinearity` の中心式 `$\operatorname{VIF}_j=\frac{1}{1-R_j^2}` を、記号表なしで再定義できるか。
- `OLS covarianceは $\sigma^2(\mathbf X^{\mathsf T}\mathbf X)^{-1}$。` から始めて、導出を途中式付きで再構成できるか。
- `$R_j^2=0.9$ ならVIF=10で、標準誤差は独立設計と比べ概ね $\sqrt{10}\approx3.16$ 倍のscaleで膨らむ。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `VIF thresholdを機械的に絶対基準として使わない。標準化・model目的・sample sizeで解釈は変わる。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `各columnを他列へleast squaresし、R²由来VIFとinverse correlation matrix対角を照合する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/stat-vif-collinearity)
