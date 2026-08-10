# model selectionとcross-validation：教科書

Course 08｜機械学習｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-bias-variance-regularization` で得た概念を使い、ここでは model selectionとcross-validation へ進む。

前提として使うのは `ml-bias-variance-regularization`、`prob-laws-large-numbers-central-limit-theorem` です。

## まず直感を作る

cross-validationはデータ分割を入れ替えて汎化性能の推定を安定化する。



## 図の解説

<img src="/visuals/course-08/ml-model-selection-cross-validation.png" alt="model selectionとcross-validationの図解" style="max-height: 440px; display:block; margin:0 auto;" />

K-foldの矩形ブロックを順番にvalidationへ回す。 データをfoldごとにtrain/validation役へ交代させ、各foldの評価を平均する。同じ標本を学習と評価へ同時に使わない構造が重要である。

## 記号・型・次元

- $K$：fold数
- $R_k$：k fold validation risk
- $\widehat R_{CV}=K^{-1}\sum R_k$


## 正式な定義・代表式

K-fold CVはdataをK分割し、各foldを一度validationとして残りで全training pipelineをfitしriskを平均する。

代表式は

$$
\widehat{R}_{\mathrm{CV}}=\frac{1}{K}\sum_{k=1}^{K}R_k
$$

です。

## なぜこの式・結論になるのか

### 1. reuse without same-sample evaluation

各sampleはvalidation時、そのfoldのfitに使われない。

### 2. average

fold riskを平均してfinite-data performance estimate。

### 3. nested need

CV scoreでhyperparameterを選んだ後のunbiased final estimateにはouter test/nested CVが必要。

## 教科書が省略しやすい一段を補う


### CVは「K回学習して平均」より重要なscope ruleを持つ

各foldでvalidation samplesはそのfoldのtraining procedureに一切使わない。したがってscaling, imputation, feature selection, oversampling, early stopping thresholdなど**fitを伴う操作は全てfold内trainだけ**で決める。外側で一度fitしてからCVするとleakage。

CV scoreを使ってhyperparameterを選んだ時点で、そのCVは選択に使われている。final performanceを同じscoreで報告するとselection biasが残るためindependent test/nested CVが必要。time/group dependenceではfold construction自体をdomainに合わせる。



## 途中を飛ばさず全体をつなぐ

### model selectionとcross-validationの導出を一本につなげる

K-fold CVはdataをK分割し、各foldを一度validationとして残りで全training pipelineをfitしriskを平均する。

#### 1. reuse without same-sample evaluation

まず出発点を固定する。 各sampleはvalidation時、そのfoldのfitに使われない。 次に必要になるのは「average」である。

#### 2. average

ここまでで得た結果を次の段階へ渡す。 fold riskを平均してfinite-data performance estimate。 次に必要になるのは「nested need」である。

#### 3. nested need

最後に、前二段階の結果をまとめて結論へ進む。 CV scoreでhyperparameterを選んだ後のunbiased final estimateにはouter test/nested CVが必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\widehat{R}_{\mathrm{CV}}=\frac{1}{K}\sum_{k=1}^{K}R_k
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

5-foldでpreprocessingも各train fold内fit。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

time seriesはrandom K-foldでfuture leakage; rolling/blocked CV。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

feature selectionをCVの外で全dataに実行してからCVするとoptimistic leakage。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

5-foldでpreprocessingも各train fold内fit。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

time seriesはrandom K-foldでfuture leakage; rolling/blocked CV。

## 成立条件と、条件を外したときに何が壊れるか

- 前処理はfold内でfitする。
- 独立でないデータではgroup/time splitを使う。
- model selectionとcross-validationの定義と計算手順を区別し、数値例だけで一般性を判断しない。

feature selectionをCVの外で全dataに実行してからCVするとoptimistic leakage。

## よくある誤解を分解する

- model selectionとcross-validationの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

model selectionとcross-validationでは、式へ数値を代入するだけでは不十分である。feature selectionをCVの外で全dataに実行してからCVするとoptimistic leakage。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

group/stratified split、metric aggregation、confidence/variance報告。

## ここから一段だけ発展する

model選択後、taskに合うmetric・threshold・calibrationを設計する。


## このTopicを理解できたか確認する問い

- 「reuse without same-sample evaluation」を式を見ずに説明できるか
- 「nested need」までの論理を一段ずつ再現できるか
- model selectionとcross-validationの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-model-selection-cross-validation)　|　[スライドへ](/slides/ml-model-selection-cross-validation/)
