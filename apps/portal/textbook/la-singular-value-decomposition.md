# 特異値分解（SVD）：教科書

Course 02｜線形代数｜Topic 26/29

## このTopicの位置づけ

固有分解は基本的に正方行列の自己写像を扱う。一方、データ行列や最小二乗の $\mathbf A$ は長方形でもよい。SVDは任意の $m\times n$ 行列を、入力側の直交基底・軸ごとの伸縮・出力側の直交基底に分ける。

**前提知識**：固有値、対称行列、正定値・半正定値、正規直交基底。

## まず直感を作る

SVDは「回転（または反射）→ 軸ごとの伸縮 → 回転（または反射）」である。複雑な長方形行列でも、適切な入力方向を選べば各方向が互いに混ざらず、単に $\sigma_i$ 倍されて対応する出力方向へ移る。

## 図の解説

<img src="/visuals/course-02/la-singular-value-decomposition.png" alt="特異値分解（SVD）の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図は左から、入力の単位円、$\mathbf V^T$ で右特異ベクトル座標へ回転した円、$\mathbf\Sigma$ で各軸を異なる倍率に伸ばした楕円、$\mathbf U$ で出力方向へ回転した最終形を並べている。

特異値 $\sigma_i$ は楕円の半軸長に対応する。$\sigma_i=0$ の方向があれば、その軸は完全に潰れて低次元になる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$。
- $\mathbf V\in\mathbb R^{n\times n}$：右特異ベクトルを列にもつ直交行列。
- $\mathbf U\in\mathbb R^{m\times m}$：左特異ベクトルを列にもつ直交行列。
- $\mathbf\Sigma\in\mathbb R^{m\times n}$：非負特異値 $\sigma_1\ge\cdots\ge0$ を対角に持つ。
- $r=\operatorname{rank}(\mathbf A)$：正の特異値の個数。


## 正式な定義

任意の実行列について

$$
\boxed{\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T}
$$

というSVDが存在する。

## なぜこの式・定理になるのか

### 1. なぜ $\mathbf A^T\mathbf A$ から始めるのか

$\mathbf A^T\mathbf A$ は$n\times n$の対称半正定値行列。したがってスペクトル定理により

$$
\mathbf A^T\mathbf A
=\mathbf V\mathbf\Lambda\mathbf V^T
$$

と直交対角化できる。半正定値なので固有値 $\lambda_i\ge0$。

### 2. 特異値を平方根で定義する

$$
\sigma_i=\sqrt{\lambda_i}\ge0.
$$

右固有ベクトル $\mathbf v_i$ について

$$
\mathbf A^T\mathbf A\mathbf v_i
=\sigma_i^2\mathbf v_i.
$$

両辺の内積を $\mathbf v_i^T$ で取ると

$$
\|\mathbf A\mathbf v_i\|_2^2=\sigma_i^2.
$$

$\|\mathbf v_i\|=1$ なので、$\sigma_i$ は方向 $\mathbf v_i$ を $\mathbf A$ が何倍の長さへ伸ばすかを表す。

### 3. 左特異ベクトルを作る

$\sigma_i>0$ の方向で

$$
\mathbf u_i=\frac{\mathbf A\mathbf v_i}{\sigma_i}
$$

と定義する。すると

$$
\mathbf A\mathbf v_i=\sigma_i\mathbf u_i.
$$

また$i\ne j$について

$$
\mathbf u_i^T\mathbf u_j
=\frac{\mathbf v_i^T\mathbf A^T\mathbf A\mathbf v_j}{\sigma_i\sigma_j}
=\frac{\sigma_j^2\mathbf v_i^T\mathbf v_j}{\sigma_i\sigma_j}=0,
$$

かつ $\|\mathbf u_i\|=1$。よって左特異ベクトルも正規直交。

### 4. 行列全体を再構成する

$\mathbf A\mathbf v_i=\sigma_i\mathbf u_i$ を列ごとにまとめると

$$
\mathbf A\mathbf V=\mathbf U\mathbf\Sigma.
$$

右から $\mathbf V^T$ を掛け、$\mathbf V\mathbf V^T=\mathbf I$ を使えば

$$
\boxed{\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T}.
$$

### 5. rankとの関係

$\sigma_i=0$ なら $\mathbf A\mathbf v_i=0$ なので $\mathbf v_i\in N(\mathbf A)$。正の特異値方向だけが出力へ残る。したがって

$$
\operatorname{rank}(\mathbf A)=\#\{i:\sigma_i>0\}.
$$

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}3&0\\0&1\end{bmatrix}
$$

はすでに特異方向が座標軸なので、$\mathbf U=\mathbf V=\mathbf I$、$\mathbf\Sigma=\operatorname{diag}(3,1)$。単位円は横3倍、縦1倍の楕円になる。

非対角行列では、$\mathbf V^T$ と $\mathbf U$ がこの軸を回転して配置する。

## もう一段丁寧に：SVDを $\mathbf A^T\mathbf A$ から組み立てる

### 1. なぜ $\mathbf A^T\mathbf A$ を見るのか

一般の $\mathbf A\in\mathbb R^{m\times n}$ は矩形でもよく、固有値問題 $\mathbf A\mathbf v=\lambda\mathbf v$ はそのままでは定義できない。一方

$$
\mathbf A^T\mathbf A\in\mathbb R^{n\times n}
$$

は必ず正方・対称で、さらに

$$
\mathbf x^T\mathbf A^T\mathbf A\mathbf x
=\|\mathbf A\mathbf x\|_2^2\ge0
$$

なのでpositive semidefiniteである。spectral theoremを安全に使える。

### 2. 右特異ベクトルと特異値

$\mathbf A^T\mathbf A$ のorthonormal eigenvectorsを $\mathbf v_i$、固有値を $\lambda_i\ge0$ とする。

$$
\mathbf A^T\mathbf A\mathbf v_i
=\lambda_i\mathbf v_i.
$$

特異値を

$$
\boxed{\sigma_i=\sqrt{\lambda_i}\ge0}
$$

と定義する。平方根を取る理由は、$\mathbf A^T\mathbf A$ が長さの**二乗**を測っているからである。

### 3. 左特異ベクトルを構成する

$\sigma_i>0$ に対して

$$
\boxed{\mathbf u_i=\frac{\mathbf A\mathbf v_i}{\sigma_i}}
$$

と定める。ノルムを計算すると

$$
\begin{aligned}
\|\mathbf u_i\|_2^2
&=\frac1{\sigma_i^2}
\mathbf v_i^T\mathbf A^T\mathbf A\mathbf v_i\\
&=\frac{\lambda_i}{\sigma_i^2}
\mathbf v_i^T\mathbf v_i\\
&=1.
\end{aligned}
$$

異なる $i,j$ についても

$$
\mathbf u_i^T\mathbf u_j
=\frac{1}{\sigma_i\sigma_j}
\mathbf v_i^T\mathbf A^T\mathbf A\mathbf v_j
=0
$$

となるので、左特異ベクトルもorthonormal。

### 4. 基本関係 $Av_i=\sigma_i u_i$

定義から

$$
\boxed{\mathbf A\mathbf v_i=\sigma_i\mathbf u_i}.
$$

つまり入力のorthonormal direction $\mathbf v_i$ を $\mathbf A$ に通すと、出力側のorthonormal direction $\mathbf u_i$ へ向きが移り、長さが $\sigma_i$ 倍される。SVDの図で「rotate → stretch → rotate」と描く理由がこの一式に凝縮されている。

### 5. 行列全体を再構成する

$\mathbf V=[\mathbf v_1\cdots\mathbf v_n]$、$\mathbf U$ に左特異ベクトルを並べ、$\mathbf\Sigma$ の対角に $\sigma_i$ を置く。各basis vectorに対する関係をまとめると

$$
\mathbf A\mathbf V=\mathbf U\mathbf\Sigma.
$$

$\mathbf V$ はorthogonalなので右から $\mathbf V^T$ を掛け、

$$
\boxed{\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T}.
$$

### 6. rankが非零特異値の個数になる理由

$\sigma_i=0$ なら

$$
\mathbf A\mathbf v_i=\mathbf0,
$$

したがって $\mathbf v_i$ はnull space方向。$\sigma_i>0$ の方向だけが非零出力 $\sigma_i\mathbf u_i$ を作り、それらの $\mathbf u_i$ は独立である。よって

$$
\operatorname{rank}(\mathbf A)
=\#\{i:\sigma_i>0\}.
$$

### 7. reduced SVDのshape

rankを $r$ とすると、非零特異値だけを残して

$$
\mathbf A=\mathbf U_r\mathbf\Sigma_r\mathbf V_r^T
$$

と書ける。ここで

$$
\mathbf U_r\in\mathbb R^{m\times r},\quad
\mathbf\Sigma_r\in\mathbb R^{r\times r},\quad
\mathbf V_r\in\mathbb R^{n\times r}.
$$

この形は低ランク近似や擬似逆で特に重要になる。

## 成立条件・壊れる場合

SVDは固有分解と違い、長方形行列にも必ず存在する。特異値は非負実数。$\mathbf A$ がrank deficientなら0特異値が現れる。特異ベクトルは重複特異値の部分空間内では一意でない。

## ここから発展

SVDを得ると、擬似逆、最小ノルム解、低rank近似、condition numberがほぼ直接読める。次の3 TopicはSVDを基盤に順番に構築する。


## このTopicの理解確認

- $\mathbf A^T\mathbf A$ を見る理由を「square・symmetric・positive semidefinite」の三点から説明できるか。
- $\sigma_i=\sqrt{\lambda_i}$ と $u_i=Av_i/\sigma_i$ を導けるか。
- $\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T$ をbasis-vector relationsから再構成できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [MIT OpenCourseWare 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)


## 演習

[このTopicの10問の演習](/exercises/la-singular-value-decomposition)
