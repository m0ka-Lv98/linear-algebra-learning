# 固有値と固有ベクトル：教科書

Course 02｜線形代数｜Topic 21/29

## このTopicの位置づけ

一般のベクトルは行列作用で方向も長さも変わる。しかし特別な方向では、行列を掛けても方向が変わらず倍率だけが変わる。その方向が固有ベクトル、倍率が固有値である。

**前提知識**：線形写像、可逆性、determinant、null space。

## まず直感を作る

変形された楕円の主軸のように、「この方向だけは行列を掛けても同じ直線上に残る」という方向を探す。行列全体を理解するための自然な座標軸候補になる。

## 図の解説

<img src="/visuals/course-02/la-eigenvalues-eigenvectors.png" alt="固有値と固有ベクトルの図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の円を行列で変換すると楕円になる。通常の円周上の点は方向を変えるが、図で示した固有ベクトル方向は変換後も同一直線上にあり、長さだけが $\lambda_i$ 倍される。

固有ベクトルは「楕円の長軸・短軸」と必ず一致するわけではない一般行列もあるが、対称行列ではこの直感が特に正確になる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$。
- $\mathbf v\ne\mathbf0$：固有ベクトル。
- $\lambda\in\mathbb C$：固有値（実行列でも複素数になることがある）。
- $E_\lambda=N(\mathbf A-\lambda\mathbf I)$：固有空間。


## 正式な定義

$$
\mathbf A\mathbf v=\lambda\mathbf v,
\qquad \mathbf v\ne\mathbf0
$$

を満たす $(\lambda,\mathbf v)$ を固有対という。

## なぜこの式・定理になるのか

### なぜ $\det(A-\lambda I)=0$ を解くのか

固有方程式を移項すると

$$
(\mathbf A-\lambda\mathbf I)\mathbf v=\mathbf0.
$$

求めたいのは $\mathbf v\ne0$ という**非自明解**。斉次方程式が非自明解を持つには $\mathbf A-\lambda\mathbf I$ が可逆であってはいけない。正方行列の可逆性とdeterminantの関係から

$$
\det(\mathbf A-\lambda\mathbf I)=0.
$$

この多項式をcharacteristic polynomial（特性多項式）と呼ぶ。

### 固有値を求めた後に固有ベクトルを求める

$\lambda$ を得たら

$$
(\mathbf A-\lambda\mathbf I)\mathbf v=0
$$

を通常のnull-space問題として解く。固有ベクトルは1本だけでなく、そのnull space内の全ての非零ベクトルであり、その空間が固有空間。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}.
$$

$$
\det(\mathbf A-\lambda\mathbf I)
=(2-\lambda)^2-1
=(\lambda-1)(\lambda-3).
$$

したがって固有値は1と3。

$\lambda=3$ では $(\mathbf A-3\mathbf I)\mathbf v=0$ より $v_1=v_2$、固有ベクトルは $(1,1)^T$ の倍数。$\lambda=1$ では $v_1=-v_2$。

## もう一段丁寧に：固有値問題を「特殊な連立方程式」として理解する

### 1. 固有ベクトルはなぜゼロを除くのか

$$
\mathbf A\mathbf0=\lambda\mathbf0
$$

はどんな $\lambda$ に対しても成立する。もし $\mathbf0$ を固有ベクトルとして許すと、すべての数がすべての行列の固有値になってしまい、方向を抽出するという目的を失う。そのため定義で $\mathbf v\ne\mathbf0$ を明示する。

### 2. eigenspaceは一つのベクトルではなく部分空間

ある固有値 $\lambda$ に対して

$$
E_\lambda=N(\mathbf A-\lambda\mathbf I)
$$

と定義する。null spaceなので $E_\lambda$ は部分空間である。ただし固有ベクトル集合そのものは $\mathbf0$ を除くため部分空間ではない。「固有空間」には0を含め、そこから0以外を選んだものが固有ベクトルである。

### 3. 異なる固有値に属する固有ベクトルは独立

2本の場合を証明する。$\lambda_1\ne\lambda_2$、

$$
\mathbf A\mathbf v_1=\lambda_1\mathbf v_1,
\qquad
\mathbf A\mathbf v_2=\lambda_2\mathbf v_2
$$

とする。もし $c_1\mathbf v_1+c_2\mathbf v_2=0$ なら、$\mathbf A$ を掛けて

$$
c_1\lambda_1\mathbf v_1+c_2\lambda_2\mathbf v_2=0.
$$

元の式を $\lambda_2$ 倍して引くと

$$
c_1(\lambda_1-\lambda_2)\mathbf v_1=0.
$$

$\mathbf v_1\ne0$、$\lambda_1\ne\lambda_2$ なので $c_1=0$。元の式から $c_2=0$。一般の本数にも拡張できる。この事実が「固有値が十分異なれば対角化できる」理由の一部になる。

### 4. algebraic multiplicityとgeometric multiplicity

特性多項式で $\lambda$ が何回根として現れるかをalgebraic multiplicity、

$$
\dim E_\lambda
$$

をgeometric multiplicityと呼ぶ。後者は独立な固有ベクトルが何本取れるかを表す。一般に

$$
1\le \dim E_\lambda\le
\text{algebraic multiplicity}
$$

である。二つが一致しない例が、次Topicで対角化できない行列として現れる。

### 5. 反復作用で固有値の意味が見える

もし初期ベクトルが固有ベクトルなら

$$
\mathbf A^k\mathbf v
=\lambda^k\mathbf v.
$$

したがって $|\lambda|>1$ なら大きくなり、$|\lambda|<1$ なら0へ縮み、$\lambda<0$ なら符号を反転しながら伸縮する。固有値がdynamic systemの長期挙動に使われる理由は、反復作用が単なるスカラーの累乗へ簡約されるからである。

## 2×2例で特性方程式から固有空間まで完走する

$$
\mathbf A=
\begin{bmatrix}
4&1\\
2&3
\end{bmatrix}
$$

とする。

### Step 1: characteristic polynomial

$$
\mathbf A-\lambda\mathbf I
=
\begin{bmatrix}
4-\lambda&1\\
2&3-\lambda
\end{bmatrix}.
$$

したがって

$$
\begin{aligned}
\det(\mathbf A-\lambda\mathbf I)
&=(4-\lambda)(3-\lambda)-2\\
&=12-7\lambda+\lambda^2-2\\
&=\lambda^2-7\lambda+10\\
&=(\lambda-5)(\lambda-2).
\end{aligned}
$$

よって固有値は

$$
\lambda_1=5,
\qquad
\lambda_2=2.
$$

### Step 2: $\lambda=5$ のeigenspace

$$
\mathbf A-5\mathbf I
=
\begin{bmatrix}
-1&1\\2&-2
\end{bmatrix}.
$$

方程式

$$
(\mathbf A-5\mathbf I)\mathbf v=0
$$

は

$$
-v_1+v_2=0
$$

なので $v_2=v_1$。

$$
E_5
=\operatorname{span}\left(
\begin{bmatrix}1\\1\end{bmatrix}
\right).
$$

### Step 3: $\lambda=2$ のeigenspace

$$
\mathbf A-2\mathbf I
=
\begin{bmatrix}
2&1\\2&1
\end{bmatrix}.
$$

$$
2v_1+v_2=0
$$

より $v_2=-2v_1$。

$$
E_2
=\operatorname{span}\left(
\begin{bmatrix}1\\-2\end{bmatrix}
\right).
$$

### Step 4: definitionへ戻って検算

$$
\mathbf A
\begin{bmatrix}1\\1\end{bmatrix}
=
\begin{bmatrix}5\\5\end{bmatrix}
=5
\begin{bmatrix}1\\1\end{bmatrix}.
$$

また

$$
\mathbf A
\begin{bmatrix}1\\-2\end{bmatrix}
=
\begin{bmatrix}2\\-4\end{bmatrix}
=2
\begin{bmatrix}1\\-2\end{bmatrix}.
$$

特性多項式の根を求めただけで終わらず、最後に $\mathbf A\mathbf v=\lambda\mathbf v$ へ戻って確認する。

## 実固有ベクトルを持たない実行列もある

90度回転

$$
\mathbf R=
\begin{bmatrix}
0&-1\\1&0
\end{bmatrix}
$$

では、非零の実ベクトルはすべて方向を90度変える。したがって実数倍だけで元の方向に残る実固有ベクトルは存在しない。

特性多項式は

$$
\det(\mathbf R-\lambda\mathbf I)
=\lambda^2+1,
$$

実数解を持たない。

この例から「実行列なら実固有値が必ずある」という誤解を防げる。複素数まで広げれば $\lambda=\pm i$ が現れるが、複素線形代数の詳細はここでは発展扱いとする。

## 固有ベクトルのscaleは一意でない

もし $\mathbf A\mathbf v=\lambda\mathbf v$ なら、非零scalar $c$ に対して

$$
\mathbf A(c\mathbf v)
=c\mathbf A\mathbf v
=c\lambda\mathbf v
=\lambda(c\mathbf v).
$$

したがって $c\mathbf v$ も同じ固有値の固有ベクトル。固有ベクトルは「一本の特定の矢印」ではなく、eigenspace内のdirectionを表す。数値計算では便宜上norm 1に正規化することが多いが、それは固有ベクトルの定義条件ではない。

## 成立条件・壊れる場合

固有ベクトルはゼロベクトルを含めない。固有値は重複しうる。実行列でも回転行列のように実固有値を持たず複素固有値を持つ場合がある。

## ここから発展

固有ベクトルが$n$本独立にそろえば、それらを基底にして行列を対角化できる。次Topicで $\mathbf A^k$ の計算が劇的に簡単になる理由を導く。


## このTopicの理解確認

- $Av=\lambda v$ から $\det(A-\lambda I)=0$ を導けるか。
- 固有vector setとeigenspaceの違い（zero vectorの扱い）を説明できるか。
- repeated eigenvalueでも十分なindependent eigenvectorsが得られない例を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-eigenvalues-eigenvectors)
