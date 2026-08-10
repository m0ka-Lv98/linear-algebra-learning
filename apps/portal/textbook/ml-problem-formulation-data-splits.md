# 機械学習問題の定式化とdata split：教科書

Course 08｜機械学習｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 08 の入口として、機械学習問題の定式化とdata split を定義から組み立てる。

前提として使うのは `stat-estimators-bias-variance-mse`、`opt-problem-formulation-objectives-constraints` です。

## まず直感を作る

data splitは学習・選択・最終評価の役割を分離し、同じデータを見て性能を過大評価するのを防ぐ。



## 図の解説

<img src="/visuals/course-08/ml-problem-formulation-data-splits.png" alt="機械学習問題の定式化とdata splitの図解" style="max-height: 440px; display:block; margin:0 auto;" />

データ列をtrain/validation/testへ分割し、情報の流れを矢印で示す。 trainはパラメータ学習、validationは選択、testは最後の性能推定にだけ流れる。testからtrain側へ矢印が戻ると情報漏洩になり、最終評価が楽観的になる。

## 記号・型・次元

- $\mathcal D_{train}$：parameter fit用
- $\mathcal D_{val}$：hyperparameter/model selection用
- $\mathcal D_{test}$：最終評価用
- $R(f)=E[\ell(f(X),Y)]$：population risk


## 正式な定義・代表式

MLは有限dataでmodelを選び未知data riskを小さくする問題。train/validation/testは情報利用目的を分離するための設計で、単なるfile分割ではない。

代表式は

$$
\mathcal{D}=\mathcal{D}_{\mathrm{train}}\cup\mathcal{D}_{\mathrm{val}}\cup\mathcal{D}_{\mathrm{test}}
$$

です。

## なぜこの式・結論になるのか

### 1. 経験risk

train dataでpopulation expectationを直接計算できないので $\hat R_{train}=n^{-1}\sum\ell$ をminimizeする。

### 2. model selectionの二重利用を避ける

train performanceでhyperparameterを選ぶとtraining noiseへ適応する。独立validationでchoiceを評価する。

### 3. testの役割

testを何度も見るとtestへも適応するため、最終procedure確定後の一回評価として隔離する。

## 教科書が省略しやすい一段を補う


### data splitは「評価dataを隠す儀式」ではなく推定対象を分離する

training setでparameterをfitすると、training riskは同じdataへ適応したoptimisticな量になる。validationはhyperparameter・feature・model classなど**procedureの選択**に使い、testはその選択まで含む最終procedureのgeneralizationを一度評価する。したがってvalidationを何十回も見て設計を変えることはvalidationへの適応であり、testを反復利用することも同じ問題をtestへ移すだけ。

preprocessingも学習の一部である。mean/std、feature selection、imputation、PCAなどをsplit前に全dataでfitすればlabelを使っていなくてもtest distributionの情報がtrainへ漏れる。group/time dependenceがある場合はiid random split自体が仮定違反なので、将来予測ならtime order、同一subjectならgroup単位で分ける。



## 途中を飛ばさず全体をつなぐ

### 機械学習問題の定式化とdata splitの導出を一本につなげる

MLは有限dataでmodelを選び未知data riskを小さくする問題。train/validation/testは情報利用目的を分離するための設計で、単なるfile分割ではない。

#### 1. 経験risk

まず出発点を固定する。 train dataでpopulation expectationを直接計算できないので $\hat R_{train}=n^{-1}\sum\ell$ をminimizeする。 次に必要になるのは「model selectionの二重利用を避ける」である。

#### 2. model selectionの二重利用を避ける

ここまでで得た結果を次の段階へ渡す。 train performanceでhyperparameterを選ぶとtraining noiseへ適応する。独立validationでchoiceを評価する。 次に必要になるのは「testの役割」である。

#### 3. testの役割

最後に、前二段階の結果をまとめて結論へ進む。 testを何度も見るとtestへも適応するため、最終procedure確定後の一回評価として隔離する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{D}=\mathcal{D}_{\mathrm{train}}\cup\mathcal{D}_{\mathrm{val}}\cup\mathcal{D}_{\mathrm{test}}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

20 candidate modelsからvalidationで選び、testは最後に一度だけreport。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

time-seriesはrandom splitでfuture→past leakageが起こるためchronological split。grouped subjectsはsubject単位split。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

標準化meanを全dataでfitしてからsplitするとtest情報がtrain featuresへ漏れる。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

20 candidate modelsからvalidationで選び、testは最後に一度だけreport。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

time-seriesはrandom splitでfuture→past leakageが起こるためchronological split。grouped subjectsはsubject単位split。

## 成立条件と、条件を外したときに何が壊れるか

- test setをmodel selectionに使わない。
- 時系列ではランダム分割が不適切な場合がある。
- 機械学習問題の定式化とdata splitの定義と計算手順を区別し、数値例だけで一般性を判断しない。

標準化meanを全dataでfitしてからsplitするとtest情報がtrain featuresへ漏れる。

## よくある誤解を分解する

- 機械学習問題の定式化とdata splitの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

機械学習問題の定式化とdata splitでは、式へ数値を代入するだけでは不十分である。標準化meanを全dataでfitしてからsplitするとtest情報がtrain featuresへ漏れる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

split seed、stratification、group/time rules、preprocessing fit scopeをpipelineで固定。

## ここから一段だけ発展する

まず最も単純なsupervised predictorとしてlinear regressionをpredictionの観点から再構成する。


## このTopicを理解できたか確認する問い

- 「経験risk」を式を見ずに説明できるか
- 「testの役割」までの論理を一段ずつ再現できるか
- 機械学習問題の定式化とdata splitの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-problem-formulation-data-splits)　|　[スライドへ](/slides/ml-problem-formulation-data-splits/)
