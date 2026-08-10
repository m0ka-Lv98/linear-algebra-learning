# 連立方程式の直接法とpivoting：演習

Course 05｜Topic 09/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-direct-solvers-pivoting)

## 問1. 定義と記号

「連立方程式の直接法とpivoting」の代表式

$$
\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、連立方程式の直接法とpivotingが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**消去をlower係数として保存**

第k列下を消す multiplier $l_{ik}=a_{ik}/a_{kk}$ をLに保存すると、消去操作の積をまとめてA=LUと表せる。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：消去をlower係数として保存

「連立方程式の直接法とpivoting」で **消去をlower係数として保存** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「消去をlower係数として保存」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

第k列下を消す multiplier $l_{ik}=a_{ik}/a_{kk}$ をLに保存すると、消去操作の積をまとめてA=LUと表せる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「pivotingの理由」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：pivotingの理由

「連立方程式の直接法とpivoting」で **pivotingの理由** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「pivotingの理由」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

pivotが0なら割れず、小さすぎれば丸め誤差を増幅。候補行を交換して大きいpivotを選ぶためPが入る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「solveへ分解」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：solveへ分解

「連立方程式の直接法とpivoting」で **solveへ分解** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「solveへ分解」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$PAx=Pb$, $LUx=Pb$。まずLy=Pbをforward solve、次にUx=yをback solve。inverseを作る必要はない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「連立方程式の直接法とpivoting」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ は最初pivot0。row swapでPを適用すれば消去可能。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ は最初pivot0。row swapでPを適用すれば消去可能。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「連立方程式の直接法とpivoting」のどの部分が変わるか説明せよ。

> 同じAで複数bを解くならLUを一度計算し、各bでtriangular solveだけ繰り返せる。

<details><summary>完全解答</summary>

同じAで複数bを解くならLUを一度計算し、各bでtriangular solveだけ繰り返せる。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「連立方程式の直接法とpivoting」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> $A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- pivotが0または極端に小さい場合は行交換を考える。
- 行基本変形は解集合を保存する。
- 連立方程式の直接法とpivotingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

$A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「連立方程式の直接法とpivoting」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> partial pivotingが標準。sparseではfill-inを減らすpermutationも重要。residualとbackward errorで検算する。

<details><summary>完全解答</summary>

partial pivotingが標準。sparseではfill-inを減らすpermutationも重要。residualとbackward errorで検算する。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「連立方程式の直接法とpivoting」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 大規模sparse系ではfactorization cost/memoryが重く、matrix-vector product中心のiterative solverへ進む。

<details><summary>完全解答</summary>

大規模sparse系ではfactorization cost/memoryが重く、matrix-vector product中心のiterative solverへ進む。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「連立方程式の直接法とpivoting」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}
$$

**導出**

1. **消去をlower係数として保存** — 第k列下を消す multiplier $l_{ik}=a_{ik}/a_{kk}$ をLに保存すると、消去操作の積をまとめてA=LUと表せる。

2. **pivotingの理由** — pivotが0なら割れず、小さすぎれば丸め誤差を増幅。候補行を交換して大きいpivotを選ぶためPが入る。

3. **solveへ分解** — $PAx=Pb$, $LUx=Pb$。まずLy=Pbをforward solve、次にUx=yをback solve。inverseを作る必要はない。

**数値・具体例**

$A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ は最初pivot0。row swapでPを適用すれば消去可能。

**条件を壊すと**

$A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。

**実装**

partial pivotingが標準。sparseではfill-inを減らすpermutationも重要。residualとbackward errorで検算する。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
