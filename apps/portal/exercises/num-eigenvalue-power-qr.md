# 固有値計算・べき乗法・QR法：演習

Course 05｜Topic 13/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-eigenvalue-power-qr)

## 問1. 定義と記号

「固有値計算・べき乗法・QR法」の代表式

$$
\mathbf{x}_{k+1}=\frac{\mathbf{A}\mathbf{x}_k}{\|\mathbf{A}\mathbf{x}_k\|_2}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、固有値計算・べき乗法・QR法が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**固有basisへ展開**

$x_0=\sum c_i v_i$ とすれば $A^k x_0=\sum c_i\lambda_i^k v_i$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：固有basisへ展開

「固有値計算・べき乗法・QR法」で **固有basisへ展開** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「固有basisへ展開」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$x_0=\sum c_i v_i$ とすれば $A^k x_0=\sum c_i\lambda_i^k v_i$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「dominant項で割る」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：dominant項で割る

「固有値計算・べき乗法・QR法」で **dominant項で割る** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「dominant項で割る」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\lambda_1^k[c_1v_1+\sum_{i>1}c_i(\lambda_i/\lambda_1)^k v_i]$。$|\lambda_i/\lambda_1|<1$ なら後項が消える。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「normalize」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：normalize

「固有値計算・べき乗法・QR法」で **normalize** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「normalize」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

各stepでnormを1へ戻して方向だけ追う。Rayleigh quotientでeigenvalueを推定できる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「固有値計算・べき乗法・QR法」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> A=diag(5,2), x0=(1,1)。A^k x0=(5^k,2^k)、normalizeすると(1,0)方向へ。error ratioは(2/5)^k。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

A=diag(5,2), x0=(1,1)。A^k x0=(5^k,2^k)、normalizeすると(1,0)方向へ。error ratioは(2/5)^k。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「固有値計算・べき乗法・QR法」のどの部分が変わるか説明せよ。

> dominant固有値の絶対値が同率だと単純power法は一意方向へ収束しないことがある。

<details><summary>完全解答</summary>

dominant固有値の絶対値が同率だと単純power法は一意方向へ収束しないことがある。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「固有値計算・べき乗法・QR法」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 最大固有値の絶対値が分離していることが重要。
- 正規化しないと数値的にoverflow/underflowする。
- 固有値計算・べき乗法・QR法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「固有値計算・べき乗法・QR法」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> QR algorithmは全eigenvalue用。sparse大型ではLanczos/Arnoldi。residual $\|Av-\lambda v\|$ を必ず確認。

<details><summary>完全解答</summary>

QR algorithmは全eigenvalue用。sparse大型ではLanczos/Arnoldi。residual $\|Av-\lambda v\|$ を必ず確認。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「固有値計算・べき乗法・QR法」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> singular valuesはA^TAのeigenvalue平方根だが、数値計算ではA^TAを直接形成しないSVD algorithmを使う。

<details><summary>完全解答</summary>

singular valuesはA^TAのeigenvalue平方根だが、数値計算ではA^TAを直接形成しないSVD algorithmを使う。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「固有値計算・べき乗法・QR法」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{x}_{k+1}=\frac{\mathbf{A}\mathbf{x}_k}{\|\mathbf{A}\mathbf{x}_k\|_2}
$$

**導出**

1. **固有basisへ展開** — $x_0=\sum c_i v_i$ とすれば $A^k x_0=\sum c_i\lambda_i^k v_i$。

2. **dominant項で割る** — $\lambda_1^k[c_1v_1+\sum_{i>1}c_i(\lambda_i/\lambda_1)^k v_i]$。$|\lambda_i/\lambda_1|<1$ なら後項が消える。

3. **normalize** — 各stepでnormを1へ戻して方向だけ追う。Rayleigh quotientでeigenvalueを推定できる。

**数値・具体例**

A=diag(5,2), x0=(1,1)。A^k x0=(5^k,2^k)、normalizeすると(1,0)方向へ。error ratioは(2/5)^k。

**条件を壊すと**

x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。

**実装**

QR algorithmは全eigenvalue用。sparse大型ではLanczos/Arnoldi。residual $\|Av-\lambda v\|$ を必ず確認。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
