# 離散時間信号

**分野:** Fourier・信号
**Prerequisites:** `sig-continuous-time-signals`

## 1. このTopicで解く問い

sampleされたsequenceを、continuous-time signalと区別してどう表すか。

離散時間信号では、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $n$ | integer sample index | integer |
| $x[n]$ | sample value | real/complex |

## 3. 中心となる定義・式

$$
x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2
$$

離散時間信号では、time-domain quantityとfrequency/operator-domain quantityの対応を固定する。$n$ は integer sample index（integer）、$x[n]$ は sample value（real/complex）。中心式 `x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` のnormalization、sample interval、complex conjugate、周波数単位を一つずつ確認する。signal processingでは式が正しくてもwindowingやsampling条件で観測spectrumが変わるため、数学的変換と測定条件を分離して考える。

中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。離散時間信号ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. discrete-time signalはinteger index上のsequenceとして定義する。
2. continuous integralの代わりにsumでenergyを定義する。
3. sampling interval $T_s$ が物理timeとの対応を与え、sample rateは $f_s=1/T_s$。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

ADC後のwaveform、digital filters、FFT入力sequence。

離散時間信号の中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` を、ADC後のwaveform、digital filters、FFT入力sequence。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `index nとphysical time nTsを混同するとfrequency unitがcycles/sampleかHzか不明になる。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$x[n]=(1/2)^n u[n]$ のenergyは幾何級数 $\sum_{n=0}^\infty(1/4)^n=4/3$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![離散時間信号の図](/visuals/engineering-math/sig-discrete-time-signals.png)

離散時間信号の図では、中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` に現れる量のうち1つを変化させる。手計算例 `$x[n]=(1/2)^n u[n]$ のenergyは幾何級数 $\sum_{n=0}^\infty(1/4)^n=4/3$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

index nとphysical time nTsを混同するとfrequency unitがcycles/sampleかHzか不明になる。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

同一analog sinusoidを複数sample rateで生成してsequenceの見え方を比較する。

離散時間信号の実装では、まず `同一analog sinusoidを複数sample rateで生成してsequenceの見え方を比較する。` を実行する。そのうえで中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

ADC後のwaveform、digital filters、FFT入力sequence。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `sig-continuous-time-signals`。これらは単なる履修順ではない。`離散時間信号` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `discrete-time signalはinteger index上のsequenceとして定義する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` のどの項に使われているかを対応づける。

また、ADC後のwaveform、digital filters、FFT入力sequence。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`離散時間信号` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `index nとphysical time nTsを混同するとfrequency unitがcycles/sampleかHzか不明になる。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$x[n]=(1/2)^n u[n]$ のenergyは幾何級数 $\sum_{n=0}^\infty(1/4)^n=4/3$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `離散時間信号` の中心式 `$x:\mathbb Z\to\mathbb C,\qquad E_x=\sum_{n=-\infty}^{\infty}|x[n]|^2` を、記号表なしで再定義できるか。
- `discrete-time signalはinteger index上のsequenceとして定義する。` から始めて、導出を途中式付きで再構成できるか。
- `$x[n]=(1/2)^n u[n]$ のenergyは幾何級数 $\sum_{n=0}^\infty(1/4)^n=4/3$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `index nとphysical time nTsを混同するとfrequency unitがcycles/sampleかHzか不明になる。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `同一analog sinusoidを複数sample rateで生成してsequenceの見え方を比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/sig-discrete-time-signals)
