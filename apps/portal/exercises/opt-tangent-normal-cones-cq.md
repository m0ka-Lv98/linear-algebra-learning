# 接錐・法錐・制約資格条件：演習

Course 06｜最適化

## 問題1

中心式 `$-\nabla f(x^*)\in N_C(x^*)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

KKTのstationarityは、なぜ「目的勾配と制約法線の釣り合い」になるのか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

最適点から一次的に動ける方向の集合がtangent cone。その全方向へ目的関数を減らせない条件は、負の勾配がtangent coneの極coneであるnormal coneに入ること。KKTはnormal coneを制約勾配で表現した形。

</details>

## 問題3

次の例を途中計算込みで再現せよ：半空間 x≤1 の境界x=1ではfeasible directionはd≤0、normal coneは非負方向。目的勾配が左向きなら負勾配が右向きnormalに入る。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「接錐・法錐・制約資格条件」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

feasible direction d では小さいt>0でx*+tdが許される。 → 局所最小なら全feasible directionで ∇f(x*)^T d≥0。 → これは -∇f(x*) が tangent cone のpolar、すなわちnormal coneに属することと同値。CQの下でnormal coneをactive constraint gradientで表せる。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：CQが壊れると制約勾配だけでnormal coneを表せない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「接錐・法錐・制約資格条件」の中心式 `-\nabla f(x^*)\in N_C(x^*)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「接錐・法錐・制約資格条件」を数値実装する前提で、中心式 `-\nabla f(x^*)\in N_C(x^*)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「接錐・法錐・制約資格条件」の中心式 `-\nabla f(x^*)\in N_C(x^*)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

CQが壊れると制約勾配だけでnormal coneを表せない。 / KKT pointとglobal optimumを非凸問題で同一視しない。

</details>

## 問題9

「接錐・法錐・制約資格条件」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「接錐・法錐・制約資格条件」について、定義 → 中心式 `-\nabla f(x^*)\in N_C(x^*)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/opt-tangent-normal-cones-cq)
