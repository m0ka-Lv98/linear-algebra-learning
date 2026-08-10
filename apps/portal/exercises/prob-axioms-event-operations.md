# 確率の公理と事象の演算：演習

Course 03｜Topic 02/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/prob-axioms-event-operations)

## 問1. 定義と記号

「確率の公理と事象の演算」の代表式

$$
\mathbb{P}(A\cup B)=\mathbb{P}(A)+\mathbb{P}(B)-\mathbb{P}(A\cap B)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、確率の公理と事象の演算が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**和集合を重複しない部分へ分ける**

$A\cup B=A\cup(B\setminus A)$ で、この2部分は排反。したがって $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B\setminus A)$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：和集合を重複しない部分へ分ける

「確率の公理と事象の演算」で **和集合を重複しない部分へ分ける** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「和集合を重複しない部分へ分ける」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$A\cup B=A\cup(B\setminus A)$ で、この2部分は排反。したがって $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B\setminus A)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「Bを同じように分解する」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：Bを同じように分解する

「確率の公理と事象の演算」で **Bを同じように分解する** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「Bを同じように分解する」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$B=(B\setminus A)\cup(A\cap B)$ も排反なので $\mathbb P(B)=\mathbb P(B\setminus A)+\mathbb P(A\cap B)$。よって $\mathbb P(B\setminus A)=\mathbb P(B)-\mathbb P(A\cap B)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「代入して包含排除を得る」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：代入して包含排除を得る

「確率の公理と事象の演算」で **代入して包含排除を得る** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「代入して包含排除を得る」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

前二式を合わせて $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)-\mathbb P(A\cap B)$。交わりを引くのは、AとBを足した時に二重計上した部分を一回戻すため。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「確率の公理と事象の演算」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $\mathbb P(A)=0.6$, $\mathbb P(B)=0.5$, $\mathbb P(A\cap B)=0.2$ なら、和事象は $0.6+0.5-0.2=0.9$。単純に1.1とするのは二重計上。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$\mathbb P(A)=0.6$, $\mathbb P(B)=0.5$, $\mathbb P(A\cap B)=0.2$ なら、和事象は $0.6+0.5-0.2=0.9$。単純に1.1とするのは二重計上。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「確率の公理と事象の演算」のどの部分が変わるか説明せよ。

> AとBが排反なら $A\cap B=\varnothing$ なので交わりの確率は0となり、加法則 $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)$ に戻る。

<details><summary>完全解答</summary>

AとBが排反なら $A\cap B=\varnothing$ なので交わりの確率は0となり、加法則 $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)$ に戻る。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「確率の公理と事象の演算」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 排反と独立は別概念。
- 確率は事象に対して定義される。
- 確率の公理と事象の演算の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「確率の公理と事象の演算」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> simulationで事象をboolean配列として表すと、unionはOR、intersectionはAND。有限標本で相対頻度を使い、公理から導いた恒等式が近似的に成立するか確認できる。

<details><summary>完全解答</summary>

simulationで事象をboolean配列として表すと、unionはOR、intersectionはAND。有限標本で相対頻度を使い、公理から導いた恒等式が近似的に成立するか確認できる。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「確率の公理と事象の演算」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 公理から補集合、単調性、Booleの不等式など多くの性質を導ける。次Topicでは交わりを「Bが起きた世界の中」で再正規化して条件付き確率を定義する。

<details><summary>完全解答</summary>

公理から補集合、単調性、Booleの不等式など多くの性質を導ける。次Topicでは交わりを「Bが起きた世界の中」で再正規化して条件付き確率を定義する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「確率の公理と事象の演算」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbb{P}(A\cup B)=\mathbb{P}(A)+\mathbb{P}(B)-\mathbb{P}(A\cap B)
$$

**導出**

1. **和集合を重複しない部分へ分ける** — $A\cup B=A\cup(B\setminus A)$ で、この2部分は排反。したがって $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B\setminus A)$。

2. **Bを同じように分解する** — $B=(B\setminus A)\cup(A\cap B)$ も排反なので $\mathbb P(B)=\mathbb P(B\setminus A)+\mathbb P(A\cap B)$。よって $\mathbb P(B\setminus A)=\mathbb P(B)-\mathbb P(A\cap B)$。

3. **代入して包含排除を得る** — 前二式を合わせて $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)-\mathbb P(A\cap B)$。交わりを引くのは、AとBを足した時に二重計上した部分を一回戻すため。

**数値・具体例**

$\mathbb P(A)=0.6$, $\mathbb P(B)=0.5$, $\mathbb P(A\cap B)=0.2$ なら、和事象は $0.6+0.5-0.2=0.9$。単純に1.1とするのは二重計上。

**条件を壊すと**

「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。

**実装**

simulationで事象をboolean配列として表すと、unionはOR、intersectionはAND。有限標本で相対頻度を使い、公理から導いた恒等式が近似的に成立するか確認できる。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
