# 検定力と標本サイズ：演習

Course 03｜確率統計

## 問題1

中心式 `$\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

「有意差が出なかった」を、効果がない証拠とみなしてよいのはいつか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

検定力は、実際に特定の効果があるときに帰無仮説を棄却できる確率。効果量・ノイズ・標本数・有意水準の関数で、事前のsample size設計につながる。

</details>

## 問題3

次の例を途中計算込みで再現せよ：平均差δを検出したいとき、σが大きいほど同じpowerに必要なnは増える。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「検定力と標本サイズ」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

棄却域をαで固定する。 → 対立仮説の分布の下で、その棄却域に入る確率を計算する。 → nを増やすと標準誤差が下がり、固定効果量に対するpowerが上がる。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：p>0.05を「効果なし」と断定しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「検定力と標本サイズ」の中心式 `\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「検定力と標本サイズ」を数値実装する前提で、中心式 `\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「検定力と標本サイズ」の中心式 `\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

p>0.05を「効果なし」と断定しない。 / 事後に観測効果量だけからpowerを解釈しすぎない。

</details>

## 問題9

「検定力と標本サイズ」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「検定力と標本サイズ」について、定義 → 中心式 `\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/stat-power-sample-size)
