# 近接勾配法：教科書

Course 06｜最適化｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-duality-dual-gradient` で得た概念を使い、ここでは 近接勾配法 へ進む。

前提として使うのは `opt-projected-gradient`、`opt-convex-sets-functions` です。

## まず直感を作る

近接法は非滑らかな項を直接微分せず、近接写像で「縮める」操作として扱う。



## 図の解説

<img src="/visuals/course-06/opt-proximal-gradient.png" alt="近接勾配法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

L1近接写像のsoft-thresholdingを入力値ごとに描く。 gradient step後の点をそのまま採用せず、正則化項を含むproximal subproblemで近い点へ戻す。L1なら成分ごとのsoft-thresholdingとして0へ吸着する。

## 記号・型・次元

- $F(x)=f(x)+g(x)$：smooth f + possibly nonsmooth g
- $prox_{ηg}(z)=argmin_x[g(x)+\frac1{2η}\|x-z\|²]$


## 正式な定義・代表式

proximal gradientはfをgradientで一次近似し、gはexactに残したlocal subproblemを解く。

代表式は

$$
\mathbf{x}_{k+1}=\operatorname{prox}_{\eta g}(\mathbf{x}_k-\eta\nabla f(\mathbf{x}_k))
$$

です。

## なぜこの式・結論になるのか

### 1. fのquadratic upper model

$f(x)\approx f(x_k)+∇f_k^T(x-x_k)+\frac1{2η}\|x-x_k\|²$。

### 2. 平方完成

g(x)を加え、x依存部分をまとめると $g(x)+\frac1{2η}\|x-(x_k-η∇f_k)\|²$。

### 3. prox update

このargminが $prox_{ηg}(x_k-η∇f_k)$。g=0ならplain GD、indicator gならprojection。

## 教科書が省略しやすい一段を補う


### smooth partとnonsmooth partを分けて解く

$f(x)+g(x)$ でf smooth、g convex but nonsmoothとする。fをx_k周りで一次近似しquadratic stabilizationを足した
$$
\min_x\; g(x)+\nabla f(x_k)^T(x-x_k)+\frac1{2\eta}\|x-x_k\|^2
$$
を解く。平方完成すると
$x_{k+1}=\operatorname{prox}_{\eta g}(x_k-\eta\nabla f(x_k))$。

L1ならproxはsoft-thresholdingで、gradient step後の小さいcomponentをexactly zeroへできる。nondifferentiabilityを無理にgradientへ押し込まず、structureをsubproblemへ残すのが核心。


### L1 proxをscalarで導く

$\operatorname{prox}_{\eta\lambda|\cdot|}(z)=\arg\min_x\lambda|x|+(x-z)^2/(2\eta)$。x>0では derivative λ+(x-z)/η=0 → x=z-ηλ、valid only z>ηλ。x<0では x=z+ηλ、valid z<-ηλ。残り |z|≤ηλではx=0がminimum。

よって $\operatorname{sign}(z)\max(|z|-\eta\lambda,0)$。soft-thresholdingがexact zerosを作る理由をnondifferentiable kinkから導ける。

## 途中を飛ばさず全体をつなぐ

### 近接勾配法の導出を一本につなげる

proximal gradientはfをgradientで一次近似し、gはexactに残したlocal subproblemを解く。

#### 1. fのquadratic upper model

まず出発点を固定する。 $f(x)\approx f(x_k)+∇f_k^T(x-x_k)+\frac1{2η}\|x-x_k\|²$。 次に必要になるのは「平方完成」である。

#### 2. 平方完成

ここまでで得た結果を次の段階へ渡す。 g(x)を加え、x依存部分をまとめると $g(x)+\frac1{2η}\|x-(x_k-η∇f_k)\|²$。 次に必要になるのは「prox update」である。

#### 3. prox update

最後に、前二段階の結果をまとめて結論へ進む。 このargminが $prox_{ηg}(x_k-η∇f_k)$。g=0ならplain GD、indicator gならprojection。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\operatorname{prox}_{\eta g}(\mathbf{x}_k-\eta\nabla f(\mathbf{x}_k))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

g=λ||x||_1ならproxはsoft-thresholding。gradient step後に小さい成分をzeroへ縮めるISTA。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

g=indicator_Cならprox=projection_Cとなりprojected gradientを包含する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

gのproxが難しいと1stepがcheapとは限らない。分割が不適切なら利点を失う。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

g=λ||x||_1ならproxはsoft-thresholding。gradient step後に小さい成分をzeroへ縮めるISTA。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

g=indicator_Cならprox=projection_Cとなりprojected gradientを包含する。

## 成立条件と、条件を外したときに何が壊れるか

- proxは単なるgradient stepではない。
- step sizeと正則化係数の積を確認する。
- 近接勾配法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

gのproxが難しいと1stepがcheapとは限らない。分割が不適切なら利点を失う。

## よくある誤解を分解する

- 近接勾配法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

近接勾配法では、式へ数値を代入するだけでは不十分である。gのproxが難しいと1stepがcheapとは限らない。分割が不適切なら利点を失う。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

FISTA acceleration、backtracking、duality gapを利用。thresholdのλ/η conventionをlibraryで確認。

## ここから一段だけ発展する

dataが巨大ならfull gradientをsample gradientへ置換するstochastic gradientへ。


## このTopicを理解できたか確認する問い

- 「fのquadratic upper model」を式を見ずに説明できるか
- 「prox update」までの論理を一段ずつ再現できるか
- 近接勾配法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-proximal-gradient)　|　[スライドへ](/slides/opt-proximal-gradient/)
