# 基底・座標・次元：教科書

Course 02｜線形代数｜Topic 10/29

## このTopicの位置づけ

空間を生成するだけならspanで十分だが、生成ベクトルが従属だと同じベクトルに複数の係数表現が生じる。そこで「空間全体を生成し、しかも冗長でない」ベクトル集合を基底とする。基底を選ぶと、各ベクトルに一意な座標を割り当てられる。

**前提知識**：spanと線形独立。

## まず直感を作る

地図上の点を緯度・経度で表すように、ベクトル空間でも基底を決めるとベクトルを係数の組で表せる。同じ幾何学的ベクトルでも、基底を変えれば座標の数値は変わる。しかしベクトルそのものが変わるわけではない。

## 図の解説

<img src="/visuals/course-02/la-basis-coordinates-dimension.png" alt="基底・座標・次元の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では斜めの基底 $\mathbf b_1,\mathbf b_2$ を使って同じ $\mathbf x$ を $2\mathbf b_1-\mathbf b_2$ と分解している。このとき座標ベクトルは $[\mathbf x]_{\mathcal B}=(2,-1)^T$ である。

図中の $\mathbf x$ の位置は基底を変えても同じだが、「基底を何本ずつ使うか」という座標値だけが変わる。

## 記号・型・次元

- $V$：対象のベクトル空間。
- $\mathcal B=(\mathbf b_1,\ldots,\mathbf b_k)$：順序付き基底。
- $[\mathbf x]_{\mathcal B}\in\mathbb R^k$：$\mathcal B$ に関する座標ベクトル。
- $\dim V$：空間の次元。


## 正式な定義

$\mathcal B=(\mathbf b_1,\ldots,\mathbf b_k)$ が $V$ の基底であるとは、

1. $\mathbf b_1,\ldots,\mathbf b_k$ が線形独立であり、
2. $V=\operatorname{span}\{\mathbf b_1,\ldots,\mathbf b_k\}$

であること。任意の $\mathbf x\in V$ は一意に

$$
\mathbf x=c_1\mathbf b_1+\cdots+c_k\mathbf b_k
$$

と書け、この係数を

$$
[\mathbf x]_{\mathcal B}=\begin{bmatrix}c_1\\\vdots\\c_k\end{bmatrix}
$$

とする。基底の本数 $k$ が $\dim V$ である。

## なぜこの式・定理になるのか

### なぜ「span」と「独立」の両方が必要なのか

span条件は**存在**を保証する。つまり全ての $\mathbf x\in V$ に対して、何らかの係数 $c_i$ が存在する。

独立条件は**一意性**を保証する。もし二つの係数表示があれば、差を取ると0の線形結合になり、独立性から係数差が全て0になる。

したがって基底とは「全てのベクトルに座標が存在し、その座標が一意に決まる」ための必要な二条件をまとめたものと理解できる。

### 座標写像は線形である

$\mathbf x,\mathbf y\in V$ に対して

$$
[\mathbf x]_{\mathcal B}=\mathbf c,
\qquad
[\mathbf y]_{\mathcal B}=\mathbf d
$$

なら、

$$
[a\mathbf x+b\mathbf y]_{\mathcal B}=a\mathbf c+b\mathbf d.
$$

これは基底での係数をそのまま線形結合できるため。つまり座標化そのものが線形写像である。

## 小さな数値例を最後まで計算する

$\mathbf b_1=(1,1)^T$、$\mathbf b_2=(1,-1)^T$、$\mathbf x=(3,1)^T$ とする。

$$
c_1\begin{bmatrix}1\\1\end{bmatrix}
+c_2\begin{bmatrix}1\\-1\end{bmatrix}
=\begin{bmatrix}3\\1\end{bmatrix}
$$

より $c_1+c_2=3$、$c_1-c_2=1$。解いて $c_1=2,c_2=1$。したがって

$$
[\mathbf x]_{\mathcal B}=(2,1)^T.
$$

## もう一段丁寧に：basisは「生成」と「一意性」を同時に満たす

### 1. なぜspanだけでは足りないのか

あるベクトル集合が空間 $V$ をspanしていれば、任意の $\mathbf x\in V$ をその線形結合で表せる。しかし生成ベクトルに冗長性があると係数は一意でない。座標として使うには、同じ点に複数の座標が付くのは困る。

そこでbasisには

1. $V$ をspanすること（存在）
2. 線形独立であること（一意性）

の両方を要求する。

### 2. basisなら座標が存在し一意になる証明

$\mathcal B=(\mathbf b_1,\ldots,\mathbf b_k)$ が $V$ のbasisとする。spanするので任意の $\mathbf x\in V$ に対し

$$
\mathbf x=c_1\mathbf b_1+\cdots+c_k\mathbf b_k
$$

となる係数が少なくとも一組存在する。

もし別の係数 $d_i$ でも同じ $\mathbf x$ を作るなら

$$
\sum_i(c_i-d_i)\mathbf b_i=\mathbf0.
$$

basisは独立なので $c_i-d_i=0$。よって係数は一意。この係数ベクトル

$$
[\mathbf x]_{\mathcal B}
=\begin{bmatrix}c_1\\\vdots\\c_k\end{bmatrix}
$$

を $\mathcal B$ に関する座標という。

### 3. basisは違っても本数が同じになる

有限次元空間では、どのbasisを選んでもベクトル本数は同じになる。この共通の本数をdimensionと定義する。直感的には「空間内で独立に動ける方向の数」である。

たとえば $\mathbb R^3$ の平面

$$
V=\{(x,y,z)^T:x+y+z=0\}
$$

は3成分を持つが、一つの独立な制約があるため自由度は2であり、basisは2本になる。ambient dimensionと部分空間のdimensionを区別する。

### 4. 座標ベクトルと元のベクトルは同じものではない

$\mathbf x$ は実際の空間内のベクトルで、$[\mathbf x]_{\mathcal B}$ はbasisに依存する係数表現である。basisを変えると座標値は変わるが、表している幾何学的ベクトル自体は変わらない。次のchange-of-basis Topicではこの区別を行列で扱う。

## 成立条件・壊れる場合

基底は集合としてだけでなく、座標を扱うときは順序が重要。$(\mathbf b_1,\mathbf b_2)$ と $(\mathbf b_2,\mathbf b_1)$ は同じベクトル集合でも座標成分の順序が変わる。

## ここから発展

有限次元ベクトル空間では全ての基底の本数が同じになる。この事実によって「次元」が基底選択に依存しない空間固有の量として定義できる。厳密証明には交換補題などを使うが、本Courseではrank-nullityと合わせて構造を使えることを重視する。


## このTopicの理解確認

- basisの「span」と「independent」がそれぞれ座標の存在と一意性を保証することを証明できるか。
- $[\mathbf x]_{\mathcal B}$ と実ベクトル $\mathbf x$ を区別できるか。
- ambient dimensionとsubspace dimensionが異なる例を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-basis-coordinates-dimension)
