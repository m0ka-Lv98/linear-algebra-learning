# momentumと加速勾配法：教科書

Course 06｜最適化｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-gradient-descent-convergence` で得た概念を使い、ここでは momentumと加速勾配法 へ進む。

前提として使うのは `opt-gradient-descent-convergence` です。

## まず直感を作る

一階法は局所の傾きを使って下降方向を作り、step sizeが一歩の大きさを決める。



## 図の解説

<img src="/visuals/course-06/opt-momentum-accelerated-gradient.png" alt="momentumと加速勾配法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

楕円等高線上で勾配降下の軌跡を追う。 楕円等高線に垂直な矢印がgradient、その反対向きが局所的な最急降下方向である。軌跡がジグザグするのは方向ごとの曲率が異なるためである。

## 記号・型・次元

- $v_k$：蓄積direction/momentum
- $\beta\in[0,1)$：memory係数
- $\eta$：step


## 正式な定義・代表式

momentumは過去gradient情報を指数的に蓄積し、同方向成分を強め反転する成分を相殺する。Nesterov accelerationはconvex smoothでO(1/k²) rateを得る構成。

代表式は

$$
\mathbf{v}_{k+1}=\beta\mathbf{v}_k+\nabla f(\mathbf{x}_k)
$$

です。

## なぜこの式・結論になるのか

### 1. 指数平均として展開

$v_{k+1}=\beta v_k+g_k$ を展開すると $v_{k+1}=g_k+\beta g_{k-1}+\beta²g_{k-2}+\cdots$。

### 2. valleyでの効果

急曲率方向でgradient符号が交互なら過去項と相殺、緩い方向で同符号なら蓄積。

### 3. accelerationの注意

単なる物理analogyだけでNesterov rateは出ない。特定のlook-ahead sequence/potential解析が必要で、ここではgradient descentとの構造差まで理解する。

## 教科書が省略しやすい一段を補う


### momentumは過去の更新をstateとして持つ

plain gradient descentはcurrent gradientだけで方向を決める。momentumでは
$v_{k+1}=\beta v_k+\nabla f(x_k)$、$x_{k+1}=x_k-\eta v_{k+1}$
のように過去方向を指数的に蓄積する。narrow valleyでgradientが左右へ振動する成分は符号反転で相殺され、同方向へ続く成分は蓄積されるためジグザグを抑えやすい。

Nesterov accelerationはgradientをlook-ahead pointで評価する形に変わり、convex smooth problemで理論上 $O(1/k^2)$ rateを得る。係数を適当に増やせば速くなるわけではなく、η,βの安定領域がある。



## 途中を飛ばさず全体をつなぐ

### momentumと加速勾配法の導出を一本につなげる

momentumは過去gradient情報を指数的に蓄積し、同方向成分を強め反転する成分を相殺する。Nesterov accelerationはconvex smoothでO(1/k²) rateを得る構成。

#### 1. 指数平均として展開

まず出発点を固定する。 $v_{k+1}=\beta v_k+g_k$ を展開すると $v_{k+1}=g_k+\beta g_{k-1}+\beta²g_{k-2}+\cdots$。 次に必要になるのは「valleyでの効果」である。

#### 2. valleyでの効果

ここまでで得た結果を次の段階へ渡す。 急曲率方向でgradient符号が交互なら過去項と相殺、緩い方向で同符号なら蓄積。 次に必要になるのは「accelerationの注意」である。

#### 3. accelerationの注意

最後に、前二段階の結果をまとめて結論へ進む。 単なる物理analogyだけでNesterov rateは出ない。特定のlook-ahead sequence/potential解析が必要で、ここではgradient descentとの構造差まで理解する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{v}_{k+1}=\beta\mathbf{v}_k+\nabla f(\mathbf{x}_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

細長いquadratic valleyでplain GDが左右にzig-zagするのに対しmomentumは横成分を減衰し谷方向へ速度を蓄える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

β=0なら通常gradient descentへ戻る。βを1に近づけすぎると長いmemoryでovershootしやすい。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

momentumは常に速くなるわけではない。nonstationary/noisy gradientや不適切η,βでoscillation/divergence。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

細長いquadratic valleyでplain GDが左右にzig-zagするのに対しmomentumは横成分を減衰し谷方向へ速度を蓄える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

β=0なら通常gradient descentへ戻る。βを1に近づけすぎると長いmemoryでovershootしやすい。

## 成立条件と、条件を外したときに何が壊れるか

- step sizeが大きすぎると発散、小さすぎると遅い。
- 勾配のスケールは変数のスケールに依存する。
- momentumと加速勾配法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

momentumは常に速くなるわけではない。nonstationary/noisy gradientや不適切η,βでoscillation/divergence。

## よくある誤解を分解する

- momentumと加速勾配法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

momentumと加速勾配法では、式へ数値を代入するだけでは不十分である。momentumは常に速くなるわけではない。nonstationary/noisy gradientや不適切η,βでoscillation/divergence。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

frameworkごとにmomentum式（classical/Nesterov）の定義が異なる。hyperparameter意味をdocumentationで確認。

## ここから一段だけ発展する

一階情報に加えcurvatureを直接使うNewton法なら局所でさらに速い収束が可能。


## このTopicを理解できたか確認する問い

- 「指数平均として展開」を式を見ずに説明できるか
- 「accelerationの注意」までの論理を一段ずつ再現できるか
- momentumと加速勾配法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-momentum-accelerated-gradient)　|　[スライドへ](/slides/opt-momentum-accelerated-gradient/)
