# 決定木：教科書

Course 08｜機械学習｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-knn-distance-methods` で得た概念を使い、ここでは 決定木 へ進む。

前提として使うのは `stat-entropy-cross-entropy-kl-divergence`、`dm-algorithm-specifications-correctness` です。

## まず直感を作る

木モデルは特徴量のしきい値で入力空間を再帰的に分割し、ensembleは複数木のばらつきを平均化する。



## 図の解説

<img src="/visuals/course-08/ml-decision-trees.png" alt="決定木の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2次元空間の矩形分割を描く。 各分岐は1つの特徴量に対する条件、葉は最終予測である。木を深くするとtraining dataを細かく分けられる一方、varianceが上がる。

## 記号・型・次元

- $H(Y)$：node impurity/entropy
- $IG$：split前後impurity reduction
- $v$：child branch


## 正式な定義・代表式

decision treeはfeature条件でdataをpartitionし、各leafでsimple prediction。split criterionはlabel uncertainty減少を評価。

代表式は

$$
\operatorname{IG}=H(Y)-\sum_v p(v)H(Y\mid v)
$$

です。

## なぜこの式・結論になるのか

### 1. node uncertainty

entropy/Giniでclass混合度をscalar化。

### 2. weighted child uncertainty

split後は各child size probabilityでimpurityをweighted average。

### 3. information gain

parent minus child average。greedyに最大gain splitを選ぶがglobal best tree保証はない。

## 教科書が省略しやすい一段を補う


### greedy splitはglobal tree optimizationではない

node内label uncertaintyをentropy/Giniで測り、candidate split後のchild impurityをsample proportionでweighted averageする。parent impurityとの差がgain。各nodeで最大gain splitを選ぶのは、その時点の一段先だけを最適化するgreedy procedureであり、最終tree全体のglobal optimumを保証しない。

深く分ければleafがpureになりtraining errorは下がるがsample数が減ってvariance上昇。max depth, min leaf, pruningがregularization。continuous threshold候補やhigh-cardinality categoryの候補数が多いほどselection biasも出るのでvalidationが必要。



## 途中を飛ばさず全体をつなぐ

### 決定木の導出を一本につなげる

decision treeはfeature条件でdataをpartitionし、各leafでsimple prediction。split criterionはlabel uncertainty減少を評価。

#### 1. node uncertainty

まず出発点を固定する。 entropy/Giniでclass混合度をscalar化。 次に必要になるのは「weighted child uncertainty」である。

#### 2. weighted child uncertainty

ここまでで得た結果を次の段階へ渡す。 split後は各child size probabilityでimpurityをweighted average。 次に必要になるのは「information gain」である。

#### 3. information gain

最後に、前二段階の結果をまとめて結論へ進む。 parent minus child average。greedyに最大gain splitを選ぶがglobal best tree保証はない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{IG}=H(Y)-\sum_v p(v)H(Y\mid v)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

perfectly pure splitならchild entropy0でgain=parent entropy。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

deep treeはtraining setを細かくmemorizeしvariance増大。pruning/max depth。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

high-cardinality categorical featureは多split choiceでgainを過大に見せる場合。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

perfectly pure splitならchild entropy0でgain=parent entropy。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

deep treeはtraining setを細かくmemorizeしvariance増大。pruning/max depth。

## 成立条件と、条件を外したときに何が壊れるか

- 深い木は過学習しやすい。
- feature importanceを因果効果とみなさない。
- 決定木の定義と計算手順を区別し、数値例だけで一般性を判断しない。

high-cardinality categorical featureは多split choiceでgainを過大に見せる場合。

## よくある誤解を分解する

- 決定木の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

決定木では、式へ数値を代入するだけでは不十分である。high-cardinality categorical featureは多split choiceでgainを過大に見せる場合。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

missing values, class weights, min samples leafをvalidationで決定。

## ここから一段だけ発展する

high-variance treeを多数平均してvarianceを下げるbagging/random forest。


## このTopicを理解できたか確認する問い

- 「node uncertainty」を式を見ずに説明できるか
- 「information gain」までの論理を一段ずつ再現できるか
- 決定木の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-decision-trees)　|　[スライドへ](/slides/ml-decision-trees/)
