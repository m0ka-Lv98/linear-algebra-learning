# 疎行列と前処理：演習

Course 05｜Topic 11/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-sparse-matrices-preconditioning)

## 問1. 定義と記号

「疎行列と前処理」の代表式

$$
\mathbf{M}^{-1}\mathbf{A}\mathbf{x}=\mathbf{M}^{-1}\mathbf{b}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、疎行列と前処理が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**同値系**

$Ax=b$ の左から可逆M^{-1}を掛けても解xは同じ。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：同値系

「疎行列と前処理」で **同値系** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「同値系」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$Ax=b$ の左から可逆M^{-1}を掛けても解xは同じ。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「理想preconditioner」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：理想preconditioner

「疎行列と前処理」で **理想preconditioner** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「理想preconditioner」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

M=Aなら変換後はIで一stepだがMを解くcostが元問題と同じ。実用では「Aに近く、解くのが安い」tradeoff。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「spectrum clustering」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：spectrum clustering

「疎行列と前処理」で **spectrum clustering** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「spectrum clustering」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

Krylov法ではeigenvalueがclusterすると低次多項式でerrorを抑えやすく、iteration数が減る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「疎行列と前処理」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> diagonal scaling M=diag(A) は安価で、変数scale差が大きい系のconditionを改善する場合がある。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

diagonal scaling M=diag(A) は安価で、変数scale差が大きい系のconditionを改善する場合がある。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「疎行列と前処理」のどの部分が変わるか説明せよ。

> incomplete LU/Choleskyはfillを制限してexact factorizationの近似を作る。memoryとqualityのtradeoff。

<details><summary>完全解答</summary>

incomplete LU/Choleskyはfillを制限してexact factorizationの近似を作る。memoryとqualityのtradeoff。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「疎行列と前処理」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 疎なAでも逆行列は密になることがある。
- 前処理は解を変えず収束性を改善する。
- 疎行列と前処理の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「疎行列と前処理」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> sparse format CSR/CSC選択、fill-in、parallelismを測る。M^{-1}をdense matrixとして構築しない。

<details><summary>完全解答</summary>

sparse format CSR/CSC選択、fill-in、parallelismを測る。M^{-1}をdense matrixとして構築しない。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「疎行列と前処理」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> least squares, eigen, SVDでもconditioningとfactorization choiceが数値品質を左右する。

<details><summary>完全解答</summary>

least squares, eigen, SVDでもconditioningとfactorization choiceが数値品質を左右する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「疎行列と前処理」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{M}^{-1}\mathbf{A}\mathbf{x}=\mathbf{M}^{-1}\mathbf{b}
$$

**導出**

1. **同値系** — $Ax=b$ の左から可逆M^{-1}を掛けても解xは同じ。

2. **理想preconditioner** — M=Aなら変換後はIで一stepだがMを解くcostが元問題と同じ。実用では「Aに近く、解くのが安い」tradeoff。

3. **spectrum clustering** — Krylov法ではeigenvalueがclusterすると低次多項式でerrorを抑えやすく、iteration数が減る。

**数値・具体例**

diagonal scaling M=diag(A) は安価で、変数scale差が大きい系のconditionを改善する場合がある。

**条件を壊すと**

preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。

**実装**

sparse format CSR/CSC選択、fill-in、parallelismを測る。M^{-1}をdense matrixとして構築しない。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
