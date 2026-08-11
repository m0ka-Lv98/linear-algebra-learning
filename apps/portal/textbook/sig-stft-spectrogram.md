# STFTとspectrogram

**分野:** Fourier・信号
**Prerequisites:** `sig-fourier-transform`, `sig-sampling-theorem-aliasing`

## 1. このTopicで解く問い

frequency成分が時間で変化する非定常signalを、局所spectrumとしてどう可視化するか。

STFTとspectrogramの理解確認には、中心式を小さな数値例へ落とし、次に条件を一つだけ破った反例を見る方法が有効である。公式の適用範囲まで含めて理解できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $w$ | window function | localized |
| $\tau$ | window center time | time |
| $\omega$ | frequency | rad/time |
| $S$ | spectrogram | nonnegative |

## 3. 中心となる定義・式

$$
X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2
$$

STFTとspectrogramでは、time-domain quantityとfrequency/operator-domain quantityの対応を固定する。$w$ は window function（localized）、$\tau$ は window center time（time）、$\omega$ は frequency（rad/time）、$S$ は spectrogram（nonnegative）。中心式 `X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` のnormalization、sample interval、complex conjugate、周波数単位を一つずつ確認する。signal processingでは式が正しくてもwindowingやsampling条件で観測spectrumが変わるため、数学的変換と測定条件を分離して考える。

中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。STFTとspectrogramではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. signalへcenter τのwindowを掛け局所区間を切り出す。
2. その区間へFourier transformを適用する。
3. τをscanしてtime-frequency planeを作り、magnitude squaredをspectrogramとする。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

vibration transient、audio、pulse waveform、dynamic spectroscopy。

STFTとspectrogramの中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` を、vibration transient、audio、pulse waveform、dynamic spectroscopy。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `time resolutionとfrequency resolutionは同時に無限にはできない。window lengthを目的に合わせて選ぶ。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

100→300 Hzへ線形に上がるchirpはspectrogram上で右上がりridgeになる。windowを短くするとtime分解能は上がるがfrequency ridgeが太くなる。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![STFTとspectrogramの図](/visuals/engineering-math/sig-stft-spectrogram.png)

STFTとspectrogramの図では、中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` に現れる量のうち1つを変化させる。手計算例 `100→300 Hzへ線形に上がるchirpはspectrogram上で右上がりridgeになる。windowを短くするとtime分解能は上がるがfrequency ridgeが太くなる。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

time resolutionとfrequency resolutionは同時に無限にはできない。window lengthを目的に合わせて選ぶ。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`scipy.signal.stft` でwindow長を変え、chirp ridgeのtime/frequency blur trade-offを比較する。

STFTとspectrogramの実装では、まず ``scipy.signal.stft` でwindow長を変え、chirp ridgeのtime/frequency blur trade-offを比較する。` を実行する。そのうえで中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

vibration transient、audio、pulse waveform、dynamic spectroscopy。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `sig-fourier-transform`, `sig-sampling-theorem-aliasing`。これらは単なる履修順ではない。`STFTとspectrogram` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `signalへcenter τのwindowを掛け局所区間を切り出す。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` のどの項に使われているかを対応づける。

また、vibration transient、audio、pulse waveform、dynamic spectroscopy。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`STFTとspectrogram` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `time resolutionとfrequency resolutionは同時に無限にはできない。window lengthを目的に合わせて選ぶ。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `100→300 Hzへ線形に上がるchirpはspectrogram上で右上がりridgeになる。windowを短くするとtime分解能は上がるがfrequency ridgeが太くなる。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `STFTとspectrogram` の中心式 `$X(\tau,\omega)=\int x(t)w(t-\tau)e^{-i\omega t}dt,\qquad S(\tau,\omega)=|X(\tau,\omega)|^2` を、記号表なしで再定義できるか。
- `signalへcenter τのwindowを掛け局所区間を切り出す。` から始めて、導出を途中式付きで再構成できるか。
- `100→300 Hzへ線形に上がるchirpはspectrogram上で右上がりridgeになる。windowを短くするとtime分解能は上がるがfrequency ridgeが太くなる。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `time resolutionとfrequency resolutionは同時に無限にはできない。window lengthを目的に合わせて選ぶ。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``scipy.signal.stft` でwindow長を変え、chirp ridgeのtime/frequency blur trade-offを比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/sig-stft-spectrogram)
