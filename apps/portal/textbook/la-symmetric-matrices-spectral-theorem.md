# 対称行列とスペクトル定理：教科書

Course 02｜線形代数｜Topic 23/29

## このTopicの位置づけ

一般行列は対角化できないこともあり、固有ベクトルが直交する保証もない。しかし実対称行列 $\mathbf A^T=\mathbf A$ は非常に良い性質を持つ。固有値は実数で、正規直交固有ベクトル基底を選べる。これがspectral theorem（スペクトル定理）。

**前提知識**：固有値、対角化、直交行列。

## まず直感を作る

対称行列は「適切な直交座標へ回転すれば、各軸を独立に伸縮するだけ」の変換。斜めのshearのような成分混合を、直交回転だけで完全にほどける。

## 図の解説

<img src="/visuals/course-02/la-symmetric-matrices-spectral-theorem.png" alt="対称行列とスペクトル定理の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では単位円が対称行列によって楕円へ変わり、その主軸方向に二つの直交固有ベクトル $\mathbf q_1,\mathbf q_2$ が描かれている。対称行列ではこの固有方向を互いに直角に選べる。

そのため基底変換行列 $\mathbf Q$ は一般の可逆行列ではなく直交行列になり、逆行列が単に転置 $\mathbf Q^T$ になる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$、$\mathbf A^T=\mathbf A$。
- $\mathbf Q$：正規直交固有ベクトルを列に持つ直交行列。
- $\mathbf\Lambda$：実固有値を並べた対角行列。


## 正式な定義

実対称行列について、スペクトル定理は

$$
\boxed{\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^T}
$$

と直交対角化できることを主張する。

## なぜこの式・定理になるのか

### 異なる固有値の固有ベクトルが直交する理由

$\mathbf A\mathbf u=\lambda\mathbf u$、$\mathbf A\mathbf v=\mu\mathbf v$ とし、$\lambda\ne\mu$。対称性から

$$
\mathbf u^T\mathbf A\mathbf v
=(\mathbf A\mathbf u)^T\mathbf v.
$$

左辺は

$$
\mathbf u^T(\mu\mathbf v)=\mu\mathbf u^T\mathbf v,
$$

右辺は

$$
(\lambda\mathbf u)^T\mathbf v=\lambda\mathbf u^T\mathbf v.
$$

したがって

$$
(\mu-\lambda)\mathbf u^T\mathbf v=0.
$$

$\mu\ne\lambda$ なので

$$
\mathbf u^T\mathbf v=0.
$$

つまり異なる固有値に対応する固有ベクトルは直交する。

重複固有値の固有空間内でもGram–Schmidtを使って正規直交基底を選べる。これらを全て並べた $\mathbf Q$ は $\mathbf Q^T\mathbf Q=\mathbf I$ を満たし、通常の対角化式 $\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^{-1}$ で $\mathbf Q^{-1}=\mathbf Q^T$ だからスペクトル分解が得られる。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}
$$

の固有ベクトル $(1,1)^T$ と $(1,-1)^T$ は直交する。正規化して

$$
\mathbf Q=\frac1{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},
\qquad
\mathbf\Lambda=\begin{bmatrix}3&0\\0&1\end{bmatrix}.
$$

そして $\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^T$。

## もう一段丁寧に：対称行列ではなぜ固有ベクトルが特別に扱いやすいのか

### 1. 異なる固有値の固有ベクトルが直交する証明

$\mathbf A^T=\mathbf A$ とし、

$$
\mathbf A\mathbf u=\lambda\mathbf u,
\qquad
\mathbf A\mathbf v=\mu\mathbf v,
\qquad
\lambda\ne\mu
$$

とする。

まず

$$
\mathbf u^T\mathbf A\mathbf v
=\mu\mathbf u^T\mathbf v.
$$

一方、対称性を使うと

$$
\mathbf u^T\mathbf A\mathbf v
=(\mathbf A\mathbf u)^T\mathbf v
=\lambda\mathbf u^T\mathbf v.
$$

したがって

$$
(\lambda-\mu)\mathbf u^T\mathbf v=0.
$$

$\lambda\ne\mu$ なので

$$
\boxed{\mathbf u^T\mathbf v=0}.
$$

つまり異なる固有値の固有方向は自動的に直交する。

### 2. 重複固有値でもorthonormal basisを選べる

同じ固有値のeigenspaceは部分空間なので、その内部でGram–Schmidtを使ってorthonormal basisを選べる。異なるeigenspace同士は既に直交しているため、全体として$n$本のorthonormal eigenvectorsを選べる。

これがspectral theoremの形

$$
\boxed{\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^T}
$$

につながる。$\mathbf Q$ はorthogonalなので $\mathbf Q^{-1}=\mathbf Q^T$。

### 3. 一般の対角化との違い

一般のdiagonalizable matrixでは

$$
\mathbf A=\mathbf P\mathbf D\mathbf P^{-1}
$$

で、$\mathbf P$ が歪んだbasisを持つことがある。対称行列では $\mathbf P$ をorthogonal $\mathbf Q$ に選べるので、座標変換が長さ・角度を保存する。この性質が数値計算でも幾何学でも大きな利点になる。

### 4. 二次形式が固有basisで完全に分離する

$\mathbf x=\mathbf Q\mathbf z$ と置けば

$$
\mathbf x^T\mathbf A\mathbf x
=\mathbf z^T\mathbf Q^T
(\mathbf Q\mathbf\Lambda\mathbf Q^T)
\mathbf Q\mathbf z
=\mathbf z^T\mathbf\Lambda\mathbf z
=\sum_i\lambda_i z_i^2.
$$

cross termが消え、各固有方向の独立な寄与へ分解される。次Topicでpositive definitenessを固有値の符号だけで判定できるのはこのためである。

## 成立条件・壊れる場合

「対角化可能」と「直交対角化可能」は違う。実対称行列は後者まで保証される。一般の非対称行列では固有ベクトルが直交しないことも、複素固有値を持つこともある。

## ここから発展

対称行列の固有値は二次形式 $\mathbf x^T\mathbf A\mathbf x$ の符号や曲率を決める。次Topicの正定値性は、スペクトル定理を使うと非常に明快になる。


## このTopicの理解確認

- 異なるeigenvaluesに属するeigenvectorsがorthogonalになる証明を再現できるか。
- 一般のdiagonalizationと $Q\Lambda Q^T$ の違いを説明できるか。
- quadratic formがeigenbasisで $\sum_i\lambda_i z_i^2$ に分離することを導けるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-symmetric-matrices-spectral-theorem)
