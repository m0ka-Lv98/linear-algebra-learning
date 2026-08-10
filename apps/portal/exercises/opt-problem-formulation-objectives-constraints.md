# 最適化問題の定式化：演習

Course 06｜Topic 01/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/opt-problem-formulation-objectives-constraints)

## 問1. 定義と記号

「最適化問題の定式化」の代表式

$$
\min_{\mathbf{x}\in\mathcal{X}} f(\mathbf{x})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、最適化問題の定式化が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**現実の選択を変数へ写す**

制御量・parameter・配分量をvector xへまとめる。観測値やfixed constantはdecision variableに入れない。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：現実の選択を変数へ写す

「最適化問題の定式化」で **現実の選択を変数へ写す** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「現実の選択を変数へ写す」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

制御量・parameter・配分量をvector xへまとめる。観測値やfixed constantはdecision variableに入れない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「評価基準をscalarへ」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：評価基準をscalarへ

「最適化問題の定式化」で **評価基準をscalarへ** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「評価基準をscalarへ」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

複数の望ましさを目的関数fへ写す。maximizeは符号を反転してminimizeへ統一できる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「許容条件を集合へ」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：許容条件を集合へ

「最適化問題の定式化」で **許容条件を集合へ** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「許容条件を集合へ」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

物理・予算・確率等の条件をXへ集める。最適解とはX内でfを最小にする点で、feasibleでない低f点は候補外。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「最適化問題の定式化」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 配分x1,x2≥0, x1+x2=100, cost=3x1+5x2を最小化。変数・制約・目的を分けるだけで「何を解くか」が明確。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

配分x1,x2≥0, x1+x2=100, cost=3x1+5x2を最小化。変数・制約・目的を分けるだけで「何を解くか」が明確。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「最適化問題の定式化」のどの部分が変わるか説明せよ。

> 回帰はx=係数、f=training loss、constraintなし/regularization付きと見なせる。model choiceとoptimization problemを区別する。

<details><summary>完全解答</summary>

回帰はx=係数、f=training loss、constraintなし/regularization付きと見なせる。model choiceとoptimization problemを区別する。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「最適化問題の定式化」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 目的関数と評価指標を混同しない。
- 制約の単位・スケールを揃える。
- 最適化問題の定式化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「最適化問題の定式化」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> scaleの違うobjective項を足す場合、weightの単位と意味を記録。solverへ渡す前にfeasibility checkとgradient shapeをtestする。

<details><summary>完全解答</summary>

scaleの違うobjective項を足す場合、weightの単位と意味を記録。solverへ渡す前にfeasibility checkとgradient shapeをtestする。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「最適化問題の定式化」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 次に、問題がconvexなら局所情報からglobal optimumを保証しやすくなるため、集合と関数のconvexityを定義する。

<details><summary>完全解答</summary>

次に、問題がconvexなら局所情報からglobal optimumを保証しやすくなるため、集合と関数のconvexityを定義する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「最適化問題の定式化」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\min_{\mathbf{x}\in\mathcal{X}} f(\mathbf{x})
$$

**導出**

1. **現実の選択を変数へ写す** — 制御量・parameter・配分量をvector xへまとめる。観測値やfixed constantはdecision variableに入れない。

2. **評価基準をscalarへ** — 複数の望ましさを目的関数fへ写す。maximizeは符号を反転してminimizeへ統一できる。

3. **許容条件を集合へ** — 物理・予算・確率等の条件をXへ集める。最適解とはX内でfを最小にする点で、feasibleでない低f点は候補外。

**数値・具体例**

配分x1,x2≥0, x1+x2=100, cost=3x1+5x2を最小化。変数・制約・目的を分けるだけで「何を解くか」が明確。

**条件を壊すと**

目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。

**実装**

scaleの違うobjective項を足す場合、weightの単位と意味を記録。solverへ渡す前にfeasibility checkとgradient shapeをtestする。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
