# 直交基底と正規直交基底：教科書

Course 02｜線形代数｜Topic 14/29

## このTopicの位置づけ

一般の基底では座標係数を求めるため連立方程式を解く必要がある。しかし基底ベクトル同士が直交し、さらに長さ1なら、各座標は内積を取るだけで直接読み取れる。これが正規直交基底の強みである。

**前提知識**：内積・ノルム・角度、基底。

## まず直感を作る

通常の$x$軸・$y$軸が便利なのは互いに直角で長さ1だから。斜めの基底では一方の成分を測ると他方の影響が混ざるが、直交基底では各方向の寄与が独立に分離できる。

## 図の解説

<img src="/visuals/course-02/la-orthogonal-orthonormal-bases.png" alt="直交基底と正規直交基底の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の $\mathbf q_1,\mathbf q_2$ は互いに直交し長さ1である。$\mathbf x$ をそれぞれの軸へ落とした長さが $\mathbf q_1^T\mathbf x$ と $\mathbf q_2^T\mathbf x$ になり、その2値を使って $\mathbf x$ を再構成できる。

一般の斜め基底ではこの単純な垂線の長さがそのまま座標にはならない。

## 記号・型・次元

- $\mathbf q_1,\ldots,\mathbf q_k$：基底ベクトル。
- $\mathbf Q=[\mathbf q_1\ \cdots\ \mathbf q_k]$。
- $\mathbf Q^T\mathbf Q=\mathbf I_k$：列が正規直交である条件。


## 正式な定義

$i\ne j$ に対し $\mathbf q_i^T\mathbf q_j=0$ なら直交系。さらに全て $\|\mathbf q_i\|_2=1$ なら正規直交系という。基底でもあれば正規直交基底である。

## なぜこの式・定理になるのか

### なぜ座標係数が内積で出るのか

$\mathbf x$ が正規直交基底で

$$
\mathbf x=c_1\mathbf q_1+\cdots+c_k\mathbf q_k
$$

と書けるとする。両辺の左から $\mathbf q_j^T$ を掛ける：

$$
\mathbf q_j^T\mathbf x
=\sum_{i=1}^k c_i\mathbf q_j^T\mathbf q_i.
$$

正規直交性より $\mathbf q_j^T\mathbf q_i$ は $i=j$ のとき1、それ以外0。したがって

$$
c_j=\mathbf q_j^T\mathbf x.
$$

よって

$$
\mathbf x=\sum_{j=1}^k(\mathbf q_j^T\mathbf x)\mathbf q_j.
$$

行列で書けば、空間全体の正規直交基底なら

$$
\mathbf x=\mathbf Q\mathbf Q^T\mathbf x,
$$

したがって正方直交行列では $\mathbf Q\mathbf Q^T=\mathbf I$ も成り立つ。

### 長さが保存される理由

正方直交行列 $\mathbf Q$ について

$$
\|\mathbf Q\mathbf x\|_2^2
=\mathbf x^T\mathbf Q^T\mathbf Q\mathbf x
=\mathbf x^T\mathbf x
=\|\mathbf x\|_2^2.
$$

つまり直交行列は回転・反射のように長さを変えない。

## 小さな数値例を最後まで計算する

$\mathbf q_1=(1,0)^T$、$\mathbf q_2=(0,1)^T$、$\mathbf x=(3,-2)^T$ なら

$$
c_1=\mathbf q_1^T\mathbf x=3,\qquad c_2=\mathbf q_2^T\mathbf x=-2.
$$

標準基底では当たり前に見えるが、この計算が任意の正規直交基底でも成立する。

## もう一段丁寧に：orthonormal basisで座標計算が簡単になる理由

### 1. 一般basisでは連立方程式が必要

basis $\mathbf b_1,\ldots,\mathbf b_n$ に対し

$$
\mathbf x=c_1\mathbf b_1+\cdots+c_n\mathbf b_n
$$

の係数を求めるには、一般には

$$
\mathbf B\mathbf c=\mathbf x,
\qquad
\mathbf B=[\mathbf b_1\cdots\mathbf b_n]
$$

という連立方程式を解く必要がある。

### 2. orthonormalなら内積を取るだけ

$\mathbf q_i^T\mathbf q_j=0$ ($i\ne j$)、$\|\mathbf q_i\|_2=1$ とする。

$$
\mathbf x=\sum_{j=1}^n c_j\mathbf q_j
$$

の両辺へ $\mathbf q_i^T$ を掛けると

$$
\mathbf q_i^T\mathbf x
=\sum_j c_j\mathbf q_i^T\mathbf q_j
=c_i.
$$

したがって

$$
\boxed{c_i=\mathbf q_i^T\mathbf x}.
$$

これはorthonormal basisの最重要な計算上の利点である。

### 3. 行列で書けば $\mathbf Q^T\mathbf Q=\mathbf I$

$\mathbf Q=[\mathbf q_1\cdots\mathbf q_n]$ とすれば

$$
\mathbf Q^T\mathbf Q=\mathbf I.
$$

正方形なら $\mathbf Q^{-1}=\mathbf Q^T$。よってbasis変換に一般の逆行列計算が不要になる。

### 4. 長さも保存する

$$
\|\mathbf Q\mathbf x\|_2^2
=\mathbf x^T\mathbf Q^T\mathbf Q\mathbf x
=\mathbf x^T\mathbf x
=\|\mathbf x\|_2^2.
$$

同様に内積も保存するので角度も保存する。orthogonal matrixは回転・反射のような「形を歪めない」変換を表す。

### 5. Parsevalの関係

orthonormal basis座標 $c_i=\mathbf q_i^T\mathbf x$ を使うと

$$
\|\mathbf x\|_2^2
=\sum_{i=1}^n c_i^2.
$$

元の座標で測ったエネルギーとorthonormal basis上の係数二乗和が一致する。この関係はFourier解析やPCAでも重要になるが、ここではまず「直交座標へ分解しても長さ情報を失わない」という線形代数の事実として理解する。

## 成立条件・壊れる場合

直交していても長さが1でなければ係数は $c_j=(\mathbf q_j^T\mathbf x)/(\mathbf q_j^T\mathbf q_j)$ となる。直交と正規直交を区別する。

## ここから発展

Gram–Schmidtは一般の独立ベクトルから正規直交基底を作る手順であり、その計算を行列化するとQR分解になる。


## このTopicの理解確認

- orthonormal basisで係数が $q_i^Tx$ だけで求まる理由を導けるか。
- $Q^TQ=I$ からlength preservationを証明できるか。
- 一般basisの座標計算とorthonormal basisの違いを説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-orthogonal-orthonormal-bases)
