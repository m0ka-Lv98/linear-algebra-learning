# Monte Carlo数値計算法：教科書

Course 05｜数値計算｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `num-ode-stability-stiffness` で得た概念を使い、ここでは Monte Carlo数値計算法 へ進む。

前提として使うのは `prob-laws-large-numbers-central-limit-theorem`、`num-numerical-integration-quadrature`、`prep-numerical-checks-reproducibility` です。

## まず直感を作る

Monte Carlo法は期待値をランダム標本の平均で近似し、次元に依存しにくい一方で収束は約1/√n。



## 図の解説

<img src="/visuals/course-05/num-monte-carlo-methods.png" alt="Monte Carlo数値計算法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

標本数を増やしながら積分推定値と信頼区間が収束する様子を見る。 乱数で得た標本平均が真の期待値の周囲へ集まる。標本数Nを増やしたとき誤差の典型的な大きさが1/√Nで縮むため、収束は次元に強い一方で遅い。

## 記号・型・次元

- $X_i\sim p$：独立sample
- $I=E[f(X)]$：積分/期待値
- $\hat I_n=n^{-1}\sum f(X_i)$：Monte Carlo estimator


## 正式な定義・代表式

Monte Carloは積分を確率変数の期待値へ書き換え、sample averageで近似する。標準誤差は通常 $O(n^{-1/2})$。

代表式は

$$
\hat{I}_n=\frac{1}{n}\sum_{i=1}^{n}f(X_i)
$$

です。

## なぜこの式・結論になるのか

### 1. 積分を期待値へ

$I=\int f(x)p(x)dx=E_p[f(X)]$。

### 2. sample mean

独立sampleの平均はunbiasedで $E[\hat I]=I$。

### 3. 分散

$Var(\hat I)=Var(f(X))/n$、SE=σ_f/√n。次元に直接依存しないrateが高次元で利点。

## 教科書が省略しやすい一段を補う


### Monte Carloの $1/\sqrt N$ はCLTから出る

期待値 $I=E[g(X)]$ をindependent samplesで
$\hat I_N=N^{-1}\sum_i g(X_i)$ と近似する。unbiasedなら $E\hat I=I$、varianceは $\operatorname{Var}(g(X))/N$。したがってstandard errorは $\sigma/\sqrt N$。CLTで大Nなら誤差をnormal近似しconfidence intervalも作れる。

このrateはdimensionに直接指数依存しないためhigh-dimensional integrationで魅力的だが、精度を10倍にするにはsample100倍が必要。variance reduction、importance sampling、quasi-Monte Carloはこの弱点を改善する別戦略。



## 途中を飛ばさず全体をつなぐ

### Monte Carlo数値計算法の導出を一本につなげる

Monte Carloは積分を確率変数の期待値へ書き換え、sample averageで近似する。標準誤差は通常 $O(n^{-1/2})$。

#### 1. 積分を期待値へ

まず出発点を固定する。 $I=\int f(x)p(x)dx=E_p[f(X)]$。 次に必要になるのは「sample mean」である。

#### 2. sample mean

ここまでで得た結果を次の段階へ渡す。 独立sampleの平均はunbiasedで $E[\hat I]=I$。 次に必要になるのは「分散」である。

#### 3. 分散

最後に、前二段階の結果をまとめて結論へ進む。 $Var(\hat I)=Var(f(X))/n$、SE=σ_f/√n。次元に直接依存しないrateが高次元で利点。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{I}_n=\frac{1}{n}\sum_{i=1}^{n}f(X_i)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

π推定：unit squareにuniform sampleしquarter circle indicator平均を4倍。n4倍でtypical error半分。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

importance samplingではtarget integrandが大きい領域を多くsampleしweight補正してvarianceを下げる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

1/√n収束は遅い。精度を10倍にするにはsample約100倍。sampleが強く相関しているとeffective sample sizeも減る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

π推定：unit squareにuniform sampleしquarter circle indicator平均を4倍。n4倍でtypical error半分。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

importance samplingではtarget integrandが大きい領域を多くsampleしweight補正してvarianceを下げる。

## 成立条件と、条件を外したときに何が壊れるか

- 乱数誤差は標本数を4倍にして約半分。
- 疑似乱数seedと独立性を管理する。
- Monte Carlo数値計算法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

1/√n収束は遅い。精度を10倍にするにはsample約100倍。sampleが強く相関しているとeffective sample sizeも減る。

## よくある誤解を分解する

- Monte Carlo数値計算法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Monte Carlo数値計算法では、式へ数値を代入するだけでは不十分である。1/√n収束は遅い。精度を10倍にするにはsample約100倍。sampleが強く相関しているとeffective sample sizeも減る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

seedだけでなくgenerator、sample数、confidence intervalを記録。parallel RNG streamの独立性にも注意。

## ここから一段だけ発展する

最後に、理論orderが実装でも観測されるかをverification/benchmarkで体系的に確認する。


## このTopicを理解できたか確認する問い

- 「積分を期待値へ」を式を見ずに説明できるか
- 「分散」までの論理を一段ずつ再現できるか
- Monte Carlo数値計算法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-monte-carlo-methods)　|　[スライドへ](/slides/num-monte-carlo-methods/)
