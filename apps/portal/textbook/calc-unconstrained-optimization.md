# 多変数の制約なし最適化：教科書

Course 01｜微積分｜Topic 12/13

## このTopicは、前の何を受けて始まるか

方向微分とHessianを学んだので、一変数の最適化を多変数へ一般化できる。局所最適では全ての方向で一階の改善が消える必要がある。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

全ての方向への一次変化を同時に0にする条件が勾配0であり、Hessianでその停留点が谷・山・鞍点のどれかを判定する。

勾配が非零なら、その反対方向へ十分小さく進むと一次近似で関数値を下げられる。したがって内部の滑らかな局所最小では勾配は0でなければならない。

## 図の解説

<img src="/visuals/course-01/calc-unconstrained-optimization.png" alt="多変数の制約なし最適化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では等高線上の点から負の勾配方向へ矢印を描く。非停留点では矢印方向へ進むと低い等高線へ移れる。停留点では勾配矢印が0になり、Hessianが谷・山・鞍の形を決める。

## 記号・型・次元

- $f:\mathbb R^n\to\mathbb R$：目的関数
- $\mathbf{x}^*$：局所最適候補
- $\nabla f$：一階微分情報
- $\mathbf H_f$：二階曲率情報


## 正式な定義・代表式

制約のない開領域の内部で $f$ が微分可能かつ $\mathbf x^*$ が局所極値なら $\nabla f(\mathbf x^*)=0$。さらにHessianが正定値なら厳密局所極小、負定値なら極大、不定値なら鞍点。

代表式は

$$
\nabla f(\mathbf{x}^*)=\mathbf0
$$

です。

## なぜこの式・結論になるのか

### 1. 非零勾配なら下降方向が存在する

$\nabla f(\mathbf x)\ne0$ とし $\mathbf u=-\nabla f/\|\nabla f\|$。方向微分は $D_{\mathbf u}f=-\|\nabla f\|<0$。よって十分小さい正のstepで値を下げられる。

### 2. 局所最小では矛盾

局所最小なら周囲にこれ以上小さい点があってはならない。したがって上の下降方向が存在しない必要があり、$\nabla f=0$。

### 3. 二次項で分類

停留点ではTaylor近似の一次項が消え、$f(\mathbf x^*+\mathbf h)-f(\mathbf x^*)\approx\tfrac12\mathbf h^T\mathbf H\mathbf h$。二次形式の符号で局所形状を分類する。

## 教科書が省略しやすい一段を補う


### 勾配0からgradient descentへ進む理由

滑らかな $f$ の点 $\mathbf x$ で、任意の小変化 $\mathbf h$ に対する一次近似は
$f(\mathbf x+\mathbf h)\approx f(\mathbf x)+\nabla f^T\mathbf h$。
長さを固定した $\mathbf h$ の中で右辺を最も小さくするのはCauchy–Schwarzより $\mathbf h$ が $-\nabla f$ 方向のときである。そこで
$$
\mathbf x_{k+1}=\mathbf x_k-\eta\nabla f(\mathbf x_k)
$$
という更新が自然に出る。

ただし一次近似は局所的なので、$\eta$ が大きすぎれば実際には増加する。勾配がL-Lipschitzならdescent lemmaから
$$
f(\mathbf x-\eta\nabla f)
\le f(\mathbf x)-\eta\left(1-\frac{L\eta}{2}\right)\|\nabla f\|^2
$$
が得られ、$0<\eta<2/L$ なら右辺が減少方向になる。この関係はCourse 06の最適化で体系的に扱う。ここでは「負の勾配だから必ず下がる」のではなく、局所近似が有効なstep sizeが必要だと理解する。



## 途中を飛ばさず全体をつなぐ

### 多変数の制約なし最適化の導出を一本につなげる

制約のない開領域の内部で $f$ が微分可能かつ $\mathbf x^*$ が局所極値なら $\nabla f(\mathbf x^*)=0$。さらにHessianが正定値なら厳密局所極小、負定値なら極大、不定値なら鞍点。

#### 1. 非零勾配なら下降方向が存在する

まず出発点を固定する。 $\nabla f(\mathbf x)\ne0$ とし $\mathbf u=-\nabla f/\|\nabla f\|$。方向微分は $D_{\mathbf u}f=-\|\nabla f\|<0$。よって十分小さい正のstepで値を下げられる。 次に必要になるのは「局所最小では矛盾」である。

#### 2. 局所最小では矛盾

ここまでで得た結果を次の段階へ渡す。 局所最小なら周囲にこれ以上小さい点があってはならない。したがって上の下降方向が存在しない必要があり、$\nabla f=0$。 次に必要になるのは「二次項で分類」である。

#### 3. 二次項で分類

最後に、前二段階の結果をまとめて結論へ進む。 停留点ではTaylor近似の一次項が消え、$f(\mathbf x^*+\mathbf h)-f(\mathbf x^*)\approx\tfrac12\mathbf h^T\mathbf H\mathbf h$。二次形式の符号で局所形状を分類する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\nabla f(\mathbf{x}^*)=\mathbf0
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x,y)=(x-1)^2+2(y+1)^2$。勾配 $(2(x-1),4(y+1))^T=0$ から $(1,-1)$。Hessian $\operatorname{diag}(2,4)$ は正定値なので一意な大域最小でもある。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x,y)=x^2-y^2$ は原点で勾配0だがHessian不定値。停留点を見つけただけでは最小化は終わらない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$f(x,y)=|x|+y^2$ は原点で最小だが $x$ 方向に微分不能。勾配0条件を使うには微分可能性が必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x,y)=(x-1)^2+2(y+1)^2$。勾配 $(2(x-1),4(y+1))^T=0$ から $(1,-1)$。Hessian $\operatorname{diag}(2,4)$ は正定値なので一意な大域最小でもある。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x,y)=x^2-y^2$ は原点で勾配0だがHessian不定値。停留点を見つけただけでは最小化は終わらない。

## 成立条件と、条件を外したときに何が壊れるか

- 内部の微分可能な点での必要条件
- 非凸関数では停留点が複数あり得る
- Hessian半正定値だけでは高次項が必要な場合がある

$f(x,y)=|x|+y^2$ は原点で最小だが $x$ 方向に微分不能。勾配0条件を使うには微分可能性が必要。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

「gradient descentが止まった＝大域最適」は誤り。勾配が小さいのは停留条件に近いことしか示さず、局所極小・鞍点・plateauを区別するには追加情報が要る。

## 実装・数値計算では何に注意するか

勾配降下更新 $\mathbf x_{k+1}=\mathbf x_k-\eta\nabla f$ は一次Taylorで $f(\mathbf x-\eta\nabla f)\approx f(\mathbf x)-\eta\|\nabla f\|^2$ と下がることから動機付けられる。ただしstepが大きいと高次項が無視できない。

## ここから一段だけ発展する

Course 06では凸性を追加すると局所最小＝大域最小となり、勾配法の収束率まで定量化できる。ここではまず一般の非凸関数での必要条件を理解する。


## このTopicを理解できたか確認する問い

- 非零勾配から下降方向を構成して必要条件を証明できるか
- 勾配0なのに鞍点となる例をHessianで説明できるか
- 勾配法の負符号を一次Taylor近似から説明できるか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-unconstrained-optimization)　|　[スライドへ](/slides/calc-unconstrained-optimization/)
