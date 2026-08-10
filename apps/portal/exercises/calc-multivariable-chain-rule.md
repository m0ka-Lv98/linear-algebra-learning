# 多変数の連鎖律：演習

Course 01｜Topic 11/13。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/calc-multivariable-chain-rule)

## 問1. 定義と記号

「多変数の連鎖律」の代表式

$$
\mathbf J_{f\circ g}(\mathbf{x})=\mathbf J_f(g(\mathbf{x}))\mathbf J_g(\mathbf{x})
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、多変数の連鎖律が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**内側の局所近似**

$g(\mathbf x+\mathbf h)=g(\mathbf x)+\mathbf J_g\mathbf h+o(\|\mathbf h\|)$。中間変数の変化は $\Delta\mathbf z\approx\mathbf J_g\mathbf h$。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：内側の局所近似

「多変数の連鎖律」で **内側の局所近似** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「内側の局所近似」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$g(\mathbf x+\mathbf h)=g(\mathbf x)+\mathbf J_g\mathbf h+o(\|\mathbf h\|)$。中間変数の変化は $\Delta\mathbf z\approx\mathbf J_g\mathbf h$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「外側へ渡す」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：外側へ渡す

「多変数の連鎖律」で **外側へ渡す** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「外側へ渡す」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$f(\mathbf z+\Delta\mathbf z)=f(\mathbf z)+\mathbf J_f\Delta\mathbf z+o(\|\Delta\mathbf z\|)$。$\Delta\mathbf z\approx\mathbf J_g\mathbf h$ を代入すると一次項は $\mathbf J_f\mathbf J_g\mathbf h$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「shapeが順序を決める」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：shapeが順序を決める

「多変数の連鎖律」で **shapeが順序を決める** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「shapeが順序を決める」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

$(m\times p)(p\times n)=m\times n$ で入力 $\mathbb R^n$ から出力 $\mathbb R^m$ への写像になる。逆順 $\mathbf J_g\mathbf J_f$ は通常shapeが合わず、関数合成の順序とも一致しない。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「多変数の連鎖律」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> $g(x,y)=(x+y,xy)^T$、$f(u,v)=u^2+v$。$\mathbf J_g=\begin{bmatrix}1&1\\y&x\end{bmatrix}$、$\mathbf J_f=[2u,1]$。積は $[2(x+y)+y,\ 2(x+y)+x]$ で、直接 $f(g)= (x+y)^2+xy$ を偏微分した結果と一致。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

$g(x,y)=(x+y,xy)^T$、$f(u,v)=u^2+v$。$\mathbf J_g=\begin{bmatrix}1&1\\y&x\end{bmatrix}$、$\mathbf J_f=[2u,1]$。積は $[2(x+y)+y,\ 2(x+y)+x]$ で、直接 $f(g)= (x+y)^2+xy$ を偏微分した結果と一致。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「多変数の連鎖律」のどの部分が変わるか説明せよ。

> スカラーloss $L$ と中間ベクトル $\mathbf z$、入力 $\mathbf x$ を考える。$\nabla_{\mathbf x}L=\mathbf J_g^T\nabla_{\mathbf z}L$ という転置形は、backpropagationで上流gradientを入力側へ戻す基本形。

<details><summary>完全解答</summary>

スカラーloss $L$ と中間ベクトル $\mathbf z$、入力 $\mathbf x$ を考える。$\nabla_{\mathbf x}L=\mathbf J_g^T\nabla_{\mathbf z}L$ という転置形は、backpropagationで上流gradientを入力側へ戻す基本形。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「多変数の連鎖律」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 行列積は可換でないので $\mathbf J_f\mathbf J_g=\mathbf J_g\mathbf J_f$ としてはいけない。shapeが偶然一致しても、写像の適用順序が逆になる。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 各写像が対応点で全微分可能であること
- Jacobianのshapeと掛ける順序を確認する
- スカラー勾配表記とJacobian表記で転置の規約を混同しない

失敗例は次の通り。

行列積は可換でないので $\mathbf J_f\mathbf J_g=\mathbf J_g\mathbf J_f$ としてはいけない。shapeが偶然一致しても、写像の適用順序が逆になる。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「多変数の連鎖律」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> reverse-mode ADは、スカラーlossに対してvector-Jacobian productを出力側から逆向きに計算し、巨大なJacobian全体を保存しない。これがdeep neural networkのbackpropagationを効率化する。

<details><summary>完全解答</summary>

reverse-mode ADは、スカラーlossに対してvector-Jacobian productを出力側から逆向きに計算し、巨大なJacobian全体を保存しない。これがdeep neural networkのbackpropagationを効率化する。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「多変数の連鎖律」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> 計算graphがDAGなら、各nodeの局所Jacobianをトポロジカル順に合成できる。Course 09でこの構造を誤差逆伝播として詳しく扱う。

<details><summary>完全解答</summary>

計算graphがDAGなら、各nodeの局所Jacobianをトポロジカル順に合成できる。Course 09でこの構造を誤差逆伝播として詳しく扱う。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「多変数の連鎖律」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
\mathbf J_{f\circ g}(\mathbf{x})=\mathbf J_f(g(\mathbf{x}))\mathbf J_g(\mathbf{x})
$$

**導出**

1. **内側の局所近似** — $g(\mathbf x+\mathbf h)=g(\mathbf x)+\mathbf J_g\mathbf h+o(\|\mathbf h\|)$。中間変数の変化は $\Delta\mathbf z\approx\mathbf J_g\mathbf h$。

2. **外側へ渡す** — $f(\mathbf z+\Delta\mathbf z)=f(\mathbf z)+\mathbf J_f\Delta\mathbf z+o(\|\Delta\mathbf z\|)$。$\Delta\mathbf z\approx\mathbf J_g\mathbf h$ を代入すると一次項は $\mathbf J_f\mathbf J_g\mathbf h$。

3. **shapeが順序を決める** — $(m\times p)(p\times n)=m\times n$ で入力 $\mathbb R^n$ から出力 $\mathbb R^m$ への写像になる。逆順 $\mathbf J_g\mathbf J_f$ は通常shapeが合わず、関数合成の順序とも一致しない。

**数値・具体例**

$g(x,y)=(x+y,xy)^T$、$f(u,v)=u^2+v$。$\mathbf J_g=\begin{bmatrix}1&1\\y&x\end{bmatrix}$、$\mathbf J_f=[2u,1]$。積は $[2(x+y)+y,\ 2(x+y)+x]$ で、直接 $f(g)= (x+y)^2+xy$ を偏微分した結果と一致。

**条件を壊すと**

行列積は可換でないので $\mathbf J_f\mathbf J_g=\mathbf J_g\mathbf J_f$ としてはいけない。shapeが偶然一致しても、写像の適用順序が逆になる。

**実装**

reverse-mode ADは、スカラーlossに対してvector-Jacobian productを出力側から逆向きに計算し、巨大なJacobian全体を保存しない。これがdeep neural networkのbackpropagationを効率化する。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
