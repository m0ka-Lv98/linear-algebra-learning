# 独立成分分析：演習

Course 07｜Topic 15/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/mat-ica-independent-components)

## 問1. 定義と記号

「独立成分分析」の代表式

$$
\mathbf{x}=\mathbf{A}\mathbf{s}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、独立成分分析が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**whiteningでsecond-orderを除く**

center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：whiteningでsecond-orderを除く

「独立成分分析」で **whiteningでsecond-orderを除く** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「whiteningでsecond-orderを除く」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「なぜnon-Gaussianity」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：なぜnon-Gaussianity

「独立成分分析」で **なぜnon-Gaussianity** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「なぜnon-Gaussianity」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

Gaussian sourcesのorthogonal rotationは同じjoint Gaussianとなりindependenceだけで方向を識別できない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「objective」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：objective

「独立成分分析」で **objective** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「objective」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

kurtosis/negentropy/mutual information等を使いnon-Gaussian independent directionsを探す。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「独立成分分析」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「独立成分分析」のどの部分が変わるか説明せよ。

> PCAはuncorrelated、ICAはより強いindependenceを狙う。

<details><summary>完全解答</summary>

PCAはuncorrelated、ICAはより強いindependenceを狙う。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「独立成分分析」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 非一意性がある。
- 制約（非負、独立など）が解釈を決める。
- 独立成分分析の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「独立成分分析」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> component scale/order/sign arbitrary。prewhitening、nonlinearity choice、convergenceを確認。

<details><summary>完全解答</summary>

component scale/order/sign arbitrary。prewhitening、nonlinearity choice、convergenceを確認。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「独立成分分析」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 2 data viewsの線形combination間のcorrelationを最大化するCCAへ。

<details><summary>完全解答</summary>

2 data viewsの線形combination間のcorrelationを最大化するCCAへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「独立成分分析」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{x}=\mathbf{A}\mathbf{s}
$$

**導出**

1. **whiteningでsecond-orderを除く** — center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。

2. **なぜnon-Gaussianity** — Gaussian sourcesのorthogonal rotationは同じjoint Gaussianとなりindependenceだけで方向を識別できない。

3. **objective** — kurtosis/negentropy/mutual information等を使いnon-Gaussian independent directionsを探す。

**数値・具体例**

2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

**条件を壊すと**

全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

**実装**

component scale/order/sign arbitrary。prewhitening、nonlinearity choice、convergenceを確認。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
