# 可逆性と逆行列：教科書

Course 02｜線形代数｜Topic 05/29

## このTopicの位置づけ

$\mathbf A\mathbf x=\mathbf b$ を全ての $\mathbf b$ に対して一意に解けるなら、$\mathbf A$ は入力情報を失っていない。この「元へ戻せる」性質を可逆性と呼び、逆向きの変換を $\mathbf A^{-1}$ で表す。

**前提知識**：連立一次方程式と消去法。

## まず直感を作る

変換によって二つの異なる入力が同じ出力へ潰れてしまったら、出力だけから元の入力を区別できない。逆行列が存在するためには、異なる入力を異なる出力へ送り、かつ出力空間の全てへ到達できる必要がある。

## 図の解説

<img src="/visuals/course-02/la-invertibility-inverse-matrices.png" alt="可逆性と逆行列の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の左の円が $\mathbf A$ によって中央の楕円へ変換され、さらに $\mathbf A^{-1}$ によって元の円へ戻る。可逆な変換では、円が楕円へ伸びたり傾いたりしても、面積を完全に0へ潰すことはない。

もし一方向が完全に0へ潰れて線分になれば、元の円上の異なる点が同じ点へ重なり、逆変換は作れない。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$：正方行列。
- $\mathbf I\in\mathbb R^{n\times n}$：単位行列。
- $\mathbf A^{-1}$：$\mathbf A$ の逆行列。


## 正式な定義

正方行列 $\mathbf A$ に対し

$$
\mathbf A^{-1}\mathbf A=\mathbf A\mathbf A^{-1}=\mathbf I
$$

を満たす行列 $\mathbf A^{-1}$ が存在するとき、$\mathbf A$ を可逆という。

## なぜこの式・定理になるのか

### なぜ逆行列があれば連立方程式を解けるのか

$\mathbf A\mathbf x=\mathbf b$ の左から $\mathbf A^{-1}$ を掛けると

$$
\mathbf A^{-1}\mathbf A\mathbf x=\mathbf A^{-1}\mathbf b.
$$

結合則より

$$
\mathbf I\mathbf x=\mathbf A^{-1}\mathbf b,
$$

したがって

$$
\mathbf x=\mathbf A^{-1}\mathbf b.
$$

さらに解が一意であることも示せる。もし $\mathbf A\mathbf x_1=\mathbf b$ と $\mathbf A\mathbf x_2=\mathbf b$ なら、差を取って

$$
\mathbf A(\mathbf x_1-\mathbf x_2)=\mathbf0.
$$

左から $\mathbf A^{-1}$ を掛けると $\mathbf x_1-\mathbf x_2=\mathbf0$ なので $\mathbf x_1=\mathbf x_2$。

### 2×2逆行列の式がなぜ出るか

$\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ とする。候補

$$
\mathbf B=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
$$

を掛けると

$$
\mathbf A\mathbf B
=\frac1{ad-bc}\begin{bmatrix}ad-bc&0\\0&ad-bc\end{bmatrix}=\mathbf I.
$$

分母 $ad-bc$ が0ならこの式は定義できない。この量が後で学ぶ determinant（行列式）である。

## 小さな数値例を最後まで計算する

$\mathbf A=\begin{bmatrix}2&1\\1&1\end{bmatrix}$ では $ad-bc=1$ なので

$$
\mathbf A^{-1}=\begin{bmatrix}1&-1\\-1&2\end{bmatrix}.
$$

$\mathbf b=(5,3)^T$ に対して

$$
\mathbf x=\mathbf A^{-1}\mathbf b
=\begin{bmatrix}2\\1\end{bmatrix}.
$$

確認として $\mathbf A\mathbf x=(5,3)^T$ に戻る。

## もう一段丁寧に：「逆行列がある」とは何が保証されることか

### 1. 逆行列は写像を完全に元へ戻す

正方行列 $\mathbf A\in\mathbb R^{n\times n}$ の逆行列 $\mathbf A^{-1}$ は

$$
\mathbf A^{-1}\mathbf A=\mathbf I,
\qquad
\mathbf A\mathbf A^{-1}=\mathbf I
$$

を満たす。したがって $\mathbf y=\mathbf A\mathbf x$ が与えられれば

$$
\mathbf A^{-1}\mathbf y
=\mathbf A^{-1}\mathbf A\mathbf x
=\mathbf x
$$

と入力を一意に復元できる。

### 2. null spaceが0だけであることとの同値性

もし $\mathbf A$ が可逆で $\mathbf A\mathbf x=\mathbf0$ なら、左から $\mathbf A^{-1}$ を掛けて

$$
\mathbf x=\mathbf A^{-1}\mathbf0=\mathbf0.
$$

よって $N(\mathbf A)=\{\mathbf0\}$。

逆に正方行列でnull spaceが $\{\mathbf0\}$ なら、列は線形独立でpivotが $n$ 個ある。$n\times n$ 行列なので全行にもpivotがあり、任意の $\mathbf b\in\mathbb R^n$ に対して $\mathbf A\mathbf x=\mathbf b$ が一意に解ける。この解を $\mathbf x=\mathbf A^{-1}\mathbf b$ と対応させることで逆写像が得られる。

この一連の同値関係が「invertible matrix theorem」の中心である。

### 3. なぜ $\mathbf A\mathbf x=\mathbf b$ を逆行列で解けるのか

$$
\mathbf A\mathbf x=\mathbf b
$$

の両辺へ左から $\mathbf A^{-1}$ を掛けると

$$
\mathbf A^{-1}\mathbf A\mathbf x
=\mathbf A^{-1}\mathbf b,
$$

$$
\mathbf I\mathbf x=\mathbf A^{-1}\mathbf b,
$$

したがって

$$
\mathbf x=\mathbf A^{-1}\mathbf b.
$$

ここで左から掛けることが重要である。行列積は一般に可換でないので、スカラー方程式のように「$\mathbf A$ を右辺へ移項した」と考えるのは危険である。

### 4. 2×2逆行列公式はどこから出るか

$$
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix}
$$

に対し、未知行列

$$
\mathbf X=\begin{bmatrix}p&q\\r&s\end{bmatrix}
$$

が $\mathbf A\mathbf X=\mathbf I$ を満たすよう解くと、二つの右辺 $\mathbf e_1,\mathbf e_2$ に対して同じ係数行列を解くことになる。整理すると

$$
\mathbf A^{-1}
=\frac{1}{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix},
$$

ただし $ad-bc\ne0$。分母が0なら列が潰れて面積が0になり、逆写像を作れない。後のdeterminant Topicで、この分母がなぜ面積倍率と可逆性を同時に表すのかを学ぶ。

### 5. 理論上の逆行列と数値解法を分ける

$\mathbf A^{-1}$ は理論を整理するには非常に便利だが、数値計算で $\mathbf A\mathbf x=\mathbf b$ を解くたびに逆行列を明示形成する必要はない。消去法やLU分解で直接solveする方が計算量・数値誤差の両面で自然である。「逆行列が存在する」という数学的事実と、「逆行列を実際に計算する」というアルゴリズムは別である。

## 成立条件・壊れる場合

逆行列は正方行列に対して定義する。長方形行列には通常の意味の両側逆行列は存在しない。また、理論上可逆でも非常にconditionが悪い行列では、逆行列を明示的に作ると数値誤差が増える。実装では `inv(A) @ b` より `solve(A,b)` を優先する。

## ここから発展

この後、可逆性はpivot、null space、rank、determinant、固有値など多くの条件と同値であることが見えてくる。現時点では同値条件を暗記せず、「情報を潰さず一意に戻せる」という核を保持する。


## このTopicの理解確認

- $N(\mathbf A)=\{0\}$ と可逆性の関係を説明できるか。
- $\mathbf A^{-1}\mathbf b$ を「移項」と呼ばず、左からinverseを掛ける操作として導けるか。
- 理論上inverseが存在することと、数値計算でinverseを明示形成することを区別できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-invertibility-inverse-matrices)
