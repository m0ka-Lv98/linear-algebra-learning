# Lagrange乗数法：教科書

Course 01｜微積分｜Topic 13/13

## このTopicは、前の何を受けて始まるか

制約なしでは全方向へ動けたため勾配0が必要だった。制約付きでは動ける方向が制約面の接方向に限られるので、勾配そのものが0でなくても極値になれる。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

制約面に沿って動ける方向すべてで目的関数が変化しない極値では、目的関数の勾配は制約面の法線方向にしか残れない。

等高線が制約曲線へ接する点では、制約に沿って少し動いても目的関数が一次的に変わらない。両曲線の法線、つまり二つの勾配が同じ方向を向く。

## 図の解説

<img src="/visuals/course-01/calc-lagrange-multipliers.png" alt="Lagrange乗数法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では目的関数の等高線と制約曲線 $g(x,y)=c$ を描く。最適点では両者が接し、それぞれに垂直な $\nabla f$ と $\nabla g$ が平行になる。交差している点なら制約曲線に沿ってさらに高い／低い等高線へ移動できる。

## 記号・型・次元

- $f:\mathbb R^n\to\mathbb R$：目的関数
- $g:\mathbb R^n\to\mathbb R$：制約を表す関数
- $g(\mathbf x)=c$：許される点の集合
- $\lambda$：Lagrange乗数。二つの法線ベクトルの倍率


## 正式な定義・代表式

制約面が正則、すなわち $\nabla g(\mathbf x^*)\ne0$ で、$\mathbf x^*$ が制約上の局所極値なら、ある $\lambda$ が存在して $\nabla f=\lambda\nabla g$。制約式と合わせて未知数 $\mathbf x,\lambda$ を解く。

代表式は

$$
\nabla f(\mathbf{x}^*)=\lambda\nabla g(\mathbf{x}^*),\quad g(\mathbf{x}^*)=c
$$

です。

## なぜこの式・結論になるのか

### 1. 制約上の許される微小移動

制約 $g(\mathbf x)=c$ を満たし続ける接ベクトル $\mathbf v$ は一次的に $\nabla g(\mathbf x^*)^T\mathbf v=0$ を満たす。つまり接空間は $\nabla g$ に直交する。

### 2. 最適点では目的も接方向に変わらない

制約に沿う任意の $\mathbf v$ に対し $\nabla f(\mathbf x^*)^T\mathbf v=0$。したがって $\nabla f$ も同じ接空間の全ベクトルに直交する。

### 3. 法線空間が1次元なら平行

$\nabla g\ne0$ の一制約では接空間の直交補空間は $\operatorname{span}\{\nabla g\}$。よって $\nabla f$ はそのspanに属し、$\nabla f=\lambda\nabla g$。

## 教科書が省略しやすい一段を補う


### なぜ二つの勾配が平行になるのか

制約 $g(\mathbf x)=c$ 上を動く微小変位 $\mathbf h$ は、一次近似では
$$
\nabla g(\mathbf x)^T\mathbf h=0
$$
を満たす。つまり許される接線方向は $\nabla g$ に直交する。制約付き極値 $\mathbf x^*$ では、許されるどの接線方向へ動いても目的関数を一次的に改善できないため
$$
\nabla f(\mathbf x^*)^T\mathbf h=0
$$
も全ての接線 $\mathbf h$ に対して成立する。

同じ接空間に直交するベクトルは、滑らかな1本の等式制約なら法線 $\nabla g$ のスカラー倍でなければならない。よって
$$
\nabla f(\mathbf x^*)=\lambda\nabla g(\mathbf x^*)
$$
が得られる。これは「勾配を適当に等しく置く」手法ではなく、制約面上で動ける方向が全て消えるという幾何条件の代数表現である。$\nabla g=0$ のregularity failureではこの議論が崩れるため別途注意が必要になる。



## 途中を飛ばさず全体をつなぐ

### Lagrange乗数法の導出を一本につなげる

制約面が正則、すなわち $\nabla g(\mathbf x^*)\ne0$ で、$\mathbf x^*$ が制約上の局所極値なら、ある $\lambda$ が存在して $\nabla f=\lambda\nabla g$。制約式と合わせて未知数 $\mathbf x,\lambda$ を解く。

#### 1. 制約上の許される微小移動

まず出発点を固定する。 制約 $g(\mathbf x)=c$ を満たし続ける接ベクトル $\mathbf v$ は一次的に $\nabla g(\mathbf x^*)^T\mathbf v=0$ を満たす。つまり接空間は $\nabla g$ に直交する。 次に必要になるのは「最適点では目的も接方向に変わらない」である。

#### 2. 最適点では目的も接方向に変わらない

ここまでで得た結果を次の段階へ渡す。 制約に沿う任意の $\mathbf v$ に対し $\nabla f(\mathbf x^*)^T\mathbf v=0$。したがって $\nabla f$ も同じ接空間の全ベクトルに直交する。 次に必要になるのは「法線空間が1次元なら平行」である。

#### 3. 法線空間が1次元なら平行

最後に、前二段階の結果をまとめて結論へ進む。 $\nabla g\ne0$ の一制約では接空間の直交補空間は $\operatorname{span}\{\nabla g\}$。よって $\nabla f$ はそのspanに属し、$\nabla f=\lambda\nabla g$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\nabla f(\mathbf{x}^*)=\lambda\nabla g(\mathbf{x}^*),\quad g(\mathbf{x}^*)=c
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x,y)=xy$ を $x^2+y^2=1$ 上で最大化。$\nabla f=(y,x)$、$\nabla g=(2x,2y)$。$y=2\lambda x$, $x=2\lambda y$ と制約を解き、$x=\pm y=\pm1/\sqrt2$。値を比較して最大 $1/2$、最小 $-1/2$。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x,y)=x+y$、制約 $x^2+4y^2=1$。条件 $(1,1)=\lambda(2x,8y)$ から $x=1/(2\lambda)$, $y=1/(8\lambda)$。制約に代入して $\lambda$ を求める。楕円上の接点としても同じ点が得られる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$g(x,y)=x^2+y^2=0$ の唯一の点は原点だが、原点で $\nabla g=0$。正則性が壊れているため通常のLagrange条件から有用な情報が得られない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x,y)=xy$ を $x^2+y^2=1$ 上で最大化。$\nabla f=(y,x)$、$\nabla g=(2x,2y)$。$y=2\lambda x$, $x=2\lambda y$ と制約を解き、$x=\pm y=\pm1/\sqrt2$。値を比較して最大 $1/2$、最小 $-1/2$。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x,y)=x+y$、制約 $x^2+4y^2=1$。条件 $(1,1)=\lambda(2x,8y)$ から $x=1/(2\lambda)$, $y=1/(8\lambda)$。制約に代入して $\lambda$ を求める。楕円上の接点としても同じ点が得られる。

## 成立条件と、条件を外したときに何が壊れるか

- 制約勾配が0でない正則点を基本仮定とする
- Lagrange条件は候補を与える必要条件であり値比較や二階条件が必要な場合がある
- 複数制約では各制約勾配の線形結合へ一般化する

$g(x,y)=x^2+y^2=0$ の唯一の点は原点だが、原点で $\nabla g=0$。正則性が壊れているため通常のLagrange条件から有用な情報が得られない。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

$\lambda$ を「答えの意味不明な補助変数」とせず、目的関数の法線が制約法線の何倍かを表す量と理解する。後の最適化では制約を緩めたときの感度としても解釈される。

## 実装・数値計算では何に注意するか

数値制約最適化では方程式を手で解くだけでなくKKT系を反復的に解く。制約のスケールが極端に違うと数値条件が悪化するため正規化も重要。

## ここから一段だけ発展する

不等式制約へ進むと、全制約が常に効くわけではなく、active constraintと相補性条件が必要になる。Course 06のKKT条件はLagrange乗数法の体系的な一般化。


## このTopicを理解できたか確認する問い

- 接ベクトルが $\nabla g$ に直交する理由を微分から導けるか
- 二つの勾配が平行になる論理を「接空間の直交補」で説明できるか
- $\nabla g=0$ だと通常の導出のどこが壊れるか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-lagrange-multipliers)　|　[スライドへ](/slides/calc-lagrange-multipliers/)
