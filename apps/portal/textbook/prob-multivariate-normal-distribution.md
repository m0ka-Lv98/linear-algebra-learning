# 多変量正規分布：教科書

Course 03｜確率統計｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `prob-laws-large-numbers-central-limit-theorem` で得た概念を使い、ここでは 多変量正規分布 へ進む。

前提として使うのは `prob-covariance-correlation`、`prob-continuous-distributions`、`la-quadratic-forms-positive-definite` です。

## まず直感を作る

同時分布は複数変数の組を一度に扱い、周辺化は不要な軸を足し合わせる操作。



## 図の解説

<img src="/visuals/course-03/prob-multivariate-normal-distribution.png" alt="多変量正規分布の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2次元ヒートマップから行・列方向に足して周辺分布を作る。 2軸は2つの変数、各セルや密度の高さは同時にその値を取る重みを表す。一方の軸方向へ足し上げる・積分すると他方だけの周辺分布が残る。

## 記号・型・次元

- $\mathbf X\in\mathbb R^d$：d次元確率ベクトル
- $\boldsymbol\mu\in\mathbb R^d$：平均ベクトル
- $\mathbf\Sigma\in\mathbb R^{d\times d}$：共分散行列
- $\mathbf\Sigma\succ0$：正定値


## 正式な定義・代表式

多変量正規分布は平均ベクトルと共分散行列で位置・方向・広がりが決まる。密度の指数部はMahalanobis二次形式 $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)$。

代表式は

$$
\mathbf{X}\sim\mathcal{N}(\boldsymbol{\mu},\mathbf{\Sigma})
$$

です。

## なぜこの式・結論になるのか

### 1. 独立標準正規から始める

$\mathbf Z\sim N(\mathbf0,\mathbf I)$ は球対称。線形変換 $\mathbf X=\boldsymbol\mu+\mathbf L\mathbf Z$ を考える。

### 2. 平均と共分散を計算する

$E[\mathbf X]=\boldsymbol\mu$、$Cov(\mathbf X)=\mathbf L\mathbf L^T$。$\mathbf\Sigma=\mathbf L\mathbf L^T$ を満たすLを選べば所望の共分散になる。

### 3. 楕円等密度面を得る

標準空間の $\|\mathbf z\|^2=c$ は球。$\mathbf z=\mathbf L^{-1}(\mathbf x-\mu)$ を代入すると $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)=c$ という楕円になる。

## 教科書が省略しやすい一段を補う


### 共分散行列が楕円の向きと幅を決める

多変量正規 $\mathcal N(\boldsymbol\mu,\mathbf\Sigma)$ のdensityにはMahalanobis二次形式
$$
(\mathbf x-\boldsymbol\mu)^T\mathbf\Sigma^{-1}(\mathbf x-\boldsymbol\mu)
$$
が現れる。$\mathbf\Sigma=\mathbf Q\mathbf\Lambda\mathbf Q^T$ と固有分解すれば、座標を $\mathbf Q^T(\mathbf x-\mu)$ へ回転した後、各軸を $1/\sqrt{\lambda_i}$ で尺度調整したEuclidean距離になる。したがって等density面は固有vector方向を主軸、$\sqrt{\lambda_i}$ を幅にもつ楕円体になる。

正規分布では無相関が独立を意味するという特別な性質がある。しかしこれは一般分布には成立しない。共分散行列の幾何はCourse07のPCA・whitening・Mahalanobis距離へそのまま接続する。



## 途中を飛ばさず全体をつなぐ

### 多変量正規分布の導出を一本につなげる

多変量正規分布は平均ベクトルと共分散行列で位置・方向・広がりが決まる。密度の指数部はMahalanobis二次形式 $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)$。

#### 1. 独立標準正規から始める

まず出発点を固定する。 $\mathbf Z\sim N(\mathbf0,\mathbf I)$ は球対称。線形変換 $\mathbf X=\boldsymbol\mu+\mathbf L\mathbf Z$ を考える。 次に必要になるのは「平均と共分散を計算する」である。

#### 2. 平均と共分散を計算する

ここまでで得た結果を次の段階へ渡す。 $E[\mathbf X]=\boldsymbol\mu$、$Cov(\mathbf X)=\mathbf L\mathbf L^T$。$\mathbf\Sigma=\mathbf L\mathbf L^T$ を満たすLを選べば所望の共分散になる。 次に必要になるのは「楕円等密度面を得る」である。

#### 3. 楕円等密度面を得る

最後に、前二段階の結果をまとめて結論へ進む。 標準空間の $\|\mathbf z\|^2=c$ は球。$\mathbf z=\mathbf L^{-1}(\mathbf x-\mu)$ を代入すると $(\mathbf x-\mu)^T\Sigma^{-1}(\mathbf x-\mu)=c$ という楕円になる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{X}\sim\mathcal{N}(\boldsymbol{\mu},\mathbf{\Sigma})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ならx方向標準偏差2、y方向1の軸平行楕円。off-diagonalが正なら楕円が正傾斜へ回転する。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

多変量正規では共分散0の成分は独立。これは一般分布では成立しない特別な性質で、正規仮定が重要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$ ならx方向標準偏差2、y方向1の軸平行楕円。off-diagonalが正なら楕円が正傾斜へ回転する。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

多変量正規では共分散0の成分は独立。これは一般分布では成立しない特別な性質で、正規仮定が重要。

## 成立条件と、条件を外したときに何が壊れるか

- 相関0でも一般には独立とは限らない。
- 共分散はスケール依存。
- 多変量正規分布の定義と計算手順を区別し、数値例だけで一般性を判断しない。

共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。

## よくある誤解を分解する

- 多変量正規分布の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

多変量正規分布では、式へ数値を代入するだけでは不十分である。共分散行列は任意の対称行列ではなく半正定値でなければならない。負の固有値がある行列を「共分散」として使うと、ある方向の分散が負になる矛盾。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

密度計算で明示逆行列を作るよりCholesky分解を用いて二次形式とlog determinantを計算する方が安定。高次元ではlog-densityを使う。

## ここから一段だけ発展する

Mahalanobis距離、Gaussian discriminant analysis、Kalman filteringなどへつながる。Course07ではwhiteningとPCAを共分散行列の固有構造から扱う。


## このTopicを理解できたか確認する問い

- 「独立標準正規から始める」を式を見ずに説明できるか
- 「楕円等密度面を得る」までの論理を一段ずつ再現できるか
- 多変量正規分布の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/prob-multivariate-normal-distribution)　|　[スライドへ](/slides/prob-multivariate-normal-distribution/)
