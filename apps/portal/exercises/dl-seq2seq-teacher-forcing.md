# seq2seq・encoder-decoder・teacher forcing：演習

Course 09｜深層学習

## 問題1

中心式 `$\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{\lt t},x)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

encoderは入力系列を表現へ変換し、decoderは過去token条件付きで次token分布を生成する。teacher forcingでは訓練時に正解prefixを与える。

</details>

## 問題3

次の例を途中計算込みで再現せよ：翻訳でsource文をencoderへ入れ、decoderは`&lt;BOS&gt;`からtarget tokenを順に予測する。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「seq2seq・encoder-decoder・teacher forcing」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。 → negative logを取ると和になりtoken-level cross entropyになる。 → teacher forcingは各条件 $y_{<t}$ にground-truth prefixを使う。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「seq2seq・encoder-decoder・teacher forcing」の中心式 `\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「seq2seq・encoder-decoder・teacher forcing」を数値実装する前提で、中心式 `\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「seq2seq・encoder-decoder・teacher forcing」の中心式 `\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。 / padding tokenをlossへ含めるmaskに注意する。

</details>

## 問題9

「seq2seq・encoder-decoder・teacher forcing」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「seq2seq・encoder-decoder・teacher forcing」について、定義 → 中心式 `\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/dl-seq2seq-teacher-forcing)
