# rankとrank-nullity theorem：教科書

Course 02｜線形代数｜Topic 11/29

## このTopicの位置づけ

列空間とnull spaceがどちらも部分空間であるなら、それぞれの次元を測れる。列空間の次元がrank、null spaceの次元がnullityである。rank-nullity theoremは、入力空間の自由度$n$が「出力に残る自由度」と「0へ潰れる自由度」へ分かれることを定量化する。

**前提知識**：列空間、null space、基底、次元。

## まず直感を作る

$n$次元入力のうち、行列作用で区別可能な方向がrank個、完全に消える独立方向がnullity個ある。両方を足すと元の入力次元$n$に戻る。これは単なる暗記式ではなく、入力自由度の会計式である。

## 図の解説

<img src="/visuals/course-02/la-rank-rank-nullity.png" alt="rankとrank-nullity theoremの図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では3次元入力のうち2つの独立方向が像へ残り、1つの方向が0へ潰れる様子を模式化している。残る2方向がrank=2、消える1方向がnullity=1で、合計3が入力次元になる。

null spaceに入る方向は「存在しなくなる」のではなく、異なる入力を同じ出力へまとめてしまう自由度である。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$。
- $\operatorname{rank}(\mathbf A)=\dim C(\mathbf A)$。
- $\operatorname{nullity}(\mathbf A)=\dim N(\mathbf A)$。
- $n$：定義域 $\mathbb R^n$ の次元。


## 正式な定義

rank-nullity theoremは

$$
\operatorname{rank}(\mathbf A)+\operatorname{nullity}(\mathbf A)=n
$$

を主張する。

## なぜこの式・定理になるのか

### pivot変数と自由変数から見る

$\mathbf A$ をRREFへ行変形したとする。pivot列の本数を$r$とする。pivot列は列空間の独立な方向の本数に等しいので

$$
\operatorname{rank}(\mathbf A)=r.
$$

未知数は$n$個あり、そのうち$r$個がpivot変数なので、自由変数は$n-r$個。斉次方程式 $\mathbf A\mathbf x=\mathbf0$ の一般解は自由変数1個につき1本のspecial solutionを持つから

$$
\operatorname{nullity}(\mathbf A)=n-r.
$$

したがって

$$
\operatorname{rank}(\mathbf A)+\operatorname{nullity}(\mathbf A)
=r+(n-r)=n.
$$

### 一意解との関係

正方行列 $n\times n$ でrankが$n$ならnullityは0。したがって $N(\mathbf A)=\{\mathbf0\}$ となり、斉次解は自明解だけ。これが可逆性へつながる。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}1&2&3\\0&1&1\end{bmatrix}.
$$

2行は独立でpivotが2個あるのでrank=2。列数$n=3$ だからnullity=1。実際、$\mathbf A\mathbf x=0$ を解くと1個の自由変数を持つ。よって $2+1=3$。

## もう一段丁寧に：rank-nullityは「入力の自由度がどこへ行くか」を数えている

### 1. rankとnullityの定義

$\mathbf A\in\mathbb R^{m\times n}$ に対して

$$
\operatorname{rank}(\mathbf A)=\dim C(\mathbf A),
$$

$$
\operatorname{nullity}(\mathbf A)=\dim N(\mathbf A).
$$

rankは出力側へ残る独立方向の数、nullityは0へ潰れる入力方向の数である。

### 2. eliminationから定理を導く

$\mathbf A$ を行簡約し、pivot列が $r$ 本あるとする。未知数は全部で $n$ 個なので、自由変数は $n-r$ 個。

- pivot列の数 $r$ は列空間のdimension、すなわちrank。
- 斉次方程式 $\mathbf A\mathbf x=0$ の一般解では、各自由変数に独立なパラメータを1個ずつ与えられるのでnullityは $n-r$。

したがって

$$
\boxed{\operatorname{rank}(\mathbf A)+\operatorname{nullity}(\mathbf A)=n}.
$$

右辺が行数 $m$ ではなく**列数 $n$**なのは、この定理が入力空間 $\mathbb R^n$ の自由度を分配しているからである。

### 3. 写像としての意味

入力空間には $n$ 個の独立方向がある。そのうちnull spaceに入る方向は出力で0へ潰れる。残りの独立方向が像へ運ばれ、column spaceを張る。したがって

$$
\text{入力の自由度}
=\text{出力に残る自由度}+\text{失われる自由度}
$$

という保存則のように読める。

### 4. 具体例

$$
\mathbf A=
\begin{bmatrix}
1&0&1\\
0&1&1
\end{bmatrix}
$$

はrank 2。$\mathbf A\mathbf x=0$ から

$$
x_1=-x_3,\qquad x_2=-x_3.
$$

$x_3=t$ と置けば

$$
\mathbf x=t\begin{bmatrix}-1\\-1\\1\end{bmatrix},
$$

よってnullity 1。確かに $2+1=3=n$。

この例では3次元の入力係数のうち1方向が出力で失われ、2方向分だけが $\mathbb R^2$ の出力へ残る。

## rank-nullityからすぐ導ける重要な帰結

$\mathbf A\in\mathbb R^{m\times n}$ とする。

### 1. full-column-rankの場合

full-column-rankとは

$$
\operatorname{rank}(\mathbf A)=n
$$

である。rank-nullityより

$$
\operatorname{nullity}(\mathbf A)
=n-n=0.
$$

したがって

$$
N(\mathbf A)=\{0\}.
$$

つまり入力を潰す方向がない。よって

$$
\mathbf A\mathbf x_1=\mathbf A\mathbf x_2
$$

なら

$$
\mathbf A(\mathbf x_1-\mathbf x_2)=0
$$

から $\mathbf x_1=\mathbf x_2$。写像はinjectiveである。

### 2. full-row-rankの場合

$\operatorname{rank}(\mathbf A)=m$ なら

$$
\dim C(\mathbf A)=m.
$$

しかし $C(\mathbf A)\subseteq\mathbb R^m$ なので

$$
C(\mathbf A)=\mathbb R^m.
$$

したがって任意の $\mathbf b\in\mathbb R^m$ に対して $\mathbf A\mathbf x=\mathbf b$ は少なくとも一つ解を持つ。写像はsurjectiveである。

### 3. 正方行列では二つが同時に起こる

$n\times n$ 行列でrank $n$ ならnullity 0かつcolumn space $\mathbb R^n$。したがってinjectiveかつsurjectiveで、逆行列が存在する。

ここで、これまで別々に見えた

- 全列pivot
- null spaceが0
- 列が独立
- column spaceが全空間
- 任意の右辺に一意解
- invertible

がrank $n$ という一つの条件で結ばれる。

## rank不足のleast squaresへどうつながるか

$\operatorname{rank}(\mathbf A)<n$ ならnullityは正。

$$
\operatorname{nullity}(\mathbf A)=n-\operatorname{rank}(\mathbf A)>0.
$$

したがって非零 $\mathbf z$ で $\mathbf A\mathbf z=0$ が存在する。

ある係数 $\hat{\mathbf x}$ がleast-squares prediction $\mathbf A\hat{\mathbf x}$ を作るなら

$$
\mathbf A(\hat{\mathbf x}+t\mathbf z)
=\mathbf A\hat{\mathbf x}
$$

なので、同じpredictionを作る係数が無限にある。この事実はTopic 18でfull-column-rank条件が必要になる理由、Topic 27でminimum-norm solutionを選ぶ理由へ直結する。

## rankは「非零成分の個数」ではない

たとえば

$$
\mathbf A=
\begin{bmatrix}
1&1\\2&2
\end{bmatrix}
$$

には非零成分が4個あるが、列は同じ方向なのでrankは1。

rankが数えているのはentryの個数ではなく、線形写像として保持される**独立方向の数**である。

## 成立条件・壊れる場合

rankは行列の行数・列数の小さい方を超えない：$\operatorname{rank}(\mathbf A)\le\min(m,n)$。数値計算では「特異値が厳密に0か」ではなく閾値でnumerical rankを決めるため、理論rankと数値rankを区別する。

## ここから発展

rank-nullityは抽象線形写像 $T:V\to W$ に対しても $\dim V=\dim\ker T+\dim\operatorname{im}T$ と書ける。行列版はその座標表現である。


## このTopicの理解確認

- rank-nullityの右辺が行数 $m$ ではなく列数 $n$ になる理由を説明できるか。
- full-column-rankからnullity 0とinjectivityを導けるか。
- rank不足がleast-squares coefficientの非一意性へつながる理由を示せるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-rank-rank-nullity)
