# 数値計算の検証・benchmark・再現性：演習

Course 05｜Topic 20/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-verification-benchmarking-reproducibility)

## 問1. 定義と記号

「数値計算の検証・benchmark・再現性」の代表式

$$
E(h)\approx Ch^p
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、数値計算の検証・benchmark・再現性が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**2つの解像度を比較**

$E(h)=Ch^p$, $E(h/2)=C(h/2)^p$。比は $E(h)/E(h/2)=2^p$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：2つの解像度を比較

「数値計算の検証・benchmark・再現性」で **2つの解像度を比較** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「2つの解像度を比較」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$E(h)=Ch^p$, $E(h/2)=C(h/2)^p$。比は $E(h)/E(h/2)=2^p$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「observed order」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：observed order

「数値計算の検証・benchmark・再現性」で **observed order** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「observed order」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$p\approx\log_2(E(h)/E(h/2))$。複数hでasymptotic regimeを確認する。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「benchmarkを分離」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：benchmarkを分離

「数値計算の検証・benchmark・再現性」で **benchmarkを分離** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「benchmarkを分離」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

correctness/accuracy確認の後にtime/memoryを測る。速いが誤った実装をperformance winnerにしない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「数値計算の検証・benchmark・再現性」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> E(h)=1e-2, E(h/2)=2.5e-3なら比4なのでobserved p=2。二次法の期待と一致。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

E(h)=1e-2, E(h/2)=2.5e-3なら比4なのでobserved p=2。二次法の期待と一致。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「数値計算の検証・benchmark・再現性」のどの部分が変わるか説明せよ。

> 粗いhではasymptotic orderが出ず、極小hではroundoff支配。中間rangeでslopeを評価する。

<details><summary>完全解答</summary>

粗いhではasymptotic orderが出ず、極小hではroundoff支配。中間rangeでslopeを評価する。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「数値計算の検証・benchmark・再現性」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 残差が小さくても誤差が小さいとは限らない。
- 停止条件は絶対・相対誤差を考える。
- 数値計算の検証・benchmark・再現性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「数値計算の検証・benchmark・再現性」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> environment lock、seed、dtype、tolerance、version、hardwareをmanifestへ残す。reference implementationとproperty testを併用する。

<details><summary>完全解答</summary>

environment lock、seed、dtype、tolerance、version、hardwareをmanifestへ残す。reference implementationとproperty testを併用する。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「数値計算の検証・benchmark・再現性」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> この検証文化はCourse06以降のoptimization/MLでも同じ。lossが下がるだけでなくoptimality residualやheld-out metricを検証する。

<details><summary>完全解答</summary>

この検証文化はCourse06以降のoptimization/MLでも同じ。lossが下がるだけでなくoptimality residualやheld-out metricを検証する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「数値計算の検証・benchmark・再現性」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
E(h)\approx Ch^p
$$

**導出**

1. **2つの解像度を比較** — $E(h)=Ch^p$, $E(h/2)=C(h/2)^p$。比は $E(h)/E(h/2)=2^p$。

2. **observed order** — $p\approx\log_2(E(h)/E(h/2))$。複数hでasymptotic regimeを確認する。

3. **benchmarkを分離** — correctness/accuracy確認の後にtime/memoryを測る。速いが誤った実装をperformance winnerにしない。

**数値・具体例**

E(h)=1e-2, E(h/2)=2.5e-3なら比4なのでobserved p=2。二次法の期待と一致。

**条件を壊すと**

単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。

**実装**

environment lock、seed、dtype、tolerance、version、hardwareをmanifestへ残す。reference implementationとproperty testを併用する。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
