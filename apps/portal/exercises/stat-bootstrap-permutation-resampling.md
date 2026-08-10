# bootstrap・permutation・再標本化：演習

Course 03｜確率統計

## 問題1

中心式 `$\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

解析的な標本分布が難しい統計量の不確実性を、データからどう近似するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

bootstrapは観測された経験分布を「仮の母集団」として復元抽出し、統計量を何度も計算する。permutation testは帰無仮説下で交換可能なラベルを並べ替えて帰無分布を作る。

</details>

## 問題3

次の例を途中計算込みで再現せよ：中央値の標準誤差は閉形式が扱いにくいことがある。bootstrapで中央値をB回計算し、その標準偏差をSEとして使う。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「bootstrap・permutation・再標本化」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

経験分布 $\hat F_n$ を作る。 → $\hat F_n$ からサイズnの標本を復元抽出する。 → 各標本でT*を計算し、その分布を未知のsampling distributionの近似に使う。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：時系列やcluster dataをiid bootstrapしない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「bootstrap・permutation・再標本化」の中心式 `\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「bootstrap・permutation・再標本化」を数値実装する前提で、中心式 `\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「bootstrap・permutation・再標本化」の中心式 `\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

時系列やcluster dataをiid bootstrapしない。 / bootstrap回数を増やしても元標本のbiasが自動で消えるわけではない。

</details>

## 問題9

「bootstrap・permutation・再標本化」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「bootstrap・permutation・再標本化」について、定義 → 中心式 `\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/stat-bootstrap-permutation-resampling)
