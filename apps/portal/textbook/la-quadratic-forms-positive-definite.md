# 二次形式と正定値行列：教科書

Course 02｜線形代数｜Topic 24/29

## このTopicの位置づけ

$\mathbf A$ を単にベクトルへ掛けるだけでなく、$\mathbf x^T\mathbf A\mathbf x$ というスカラーを考えると、方向ごとの「エネルギー」「曲率」「距離の二乗」のような量を表せる。全ての非零方向で正になる対称行列がpositive definite（正定値）。

**前提知識**：対称行列、スペクトル定理、内積。

## まず直感を作る

正定値二次形式の等高線は閉じた楕円になる。どの方向へ原点から動いても値は正に増えるため、原点が明確な谷底になる。最適化ではHessianが正定値なら局所的に下向きではなく「お椀型」の曲率を持つ。

## 図の解説

<img src="/visuals/course-02/la-quadratic-forms-positive-definite.png" alt="二次形式と正定値行列の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の楕円は $\mathbf x^T\mathbf A\mathbf x=c$ という一定値の曲線。原点からどの方向へ伸びても、楕円を横切るたびに二次形式の値が増える。固有値が大きい方向では同じ$c$に達する距離が短く、曲率が強い。

もし固有値が負なら等高線は楕円ではなく双曲線型になり、方向によって値が負になる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$：通常は対称行列として扱う。
- $q(\mathbf x)=\mathbf x^T\mathbf A\mathbf x$：二次形式。
- $\lambda_i$：$\mathbf A$ の固有値。
- $\mathbf Q$：正規直交固有ベクトル行列。


## 正式な定義

対称行列 $\mathbf A$ が正定値であるとは

$$
\mathbf x^T\mathbf A\mathbf x>0
\qquad(\mathbf x\ne\mathbf0)
$$

が成り立つこと。半正定値では $\ge0$。

## なぜこの式・定理になるのか

### なぜ正定値性と「全固有値>0」が同値なのか

スペクトル定理から

$$
\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^T.
$$

$\mathbf z=\mathbf Q^T\mathbf x$ と置くと、$\mathbf Q$ は直交行列なので $\mathbf x\ne0\iff\mathbf z\ne0$。二次形式は

$$
\mathbf x^T\mathbf A\mathbf x
=\mathbf x^T\mathbf Q\mathbf\Lambda\mathbf Q^T\mathbf x
=\mathbf z^T\mathbf\Lambda\mathbf z
=\sum_{i=1}^n\lambda_i z_i^2.
$$

全て $\lambda_i>0$ なら、非零 $\mathbf z$ では少なくとも一つ $z_i^2>0$ なので和は正。

逆にある $\lambda_j\le0$ なら、$\mathbf x=\mathbf q_j$（対応固有ベクトル）を取ると

$$
\mathbf x^T\mathbf A\mathbf x=\lambda_j
$$

となり、strictly positiveを満たせない。よって

$$
\boxed{\mathbf A\succ0\iff\lambda_i>0\text{ for all }i}.
$$

### $\mathbf A^T\mathbf A$ が正定値になる条件の再確認

任意の $\mathbf z$ について

$$
\mathbf z^T\mathbf A^T\mathbf A\mathbf z=\|\mathbf A\mathbf z\|_2^2\ge0.
$$

したがって $\mathbf A^T\mathbf A$ は常に半正定値。さらに $\mathbf A$ がfull-column-rankなら非零 $\mathbf z$ で $\mathbf A\mathbf z\ne0$ なので正定値。これはleast squaresで $\mathbf A^T\mathbf A$ が可逆になる理由だった。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}
$$

の固有値は3と1で、両方正。したがって正定値。直接見ると

$$
\begin{bmatrix}x&y\end{bmatrix}
\mathbf A
\begin{bmatrix}x\\y\end{bmatrix}
=2x^2+2xy+2y^2
=(x+y)^2+x^2+y^2>0
$$

（$(x,y)\ne(0,0)$）とも確認できる。

## もう一段丁寧に：positive definiteと固有値の符号が同値になる理由

### 1. quadratic form

対称行列 $\mathbf A\in\mathbb R^{n\times n}$ に対して

$$
q(\mathbf x)=\mathbf x^T\mathbf A\mathbf x
$$

をquadratic form（二次形式）という。$\mathbf A$ がpositive definiteとは、すべての $\mathbf x\ne0$ で

$$
q(\mathbf x)>0
$$

となること。

### 2. spectral theoremを使って固有座標へ移す

対称行列なので

$$
\mathbf A=\mathbf Q\mathbf\Lambda\mathbf Q^T
$$

と書ける。$\mathbf z=\mathbf Q^T\mathbf x$ と置くと、$\mathbf Q$ はorthogonalなので $\mathbf x\ne0$ と $\mathbf z\ne0$ は同値。

$$
\begin{aligned}
q(\mathbf x)
&=\mathbf x^T\mathbf Q\mathbf\Lambda\mathbf Q^T\mathbf x\\
&=\mathbf z^T\mathbf\Lambda\mathbf z\\
&=\lambda_1z_1^2+\cdots+\lambda_nz_n^2.
\end{aligned}
$$

### 3. 全固有値が正ならpositive definite

$\lambda_i>0$ がすべての $i$ で成立し、$\mathbf z\ne0$ なら少なくとも一つの $z_i^2>0$。したがって

$$
\sum_i\lambda_i z_i^2>0.
$$

よって $\mathbf A$ はpositive definite。

### 4. positive definiteなら全固有値が正

逆に固有ベクトル $\mathbf q_i\ne0$ を $q$ に入れると

$$
\mathbf q_i^T\mathbf A\mathbf q_i
=\lambda_i\|\mathbf q_i\|_2^2.
$$

positive definiteなら左辺は正で、ノルム二乗も正なので $\lambda_i>0$。よって

$$
\boxed{\mathbf A\succ0\quad\Longleftrightarrow\quad
\lambda_i>0\ \text{for all }i}
$$

が得られる。

### 5. 最小二乗の $\mathbf A^T\mathbf A$ がpositive definiteになる条件を再確認する

任意の $\mathbf z$ に対し

$$
\mathbf z^T\mathbf A^T\mathbf A\mathbf z
=\|\mathbf A\mathbf z\|_2^2\ge0.
$$

したがって $\mathbf A^T\mathbf A$ は常にpositive semidefinite。さらに $\mathbf A$ がfull-column-rankなら $\mathbf z\ne0$ から $\mathbf A\mathbf z\ne0$ が従い、strictly positiveになるのでpositive definite。この事実がleast squaresの一意性とCholesky分解へつながる。

### 6. optimizationへの接続

$$
f(\mathbf x)=\frac12\mathbf x^T\mathbf A\mathbf x-\mathbf b^T\mathbf x
$$

では

$$
\nabla f=\mathbf A\mathbf x-\mathbf b,
\qquad
\nabla^2 f=\mathbf A
$$

（$\mathbf A$ が対称の場合）。$\mathbf A\succ0$ なら全方向に上向きの曲率を持ち、一意な最小点を持つ。これはCourse 06のconvex optimizationへ順序立てて接続する発展事項である。

## 成立条件・壊れる場合

二次形式では非対称行列でも $\mathbf x^T\mathbf A\mathbf x$ を作れるが、反対称部分は寄与しない。実際 $\mathbf A$ を対称部分 $(\mathbf A+\mathbf A^T)/2$ と反対称部分に分けると、反対称部分の二次形式は0。したがって正定値性は通常対称行列として議論する。

## ここから発展

正定値行列にはCholesky分解が存在し、二次形式を $\|\mathbf L^T\mathbf x\|^2$ と書ける。次Topicで係数を具体的に導く。


## このTopicの理解確認

- $\mathbf A\succ0$ と全eigenvalues positiveの同値性をspectral theoremから証明できるか。
- $\mathbf A^T\mathbf A$ がpositive semidefiniteになる理由をnorm squareとして説明できるか。
- full-column-rankで $\mathbf A^T\mathbf A$ がpositive definiteへ強まる理由を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-quadratic-forms-positive-definite)
