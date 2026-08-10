# Fisher情報量とMLEの漸近分布：演習

Course 03｜確率統計

## 問題1

中心式 `$\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

尤度の「尖り具合」が、推定量の精度とどう結びつくか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

真のパラメータ付近でlog-likelihoodが急に曲がるほど、少しパラメータをずらしたときデータ分布が大きく変わる。これを平均曲率として測るのがFisher情報量。

</details>

## 問題3

次の例を途中計算込みで再現せよ：Bernoulli(p) 1標本の情報量は1/[p(1-p)]。n標本ではn倍になり、MLEの分散はおおよそp(1-p)/n。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「Fisher情報量とMLEの漸近分布」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。 → MLEではscore=0なので、$0\approx s(θ_0)+(θ̂-θ_0)ℓ\prime\prime(θ_0)$。 → scoreのCLTとHessianの大数則から漸近正規性を得る。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：有限標本で漸近近似が正確とは限らない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「Fisher情報量とMLEの漸近分布」の中心式 `\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「Fisher情報量とMLEの漸近分布」を数値実装する前提で、中心式 `\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「Fisher情報量とMLEの漸近分布」の中心式 `\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

有限標本で漸近近似が正確とは限らない。 / 境界パラメータや識別不能modelでは通常の正則条件が壊れる。

</details>

## 問題9

「Fisher情報量とMLEの漸近分布」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「Fisher情報量とMLEの漸近分布」について、定義 → 中心式 `\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/stat-fisher-information-asymptotic-mle)
