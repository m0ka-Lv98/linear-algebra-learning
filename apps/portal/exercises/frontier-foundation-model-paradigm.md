# Foundation modelの設計原理：演習

Course 10｜Topic 01/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/frontier-foundation-model-paradigm)

## 問1. 定義と記号

「Foundation modelの設計原理」の代表式

$$
p_\theta(x_1,\ldots,x_T)=\prod_{t=1}^{T}p_\theta(x_t\mid x_{<t})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、Foundation modelの設計原理が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**probability chain rule**

$p(x_1,\ldots,x_T)=p(x_1)p(x_2|x_1)\cdots p(x_T|x_{<T})$。独立仮定ではなく確率のchain rule。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：probability chain rule

「Foundation modelの設計原理」で **probability chain rule** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「probability chain rule」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$p(x_1,\ldots,x_T)=p(x_1)p(x_2|x_1)\cdots p(x_T|x_{<T})$。独立仮定ではなく確率のchain rule。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「training loss」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：training loss

「Foundation modelの設計原理」で **training loss** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「training loss」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

negative logを取ると積が和へ変わり $-\sum_t\log p_\theta(x_t|x_{<t})$。teacher forcingで各positionをsupervisionとして使える。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「generation」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：generation

「Foundation modelの設計原理」で **generation** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「generation」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

推論時はmodel predictionから次tokenを選びcontextへ追加し、再びconditionalを計算する。このautoregressive loopがtrainingのparallel next-token evaluationと異なる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「Foundation modelの設計原理」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 3-token sequence probabilityはp(x1)p(x2|x1)p(x3|x1,x2)。各factorが低ければjointも低くなる。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

3-token sequence probabilityはp(x1)p(x2|x1)p(x3|x1,x2)。各factorが低ければjointも低くなる。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「Foundation modelの設計原理」のどの部分が変わるか説明せよ。

> same pretrained modelをclassification, generation, retrieval-augmented taskへprompt/fine-tuneしてadaptするのがfoundation paradigm。

<details><summary>完全解答</summary>

same pretrained modelをclassification, generation, retrieval-augmented taskへprompt/fine-tuneしてadaptするのがfoundation paradigm。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「Foundation modelの設計原理」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 事前学習lossの改善と下流能力は一対一ではない。
- data/model/computeの相互依存を見る。
- Foundation modelの設計原理の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「Foundation modelの設計原理」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> token-level cross entropy、padding mask、context truncation、data deduplicationを記録。generationはtemperature/top-p等decoder settingで出力distributionが変わる。

<details><summary>完全解答</summary>

token-level cross entropy、padding mask、context truncation、data deduplicationを記録。generationはtemperature/top-p等decoder settingで出力distributionが変わる。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「Foundation modelの設計原理」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> next-token modelが扱う最小単位tokenと、そのembedding/context representationを次に理解する。

<details><summary>完全解答</summary>

next-token modelが扱う最小単位tokenと、そのembedding/context representationを次に理解する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「Foundation modelの設計原理」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
p_\theta(x_1,\ldots,x_T)=\prod_{t=1}^{T}p_\theta(x_t\mid x_{<t})
$$

**導出**

1. **probability chain rule** — $p(x_1,\ldots,x_T)=p(x_1)p(x_2|x_1)\cdots p(x_T|x_{<T})$。独立仮定ではなく確率のchain rule。

2. **training loss** — negative logを取ると積が和へ変わり $-\sum_t\log p_\theta(x_t|x_{<t})$。teacher forcingで各positionをsupervisionとして使える。

3. **generation** — 推論時はmodel predictionから次tokenを選びcontextへ追加し、再びconditionalを計算する。このautoregressive loopがtrainingのparallel next-token evaluationと異なる。

**数値・具体例**

3-token sequence probabilityはp(x1)p(x2|x1)p(x3|x1,x2)。各factorが低ければjointも低くなる。

**条件を壊すと**

next-token likelihoodが高いこととfactual correctness/safety/task successは同義でない。training objectiveとdownstream metricを区別する。

**実装**

token-level cross entropy、padding mask、context truncation、data deduplicationを記録。generationはtemperature/top-p等decoder settingで出力distributionが変わる。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
