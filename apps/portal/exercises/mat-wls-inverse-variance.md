# WLSと逆分散重み：演習

Course 07｜Topic 07/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/mat-wls-inverse-variance)

## 問1. 定義と記号

「WLSと逆分散重み」の代表式

$$
\hat{\boldsymbol{\beta}}=(\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{y}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、WLSと逆分散重みが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**なぜinverse varianceか**

$\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：なぜinverse varianceか

「WLSと逆分散重み」で **なぜinverse varianceか** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「なぜinverse varianceか」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「gradient」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：gradient

「WLSと逆分散重み」で **gradient** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「gradient」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$J=(y-Xβ)^TW(y-Xβ)$。W symmetricとしてgradient $-2X^TW(y-Xβ)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「weighted normal equation」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：weighted normal equation

「WLSと逆分散重み」で **weighted normal equation** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「weighted normal equation」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$X^TWX\hatβ=X^TWy$。full weighted column rankなら解式。さらに $W^{1/2}$ でwhitenするとordinary LS on $W^{1/2}X,W^{1/2}y$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「WLSと逆分散重み」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「WLSと逆分散重み」のどの部分が変わるか説明せよ。

> 全σ同じならW=cIでobjectiveがconstant倍され、OLSと同じβ。

<details><summary>完全解答</summary>

全σ同じならW=cIでobjectiveがconstant倍され、OLSと同じβ。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「WLSと逆分散重み」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- Wは通常対称正定値を想定する。
- 重みを大きくする意味は「その点を信頼する」こと。
- WLSと逆分散重みの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「WLSと逆分散重み」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> normal equationを明示形成せずweighted QR。極端なweight ratioはconditioning悪化。Wをsampleごとに推定した場合、その不確実性も考慮。

<details><summary>完全解答</summary>

normal equationを明示形成せずweighted QR。極端なweight ratioはconditioning悪化。Wをsampleごとに推定した場合、その不確実性も考慮。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「WLSと逆分散重み」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> noiseが観測間でcorrelatedならdiagonal Wでは足りず、full covariance Σ^{-1}を使うGLSへ。

<details><summary>完全解答</summary>

noiseが観測間でcorrelatedならdiagonal Wでは足りず、full covariance Σ^{-1}を使うGLSへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「WLSと逆分散重み」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\hat{\boldsymbol{\beta}}=(\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{y}
$$

**導出**

1. **なぜinverse varianceか** — $\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。

2. **gradient** — $J=(y-Xβ)^TW(y-Xβ)$。W symmetricとしてgradient $-2X^TW(y-Xβ)$。

3. **weighted normal equation** — $X^TWX\hatβ=X^TWy$。full weighted column rankなら解式。さらに $W^{1/2}$ でwhitenするとordinary LS on $W^{1/2}X,W^{1/2}y$。

**数値・具体例**

2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

**条件を壊すと**

weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

**実装**

normal equationを明示形成せずweighted QR。極端なweight ratioはconditioning悪化。Wをsampleごとに推定した場合、その不確実性も考慮。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
