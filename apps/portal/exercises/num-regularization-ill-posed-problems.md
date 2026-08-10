# 正則化と悪条件・不適切問題：演習

Course 05｜Topic 15/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/num-regularization-ill-posed-problems)

## 問1. 定義と記号

「正則化と悪条件・不適切問題」の代表式

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x}-\mathbf{b}\|_2^2+\lambda\|\mathbf{x}\|_2^2
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、正則化と悪条件・不適切問題が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**目的関数を微分**

$J(x)=\|Ax-b\|^2+\lambda\|x\|^2$。gradientは $2A^T(Ax-b)+2\lambda x$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：目的関数を微分

「正則化と悪条件・不適切問題」で **目的関数を微分** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「目的関数を微分」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$J(x)=\|Ax-b\|^2+\lambda\|x\|^2$。gradientは $2A^T(Ax-b)+2\lambda x$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「stationary条件」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：stationary条件

「正則化と悪条件・不適切問題」で **stationary条件** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「stationary条件」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

0と置き $(A^TA+\lambda I)x=A^Tb$。λ>0ならnull方向にもcurvatureが加わる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「SVD filterとして読む」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：SVD filterとして読む

「正則化と悪条件・不適切問題」で **SVD filterとして読む** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「SVD filterとして読む」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

各singular方向の係数は $\sigma_i/(\sigma_i^2+\lambda)$。小σ方向の $1/\sigma_i$ 爆発を抑える。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「正則化と悪条件・不適切問題」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> σ=0.001方向をnaive inverseすると1000倍。λ=0.01ならfilter≈0.09999でnoise amplificationを強く抑える。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

σ=0.001方向をnaive inverseすると1000倍。λ=0.01ならfilter≈0.09999でnoise amplificationを強く抑える。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「正則化と悪条件・不適切問題」のどの部分が変わるか説明せよ。

> λが大きすぎると安定だがbiasが大きく、解が0へ縮みすぎる。stabilityとfitのtradeoff。

<details><summary>完全解答</summary>

λが大きすぎると安定だがbiasが大きく、解が0へ縮みすぎる。stabilityとfitのtradeoff。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「正則化と悪条件・不適切問題」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- λ=0が常に最良ではない。
- 正則化はバイアスを導入して分散を抑える。
- 正則化と悪条件・不適切問題の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「正則化と悪条件・不適切問題」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> λはvalidation, L-curve, GCV等で選ぶ。feature scalingがpenalty効果へ直接影響するため標準化を検討。

<details><summary>完全解答</summary>

λはvalidation, L-curve, GCV等で選ぶ。feature scalingがpenalty効果へ直接影響するため標準化を検討。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「正則化と悪条件・不適切問題」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> large matrixではfull SVDを避けrandomized range finderでdominant subspaceを近似する方法がある。

<details><summary>完全解答</summary>

large matrixではfull SVDを避けrandomized range finderでdominant subspaceを近似する方法がある。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「正則化と悪条件・不適切問題」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x}-\mathbf{b}\|_2^2+\lambda\|\mathbf{x}\|_2^2
$$

**導出**

1. **目的関数を微分** — $J(x)=\|Ax-b\|^2+\lambda\|x\|^2$。gradientは $2A^T(Ax-b)+2\lambda x$。

2. **stationary条件** — 0と置き $(A^TA+\lambda I)x=A^Tb$。λ>0ならnull方向にもcurvatureが加わる。

3. **SVD filterとして読む** — 各singular方向の係数は $\sigma_i/(\sigma_i^2+\lambda)$。小σ方向の $1/\sigma_i$ 爆発を抑える。

**数値・具体例**

σ=0.001方向をnaive inverseすると1000倍。λ=0.01ならfilter≈0.09999でnoise amplificationを強く抑える。

**条件を壊すと**

regularizationは「正解を自動回復」する魔法ではない。penaltyが真のsolution構造に不適切ならbiasを導入する。

**実装**

λはvalidation, L-curve, GCV等で選ぶ。feature scalingがpenalty効果へ直接影響するため標準化を検討。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
