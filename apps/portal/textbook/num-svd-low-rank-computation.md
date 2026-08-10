# SVDと低ランク計算：教科書

Course 05｜数値計算｜Topic 14/20

## このTopicは、前の何を受けて始まるか

前Topic `num-eigenvalue-power-qr` で得た概念を使い、ここでは SVDと低ランク計算 へ進む。

前提として使うのは `la-singular-value-decomposition`、`la-low-rank-approximation`、`num-eigenvalue-power-qr` です。

## まず直感を作る

低ランク近似はデータの主要な方向だけ残し、情報を圧縮する。



## 図の解説

<img src="/visuals/course-05/num-svd-low-rank-computation.png" alt="SVDと低ランク計算の図解" style="max-height: 440px; display:block; margin:0 auto;" />

行列画像を特異値1個、2個、…と増やして再構成する。 特異値を大きい順に並べると、各rank-1成分がデータをどれだけ強く説明するかが見える。小さい特異値の成分を落とすと低rank近似になる。

## 記号・型・次元

- $A=U\Sigma V^T$
- $\sigma_1\ge\cdots$
- $A_r=U_r\Sigma_rV_r^T$：rank-r truncation


## 正式な定義・代表式

SVDは任意行列を直交方向のstretchへ分解する。top r singular tripletsだけ残すtruncated SVDは2-norm/Frobenius normでbest rank-r approximation。

代表式は

$$
\mathbf{A}_r=\mathbf{U}_r\mathbf{\Sigma}_r\mathbf{V}_r^{\mathsf T}
$$

です。

## なぜこの式・結論になるのか

### 1. SVD sum形

$A=\sum_i\sigma_i u_i v_i^T$。各rank-1成分は入力v_i方向を出力u_i方向へσ_i倍する。

### 2. 小さい成分を落とす

$A_r=\sum_{i=1}^r\sigma_i u_i v_i^T$。残差は残した以外の直交rank-1成分。

### 3. 誤差

Frobenius誤差平方は直交性から $\sum_{i>r}\sigma_i^2$、spectral errorはσ_{r+1}。Eckart–Youngでこれが最小。

## 教科書が省略しやすい一段を補う


### low-rank approximationでsingular valuesが残す順番を決める

$A=U\Sigma V^T=\sum_i\sigma_i u_iv_i^T$ とrank-1成分の和に分ける。orthogonal directionsに沿う成分なのでFrobenius normではtotal energyが $\sum_i\sigma_i^2$ に分解される。rank rへ制限したときtop r singular componentsを残す $A_r$ がEckart–Young theoremによりbest approximation。

計算ではfull SVDが不要な場合、Lanczos/randomized methodsでtop singular subspaceだけ求められる。small singular valuesはnoise-sensitive inverse directionsでもあるため、low-rank truncationはcompressionだけでなくregularizationの意味を持つことがある。


### Eckart–YoungをPythagorasとして読む

SVD rank-1 matrices $u_iv_i^T$ はFrobenius inner productでorthonormal。したがってAをこのorthogonal basis coefficients σ_iで展開したと見なせる。rank r approximationでr成分しか残せないなら、Euclidean vectorのbest r-coordinate approximationと同様にabsolute coefficientsが最大のσ_1…σ_rを残すのがresidual normを最小にする。

Frobenius errorは $\|A-A_r\|_F^2=\sum_{i>r}\sigma_i^2$、spectral errorはσ_{r+1}。この二つは同じtruncationでも評価normが違う。

## 途中を飛ばさず全体をつなぐ

### SVDと低ランク計算の導出を一本につなげる

SVDは任意行列を直交方向のstretchへ分解する。top r singular tripletsだけ残すtruncated SVDは2-norm/Frobenius normでbest rank-r approximation。

#### 1. SVD sum形

まず出発点を固定する。 $A=\sum_i\sigma_i u_i v_i^T$。各rank-1成分は入力v_i方向を出力u_i方向へσ_i倍する。 次に必要になるのは「小さい成分を落とす」である。

#### 2. 小さい成分を落とす

ここまでで得た結果を次の段階へ渡す。 $A_r=\sum_{i=1}^r\sigma_i u_i v_i^T$。残差は残した以外の直交rank-1成分。 次に必要になるのは「誤差」である。

#### 3. 誤差

最後に、前二段階の結果をまとめて結論へ進む。 Frobenius誤差平方は直交性から $\sum_{i>r}\sigma_i^2$、spectral errorはσ_{r+1}。Eckart–Youngでこれが最小。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{A}_r=\mathbf{U}_r\mathbf{\Sigma}_r\mathbf{V}_r^{\mathsf T}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

singular values (10,3,0.2)ならrank2 truncationのspectral error0.2、Frobenius error0.2。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

noise singular valuesがsignalと分離していればtruncationはcompression兼denoisingになるが、境界が不明ならr選択がmodeling問題。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

truncated SVDが全目的で最良とは限らない。非負制約、sparse解釈、特定entry重み付き誤差では別factorizationが適切。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

singular values (10,3,0.2)ならrank2 truncationのspectral error0.2、Frobenius error0.2。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

noise singular valuesがsignalと分離していればtruncationはcompression兼denoisingになるが、境界が不明ならr選択がmodeling問題。

## 成立条件と、条件を外したときに何が壊れるか

- 打ち切りrankは情報量と誤差のトレードオフ。
- Frobenius誤差とspectral誤差の意味を区別する。
- SVDと低ランク計算の定義と計算手順を区別し、数値例だけで一般性を判断しない。

truncated SVDが全目的で最良とは限らない。非負制約、sparse解釈、特定entry重み付き誤差では別factorizationが適切。

## よくある誤解を分解する

- SVDと低ランク計算の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

SVDと低ランク計算では、式へ数値を代入するだけでは不十分である。truncated SVDが全目的で最良とは限らない。非負制約、sparse解釈、特定entry重み付き誤差では別factorizationが適切。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

full SVDは高cost。rが小さいならLanczos/randomized SVDを使い、residual/subspace errorを検証する。

## ここから一段だけ発展する

小singular value方向でinverseが誤差を増幅するため、truncationやridgeをinverse problemのregularizationとして使う。


## このTopicを理解できたか確認する問い

- 「SVD sum形」を式を見ずに説明できるか
- 「誤差」までの論理を一段ずつ再現できるか
- SVDと低ランク計算の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-svd-low-rank-computation)　|　[スライドへ](/slides/num-svd-low-rank-computation/)
