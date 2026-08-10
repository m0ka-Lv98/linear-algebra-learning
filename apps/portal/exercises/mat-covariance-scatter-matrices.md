# 共分散行列とscatter matrix：演習

Course 07｜Topic 02/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/mat-covariance-scatter-matrices)

## 問1. 定義と記号

「共分散行列とscatter matrix」の代表式

$$
\mathbf{S}=\frac{1}{n-1}\mathbf{X}_c^{\mathsf T}\mathbf{X}_c
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、共分散行列とscatter matrixが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**entryを展開**

$(X_c^TX_c)_{jk}=\sum_i(X_{ij}-\mu_j)(X_{ik}-\mu_k)$。これはsample covariance numerator。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：entryを展開

「共分散行列とscatter matrix」で **entryを展開** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「entryを展開」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$(X_c^TX_c)_{jk}=\sum_i(X_{ij}-\mu_j)(X_{ik}-\mu_k)$。これはsample covariance numerator。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「quadratic form」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：quadratic form

「共分散行列とscatter matrix」で **quadratic form** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「quadratic form」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$v^TSv=(n-1)^{-1}\|X_cv\|²\ge0$ なのでPSD。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「directional variance」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：directional variance

「共分散行列とscatter matrix」で **directional variance** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「directional variance」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$X_cv$ は各sampleをdirection vへprojectしたscore。したがって $v^TSv$ はそのscore variance。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「共分散行列とscatter matrix」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 2 featuresが完全に同じならcovariance matrixはrank1。difference direction (1,-1)のvarianceは0。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

2 featuresが完全に同じならcovariance matrixはrank1。difference direction (1,-1)のvarianceは0。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「共分散行列とscatter matrix」のどの部分が変わるか説明せよ。

> featureを標準化してからcovarianceを取るとcorrelation matrixになる。

<details><summary>完全解答</summary>

featureを標準化してからcovarianceを取るとcorrelation matrixになる。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「共分散行列とscatter matrix」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 相関0でも一般には独立とは限らない。
- 共分散はスケール依存。
- 共分散行列とscatter matrixの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「共分散行列とscatter matrix」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> n<pではsample covarianceはrank≤n-1でsingular。inverseを必要とする手法でregularizationが必要。

<details><summary>完全解答</summary>

n<pではsample covarianceはrank≤n-1でsingular。inverseを必要とする手法でregularizationが必要。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「共分散行列とscatter matrix」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> directional varianceを最大化する方向を選ぶとPCA eigenproblemが自然に出る。

<details><summary>完全解答</summary>

directional varianceを最大化する方向を選ぶとPCA eigenproblemが自然に出る。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「共分散行列とscatter matrix」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{S}=\frac{1}{n-1}\mathbf{X}_c^{\mathsf T}\mathbf{X}_c
$$

**導出**

1. **entryを展開** — $(X_c^TX_c)_{jk}=\sum_i(X_{ij}-\mu_j)(X_{ik}-\mu_k)$。これはsample covariance numerator。

2. **quadratic form** — $v^TSv=(n-1)^{-1}\|X_cv\|²\ge0$ なのでPSD。

3. **directional variance** — $X_cv$ は各sampleをdirection vへprojectしたscore。したがって $v^TSv$ はそのscore variance。

**数値・具体例**

2 featuresが完全に同じならcovariance matrixはrank1。difference direction (1,-1)のvarianceは0。

**条件を壊すと**

centerせず $X^TX$ をcovarianceと呼ぶとmean成分を含むsecond momentになる。

**実装**

n<pではsample covarianceはrank≤n-1でsingular。inverseを必要とする手法でregularizationが必要。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
