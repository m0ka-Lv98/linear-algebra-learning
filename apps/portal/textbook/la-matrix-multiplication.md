# 行列積と写像の合成：教科書

Course 02｜線形代数｜Topic 03/29

## このTopicの位置づけ

行列が線形写像を表すなら、二つの変換を続けて適用したくなる。$\mathbf x$ にまず $\mathbf A$ を作用させ、その結果へ $\mathbf B$ を作用させる。この「写像の合成」を一つの行列として表すために行列積が定義される。

**前提知識**：行列を線形写像として読むこと、行列とベクトルの積。

## まず直感を作る

行列積の公式を最初から添字で暗記すると、なぜ「行×列」なのか分かりにくい。先に $\mathbf B(\mathbf A\mathbf x)$ という二段階の変換を考えると、その合成も線形なので、何らかの行列 $\mathbf C$ で $\mathbf C\mathbf x$ と書ける。その $\mathbf C$ が $\mathbf B\mathbf A$ である。

## 図の解説

<img src="/visuals/course-02/la-matrix-multiplication.png" alt="行列積と写像の合成の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図は同じ格子を左から右へ追っている。左は入力、中央は $\mathbf A$ を適用した後、右はさらに $\mathbf B$ を適用した後である。最終的な格子は $\mathbf B\mathbf A$ を一度だけ適用しても同じになる。

順序が重要で、$\mathbf B\mathbf A$ は「まず $\mathbf A$、次に $\mathbf B$」を意味する。右から左へ作用することに注意する。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{p\times n}$：最初の変換。
- $\mathbf B\in\mathbb R^{m\times p}$：二番目の変換。
- $\mathbf C=\mathbf B\mathbf A\in\mathbb R^{m\times n}$：合成変換。
- $a_{kj},b_{ik},c_{ij}$：各行列の成分。


## 正式な定義

$\mathbf A\in\mathbb R^{p\times n}$ と $\mathbf B\in\mathbb R^{m\times p}$ に対して、積 $\mathbf C=\mathbf B\mathbf A$ を

$$
c_{ij}=\sum_{k=1}^{p}b_{ik}a_{kj}
$$

で定義する。

## なぜこの式・定理になるのか

### 合成から成分公式を導く

$\mathbf x\in\mathbb R^n$ とする。まず $\mathbf y=\mathbf A\mathbf x$ と置くと

$$
y_k=\sum_{j=1}^n a_{kj}x_j.
$$

次に $\mathbf z=\mathbf B\mathbf y$ とすると

$$
z_i=\sum_{k=1}^p b_{ik}y_k.
$$

$y_k$ を代入すると

$$
z_i
=\sum_{k=1}^{p}b_{ik}\left(\sum_{j=1}^{n}a_{kj}x_j\right)
=\sum_{j=1}^{n}\left(\sum_{k=1}^{p}b_{ik}a_{kj}\right)x_j.
$$

したがって、$\mathbf z=\mathbf C\mathbf x$ の成分 $c_{ij}$ は

$$
c_{ij}=\sum_{k=1}^{p}b_{ik}a_{kj}
$$

でなければならない。これが「行列積が行と列の内積になる」理由である。

### 列ごとに読む

$\mathbf A$ の第$j$列を $\mathbf a_j$ とすると、$\mathbf B\mathbf A$ の第$j$列は $\mathbf B\mathbf a_j$ である。つまり、合成行列の列は「最初の変換で得られる基底の像を、さらに $\mathbf B$ で変換したもの」になっている。

## 小さな数値例を最後まで計算する

$\mathbf A=\begin{bmatrix}1&2\\0&1\end{bmatrix}$、$\mathbf B=\begin{bmatrix}2&0\\1&3\end{bmatrix}$ とする。

$$
\mathbf B\mathbf A
=\begin{bmatrix}2&4\\1&5\end{bmatrix}.
$$

一方、$\mathbf x=(1,-1)^T$ に対し、$\mathbf A\mathbf x=(-1,-1)^T$、さらに $\mathbf B(\mathbf A\mathbf x)=(-2,-4)^T$。合成行列を直接使っても

$$
(\mathbf B\mathbf A)\mathbf x
=\begin{bmatrix}2&4\\1&5\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix}
=\begin{bmatrix}-2\\-4\end{bmatrix}
$$

となり一致する。

## もう一段丁寧に：行列積の定義がこの形である理由

### 1. 出発点は「写像の合成」

$$
\mathbf B\in\mathbb R^{n\times p},\qquad
\mathbf A\in\mathbb R^{m\times n}
$$

とする。$\mathbf B$ は $\mathbb R^p$ から $\mathbb R^n$ へ、$\mathbf A$ は $\mathbb R^n$ から $\mathbb R^m$ へ写す。入力 $\mathbf x\in\mathbb R^p$ をまず $\mathbf B$、次に $\mathbf A$ へ通すと

$$
\mathbf x\xrightarrow{\mathbf B}\mathbf B\mathbf x
\xrightarrow{\mathbf A}\mathbf A(\mathbf B\mathbf x).
$$

この合成も線形写像なので、一つの行列で表せるはずである。その行列を $\mathbf A\mathbf B$ と定義する。したがって

$$
(\mathbf A\mathbf B)\mathbf x=\mathbf A(\mathbf B\mathbf x)
$$

が行列積の根本的な意味である。

### 2. なぜ内側の次元が一致しなければならないのか

$\mathbf B\mathbf x$ は $n$ 次元ベクトルである。次の $\mathbf A$ は $n$ 次元入力を要求するので、$\mathbf A$ の列数と $\mathbf B$ の行数が一致しなければ合成できない。これが

$$
(m\times n)(n\times p)=(m\times p)
$$

というshape規則の意味である。単なる暗記規則ではなく、前段の出力型と後段の入力型が一致する必要がある。

### 3. 成分公式を合成から導く

$\mathbf B$ の第 $j$ 列を $\mathbf b_j$ とする。積 $\mathbf A\mathbf B$ の第 $j$ 列は、標準基底 $\mathbf e_j$ を入力した結果だから

$$
(\mathbf A\mathbf B)\mathbf e_j
=\mathbf A(\mathbf B\mathbf e_j)
=\mathbf A\mathbf b_j.
$$

さらに $\mathbf A$ の第 $i$ 行を $\mathbf a_i^T$ とすれば、その第 $i$ 成分は

$$
(\mathbf A\mathbf B)_{ij}
=\mathbf a_i^T\mathbf b_j
=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

「行×列」という計算法は、写像の合成を成分で書き下した結果である。

### 4. なぜ一般に $\mathbf A\mathbf B\ne\mathbf B\mathbf A$ なのか

写像を行う順序を変えれば通常は結果が変わる。たとえば「横方向に2倍してから90度回転」と「90度回転してから横方向に2倍」は同じ変形ではない。そのため行列積も一般には可換でない。さらに矩形行列では、$\mathbf A\mathbf B$ が定義できても $\mathbf B\mathbf A$ 自体がshape不一致で未定義なことさえある。

### 5. なぜ結合則は成立するのか

三つの線形写像の合成では、括弧をどこに置いても「右から順に三つ通す」という最終操作は同じである。任意の $\mathbf x$ に対して

$$
((\mathbf A\mathbf B)\mathbf C)\mathbf x
=\mathbf A(\mathbf B(\mathbf C\mathbf x))
=(\mathbf A(\mathbf B\mathbf C))\mathbf x.
$$

すべての $\mathbf x$ で作用が同じなので

$$
(\mathbf A\mathbf B)\mathbf C=\mathbf A(\mathbf B\mathbf C).
$$

この結合則のおかげで、多段の線形変換を一つの行列へまとめられる。

## 成立条件・壊れる場合

$\mathbf B\mathbf A$ が定義できる条件は、$\mathbf A$ の出力次元$p$と $\mathbf B$ の入力次元$p$が一致すること。積は一般に可換ではなく、$\mathbf A\mathbf B$ が定義できないことさえある。両方定義できても通常は $\mathbf A\mathbf B\ne\mathbf B\mathbf A$ である。

## ここから発展

行列積を合成として理解すると、ニューラルネットワークの線形層、座標変換、対角化 $\mathbf A=\mathbf V\mathbf\Lambda\mathbf V^{-1}$ などがすべて「変換を順番に適用する」構造として読める。発展内容へ進む前に、積の順序を言葉で説明できるようにする。


## このTopicの理解確認

- $(\mathbf A\mathbf B)\mathbf x=\mathbf A(\mathbf B\mathbf x)$ から行列積のshape規則を説明できるか。
- $(AB)_{ij}=\sum_k a_{ik}b_{kj}$ を「行×列」の暗記ではなく合成から導けるか。
- $AB\ne BA$ の具体的な幾何例を挙げられるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [OpenStax Intermediate Algebra 2e — Solve Systems of Equations Using Matrices](https://openstax.org/books/intermediate-algebra-2e/pages/4-5-solve-systems-of-equations-using-matrices)


## 演習

[このTopicの10問の演習](/exercises/la-matrix-multiplication)
