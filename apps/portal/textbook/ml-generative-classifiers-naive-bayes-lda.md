# 生成的分類器・Naive Bayes・LDA：教科書

Course 08｜機械学習｜Topic 05/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-softmax-multiclass` で得た概念を使い、ここでは 生成的分類器・Naive Bayes・LDA へ進む。

前提として使うのは `prob-bayes-theorem`、`prob-multivariate-normal-distribution` です。

## まず直感を作る

分類器は入力からクラス確率またはスコアを作り、決定境界でクラスを分ける。



## 図の解説

<img src="/visuals/course-08/ml-generative-classifiers-naive-bayes-lda.png" alt="生成的分類器・Naive Bayes・LDAの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2クラス点群と確率等高線、decision boundaryを描く。 背景の確率面がP(y=1|x)、その0.5等高線がdecision boundary、点が観測データである。モデルの連続な確率出力と離散な最終分類を区別できる。

## 記号・型・次元

- $p(x|y)$：class-conditional density
- $p(y)$：prior
- $p(y|x)\propto p(x|y)p(y)$


## 正式な定義・代表式

generative classifierはjoint distributionをmodel化してBayes ruleでclassification。Naive Bayesはconditional independence、LDAはclass Gaussian with shared covariance。

代表式は

$$
p(y\mid\mathbf{x})\propto p(\mathbf{x}\mid y)p(y)
$$

です。

## なぜこの式・結論になるのか

### 1. Bayes decision

$argmax_y p(y|x)=argmax_y p(x|y)p(y)$ because p(x) common。

### 2. Naive factorization

conditional independence仮定で $p(x|y)=\prod_jp(x_j|y)$。高dim density estimationを1D factorsへ簡略化。

### 3. LDA linear boundary

Gaussian log densityのquadratic x^TΣ^{-1}x項がshared covarianceでclass間cancelし、xのlinear termだけ残る。

## 教科書が省略しやすい一段を補う


### discriminative boundaryがBayes ruleから出る

class predictionは $\arg\max_y p(y\mid x)$。Bayes ruleで分母p(x)は全class共通なので $\arg\max_y p(x\mid y)p(y)$。generative classifierはclass-conditional densityとpriorをmodel化し、この比較からboundaryを作る。

Naive Bayesではfeatures conditional independentとして productへfactorizeし高dim density estimationを簡略化。LDAでは各class Gaussian with shared covariance。log densityを展開すると $-\frac12x^T\Sigma^{-1}x$ が全class共通でcancelし、xにlinearなdiscriminantが残る。class-specific covarianceならquadratic termが残りQDAになる。仮定がboundary形を決める。



## 途中を飛ばさず全体をつなぐ

### 生成的分類器・Naive Bayes・LDAの導出を一本につなげる

generative classifierはjoint distributionをmodel化してBayes ruleでclassification。Naive Bayesはconditional independence、LDAはclass Gaussian with shared covariance。

#### 1. Bayes decision

まず出発点を固定する。 $argmax_y p(y|x)=argmax_y p(x|y)p(y)$ because p(x) common。 次に必要になるのは「Naive factorization」である。

#### 2. Naive factorization

ここまでで得た結果を次の段階へ渡す。 conditional independence仮定で $p(x|y)=\prod_jp(x_j|y)$。高dim density estimationを1D factorsへ簡略化。 次に必要になるのは「LDA linear boundary」である。

#### 3. LDA linear boundary

最後に、前二段階の結果をまとめて結論へ進む。 Gaussian log densityのquadratic x^TΣ^{-1}x項がshared covarianceでclass間cancelし、xのlinear termだけ残る。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(y\mid\mathbf{x})\propto p(\mathbf{x}\mid y)p(y)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

text Naive Bayesでword occurrence likelihoodをclassごとに掛ける。log domainでsum。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

LDAでcovarianceをclass別にするとquadratic termがcancelせずQDA boundary。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

text Naive Bayesでword occurrence likelihoodをclassごとに掛ける。log domainでsum。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

LDAでcovarianceをclass別にするとquadratic termがcancelせずQDA boundary。

## 成立条件と、条件を外したときに何が壊れるか

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- 生成的分類器・Naive Bayes・LDAの定義と計算手順を区別し、数値例だけで一般性を判断しない。

Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。

## よくある誤解を分解する

- 生成的分類器・Naive Bayes・LDAの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

生成的分類器・Naive Bayes・LDAでは、式へ数値を代入するだけでは不十分である。Naive independenceが大きく破れてもclassificationが使える場合はあるがprobability calibrationは悪化し得る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

zero countにsmoothing。Gaussian covariance singularならregularization。

## ここから一段だけ発展する

parametric distributionを置かず近傍dataから直接predictするkNNへ。


## このTopicを理解できたか確認する問い

- 「Bayes decision」を式を見ずに説明できるか
- 「LDA linear boundary」までの論理を一段ずつ再現できるか
- 生成的分類器・Naive Bayes・LDAの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-generative-classifiers-naive-bayes-lda)　|　[スライドへ](/slides/ml-generative-classifiers-naive-bayes-lda/)
