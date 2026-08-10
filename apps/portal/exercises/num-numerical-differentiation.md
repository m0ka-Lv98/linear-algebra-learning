# 数値微分：演習

Course 05｜Topic 07/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-numerical-differentiation)

## 問1. 定義と記号

「数値微分」の代表式

$$
f^{\prime}(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、数値微分が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**前後Taylor展開**

$f(x\pm h)=f(x)\pm hf^{\prime}(x)+h^2f^{\prime\prime}/2\pm h^3f^{(3)}/6+\cdots$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：前後Taylor展開

「数値微分」で **前後Taylor展開** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「前後Taylor展開」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$f(x\pm h)=f(x)\pm hf^{\prime}(x)+h^2f^{\prime\prime}/2\pm h^3f^{(3)}/6+\cdots$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「引き算で偶数次を消す」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：引き算で偶数次を消す

「数値微分」で **引き算で偶数次を消す** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「引き算で偶数次を消す」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$f(x+h)-f(x-h)=2hf^{\prime}(x)+h^3f^{(3)}(x)/3+\cdots$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「2hで割る」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：2hで割る

「数値微分」で **2hで割る** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「2hで割る」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

中心差分 = $f^{\prime}(x)+O(h^2)$。ただしhを小さくしすぎると近い数の差で丸め誤差が増幅する。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「数値微分」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $f(x)=x^2$, x=1なら中心差分は任意hで [(1+h)²-(1-h)²]/2h=2 とexact。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$f(x)=x^2$, x=1なら中心差分は任意hで [(1+h)²-(1-h)²]/2h=2 とexact。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「数値微分」のどの部分が変わるか説明せよ。

> $e^x$ ではhを10倍小さくすると最初は誤差約1/100へ減るが、machine precision付近では逆に増えるU字curve。

<details><summary>完全解答</summary>

$e^x$ ではhを10倍小さくすると最初は誤差約1/100へ減るが、machine precision付近では逆に増えるU字curve。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「数値微分」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- hを小さくすれば無限に精度が上がるわけではない。
- 前進差分と中心差分で次数が違う。
- 数値微分の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「数値微分」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> automatic differentiationはfinite differenceと異なり、演算graphのchain ruleでmachine precision精度の導関数を得る。gradient checkには中心差分を使える。

<details><summary>完全解答</summary>

automatic differentiationはfinite differenceと異なり、演算graphのchain ruleでmachine precision精度の導関数を得る。gradient checkには中心差分を使える。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「数値微分」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 積分も局所近似を区間全体へ足すことで数値化できる。

<details><summary>完全解答</summary>

積分も局所近似を区間全体へ足すことで数値化できる。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「数値微分」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
f^{\prime}(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

**導出**

1. **前後Taylor展開** — $f(x\pm h)=f(x)\pm hf^{\prime}(x)+h^2f^{\prime\prime}/2\pm h^3f^{(3)}/6+\cdots$。

2. **引き算で偶数次を消す** — $f(x+h)-f(x-h)=2hf^{\prime}(x)+h^3f^{(3)}(x)/3+\cdots$。

3. **2hで割る** — 中心差分 = $f^{\prime}(x)+O(h^2)$。ただしhを小さくしすぎると近い数の差で丸め誤差が増幅する。

**数値・具体例**

$f(x)=x^2$, x=1なら中心差分は任意hで [(1+h)²-(1-h)²]/2h=2 とexact。

**条件を壊すと**

「hは小さいほど良い」は誤り。subtraction cancellationによりroundoff項およそO(u/h)が増える。

**実装**

automatic differentiationはfinite differenceと異なり、演算graphのchain ruleでmachine precision精度の導関数を得る。gradient checkには中心差分を使える。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
