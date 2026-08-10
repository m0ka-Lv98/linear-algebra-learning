# Retrieval-Augmented Generation：演習

Course 10｜Topic 06/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/frontier-retrieval-augmented-generation)

## 問1. 定義と記号

「Retrieval-Augmented Generation」の代表式

$$
p(y\mid x)=\sum_{d\in\mathcal{D}_k}p(y\mid x,d)p(d\mid x)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、Retrieval-Augmented Generationが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**documentをlatent evidenceとみなす**

dが未確定ならtotal probabilityにより $p(y|x)=\sum_d p(y,d|x)=\sum_dp(y|x,d)p(d|x)$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：documentをlatent evidenceとみなす

「Retrieval-Augmented Generation」で **documentをlatent evidenceとみなす** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「documentをlatent evidenceとみなす」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

dが未確定ならtotal probabilityにより $p(y|x)=\sum_d p(y,d|x)=\sum_dp(y|x,d)p(d|x)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「top-k approximation」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：top-k approximation

「Retrieval-Augmented Generation」で **top-k approximation** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「top-k approximation」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

全corpus sumは不可能なのでretrieverが高score dだけ $\mathcal D_k$ へ絞る。ここでretrieval recall lossが入る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「context generation」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：context generation

「Retrieval-Augmented Generation」で **context generation** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「context generation」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

実systemではselected chunksをprompt/contextへ配置しgeneratorがcondition。retrieval failureとgeneration misuseを分離して評価する。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「Retrieval-Augmented Generation」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 質問に対しcorrect manual sectionがtop-3に入ればgeneratorは引用付き回答可能。top-k全てirrelevantならgeneratorだけで事実を回復する保証なし。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

質問に対しcorrect manual sectionがtop-3に入ればgeneratorは引用付き回答可能。top-k全てirrelevantならgeneratorだけで事実を回復する保証なし。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「Retrieval-Augmented Generation」のどの部分が変わるか説明せよ。

> kを増やすとrecallは上がるがcontext dilution/token cost/conflicting docsも増える。

<details><summary>完全解答</summary>

kを増やすとrecallは上がるがcontext dilution/token cost/conflicting docsも増える。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「Retrieval-Augmented Generation」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- retrieval失敗とgeneration失敗を分離評価する。
- 引用元がcontextに本当に存在するか確認する。
- Retrieval-Augmented Generationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「Retrieval-Augmented Generation」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> retrieval hit@k, MRR, answer correctness, citation supportを別metric。chunking/index version/corpus snapshotを記録。

<details><summary>完全解答</summary>

retrieval hit@k, MRR, answer correctness, citation supportを別metric。chunking/index version/corpus snapshotを記録。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「Retrieval-Augmented Generation」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> retrieverの基盤となるdense vector similarityとapproximate nearest-neighbor indexを次に分解する。

<details><summary>完全解答</summary>

retrieverの基盤となるdense vector similarityとapproximate nearest-neighbor indexを次に分解する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「Retrieval-Augmented Generation」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
p(y\mid x)=\sum_{d\in\mathcal{D}_k}p(y\mid x,d)p(d\mid x)
$$

**導出**

1. **documentをlatent evidenceとみなす** — dが未確定ならtotal probabilityにより $p(y|x)=\sum_d p(y,d|x)=\sum_dp(y|x,d)p(d|x)$。

2. **top-k approximation** — 全corpus sumは不可能なのでretrieverが高score dだけ $\mathcal D_k$ へ絞る。ここでretrieval recall lossが入る。

3. **context generation** — 実systemではselected chunksをprompt/contextへ配置しgeneratorがcondition。retrieval failureとgeneration misuseを分離して評価する。

**数値・具体例**

質問に対しcorrect manual sectionがtop-3に入ればgeneratorは引用付き回答可能。top-k全てirrelevantならgeneratorだけで事実を回復する保証なし。

**条件を壊すと**

RAGを使えばhallucinationが自動消滅するわけではない。retrieved evidenceを無視/誤解釈/誤引用し得る。

**実装**

retrieval hit@k, MRR, answer correctness, citation supportを別metric。chunking/index version/corpus snapshotを記録。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
