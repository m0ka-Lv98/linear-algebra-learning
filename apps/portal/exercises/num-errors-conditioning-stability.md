# 誤差・条件数・数値安定性：演習

Course 05｜Topic 02/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-errors-conditioning-stability)

## 問1. 定義と記号

「誤差・条件数・数値安定性」の代表式

$$
\frac{\|\Delta\mathbf{x}\|}{\|\mathbf{x}\|}\lesssim\kappa(\mathbf{A})\frac{\|\Delta\mathbf{b}\|}{\|\mathbf{b}\|}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、誤差・条件数・数値安定性が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**摂動した方程式**

$A(x+\Delta x)=b+\Delta b$ と元式を引くと $A\Delta x=\Delta b$、よって $\Delta x=A^{-1}\Delta b$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：摂動した方程式

「誤差・条件数・数値安定性」で **摂動した方程式** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「摂動した方程式」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$A(x+\Delta x)=b+\Delta b$ と元式を引くと $A\Delta x=\Delta b$、よって $\Delta x=A^{-1}\Delta b$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「normで上から抑える」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：normで上から抑える

「誤差・条件数・数値安定性」で **normで上から抑える** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「normで上から抑える」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\|\Delta x\|\le\|A^{-1}\|\|\Delta b\|$。一方 $\|b\|=\|Ax\|\le\|A\|\|x\|$ より $1/\|x\|\le\|A\|/\|b\|$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「相対誤差を結ぶ」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：相対誤差を結ぶ

「誤差・条件数・数値安定性」で **相対誤差を結ぶ** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「相対誤差を結ぶ」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

二つを掛けて $\|\Delta x\|/\|x\|\le\kappa(A)\|\Delta b\|/\|b\|$。大きいκはproblem sensitivityを示す。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「誤差・条件数・数値安定性」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $A=diag(1,10^{-6})$ は2-norm条件数 $10^6$。第2成分方向の小さなb誤差がxで百万倍の相対scale差を持ち得る。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$A=diag(1,10^{-6})$ は2-norm条件数 $10^6$。第2成分方向の小さなb誤差がxで百万倍の相対scale差を持ち得る。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「誤差・条件数・数値安定性」のどの部分が変わるか説明せよ。

> 同じwell-conditioned問題でも、わざと大きなcancelationを起こすalgorithmなら不安定になり得る。問題とalgorithmを別評価する。

<details><summary>完全解答</summary>

同じwell-conditioned問題でも、わざと大きなcancelationを起こすalgorithmなら不安定になり得る。問題とalgorithmを別評価する。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「誤差・条件数・数値安定性」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 条件数が大きいこととアルゴリズムが不安定なことは別概念。
- スケーリングで見かけの条件が変わる場合がある。
- 誤差・条件数・数値安定性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「誤差・条件数・数値安定性」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> residual $r=b-A\hat x$ が小さくてもforward errorが小さいとは限らない。condition numberとbackward errorを併用する。

<details><summary>完全解答</summary>

residual $r=b-A\hat x$ が小さくてもforward errorが小さいとは限らない。condition numberとbackward errorを併用する。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「誤差・条件数・数値安定性」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 誤差列が0へ近づく速さを収束次数として定量化し、反復法の停止を設計する。

<details><summary>完全解答</summary>

誤差列が0へ近づく速さを収束次数として定量化し、反復法の停止を設計する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「誤差・条件数・数値安定性」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\frac{\|\Delta\mathbf{x}\|}{\|\mathbf{x}\|}\lesssim\kappa(\mathbf{A})\frac{\|\Delta\mathbf{b}\|}{\|\mathbf{b}\|}
$$

**導出**

1. **摂動した方程式** — $A(x+\Delta x)=b+\Delta b$ と元式を引くと $A\Delta x=\Delta b$、よって $\Delta x=A^{-1}\Delta b$。

2. **normで上から抑える** — $\|\Delta x\|\le\|A^{-1}\|\|\Delta b\|$。一方 $\|b\|=\|Ax\|\le\|A\|\|x\|$ より $1/\|x\|\le\|A\|/\|b\|$。

3. **相対誤差を結ぶ** — 二つを掛けて $\|\Delta x\|/\|x\|\le\kappa(A)\|\Delta b\|/\|b\|$。大きいκはproblem sensitivityを示す。

**数値・具体例**

$A=diag(1,10^{-6})$ は2-norm条件数 $10^6$。第2成分方向の小さなb誤差がxで百万倍の相対scale差を持ち得る。

**条件を壊すと**

「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。

**実装**

residual $r=b-A\hat x$ が小さくてもforward errorが小さいとは限らない。condition numberとbackward errorを併用する。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
