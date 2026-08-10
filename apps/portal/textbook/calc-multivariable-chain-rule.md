# 多変数の連鎖律：教科書

Course 01｜微積分｜Topic 11/13

## このTopicは、前の何を受けて始まるか

各関数は局所的にはJacobianという線形写像で近似できる。二つの関数を合成したとき、その局所線形近似も「二つの線形写像の合成」になるはずであり、行列積が自然に現れる。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

局所的な線形写像を順に合成すると行列積になる。多変数の連鎖律はこの事実そのものである。

一変数では倍率×倍率だった。多変数では入力変化の方向も混ざるため、倍率が行列に置き換わり、順序を保った行列積になる。

## 図の解説

<img src="/visuals/course-01/calc-multivariable-chain-rule.png" alt="多変数の連鎖律の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では $\mathbf x\in\mathbb R^n\to\mathbf z=g(\mathbf x)\in\mathbb R^p\to\mathbf y=f(\mathbf z)\in\mathbb R^m$ の3層を描く。小変位 $d\mathbf x$ がまず $\mathbf J_gd\mathbf x$ へ、次に $\mathbf J_f(\mathbf J_gd\mathbf x)$ へ写るため全体行列は $\mathbf J_f\mathbf J_g$。

## 記号・型・次元

- $g:\mathbb R^n\to\mathbb R^p$
- $f:\mathbb R^p\to\mathbb R^m$
- $\mathbf J_g\in\mathbb R^{p\times n}$
- $\mathbf J_f\in\mathbb R^{m\times p}$
- $\mathbf J_{f\circ g}\in\mathbb R^{m\times n}$


## 正式な定義・代表式

$f,g$ が対応点で微分可能なら合成 $f\circ g$ も微分可能で、Jacobianは内側 $g$ のJacobianを右、外側 $f$ のJacobianを左に掛けた行列積になる。

代表式は

$$
\mathbf J_{f\circ g}(\mathbf{x})=\mathbf J_f(g(\mathbf{x}))\mathbf J_g(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. 内側の局所近似

$g(\mathbf x+\mathbf h)=g(\mathbf x)+\mathbf J_g\mathbf h+o(\|\mathbf h\|)$。中間変数の変化は $\Delta\mathbf z\approx\mathbf J_g\mathbf h$。

### 2. 外側へ渡す

$f(\mathbf z+\Delta\mathbf z)=f(\mathbf z)+\mathbf J_f\Delta\mathbf z+o(\|\Delta\mathbf z\|)$。$\Delta\mathbf z\approx\mathbf J_g\mathbf h$ を代入すると一次項は $\mathbf J_f\mathbf J_g\mathbf h$。

### 3. shapeが順序を決める

$(m\times p)(p\times n)=m\times n$ で入力 $\mathbb R^n$ から出力 $\mathbb R^m$ への写像になる。逆順 $\mathbf J_g\mathbf J_f$ は通常shapeが合わず、関数合成の順序とも一致しない。

## 教科書が省略しやすい一段を補う


### 行列積の順番がなぜこの向きなのか

$g:\mathbb R^n\to\mathbb R^p$、$f:\mathbb R^p\to\mathbb R^m$ とする。小さな入力変化 $\Delta\mathbf x$ に対し、まずgの全微分で
$$
\Delta\mathbf z\approx \mathbf J_g(\mathbf x)\Delta\mathbf x.
$$
次にfへ入る変化はこの $\Delta\mathbf z$ なので
$$
\Delta\mathbf y\approx \mathbf J_f(g(\mathbf x))\Delta\mathbf z.
$$
代入すると
$$
\Delta\mathbf y
\approx \mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)\Delta\mathbf x.
$$
したがって合成写像のJacobianは左からf、右からgの順で掛かる。

shapeを確認すると、$\mathbf J_g$ は $p\times n$、$\mathbf J_f$ は $m\times p$ なので積は $m\times n$。逆順では一般にshapeすら合わない。backpropagationではこの局所Jacobianの積を、必要なvector-Jacobian productとして逆方向に効率よく計算する。



## 途中を飛ばさず全体をつなぐ

### 多変数の連鎖律の導出を一本につなげる

$f,g$ が対応点で微分可能なら合成 $f\circ g$ も微分可能で、Jacobianは内側 $g$ のJacobianを右、外側 $f$ のJacobianを左に掛けた行列積になる。

#### 1. 内側の局所近似

まず出発点を固定する。 $g(\mathbf x+\mathbf h)=g(\mathbf x)+\mathbf J_g\mathbf h+o(\|\mathbf h\|)$。中間変数の変化は $\Delta\mathbf z\approx\mathbf J_g\mathbf h$。 次に必要になるのは「外側へ渡す」である。

#### 2. 外側へ渡す

ここまでで得た結果を次の段階へ渡す。 $f(\mathbf z+\Delta\mathbf z)=f(\mathbf z)+\mathbf J_f\Delta\mathbf z+o(\|\Delta\mathbf z\|)$。$\Delta\mathbf z\approx\mathbf J_g\mathbf h$ を代入すると一次項は $\mathbf J_f\mathbf J_g\mathbf h$。 次に必要になるのは「shapeが順序を決める」である。

#### 3. shapeが順序を決める

最後に、前二段階の結果をまとめて結論へ進む。 $(m\times p)(p\times n)=m\times n$ で入力 $\mathbb R^n$ から出力 $\mathbb R^m$ への写像になる。逆順 $\mathbf J_g\mathbf J_f$ は通常shapeが合わず、関数合成の順序とも一致しない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf J_{f\circ g}(\mathbf{x})=\mathbf J_f(g(\mathbf{x}))\mathbf J_g(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$g(x,y)=(x+y,xy)^T$、$f(u,v)=u^2+v$。$\mathbf J_g=\begin{bmatrix}1&1\\y&x\end{bmatrix}$、$\mathbf J_f=[2u,1]$。積は $[2(x+y)+y,\ 2(x+y)+x]$ で、直接 $f(g)= (x+y)^2+xy$ を偏微分した結果と一致。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

スカラーloss $L$ と中間ベクトル $\mathbf z$、入力 $\mathbf x$ を考える。$\nabla_{\mathbf x}L=\mathbf J_g^T\nabla_{\mathbf z}L$ という転置形は、backpropagationで上流gradientを入力側へ戻す基本形。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

行列積は可換でないので $\mathbf J_f\mathbf J_g=\mathbf J_g\mathbf J_f$ としてはいけない。shapeが偶然一致しても、写像の適用順序が逆になる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$g(x,y)=(x+y,xy)^T$、$f(u,v)=u^2+v$。$\mathbf J_g=\begin{bmatrix}1&1\\y&x\end{bmatrix}$、$\mathbf J_f=[2u,1]$。積は $[2(x+y)+y,\ 2(x+y)+x]$ で、直接 $f(g)= (x+y)^2+xy$ を偏微分した結果と一致。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

スカラーloss $L$ と中間ベクトル $\mathbf z$、入力 $\mathbf x$ を考える。$\nabla_{\mathbf x}L=\mathbf J_g^T\nabla_{\mathbf z}L$ という転置形は、backpropagationで上流gradientを入力側へ戻す基本形。

## 成立条件と、条件を外したときに何が壊れるか

- 各写像が対応点で全微分可能であること
- Jacobianのshapeと掛ける順序を確認する
- スカラー勾配表記とJacobian表記で転置の規約を混同しない

行列積は可換でないので $\mathbf J_f\mathbf J_g=\mathbf J_g\mathbf J_f$ としてはいけない。shapeが偶然一致しても、写像の適用順序が逆になる。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

「偏微分を全部掛ける」ではなく、中間変数ごとの経路を足し合わせる構造。行列表記はその多数の経路和を一度に表している。

## 実装・数値計算では何に注意するか

reverse-mode ADは、スカラーlossに対してvector-Jacobian productを出力側から逆向きに計算し、巨大なJacobian全体を保存しない。これがdeep neural networkのbackpropagationを効率化する。

## ここから一段だけ発展する

計算graphがDAGなら、各nodeの局所Jacobianをトポロジカル順に合成できる。Course 09でこの構造を誤差逆伝播として詳しく扱う。


## このTopicを理解できたか確認する問い

- shapeだけからJacobian積の順序を決められるか
- 直接微分とJacobian積が一致する2変数例を計算できるか
- reverse-modeで転置が現れる理由を内積・連鎖律から説明できるか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-multivariable-chain-rule)　|　[スライドへ](/slides/calc-multivariable-chain-rule/)
