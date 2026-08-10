# spanと部分空間：教科書

Course 02｜線形代数｜Topic 07/29

## このTopicの位置づけ

線形結合を1回作るだけでなく、「係数を自由に変えたときに作れる全てのベクトル」を集合として考えるとspanが得られる。さらに、線形結合に対して閉じている集合を部分空間と呼ぶ。ここから線形代数は個々のベクトルではなく「空間の構造」を扱い始める。

**前提知識**：ベクトルと線形結合。

## まず直感を作る

2次元で非零ベクトル1本だけなら、そのスカラー倍全体は原点を通る直線になる。独立な2本なら平面全体を作れる。3次元では1本なら直線、独立な2本なら原点を通る平面、独立な3本なら空間全体になる。

## 図の解説

<img src="/visuals/course-02/la-span-subspaces.png" alt="spanと部分空間の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の直線上には $\mathbf v$、$-1.3\mathbf v$ など、$\mathbf v$ のあらゆるスカラー倍が並ぶ。係数をどれだけ変えてもこの直線から外れない。逆に直線上の任意の点はあるスカラー $c$ を使って $c\mathbf v$ と書ける。

したがってこの直線そのものが $\operatorname{span}\{\mathbf v\}$ である。原点を必ず含む点も重要である。

## 記号・型・次元

- $\mathbf v_1,\ldots,\mathbf v_k\in\mathbb R^n$：生成ベクトル。
- $\operatorname{span}\{\mathbf v_1,\ldots,\mathbf v_k\}$：それらの線形結合全体。
- $S\subseteq\mathbb R^n$：部分空間の候補集合。


## 正式な定義

$$
\operatorname{span}\{\mathbf v_1,\ldots,\mathbf v_k\}
=
\left\{\sum_{i=1}^{k}c_i\mathbf v_i:c_i\in\mathbb R\right\}.
$$

集合 $S\subseteq\mathbb R^n$ が部分空間であるとは、$\mathbf0\in S$ であり、任意の $\mathbf x,\mathbf y\in S$ とスカラー $c,d$ について $c\mathbf x+d\mathbf y\in S$ が成り立つことをいう。

## なぜこの式・定理になるのか

### なぜspanは必ず部分空間なのか

$S=\operatorname{span}\{\mathbf v_1,\ldots,\mathbf v_k\}$ とする。

まず全係数を0にすれば $\mathbf0\in S$。

次に $\mathbf x,\mathbf y\in S$ なら、ある係数 $a_i,b_i$ があって

$$
\mathbf x=\sum_i a_i\mathbf v_i,
\qquad
\mathbf y=\sum_i b_i\mathbf v_i.
$$

任意のスカラー $c,d$ について

$$
c\mathbf x+d\mathbf y
=
\sum_i(ca_i+db_i)\mathbf v_i.
$$

右辺も同じ生成ベクトルの線形結合なので $S$ に属する。よってspanは部分空間である。

### なぜ原点を通らない直線は部分空間でないか

例えば $y=1$ という直線は原点 $(0,0)$ を含まないため、最初の条件だけで部分空間ではない。また $(0,1)$ を2倍すると $(0,2)$ となり直線 $y=1$ から外れる。

## 小さな数値例を最後まで計算する

$\mathbf v_1=(1,0,1)^T$、$\mathbf v_2=(0,1,1)^T$ とする。spanに属する一般のベクトルは

$$
c_1\mathbf v_1+c_2\mathbf v_2
=\begin{bmatrix}c_1\\c_2\\c_1+c_2\end{bmatrix}.
$$

したがってこのspanは $z=x+y$ を満たす原点通過平面である。

## もう一段丁寧に：spanと部分空間を同じものとして扱わない

### 1. spanは「与えたベクトルから作れるもの全部」

$\mathbf v_1,\ldots,\mathbf v_k\in\mathbb R^n$ に対して

$$
\operatorname{span}(\mathbf v_1,\ldots,\mathbf v_k)
=
\left\{
\sum_{i=1}^k c_i\mathbf v_i:c_i\in\mathbb R
\right\}
$$

と定義する。これは生成方法の定義である。

### 2. なぜspanは必ず部分空間になるのか

部分空間であるためには、少なくともゼロベクトルを含み、加法とスカラー倍で閉じていなければならない。

ゼロはすべての係数を0にすれば作れる。

$$
\mathbf0=0\mathbf v_1+\cdots+0\mathbf v_k.
$$

二つのspan要素

$$
\mathbf x=\sum_i a_i\mathbf v_i,
\qquad
\mathbf y=\sum_i b_i\mathbf v_i
$$

を足すと

$$
\mathbf x+\mathbf y
=\sum_i(a_i+b_i)\mathbf v_i,
$$

なので再びspan内にある。スカラー $c$ を掛けても

$$
c\mathbf x=\sum_i(ca_i)\mathbf v_i
$$

でspan内にある。よってspanは部分空間である。

### 3. spanは「それらを含む最小の部分空間」でもある

$W$ が $\mathbf v_1,\ldots,\mathbf v_k$ をすべて含む部分空間だとする。部分空間は加法・スカラー倍に閉じているので、これらの任意の線形結合も $W$ に含まれる。したがって

$$
\operatorname{span}(\mathbf v_1,\ldots,\mathbf v_k)\subseteq W.
$$

つまりspanより小さい部分空間で全生成ベクトルを含むものはない。この最小性が「生成する」という言葉の意味である。

### 4. 原点を通らない直線はなぜ部分空間でないか

たとえば

$$
L=\{(x,1)^T:x\in\mathbb R\}
$$

は幾何的には直線だが $\mathbf0=(0,0)^T$ を含まないので部分空間ではない。線形代数で「直線・平面」と言ったとき、部分空間として扱えるのは原点を通るものに限る。原点を通らないものは後にaffine setとして区別される。

## 具体例で「subset」と「subspace」を区別する

### 例1：$x+y=0$ を満たす集合

$$
W=\left\{
\begin{bmatrix}x\\y\end{bmatrix}
\in\mathbb R^2:x+y=0
\right\}
$$

を考える。条件から $y=-x$ なので

$$
\begin{bmatrix}x\\y\end{bmatrix}
=x\begin{bmatrix}1\\-1\end{bmatrix}.
$$

したがって

$$
W=\operatorname{span}\left(
\begin{bmatrix}1\\-1\end{bmatrix}
\right),
$$

よって部分空間である。方程式で与えられた集合を、spanの形へ直すと構造が見える。

### 例2：$x+y=1$ を満たす集合

$$
S=\left\{
\begin{bmatrix}x\\y\end{bmatrix}:x+y=1
\right\}
$$

は原点を含まない。実際 $(0,0)^T$ では左辺が0。したがってsubspaceではない。

二つは平行な直線だが、線形代数では「原点を通るか」が決定的な違いになる。

## span membershipを連立方程式として判定する

$$
\mathbf v_1,\ldots,\mathbf v_k
$$

が与えられ、ある $\mathbf b$ がそのspanに入るか知りたいとする。

$$
\mathbf A=[\mathbf v_1\cdots\mathbf v_k]
$$

と置けば

$$
\mathbf b\in\operatorname{span}(\mathbf v_1,\ldots,\mathbf v_k)
$$

であることは、

$$
\mathbf A\mathbf c=\mathbf b
$$

を満たす係数 $\mathbf c$ が存在することと同値である。

たとえば

$$
\mathbf v_1=\begin{bmatrix}1\\1\\0\end{bmatrix},
\quad
\mathbf v_2=\begin{bmatrix}0\\1\\1\end{bmatrix},
\quad
\mathbf b=\begin{bmatrix}2\\3\\1\end{bmatrix}
$$

なら

$$
c_1\mathbf v_1+c_2\mathbf v_2
=\begin{bmatrix}c_1\\c_1+c_2\\c_2\end{bmatrix}.
$$

$c_1=2,c_2=1$ とすると中央成分も3になるので $\mathbf b$ はspanに入る。

この判定法は、後のcolumn-space membershipと全く同じ問題になる。

## 二つの部分空間のintersectionはなぜ部分空間か

$U,W\subseteq\mathbb R^n$ が部分空間とする。$U\cap W$ から $\mathbf x,\mathbf y$ を取ると、両方とも $U$ と $W$ に属する。したがって任意のscalar $a,b$ に対し

$$
a\mathbf x+b\mathbf y\in U
$$

かつ

$$
a\mathbf x+b\mathbf y\in W.
$$

よって

$$
a\mathbf x+b\mathbf y\in U\cap W.
$$

したがってintersectionは部分空間。

一方、union $U\cup W$ は一般には部分空間でない。たとえばx軸とy軸のunionでは $(1,0)^T$ と $(0,1)^T$ は含まれるが、その和 $(1,1)^T$ はどちらの軸にもない。この反例により「部分空間の集合演算は何でも部分空間になる」という誤解を防げる。

## 成立条件・壊れる場合

「部分空間」を判定するとき、図が直線・平面に見えるだけでは不十分。原点を含むか、加算とスカラー倍で閉じているかを確認する。特に $\mathbf a+S$ のように部分空間を平行移動した集合は、$\mathbf a\ne0$ なら一般に部分空間ではない。

## ここから発展

線形写像の像と核は必ず部分空間になる。次Topicで列空間とnull spaceとして具体化し、その後rankと次元へ進む。


## このTopicの理解確認

- spanが必ずsubspaceになることをclosureから証明できるか。
- spanが生成ベクトルを含む最小のsubspaceであることを説明できるか。
- membership問題を $\mathbf A\mathbf c=\mathbf b$ へ変換できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-span-subspaces)
