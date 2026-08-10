# 離散確率・指示変数・乱択アルゴリズム：演習

Course 04｜Topic 20/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/dm-discrete-probability-indicators-randomized-algorithms)

## 問1. 定義と記号

「離散確率・指示変数・乱択アルゴリズム」の代表式

$$
\mathbb{E}[I_A]=\mathbb{P}(A)
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、離散確率・指示変数・乱択アルゴリズムが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**indicatorの期待値**

$E[I_A]=1·P(A)+0·P(A^c)=P(A)$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：indicatorの期待値

「離散確率・指示変数・乱択アルゴリズム」で **indicatorの期待値** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「indicatorの期待値」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$E[I_A]=1·P(A)+0·P(A^c)=P(A)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「countをindicator和で表す」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：countをindicator和で表す

「離散確率・指示変数・乱択アルゴリズム」で **countをindicator和で表す** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「countをindicator和で表す」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

条件を満たす対象数Xは、各対象iが条件を満たすindicatorの和 $X=\sum I_i$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「期待値の線形性」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：期待値の線形性

「離散確率・指示変数・乱択アルゴリズム」で **期待値の線形性** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「期待値の線形性」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$E[X]=\sum E[I_i]=\sum P(A_i)$。I_i同士が依存していても成立するのが強み。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「離散確率・指示変数・乱択アルゴリズム」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> ランダム順列のfixed point数。各位置iが固定される確率1/nなので、期待fixed pointsはn·(1/n)=1。事象は独立でなくてもよい。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

ランダム順列のfixed point数。各位置iが固定される確率1/nなので、期待fixed pointsはn·(1/n)=1。事象は独立でなくてもよい。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「離散確率・指示変数・乱択アルゴリズム」のどの部分が変わるか説明せよ。

> ランダムgraph G(n,p)のedge数は各possible edgeのindicator和。期待値は $\binom n2p$。

<details><summary>完全解答</summary>

ランダムgraph G(n,p)のedge数は各possible edgeのindicator和。期待値は $\binom n2p$。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「離散確率・指示変数・乱択アルゴリズム」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 排反と独立は別概念。
- 確率は事象に対して定義される。
- 離散確率・指示変数・乱択アルゴリズムの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「離散確率・指示変数・乱択アルゴリズム」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> randomized algorithm評価ではseed固定の1 runで期待性能を判断せず、多数runと理論期待値を比較する。

<details><summary>完全解答</summary>

randomized algorithm評価ではseed固定の1 runで期待性能を判断せず、多数runと理論期待値を比較する。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「離散確率・指示変数・乱択アルゴリズム」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> indicatorとlinearity of expectationはhashing、randomized quicksort、concentration inequalitiesの基礎。Course08のrandomized ML評価にも再登場する。

<details><summary>完全解答</summary>

indicatorとlinearity of expectationはhashing、randomized quicksort、concentration inequalitiesの基礎。Course08のrandomized ML評価にも再登場する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「離散確率・指示変数・乱択アルゴリズム」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbb{E}[I_A]=\mathbb{P}(A)
$$

**導出**

1. **indicatorの期待値** — $E[I_A]=1·P(A)+0·P(A^c)=P(A)$。

2. **countをindicator和で表す** — 条件を満たす対象数Xは、各対象iが条件を満たすindicatorの和 $X=\sum I_i$。

3. **期待値の線形性** — $E[X]=\sum E[I_i]=\sum P(A_i)$。I_i同士が依存していても成立するのが強み。

**数値・具体例**

ランダム順列のfixed point数。各位置iが固定される確率1/nなので、期待fixed pointsはn·(1/n)=1。事象は独立でなくてもよい。

**条件を壊すと**

期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。

**実装**

randomized algorithm評価ではseed固定の1 runで期待性能を判断せず、多数runと理論期待値を比較する。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
