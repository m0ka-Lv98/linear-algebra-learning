# Fenchel共役とFenchel双対：演習

Course 06｜最適化

## 問題1

中心式 `$f^*(y)=\sup_x\{y^Tx-f(x)\}` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

関数を傾き空間へ写すFenchel共役が、なぜ双対問題と正則化の理解に役立つか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

共役 f*(y) は「傾きyを持つ線形関数がfからどれだけ上へ離れられるか」の最大値。Fenchel–Young不等式を通じてprimalとdualを結ぶ。

</details>

## 問題3

次の例を途中計算込みで再現せよ：f(x)=x²/2 の共役は y²/2。x=yでFenchel–Youngが等号になる。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「Fenchel共役とFenchel双対」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

定義から任意x,yについて y^Tx-f(x)≤f*(y)。 → 並べ替えて f(x)+f*(y)≥x^Ty (Fenchel–Young)。 → 等号条件 y∈∂f(x) がprimal-dual最適性を与える。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：Legendre transformと完全に同じ条件だと思わない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「Fenchel共役とFenchel双対」の中心式 `f^*(y)=\sup_x\{y^Tx-f(x)\}` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「Fenchel共役とFenchel双対」を数値実装する前提で、中心式 `f^*(y)=\sup_x\{y^Tx-f(x)\}` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「Fenchel共役とFenchel双対」の中心式 `f^*(y)=\sup_x\{y^Tx-f(x)\}` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

Legendre transformと完全に同じ条件だと思わない。 / supが有限になる定義域を確認する。

</details>

## 問題9

「Fenchel共役とFenchel双対」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「Fenchel共役とFenchel双対」について、定義 → 中心式 `f^*(y)=\sup_x\{y^Tx-f(x)\}` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/opt-fenchel-duality-conjugates)
