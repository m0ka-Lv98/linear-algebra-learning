# 線形独立：教科書

Course 02｜線形代数｜Topic 09/29

## このTopicの位置づけ

同じ空間を生成するために、不要に重複したベクトルを含めることがある。あるベクトルが他の線形結合で作れるなら、そのベクトルは新しい方向を追加していない。この冗長性を排除する概念が線形独立である。

**前提知識**：線形結合、span、null space。

## まず直感を作る

2次元で同じ直線上にある2本のベクトルは、一方が他方のスカラー倍なので独立ではない。平行でない2本なら、それぞれが新しい方向を提供する。独立性は「見た目に違う矢印か」ではなく、「0を作る線形結合が自明なものしかないか」で判定する。

## 図の解説

<img src="/visuals/course-02/la-linear-independence.png" alt="線形独立の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の $\mathbf v_3$ は $2\mathbf v_1$ と同じ方向であり、新しい方向を追加していない。したがって $\mathbf v_3-2\mathbf v_1=\mathbf0$ という、係数が全て0ではない線形結合で0を作れる。

一方、$\mathbf v_1$ と $\mathbf v_2$ が平行でなければ、2次元では $c_1\mathbf v_1+c_2\mathbf v_2=\mathbf0$ を満たすのは $c_1=c_2=0$ のみである。

## 記号・型・次元

- $\mathbf v_1,\ldots,\mathbf v_k\in\mathbb R^n$：判定対象。
- $c_1,\ldots,c_k$：線形結合の係数。
- $\mathbf V=[\mathbf v_1\ \cdots\ \mathbf v_k]$：列に並べた行列。


## 正式な定義

ベクトル集合 $\{\mathbf v_1,\ldots,\mathbf v_k\}$ が線形独立であるとは

$$
c_1\mathbf v_1+\cdots+c_k\mathbf v_k=\mathbf0
$$

から必ず $c_1=\cdots=c_k=0$ が従うことをいう。

## なぜこの式・定理になるのか

### 行列のnull spaceとの関係

$\mathbf V=[\mathbf v_1\ \cdots\ \mathbf v_k]$、$\mathbf c=(c_1,\ldots,c_k)^T$ とすれば

$$
\mathbf V\mathbf c
=c_1\mathbf v_1+\cdots+c_k\mathbf v_k.
$$

したがって線形独立とは

$$
\mathbf V\mathbf c=\mathbf0
\quad\Longrightarrow\quad
\mathbf c=\mathbf0
$$

ということ、つまり $N(\mathbf V)=\{\mathbf0\}$ と同値である。

### なぜ独立だと係数表現が一意になるのか

同じベクトル $\mathbf y$ に対して

$$
\mathbf y=\sum_i c_i\mathbf v_i
=\sum_i d_i\mathbf v_i
$$

という二つの表現があるとする。差を取ると

$$
\sum_i(c_i-d_i)\mathbf v_i=\mathbf0.
$$

ベクトルが独立なら $c_i-d_i=0$、したがって $c_i=d_i$。よって係数は一意である。これが次Topicの「基底で座標が一意になる」理由になる。

## 小さな数値例を最後まで計算する

$\mathbf v_1=(1,2,0)^T$、$\mathbf v_2=(0,1,1)^T$、$\mathbf v_3=(1,3,1)^T$ とすると

$$
\mathbf v_3=\mathbf v_1+\mathbf v_2.
$$

したがって

$$
\mathbf v_1+\mathbf v_2-\mathbf v_3=\mathbf0
$$

という非自明な関係があり、3本は線形従属である。

## もう一段丁寧に：線形独立は「表現の一意性」を保証する

### 1. 定義をなぜ斉次方程式で書くのか

$\mathbf v_1,\ldots,\mathbf v_k$ が線形独立とは

$$
c_1\mathbf v_1+\cdots+c_k\mathbf v_k=\mathbf0
$$

を満たす係数が

$$
c_1=\cdots=c_k=0
$$

しかないことをいう。ゼロを作る線形結合を調べるのは、一見特殊に見えるが、実は任意のベクトルの表現一意性と同値である。

### 2. 表現が二通りあれば差を取る

ある $\mathbf y$ が

$$
\mathbf y=\sum_i a_i\mathbf v_i
=\sum_i b_i\mathbf v_i
$$

と二通りに書けたとする。差を取れば

$$
\mathbf0
=\sum_i(a_i-b_i)\mathbf v_i.
$$

ベクトルが独立なら $a_i-b_i=0$、つまり $a_i=b_i$ である。したがって表現は一意。

逆に非自明な係数 $c_i$ で $\sum_i c_i\mathbf v_i=0$ が作れるなら、一つのベクトル表現へこの「ゼロ」を足すことで別の係数表現を作れてしまう。

### 3. 行列の列独立性とnull space

$\mathbf A=[\mathbf v_1\cdots\mathbf v_k]$ と置けば

$$
\mathbf A\mathbf c
=c_1\mathbf v_1+\cdots+c_k\mathbf v_k.
$$

よって列が独立である条件は

$$
N(\mathbf A)=\{\mathbf0\}
$$

と同じ。消去法ではこれは「すべての列がpivot列」として検出できる。

### 4. $\mathbb R^n$ に $n$ 本より多い独立ベクトルは存在できない

$\mathbb R^n$ で $k>n$ 本のベクトルを列に並べると $n\times k$ 行列になる。pivotは最大でも行数 $n$ 個なので、少なくとも一つの自由変数が生じる。したがって $\mathbf A\mathbf c=0$ は非自明解を持ち、列は従属になる。dimensionの概念を学ぶ前でも、eliminationからこの上限を理解できる。

## 依存関係が見つかったら何が分かるのか

### 1. 一つのベクトルを他のベクトルで表せる

非自明な関係

$$
c_1\mathbf v_1+\cdots+c_k\mathbf v_k=0
$$

があり、たとえば $c_j\ne0$ とする。すると

$$
\mathbf v_j
=-\sum_{i\ne j}\frac{c_i}{c_j}\mathbf v_i.
$$

つまり少なくとも一つのベクトルは他のベクトルのspanに入っている。

逆も成立する。もし $\mathbf v_j$ が他のベクトルの線形結合なら、全部を一辺へ移すことで非自明なzero combinationが作れる。したがって

> 線形従属 ⇔ 少なくとも一つのベクトルが他のベクトルのspanに入る

と読める。

### 2. dependent vectorを取り除いてもspanが変わらない

上の $\mathbf v_j$ は他のベクトルから作れるので、生成集合から取り除いても作れるベクトル全体は変わらない。

この操作を繰り返すと、spanを変えずに冗長なベクトルを削って独立な集合を得られる。これがbasisを作る基本発想である。

## 3本のベクトルを実際に判定する

$$
\mathbf v_1=
\begin{bmatrix}1\\0\\1\end{bmatrix},
\quad
\mathbf v_2=
\begin{bmatrix}0\\1\\1\end{bmatrix},
\quad
\mathbf v_3=
\begin{bmatrix}1\\1\\2\end{bmatrix}.
$$

明らかに

$$
\mathbf v_3=\mathbf v_1+\mathbf v_2.
$$

したがって

$$
\mathbf v_1+\mathbf v_2-\mathbf v_3=0
$$

という非自明関係があり、3本はdependent。

行列

$$
\mathbf A=[\mathbf v_1\ \mathbf v_2\ \mathbf v_3]
$$

を作ると、係数

$$
\mathbf c=(1,1,-1)^T
$$

が

$$
\mathbf A\mathbf c=0
$$

を満たす。したがって「ベクトル集合のindependence」と「homogeneous systemのnontrivial solution」は同じ問題である。

## pairwiseに違うだけではindependentとは限らない

3本のベクトルが互いにscalar multipleでないことだけでは、3本全体のindependenceを保証しない。上の例では、どの2本も同一直線上ではないが、3本目が最初の2本の和なので3本全体ではdependent。

高次元でindependenceを判断するときは「見た目が違う」「どの二本も平行でない」ではなく、全係数を含むhomogeneous equationを調べる必要がある。

## 成立条件・壊れる場合

「本数が次元以下なら独立」は誤り。$\mathbb R^3$ に2本しかなくても平行なら従属。一方、「本数が次元を超えたら従属」は正しい。$\mathbb R^n$ では$n$を超える独立ベクトルは存在しない。

## ここから発展

独立で、かつ空間全体をspanする最小限の集合が基底である。独立性は「重複なし」、spanは「不足なし」と考えると、次Topicの基底が理解しやすい。


## このTopicの理解確認

- zero combinationを調べることが座標表現の一意性と同値な理由を証明できるか。
- dependent setから冗長ベクトルを一つ除いてもspanが変わらない理由を示せるか。
- pairwiseに平行でないだけではindependentを保証しない反例を示せるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-linear-independence)
