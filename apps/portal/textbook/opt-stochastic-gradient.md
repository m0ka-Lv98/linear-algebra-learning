# 確率的勾配法：教科書

Course 06｜最適化｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-proximal-gradient` で得た概念を使い、ここでは 確率的勾配法 へ進む。

前提として使うのは `opt-gradient-descent-convergence`、`prob-expectation-variance-moments` です。

## まず直感を作る

確率的最適化は全データ勾配の代わりにノイズを含む推定勾配を使い、計算量と分散を交換する。



## 図の解説

<img src="/visuals/course-06/opt-stochastic-gradient.png" alt="確率的勾配法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

full gradientとmini-batch軌跡を比較する。 full gradientの滑らかな軌跡に対しmini-batch gradientは揺らぐが、期待的には同じ下降方向を推定する。学習率は進む速さとノイズ平均化の両方を制御する。

## 記号・型・次元

- $f(x)=E_\xi[\ell(x;\xi)]$
- $\widehat{\nabla f}$：mini-batch gradient estimate
- $\eta_k$：learning rate


## 正式な定義・代表式

SGDはunbiased/low-biasなgradient estimateで更新し、1step costをdata sizeから切り離す。noiseとstep scheduleが収束挙動を決める。

代表式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta_k\widehat{\nabla f}(\mathbf{x}_k)
$$

です。

## なぜこの式・結論になるのか

### 1. full gradient as expectation

finite dataなら $∇f=(1/n)\sum_i∇\ell_i$。uniform sample iなら $E[∇\ell_i]=∇f$。

### 2. random update

$x_{k+1}=x_k-η_k g_k$。条件付き期待ではGD方向だが各stepはnoiseを含む。

### 3. noise floor

constant ηではoptimum近傍でもgradient noiseにより揺れ続ける。η_kを減らす/variance reductionでより精密に収束。

## 教科書が省略しやすい一段を補う


### SGDはfull gradientのunbiased noisy estimateを使う

empirical risk $F(w)=n^{-1}\sum_i\ell_i(w)$ のgradientは全sample和。mini-batch Bを一様抽出すれば
$g_B=|B|^{-1}\sum_{i\in B}\nabla\ell_i$ は通常 $E[g_B]=\nabla F$。1stepはnoiseを含むが、計算costを下げ多step更新できる。

constant learning rateではoptimum近傍でnoise floorを持ち、減衰learning rateなら適切条件で収束。batch sizeを増やすとvarianceは減るが1step cost・memory増加。SGDのrandomnessをregularizationと呼ぶ場合もあるが、明示的regularizerとは区別する。



## 途中を飛ばさず全体をつなぐ

### 確率的勾配法の導出を一本につなげる

SGDはunbiased/low-biasなgradient estimateで更新し、1step costをdata sizeから切り離す。noiseとstep scheduleが収束挙動を決める。

#### 1. full gradient as expectation

まず出発点を固定する。 finite dataなら $∇f=(1/n)\sum_i∇\ell_i$。uniform sample iなら $E[∇\ell_i]=∇f$。 次に必要になるのは「random update」である。

#### 2. random update

ここまでで得た結果を次の段階へ渡す。 $x_{k+1}=x_k-η_k g_k$。条件付き期待ではGD方向だが各stepはnoiseを含む。 次に必要になるのは「noise floor」である。

#### 3. noise floor

最後に、前二段階の結果をまとめて結論へ進む。 constant ηではoptimum近傍でもgradient noiseにより揺れ続ける。η_kを減らす/variance reductionでより精密に収束。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta_k\widehat{\nabla f}(\mathbf{x}_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

n=1e6でbatch100なら1stepはfull gradientの約1/10000 data。多くのcheap stepで早く有用解へ。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

batch sizeを増やすとgradient varianceが下がるがcompute/memory/parallel efficiencyとのtradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

1 sample gradientが常に下降方向とは限らない。1step loss増加を即bugと判断しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

n=1e6でbatch100なら1stepはfull gradientの約1/10000 data。多くのcheap stepで早く有用解へ。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

batch sizeを増やすとgradient varianceが下がるがcompute/memory/parallel efficiencyとのtradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- 学習率scheduleが収束に強く影響する。
- batchの乱数seedとshuffleを管理する。
- 確率的勾配法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

1 sample gradientが常に下降方向とは限らない。1step loss増加を即bugと判断しない。

## よくある誤解を分解する

- 確率的勾配法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

確率的勾配法では、式へ数値を代入するだけでは不十分である。1 sample gradientが常に下降方向とは限らない。1step loss増加を即bugと判断しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

shuffle、sampler、batch size、seed、learning-rate scheduleを再現性情報として残す。

## ここから一段だけ発展する

gradientの一階・二階momentをonline推定してcoordinate-wise stepを変えるadaptive optimizerへ。


## このTopicを理解できたか確認する問い

- 「full gradient as expectation」を式を見ずに説明できるか
- 「noise floor」までの論理を一段ずつ再現できるか
- 確率的勾配法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-stochastic-gradient)　|　[スライドへ](/slides/opt-stochastic-gradient/)
