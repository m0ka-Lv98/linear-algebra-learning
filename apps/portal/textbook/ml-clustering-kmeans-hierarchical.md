# k-meansと階層clustering：教科書

Course 08｜機械学習｜Topic 12/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-kernel-methods-feature-maps` で得た概念を使い、ここでは k-meansと階層clustering へ進む。

前提として使うのは `la-inner-products-norms-angles`、`opt-coordinate-conjugate-directions` です。

## まず直感を作る

clusteringは正解ラベルなしで近い点を群へまとめる。距離と群の形状仮定が結果を決める。



## 図の解説

<img src="/visuals/course-08/ml-clustering-kmeans-hierarchical.png" alt="k-meansと階層clusteringの図解" style="max-height: 440px; display:block; margin:0 auto;" />

k-means中心が反復で動く様子を追う。 点群とクラスタ中心/密度成分を描く。教師ラベルではなく、距離や確率モデルが定める内部構造に基づいて割当てが更新される。

## 記号・型・次元

- $\mu_k$：cluster centroid
- $c_i$：assignment
- $K$：clusters


## 正式な定義・代表式

k-meansはwithin-cluster squared Euclidean distanceを最小化し、assignmentとcentroid updateを交互に行う。

代表式は

$$
\min_{\{\boldsymbol{\mu}_k\}}\sum_i\min_k\|\mathbf{x}_i-\boldsymbol{\mu}_k\|_2^2
$$

です。

## なぜこの式・結論になるのか

### 1. assignment step

centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。

### 2. centroid step

assignments固定で $\sum_{i:c_i=k}\|x_i-\mu_k\|²$ をμで微分するとmeanがminimizer。

### 3. monotone descent

各stepは片方固定でobjectiveを増やさないがjoint nonconvexなのでlocal optimum。

## 教科書が省略しやすい一段を補う


### k-meansの二stepがobjectiveを増やさない理由

objective $J=\sum_i\|x_i-\mu_{c_i}\|^2$。centroids固定なら各iをnearest centroidへ割り当てることがその項を最小にする。assignments固定ならcluster k内のsum squared distanceをμ_kで微分してmeanがminimizer。各stepは一方を固定したexact minimizationなのでJは非増加。

しかしjoint problemはnonconvexでinitializationによりlocal optimumが変わる。k-means++/multiple restartsが必要。Euclidean squared distanceゆえspherical/equal-scale clusterを好み、elongated/nonconvex structureにはhierarchical/density methods等を検討する。



## 途中を飛ばさず全体をつなぐ

### k-meansと階層clusteringの導出を一本につなげる

k-meansはwithin-cluster squared Euclidean distanceを最小化し、assignmentとcentroid updateを交互に行う。

#### 1. assignment step

まず出発点を固定する。 centroids固定で各pointはnearest centroidを選べばobjectiveを最小化。 次に必要になるのは「centroid step」である。

#### 2. centroid step

ここまでで得た結果を次の段階へ渡す。 assignments固定で $\sum_{i:c_i=k}\|x_i-\mu_k\|²$ をμで微分するとmeanがminimizer。 次に必要になるのは「monotone descent」である。

#### 3. monotone descent

最後に、前二段階の結果をまとめて結論へ進む。 各stepは片方固定でobjectiveを増やさないがjoint nonconvexなのでlocal optimum。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\{\boldsymbol{\mu}_k\}}\sum_i\min_k\|\mathbf{x}_i-\boldsymbol{\mu}_k\|_2^2
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2 well-separated spherical groupsならcentroidsが各meanへ。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

hierarchical clusteringはKを先に固定せずdendrogramを作るがlinkage choiceでgeometryが変わる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2 well-separated spherical groupsならcentroidsが各meanへ。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

hierarchical clusteringはKを先に固定せずdendrogramを作るがlinkage choiceでgeometryが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- k-meansは球状・同程度分散の群を好む。
- cluster番号自体に順序や意味はない。
- k-meansと階層clusteringの定義と計算手順を区別し、数値例だけで一般性を判断しない。

elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。

## よくある誤解を分解する

- k-meansと階層clusteringの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

k-meansと階層clusteringでは、式へ数値を代入するだけでは不十分である。elongated/nonconvex clustersではk-means spherical distance assumptionが不適切。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

k-means++ init、多restart、scaling。cluster label番号はpermutation arbitrary。

## ここから一段だけ発展する

hard assignmentをprobabilistic soft responsibilityへ一般化するとGaussian mixture/EM。


## このTopicを理解できたか確認する問い

- 「assignment step」を式を見ずに説明できるか
- 「monotone descent」までの論理を一段ずつ再現できるか
- k-meansと階層clusteringの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-clustering-kmeans-hierarchical)　|　[スライドへ](/slides/ml-clustering-kmeans-hierarchical/)
