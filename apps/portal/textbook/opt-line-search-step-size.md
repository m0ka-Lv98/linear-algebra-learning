# line searchとstep size：教科書

Course 06｜最適化｜Topic 05/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-optimality-conditions` で得た概念を使い、ここでは line searchとstep size へ進む。

前提として使うのは `opt-optimality-conditions`、`num-convergence-orders-stopping` です。

## まず直感を作る

一階法は局所の傾きを使って下降方向を作り、step sizeが一歩の大きさを決める。



## 図の解説

<img src="/visuals/course-06/opt-line-search-step-size.png" alt="line searchとstep sizeの図解" style="max-height: 440px; display:block; margin:0 auto;" />

楕円等高線上で勾配降下の軌跡を追う。 楕円等高線に垂直な矢印がgradient、その反対向きが局所的な最急降下方向である。軌跡がジグザグするのは方向ごとの曲率が異なるためである。

## 記号・型・次元

- $\mathbf p$：search direction
- $\alpha>0$：step size
- $c_1\in(0,1)$：Armijo parameter


## 正式な定義・代表式

line searchは方向pを固定し一次元関数 $\phi(\alpha)=f(x+\alpha p)$ 上で十分な減少を満たすαを選ぶ。Armijo条件は実際の減少を一次予測の一定割合以上要求する。

代表式は

$$
f(\mathbf{x}+\alpha\mathbf{p})\le f(\mathbf{x})+c_1\alpha\nabla f(\mathbf{x})^{\mathsf T}\mathbf{p}
$$

です。

## なぜこの式・結論になるのか

### 1. 一次予測

$f(x+\alpha p)\approx f(x)+\alpha\nabla f(x)^Tp$。descent directionなら内積<0。

### 2. 十分減少

高次項があるので予測通り全部下がる必要はない。$f(x+αp)\le f(x)+c_1α∇f^Tp$ を要求。

### 3. backtracking

大きいαからρ倍して条件成立まで縮める。smoothなdescent directionなら十分小さいαで成立。

## 教科書が省略しやすい一段を補う


### step sizeは方向とは別のoptimization problem

下降direction p_kを決めても $x_{k+1}=x_k+\alpha p_k$ のαが大きすぎれば谷を飛び越え、小さすぎれば遅い。exact line searchは一変数関数 $\phi(\alpha)=f(x_k+\alpha p_k)$ を最小化するが高価。

Armijo conditionは
$f(x+\alpha p)\le f(x)+c_1\alpha\nabla f^Tp$
を満たすまでbacktrackingし、「一次予測に比例した十分な減少」を要求する。Wolfe conditionsはさらにdirectional derivativeを制御し、stepが小さすぎることも防ぐ。line searchはgradient directionの正しさとstep lengthの安全性を分離する仕組みである。



## 途中を飛ばさず全体をつなぐ

### line searchとstep sizeの導出を一本につなげる

line searchは方向pを固定し一次元関数 $\phi(\alpha)=f(x+\alpha p)$ 上で十分な減少を満たすαを選ぶ。Armijo条件は実際の減少を一次予測の一定割合以上要求する。

#### 1. 一次予測

まず出発点を固定する。 $f(x+\alpha p)\approx f(x)+\alpha\nabla f(x)^Tp$。descent directionなら内積<0。 次に必要になるのは「十分減少」である。

#### 2. 十分減少

ここまでで得た結果を次の段階へ渡す。 高次項があるので予測通り全部下がる必要はない。$f(x+αp)\le f(x)+c_1α∇f^Tp$ を要求。 次に必要になるのは「backtracking」である。

#### 3. backtracking

最後に、前二段階の結果をまとめて結論へ進む。 大きいαからρ倍して条件成立まで縮める。smoothなdescent directionなら十分小さいαで成立。

#### 代表式へ戻す

以上をまとめた中心式は

$$
f(\mathbf{x}+\alpha\mathbf{p})\le f(\mathbf{x})+c_1\alpha\nabla f(\mathbf{x})^{\mathsf T}\mathbf{p}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

quadraticでsteepest descent p=-g。αが大きすぎるとvalleyを飛び越え、backtrackingが安定なstepへ縮める。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

fixed learning rateはcheapだがproblem scaleで再調整が必要。line searchはfunction/gradient evaluation追加cost。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

pがdescent directionでない（g^Tp≥0）ならαを小さくしてもArmijoの意味ある下降を保証できない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

quadraticでsteepest descent p=-g。αが大きすぎるとvalleyを飛び越え、backtrackingが安定なstepへ縮める。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

fixed learning rateはcheapだがproblem scaleで再調整が必要。line searchはfunction/gradient evaluation追加cost。

## 成立条件と、条件を外したときに何が壊れるか

- step sizeが大きすぎると発散、小さすぎると遅い。
- 勾配のスケールは変数のスケールに依存する。
- line searchとstep sizeの定義と計算手順を区別し、数値例だけで一般性を判断しない。

pがdescent directionでない（g^Tp≥0）ならαを小さくしてもArmijoの意味ある下降を保証できない。

## よくある誤解を分解する

- line searchとstep sizeの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

line searchとstep sizeでは、式へ数値を代入するだけでは不十分である。pがdescent directionでない（g^Tp≥0）ならαを小さくしてもArmijoの意味ある下降を保証できない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

NaN region, bound constraintsがある場合trial step validityも確認。function evaluation countをbenchmarkに含める。

## ここから一段だけ発展する

step size ruleを得た上でgradient descentの収束rateを導く。


## このTopicを理解できたか確認する問い

- 「一次予測」を式を見ずに説明できるか
- 「backtracking」までの論理を一段ずつ再現できるか
- line searchとstep sizeの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-line-search-step-size)　|　[スライドへ](/slides/opt-line-search-step-size/)
