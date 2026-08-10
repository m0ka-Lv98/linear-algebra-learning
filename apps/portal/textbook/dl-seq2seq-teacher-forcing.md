# seq2seq・encoder-decoder・teacher forcing：教科書

Course 09｜深層学習

## このTopicの中心問題

入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。

## まず直感

encoderは入力系列を表現へ変換し、decoderは過去token条件付きで次token分布を生成する。teacher forcingでは訓練時に正解prefixを与える。

## 図で固定する

<img src="/visuals/course-09/dl-seq2seq-teacher-forcing.png" alt="seq2seq・encoder-decoder・teacher forcingの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $x_{1:m}$ | 入力系列 |
| $y_{1:n}$ | 出力系列 |
| $p_θ(y_t|y_{\lt t},x)$ | 次token分布 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{\lt t},x)
$$

## なぜこの式になるのか

1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{\lt t},x)$。
2. negative logを取ると和になりtoken-level cross entropyになる。
3. teacher forcingは各条件 $y_{\lt t}$ にground-truth prefixを使う。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

翻訳でsource文をencoderへ入れ、decoderは`&lt;BOS&gt;`からtarget tokenを順に予測する。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。
- padding tokenをlossへ含めるmaskに注意する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- sequence-to-sequence learning

[演習へ](/exercises/dl-seq2seq-teacher-forcing)　|　[スライドへ](/slides/dl-seq2seq-teacher-forcing/)
