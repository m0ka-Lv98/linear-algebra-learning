# 推定量・バイアス・分散・MSE：教科書

Course 03｜確率統計｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `prob-multivariate-normal-distribution` で得た概念を使い、ここでは 推定量・バイアス・分散・MSE へ進む。

前提として使うのは `prob-expectation-variance-moments`、`prob-laws-large-numbers-central-limit-theorem` です。

## まず直感を作る

推定量はデータから未知パラメータを返す規則で、バイアスと分散の両方で性能を見る。



## 図の解説

<img src="/visuals/course-03/stat-estimators-bias-variance-mse.png" alt="推定量・バイアス・分散・MSEの図解" style="max-height: 440px; display:block; margin:0 auto;" />

同じ母集団から反復標本を取り、推定値の中心とばらつきを可視化する。 横軸上の推定量の分布に対し、真値からの系統的なずれがbias、分布の広がりがvarianceである。MSEはこの2種類の誤差を二乗誤差としてまとめる。

## 記号・型・次元

- $\theta$：未知の母数
- $\hat\theta=T(X_1,\ldots,X_n)$：データから計算する推定量
- $\operatorname{Bias}(\hat\theta)=E[\hat\theta]-\theta$
- $\operatorname{MSE}=E[(\hat\theta-\theta)^2]$


## 正式な定義・代表式

推定量は標本の関数なので、それ自体が確率変数。MSEは真値からの二乗誤差の期待値で、$MSE=Var(\hat\theta)+Bias(\hat\theta)^2$ と分解できる。

代表式は

$$
\operatorname{MSE}(\hat{\theta})=\mathbb{E}[(\hat{\theta}-\theta)^2]
$$

です。

## なぜこの式・結論になるのか

### 1. 誤差を平均周りに分ける

$\hat\theta-\theta=(\hat\theta-E\hat\theta)+(E\hat\theta-\theta)$。第一項は平均0のランダム変動、第二項は定数bias。

### 2. 二乗して期待値を取る

二乗すると分散項、bias二乗、交差項が出る。交差項の期待値は $2Bias\,E[\hat\theta-E\hat\theta]=0$。

### 3. MSE分解

したがって $MSE=Var(\hat\theta)+Bias^2$。biasを少し許してvarianceを大きく下げればMSEが改善することがある。

## 教科書が省略しやすい一段を補う


### 推定量そのものも確率変数である

母数 $\theta$ は固定だが未知、標本 $X_1,\ldots,X_n$ が確率的なので、標本から計算する推定量 $\hat\theta=T(X_1,\ldots,X_n)$ も確率変数になる。したがって「推定値1個」だけでなく、同じ実験を繰り返したときのsampling distributionを考える必要がある。

MSEを展開すると
$$
E[(\hat\theta-\theta)^2]
=\operatorname{Var}(\hat\theta)+\{E[\hat\theta]-\theta\}^2.
$$
導出は $\hat\theta-\theta=(\hat\theta-E\hat\theta)+(E\hat\theta-\theta)$ と分け、交差項の期待値が0になることを使う。したがってMSEはvarianceとbias²の和。unbiasedであることだけが良さではなく、小さなbiasを許してvarianceを大きく減らす方がMSEが小さくなる場合もある。



## 途中を飛ばさず全体をつなぐ

### 推定量・バイアス・分散・MSEの導出を一本につなげる

推定量は標本の関数なので、それ自体が確率変数。MSEは真値からの二乗誤差の期待値で、$MSE=Var(\hat\theta)+Bias(\hat\theta)^2$ と分解できる。

#### 1. 誤差を平均周りに分ける

まず出発点を固定する。 $\hat\theta-\theta=(\hat\theta-E\hat\theta)+(E\hat\theta-\theta)$。第一項は平均0のランダム変動、第二項は定数bias。 次に必要になるのは「二乗して期待値を取る」である。

#### 2. 二乗して期待値を取る

ここまでで得た結果を次の段階へ渡す。 二乗すると分散項、bias二乗、交差項が出る。交差項の期待値は $2Bias\,E[\hat\theta-E\hat\theta]=0$。 次に必要になるのは「MSE分解」である。

#### 3. MSE分解

最後に、前二段階の結果をまとめて結論へ進む。 したがって $MSE=Var(\hat\theta)+Bias^2$。biasを少し許してvarianceを大きく下げればMSEが改善することがある。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\operatorname{MSE}(\hat{\theta})=\mathbb{E}[(\hat{\theta}-\theta)^2]
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$X_i\sim(\mu,\sigma^2)$ の標本平均は不偏で $Var(\bar X)=\sigma^2/n$、MSEも同じ。標本数4倍でMSEは1/4。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$\tilde\mu=c\bar X$ はbias $(c-1)\mu$、variance $c^2\sigma^2/n$。cを1より少し小さくするとbiasが出る一方varianceが減る。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「不偏推定量なら常に最良」は誤り。不偏性は平均的中心だけを評価し、ばらつきは無視する。MSEや目的に応じた損失で比較する必要がある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$X_i\sim(\mu,\sigma^2)$ の標本平均は不偏で $Var(\bar X)=\sigma^2/n$、MSEも同じ。標本数4倍でMSEは1/4。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$\tilde\mu=c\bar X$ はbias $(c-1)\mu$、variance $c^2\sigma^2/n$。cを1より少し小さくするとbiasが出る一方varianceが減る。

## 成立条件と、条件を外したときに何が壊れるか

- 1回の推定値と推定量の分布を区別する。
- MSEはbias^2+varianceに分解される。
- 推定量・バイアス・分散・MSEの定義と計算手順を区別し、数値例だけで一般性を判断しない。

「不偏推定量なら常に最良」は誤り。不偏性は平均的中心だけを評価し、ばらつきは無視する。MSEや目的に応じた損失で比較する必要がある。

## よくある誤解を分解する

- 推定量・バイアス・分散・MSEの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

推定量・バイアス・分散・MSEでは、式へ数値を代入するだけでは不十分である。「不偏推定量なら常に最良」は誤り。不偏性は平均的中心だけを評価し、ばらつきは無視する。MSEや目的に応じた損失で比較する必要がある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

simulationで同じ母数から多数datasetを生成し、推定量のsampling distributionを観察するとbiasとvarianceを分離できる。1つのdataset内の標本分散とは別物。

## ここから一段だけ発展する

推定量をどう選ぶかの代表原理が尤度最大化。次Topicでは観測データを最も説明する母数としてMLEを導入する。


## このTopicを理解できたか確認する問い

- 「誤差を平均周りに分ける」を式を見ずに説明できるか
- 「MSE分解」までの論理を一段ずつ再現できるか
- 推定量・バイアス・分散・MSEの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-estimators-bias-variance-mse)　|　[スライドへ](/slides/stat-estimators-bias-variance-mse/)
