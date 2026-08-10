# ベクトルと線形結合：教科書

Course 02｜線形代数｜Topic 01/29

## このTopicの位置づけ

線形代数では、最初に「複数の数をひとまとめにしたベクトル」を扱う。ただし、ベクトルを単なる数の列として覚えるだけでは後で行列・部分空間・最小二乗につながらない。重要なのは、ベクトルに対して **スカラー倍して足す** という操作を許すことで、「どの方向へどこまで到達できるか」を表せるようになることである。線形結合は、このCourseで何度も現れる最初の中心概念である。

**前提知識**：Course 00の「数式・記号・型・次元」と、実数の四則演算。

## まず直感を作る

2本の矢印があるとする。1本目を2倍し、2本目を半分にし、それらを足すと新しい矢印が得られる。係数を変えれば終点も変わる。この「係数を変えながら作れるベクトル全体」が後の span（生成される空間）になる。

データ解析の言葉に置き換えると、基底となるパターンを何個か用意し、その混合係数を変えて観測ベクトルを表す操作でもある。したがって、線形結合は「矢印の足し算」であると同時に「成分・基底・特徴の混合」の原型でもある。

## 図の解説

<img src="/visuals/course-02/la-vectors-linear-combinations.png" alt="ベクトルと線形結合の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図には原点から出る2本のベクトル $\mathbf v_1$ と $\mathbf v_2$、そしてそれらから作った $1.2\mathbf v_1+0.8\mathbf v_2$ が描かれている。$\mathbf v_1$ を1.2倍すると同じ方向のまま長さだけが変わり、その終点から $0.8\mathbf v_2$ と平行な矢印を足すと、最終的な線形結合の終点へ到達する。

ここで係数1.2や0.8は「ベクトルの成分」ではなく、ベクトル全体に掛けるスカラーである。係数が負なら矢印の向きが反転し、0ならそのベクトルの寄与が消える。

## 記号・型・次元

- $\mathbf v_i\in\mathbb R^n$：第$i$番目のベクトル。すべて同じ次元$n$をもつ。
- $c_i\in\mathbb R$：$\mathbf v_i$ に掛けるスカラー係数。
- $\mathbf y\in\mathbb R^n$：線形結合で得られるベクトル。
- $k$：線形結合に使うベクトルの本数。


## 正式な定義

$k$本のベクトル $\mathbf v_1,\ldots,\mathbf v_k\in\mathbb R^n$ とスカラー $c_1,\ldots,c_k$ に対して

$$
\mathbf y=c_1\mathbf v_1+\cdots+c_k\mathbf v_k
$$

と書ける $\mathbf y$ を、$\mathbf v_1,\ldots,\mathbf v_k$ の**線形結合**という。

## なぜこの式・定理になるのか

### 成分表示から線形結合を確認する

$\mathbf v_1=(v_{11},\ldots,v_{n1})^T$、$\mathbf v_2=(v_{12},\ldots,v_{n2})^T$ とする。ベクトルの加算とスカラー倍は成分ごとに定義されるので、

$$
c_1\mathbf v_1+c_2\mathbf v_2
=
\begin{bmatrix}
c_1v_{11}+c_2v_{12}\\
\vdots\\
c_1v_{n1}+c_2v_{n2}
\end{bmatrix}.
$$

つまり「ベクトルを混ぜる」とは、各成分を勝手に混ぜるのではなく、**同じ係数 $c_1,c_2$ を全成分へ一貫して適用する**ことである。

### なぜ後で行列になるのか

$\mathbf v_1,\ldots,\mathbf v_k$ を列に並べた行列を

$$
\mathbf V=
\begin{bmatrix}
|&&|\\
\mathbf v_1&\cdots&\mathbf v_k\\
|&&|
\end{bmatrix}
\in\mathbb R^{n\times k}
$$

とし、係数を $\mathbf c=(c_1,\ldots,c_k)^T\in\mathbb R^k$ とする。行列とベクトルの積の定義から

$$
\mathbf V\mathbf c=c_1\mathbf v_1+\cdots+c_k\mathbf v_k
$$

となる。したがって、行列積 $\mathbf V\mathbf c$ は突然出てくる新しい操作ではなく、「列ベクトルの線形結合」を一度に書いたものだと分かる。

## 小さな数値例を最後まで計算する

$\mathbf v_1=(1,2)^T$、$\mathbf v_2=(2,-1)^T$ とし、$c_1=3$、$c_2=-2$ とする。

$$
3\mathbf v_1-2\mathbf v_2
=3\begin{bmatrix}1\\2\end{bmatrix}-2\begin{bmatrix}2\\-1\end{bmatrix}
=\begin{bmatrix}3\\6\end{bmatrix}+\begin{bmatrix}-4\\2\end{bmatrix}
=\begin{bmatrix}-1\\8\end{bmatrix}.
$$

符号を確認すると、第2ベクトルを「-2倍」するため、第2成分 $-1$ は $+2$ へ変わる。ここは試験で符号ミスが起こりやすい。

## もう一段丁寧に：線形結合が線形代数の出発点になる理由

### 1. ベクトルを「成分の並び」だけで見ない

たとえば

$$
\mathbf v_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad
\mathbf v_2=\begin{bmatrix}0\\1\end{bmatrix}
$$

とする。任意の実数 $c_1,c_2$ に対して

$$
c_1\mathbf v_1+c_2\mathbf v_2
=\begin{bmatrix}c_1\\c_2\end{bmatrix}
$$

だから、係数 $c_1,c_2$ を変えるだけで平面上のすべての点へ到達できる。ここで大切なのは、ベクトルを単なる数表ではなく、**いくつかの基本方向をどれだけ混ぜるか**という見方へ切り替えることである。

この見方は後で行列にもそのまま現れる。行列

$$
\mathbf A=[\mathbf a_1\ \mathbf a_2\ \cdots\ \mathbf a_n]\in\mathbb R^{m\times n}
$$

と係数ベクトル

$$
\mathbf x=(x_1,\ldots,x_n)^T\in\mathbb R^n
$$

に対して、行列ベクトル積は

$$
\mathbf A\mathbf x
=x_1\mathbf a_1+\cdots+x_n\mathbf a_n
$$

である。つまり、後で何度も使う $\mathbf A\mathbf x$ は「行列の列ベクトルを、$\mathbf x$ の成分を係数として線形結合する操作」である。

### 2. なぜ係数を自由に変えてよいのか

線形結合の定義では係数は任意のスカラーである。係数を正の数だけに制限すると「方向を反転する」ことができず、一般の部分空間を作れない。たとえば $\mathbf v=(1,0)^T$ の正の倍数だけでは右向き半直線しか得られないが、実数倍を許せば

$$
\{c\mathbf v:c\in\mathbb R\}
$$

は原点を通る直線全体になる。後で定義する部分空間がスカラー倍に閉じていることと、この「係数を任意に選べる」ことは同じ構造を表している。

### 3. 同じベクトルを作る係数は一意とは限らない

$$
\mathbf v_1=\begin{bmatrix}1\\0\end{bmatrix},\quad
\mathbf v_2=\begin{bmatrix}0\\1\end{bmatrix},\quad
\mathbf v_3=\begin{bmatrix}1\\1\end{bmatrix}
$$

では $\mathbf v_3=\mathbf v_1+\mathbf v_2$ である。したがって

$$
\begin{bmatrix}1\\1\end{bmatrix}
=0\mathbf v_1+0\mathbf v_2+1\mathbf v_3
=1\mathbf v_1+1\mathbf v_2+0\mathbf v_3.
$$

同じ出力に複数の係数表現がある。この現象が、後の「線形従属」「null space」「rank不足」「最小ノルム解」につながる。最初のTopicでこの非一意性を見ておくと、擬似逆で「なぜ解を一つ選ばなければならないか」が突然の話にならない。

### 4. 係数空間と実際のベクトル空間を区別する

$\mathbf x\in\mathbb R^n$ は係数の一覧であり、$\mathbf A\mathbf x\in\mathbb R^m$ はその係数で作った実際の出力である。$n$ と $m$ は同じとは限らない。たとえば $n=2,m=3$ なら、2個の係数から3次元空間内のある平面を作ることができる。この「入力の係数空間」と「出力が存在する空間」の区別は、列空間・線形写像・最小二乗を理解する際の土台になる。

## 成立条件・壊れる場合

線形結合を作るベクトルは同じベクトル空間に属していなければならない。たとえば $\mathbb R^2$ のベクトルと $\mathbb R^3$ のベクトルは、そのままでは加算できない。また、線形結合の係数はスカラーである。

この段階では「同じ $\mathbf y$ を作る係数が一意か」は保証されない。係数の一意性は後で学ぶ**線形独立**と**基底**によって決まる。

## ここから発展

ここから一段先へ進むと、係数に $c_1+\cdots+c_k=1$ という条件を課した**アフィン結合**が現れる。アフィン結合は原点を特別扱いしない「点の組合せ」を表す。ただし、アフィン結合を理解する前に、まず制約のない線形結合とspanを確実に理解しておく。


## このTopicの理解確認

- $\mathbf A\mathbf x$ を行列の列の線形結合として展開できるか。
- 同じベクトルを複数の係数で表せる例を作り、それが後のnull spaceとどうつながるか説明できるか。
- 係数空間 $\mathbb R^n$ と出力空間 $\mathbb R^m$ を区別できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-vectors-linear-combinations)
