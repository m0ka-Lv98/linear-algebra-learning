# SVM・margin・kernel：演習

Course 08｜Topic 10/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/ml-svm-margin-kernels)

## 問1. 定義と記号

「SVM・margin・kernel」の代表式

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、SVM・margin・kernelが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**distance to hyperplane**

point xのsigned distanceは $(w^Tx+b)/||w||$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：distance to hyperplane

「SVM・margin・kernel」で **distance to hyperplane** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「distance to hyperplane」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

point xのsigned distanceは $(w^Tx+b)/||w||$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「scale ambiguity除去」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：scale ambiguity除去

「SVM・margin・kernel」で **scale ambiguity除去** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「scale ambiguity除去」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

(cw,cb)はsame boundaryなのでclosest pointsのfunctional marginを1へnormalize。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「margin width」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：margin width

「SVM・margin・kernel」で **margin width** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「margin width」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

closest positive/negative hyperplanes distanceは2/||w||。maximizing margin= minimizing ||w||²/2。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「SVM・margin・kernel」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「SVM・margin・kernel」のどの部分が変わるか説明せよ。

> nonseparableはslack ξとC penaltyのsoft margin。C largeはviolation重視。

<details><summary>完全解答</summary>

nonseparableはslack ξとC penaltyのsoft margin。C largeはviolation重視。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「SVM・margin・kernel」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- kernel matrixの正定値性を確認する。
- scale parameterで境界の複雑さが変わる。
- SVM・margin・kernelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「SVM・margin・kernel」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> dual/kernel solver vs linear primal solverをn,pで選ぶ。C/γをvalidation。

<details><summary>完全解答</summary>

dual/kernel solver vs linear primal solverをn,pで選ぶ。C/γをvalidation。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「SVM・margin・kernel」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> dual内でdataはinner productsだけに現れ、kernel trickが可能になる。

<details><summary>完全解答</summary>

dual内でdataはinner productsだけに現れ、kernel trickが可能になる。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「SVM・margin・kernel」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

**導出**

1. **distance to hyperplane** — point xのsigned distanceは $(w^Tx+b)/||w||$。

2. **scale ambiguity除去** — (cw,cb)はsame boundaryなのでclosest pointsのfunctional marginを1へnormalize。

3. **margin width** — closest positive/negative hyperplanes distanceは2/||w||。maximizing margin= minimizing ||w||²/2。

**数値・具体例**

2D separable pointsでsupport vectorsだけがboundary位置を決め、far pointsはconstraint slack無しなら影響しない。

**条件を壊すと**

feature scalingでEuclidean margin geometryが変わる。unscaled featureでSVM resultが大きく変化。

**実装**

dual/kernel solver vs linear primal solverをn,pで選ぶ。C/γをvalidation。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
