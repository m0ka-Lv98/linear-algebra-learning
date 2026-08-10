# 多重検定とFDR：演習

Course 03｜確率統計

## 問題1

中心式 `$\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

何百・何千個も検定すると、なぜ偶然の有意差が増え、どう制御するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

各検定の誤陽性率が小さくても、検定数が増えると少なくとも1つ誤陽性を出す確率が上がる。FWERとFDRは異なる誤り基準を制御する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：m=1000の探索では未補正p<0.05だけで多数の偶然ヒットが期待される。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「多重検定とFDR」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

多数のp値を得る。 → Benjamini–Hochbergでは昇順 p_(i) と i q/m を比較する。 → 条件を満たす最大iまでを棄却し、発見集合中の偽発見割合を平均的に制御する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：FWERとFDRを同じ保証と思わない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「多重検定とFDR」の中心式 `\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「多重検定とFDR」を数値実装する前提で、中心式 `\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「多重検定とFDR」の中心式 `\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

FWERとFDRを同じ保証と思わない。 / 依存構造によって手法の条件が変わる。

</details>

## 問題9

「多重検定とFDR」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「多重検定とFDR」について、定義 → 中心式 `\mathrm{FDR}=E\left[\frac{V}{\max(R,1)}\right]` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/stat-multiple-testing-fdr)
