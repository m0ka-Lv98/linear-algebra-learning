# activation関数とloss：演習

Course 09｜Topic 03/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/dl-activation-loss-functions)

## 問1. 定義と記号

「activation関数とloss」の代表式

$$
\operatorname{ReLU}(x)=\max(0,x)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、activation関数とlossが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**ReLU derivative**

x>0でderivative1、x<0で0。x=0はsubgradient/convention。positive regionでsaturationしない。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：ReLU derivative

「activation関数とloss」で **ReLU derivative** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「ReLU derivative」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

x>0でderivative1、x<0で0。x=0はsubgradient/convention。positive regionでsaturationしない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「binary CE from likelihood」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：binary CE from likelihood

「activation関数とloss」で **binary CE from likelihood** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「binary CE from likelihood」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

Bernoulli likelihood $p^y(1-p)^{1-y}$ のnegative logが $-y\log p-(1-y)\log(1-p)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「logit gradient」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：logit gradient

「activation関数とloss」で **logit gradient** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「logit gradient」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

p=σ(z)とCEを合成すると $dL/dz=p-y$。chain ruleでsigmoid derivativeが整理され、numerically stable fused lossが使える。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「activation関数とloss」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> z=0,y=1ならp=0.5, gradient p-y=-0.5でzを上げる方向。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

z=0,y=1ならp=0.5, gradient p-y=-0.5でzを上げる方向。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「activation関数とloss」のどの部分が変わるか説明せよ。

> tanhはboundedでzero-centeredだがlarge |z|でderivativeが小さくsaturation。

<details><summary>完全解答</summary>

tanhはboundedでzero-centeredだがlarge |z|でderivativeが小さくsaturation。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「activation関数とloss」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 出力層のactivationとlossの組合せを確認する。
- 飽和領域でgradientが小さくなる。
- activation関数とlossの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「activation関数とloss」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> BCEWithLogits/CrossEntropyLossを使いlog(0)回避。reduction(mean/sum)でgradient scaleが変わる。

<details><summary>完全解答</summary>

BCEWithLogits/CrossEntropyLossを使いlog(0)回避。reduction(mean/sum)でgradient scaleが変わる。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「activation関数とloss」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> deep layersでsignal/gradient scaleを保つためinitializationとnormalizationへ。

<details><summary>完全解答</summary>

deep layersでsignal/gradient scaleを保つためinitializationとnormalizationへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「activation関数とloss」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\operatorname{ReLU}(x)=\max(0,x)
$$

**導出**

1. **ReLU derivative** — x>0でderivative1、x<0で0。x=0はsubgradient/convention。positive regionでsaturationしない。

2. **binary CE from likelihood** — Bernoulli likelihood $p^y(1-p)^{1-y}$ のnegative logが $-y\log p-(1-y)\log(1-p)$。

3. **logit gradient** — p=σ(z)とCEを合成すると $dL/dz=p-y$。chain ruleでsigmoid derivativeが整理され、numerically stable fused lossが使える。

**数値・具体例**

z=0,y=1ならp=0.5, gradient p-y=-0.5でzを上げる方向。

**条件を壊すと**

classificationでMSEが常に間違いではないが、Bernoulli/categorical likelihoodとの対応やgradient特性がcross entropyと異なる。

**実装**

BCEWithLogits/CrossEntropyLossを使いlog(0)回避。reduction(mean/sum)でgradient scaleが変わる。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
