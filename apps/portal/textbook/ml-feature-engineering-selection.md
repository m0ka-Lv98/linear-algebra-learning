# 特徴量設計と特徴選択：教科書

Course 08｜機械学習｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-anomaly-detection` で得た概念を使い、ここでは 特徴量設計と特徴選択 へ進む。

前提として使うのは `mat-data-matrices-centering-scaling`、`mat-ridge-lasso-elastic-net` です。

## まず直感を作る

特徴量設計は生データから予測に必要な情報を抽出し、特徴選択は冗長・不要な次元を減らす。



## 図の解説

<img src="/visuals/course-08/ml-feature-engineering-selection.png" alt="特徴量設計と特徴選択の図解" style="max-height: 440px; display:block; margin:0 auto;" />

候補特徴の重要度と選択前後の性能を比較する。 元の座標から新しい特徴へ写すと、同じデータでも線形分離性や距離構造が変わる。特徴量はモデルへ渡す表現そのものを設計する操作である。

## 記号・型・次元

- $\phi(x)$：feature transform
- $S$：selected features
- $\lambda\|β\|_1$：embedded selection例


## 正式な定義・代表式

feature engineeringはinductive biasをinput representationに入れ、feature selectionはirrelevant/redundant dimensionsを制御する。selection自体もtraining procedure。

代表式は

$$
\min_{\boldsymbol{\beta}}\mathcal{L}(\boldsymbol{\beta})+\lambda\|\boldsymbol{\beta}\|_1
$$

です。

## なぜこの式・結論になるのか

### 1. transform changes hypothesis class

linear model on φ(x) is nonlinear in raw x。representationがmodel expressivityを決める。

### 2. selection and overfitting

many featuresからbestをsame dataで選ぶほどselection noiseへ適応。validation/CV内でselectionをfit。

### 3. L1 embedded selection

L1 penalty corner geometryによりcoefficientsをzeroへでき、fitとselectionを同時化。

## 教科書が省略しやすい一段を補う


### feature selectionもvalidation loopの内側で学習する

raw xから $\phi(x)$ を作ると、同じlinear learnerでもhypothesis classが変わる。polynomial/interactions, log transform, cyclic encoding等はdomain invarianceを表現へ埋め込む。一方featuresをmany candidatesからdata-dependentに選ぶほどselection noiseへ適応する。

filter selection, wrapper, L1 embedded selectionのどれもtraining dataでfitすべきで、CVでは各fold内でselectionをやり直す。test correlationを見てfeatureを削除した瞬間testはmodel designへ使われたことになる。feature importanceとcausal relevanceは別概念。



## 途中を飛ばさず全体をつなぐ

### 特徴量設計と特徴選択の導出を一本につなげる

feature engineeringはinductive biasをinput representationに入れ、feature selectionはirrelevant/redundant dimensionsを制御する。selection自体もtraining procedure。

#### 1. transform changes hypothesis class

まず出発点を固定する。 linear model on φ(x) is nonlinear in raw x。representationがmodel expressivityを決める。 次に必要になるのは「selection and overfitting」である。

#### 2. selection and overfitting

ここまでで得た結果を次の段階へ渡す。 many featuresからbestをsame dataで選ぶほどselection noiseへ適応。validation/CV内でselectionをfit。 次に必要になるのは「L1 embedded selection」である。

#### 3. L1 embedded selection

最後に、前二段階の結果をまとめて結論へ進む。 L1 penalty corner geometryによりcoefficientsをzeroへでき、fitとselectionを同時化。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\boldsymbol{\beta}}\mathcal{L}(\boldsymbol{\beta})+\lambda\|\boldsymbol{\beta}\|_1
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

cyclic timeをhour scalarよりsin/cos pairへ変換すると23時と0時が近いgeometry。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

one-hot high-cardinality categoryはdim増加、target encodingはleakage対策cross-fit必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

test data correlationを見てfeatures削除/追加するとtest leakage。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

cyclic timeをhour scalarよりsin/cos pairへ変換すると23時と0時が近いgeometry。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

one-hot high-cardinality categoryはdim増加、target encodingはleakage対策cross-fit必要。

## 成立条件と、条件を外したときに何が壊れるか

- 選択処理もcross-validationの内側で行う。
- 標的漏洩を避ける。
- 特徴量設計と特徴選択の定義と計算手順を区別し、数値例だけで一般性を判断しない。

test data correlationを見てfeatures削除/追加するとtest leakage。

## よくある誤解を分解する

- 特徴量設計と特徴選択の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

特徴量設計と特徴選択では、式へ数値を代入するだけでは不十分である。test data correlationを見てfeatures削除/追加するとtest leakage。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

Pipeline/ColumnTransformerでfold内fit。feature namesとunitsをtrace。

## ここから一段だけ発展する

feature/model flexibilityを増やすとbias–variance tradeoffが生まれる。


## このTopicを理解できたか確認する問い

- 「transform changes hypothesis class」を式を見ずに説明できるか
- 「L1 embedded selection」までの論理を一段ずつ再現できるか
- 特徴量設計と特徴選択の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-feature-engineering-selection)　|　[スライドへ](/slides/ml-feature-engineering-selection/)
