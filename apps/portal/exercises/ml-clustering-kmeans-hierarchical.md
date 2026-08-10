# k-meansと階層clustering：演習

Course 08｜Topic 12/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/ml-clustering-kmeans-hierarchical)

## 問1. 定義と記号

「k-meansと階層clustering」の代表式

$$
\min_{\{\boldsymbol{\mu}_k\}}\sum_i\min_k\|\mathbf{x}_i-\boldsymbol{\mu}_k\|_2^2
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、k-meansと階層clusteringが何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**assignment step**

centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：assignment step

「k-meansと階層clustering」で **assignment step** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「assignment step」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「centroid step」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：centroid step

「k-meansと階層clustering」で **centroid step** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「centroid step」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

assignments固定で $\sum_{i:c_i=k}\|x_i-\mu_k\|²$ をμで微分するとmeanがminimizer。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「monotone descent」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：monotone descent

「k-meansと階層clustering」で **monotone descent** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「monotone descent」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

各stepは片方固定でobjectiveを増やさないがjoint nonconvexなのでlocal optimum。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「k-meansと階層clustering」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 2 well-separated spherical groupsならcentroidsが各meanへ。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

2 well-separated spherical groupsならcentroidsが各meanへ。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「k-meansと階層clustering」のどの部分が変わるか説明せよ。

> hierarchical clusteringはKを先に固定せずdendrogramを作るがlinkage choiceでgeometryが変わる。

<details><summary>完全解答</summary>

hierarchical clusteringはKを先に固定せずdendrogramを作るがlinkage choiceでgeometryが変わる。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「k-meansと階層clustering」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- k-meansは球状・同程度分散の群を好む。
- cluster番号自体に順序や意味はない。
- k-meansと階層clusteringの定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「k-meansと階層clustering」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> k-means++ init、多restart、scaling。cluster label番号はpermutation arbitrary。

<details><summary>完全解答</summary>

k-means++ init、多restart、scaling。cluster label番号はpermutation arbitrary。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「k-meansと階層clustering」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> hard assignmentをprobabilistic soft responsibilityへ一般化するとGaussian mixture/EM。

<details><summary>完全解答</summary>

hard assignmentをprobabilistic soft responsibilityへ一般化するとGaussian mixture/EM。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「k-meansと階層clustering」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\min_{\{\boldsymbol{\mu}_k\}}\sum_i\min_k\|\mathbf{x}_i-\boldsymbol{\mu}_k\|_2^2
$$

**導出**

1. **assignment step** — centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。

2. **centroid step** — assignments固定で $\sum_{i:c_i=k}\|x_i-\mu_k\|²$ をμで微分するとmeanがminimizer。

3. **monotone descent** — 各stepは片方固定でobjectiveを増やさないがjoint nonconvexなのでlocal optimum。

**数値・具体例**

2 well-separated spherical groupsならcentroidsが各meanへ。

**条件を壊すと**

elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

**実装**

k-means++ init、多restart、scaling。cluster label番号はpermutation arbitrary。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
