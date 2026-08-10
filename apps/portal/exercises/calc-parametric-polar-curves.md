# 媒介変数表示と極座標：演習

Course 01｜微積分

## 問題1

中心式 `$\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

xを独立変数にできない曲線を、媒介変数や極座標でどう扱うか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

曲線を時間tに沿って動く点 (x(t),y(t)) として表せば、縦線を含む曲線も自然に表現できる。極座標は距離rと角度θで点を表す。

</details>

## 問題3

次の例を途中計算込みで再現せよ：x=cos t,y=sin t は単位円。dy/dx=cos t/(-sin t)=-cot t。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「媒介変数表示と極座標」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

x,yの両方をtの関数とみなす。 → 連鎖律で dy/dt=(dy/dx)(dx/dt)。 → dx/dt≠0なら dy/dx について解く。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：dx/dt=0の点で比を機械適用しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「媒介変数表示と極座標」の中心式 `\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「媒介変数表示と極座標」を数値実装する前提で、中心式 `\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「媒介変数表示と極座標」の中心式 `\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

dx/dt=0の点で比を機械適用しない。 / 極座標では同じ点に複数表現がある。

</details>

## 問題9

「媒介変数表示と極座標」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「媒介変数表示と極座標」について、定義 → 中心式 `\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/calc-parametric-polar-curves)
