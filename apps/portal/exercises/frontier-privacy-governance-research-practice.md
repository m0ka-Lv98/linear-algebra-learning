# privacy・governance・研究実践：演習

Course 10｜Topic 20/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/frontier-privacy-governance-research-practice)

## 問1. 定義と記号

「privacy・governance・研究実践」の代表式

$$
\mathbb{P}(M(D)\in S)\le e^{\varepsilon}\mathbb{P}(M(D^{\prime})\in S)+\delta
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、privacy・governance・研究実践が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**neighbor comparison**

1人のrecord有無で $P(M(D)\in S)$ と $P(M(D\prime)\in S)$ を全Sで比較。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：neighbor comparison

「privacy・governance・研究実践」で **neighbor comparison** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「neighbor comparison」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

1人のrecord有無で $P(M(D)\in S)$ と $P(M(D\prime)\in S)$ を全Sで比較。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「multiplicative+additive bound」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：multiplicative+additive bound

「privacy・governance・研究実践」で **multiplicative+additive bound** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「multiplicative+additive bound」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$P_D(S)\le e^\varepsilon P_{D\prime}(S)+\delta$。ε小ほどdistributionsが近くsingle-record influenceを制限。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「composition」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：composition

「privacy・governance・研究実践」で **composition** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「composition」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

multiple DP mechanismsを同dataへ適用するとprivacy lossが累積するためbudget accountingが必要。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「privacy・governance・研究実践」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> DP-SGDはper-example gradient clipping+noiseでtraining mechanismのprivacyをboundし、accountantでεを算定。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

DP-SGDはper-example gradient clipping+noiseでtraining mechanismのprivacyをboundし、accountantでεを算定。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「privacy・governance・研究実践」のどの部分が変わるか説明せよ。

> model card/data sheet/eval reportでintended use, limitations, data provenance, known failuresをdocument。

<details><summary>完全解答</summary>

model card/data sheet/eval reportでintended use, limitations, data provenance, known failuresをdocument。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「privacy・governance・研究実践」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- privacy guaranteeとaccess controlを混同しない。
- policyは運用監査まで含めて実効性を持つ。
- privacy・governance・研究実践の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「privacy・governance・研究実践」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> privacy accountant assumptions、access logs、retention、consent/license、incident response、reproducible research artifact。

<details><summary>完全解答</summary>

privacy accountant assumptions、access logs、retention、consent/license、incident response、reproducible research artifact。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「privacy・governance・研究実践」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> Course 10の終点では、新手法を追う際も「定義→仮定→実験設計→uncertainty→failure mode→governance」の順序で検証する習慣を残す。

<details><summary>完全解答</summary>

Course 10の終点では、新手法を追う際も「定義→仮定→実験設計→uncertainty→failure mode→governance」の順序で検証する習慣を残す。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「privacy・governance・研究実践」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbb{P}(M(D)\in S)\le e^{\varepsilon}\mathbb{P}(M(D^{\prime})\in S)+\delta
$$

**導出**

1. **neighbor comparison** — 1人のrecord有無で $P(M(D)\in S)$ と $P(M(D\prime)\in S)$ を全Sで比較。

2. **multiplicative+additive bound** — $P_D(S)\le e^\varepsilon P_{D\prime}(S)+\delta$。ε小ほどdistributionsが近くsingle-record influenceを制限。

3. **composition** — multiple DP mechanismsを同dataへ適用するとprivacy lossが累積するためbudget accountingが必要。

**数値・具体例**

DP-SGDはper-example gradient clipping+noiseでtraining mechanismのprivacyをboundし、accountantでεを算定。

**条件を壊すと**

「dataを匿名化した」だけでre-identification riskがゼロとは限らない。DP guaranteeとheuristic de-identificationを区別。

**実装**

privacy accountant assumptions、access logs、retention、consent/license、incident response、reproducible research artifact。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
