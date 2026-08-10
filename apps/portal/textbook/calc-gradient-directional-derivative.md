# 勾配と方向微分：教科書

Course 01｜微積分｜Topic 08/13

## このTopicは、前の何を受けて始まるか

偏微分は座標軸方向だけを測った。実際には斜めを含む任意方向へ動くので、全偏微分を一つのベクトルにまとめ、任意方向の変化率を計算する。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

偏微分を一つのベクトルにまとめると、任意方向への一次変化が内積一つで計算できる。そのベクトルが勾配である。

地形で矢印 $\nabla f$ は最も急に上る方向を指す。歩く方向 $\mathbf u$ が勾配と同じなら最大の上り、直交すれば一次的には高さが変わらない。

## 図の解説

<img src="/visuals/course-01/calc-gradient-directional-derivative.png" alt="勾配と方向微分の図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では等高線と点 $\mathbf{x}$ から出る勾配ベクトルを描く。勾配は等高線に直交し、任意方向 $\mathbf u$ への変化率は勾配をその方向へ射影した長さになる。

## 記号・型・次元

- $\nabla f(\mathbf{x})$：偏微分を並べた勾配ベクトル
- $\mathbf u$：長さ1の方向ベクトル
- $D_{\mathbf u}f$：$\mathbf u$ 方向の方向微分
- $\|\nabla f\|_2$：最急上昇率


## 正式な定義・代表式

$f$ が $\mathbf{x}$ で全微分可能なら、$\nabla f$ を各偏微分からなる列ベクトルと定義する。単位ベクトル $\mathbf u$ に対する方向微分は $D_{\mathbf u}f=\lim_{h\to0}[f(\mathbf{x}+h\mathbf u)-f(\mathbf{x})]/h$。

代表式は

$$
D_{\mathbf u}f(\mathbf{x})=\nabla f(\mathbf{x})^{\mathsf T}\mathbf u
$$

です。

## なぜこの式・結論になるのか

### 1. 局所線形近似を使う

全微分可能なら $f(\mathbf{x}+\Delta\mathbf{x})=f(\mathbf{x})+\nabla f(\mathbf{x})^T\Delta\mathbf{x}+o(\|\Delta\mathbf{x}\|)$。

### 2. 特定方向に $h$ だけ進む

$\Delta\mathbf{x}=h\mathbf u$ を代入して差分商を取ると $[f(\mathbf{x}+h\mathbf u)-f(\mathbf{x})]/h=\nabla f^T\mathbf u+o(|h|)/h$。極限で余りが0になり方向微分公式を得る。

### 3. 最急方向を求める

$\|\mathbf u\|=1$ ならCauchy–Schwarzより $\nabla f^T\mathbf u\le\|\nabla f\|\|\mathbf u\|=\|\nabla f\|$。等号は $\mathbf u=\nabla f/\|\nabla f\|$ のときなので勾配方向が最急上昇。

## 教科書が省略しやすい一段を補う


### なぜ方向微分が勾配との内積になるのか

単位ベクトル $\mathbf u\in\mathbb R^n$ に沿う直線 $\mathbf x(t)=\mathbf x_0+t\mathbf u$ を考え、合成関数 $g(t)=f(\mathbf x(t))$ を作る。これは一変数関数なので、連鎖律より
$$
g'(0)=\sum_{i=1}^n\frac{\partial f}{\partial x_i}(\mathbf x_0)u_i
=\nabla f(\mathbf x_0)^T\mathbf u.
$$
左辺が方向微分だから式が得られる。

さらにCauchy–Schwarz不等式より
$$
D_{\mathbf u}f=\nabla f^T\mathbf u
\le \|\nabla f\|_2\|\mathbf u\|_2
=\|\nabla f\|_2.
$$
等号は $\mathbf u$ が勾配と同方向のとき成立する。したがって勾配は単に偏微分を並べたベクトルではなく、単位長さだけ動くとき関数を最も速く増加させる方向を表す。負の勾配が最急降下方向になるのも同じ不等式から分かる。



## 途中を飛ばさず全体をつなぐ

### 勾配と方向微分の導出を一本につなげる

$f$ が $\mathbf{x}$ で全微分可能なら、$\nabla f$ を各偏微分からなる列ベクトルと定義する。単位ベクトル $\mathbf u$ に対する方向微分は $D_{\mathbf u}f=\lim_{h\to0}[f(\mathbf{x}+h\mathbf u)-f(\mathbf{x})]/h$。

#### 1. 局所線形近似を使う

まず出発点を固定する。 全微分可能なら $f(\mathbf{x}+\Delta\mathbf{x})=f(\mathbf{x})+\nabla f(\mathbf{x})^T\Delta\mathbf{x}+o(\|\Delta\mathbf{x}\|)$。 次に必要になるのは「特定方向に $h$ だけ進む」である。

#### 2. 特定方向に $h$ だけ進む

ここまでで得た結果を次の段階へ渡す。 $\Delta\mathbf{x}=h\mathbf u$ を代入して差分商を取ると $[f(\mathbf{x}+h\mathbf u)-f(\mathbf{x})]/h=\nabla f^T\mathbf u+o(|h|)/h$。極限で余りが0になり方向微分公式を得る。 次に必要になるのは「最急方向を求める」である。

#### 3. 最急方向を求める

最後に、前二段階の結果をまとめて結論へ進む。 $\|\mathbf u\|=1$ ならCauchy–Schwarzより $\nabla f^T\mathbf u\le\|\nabla f\|\|\mathbf u\|=\|\nabla f\|$。等号は $\mathbf u=\nabla f/\|\nabla f\|$ のときなので勾配方向が最急上昇。

#### 代表式へ戻す

以上をまとめた中心式は

$$
D_{\mathbf u}f(\mathbf{x})=\nabla f(\mathbf{x})^{\mathsf T}\mathbf u
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x,y)=x^2+2y^2$、点 $(1,1)$ では $\nabla f=(2,4)^T$。$\mathbf u=(3/5,4/5)^T$ なら方向微分は $2(3/5)+4(4/5)=22/5$。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

同じ点で等高線の接線方向として $\mathbf v=(2,-1)^T/\sqrt5$ を取ると $(2,4)\cdot(2,-1)=0$ なので方向微分0。これは勾配が等高線に直交することを数値で確認している。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$\mathbf u$ の長さを1にしないと、$D_{c\mathbf u}=cD_{\mathbf u}$ となり「方向」ではなく移動速度まで混ざる。最急方向の比較に単位ベクトル条件が必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x,y)=x^2+2y^2$、点 $(1,1)$ では $\nabla f=(2,4)^T$。$\mathbf u=(3/5,4/5)^T$ なら方向微分は $2(3/5)+4(4/5)=22/5$。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

同じ点で等高線の接線方向として $\mathbf v=(2,-1)^T/\sqrt5$ を取ると $(2,4)\cdot(2,-1)=0$ なので方向微分0。これは勾配が等高線に直交することを数値で確認している。

## 成立条件と、条件を外したときに何が壊れるか

- 最急方向比較では方向ベクトルを単位長さにする
- 方向微分公式を線形近似として使うには全微分可能性が重要
- 勾配0では一次情報だけで増減方向を判断できない

$\mathbf u$ の長さを1にしないと、$D_{c\mathbf u}=cD_{\mathbf u}$ となり「方向」ではなく移動速度まで混ざる。最急方向の比較に単位ベクトル条件が必要。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

勾配は「偏微分のただの一覧」ではなく、内積を通して全方向の一次変化を同時に符号化したベクトル。この幾何的役割が最適化で重要。

## 実装・数値計算では何に注意するか

gradient descentでは $-\nabla f$ 方向へ進む。学習率がstepの長さを担うため、方向微分で単位ベクトルを使った議論と、実際の更新ベクトルを区別する。

## ここから一段だけ発展する

スカラー出力では局所線形写像を勾配の転置で表せる。ベクトル出力へ一般化するとJacobian行列になる。


## このTopicを理解できたか確認する問い

- 方向微分公式を局所線形近似から導けるか
- 勾配が等高線に直交する理由を方向微分0から説明できるか
- 最急上昇方向が勾配方向になる証明でCauchy–Schwarzのどこを使うか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-gradient-directional-derivative)　|　[スライドへ](/slides/calc-gradient-directional-derivative/)
