# 列空間とnull space：教科書

Course 02｜線形代数｜Topic 08/29

## このTopicの位置づけ

$\mathbf A\mathbf x$ は $\mathbf A$ の列ベクトルの線形結合だった。したがって $\mathbf A$ が作れる出力全体は、列のspanとして表せる。一方、$\mathbf A$ によって0へ潰れる入力方向もある。この二つが列空間とnull spaceである。

**前提知識**：span、部分空間、行列とベクトルの積。

## まず直感を作る

列空間は「この行列で到達できる出力の世界」、null spaceは「入力を変えても出力に現れない方向」である。逆問題 $\mathbf A\mathbf x=\mathbf b$ を考えると、$\mathbf b$ が列空間に入っているかが解の存在を決め、null spaceが0以外を含むかが解の一意性に関係する。

## 図の解説

<img src="/visuals/course-02/la-column-space-null-space.png" alt="列空間とnull spaceの図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の右側の直線が列空間 $C(\mathbf A)$ である。一般の入力 $\mathbf x$ は $\mathbf A\mathbf x$ としてその直線上へ写る。一方、null spaceに属する $\mathbf z$ は $\mathbf A\mathbf z=\mathbf0$ となり、出力では原点へ潰れる。

したがって $\mathbf x$ と $\mathbf x+\mathbf z$ は異なる入力でも、$\mathbf A(\mathbf x+\mathbf z)=\mathbf A\mathbf x$ となる。null spaceが非自明だと逆問題の解が一意でなくなる理由が図から見える。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$。
- $C(\mathbf A)\subseteq\mathbb R^m$：column space（列空間）。
- $N(\mathbf A)\subseteq\mathbb R^n$：null space（零空間、核）。


## 正式な定義

$$
C(\mathbf A)=\{\mathbf A\mathbf x:\mathbf x\in\mathbb R^n\}
=\operatorname{span}\{\mathbf a_1,\ldots,\mathbf a_n\},
$$

$$
N(\mathbf A)=\{\mathbf x\in\mathbb R^n:\mathbf A\mathbf x=\mathbf0\}.
$$

## なぜこの式・定理になるのか

### なぜ列空間が「解の存在」を決めるのか

方程式 $\mathbf A\mathbf x=\mathbf b$ に解があるとは、ある $\mathbf x$ に対して $\mathbf b=\mathbf A\mathbf x$ と書けること。そのようなベクトル全体の定義が $C(\mathbf A)$ だから、

$$
\mathbf A\mathbf x=\mathbf b\text{ が可解}
\quad\Longleftrightarrow\quad
\mathbf b\in C(\mathbf A).
$$

### なぜnull spaceが「一意性」を決めるのか

$\mathbf x_0$ が一つの解とし、$\mathbf z\in N(\mathbf A)$ とする。すると

$$
\mathbf A(\mathbf x_0+\mathbf z)
=\mathbf A\mathbf x_0+\mathbf A\mathbf z
=\mathbf b+\mathbf0
=\mathbf b.
$$

したがって、非零の $\mathbf z$ がnull spaceにあれば解を無限に作れる。逆に二つの解 $\mathbf x_1,\mathbf x_2$ があれば

$$
\mathbf A(\mathbf x_1-\mathbf x_2)=\mathbf0
$$

なので差はnull spaceに属する。よって解の非一意性とnull spaceは同じ構造を表す。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}1&1\\2&2\end{bmatrix}.
$$

列は両方とも $(1,2)^T$ の倍数なので、列空間はそのベクトルが張る直線。null spaceは

$$
x_1+x_2=0
$$

より $\mathbf x=t(1,-1)^T$。したがって入力の $(1,-1)^T$ 方向は出力に全く現れない。

## もう一段丁寧に：列空間とnull spaceは同じ式の二つの側面

### 1. 列空間は「作れる出力」の集合

$\mathbf A=[\mathbf a_1\cdots\mathbf a_n]\in\mathbb R^{m\times n}$ なら

$$
\mathbf A\mathbf x
=x_1\mathbf a_1+\cdots+x_n\mathbf a_n.
$$

したがって $\mathbf A\mathbf x$ として作れる出力全体は

$$
C(\mathbf A)=\operatorname{span}(\mathbf a_1,\ldots,\mathbf a_n).
$$

方程式 $\mathbf A\mathbf x=\mathbf b$ が解を持つ条件は、まさに

$$
\mathbf b\in C(\mathbf A)
$$

である。

### 2. null spaceは「出力に見えない入力変化」の集合

$$
N(\mathbf A)=\{\mathbf z\in\mathbb R^n:\mathbf A\mathbf z=\mathbf0\}.
$$

もし $\mathbf x_0$ が $\mathbf A\mathbf x=\mathbf b$ の一つの解で、$\mathbf z\in N(\mathbf A)$ なら

$$
\mathbf A(\mathbf x_0+\mathbf z)
=\mathbf A\mathbf x_0+\mathbf A\mathbf z
=\mathbf b.
$$

つまりnull space方向へ入力を動かしても出力は変わらない。

逆に、$\mathbf x_1,\mathbf x_2$ が同じ $\mathbf b$ を作るなら

$$
\mathbf A\mathbf x_1=\mathbf A\mathbf x_2
$$

より

$$
\mathbf A(\mathbf x_1-\mathbf x_2)=\mathbf0,
$$

したがって $\mathbf x_1-\mathbf x_2\in N(\mathbf A)$。よって解の非一意性はnull spaceで完全に記述できる。

### 3. 一般解が $\mathbf x_0+N(\mathbf A)$ になる理由

上の二方向を合わせると、非斉次方程式の全解は

$$
\boxed{\mathbf x=\mathbf x_0+\mathbf z,\qquad \mathbf z\in N(\mathbf A)}
$$

である。一つの特解 $\mathbf x_0$ に、斉次方程式の全解を足せばよい。この構造は微分方程式などでも繰り返し現れる。

### 4. 入力空間と出力空間を混同しない

$C(\mathbf A)$ は $\mathbb R^m$ の部分空間だが、$N(\mathbf A)$ は $\mathbb R^n$ の部分空間である。矩形行列ではそもそも存在する空間が異なる。「どちらもAに関する部分空間だから同じ空間内にある」と考えないこと。

## 成立条件・壊れる場合

列空間は $\mathbb R^m$ の部分空間、null spaceは $\mathbb R^n$ の部分空間であり、住んでいる空間が違う。両方を同じ座標図に無理に描くと混乱しやすい。shapeを明示すること。

## ここから発展

列空間の次元がrank、null spaceの次元がnullityである。両者が入力次元$n$をどう分けるかをTopic 11のrank-nullity theoremで示す。


## このTopicの理解確認

- $\mathbf b\in C(\mathbf A)$ と $\mathbf A\mathbf x=\mathbf b$ の可解性が同値な理由を説明できるか。
- 二つの解の差がnull spaceに入ることを証明できるか。
- column spaceが $\mathbb R^m$、null spaceが $\mathbb R^n$ に属することをshapeから説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-column-space-null-space)
