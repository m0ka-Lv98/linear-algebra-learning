# 分割統治法とMaster theorem：演習

Course 04｜Topic 15/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/dm-divide-conquer-master-theorem)

## 問1. 定義と記号

「分割統治法とMaster theorem」の代表式

$$
T(n)=aT(n/b)+f(n)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、分割統治法とMaster theoremが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**再帰木のlevel k**

node数はa^k、各sizeはn/b^k。leaf depthは $\log_b n$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：再帰木のlevel k

「分割統治法とMaster theorem」で **再帰木のlevel k** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「再帰木のlevel k」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

node数はa^k、各sizeはn/b^k。leaf depthは $\log_b n$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「leaf総数」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：leaf総数

「分割統治法とMaster theorem」で **leaf総数** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「leaf総数」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

最下層node数は $a^{\log_b n}=n^{\log_b a}$。これが再帰部分の自然な基準。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「f(n)との比較」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：f(n)との比較

「分割統治法とMaster theorem」で **f(n)との比較** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「f(n)との比較」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

fが基準より小さければleaf支配、同程度なら各level同程度でlog因子、大きければroot側支配（regularity条件付き）。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「分割統治法とMaster theorem」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> Merge sort: a=2,b=2,f(n)=n。基準 $n^{\log_2 2}=n$ と同じなのでΘ(n log n)。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

Merge sort: a=2,b=2,f(n)=n。基準 $n^{\log_2 2}=n$ と同じなのでΘ(n log n)。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「分割統治法とMaster theorem」のどの部分が変わるか説明せよ。

> Binary search: a=1,b=2,f(n)=1。基準1と同じでΘ(log n)。

<details><summary>完全解答</summary>

Binary search: a=1,b=2,f(n)=1。基準1と同じでΘ(log n)。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「分割統治法とMaster theorem」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- O記法は等号ではなく上界の集合。
- 小さいnで速いことと漸近的に速いことは別。
- 分割統治法とMaster theoremの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「分割統治法とMaster theorem」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> 実際のdivide-and-conquerではcopy costやcache localityがf(n)へ入る。漸近orderが同じ実装でも定数差が大きい。

<details><summary>完全解答</summary>

実際のdivide-and-conquerではcopy costやcache localityがf(n)へ入る。漸近orderが同じ実装でも定数差が大きい。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「分割統治法とMaster theorem」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 計算量解析の道具を得たので、次はgraphという離散構造の基本量へ進む。

<details><summary>完全解答</summary>

計算量解析の道具を得たので、次はgraphという離散構造の基本量へ進む。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「分割統治法とMaster theorem」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
T(n)=aT(n/b)+f(n)
$$

**導出**

1. **再帰木のlevel k** — node数はa^k、各sizeはn/b^k。leaf depthは $\log_b n$。

2. **leaf総数** — 最下層node数は $a^{\log_b n}=n^{\log_b a}$。これが再帰部分の自然な基準。

3. **f(n)との比較** — fが基準より小さければleaf支配、同程度なら各level同程度でlog因子、大きければroot側支配（regularity条件付き）。

**数値・具体例**

Merge sort: a=2,b=2,f(n)=n。基準 $n^{\log_2 2}=n$ と同じなのでΘ(n log n)。

**条件を壊すと**

Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。

**実装**

実際のdivide-and-conquerではcopy costやcache localityがf(n)へ入る。漸近orderが同じ実装でも定数差が大きい。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
