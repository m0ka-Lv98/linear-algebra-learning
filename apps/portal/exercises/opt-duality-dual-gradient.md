# Lagrange双対とdual gradient：演習

Course 06｜Topic 15/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/opt-duality-dual-gradient)

## 問1. 定義と記号

「Lagrange双対とdual gradient」の代表式

$$
g(\boldsymbol{\lambda})=\inf_{\mathbf{x}}\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、Lagrange双対とdual gradientが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**lower bound**

feasible xでg_i(x)≤0, λ_i≥0なのでλ^Tg≤0、よってL(x,λ)≤f(x)。さらにq(λ)=inf_x L≤L(x,λ)≤f(x)。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：lower bound

「Lagrange双対とdual gradient」で **lower bound** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「lower bound」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

feasible xでg_i(x)≤0, λ_i≥0なのでλ^Tg≤0、よってL(x,λ)≤f(x)。さらにq(λ)=inf_x L≤L(x,λ)≤f(x)。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「best lower bound」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：best lower bound

「Lagrange双対とdual gradient」で **best lower bound** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「best lower bound」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

λを選んでq(λ)を最大化すれば最も強いlower bound。これがdual problem。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「gap」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：gap

「Lagrange双対とdual gradient」で **gap** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「gap」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$p^*-d^*≥0$ がweak duality。strong dualityならgap0でprimal/dual双方のoptimality certificateになる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「Lagrange双対とdual gradient」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 簡単なquadratic+linear constraintでdualを解析し、primal solutionと同じobjectiveを得るとstrong dualityを確認できる。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

簡単なquadratic+linear constraintでdualを解析し、primal solutionと同じobjectiveを得るとstrong dualityを確認できる。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「Lagrange双対とdual gradient」のどの部分が変わるか説明せよ。

> resource constraintのλはconstraint RHSを少し緩めたときのoptimal value sensitivity（shadow price）として解釈できる。

<details><summary>完全解答</summary>

resource constraintのλはconstraint RHSを少し緩めたときのoptimal value sensitivity（shadow price）として解釈できる。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「Lagrange双対とdual gradient」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 弱双対と強双対を区別する。
- dual variableの符号制約を確認する。
- Lagrange双対とdual gradientの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「Lagrange双対とdual gradient」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> dual gradient/subgradientではinner inf solve accuracyも影響。primal recoveryとfeasibilityを別監視。

<details><summary>完全解答</summary>

dual gradient/subgradientではinner inf solve accuracyも影響。primal recoveryとfeasibilityを別監視。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「Lagrange双対とdual gradient」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> nonsmooth regularizerを分離して扱うproximal operatorはdualityとも深く関係するが、まずproximal gradientを構成する。

<details><summary>完全解答</summary>

nonsmooth regularizerを分離して扱うproximal operatorはdualityとも深く関係するが、まずproximal gradientを構成する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「Lagrange双対とdual gradient」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
g(\boldsymbol{\lambda})=\inf_{\mathbf{x}}\mathcal{L}(\mathbf{x},\boldsymbol{\lambda})
$$

**導出**

1. **lower bound** — feasible xでg_i(x)≤0, λ_i≥0なのでλ^Tg≤0、よってL(x,λ)≤f(x)。さらにq(λ)=inf_x L≤L(x,λ)≤f(x)。

2. **best lower bound** — λを選んでq(λ)を最大化すれば最も強いlower bound。これがdual problem。

3. **gap** — $p^*-d^*≥0$ がweak duality。strong dualityならgap0でprimal/dual双方のoptimality certificateになる。

**数値・具体例**

簡単なquadratic+linear constraintでdualを解析し、primal solutionと同じobjectiveを得るとstrong dualityを確認できる。

**条件を壊すと**

nonconvexではduality gapがpositiveになり得る。dual optimumだけからprimal exact solutionを保証しない。

**実装**

dual gradient/subgradientではinner inf solve accuracyも影響。primal recoveryとfeasibilityを別監視。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
