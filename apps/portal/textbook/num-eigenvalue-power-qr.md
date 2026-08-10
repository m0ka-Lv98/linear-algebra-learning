# 固有値計算・べき乗法・QR法：教科書

Course 05｜数値計算｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `num-least-squares-qr-svd` で得た概念を使い、ここでは 固有値計算・べき乗法・QR法 へ進む。

前提として使うのは `la-eigenvalues-eigenvectors`、`la-gram-schmidt-qr`、`num-convergence-orders-stopping` です。

## まず直感を作る

固有値計算では全成分を解くより、支配的な方向を反復で増幅する考え方が使える。



## 図の解説

<img src="/visuals/course-05/num-eigenvalue-power-qr.png" alt="固有値計算・べき乗法・QR法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

べき乗法でベクトルが最大固有値の固有方向へ揃う過程を見る。 反復でベクトルをAへ何度も掛けると、絶対値最大固有値に対応する成分が相対的に支配する。正規化を挟むことで方向だけを追跡するのがpower iterationである。

## 記号・型・次元

- $A v_i=\lambda_i v_i$
- $x_k$：power iteration vector
- $\lambda_1$：絶対値最大固有値（単純と仮定）


## 正式な定義・代表式

power methodは反復A^k x0でdominant eigencomponentを相対的に増幅し、normalizeしてvector overflowを防ぐ。

代表式は

$$
\mathbf{x}_{k+1}=\frac{\mathbf{A}\mathbf{x}_k}{\|\mathbf{A}\mathbf{x}_k\|_2}
$$

です。

## なぜこの式・結論になるのか

### 1. 固有basisへ展開

$x_0=\sum c_i v_i$ とすれば $A^k x_0=\sum c_i\lambda_i^k v_i$。

### 2. dominant項で割る

$\lambda_1^k[c_1v_1+\sum_{i>1}c_i(\lambda_i/\lambda_1)^k v_i]$。$|\lambda_i/\lambda_1|<1$ なら後項が消える。

### 3. normalize

各stepでnormを1へ戻して方向だけ追う。Rayleigh quotientでeigenvalueを推定できる。

## 教科書が省略しやすい一段を補う


### power iterationがdominant eigenvectorへ向く理由

対角化可能Aで初期vector $x_0=\sum_i c_iv_i$ と展開すると
$$
A^kx_0=\sum_i c_i\lambda_i^k v_i.
$$
$|\lambda_1|>|\lambda_2|\ge\cdots$ かつc1≠0なら、$\lambda_1^k$ で割った相対比 $(\lambda_i/\lambda_1)^k$ が0へ行きdominant direction v1が残る。各stepでnormを正規化すればoverflowを避け方向だけ追える。

QR algorithmはshiftやHessenberg reductionと組み合わせ全eigenvaluesを求める。eigenvalue problemはnon-normal matrixで敏感になり得るため、residual $\|Av-\lambda v\|$ とconditionを併せて確認する。



## 途中を飛ばさず全体をつなぐ

### 固有値計算・べき乗法・QR法の導出を一本につなげる

power methodは反復A^k x0でdominant eigencomponentを相対的に増幅し、normalizeしてvector overflowを防ぐ。

#### 1. 固有basisへ展開

まず出発点を固定する。 $x_0=\sum c_i v_i$ とすれば $A^k x_0=\sum c_i\lambda_i^k v_i$。 次に必要になるのは「dominant項で割る」である。

#### 2. dominant項で割る

ここまでで得た結果を次の段階へ渡す。 $\lambda_1^k[c_1v_1+\sum_{i>1}c_i(\lambda_i/\lambda_1)^k v_i]$。$|\lambda_i/\lambda_1|<1$ なら後項が消える。 次に必要になるのは「normalize」である。

#### 3. normalize

最後に、前二段階の結果をまとめて結論へ進む。 各stepでnormを1へ戻して方向だけ追う。Rayleigh quotientでeigenvalueを推定できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\frac{\mathbf{A}\mathbf{x}_k}{\|\mathbf{A}\mathbf{x}_k\|_2}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

A=diag(5,2), x0=(1,1)。A^k x0=(5^k,2^k)、normalizeすると(1,0)方向へ。error ratioは(2/5)^k。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

dominant固有値の絶対値が同率だと単純power法は一意方向へ収束しないことがある。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

A=diag(5,2), x0=(1,1)。A^k x0=(5^k,2^k)、normalizeすると(1,0)方向へ。error ratioは(2/5)^k。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

dominant固有値の絶対値が同率だと単純power法は一意方向へ収束しないことがある。

## 成立条件と、条件を外したときに何が壊れるか

- 最大固有値の絶対値が分離していることが重要。
- 正規化しないと数値的にoverflow/underflowする。
- 固有値計算・べき乗法・QR法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。

## よくある誤解を分解する

- 固有値計算・べき乗法・QR法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

固有値計算・べき乗法・QR法では、式へ数値を代入するだけでは不十分である。x0がdominant eigenvectorに完全直交（係数c1=0）ならその成分は永遠に生成されずdominantへ収束しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

QR algorithmは全eigenvalue用。sparse大型ではLanczos/Arnoldi。residual $\|Av-\lambda v\|$ を必ず確認。

## ここから一段だけ発展する

singular valuesはA^TAのeigenvalue平方根だが、数値計算ではA^TAを直接形成しないSVD algorithmを使う。


## このTopicを理解できたか確認する問い

- 「固有basisへ展開」を式を見ずに説明できるか
- 「normalize」までの論理を一段ずつ再現できるか
- 固有値計算・べき乗法・QR法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-eigenvalue-power-qr)　|　[スライドへ](/slides/num-eigenvalue-power-qr/)
