# Bayesian推論とMAP推定：教科書

Course 03｜確率統計｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `stat-likelihood-maximum-likelihood` で得た概念を使い、ここでは Bayesian推論とMAP推定 へ進む。

前提として使うのは `prob-bayes-theorem`、`stat-likelihood-maximum-likelihood` です。

## まず直感を作る

Bayes更新は、事前の信念に観測の尤もらしさを掛け、全体で正規化して事後分布を得る。



## 図の解説

<img src="/visuals/course-03/stat-bayesian-inference-map.png" alt="Bayesian推論とMAP推定の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つの仮説の事前確率が1回の観測でどう更新されるかを棒グラフで追う。 左の高さが観測前の仮説の重み、観測による尤度の倍率を掛けた中間量を正規化したものが右の事後確率である。観測と整合する仮説ほど棒が相対的に高くなる。

## 記号・型・次元

- $\theta$：未知母数
- $p(\theta)$：事前分布
- $p(\mathbf x\mid\theta)$：尤度
- $p(\theta\mid\mathbf x)$：事後分布
- $\hat\theta_{MAP}$：事後密度を最大化する値


## 正式な定義・代表式

Bayesian推論では未知母数にも確率分布を置き、観測後はBayes則でposteriorへ更新する。MAPはposteriorのmodeであり、posterior全体を要約した点推定。

代表式は

$$
p(\theta\mid\mathbf{x})\propto p(\mathbf{x}\mid\theta)p(\theta)
$$

です。

## なぜこの式・結論になるのか

### 1. Bayes則を密度へ一般化する

$p(\theta|x)=p(x|\theta)p(\theta)/p(x)$。分母 $p(x)=\int p(x|\theta)p(\theta)d\theta$ はθに依らない正規化定数。

### 2. MAPの目的関数

argmaxだけなら分母は無視でき、$\hat\theta_{MAP}=\arg\max[p(x|\theta)p(\theta)]$。logを取ればlog尤度+log事前。

### 3. MLEとの関係

事前が対象範囲で一定ならlog事前は定数でMAP=MLE。非一様事前は最適化上のpenaltyのように働くが、確率的意味は「観測前の分布」。

## 教科書が省略しやすい一段を補う


### Bayes推論では母数も確率分布として更新する

Bayes推論では未知母数 $\theta$ にprior $p(\theta)$ を置き、データDのlikelihood $p(D\mid\theta)$ と掛けて
$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)}
$$
を得る。分母 $p(D)=\int p(D\mid\theta)p(\theta)d\theta$ はthetaに依存しない正規化定数であり、posterior全体を積分1にする。

MAPはposteriorのmodeなので
$$
\hat\theta_{MAP}=\arg\max_\theta\{\log p(D\mid\theta)+\log p(\theta)\}.
$$
負のlog priorはregularization項として読める。Gaussian priorならL2型、Laplace priorならL1型が現れる。この対応は「regularization=Bayes」と常に同一視する意味ではなく、特定の確率モデルで目的関数が一致するという関係である。


### conjugate updateをcountで確認する

Bernoulli pへBeta(a,b) prior $p(p)\propto p^{a-1}(1-p)^{b-1}$、s successes/f failuresのlikelihood $p^s(1-p)^f$ を掛けると
$$
p(p|D)\propto p^{a+s-1}(1-p)^{b+f-1},
$$
よってposteriorはBeta(a+s,b+f)。prior parametersがpseudo-countのようにdata countsへ足される。

posterior meanとMAPは同じとは限ない。MAPはmode一点、Bayesian predictionではposterior全体についてintegrateする。point estimateだけ使うとparameter uncertaintyを捨てる。

## 途中を飛ばさず全体をつなぐ

### Bayesian推論とMAP推定の導出を一本につなげる

Bayesian推論では未知母数にも確率分布を置き、観測後はBayes則でposteriorへ更新する。MAPはposteriorのmodeであり、posterior全体を要約した点推定。

#### 1. Bayes則を密度へ一般化する

まず出発点を固定する。 $p(\theta|x)=p(x|\theta)p(\theta)/p(x)$。分母 $p(x)=\int p(x|\theta)p(\theta)d\theta$ はθに依らない正規化定数。 次に必要になるのは「MAPの目的関数」である。

#### 2. MAPの目的関数

ここまでで得た結果を次の段階へ渡す。 argmaxだけなら分母は無視でき、$\hat\theta_{MAP}=\arg\max[p(x|\theta)p(\theta)]$。logを取ればlog尤度+log事前。 次に必要になるのは「MLEとの関係」である。

#### 3. MLEとの関係

最後に、前二段階の結果をまとめて結論へ進む。 事前が対象範囲で一定ならlog事前は定数でMAP=MLE。非一様事前は最適化上のpenaltyのように働くが、確率的意味は「観測前の分布」。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(\theta\mid\mathbf{x})\propto p(\mathbf{x}\mid\theta)p(\theta)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Bernoulli pにBeta(a,b)事前。k成功ならposteriorはBeta(a+k,b+n-k)。MAPは条件を満たせば $(a+k-1)/(a+b+n-2)$。観測数が増えるとデータの影響が強くなる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

正規平均に正規事前を置くとposterior平均は「事前平均と標本平均の精度重み付き平均」。不確実な側ほど重みが小さい。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

MAPだけを見るとposteriorの幅や多峰性を失う。同じmodeでも不確実性が全く違うposteriorがあり得るため、Bayesian推論=MAPではない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Bernoulli pにBeta(a,b)事前。k成功ならposteriorはBeta(a+k,b+n-k)。MAPは条件を満たせば $(a+k-1)/(a+b+n-2)$。観測数が増えるとデータの影響が強くなる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

正規平均に正規事前を置くとposterior平均は「事前平均と標本平均の精度重み付き平均」。不確実な側ほど重みが小さい。

## 成立条件と、条件を外したときに何が壊れるか

- 尤度はθの関数、確率密度はデータの関数として読む。
- base rateを無視しない。
- Bayesian推論とMAP推定の定義と計算手順を区別し、数値例だけで一般性を判断しない。

MAPだけを見るとposteriorの幅や多峰性を失う。同じmodeでも不確実性が全く違うposteriorがあり得るため、Bayesian推論=MAPではない。

## よくある誤解を分解する

- Bayesian推論とMAP推定の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Bayesian推論とMAP推定では、式へ数値を代入するだけでは不十分である。MAPだけを見るとposteriorの幅や多峰性を失う。同じmodeでも不確実性が全く違うposteriorがあり得るため、Bayesian推論=MAPではない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

共役事前なら解析式、一般にはMCMC・変分推論等が必要になる。log posteriorを使い、正規化定数が必要な量と不要な最適化を区別する。

## ここから一段だけ発展する

posteriorからcredible intervalを作れる。次の頻度論的confidence intervalとは「未知母数をランダムとみなすか」「反復標本の被覆率か」で解釈が異なる。


## このTopicを理解できたか確認する問い

- 「Bayes則を密度へ一般化する」を式を見ずに説明できるか
- 「MLEとの関係」までの論理を一段ずつ再現できるか
- Bayesian推論とMAP推定の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-bayesian-inference-map)　|　[スライドへ](/slides/stat-bayesian-inference-map/)
