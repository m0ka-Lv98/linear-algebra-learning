# 多変量正規分布：演習

Course 03｜Topic 13/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/prob-multivariate-normal-distribution)

## 問1. 定義と記号

「多変量正規分布」の代表式

$$
\mathbf{X}\sim\mathcal{N}(\boldsymbol{\mu},\mathbf{\Sigma})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、多変量正規分布が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**独立標準正規から始める**

$\mathbf Z\sim N(\mathbf0,\mathbf I)$ は球対称。線形変換 $\mathbf X=\boldsymbol\mu+\mathbf L\mathbf Z$ を考える。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：独立標準正規から始める

「多変量正規分布」で **独立標準正規から始める** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「独立標準正規から始める」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\mathbf Z\sim N(\mathbf0,\mathbf I)$ は球対称。線形変換 $\mathbf X=\boldsymbol\mu+\mathbf L\mathbf Z$ を考える。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「平均と共分散を計算する」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：平均と共分散を計算する

「多変量正規分布」で **平均と共分散を計算する** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「平均と共分散を計算する」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$E[\mathbf X]=\boldsymbol\mu$、$Cov(\mathbf X)=\mathbf L\mathbf L^T$。$\mathbf\Sigma=\mathbf L\mathbf L^T$ を満たすLを選べば所望の共分散になる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「楕円等密度面を得る」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：楕円等密度面を得る

「多変量正規分布」で **楕円等密度面を得る** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「楕円等密度面を得る」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

標準空間の $\|\mathbf z\|^2=c$ は球。$\mathbf z=\mathbf L^{-1}(\mathbf x-\mu)$ を代入すると $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)=c$ という楕円になる。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「多変量正規分布」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ならx方向標準偏差2、y方向1の軸平行楕円。off-diagonalが正なら楕円が正傾斜へ回転する。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ならx方向標準偏差2、y方向1の軸平行楕円。off-diagonalが正なら楕円が正傾斜へ回転する。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「多変量正規分布」のどの部分が変わるか説明せよ。

> 多変量正規では共分散0の成分は独立。これは一般分布では成立しない特別な性質で、正規仮定が重要。

<details><summary>完全解答</summary>

多変量正規では共分散0の成分は独立。これは一般分布では成立しない特別な性質で、正規仮定が重要。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「多変量正規分布」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 相関0でも一般には独立とは限らない。
- 共分散はスケール依存。
- 多変量正規分布の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「多変量正規分布」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> 密度計算で明示逆行列を作るよりCholesky分解を用いて二次形式とlog determinantを計算する方が安定。高次元ではlog-densityを使う。

<details><summary>完全解答</summary>

密度計算で明示逆行列を作るよりCholesky分解を用いて二次形式とlog determinantを計算する方が安定。高次元ではlog-densityを使う。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「多変量正規分布」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> Mahalanobis距離、Gaussian discriminant analysis、Kalman filteringなどへつながる。Course07ではwhiteningとPCAを共分散行列の固有構造から扱う。

<details><summary>完全解答</summary>

Mahalanobis距離、Gaussian discriminant analysis、Kalman filteringなどへつながる。Course07ではwhiteningとPCAを共分散行列の固有構造から扱う。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「多変量正規分布」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf{X}\sim\mathcal{N}(\boldsymbol{\mu},\mathbf{\Sigma})
$$

**導出**

1. **独立標準正規から始める** — $\mathbf Z\sim N(\mathbf0,\mathbf I)$ は球対称。線形変換 $\mathbf X=\boldsymbol\mu+\mathbf L\mathbf Z$ を考える。

2. **平均と共分散を計算する** — $E[\mathbf X]=\boldsymbol\mu$、$Cov(\mathbf X)=\mathbf L\mathbf L^T$。$\mathbf\Sigma=\mathbf L\mathbf L^T$ を満たすLを選べば所望の共分散になる。

3. **楕円等密度面を得る** — 標準空間の $\|\mathbf z\|^2=c$ は球。$\mathbf z=\mathbf L^{-1}(\mathbf x-\mu)$ を代入すると $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)=c$ という楕円になる。

**数値・具体例**

$\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ならx方向標準偏差2、y方向1の軸平行楕円。off-diagonalが正なら楕円が正傾斜へ回転する。

**条件を壊すと**

共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。

**実装**

密度計算で明示逆行列を作るよりCholesky分解を用いて二次形式とlog determinantを計算する方が安定。高次元ではlog-densityを使う。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
