# グラフ彩色：演習

Course 04｜離散数学

## 問題1

中心式 `$(u,v)\in E\Rightarrow c(u)\ne c(v)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

彩色は「衝突する対象を異なる資源へ割り当てる」問題。時間割、register allocation、周波数割当などへ直結する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：完全グラフK3は3色必要。二部グラフで辺があるなら2色で彩色可能。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「グラフ彩色」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

色は頂点へのlabel付与。 → 全ての辺で両端のlabelが異なることをfeasibility条件にする。 → その条件を満たす最小kをχ(G)と定義する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：greedy coloringの使用色数が必ずχ(G)とは限らない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「グラフ彩色」の中心式 `(u,v)\in E\Rightarrow c(u)\ne c(v)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「グラフ彩色」を数値実装する前提で、中心式 `(u,v)\in E\Rightarrow c(u)\ne c(v)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「グラフ彩色」の中心式 `(u,v)\in E\Rightarrow c(u)\ne c(v)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

greedy coloringの使用色数が必ずχ(G)とは限らない。 / 頂点彩色と辺彩色を混同しない。

</details>

## 問題9

「グラフ彩色」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「グラフ彩色」について、定義 → 中心式 `(u,v)\in E\Rightarrow c(u)\ne c(v)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/dm-graph-coloring)
