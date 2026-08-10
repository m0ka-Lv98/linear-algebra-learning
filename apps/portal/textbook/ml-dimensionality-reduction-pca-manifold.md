# 次元削減・PCA・manifold：教科書

Course 08｜機械学習｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-gmm-em` で得た概念を使い、ここでは 次元削減・PCA・manifold へ進む。

前提として使うのは `mat-pca-svd-computation`、`ml-problem-formulation-data-splits` です。

## まず直感を作る

PCAはデータの分散が大きい直交方向を順に選び、低次元へ射影する。



## 図の解説

<img src="/visuals/course-08/ml-dimensionality-reduction-pca-manifold.png" alt="次元削減・PCA・manifoldの図解" style="max-height: 440px; display:block; margin:0 auto;" />

細長い点群と主成分軸、射影点を描く。 点群の最も長い方向が第一主成分である。各点をその軸へ直交射影した座標の分散が最大になる方向を探す問題が固有値/SVDへつながる。

## 記号・型・次元

- $z=V_r^T(x-\mu)$：PCA coordinates
- $r<p$
- $V_r$：top principal directions


## 正式な定義・代表式

dimensionality reductionはinformation/geometryを低dim representationへ圧縮。PCAはlinear variance/reconstruction optimality、manifold methodsはlocal/nonlinear geometryを狙う。

代表式は

$$
\mathbf{z}=\mathbf{V}_r^{\mathsf T}(\mathbf{x}-\boldsymbol{\mu})
$$

です。

## なぜこの式・結論になるのか

### 1. PCA encoder

orthonormal V_rへprojectしてz。

### 2. decoder

$\hat x=\mu+V_rz$。projection theoremでchosen subspace内nearest point。

### 3. best subspace

SVD/Eckart–Youngによりtop r principal subspaceがsquared reconstruction errorを最小化。

## 教科書が省略しやすい一段を補う


### low-dimensional visualizationとinformation preservationを分ける

PCAはorthogonal linear projectionでsquared reconstruction error最小という明確なobjectiveを持つ。$z=V_r^T(x-\mu)$、decode $\hat x=\mu+V_rz$。top singular directionsを残すことでglobal linear varianceを保つ。

manifold methodsはlocal neighbor graphやprobability similarityなど別objectiveを最適化し、2D plotの見た目を良くできるがglobal distances/cluster sizesが元空間と同じとは限らない。visualizationはexploratory evidenceであってclass separabilityやcausal structureの証明ではない。reducerもtrain onlyでfitする。



## 途中を飛ばさず全体をつなぐ

### 次元削減・PCA・manifoldの導出を一本につなげる

dimensionality reductionはinformation/geometryを低dim representationへ圧縮。PCAはlinear variance/reconstruction optimality、manifold methodsはlocal/nonlinear geometryを狙う。

#### 1. PCA encoder

まず出発点を固定する。 orthonormal V_rへprojectしてz。 次に必要になるのは「decoder」である。

#### 2. decoder

ここまでで得た結果を次の段階へ渡す。 $\hat x=\mu+V_rz$。projection theoremでchosen subspace内nearest point。 次に必要になるのは「best subspace」である。

#### 3. best subspace

最後に、前二段階の結果をまとめて結論へ進む。 SVD/Eckart–Youngによりtop r principal subspaceがsquared reconstruction errorを最小化。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{z}=\mathbf{V}_r^{\mathsf T}(\mathbf{x}-\boldsymbol{\mu})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

2D ellipseを1D PC1へ圧縮し長軸coordinateだけ残す。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Swiss rollはlinear PCAではunrollできずnonlinear manifold methodがlocal geometryを使う。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

2D visualizationでcluster separationが見えてもdistance/global topologyがfaithfulとは限らない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

2D ellipseを1D PC1へ圧縮し長軸coordinateだけ残す。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Swiss rollはlinear PCAではunrollできずnonlinear manifold methodがlocal geometryを使う。

## 成立条件と、条件を外したときに何が壊れるか

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- 次元削減・PCA・manifoldの定義と計算手順を区別し、数値例だけで一般性を判断しない。

2D visualizationでcluster separationが見えてもdistance/global topologyがfaithfulとは限らない。

## よくある誤解を分解する

- 次元削減・PCA・manifoldの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

次元削減・PCA・manifoldでは、式へ数値を代入するだけでは不十分である。2D visualizationでcluster separationが見えてもdistance/global topologyがfaithfulとは限らない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

fit reducer on train only。UMAP/t-SNE stochastic hyperparametersとout-of-sample transform有無を確認。

## ここから一段だけ発展する

low-dimensional density/distanceを利用してanomaly detectionへ。


## このTopicを理解できたか確認する問い

- 「PCA encoder」を式を見ずに説明できるか
- 「best subspace」までの論理を一段ずつ再現できるか
- 次元削減・PCA・manifoldの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-dimensionality-reduction-pca-manifold)　|　[スライドへ](/slides/ml-dimensionality-reduction-pca-manifold/)
