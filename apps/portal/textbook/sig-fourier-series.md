# Fourier series

**分野:** Fourier・信号
**Prerequisites:** `calc-integrals-fundamental-theorem`, `la-inner-products-norms-angles`, `prep-complex-numbers-euler-form`

## 1. このTopicで解く問い

周期信号をorthogonalなcomplex sinusoid basisへどう分解するか。

Fourier seriesは『何を保存し、何を変換するか』を分離すると理解しやすい。中心式の左辺を観測量、右辺を構成操作として読み、各因子の役割を一つずつ確認する。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $T$ | period | positive |
| $\omega_0=2\pi/T$ | fundamental angular frequency | rad/time |
| $c_k$ | Fourier coefficient | complex |

## 3. 中心となる定義・式

$$
x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt
$$

Fourier seriesでは、time-domain quantityとfrequency/operator-domain quantityの対応を固定する。$T$ は period（positive）、$\omega_0=2\pi/T$ は fundamental angular frequency（rad/time）、$c_k$ は Fourier coefficient（complex）。中心式 `x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` のnormalization、sample interval、complex conjugate、周波数単位を一つずつ確認する。signal processingでは式が正しくてもwindowingやsampling条件で観測spectrumが変わるため、数学的変換と測定条件を分離して考える。

中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Fourier seriesではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $e^{ik\omega_0t}$ が1周期上でorthogonalであることを内積で示す。
2. 展開式へbasis conjugateを掛け1周期積分する。
3. orthogonalityにより目的index以外が0となり係数公式が得られる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

periodic vibration、AC waveform、harmonic analysis、PDE eigenfunction expansion。

Fourier seriesの中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` を、periodic vibration、AC waveform、harmonic analysis、PDE eigenfunction expansion。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `discontinuityではpointwise convergenceにGibbs phenomenonが現れる。finite truncationを元signalそのものと同一視しない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$x(t)=\cos\omega_0t$ なら $c_{1}=c_{-1}=1/2$、他0。2本のcomplex exponentialが1本のcosineを作る。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Fourier seriesの図](/visuals/engineering-math/sig-fourier-series.png)

Fourier seriesの図では、中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` に現れる量のうち1つを変化させる。手計算例 `$x(t)=\cos\omega_0t$ なら $c_{1}=c_{-1}=1/2$、他0。2本のcomplex exponentialが1本のcosineを作る。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

discontinuityではpointwise convergenceにGibbs phenomenonが現れる。finite truncationを元signalそのものと同一視しない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

square waveの係数を数値積分し、term数とovershootの関係を描く。

Fourier seriesの実装では、まず `square waveの係数を数値積分し、term数とovershootの関係を描く。` を実行する。そのうえで中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

periodic vibration、AC waveform、harmonic analysis、PDE eigenfunction expansion。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `calc-integrals-fundamental-theorem`, `la-inner-products-norms-angles`, `prep-complex-numbers-euler-form`。これらは単なる履修順ではない。`Fourier series` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$e^{ik\omega_0t}$ が1周期上でorthogonalであることを内積で示す。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` のどの項に使われているかを対応づける。

また、periodic vibration、AC waveform、harmonic analysis、PDE eigenfunction expansion。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Fourier series` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `discontinuityではpointwise convergenceにGibbs phenomenonが現れる。finite truncationを元signalそのものと同一視しない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$x(t)=\cos\omega_0t$ なら $c_{1}=c_{-1}=1/2$、他0。2本のcomplex exponentialが1本のcosineを作る。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Fourier series` の中心式 `$x(t)=\sum_{k=-\infty}^{\infty}c_ke^{ik\omega_0t},\qquad c_k=\frac1T\int_Tx(t)e^{-ik\omega_0t}dt` を、記号表なしで再定義できるか。
- `$e^{ik\omega_0t}$ が1周期上でorthogonalであることを内積で示す。` から始めて、導出を途中式付きで再構成できるか。
- `$x(t)=\cos\omega_0t$ なら $c_{1}=c_{-1}=1/2$、他0。2本のcomplex exponentialが1本のcosineを作る。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `discontinuityではpointwise convergenceにGibbs phenomenonが現れる。finite truncationを元signalそのものと同一視しない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `square waveの係数を数値積分し、term数とovershootの関係を描く。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/sig-fourier-series)
