# 劣勾配と非滑らか最適化：演習

Course 06｜最適化

## 問題1

中心式 `$g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

|x|やL1正則化のように微分できない点があっても、凸最適化をどう続けるか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

凸関数では接線の代わりに「関数を下から支える直線・超平面」の傾きを使える。その傾き集合がsubdifferential。

</details>

## 問題3

次の例を途中計算込みで再現せよ：f(x)=|x|では x>0で∂f={1}, x<0で{-1}, x=0で[-1,1]。0∈∂f(0)なので0が最小。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「劣勾配と非滑らか最適化」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

滑らかな凸関数の一次supporting inequalityを一般化する。 → 微分不能点では1本の接線でなく複数のsupporting hyperplaneが存在し得る。 → 0∈∂f(x*)なら全yで f(y)≥f(x*) なのでx*はglobal minimizer。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：任意の方向ベクトルを劣勾配と呼ばない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「劣勾配と非滑らか最適化」の中心式 `g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「劣勾配と非滑らか最適化」を数値実装する前提で、中心式 `g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「劣勾配と非滑らか最適化」の中心式 `g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

任意の方向ベクトルを劣勾配と呼ばない。 / 非凸関数へ凸subgradientの結論をそのまま移さない。

</details>

## 問題9

「劣勾配と非滑らか最適化」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「劣勾配と非滑らか最適化」について、定義 → 中心式 `g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/opt-subgradients-nonsmooth)
