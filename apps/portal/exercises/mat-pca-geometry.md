# PCAの幾何学：演習

Course 07｜Topic 03/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/mat-pca-geometry)

## 問1. 定義と記号

「PCAの幾何学」の代表式

$$
\max_{\|\mathbf{v}\|_2=1}\mathbf{v}^{\mathsf T}\mathbf{S}\mathbf{v}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、PCAの幾何学が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**project variance**

$Var(z)=(n-1)^{-1}\|X_cv\|²=v^TSv$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：project variance

「PCAの幾何学」で **project variance** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「project variance」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$Var(z)=(n-1)^{-1}\|X_cv\|²=v^TSv$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「unit constraint」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：unit constraint

「PCAの幾何学」で **unit constraint** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「unit constraint」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

scaleを自由にするとvを大きくしてvarianceを無限増加できるので $v^Tv=1$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「Lagrange condition」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：Lagrange condition

「PCAの幾何学」で **Lagrange condition** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「Lagrange condition」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$L=v^TSv-\lambda(v^Tv-1)$。gradient=0で $Sv=\lambda v$。最大Rayleigh quotientは最大eigenvalue。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「PCAの幾何学」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> ellipse cloudの長軸がPC1、短軸PC2。eigenvalueは各axisのvariance。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

ellipse cloudの長軸がPC1、短軸PC2。eigenvalueは各axisのvariance。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「PCAの幾何学」のどの部分が変わるか説明せよ。

> centerしないPCAではoriginからmean方向がdominantになることがあり、通常のvariance interpretationが変わる。

<details><summary>完全解答</summary>

centerしないPCAではoriginからmean方向がdominantになることがあり、通常のvariance interpretationが変わる。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「PCAの幾何学」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- PCAの幾何学の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「PCAの幾何学」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> covarianceを形成せずcentered XのSVDを使うと安定/効率的。explained variance ratioだけでrを自動決定しない。

<details><summary>完全解答</summary>

covarianceを形成せずcentered XのSVDを使うと安定/効率的。explained variance ratioだけでrを自動決定しない。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「PCAの幾何学」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> PCA eigenvectorsとXのright singular vectorsが一致する関係を次Topicで導く。

<details><summary>完全解答</summary>

PCA eigenvectorsとXのright singular vectorsが一致する関係を次Topicで導く。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「PCAの幾何学」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\max_{\|\mathbf{v}\|_2=1}\mathbf{v}^{\mathsf T}\mathbf{S}\mathbf{v}
$$

**導出**

1. **project variance** — $Var(z)=(n-1)^{-1}\|X_cv\|²=v^TSv$。

2. **unit constraint** — scaleを自由にするとvを大きくしてvarianceを無限増加できるので $v^Tv=1$。

3. **Lagrange condition** — $L=v^TSv-\lambda(v^Tv-1)$。gradient=0で $Sv=\lambda v$。最大Rayleigh quotientは最大eigenvalue。

**数値・具体例**

ellipse cloudの長軸がPC1、短軸PC2。eigenvalueは各axisのvariance。

**条件を壊すと**

PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。

**実装**

covarianceを形成せずcentered XのSVDを使うと安定/効率的。explained variance ratioだけでrを自動決定しない。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
