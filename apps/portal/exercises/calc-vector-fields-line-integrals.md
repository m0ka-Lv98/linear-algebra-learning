# ベクトル場と線積分：演習

Course 01｜微積分

## 問題1

中心式 `$\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

空間の各点にベクトルがあるとき、曲線に沿った仕事をどう足し上げるか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

力場Fの中を曲線Cに沿って動くと、微小変位drに平行な力成分だけが仕事をする。内積 F·dr を経路全体で積分する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：F=(x,y), r(t)=(t,t), 0≤t≤1 なら F·r′=2t、積分値は1。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「ベクトル場と線積分」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

曲線を短い線分へ分割する。 → 各線分で仕事を $F\cdot\Delta r$ と近似する。 → 分割幅を0へしたRiemann和の極限が線積分。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：ベクトルの大きさだけを積分しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「ベクトル場と線積分」の中心式 `\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「ベクトル場と線積分」を数値実装する前提で、中心式 `\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「ベクトル場と線積分」の中心式 `\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

ベクトルの大きさだけを積分しない。 / 経路方向を反転すると符号が変わる。

</details>

## 問題9

「ベクトル場と線積分」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「ベクトル場と線積分」について、定義 → 中心式 `\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/calc-vector-fields-line-integrals)
