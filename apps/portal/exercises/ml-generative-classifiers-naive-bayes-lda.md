# 生成的分類器・Naive Bayes・LDA：演習

Course 08｜Topic 05/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/ml-generative-classifiers-naive-bayes-lda)

## 問1. 定義と記号

「生成的分類器・Naive Bayes・LDA」の代表式

$$
p(y\mid\mathbf{x})\propto p(\mathbf{x}\mid y)p(y)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、生成的分類器・Naive Bayes・LDAが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**Bayes decision**

$argmax_y p(y|x)=argmax_y p(x|y)p(y)$ because p(x) common。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：Bayes decision

「生成的分類器・Naive Bayes・LDA」で **Bayes decision** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「Bayes decision」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$argmax_y p(y|x)=argmax_y p(x|y)p(y)$ because p(x) common。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「Naive factorization」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：Naive factorization

「生成的分類器・Naive Bayes・LDA」で **Naive factorization** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「Naive factorization」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

conditional independence仮定で $p(x|y)=\prod_jp(x_j|y)$。高dim density estimationを1D factorsへ簡略化。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「LDA linear boundary」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：LDA linear boundary

「生成的分類器・Naive Bayes・LDA」で **LDA linear boundary** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「LDA linear boundary」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

Gaussian log densityのquadratic x^TΣ^{-1}x項がshared covarianceでclass間cancelし、xのlinear termだけ残る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「生成的分類器・Naive Bayes・LDA」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> text Naive Bayesでword occurrence likelihoodをclassごとに掛ける。log domainでsum。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

text Naive Bayesでword occurrence likelihoodをclassごとに掛ける。log domainでsum。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「生成的分類器・Naive Bayes・LDA」のどの部分が変わるか説明せよ。

> LDAでcovarianceをclass別にするとquadratic termがcancelせずQDA boundary。

<details><summary>完全解答</summary>

LDAでcovarianceをclass別にするとquadratic termがcancelせずQDA boundary。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「生成的分類器・Naive Bayes・LDA」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- 生成的分類器・Naive Bayes・LDAの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「生成的分類器・Naive Bayes・LDA」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> zero countにsmoothing。Gaussian covariance singularならregularization。

<details><summary>完全解答</summary>

zero countにsmoothing。Gaussian covariance singularならregularization。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「生成的分類器・Naive Bayes・LDA」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> parametric distributionを置かず近傍dataから直接predictするkNNへ。

<details><summary>完全解答</summary>

parametric distributionを置かず近傍dataから直接predictするkNNへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「生成的分類器・Naive Bayes・LDA」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
p(y\mid\mathbf{x})\propto p(\mathbf{x}\mid y)p(y)
$$

**導出**

1. **Bayes decision** — $argmax_y p(y|x)=argmax_y p(x|y)p(y)$ because p(x) common。

2. **Naive factorization** — conditional independence仮定で $p(x|y)=\prod_jp(x_j|y)$。高dim density estimationを1D factorsへ簡略化。

3. **LDA linear boundary** — Gaussian log densityのquadratic x^TΣ^{-1}x項がshared covarianceでclass間cancelし、xのlinear termだけ残る。

**数値・具体例**

text Naive Bayesでword occurrence likelihoodをclassごとに掛ける。log domainでsum。

**条件を壊すと**

Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。

**実装**

zero countにsmoothing。Gaussian covariance singularならregularization。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
