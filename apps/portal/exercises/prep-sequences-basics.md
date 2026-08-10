# 数列・収束の初歩：演習

Course 00｜学習準備

## 問題1

中心式 `$a_n\to L\iff \forall\varepsilon>0\;\exists N\;\forall n\ge N:\ |a_n-L|<\varepsilon` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

「nを大きくすると近づく」を、数列の収束としてどう厳密に書くか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

数列は自然数 n を入力して数 a_n を返す関数。極限は「十分後ろの項を全部、目標値の任意に小さい近傍へ入れられる」という主張。

</details>

## 問題3

次の例を途中計算込みで再現せよ：a_n=1/n は0へ収束。ε>0に対し N>1/ε と取れば n≥N で1/n≤1/N<ε。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「数列・収束の初歩」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

許容誤差 ε を任意に固定する。 → その ε に応じた N を選ぶ。 → N 以降の全ての n で誤差が ε 未満なら収束と定義する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：有限個の項が外れても収束を妨げない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「数列・収束の初歩」の中心式 `a_n\to L\iff \forall\varepsilon>0\;\exists N\;\forall n\ge N:\ |a_n-L|<\varepsilon` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「数列・収束の初歩」を数値実装する前提で、中心式 `a_n\to L\iff \forall\varepsilon>0\;\exists N\;\forall n\ge N:\ |a_n-L|<\varepsilon` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「数列・収束の初歩」の中心式 `a_n\to L\iff \forall\varepsilon>0\;\exists N\;\forall n\ge N:\ |a_n-L|<\varepsilon` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

有限個の項が外れても収束を妨げない。 / 「多くの項」ではなく N 以降の全項である。

</details>

## 問題9

「数列・収束の初歩」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「数列・収束の初歩」について、定義 → 中心式 `a_n\to L\iff \forall\varepsilon>0\;\exists N\;\forall n\ge N:\ |a_n-L|<\varepsilon` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/prep-sequences-basics)
