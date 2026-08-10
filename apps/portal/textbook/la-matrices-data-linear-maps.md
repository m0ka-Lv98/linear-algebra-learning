# 行列・データ・線形写像：教科書

Course 02｜線形代数｜Topic 02/29

## このTopicの位置づけ

前Topicでは、複数のベクトルを列に並べた行列 $\mathbf A$ と係数ベクトル $\mathbf x$ の積 $\mathbf A\mathbf x$ が、列ベクトルの線形結合になることを見た。ここでは一歩進めて、行列を「数字の表」ではなく、入力ベクトルを出力ベクトルへ変換する**線形写像**として理解する。

**前提知識**：ベクトルと線形結合。

## まず直感を作る

行列 $\mathbf A$ の各列には、標準基底ベクトルをどこへ移すかが記録されている。2次元なら、$\mathbf e_1=(1,0)^T$ と $\mathbf e_2=(0,1)^T$ の行き先が分かれば、任意の $\mathbf x=x_1\mathbf e_1+x_2\mathbf e_2$ の行き先も線形性から決まる。つまり行列は「全ての入力を個別に記録する表」ではなく、基底の行き先だけで変換全体を圧縮して表している。

## 図の解説

<img src="/visuals/course-02/la-matrices-data-linear-maps.png" alt="行列・データ・線形写像の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の小さい正方形は入力空間の単位正方形で、その2辺は標準基底 $\mathbf e_1,\mathbf e_2$ に対応する。行列 $\mathbf A$ を作用させると、$\mathbf e_1$ は第1列 $\mathbf a_1$ へ、$\mathbf e_2$ は第2列 $\mathbf a_2$ へ移る。その結果、単位正方形全体は $\mathbf a_1,\mathbf a_2$ が張る平行四辺形へ変形する。

この図は「行列の列が何を意味するか」を直接示している。列は単なるデータの縦並びではなく、標準基底の像である。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$：$n$次元入力を$m$次元出力へ写す行列。
- $\mathbf x\in\mathbb R^n$：入力ベクトル。
- $\mathbf y\in\mathbb R^m$：出力ベクトル。
- $\mathbf a_j\in\mathbb R^m$：$\mathbf A$ の第$j$列。
- $\mathbf e_j\in\mathbb R^n$：第$j$標準基底ベクトル。


## 正式な定義

写像 $T:\mathbb R^n\to\mathbb R^m$ が線形であるとは、任意のベクトル $\mathbf x,\mathbf y$ と任意のスカラー $c,d$ について

$$
T(c\mathbf x+d\mathbf y)=cT(\mathbf x)+dT(\mathbf y)
$$

が成り立つことをいう。行列 $\mathbf A$ に対する $T(\mathbf x)=\mathbf A\mathbf x$ は線形写像である。

## なぜこの式・定理になるのか

### なぜ基底の行き先だけで十分なのか

任意の $\mathbf x=(x_1,\ldots,x_n)^T$ は標準基底を使って

$$
\mathbf x=x_1\mathbf e_1+\cdots+x_n\mathbf e_n
$$

と書ける。$T$ が線形なら

$$
T(\mathbf x)
=x_1T(\mathbf e_1)+\cdots+x_nT(\mathbf e_n).
$$

ここで $T(\mathbf e_j)$ を第$j$列に並べた行列を

$$
\mathbf A=[T(\mathbf e_1)\ \cdots\ T(\mathbf e_n)]
$$

と定めると、右辺はちょうど $\mathbf A\mathbf x$ になる。したがって

$$
T(\mathbf x)=\mathbf A\mathbf x.
$$

これが「有限次元の線形写像を行列で表せる」理由である。

### データ行列として見る場合

データ解析では、行に標本、列に特徴量を置く慣習が多い。このとき「行列を線形写像として使う」ときの入力・出力の向きと、「データ表として保存する」ときの行・列の意味は区別する必要がある。shapeが同じでも意味は同じとは限らない。

## 小さな数値例を最後まで計算する

$\mathbf A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$、$\mathbf x=(4,-1)^T$ とする。列を $\mathbf a_1=(2,0)^T$、$\mathbf a_2=(1,3)^T$ と読むと、

$$
\mathbf A\mathbf x=4\mathbf a_1-\mathbf a_2
=\begin{bmatrix}8\\0\end{bmatrix}-\begin{bmatrix}1\\3\end{bmatrix}
=\begin{bmatrix}7\\-3\end{bmatrix}.
$$

同じ計算を成分の公式だけで行うより、「第1列を4倍して第2列を1本引く」と読む方が、後の列空間の理解につながる。

## もう一段丁寧に：なぜ線形写像は行列で表せるのか

### 1. 基底ベクトルに対する作用だけ分かれば十分

標準基底を

$$
\mathbf e_1=(1,0,\ldots,0)^T,\ldots,\mathbf e_n=(0,\ldots,0,1)^T
$$

とする。任意の $\mathbf x=(x_1,\ldots,x_n)^T\in\mathbb R^n$ は

$$
\mathbf x=x_1\mathbf e_1+\cdots+x_n\mathbf e_n
$$

と書ける。写像 $T:\mathbb R^n\to\mathbb R^m$ が線形なら、加法とスカラー倍を保つので

$$
T(\mathbf x)
=T(x_1\mathbf e_1+\cdots+x_n\mathbf e_n)
=x_1T(\mathbf e_1)+\cdots+x_nT(\mathbf e_n).
$$

したがって $T$ を全入力について覚える必要はなく、$n$ 本の標準基底がどこへ移るかだけ分かればよい。

### 2. その像を列として並べると行列が生まれる

$$
\mathbf A=
[\,T(\mathbf e_1)\ T(\mathbf e_2)\ \cdots\ T(\mathbf e_n)\,]
\in\mathbb R^{m\times n}
$$

と定義する。すると

$$
\mathbf A\mathbf x
=x_1T(\mathbf e_1)+\cdots+x_nT(\mathbf e_n)
=T(\mathbf x).
$$

これが「線形写像を行列で表現できる」理由である。行列の第 $j$ 列は、単にデータの第 $j$ 列というだけでなく、**入力側の第 $j$ 基底方向を写した結果**と解釈できる。

### 3. 行列から作った写像が本当に線形か確認する

逆向きも確認しておく。$T(\mathbf x)=\mathbf A\mathbf x$ と定めると、任意の $\mathbf x,\mathbf y\in\mathbb R^n$ とスカラー $c,d$ に対して

$$
T(c\mathbf x+d\mathbf y)
=\mathbf A(c\mathbf x+d\mathbf y)
=c\mathbf A\mathbf x+d\mathbf A\mathbf y
=cT(\mathbf x)+dT(\mathbf y).
$$

したがって行列による写像は必ず線形である。「線形写像 ↔ 行列」という対応は一方通行ではない。

### 4. なぜ平行四辺形や直線が保たれるのか

線形写像では原点が必ず原点へ移る。実際

$$
T(\mathbf0)=T(0\mathbf x)=0T(\mathbf x)=\mathbf0.
$$

また直線 $\mathbf p+t\mathbf v$ は

$$
T(\mathbf p+t\mathbf v)=T(\mathbf p)+tT(\mathbf v)
$$

となるので、直線は直線または一点へ写る。平行四辺形も辺を表すベクトルの加法が保たれるため、変形後も平行四辺形になる。図に描かれる「格子が斜めに変形する」様子は装飾ではなく、線形性そのものの幾何学的結果である。

### 5. データ行列として見る場合との橋渡し

データ解析では行を標本、列を特徴量として $\mathbf X\in\mathbb R^{N\times p}$ を置くことが多い。このとき行列は「データ表」として見える。一方、同じ数値配列を $\mathbf X\mathbf w$ と掛ければ、$p$ 個の特徴量を係数 $\mathbf w$ で線形結合して $N$ 個の予測を作る線形写像になる。行列は文脈によって表と写像の二つの顔を持つが、計算規則は同じである。

## 成立条件・壊れる場合

$\mathbf A\in\mathbb R^{m\times n}$ と $\mathbf x\in\mathbb R^n$ の積は定義できるが、$\mathbf x$ が $\mathbb R^m$ に属するというだけでは一般に積 $\mathbf A\mathbf x$ は定義できない。行列の列数と入力ベクトルの成分数が一致する必要がある。

線形写像では $T(\mathbf0)=\mathbf0$ が必ず成り立つ。したがって $T(\mathbf x)=\mathbf A\mathbf x+\mathbf b$ で $\mathbf b\ne\mathbf0$ なら、それは一般には線形写像ではなくアフィン写像である。

## ここから発展

基底を標準基底以外へ変えると、同じ線形写像でも行列表現が変わる。この事実はTopic 12「線形写像と基底変換」で扱う。ここではまず「行列=線形写像の座標表現」という視点を固定する。


## このTopicの理解確認

- 線形写像が標準基底の像だけで一意に決まる理由を導けるか。
- 行列の第$j$列が $T(\mathbf e_j)$ になることを説明できるか。
- 線形写像が直線・平行四辺形の構造を保つ理由を式で示せるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [OpenStax Intermediate Algebra 2e — Solve Systems of Equations Using Matrices](https://openstax.org/books/intermediate-algebra-2e/pages/4-5-solve-systems-of-equations-using-matrices)


## 演習

[このTopicの10問の演習](/exercises/la-matrices-data-linear-maps)
