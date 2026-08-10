# PCAの幾何学：教科書

Course 07｜データ解析の行列手法｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-covariance-scatter-matrices` で得た概念を使い、ここでは PCAの幾何学 へ進む。

前提として使うのは `mat-covariance-scatter-matrices`、`orthogonal-projection` です。

## まず直感を作る

PCAはデータの分散が大きい直交方向を順に選び、低次元へ射影する。



## 図の解説

<img src="/visuals/course-07/mat-pca-geometry.png" alt="PCAの幾何学の図解" style="max-height: 440px; display:block; margin:0 auto;" />

細長い点群と主成分軸、射影点を描く。 点群の最も長い方向が第一主成分である。各点をその軸へ直交射影した座標の分散が最大になる方向を探す問題が固有値/SVDへつながる。

## 記号・型・次元

- $v\in\mathbb R^p,\|v\|=1$：projection direction
- $z=X_cv$：scores
- $S$：covariance


## 正式な定義・代表式

PCA first componentはprojected variance $v^TSv$ をunit vector制約で最大化する。solutionはSの最大eigenvalue eigenvector。

代表式は

$$
\max_{\|\mathbf{v}\|_2=1}\mathbf{v}^{\mathsf T}\mathbf{S}\mathbf{v}
$$

です。

## なぜこの式・結論になるのか

### 1. project variance

$Var(z)=(n-1)^{-1}\|X_cv\|²=v^TSv$。

### 2. unit constraint

scaleを自由にするとvを大きくしてvarianceを無限増加できるので $v^Tv=1$。

### 3. Lagrange condition

$L=v^TSv-\lambda(v^Tv-1)$。gradient=0で $Sv=\lambda v$。最大Rayleigh quotientは最大eigenvalue。

## 教科書が省略しやすい一段を補う


### variance最大化とreconstruction error最小化が同じ方向を選ぶ

unit vector vへprojectしたscoreはz=X_cv。そのvarianceは $v^TSv$。constraint $\|v\|=1$ の下で最大化しLagrange multiplierを使うと $Sv=\lambda v$、最大eigenvalueのeigenvectorがPC1。

一方rank-1 reconstructionは各pointをspan(v)へ直交射影する。Pythagorasより total squared norm = projected energy + residual energy。totalはvに依存しないのでprojected variance最大化はresidual squared error最小化と同値。二つのPCA定義が別公式ではなく同じorthogonal decompositionから出る。



## 途中を飛ばさず全体をつなぐ

### PCAの幾何学の導出を一本につなげる

PCA first componentはprojected variance $v^TSv$ をunit vector制約で最大化する。solutionはSの最大eigenvalue eigenvector。

#### 1. project variance

まず出発点を固定する。 $Var(z)=(n-1)^{-1}\|X_cv\|²=v^TSv$。 次に必要になるのは「unit constraint」である。

#### 2. unit constraint

ここまでで得た結果を次の段階へ渡す。 scaleを自由にするとvを大きくしてvarianceを無限増加できるので $v^Tv=1$。 次に必要になるのは「Lagrange condition」である。

#### 3. Lagrange condition

最後に、前二段階の結果をまとめて結論へ進む。 $L=v^TSv-\lambda(v^Tv-1)$。gradient=0で $Sv=\lambda v$。最大Rayleigh quotientは最大eigenvalue。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\max_{\|\mathbf{v}\|_2=1}\mathbf{v}^{\mathsf T}\mathbf{S}\mathbf{v}
$$


### 具体例と一般式を往復する

本文の第一例は次の設定である。

ellipse cloudの長軸がPC1、短軸PC2。eigenvalueは各axisのvariance。


centerしないPCAではoriginからmean方向がdominantになることがあり、通常のvariance interpretationが変わる。


### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。


## 例題1：小さな数値で最後まで計算する

ellipse cloudの長軸がPC1、短軸PC2。eigenvalueは各axisのvariance。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

centerしないPCAではoriginからmean方向がdominantになることがあり、通常のvariance interpretationが変わる。

## 成立条件と、条件を外したときに何が壊れるか

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- PCAの幾何学の定義と計算手順を区別し、数値例だけで一般性を判断しない。

PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。

## よくある誤解を分解する

- PCAの幾何学の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

PCAの幾何学では、式へ数値を代入するだけでは不十分である。PCAはlabelを使わないのでclass separation最大化とは限らない。大variance nuisanceがPC1になることも。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

covarianceを形成せずcentered XのSVDを使うと安定/効率的。explained variance ratioだけでrを自動決定しない。

## ここから一段だけ発展する

PCA eigenvectorsとXのright singular vectorsが一致する関係を次Topicで導く。


## このTopicを理解できたか確認する問い

- 「project variance」を式を見ずに説明できるか
- 「Lagrange condition」までの論理を一段ずつ再現できるか
- PCAの幾何学の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-pca-geometry)　|　[スライドへ](/slides/mat-pca-geometry/)
