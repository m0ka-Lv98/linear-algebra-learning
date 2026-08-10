# PCAのSVD計算：演習

Course 07｜Topic 04/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/mat-pca-svd-computation)

## 問1. 定義と記号

「PCAのSVD計算」の代表式

$$
\mathbf{X}_c=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、PCAのSVD計算が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**SへSVDを代入**

$X_c^TX_c=V\Sigma U^TU\Sigma V^T=V\Sigma²V^T$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：SへSVDを代入

「PCAのSVD計算」で **SへSVDを代入** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「SへSVDを代入」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$X_c^TX_c=V\Sigma U^TU\Sigma V^T=V\Sigma²V^T$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「eigenvalue対応」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：eigenvalue対応

「PCAのSVD計算」で **eigenvalue対応** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「eigenvalue対応」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$S$ eigenvalueは $\lambda_i=\sigma_i²/(n-1)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「scores」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：scores

「PCAのSVD計算」で **scores** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「scores」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$X_cv_i=\sigma_i u_i$ なのでsample scores matrixは $X_cV_r=U_r\Sigma_r$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「PCAのSVD計算」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> σ=(10,3,1), n=11ならvariance=(10,0.9,0.1)、total11、PC1 explained ratio10/11。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

σ=(10,3,1), n=11ならvariance=(10,0.9,0.1)、total11、PC1 explained ratio10/11。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「PCAのSVD計算」のどの部分が変わるか説明せよ。

> p≫nならp×p covariance eigenproblemよりthin SVDが有利。

<details><summary>完全解答</summary>

p≫nならp×p covariance eigenproblemよりthin SVDが有利。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「PCAのSVD計算」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- PCAのSVD計算の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「PCAのSVD計算」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> randomized SVDでlarge data。sign of singular vector is arbitrary; run間sign flipはsame component。

<details><summary>完全解答</summary>

randomized SVDでlarge data。sign of singular vector is arbitrary; run間sign flipはsame component。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「PCAのSVD計算」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> covariance ellipseを球へ変換するwhiteningとMahalanobis distanceへ。

<details><summary>完全解答</summary>

covariance ellipseを球へ変換するwhiteningとMahalanobis distanceへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「PCAのSVD計算」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{X}_c=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

**導出**

1. **SへSVDを代入** — $X_c^TX_c=V\Sigma U^TU\Sigma V^T=V\Sigma²V^T$。

2. **eigenvalue対応** — $S$ eigenvalueは $\lambda_i=\sigma_i²/(n-1)$。

3. **scores** — $X_cv_i=\sigma_i u_i$ なのでsample scores matrixは $X_cV_r=U_r\Sigma_r$。

**数値・具体例**

σ=(10,3,1), n=11ならvariance=(10,0.9,0.1)、total11、PC1 explained ratio10/11。

**条件を壊すと**

singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。

**実装**

randomized SVDでlarge data。sign of singular vector is arbitrary; run間sign flipはsame component。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
