# baggingとrandom forest：教科書

Course 08｜機械学習｜Topic 08/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-decision-trees` で得た概念を使い、ここでは baggingとrandom forest へ進む。

前提として使うのは `ml-decision-trees`、`prob-expectation-variance-moments` です。

## まず直感を作る

木モデルは特徴量のしきい値で入力空間を再帰的に分割し、ensembleは複数木のばらつきを平均化する。



## 図の解説

<img src="/visuals/course-08/ml-ensembles-bagging-random-forests.png" alt="baggingとrandom forestの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2次元空間の矩形分割を描く。 各分岐は1つの特徴量に対する条件、葉は最終予測である。木を深くするとtraining dataを細かく分けられる一方、varianceが上がる。

## 記号・型・次元

- $f_b$：b番目base learner
- $B$：ensemble size
- $\hat f=B^{-1}\sum f_b$


## 正式な定義・代表式

baggingはbootstrap/resamplingで複数high-variance learnersを作り平均。random forestはさらにfeature subsamplingでtree間correlationを下げる。

代表式は

$$
\hat{f}(\mathbf{x})=\frac{1}{B}\sum_{b=1}^{B}f_b(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. average variance

同variance σ²、pair correlationρならaverage variance≈ρσ²+(1-ρ)σ²/B。

### 2. B増加

independent partは1/Bへ減るがcorrelated componentは残る。

### 3. feature randomness

random forestはsplit候補featuresをsubset化しstrong common featureへの依存を減らしtree diversityを増す。

## 教科書が省略しやすい一段を補う


### averagingで減るのはuncorrelated varianceだけ

同variance σ²、pairwise correlation ρのbase predictionsをB個平均するとvarianceは
$$
\rho\sigma^2+\frac{1-\rho}{B}\sigma^2.
$$
Bを増やすとsecond termは0へ行くがcorrelated componentは残る。baggingがbootstrapでtraining setsを変え、random forestがsplit feature subsetもrandomizeするのはtree同士のcorrelationを下げるため。

averageはbiasを必ず下げるわけではない。high-bias treesを何個平均してもsystematic errorは残る。out-of-bag evaluationは便利だが、hyperparameter tuningで繰り返し使えばそれ自体へ適応する。



## 途中を飛ばさず全体をつなぐ

### baggingとrandom forestの導出を一本につなげる

baggingはbootstrap/resamplingで複数high-variance learnersを作り平均。random forestはさらにfeature subsamplingでtree間correlationを下げる。

#### 1. average variance

まず出発点を固定する。 同variance σ²、pair correlationρならaverage variance≈ρσ²+(1-ρ)σ²/B。 次に必要になるのは「B増加」である。

#### 2. B増加

ここまでで得た結果を次の段階へ渡す。 independent partは1/Bへ減るがcorrelated componentは残る。 次に必要になるのは「feature randomness」である。

#### 3. feature randomness

最後に、前二段階の結果をまとめて結論へ進む。 random forestはsplit候補featuresをsubset化しstrong common featureへの依存を減らしtree diversityを増す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{f}(\mathbf{x})=\frac{1}{B}\sum_{b=1}^{B}f_b(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

correlation0ならB=100でvariance1/100。ρ=0.5ならlarge Bでも約0.5σ²が残る。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

out-of-bag samplesでinternal validation estimateを作れるがfinal testの代替ではない。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

correlation0ならB=100でvariance1/100。ρ=0.5ならlarge Bでも約0.5σ²が残る。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

out-of-bag samplesでinternal validation estimateを作れるがfinal testの代替ではない。

## 成立条件と、条件を外したときに何が壊れるか

- 深い木は過学習しやすい。
- feature importanceを因果効果とみなさない。
- baggingとrandom forestの定義と計算手順を区別し、数値例だけで一般性を判断しない。

同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。

## よくある誤解を分解する

- baggingとrandom forestの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

baggingとrandom forestでは、式へ数値を代入するだけでは不十分である。同じdeterministic treeを100回コピーしてもvarianceは減らない。diversityが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

n_estimatorsはparallelizable。random seedとbootstrap/feature fraction記録。

## ここから一段だけ発展する

平均ではなく前modelのmistake/residualへ次modelを逐次fitするboostingへ。


## このTopicを理解できたか確認する問い

- 「average variance」を式を見ずに説明できるか
- 「feature randomness」までの論理を一段ずつ再現できるか
- baggingとrandom forestの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-ensembles-bagging-random-forests)　|　[スライドへ](/slides/ml-ensembles-bagging-random-forests/)
