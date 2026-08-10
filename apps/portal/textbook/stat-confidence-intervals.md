# 信頼区間：教科書

Course 03｜確率統計｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `stat-bayesian-inference-map` で得た概念を使い、ここでは 信頼区間 へ進む。

前提として使うのは `stat-estimators-bias-variance-mse`、`prob-laws-large-numbers-central-limit-theorem`、`stat-likelihood-maximum-likelihood` です。

## まず直感を作る

信頼区間は同じ手続きを繰り返したときの被覆率についての主張。



## 図の解説

<img src="/visuals/course-03/stat-confidence-intervals.png" alt="信頼区間の図解" style="max-height: 440px; display:block; margin:0 auto;" />

多数の標本から区間を作り、真値を含む区間と外す区間を並べる。 中央の確率領域を標準化統計量で取り、その不等式を未知パラメータについて解き直すことで区間が得られる。区間が標本ごとに動き、パラメータ自体は固定である。

## 記号・型・次元

- $\hat\theta$：点推定量
- $SE(\hat\theta)$：推定量の標準誤差
- $1-\alpha$：目標被覆率
- $z_{1-\alpha/2}$：標準正規の分位点


## 正式な定義・代表式

信頼区間は、同じ手続きを繰り返したとき一定割合で真の固定母数を含むよう設計されたランダム区間。正規近似では推定値±臨界値×標準誤差。

代表式は

$$
\hat{\theta}\pm z_{1-\alpha/2}\operatorname{SE}(\hat{\theta})
$$

です。

## なぜこの式・結論になるのか

### 1. 標準化統計量を作る

近似的に $(\hat\theta-\theta)/SE\sim N(0,1)$ とする。

### 2. 中央確率を取る

$P(-z_{1-\alpha/2}\le(\hat\theta-\theta)/SE\le z_{1-\alpha/2})\approx1-\alpha$。

### 3. θについて不等式を解く

両辺を並べ替えると $P(\hat\theta-zSE\le\theta\le\hat\theta+zSE)\approx1-\alpha$。ランダムなのは区間端点で、θ自体は固定値。

## 教科書が省略しやすい一段を補う


### 信頼区間は「未知母数がこの確率で入る区間」ではない

頻度論では母数 $\theta$ は固定値、区間 $[L(X),U(X)]$ が標本によってランダムに変わる。95%信頼区間とは
$$
P_\theta\{L(X)\le\theta\le U(X)\}=0.95
$$
というcoverageを、実験を繰り返した長期頻度として保証する手続きである。

たとえば $\bar X\sim N(\mu,\sigma^2/n)$ かつsigma既知なら
$$
P\left(-1.96\le\frac{\bar X-\mu}{\sigma/\sqrt n}\le1.96\right)=0.95.
$$
この不等式をmuについて解き直すと
$\bar X\pm1.96\sigma/\sqrt n$ が出る。したがって区間公式は暗記ではなく、既知のsampling distributionの中央確率を未知母数について反転したもの。データ観測後の固定された区間に対し「muが95%の確率で入る」と言うのはBayesian posterior intervalと混同している。


### 標準誤差と標準偏差を混同しない

individual observationのspreadがσでも、mean estimatorのspreadはσ/√n。confidence intervalの幅がnとともに狭くなるのはdata distribution自体が狭くなるからではなく、meanのsampling distributionが集中するからである。σ未知なら標本standard deviation sを代入するだけではnormal quantileのままでなく、正規母集団ではt distributionを使う理由がある：varianceをdataから推定した追加不確実性を反映するため。

coverageはprocedureのpropertyなので、assumption違反・optional stopping・multiple comparisonsで崩れる。intervalが狭いこととmodelが正しいことは別。

## 途中を飛ばさず全体をつなぐ

### 信頼区間の導出を一本につなげる

信頼区間は、同じ手続きを繰り返したとき一定割合で真の固定母数を含むよう設計されたランダム区間。正規近似では推定値±臨界値×標準誤差。

#### 1. 標準化統計量を作る

まず出発点を固定する。 近似的に $(\hat\theta-\theta)/SE\sim N(0,1)$ とする。 次に必要になるのは「中央確率を取る」である。

#### 2. 中央確率を取る

ここまでで得た結果を次の段階へ渡す。 $P(-z_{1-\alpha/2}\le(\hat\theta-\theta)/SE\le z_{1-\alpha/2})\approx1-\alpha$。 次に必要になるのは「θについて不等式を解く」である。

#### 3. θについて不等式を解く

最後に、前二段階の結果をまとめて結論へ進む。 両辺を並べ替えると $P(\hat\theta-zSE\le\theta\le\hat\theta+zSE)\approx1-\alpha$。ランダムなのは区間端点で、θ自体は固定値。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{\theta}\pm z_{1-\alpha/2}\operatorname{SE}(\hat{\theta})
$$


### 具体例と一般式を往復する

本文の第一例は次の設定である。

標本平均10、SE=2、95%正規近似なら $10\pm1.96\times2=[6.08,13.92]$。


nを4倍にしてSEが半分なら、同じ信頼水準で区間幅も半分になる。信頼水準を99%へ上げると臨界値が増え区間は広がる。


### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

頻度論の95%信頼区間を「この計算済み区間にθが95%の確率で入る」と読むのは標準解釈ではない。手続きの長期被覆率が95%。


## 例題1：小さな数値で最後まで計算する

標本平均10、SE=2、95%正規近似なら $10\pm1.96\times2=[6.08,13.92]$。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

nを4倍にしてSEが半分なら、同じ信頼水準で区間幅も半分になる。信頼水準を99%へ上げると臨界値が増え区間は広がる。

## 成立条件と、条件を外したときに何が壊れるか

- 得られた区間に真値が95%の確率で入る、とは頻度論では言わない。
- 標準誤差と標準偏差を区別する。
- 信頼区間の定義と計算手順を区別し、数値例だけで一般性を判断しない。

頻度論の95%信頼区間を「この計算済み区間にθが95%の確率で入る」と読むのは標準解釈ではない。手続きの長期被覆率が95%。

## よくある誤解を分解する

- 信頼区間の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

信頼区間では、式へ数値を代入するだけでは不十分である。頻度論の95%信頼区間を「この計算済み区間にθが95%の確率で入る」と読むのは標準解釈ではない。手続きの長期被覆率が95%。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

小標本、未知分散、非対称推定量ではz区間が不適切なことがある。t分布、bootstrap、profile likelihood等を問題設定に応じて使う。

## ここから一段だけ発展する

区間と検定は同じ標本分布の両面。帰無仮説の値が対応する両側信頼区間に入るかどうかと、同水準の両側検定は密接に対応する。


## このTopicを理解できたか確認する問い

- 「標準化統計量を作る」を式を見ずに説明できるか
- 「θについて不等式を解く」までの論理を一段ずつ再現できるか
- 信頼区間の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-confidence-intervals)　|　[スライドへ](/slides/stat-confidence-intervals/)
