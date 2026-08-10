# Hessianと二次近似：教科書

Course 01｜微積分｜Topic 10/13

## このTopicは、前の何を受けて始まるか

Jacobianは一次の局所変化を表した。停留点では一次項が0になるため、次に効くのは二次の変化。各偏微分をもう一度微分してHessianにまとめる。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

一次近似が傾きを表すのに対し、Hessianは方向ごとの曲がり方を二次形式として表す。

Hessianは「どの方向にどれだけ曲がるか」をまとめた行列。谷底では全方向に上へ曲がり、山頂では全方向に下へ曲がり、鞍点では方向によって符号が変わる。

## 図の解説

<img src="/visuals/course-01/calc-hessian-second-order.png" alt="Hessianと二次近似の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では等高線が楕円になる二次関数と鞍型の等高線を描く。正定値Hessianではどの方向 $\mathbf h$ に対しても $\mathbf h^T\mathbf H\mathbf h>0$ なので中心から離れると値が増える。固有ベクトル方向が楕円の主軸になる。

## 記号・型・次元

- $\mathbf H_f(\mathbf{x})\in\mathbb R^{n\times n}$：二階偏微分を並べたHessian
- $H_{ij}=\partial^2f/(\partial x_i\partial x_j)$
- $\mathbf h$：評価点からの小さな変位
- $\mathbf h^T\mathbf H\mathbf h$：方向 $\mathbf h$ に沿う二次変化


## 正式な定義・代表式

二階偏微分が連続ならHessianは対称。多変数Taylor展開の二次項は $\tfrac12\mathbf h^T\mathbf H_f\mathbf h$。停留点でHessianが正定値なら厳密局所極小、負定値なら厳密局所極大、不定値なら鞍点。

代表式は

$$
f(\mathbf{x}+\mathbf h)\approx f(\mathbf{x})+\nabla f(\mathbf{x})^{\mathsf T}\mathbf h+\frac12\mathbf h^{\mathsf T}\mathbf H_f(\mathbf{x})\mathbf h
$$

です。

## なぜこの式・結論になるのか

### 1. 勾配を一次近似する

$\nabla f(\mathbf{x}+t\mathbf h)\approx\nabla f(\mathbf{x})+t\mathbf H_f(\mathbf{x})\mathbf h$。これは勾配というベクトル値関数にJacobianを適用したもので、そのJacobianがHessian。

### 2. 線上の一変数関数へ還元

$g(t)=f(\mathbf{x}+t\mathbf h)$ とすると $g^{\prime}(0)=\nabla f^T\mathbf h$、$g^{\prime\prime}(0)=\mathbf h^T\mathbf H_f\mathbf h$。一変数Taylorを $t=1$ まで書けば代表式を得る。

### 3. 停留点分類

$\nabla f(\mathbf{x}^*)=0$ なら一次項が消え、符号は主に $\tfrac12\mathbf h^T\mathbf H\mathbf h$ で決まる。全非零 $\mathbf h$ で正なら周囲で増えるため極小、方向で符号が変われば鞍点。

## 教科書が省略しやすい一段を補う


### 二次形式が局所的な「曲がり方」をまとめる

スカラー値関数 $f:\mathbb R^n\to\mathbb R$ の勾配をさらに微分するとHessian $\mathbf H_f$ が得られる。Taylor展開を点 $\mathbf x$ のまわりで二次まで書けば
$$
f(\mathbf x+\mathbf h)
=f(\mathbf x)+\nabla f(\mathbf x)^T\mathbf h
+\frac12\mathbf h^T\mathbf H_f(\mathbf x)\mathbf h
+o(\|\mathbf h\|^2).
$$
停留点では一次項が0になるので、近傍の増減は主に二次形式 $\mathbf h^T\mathbf H\mathbf h$ の符号で決まる。

全ての非零 $\mathbf h$ でこの二次形式が正なら、どの方向へ少し動いても値が増えるため局所最小。負なら局所最大。方向によって正負が変われば鞍点である。Hessianの固有値を使う判定は、この二次形式を直交固有ベクトル方向へ分解して各方向の曲率を見ることに対応する。



## 途中を飛ばさず全体をつなぐ

### Hessianと二次近似の導出を一本につなげる

二階偏微分が連続ならHessianは対称。多変数Taylor展開の二次項は $\tfrac12\mathbf h^T\mathbf H_f\mathbf h$。停留点でHessianが正定値なら厳密局所極小、負定値なら厳密局所極大、不定値なら鞍点。

#### 1. 勾配を一次近似する

まず出発点を固定する。 $\nabla f(\mathbf{x}+t\mathbf h)\approx\nabla f(\mathbf{x})+t\mathbf H_f(\mathbf{x})\mathbf h$。これは勾配というベクトル値関数にJacobianを適用したもので、そのJacobianがHessian。 次に必要になるのは「線上の一変数関数へ還元」である。

#### 2. 線上の一変数関数へ還元

ここまでで得た結果を次の段階へ渡す。 $g(t)=f(\mathbf{x}+t\mathbf h)$ とすると $g^{\prime}(0)=\nabla f^T\mathbf h$、$g^{\prime\prime}(0)=\mathbf h^T\mathbf H_f\mathbf h$。一変数Taylorを $t=1$ まで書けば代表式を得る。 次に必要になるのは「停留点分類」である。

#### 3. 停留点分類

最後に、前二段階の結果をまとめて結論へ進む。 $\nabla f(\mathbf{x}^*)=0$ なら一次項が消え、符号は主に $\tfrac12\mathbf h^T\mathbf H\mathbf h$ で決まる。全非零 $\mathbf h$ で正なら周囲で増えるため極小、方向で符号が変われば鞍点。

#### 代表式へ戻す

以上をまとめた中心式は

$$
f(\mathbf{x}+\mathbf h)\approx f(\mathbf{x})+\nabla f(\mathbf{x})^{\mathsf T}\mathbf h+\frac12\mathbf h^{\mathsf T}\mathbf H_f(\mathbf{x})\mathbf h
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x,y)=x^2+4xy+5y^2$。Hessianは $\begin{bmatrix}2&4\\4&10\end{bmatrix}$。主座小行列式は2>0、行列式20-16=4>0なので正定値。原点は厳密局所極小。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x,y)=x^2-y^2$ のHessianは $\operatorname{diag}(2,-2)$。$x$ 方向では増え、$y$ 方向では減るため不定値で原点は鞍点。勾配0だけでは極値でない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$f(x,y)=x^4+y^4$ は原点でHessianが0行列だが厳密局所極小。Hessianが半正定値だから極小と断定するのではなく、高次項を見る必要がある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x,y)=x^2+4xy+5y^2$。Hessianは $\begin{bmatrix}2&4\\4&10\end{bmatrix}$。主座小行列式は2>0、行列式20-16=4>0なので正定値。原点は厳密局所極小。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x,y)=x^2-y^2$ のHessianは $\operatorname{diag}(2,-2)$。$x$ 方向では増え、$y$ 方向では減るため不定値で原点は鞍点。勾配0だけでは極値でない。

## 成立条件と、条件を外したときに何が壊れるか

- 二次偏微分の連続性があればHessianの対称性が保証される
- Hessian判定は停留点で用いる
- 半正定値・半負定値だけでは高次項が必要な場合がある

$f(x,y)=x^4+y^4$ は原点でHessianが0行列だが厳密局所極小。Hessianが半正定値だから極小と断定するのではなく、高次項を見る必要がある。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

Hessianの各成分だけを個別に見るのは危険。混合項があるため、曲率の符号は二次形式全体または固有値で判定する。

## 実装・数値計算では何に注意するか

Newton法ではHessianを逆に解くが、明示逆行列より線形方程式 $\mathbf H\mathbf p=-\nabla f$ をsolveする。大規模問題ではHessian-vector productや近似Hessianを使う。

## ここから一段だけ発展する

Hessianが正定値であることは局所凸性と結び付く。Course 06では強凸性、Newton法、条件数をHessianの固有値から定量化する。


## このTopicを理解できたか確認する問い

- 線上関数 $g(t)$ を使って二次Taylor項を導けるか
- $\mathbf h^T\mathbf H\mathbf h$ の符号と等高線の形を結び付けられるか
- Hessianが0でも極小になり得る例を説明できるか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-hessian-second-order)　|　[スライドへ](/slides/calc-hessian-second-order/)
