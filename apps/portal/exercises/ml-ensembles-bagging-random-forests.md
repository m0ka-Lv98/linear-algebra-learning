# baggingとrandom forest：演習

Course 08｜Topic 08/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/ml-ensembles-bagging-random-forests)

## 問1. 定義と記号

「baggingとrandom forest」の代表式

$$
\hat{f}(\mathbf{x})=\frac{1}{B}\sum_{b=1}^{B}f_b(\mathbf{x})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、baggingとrandom forestが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**average variance**

同variance σ²、pair correlationρならaverage variance≈ρσ²+(1-ρ)σ²/B。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：average variance

「baggingとrandom forest」で **average variance** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「average variance」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

同variance σ²、pair correlationρならaverage variance≈ρσ²+(1-ρ)σ²/B。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「B増加」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：B増加

「baggingとrandom forest」で **B増加** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「B増加」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

independent partは1/Bへ減るがcorrelated componentは残る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「feature randomness」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：feature randomness

「baggingとrandom forest」で **feature randomness** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「feature randomness」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

random forestはsplit候補featuresをsubset化しstrong common featureへの依存を減らしtree diversityを増す。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「baggingとrandom forest」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> correlation0ならB=100でvariance1/100。ρ=0.5ならlarge Bでも約0.5σ²が残る。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

correlation0ならB=100でvariance1/100。ρ=0.5ならlarge Bでも約0.5σ²が残る。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「baggingとrandom forest」のどの部分が変わるか説明せよ。

> out-of-bag samplesでinternal validation estimateを作れるがfinal testの代替ではない。

<details><summary>完全解答</summary>

out-of-bag samplesでinternal validation estimateを作れるがfinal testの代替ではない。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「baggingとrandom forest」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 深い木は過学習しやすい。
- feature importanceを因果効果とみなさない。
- baggingとrandom forestの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「baggingとrandom forest」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> n_estimatorsはparallelizable。random seedとbootstrap/feature fraction記録。

<details><summary>完全解答</summary>

n_estimatorsはparallelizable。random seedとbootstrap/feature fraction記録。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「baggingとrandom forest」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 平均ではなく前modelのmistake/residualへ次modelを逐次fitするboostingへ。

<details><summary>完全解答</summary>

平均ではなく前modelのmistake/residualへ次modelを逐次fitするboostingへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「baggingとrandom forest」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\hat{f}(\mathbf{x})=\frac{1}{B}\sum_{b=1}^{B}f_b(\mathbf{x})
$$

**導出**

1. **average variance** — 同variance σ²、pair correlationρならaverage variance≈ρσ²+(1-ρ)σ²/B。

2. **B増加** — independent partは1/Bへ減るがcorrelated componentは残る。

3. **feature randomness** — random forestはsplit候補featuresをsubset化しstrong common featureへの依存を減らしtree diversityを増す。

**数値・具体例**

correlation0ならB=100でvariance1/100。ρ=0.5ならlarge Bでも約0.5σ²が残る。

**条件を壊すと**

同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。

**実装**

n_estimatorsはparallelizable。random seedとbootstrap/feature fraction記録。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
