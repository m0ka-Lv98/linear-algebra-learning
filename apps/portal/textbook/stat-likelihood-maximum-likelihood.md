# 尤度と最尤推定：教科書

Course 03｜確率統計｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `stat-estimators-bias-variance-mse` で得た概念を使い、ここでは 尤度と最尤推定 へ進む。

前提として使うのは `stat-estimators-bias-variance-mse`、`prob-discrete-distributions`、`prob-continuous-distributions`、`prep-exponents-logarithms` です。

## まず直感を作る

尤度は観測データを固定し、パラメータを動かしたときの説明力を見る関数。



## 図の解説

<img src="/visuals/course-03/stat-likelihood-maximum-likelihood.png" alt="尤度と最尤推定の図解" style="max-height: 440px; display:block; margin:0 auto;" />

Bernoulli観測の成功回数からpの尤度曲線を描き、最大点を探す。 パラメータを横軸に固定してデータの確率を縦軸に描く。観測済みデータを固定してパラメータだけを動かす点が、確率分布そのものを描く場合との違いである。

## 記号・型・次元

- $x_1,\ldots,x_n$：観測済みデータ
- $\theta$：未知母数
- $L(\theta)=p(x_1,\ldots,x_n\mid\theta)$：データを固定し母数の関数として読む尤度
- $\ell(\theta)=\log L(\theta)$：対数尤度


## 正式な定義・代表式

MLEは観測したデータの尤度を最大にする母数値。データが独立なら尤度は各観測確率/密度の積になり、対数を取ると和へ変わる。

代表式は

$$
\hat{\theta}_{\mathrm{MLE}}=\arg\max_{\theta}L(\theta)
$$

です。

## なぜこの式・結論になるのか

### 1. 同時密度を母数の関数として読む

データを観測後は $x_i$ を固定し、$p(\mathbf x\mid\theta)$ をθについて比較する。これがlikelihood。

### 2. 独立なら積、logで和

$L(\theta)=\prod_i p(x_i\mid\theta)$。logは単調増加なのでargmaxは変わらず、$\ell(\theta)=\sum_i\log p(x_i\mid\theta)$。

### 3. 微分して最適条件を解く

内部の滑らかな最大点なら $d\ell/d\theta=0$。Bernoulliならこの方程式から $\hat p=\bar x$ が出る。二階微分や境界も確認して最大であることを確かめる。

## 教科書が省略しやすい一段を補う


### likelihoodは「データを固定して母数を動かす」

確率モデル $p(x\mid\theta)$ で観測 $x_1,\ldots,x_n$ が得られた後、likelihoodは
$$
L(\theta)=\prod_{i=1}^n p(x_i\mid\theta)
$$
を**thetaの関数**として見る。同じ数式でも、確率分布ではthetaを固定してxを変えるのに対し、likelihoodではデータを固定する。この役割の切り替えが最尤推定の核心である。

積は数値的にも微分上も扱いにくいのでlogを取り
$\ell(\theta)=\sum_i\log p(x_i\mid\theta)$
を最大化する。logは単調増加だからargmaxは変わらない。Gaussian平均のMLEなら微分を0にして標本平均が出る。最大点候補を得た後は、境界・一意性・二階条件も確認する。


### Bernoulli MLEを最後まで解く

n回中s回成功したBernoulli parameter pのlikelihoodは $L(p)=p^s(1-p)^{n-s}$。log likelihood
$\ell=s\log p+(n-s)\log(1-p)$ を微分して
$$
\ell'(p)=\frac{s}{p}-\frac{n-s}{1-p}=0.
$$
両辺をp(1-p)倍すると $s(1-p)-(n-s)p=0$、すなわちs-np=0だから
$$
\hat p=\frac sn.
$$
二階微分 $-s/p^2-(n-s)/(1-p)^2<0$ なのでinteriorでは最大。s=0,nではboundary solutionになるため、微分=0だけを機械的に探すと候補を落とす。

## 途中を飛ばさず全体をつなぐ

### 尤度と最尤推定の導出を一本につなげる

MLEは観測したデータの尤度を最大にする母数値。データが独立なら尤度は各観測確率/密度の積になり、対数を取ると和へ変わる。

#### 1. 同時密度を母数の関数として読む

まず出発点を固定する。 データを観測後は $x_i$ を固定し、$p(\mathbf x\mid\theta)$ をθについて比較する。これがlikelihood。 次に必要になるのは「独立なら積、logで和」である。

#### 2. 独立なら積、logで和

ここまでで得た結果を次の段階へ渡す。 $L(\theta)=\prod_i p(x_i\mid\theta)$。logは単調増加なのでargmaxは変わらず、$\ell(\theta)=\sum_i\log p(x_i\mid\theta)$。 次に必要になるのは「微分して最適条件を解く」である。

#### 3. 微分して最適条件を解く

最後に、前二段階の結果をまとめて結論へ進む。 内部の滑らかな最大点なら $d\ell/d\theta=0$。Bernoulliならこの方程式から $\hat p=\bar x$ が出る。二階微分や境界も確認して最大であることを確かめる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\hat{\theta}_{\mathrm{MLE}}=\arg\max_{\theta}L(\theta)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Bernoulli観測で成功k回、失敗n-k回。$\ell(p)=k\log p+(n-k)\log(1-p)$。微分して $k/p-(n-k)/(1-p)=0$、整理すると $\hat p=k/n$。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

正規分布で分散既知なら $\ell(\mu)=const-\sum_i(x_i-\mu)^2/(2\sigma^2)$。最大化は二乗誤差最小化と同値で、$\hat\mu=\bar x$。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

尤度 $L(\theta)$ はθの確率分布ではないため、θについて積分して1になる必要はない。「尤度0.8だからθの確率80%」とは読めない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Bernoulli観測で成功k回、失敗n-k回。$\ell(p)=k\log p+(n-k)\log(1-p)$。微分して $k/p-(n-k)/(1-p)=0$、整理すると $\hat p=k/n$。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

正規分布で分散既知なら $\ell(\mu)=const-\sum_i(x_i-\mu)^2/(2\sigma^2)$。最大化は二乗誤差最小化と同値で、$\hat\mu=\bar x$。

## 成立条件と、条件を外したときに何が壊れるか

- 尤度をθについて積分して1にする必要はない。
- 対数尤度は最大点を変えない。
- 尤度と最尤推定の定義と計算手順を区別し、数値例だけで一般性を判断しない。

尤度 $L(\theta)$ はθの確率分布ではないため、θについて積分して1になる必要はない。「尤度0.8だからθの確率80%」とは読めない。

## よくある誤解を分解する

- 尤度と最尤推定の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

尤度と最尤推定では、式へ数値を代入するだけでは不十分である。尤度 $L(\theta)$ はθの確率分布ではないため、θについて積分して1になる必要はない。「尤度0.8だからθの確率80%」とは読めない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

積の尤度はunderflowするためlog-likelihoodを使う。最適化ではgradientだけでなくbound・constraint・複数極値も確認する。

## ここから一段だけ発展する

MLEに事前分布を掛けるとposteriorが得られ、posteriorのmodeを取ればMAP推定。次TopicでBayesian推論として区別する。


## このTopicを理解できたか確認する問い

- 「同時密度を母数の関数として読む」を式を見ずに説明できるか
- 「微分して最適条件を解く」までの論理を一段ずつ再現できるか
- 尤度と最尤推定の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-likelihood-maximum-likelihood)　|　[スライドへ](/slides/stat-likelihood-maximum-likelihood/)
