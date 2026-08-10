# 最適性条件：演習

Course 06｜Topic 04/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/opt-optimality-conditions)

## 問1. 定義と記号

「最適性条件」の代表式

$$
\mathbf{0}\in\partial f(\mathbf{x}^{\ast})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、最適性条件が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**convex first-order inequality**

$f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：convex first-order inequality

「最適性条件」で **convex first-order inequality** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「convex first-order inequality」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「g=0ならglobal lower bound」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：g=0ならglobal lower bound

「最適性条件」で **g=0ならglobal lower bound** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「g=0ならglobal lower bound」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

0∈∂f(x*)なら $f(y)\ge f(x*)$ for all y。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「smooth case」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：smooth case

「最適性条件」で **smooth case** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「smooth case」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

differentiableなら∂f={∇f}なので条件は∇f=0。非convexではstationaryは必要でもglobal十分でない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「最適性条件」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「最適性条件」のどの部分が変わるか説明せよ。

> $f(x)=x^3$ は∇f(0)=0だがminimumでない。convexityが十分性に必要。

<details><summary>完全解答</summary>

$f(x)=x^3$ は∇f(0)=0だがminimumでない。convexityが十分性に必要。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「最適性条件」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 必要条件と十分条件を区別する。
- 非凸では停留点が鞍点のことがある。
- 最適性条件の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「最適性条件」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> solver stopではgradient normだけでなくconstraint violation/KKT residualをproblem typeに応じて見る。

<details><summary>完全解答</summary>

solver stopではgradient normだけでなくconstraint violation/KKT residualをproblem typeに応じて見る。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「最適性条件」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 最適方向が分かってもstep sizeが不適切なら下降しない。line searchへ進む。

<details><summary>完全解答</summary>

最適方向が分かってもstep sizeが不適切なら下降しない。line searchへ進む。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「最適性条件」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{0}\in\partial f(\mathbf{x}^{\ast})
$$

**導出**

1. **convex first-order inequality** — $f(y)\ge f(x)+g^T(y-x)$ for any subgradient g∈∂f(x)。

2. **g=0ならglobal lower bound** — 0∈∂f(x*)なら $f(y)\ge f(x*)$ for all y。

3. **smooth case** — differentiableなら∂f={∇f}なので条件は∇f=0。非convexではstationaryは必要でもglobal十分でない。

**数値・具体例**

$f(x)=|x|$ はx=0で微分不能だが∂f(0)=[-1,1]に0を含みglobal min。

**条件を壊すと**

gradient normが小さいだけでglobal optimalとは限らない。nonconvex saddle/flat regionがある。

**実装**

solver stopではgradient normだけでなくconstraint violation/KKT residualをproblem typeに応じて見る。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
