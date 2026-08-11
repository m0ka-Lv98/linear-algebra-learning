# Impulseとstep信号

**分野:** Fourier・信号
**Prerequisites:** `sig-continuous-time-signals`, `sig-discrete-time-signals`

## 1. このTopicで解く問い

systemをprobeする理想入力としてimpulseとstepをどう定義するか。

Impulseとstep信号の計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\delta(t)$ | Dirac impulse | distribution |
| $u(t)$ | unit step | piecewise signal |
| $\phi$ | test function | smooth |

## 3. 中心となる定義・式

$$
\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau
$$

Impulseとstep信号では、time-domain quantityとfrequency/operator-domain quantityの対応を固定する。$\delta(t)$ は Dirac impulse（distribution）、$u(t)$ は unit step（piecewise signal）、$\phi$ は test function（smooth）。中心式 `\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` のnormalization、sample interval、complex conjugate、周波数単位を一つずつ確認する。signal processingでは式が正しくてもwindowingやsampling条件で観測spectrumが変わるため、数学的変換と測定条件を分離して考える。

中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Impulseとstep信号ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. Dirac deltaは通常関数ではなくsampling propertyで定義するdistribution。
2. stepのdistributional derivativeがdeltaになる。
3. discrete timeでは $\delta[n]$ はn=0で1、他0の通常sequence。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

impulse response測定、step response、Green function、LTI system characterization。

Impulseとstep信号の中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` を、impulse response測定、step response、Green function、LTI system characterization。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `continuous Dirac deltaを高さ無限の「細い矩形関数」と同一視しない。近似列の極限として理解する。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

convolution $x*\delta=x$。離散列 [2,3,4] にunit impulseをconvolveしても同じ列が返る。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Impulseとstep信号の図](/visuals/engineering-math/sig-impulse-step.png)

Impulseとstep信号の図では、中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` に現れる量のうち1つを変化させる。手計算例 `convolution $x*\delta=x$。離散列 [2,3,4] にunit impulseをconvolveしても同じ列が返る。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

continuous Dirac deltaを高さ無限の「細い矩形関数」と同一視しない。近似列の極限として理解する。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

narrow pulseでdeltaを近似し、areaを1に保ったまま幅を狭めたconvolutionの収束を見る。

Impulseとstep信号の実装では、まず `narrow pulseでdeltaを近似し、areaを1に保ったまま幅を狭めたconvolutionの収束を見る。` を実行する。そのうえで中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

impulse response測定、step response、Green function、LTI system characterization。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `sig-continuous-time-signals`, `sig-discrete-time-signals`。これらは単なる履修順ではない。`Impulseとstep信号` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `Dirac deltaは通常関数ではなくsampling propertyで定義するdistribution。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` のどの項に使われているかを対応づける。

また、impulse response測定、step response、Green function、LTI system characterization。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Impulseとstep信号` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `continuous Dirac deltaを高さ無限の「細い矩形関数」と同一視しない。近似列の極限として理解する。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `convolution $x*\delta=x$。離散列 [2,3,4] にunit impulseをconvolveしても同じ列が返る。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Impulseとstep信号` の中心式 `$\int_{-\infty}^{\infty}\delta(t)\phi(t)dt=\phi(0),\qquad u(t)=\int_{-\infty}^{t}\delta(\tau)d\tau` を、記号表なしで再定義できるか。
- `Dirac deltaは通常関数ではなくsampling propertyで定義するdistribution。` から始めて、導出を途中式付きで再構成できるか。
- `convolution $x*\delta=x$。離散列 [2,3,4] にunit impulseをconvolveしても同じ列が返る。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `continuous Dirac deltaを高さ無限の「細い矩形関数」と同一視しない。近似列の極限として理解する。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `narrow pulseでdeltaを近似し、areaを1に保ったまま幅を狭めたconvolutionの収束を見る。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/sig-impulse-step)
