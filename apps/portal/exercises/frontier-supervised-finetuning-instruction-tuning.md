# SFT・instruction tuning：演習

Course 10｜Frontier

## 問題1

中心式 `$\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

pretrained LMを「指示に従うmodel」へ変える最初の段階は何を最適化しているか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

SFTはinstruction-response pairに対するconditional language modeling。base modelの次token予測能力を、望ましい会話・指示応答分布へ寄せる。

</details>

## 問題3

次の例を途中計算込みで再現せよ：「次を要約せよ」というinstructionと良質なsummaryのpairを多数学習する。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「SFT・instruction tuning」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

response conditional probabilityをautoregressive factorizationする。 → 負のlog likelihoodを取るとtoken cross entropyの和。 → prompt tokenをloss maskする設計ではresponse tokenだけを直接教師信号にする。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：SFT dataのstyle biasをmodel capabilityと混同しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「SFT・instruction tuning」の中心式 `\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「SFT・instruction tuning」を数値実装する前提で、中心式 `\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「SFT・instruction tuning」の中心式 `\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

SFT dataのstyle biasをmodel capabilityと混同しない。 / train/eval contaminationを避ける。

</details>

## 問題9

「SFT・instruction tuning」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「SFT・instruction tuning」について、定義 → 中心式 `\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/frontier-supervised-finetuning-instruction-tuning)
