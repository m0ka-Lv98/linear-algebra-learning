# k近傍法と距離学習：教科書

Course 08｜機械学習｜Topic 06/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-generative-classifiers-naive-bayes-lda` で得た概念を使い、ここでは k近傍法と距離学習 へ進む。

前提として使うのは `la-inner-products-norms-angles`、`ml-problem-formulation-data-splits` です。

## まず直感を作る

分類器は入力からクラス確率またはスコアを作り、決定境界でクラスを分ける。



## 図の解説

<img src="/visuals/course-08/ml-knn-distance-methods.png" alt="k近傍法と距離学習の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2クラス点群と確率等高線、decision boundaryを描く。 背景の確率面がP(y=1|x)、その0.5等高線がdecision boundary、点が観測データである。モデルの連続な確率出力と離散な最終分類を区別できる。

## 記号・型・次元

- $\mathcal N_k(x)$：queryのk nearest training points
- $d(x,x_i)$：distance
- $k$：neighborhood size


## 正式な定義・代表式

kNNはlocal smoothness仮定のnonparametric method。classificationはneighbor label vote、regressionは平均等。

代表式は

$$
\hat{y}=\operatorname{mode}\{y_i:i\in\mathcal{N}_k(\mathbf{x})\}
$$

です。

## なぜこの式・結論になるのか

### 1. locality assumption

近いxではconditional target distributionも似ると仮定。

### 2. bias-variance via k

小kはlocalでlow bias/high variance、大kはsmoothでhigh bias/lower variance。

### 3. distance scale

Euclidean distanceはfeature unitsに依存するためscaling/metric choiceがmodelそのもの。

## 教科書が省略しやすい一段を補う


### kNNではdistance metricがmodelそのもの

query xに対しtraining pointsをdistance順に並べ、近いk個のlabels/targetsを集約する。parameterized decision functionを先にfitしないのでnonparametricだが、metric、scaling、kは強いinductive bias。Euclidean distanceでは1つのfeature scaleが100倍ならそのfeatureが近傍をほぼ支配する。

k=1は非常にlocalでtraining noiseへ敏感、kを増やすとneighborhood averageでvarianceが減る一方boundaryがsmoothになりbiasが増える。high dimensionではdistance concentrationでnearest/farthestのrelative差が小さくなり、「近い」という概念自体が弱くなる。



## 途中を飛ばさず全体をつなぐ

### k近傍法と距離学習の導出を一本につなげる

kNNはlocal smoothness仮定のnonparametric method。classificationはneighbor label vote、regressionは平均等。

#### 1. locality assumption

まず出発点を固定する。 近いxではconditional target distributionも似ると仮定。 次に必要になるのは「bias-variance via k」である。

#### 2. bias-variance via k

ここまでで得た結果を次の段階へ渡す。 小kはlocalでlow bias/high variance、大kはsmoothでhigh bias/lower variance。 次に必要になるのは「distance scale」である。

#### 3. distance scale

最後に、前二段階の結果をまとめて結論へ進む。 Euclidean distanceはfeature unitsに依存するためscaling/metric choiceがmodelそのもの。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{y}=\operatorname{mode}\{y_i:i\in\mathcal{N}_k(\mathbf{x})\}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

k=1はtraining error0になりやすいがnoise labelへ敏感。k=15でboundary smooth化。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

high-dimensional dataでdistance concentrationしnearestとfarther差が小さくなる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

test point scalingをtrainと別fitするとdistance spaceが不整合。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

k=1はtraining error0になりやすいがnoise labelへ敏感。k=15でboundary smooth化。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

high-dimensional dataでdistance concentrationしnearestとfarther差が小さくなる。

## 成立条件と、条件を外したときに何が壊れるか

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- k近傍法と距離学習の定義と計算手順を区別し、数値例だけで一般性を判断しない。

test point scalingをtrainと別fitするとdistance spaceが不整合。

## よくある誤解を分解する

- k近傍法と距離学習の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

k近傍法と距離学習では、式へ数値を代入するだけでは不十分である。test point scalingをtrainと別fitするとdistance spaceが不整合。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

KD-treeは低dim向け、高dim approximate nearest neighbors。

## ここから一段だけ発展する

distanceでなくfeature thresholdをrecursiveに分けるdecision treeへ。


## このTopicを理解できたか確認する問い

- 「locality assumption」を式を見ずに説明できるか
- 「distance scale」までの論理を一段ずつ再現できるか
- k近傍法と距離学習の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-knn-distance-methods)　|　[スライドへ](/slides/ml-knn-distance-methods/)
