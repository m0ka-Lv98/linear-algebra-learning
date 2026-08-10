# 状態機械と不変量：演習

Course 04｜離散数学

## 問題1

中心式 `$I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

時間とともに状態が変わる系の正しさを、毎step追わずにどう証明するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

状態機械は「状態」と「許される遷移」を明示する。不変量は初期状態で真で、遷移しても真のまま残る性質なので、到達可能状態全体を一括して制約できる。

</details>

## 問題3

次の例を途中計算込みで再現せよ：コインを2枚ずつ裏返す操作では表向き枚数の偶奇が保存される、などのparity invariantで到達不能状態を示せる。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「状態機械と不変量」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

初期状態でIを確認する。 → 任意の1step遷移がIを保存することを示す。 → 帰納法により任意step後の到達可能状態でIが成り立つ。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：観察した数stepだけから不変と断定しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「状態機械と不変量」の中心式 `I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「状態機械と不変量」を数値実装する前提で、中心式 `I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「状態機械と不変量」の中心式 `I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

観察した数stepだけから不変と断定しない。 / 安全性不変量と停止性は別の証明。

</details>

## 問題9

「状態機械と不変量」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「状態機械と不変量」について、定義 → 中心式 `I(s_0)\land[I(s)\land s\to s\prime\Rightarrow I(s\prime)]` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/dm-state-machines-invariants)
