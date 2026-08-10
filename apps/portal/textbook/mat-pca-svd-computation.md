# PCAのSVD計算：教科書

Course 07｜データ解析の行列手法｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-pca-geometry` で得た概念を使い、ここでは PCAのSVD計算 へ進む。

前提として使うのは `mat-pca-geometry`、`num-svd-low-rank-computation` です。

## まず直感を作る

PCAはデータの分散が大きい直交方向を順に選び、低次元へ射影する。



## 図の解説

<img src="/visuals/course-07/mat-pca-svd-computation.png" alt="PCAのSVD計算の図解" style="max-height: 440px; display:block; margin:0 auto;" />

細長い点群と主成分軸、射影点を描く。 点群の最も長い方向が第一主成分である。各点をその軸へ直交射影した座標の分散が最大になる方向を探す問題が固有値/SVDへつながる。

## 記号・型・次元

- $X_c=U\Sigma V^T$
- $S=(n-1)^{-1}X_c^TX_c$
- $V$：principal directions
- $U\Sigma$：scores


## 正式な定義・代表式

centered data SVDから $S=V(\Sigma²/(n-1))V^T$。したがってright singular vectorsがPCA loading。

代表式は

$$
\mathbf{X}_c=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

です。

## なぜこの式・結論になるのか

### 1. SへSVDを代入

$X_c^TX_c=V\Sigma U^TU\Sigma V^T=V\Sigma²V^T$。

### 2. eigenvalue対応

$S$ eigenvalueは $\lambda_i=\sigma_i²/(n-1)$。

### 3. scores

$X_cv_i=\sigma_i u_i$ なのでsample scores matrixは $X_cV_r=U_r\Sigma_r$。

## 教科書が省略しやすい一段を補う


### covarianceを明示形成せずSVDでPCAを求める

centered data $X_c=U\Sigma V^T$ なら
$$
S=\frac1{n-1}X_c^TX_c=V\frac{\Sigma^2}{n-1}V^T.
$$
したがってright singular vectors Vがprincipal directions、eigenvaluesは $\sigma_i^2/(n-1)$。score matrixは $X_cV=U\Sigma$。

この関係によりcovariance matrix p×pを作らず直接SVDでき、n,pの形に応じthin/randomized SVDを選べる。PCA前にcenterしないとfirst componentがmean offsetを説明してしまい、variance around centroidという本来のgeometryとずれる。


### sample scoreとloadingのshapeを確認する

$X_c\in\mathbb R^{n\times p}=U_{n\times r}\Sigma_{r\times r}V_{p\times r}^T$。V columnsがfeature-space directions、scores $Z=X_cV=U\Sigma\in\mathbb R^{n\times r}$ は各sample coordinates。loadingとscoreを逆に呼ぶ資料もあるためshapeを基準に読む。

reconstruction with first k PCsは $\hat X=U_k\Sigma_kV_k^T=Z_kV_k^T$。explained variance ratioはσ_i²の比で計算する。

## 途中を飛ばさず全体をつなぐ

### PCAのSVD計算の導出を一本につなげる

centered data SVDから $S=V(\Sigma²/(n-1))V^T$。したがってright singular vectorsがPCA loading。

#### 1. SへSVDを代入

まず出発点を固定する。 $X_c^TX_c=V\Sigma U^TU\Sigma V^T=V\Sigma²V^T$。 次に必要になるのは「eigenvalue対応」である。

#### 2. eigenvalue対応

ここまでで得た結果を次の段階へ渡す。 $S$ eigenvalueは $\lambda_i=\sigma_i²/(n-1)$。 次に必要になるのは「scores」である。

#### 3. scores

最後に、前二段階の結果をまとめて結論へ進む。 $X_cv_i=\sigma_i u_i$ なのでsample scores matrixは $X_cV_r=U_r\Sigma_r$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{X}_c=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

σ=(10,3,1), n=11ならvariance=(10,0.9,0.1)、total11、PC1 explained ratio10/11。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

p≫nならp×p covariance eigenproblemよりthin SVDが有利。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

σ=(10,3,1), n=11ならvariance=(10,0.9,0.1)、total11、PC1 explained ratio10/11。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

p≫nならp×p covariance eigenproblemよりthin SVDが有利。

## 成立条件と、条件を外したときに何が壊れるか

- PCA前の中心化を忘れない。
- 分散最大方向が必ず意味的に重要とは限らない。
- PCAのSVD計算の定義と計算手順を区別し、数値例だけで一般性を判断しない。

singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。

## よくある誤解を分解する

- PCAのSVD計算の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

PCAのSVD計算では、式へ数値を代入するだけでは不十分である。singular valuesだけ見てloading方向を無視すると「どのfeature combinationか」が分からない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

randomized SVDでlarge data。sign of singular vector is arbitrary; run間sign flipはsame component。

## ここから一段だけ発展する

covariance ellipseを球へ変換するwhiteningとMahalanobis distanceへ。


## このTopicを理解できたか確認する問い

- 「SへSVDを代入」を式を見ずに説明できるか
- 「scores」までの論理を一段ずつ再現できるか
- PCAのSVD計算の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-pca-svd-computation)　|　[スライドへ](/slides/mat-pca-svd-computation/)
