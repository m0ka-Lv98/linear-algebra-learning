# データ行列・中心化・標準化：教科書

Course 07｜データ解析の行列手法｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 07 の入口として、データ行列・中心化・標準化 を定義から組み立てる。

前提として使うのは `prep-numpy-arrays-shapes`、`stat-linear-regression-probabilistic-model` です。

## まず直感を作る

中心化・標準化は各特徴の基準点とスケールを揃え、後続の距離・共分散・最適化を解釈しやすくする。



## 図の解説

<img src="/visuals/course-07/mat-data-matrices-centering-scaling.png" alt="データ行列・中心化・標準化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

異なる単位の2特徴を標準化前後で散布図比較する。 各軸が特徴量、点が標本である。中心化は点群の重心を原点へ移し、標準化は軸ごとの尺度をそろえるので、距離や内積への寄与が変わる。

## 記号・型・次元

- $X\in\mathbb R^{n\times p}$：rows=samples, columns=features
- $\boldsymbol\mu\in\mathbb R^p$：column means
- $\mathbf1\in\mathbb R^n$
- $X_c=X-\mathbf1\mu^T$：centered data


## 正式な定義・代表式

中心化は各featureからその標本平均を引き、column meanを0にする。標準化はさらにscaleで割り、feature単位差を除く。

代表式は

$$
\mathbf{X}_c=\mathbf{X}-\mathbf{1}\boldsymbol{\mu}^{\mathsf T}
$$

です。

## なぜこの式・結論になるのか

### 1. meanをmatrixで複製する

$\mathbf1\mu^T$ はn行全てが同じmean row vector。shapeはn×pでXと引ける。

### 2. 中心化後の平均

$\mathbf1^TX_c=\mathbf1^TX-n\mu^T=0^T$。したがって各column meanが0。

### 3. 標準化

$Z_{ij}=(X_{ij}-\mu_j)/s_j$。distance/covarianceへfeature scaleがどう効くかを明示して使う。

## 教科書が省略しやすい一段を補う


### 前処理は座標系を変える線形・affine操作

n samples × p featuresを $\mathbf X\in\mathbb R^{n\times p}$ とする。各feature meanを $\boldsymbol\mu$ とすればcentered matrixは $\mathbf X_c=\mathbf X-\mathbf 1\boldsymbol\mu^T$。各列の和が0になり、originがdata centroidへ移る。標準化はさらに各列をstandard deviationで割るので、dimensionlessなz-score coordinateへ移す。

centerはdistance between samplesを変えないがorigin依存のinner product/covariance計算を変える。scaleはdistance geometry自体を変える。したがって「前処理だからmodel外」と考えず、どのmetric/regularizer/PCA directionを作るかに直接影響する操作としてtrain dataだけでfitする。



## 途中を飛ばさず全体をつなぐ

### データ行列・中心化・標準化の導出を一本につなげる

中心化は各featureからその標本平均を引き、column meanを0にする。標準化はさらにscaleで割り、feature単位差を除く。

#### 1. meanをmatrixで複製する

まず出発点を固定する。 $\mathbf1\mu^T$ はn行全てが同じmean row vector。shapeはn×pでXと引ける。 次に必要になるのは「中心化後の平均」である。

#### 2. 中心化後の平均

ここまでで得た結果を次の段階へ渡す。 $\mathbf1^TX_c=\mathbf1^TX-n\mu^T=0^T$。したがって各column meanが0。 次に必要になるのは「標準化」である。

#### 3. 標準化

最後に、前二段階の結果をまとめて結論へ進む。 $Z_{ij}=(X_{ij}-\mu_j)/s_j$。distance/covarianceへfeature scaleがどう効くかを明示して使う。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{X}_c=\mathbf{X}-\mathbf{1}\boldsymbol{\mu}^{\mathsf T}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

身長cmと体重kgをそのままEuclidean distanceへ入れると単位scaleが距離に影響。z-score化で「何SD違うか」へ揃える。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

binary featureを標準化するかは目的次第。標準化は常に正しい前処理ではなく、model/metricの意味を変える。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

train+testをまとめてmean/SD計算するとtest情報がtrain transformへ漏れる。preprocessing parameterはtrainだけでfit。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

身長cmと体重kgをそのままEuclidean distanceへ入れると単位scaleが距離に影響。z-score化で「何SD違うか」へ揃える。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

binary featureを標準化するかは目的次第。標準化は常に正しい前処理ではなく、model/metricの意味を変える。

## 成立条件と、条件を外したときに何が壊れるか

- train統計量をtestへ漏らさない。
- 中心化と標準化は別操作。
- データ行列・中心化・標準化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

train+testをまとめてmean/SD計算するとtest情報がtrain transformへ漏れる。preprocessing parameterはtrainだけでfit。

## よくある誤解を分解する

- データ行列・中心化・標準化の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

データ行列・中心化・標準化では、式へ数値を代入するだけでは不十分である。train+testをまとめてmean/SD計算するとtest情報がtrain transformへ漏れる。preprocessing parameterはtrainだけでfit。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

axisを間違えるとsample meanを引いてしまう。pipelineにfit/transformを分離し、constant featureのzero SD処理を決める。

## ここから一段だけ発展する

中心化したdataのscatter $X_c^TX_c$ がcovariance matrixを作り、feature間のjoint variationを表す。


## このTopicを理解できたか確認する問い

- 「meanをmatrixで複製する」を式を見ずに説明できるか
- 「標準化」までの論理を一段ずつ再現できるか
- データ行列・中心化・標準化の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-data-matrices-centering-scaling)　|　[スライドへ](/slides/mat-data-matrices-centering-scaling/)
