# boostingとgradient boosting：教科書

Course 08｜機械学習｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-ensembles-bagging-random-forests` で得た概念を使い、ここでは boostingとgradient boosting へ進む。

前提として使うのは `ml-decision-trees`、`opt-gradient-descent-convergence` です。

## まず直感を作る

boostingは前までの誤りを次の弱学習器が補うように加算モデルを構築する。



## 図の解説

<img src="/visuals/course-08/ml-boosting-gradient-boosting.png" alt="boostingとgradient boostingの図解" style="max-height: 440px; display:block; margin:0 auto;" />

1本目、2本目、3本目と予測曲線が残差へ適合する過程を見る。 弱学習器を順番に追加し、前段で残った誤差へ後段が焦点を当てる。最終予測は各学習器の寄与の加算として形成される。

## 記号・型・次元

- $F_m$：m stage ensemble
- $h_m$：weak learner
- $\eta$：shrinkage
- $-\partial\ell/\partial F$：functional negative gradient


## 正式な定義・代表式

gradient boostingはfunction spaceでlossを下げる方向をpseudo-residualとして計算し、base learnerで近似して加える。

代表式は

$$
F_m(\mathbf{x})=F_{m-1}(\mathbf{x})+\eta h_m(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. functional gradient

各sample prediction F(x_i)に対するloss derivativeを計算。negative gradientが欲しいprediction change。

### 2. base learner fit

$h_m(x_i)$ をpseudo-residualへregressionし、利用可能なtree family内で方向を近似。

### 3. step

$F_m=F_{m-1}+ηh_m$。squared lossではpseudo-residual=y-Fで通常residual fitになる。

## 教科書が省略しやすい一段を補う


### gradient boostingはparameter vectorでなくprediction functionを更新する

current ensemble $F_{m-1}$ の各training point predictionに対しloss derivativeを計算し、negative gradient $r_i=-\partial\ell(y_i,F(x_i))/\partial F$ を欲しいprediction changeとみなす。base learner h_mをr_iへfitし $F_m=F_{m-1}+\eta h_m$。

squared lossではderivativeがF-yなのでnegative gradient=y-F、つまりordinary residual。classification lossではpseudo-residualが別形になる。stageを増やすとtraining lossは下がり続けてもvalidationは悪化し得るためlearning rate, tree complexity, number of stages, subsamplingをjointにregularizeする。



## 途中を飛ばさず全体をつなぐ

### boostingとgradient boostingの導出を一本につなげる

gradient boostingはfunction spaceでlossを下げる方向をpseudo-residualとして計算し、base learnerで近似して加える。

#### 1. functional gradient

まず出発点を固定する。 各sample prediction F(x_i)に対するloss derivativeを計算。negative gradientが欲しいprediction change。 次に必要になるのは「base learner fit」である。

#### 2. base learner fit

ここまでで得た結果を次の段階へ渡す。 $h_m(x_i)$ をpseudo-residualへregressionし、利用可能なtree family内で方向を近似。 次に必要になるのは「step」である。

#### 3. step

最後に、前二段階の結果をまとめて結論へ進む。 $F_m=F_{m-1}+ηh_m$。squared lossではpseudo-residual=y-Fで通常residual fitになる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
F_m(\mathbf{x})=F_{m-1}(\mathbf{x})+\eta h_m(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

squared lossで最初constant mean、次treeが残差structureを説明し、stageごとに補正。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

η小+more treesはslow but regularized、η大はfast overfit。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

training lossはstage追加で下がってもvalidationは悪化し得る。early stopping。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

squared lossで最初constant mean、次treeが残差structureを説明し、stageごとに補正。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

η小+more treesはslow but regularized、η大はfast overfit。

## 成立条件と、条件を外したときに何が壊れるか

- 学習率と木数のトレードオフ。
- 同じデータで早期停止を評価しない。
- boostingとgradient boostingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

training lossはstage追加で下がってもvalidationは悪化し得る。early stopping。

## よくある誤解を分解する

- boostingとgradient boostingの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

boostingとgradient boostingでは、式へ数値を代入するだけでは不十分である。training lossはstage追加で下がってもvalidationは悪化し得る。early stopping。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

XGBoost/LightGBMでobjective derivatives、subsampling、tree regularizationを確認。

## ここから一段だけ発展する

margin最大化という別のclassification原理SVMへ。


## このTopicを理解できたか確認する問い

- 「functional gradient」を式を見ずに説明できるか
- 「step」までの論理を一段ずつ再現できるか
- boostingとgradient boostingの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-boosting-gradient-boosting)　|　[スライドへ](/slides/ml-boosting-gradient-boosting/)
