# Hessianと二次近似：演習

Course 01｜Topic 10/13。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/calc-hessian-second-order)

## 問1. 定義と記号

「Hessianと二次近似」の代表式

$$
f(\mathbf{x}+\mathbf h)\approx f(\mathbf{x})+\nabla f(\mathbf{x})^{\mathsf T}\mathbf h+\frac12\mathbf h^{\mathsf T}\mathbf H_f(\mathbf{x})\mathbf h
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、Hessianと二次近似が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**勾配を一次近似する**

$\nabla f(\mathbf{x}+t\mathbf h)\approx\nabla f(\mathbf{x})+t\mathbf H_f(\mathbf{x})\mathbf h$。これは勾配というベクトル値関数にJacobianを適用したもので、そのJacobianがHessian。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：勾配を一次近似する

「Hessianと二次近似」で **勾配を一次近似する** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「勾配を一次近似する」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\nabla f(\mathbf{x}+t\mathbf h)\approx\nabla f(\mathbf{x})+t\mathbf H_f(\mathbf{x})\mathbf h$。これは勾配というベクトル値関数にJacobianを適用したもので、そのJacobianがHessian。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「線上の一変数関数へ還元」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：線上の一変数関数へ還元

「Hessianと二次近似」で **線上の一変数関数へ還元** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「線上の一変数関数へ還元」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$g(t)=f(\mathbf{x}+t\mathbf h)$ とすると $g^{\prime}(0)=\nabla f^T\mathbf h$、$g^{\prime\prime}(0)=\mathbf h^T\mathbf H_f\mathbf h$。一変数Taylorを $t=1$ まで書けば代表式を得る。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「停留点分類」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：停留点分類

「Hessianと二次近似」で **停留点分類** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「停留点分類」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$\nabla f(\mathbf{x}^*)=0$ なら一次項が消え、符号は主に $\tfrac12\mathbf h^T\mathbf H\mathbf h$ で決まる。全非零 $\mathbf h$ で正なら周囲で増えるため極小、方向で符号が変われば鞍点。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「Hessianと二次近似」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $f(x,y)=x^2+4xy+5y^2$。Hessianは $\begin{bmatrix}2&4\\4&10\end{bmatrix}$。主座小行列式は2>0、行列式20-16=4>0なので正定値。原点は厳密局所極小。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$f(x,y)=x^2+4xy+5y^2$。Hessianは $\begin{bmatrix}2&4\\4&10\end{bmatrix}$。主座小行列式は2>0、行列式20-16=4>0なので正定値。原点は厳密局所極小。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「Hessianと二次近似」のどの部分が変わるか説明せよ。

> $f(x,y)=x^2-y^2$ のHessianは $\operatorname{diag}(2,-2)$。$x$ 方向では増え、$y$ 方向では減るため不定値で原点は鞍点。勾配0だけでは極値でない。

<details><summary>完全解答</summary>

$f(x,y)=x^2-y^2$ のHessianは $\operatorname{diag}(2,-2)$。$x$ 方向では増え、$y$ 方向では減るため不定値で原点は鞍点。勾配0だけでは極値でない。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「Hessianと二次近似」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> $f(x,y)=x^4+y^4$ は原点でHessianが0行列だが厳密局所極小。Hessianが半正定値だから極小と断定するのではなく、高次項を見る必要がある。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 二次偏微分の連続性があればHessianの対称性が保証される
- Hessian判定は停留点で用いる
- 半正定値・半負定値だけでは高次項が必要な場合がある

失敗例は次の通り。

$f(x,y)=x^4+y^4$ は原点でHessianが0行列だが厳密局所極小。Hessianが半正定値だから極小と断定するのではなく、高次項を見る必要がある。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「Hessianと二次近似」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> Newton法ではHessianを逆に解くが、明示逆行列より線形方程式 $\mathbf H\mathbf p=-\nabla f$ をsolveする。大規模問題ではHessian-vector productや近似Hessianを使う。

<details><summary>完全解答</summary>

Newton法ではHessianを逆に解くが、明示逆行列より線形方程式 $\mathbf H\mathbf p=-\nabla f$ をsolveする。大規模問題ではHessian-vector productや近似Hessianを使う。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「Hessianと二次近似」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> Hessianが正定値であることは局所凸性と結び付く。Course 06では強凸性、Newton法、条件数をHessianの固有値から定量化する。

<details><summary>完全解答</summary>

Hessianが正定値であることは局所凸性と結び付く。Course 06では強凸性、Newton法、条件数をHessianの固有値から定量化する。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「Hessianと二次近似」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
f(\mathbf{x}+\mathbf h)\approx f(\mathbf{x})+\nabla f(\mathbf{x})^{\mathsf T}\mathbf h+\frac12\mathbf h^{\mathsf T}\mathbf H_f(\mathbf{x})\mathbf h
$$

**導出**

1. **勾配を一次近似する** — $\nabla f(\mathbf{x}+t\mathbf h)\approx\nabla f(\mathbf{x})+t\mathbf H_f(\mathbf{x})\mathbf h$。これは勾配というベクトル値関数にJacobianを適用したもので、そのJacobianがHessian。

2. **線上の一変数関数へ還元** — $g(t)=f(\mathbf{x}+t\mathbf h)$ とすると $g^{\prime}(0)=\nabla f^T\mathbf h$、$g^{\prime\prime}(0)=\mathbf h^T\mathbf H_f\mathbf h$。一変数Taylorを $t=1$ まで書けば代表式を得る。

3. **停留点分類** — $\nabla f(\mathbf{x}^*)=0$ なら一次項が消え、符号は主に $\tfrac12\mathbf h^T\mathbf H\mathbf h$ で決まる。全非零 $\mathbf h$ で正なら周囲で増えるため極小、方向で符号が変われば鞍点。

**数値・具体例**

$f(x,y)=x^2+4xy+5y^2$。Hessianは $\begin{bmatrix}2&4\\4&10\end{bmatrix}$。主座小行列式は2>0、行列式20-16=4>0なので正定値。原点は厳密局所極小。

**条件を壊すと**

$f(x,y)=x^4+y^4$ は原点でHessianが0行列だが厳密局所極小。Hessianが半正定値だから極小と断定するのではなく、高次項を見る必要がある。

**実装**

Newton法ではHessianを逆に解くが、明示逆行列より線形方程式 $\mathbf H\mathbf p=-\nabla f$ をsolveする。大規模問題ではHessian-vector productや近似Hessianを使う。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
