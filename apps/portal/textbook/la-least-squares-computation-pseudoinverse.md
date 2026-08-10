# 最小二乗法の計算と擬似逆行列への準備：教科書

Course 02｜線形代数｜Topic 18/29

## このTopicの位置づけ

Topic 17では、方程式 $\mathbf A\mathbf x=\mathbf b$ が厳密には解けないとき、$\mathbf b$ を列空間 $C(\mathbf A)$ へ直交射影すれば「最も近い再現可能な出力」が得られることを学んだ。その幾何条件から

$$
\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b
$$

というnormal equation（正規方程式）も得た。

このTopicでは、その式を「書いて終わり」にしない。

1. なぜ $\mathbf A^T\mathbf A$ が可逆になる場合があるのか。
2. なぜ $(\mathbf A^T\mathbf A)^{-1}\mathbf A^T$ が現れるのか。
3. QR分解を使うと、なぜ $\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b$ になるのか。
4. 二つの計算法が、なぜ同じ最小二乗解を求めているのか。
5. rankが不足すると、どの段階が壊れるのか。

を既習事項だけで順に導く。

この時点ではSVD（特異値分解）はまだ学んでいない。したがって一般のrank不足行列に対するMoore–Penrose擬似逆の完全な式はここでは使わない。Topic 26でSVDを導いた後、Topic 27で一般の擬似逆とminimum-norm solutionを初めて完全に導出する。

**前提Topic**：Topic 13 内積、Topic 15 直交射影、Topic 16 QR分解、Topic 17 最小二乗の幾何。

## まず直感を作る

最小二乗計算は、二つの問題に分けると理解しやすい。

- 出力空間側：$\mathbf b$ のうち、列空間で表現できる部分 $\hat{\mathbf b}$ を求める。
- 入力空間側：その $\hat{\mathbf b}$ を作る係数 $\hat{\mathbf x}$ を求める。

$\mathbf A$ の列が線形独立なら、同じ $\hat{\mathbf b}$ を作る係数は一組しかない。そのため、射影点が決まれば係数も一意に決まる。

一方、列が線形従属なら、異なる係数ベクトルが同じ出力を作れる。すると「一番近い出力」は決まっても、「その出力を作る係数」は一意でない。この非一意性が、後で擬似逆を一般化する必要性になる。

## 図の解説

<img src="/visuals/course-02/la-least-squares-computation-pseudoinverse.png" alt="最小二乗法と擬似逆への準備" style="max-height: 430px; display:block; margin:0 auto;" />

図の斜めの直線は $C(\mathbf A)$ の2次元版、つまりモデルが作れる出力の集合を表している。観測 $\mathbf b$ はその直線の外側にあるため、$\mathbf A\mathbf x=\mathbf b$ を厳密に満たす $\mathbf x$ は存在しない。

直線上の点 $\hat{\mathbf b}$ は $\mathbf b$ の直交射影である。残差

$$
\mathbf r=\mathbf b-\hat{\mathbf b}
$$

が直線と直角になっているのは、Topic 17で証明した「直交射影が最短点になる」という性質そのもの。

full-column-rankの場合、後で定義する

$$
\mathbf A^+=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
$$

を使うと

$$
\hat{\mathbf x}=\mathbf A^+\mathbf b,
\qquad
\hat{\mathbf b}=\mathbf A\mathbf A^+\mathbf b
$$

と書ける。したがって図の $\mathbf A\mathbf A^+\mathbf b$ は出力空間上の射影点であり、$\mathbf A^+\mathbf b$ 自体はその射影点を作る**係数ベクトル**である。この二つは存在する空間も次元も違う。

## 記号・型・次元

このTopicでは

- $\mathbf A\in\mathbb R^{m\times n}$：design matrix。$m\ge n$ を想定する。
- $\mathbf b\in\mathbb R^m$：観測ベクトル。
- $\mathbf x\in\mathbb R^n$：未知係数。
- $\hat{\mathbf x}\in\mathbb R^n$：least-squares solution。
- $\hat{\mathbf b}=\mathbf A\hat{\mathbf x}\in\mathbb R^m$：列空間上の最良近似。
- $\mathbf r=\mathbf b-\hat{\mathbf b}\in\mathbb R^m$：残差。
- $\mathbf A=\mathbf Q\mathbf R$：thin QR分解。
- $\mathbf Q\in\mathbb R^{m\times n}$：orthonormal columnsを持つ行列。
- $\mathbf R\in\mathbb R^{n\times n}$：上三角行列。

とする。

このTopicの前半では、$\mathbf A$ の $n$ 本の列が線形独立、すなわち

$$
N(\mathbf A)=\{\mathbf0\}
$$

である場合を扱う。この条件をfull-column-rankと呼ぶ。

## 1. 出発点：何を最小化しているのか

least squaresでは

$$
\boxed{
f(\mathbf x)=\|\mathbf A\mathbf x-\mathbf b\|_2^2
}
$$

を最小にする $\mathbf x$ を探す。

ここで

$$
\mathbf A\mathbf x-\mathbf b=-\mathbf r
$$

なので、二乗ノルムは

$$
\|\mathbf A\mathbf x-\mathbf b\|_2^2
=\|\mathbf r\|_2^2.
$$

符号はノルム二乗に影響しない。したがって「予測と観測の差の二乗和を最小にする」と「残差ベクトルのEuclidean lengthを最小にする」は同じ問題である。

## 2. なぜ最適残差は列空間へ直交するのか

$\hat{\mathbf b}=\mathbf A\hat{\mathbf x}$ を最良近似点とする。$\hat{\mathbf b}\in C(\mathbf A)$ である。

もし残差 $\mathbf r=\mathbf b-\hat{\mathbf b}$ が列空間に直交していなければ、列空間内に $\mathbf r$ と同方向の成分を持つ $\mathbf w$ が存在する。その方向へ $\hat{\mathbf b}$ を少し動かせば $\mathbf b$ との距離をさらに短くできる。したがって最短点では

$$
\mathbf r\perp C(\mathbf A)
$$

でなければならない。

より厳密には、任意の $\mathbf w\in C(\mathbf A)$ に対して $\mathbf r^T\mathbf w=0$。特に $\mathbf A$ の各列 $\mathbf a_j$ は列空間内なので

$$
\mathbf a_j^T\mathbf r=0
\qquad (j=1,\ldots,n).
$$

これをまとめると

$$
\boxed{\mathbf A^T\mathbf r=\mathbf0}.
$$

## 3. normal equationを1行ずつ導く

残差の定義

$$
\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}
$$

を直交条件へ代入する。

$$
\mathbf A^T(\mathbf b-\mathbf A\hat{\mathbf x})=\mathbf0.
$$

分配法則で展開すると

$$
\mathbf A^T\mathbf b
-\mathbf A^T\mathbf A\hat{\mathbf x}
=\mathbf0.
$$

第2項を右辺へ移して

$$
\boxed{
\mathbf A^T\mathbf A\hat{\mathbf x}
=\mathbf A^T\mathbf b
}.
$$

これがnormal equationである。

重要なのは、これは新しい近似式ではないこと。最短点での直交条件を、行列で書き直した**必要条件**である。このleast-squares objectiveは凸な二次関数なので、この条件を満たす点がglobal minimizerになる。

## 4. なぜfull-column-rankなら $\mathbf A^T\mathbf A$ が可逆なのか

ここが省略されやすい部分である。

$\mathbf A$ の列が線形独立と仮定する。任意の非零ベクトル

$$
\mathbf z\in\mathbb R^n,\qquad \mathbf z\ne\mathbf0
$$

を取る。

二次形式を計算する。

$$
\begin{aligned}
\mathbf z^T\mathbf A^T\mathbf A\mathbf z
&=(\mathbf A\mathbf z)^T(\mathbf A\mathbf z)\\
&=\|\mathbf A\mathbf z\|_2^2.
\end{aligned}
$$

$\mathbf A$ の列が独立であることは

$$
\mathbf A\mathbf z=\mathbf0
\quad\Longrightarrow\quad
\mathbf z=\mathbf0
$$

と同値である。いま $\mathbf z\ne0$ なので

$$
\mathbf A\mathbf z\ne\mathbf0.
$$

したがって

$$
\|\mathbf A\mathbf z\|_2^2>0.
$$

よってすべての非零 $\mathbf z$ について

$$
\mathbf z^T\mathbf A^T\mathbf A\mathbf z>0.
$$

つまり $\mathbf A^T\mathbf A$ はpositive definiteである。Topic 24でpositive definite matrixは可逆であることを体系的に学ぶが、ここではnull spaceから直接確認することもできる。

もし

$$
\mathbf A^T\mathbf A\mathbf z=\mathbf0
$$

なら、左から $\mathbf z^T$ を掛けて

$$
\|\mathbf A\mathbf z\|_2^2=0.
$$

よって $\mathbf A\mathbf z=0$、full-column-rankより $\mathbf z=0$。したがって

$$
N(\mathbf A^T\mathbf A)=\{0\}.
$$

$\mathbf A^T\mathbf A$ は $n\times n$ の正方行列なので可逆である。

## 5. ここで初めて inverse を掛けてよい

normal equation

$$
\mathbf A^T\mathbf A\hat{\mathbf x}
=\mathbf A^T\mathbf b
$$

の左から $(\mathbf A^T\mathbf A)^{-1}$ を掛ける。

$$
(\mathbf A^T\mathbf A)^{-1}
\mathbf A^T\mathbf A\hat{\mathbf x}
=
(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b.
$$

左辺はidentityになるので

$$
\boxed{
\hat{\mathbf x}
=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b
}.
$$

この式で最も重要なのは逆行列記号ではない。**なぜ逆行列が存在するかを先に証明したから、この操作が正当化された**という論理順序である。

## 6. full-column-rankの場合の擬似逆

ここで

$$
\boxed{
\mathbf A^+
=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
}
$$

と置く。この式は $\mathbf A$ がfull-column-rankのときのMoore–Penrose pseudoinverseと一致する。

shapeを確認すると

$$
(n\times n)(n\times m)=n\times m
$$

なので

$$
\mathbf A^+\in\mathbb R^{n\times m}.
$$

つまり $\mathbf A$ が

$$
\mathbb R^n\to\mathbb R^m
$$

へ写すのに対し、$\mathbf A^+$ は逆向きに

$$
\mathbb R^m\to\mathbb R^n
$$

へ写す。

そして

$$
\hat{\mathbf x}=\mathbf A^+\mathbf b.
$$

### なぜ「inverseに似ている」のか

計算すると

$$
\begin{aligned}
\mathbf A^+\mathbf A
&=(\mathbf A^T\mathbf A)^{-1}
\mathbf A^T\mathbf A\\
&=\mathbf I_n.
\end{aligned}
$$

したがって入力側では完全に元へ戻せる。$\mathbf A$ がfull-column-rankなら、異なる入力を同じ出力へ潰さないからである。

一方、一般に $m>n$ なら

$$
\mathbf A\mathbf A^+\ne\mathbf I_m.
$$

これは不具合ではない。$\mathbf A$ が作れる出力は $m$ 次元空間全体ではなく、$n$ 次元以下の列空間だけだからである。

## 7. なぜ $\mathbf A\mathbf A^+$ が射影行列になるのか

full-column-rankの場合

$$
\mathbf P
=\mathbf A\mathbf A^+
=\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T.
$$

これはTopic 15で導いたcolumn-space projection matrixと同じ。

任意の $\mathbf b$ に対して

$$
\hat{\mathbf b}=\mathbf P\mathbf b
=\mathbf A\mathbf A^+\mathbf b
$$

が列空間への射影になる。

### 射影らしさを $P^2=P$ で確認する

$$
\begin{aligned}
\mathbf P^2
&=\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\\
&=\mathbf A(\mathbf A^T\mathbf A)^{-1}
(\mathbf A^T\mathbf A)
(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\\
&=\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\\
&=\mathbf P.
\end{aligned}
$$

一度列空間へ射影した点は、もう一度射影しても動かない。この幾何学的事実が $\mathbf P^2=\mathbf P$ に現れている。

## 8. QRではなぜ $R\hat x=Q^Tb$ になるのか

full-column-rankのthin QR分解

$$
\mathbf A=\mathbf Q\mathbf R,
$$

$$
\mathbf Q^T\mathbf Q=\mathbf I_n
$$

を使う。

$\mathbf Q$ の列は $C(\mathbf A)$ のorthonormal basisなので、最適残差は $\mathbf Q$ の各列へ直交する。

$$
\mathbf Q^T(\mathbf b-\mathbf A\hat{\mathbf x})=\mathbf0.
$$

$\mathbf A=\mathbf Q\mathbf R$ を代入する。

$$
\mathbf Q^T(\mathbf b-\mathbf Q\mathbf R\hat{\mathbf x})=\mathbf0.
$$

展開する。

$$
\mathbf Q^T\mathbf b
-\mathbf Q^T\mathbf Q\mathbf R\hat{\mathbf x}
=\mathbf0.
$$

$\mathbf Q^T\mathbf Q=\mathbf I_n$ より

$$
\mathbf Q^T\mathbf b-
\mathbf R\hat{\mathbf x}=\mathbf0.
$$

したがって

$$
\boxed{
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b
}.
$$

$\mathbf R$ はupper triangularなのでback substitutionで解ける。

## 9. normal equationとQRはなぜ同じ答えになるのか

normal equationへ $\mathbf A=\mathbf Q\mathbf R$ を代入して確認する。

$$
\mathbf A^T\mathbf A
=(\mathbf Q\mathbf R)^T(\mathbf Q\mathbf R).
$$

転置の順序に注意して

$$
(\mathbf Q\mathbf R)^T
=\mathbf R^T\mathbf Q^T.
$$

したがって

$$
\begin{aligned}
\mathbf A^T\mathbf A
&=\mathbf R^T\mathbf Q^T\mathbf Q\mathbf R\\
&=\mathbf R^T\mathbf R.
\end{aligned}
$$

また

$$
\mathbf A^T\mathbf b
=\mathbf R^T\mathbf Q^T\mathbf b.
$$

normal equationは

$$
\mathbf R^T\mathbf R\hat{\mathbf x}
=\mathbf R^T\mathbf Q^T\mathbf b.
$$

full-column-rankなら $\mathbf R$ も可逆なので $\mathbf R^T$ も可逆。左から $(\mathbf R^T)^{-1}$ を掛けて

$$
\boxed{
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b
}
$$

を得る。

つまり二つの方法は偶然同じ数値を返すのではない。同じ直交条件を、異なる座標・計算経路で解いている。

## 10. 数値例を最後まで解く

$$
\mathbf A=
\begin{bmatrix}
1&0\\
1&1\\
1&2
\end{bmatrix},
\qquad
\mathbf b=
\begin{bmatrix}
1\\2\\2
\end{bmatrix}.
$$

### Step 1: $\mathbf A^T\mathbf A$ と $\mathbf A^T\mathbf b$

$$
\mathbf A^T\mathbf A
=
\begin{bmatrix}
3&3\\
3&5
\end{bmatrix},
$$

$$
\mathbf A^T\mathbf b
=
\begin{bmatrix}
5\\6
\end{bmatrix}.
$$

したがって

$$
\begin{bmatrix}
3&3\\3&5
\end{bmatrix}
\begin{bmatrix}
\hat x_1\\\hat x_2
\end{bmatrix}
=
\begin{bmatrix}5\\6\end{bmatrix}.
$$

### Step 2: 2本の方程式を解く

$$
3\hat x_1+3\hat x_2=5,
$$

$$
3\hat x_1+5\hat x_2=6.
$$

第2式から第1式を引くと

$$
2\hat x_2=1,
$$

$$
\hat x_2=\frac12.
$$

これを第1式へ戻す。

$$
3\hat x_1+\frac32=5,
$$

$$
3\hat x_1=\frac72,
$$

$$
\hat x_1=\frac76.
$$

よって

$$
\boxed{
\hat{\mathbf x}
=\begin{bmatrix}7/6\\1/2\end{bmatrix}
}.
$$

### Step 3: 射影点を計算する

$$
\hat{\mathbf b}
=\mathbf A\hat{\mathbf x}
=
\begin{bmatrix}
7/6\\5/3\\13/6
\end{bmatrix}.
$$

### Step 4: 残差を計算する

$$
\mathbf r
=\mathbf b-\hat{\mathbf b}
=
\begin{bmatrix}
-1/6\\1/3\\-1/6
\end{bmatrix}.
$$

### Step 5: 直交条件で検算する

$$
\mathbf A^T\mathbf r
=
\begin{bmatrix}
1&1&1\\
0&1&2
\end{bmatrix}
\begin{bmatrix}
-1/6\\1/3\\-1/6
\end{bmatrix}.
$$

第1成分は

$$
-\frac16+\frac13-\frac16=0.
$$

第2成分は

$$
\frac13-\frac{2}{6}=0.
$$

したがって

$$
\boxed{\mathbf A^T\mathbf r=\mathbf0}.
$$

求めた解は、単に連立方程式を解いた答えではなく、残差が列空間に直交する最小二乗解であることまで確認できた。

## 11. なぜ実装で $(A^TA)^{-1}A^Tb$ をそのまま計算しないのか

数学的には

$$
\hat{\mathbf x}
=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b
$$

は正しい。しかし数値計算では通常、

1. $\mathbf A^T\mathbf A$ を明示的に作る。
2. その逆行列を明示的に作る。

という二段階を避ける。

理由は二つある。

第一に、$\mathbf A^T\mathbf A$ を作ると、列どうしがほぼ従属な場合の数値的な悪条件が強く現れる。これをcondition numberで定量化するのはTopic 29で行う。

第二に、方程式を解くために逆行列全体を求める必要はない。QR分解を使えば

$$
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b
$$

という三角系を直接解ける。

したがって、

- 理論を説明する式
- 実際に計算するalgorithm

を区別する。

## 12. rank不足では何が壊れるのか

ここでは一般擬似逆をまだ導入せず、何が問題になるかだけを既習事項で確認する。

$$
\mathbf A=
\begin{bmatrix}
1&1\\
2&2
\end{bmatrix}
$$

とする。第2列は第1列と同じなので列は線形従属。

$$
\mathbf A^T\mathbf A
=
\begin{bmatrix}
5&5\\5&5
\end{bmatrix}.
$$

この行列の列も従属なので逆行列は存在しない。したがって

$$
(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b
$$

というfull-column-rank用の式は書けない。

さらに

$$
\mathbf A
\begin{bmatrix}1\\-1\end{bmatrix}
=\mathbf0.
$$

したがって、ある $\mathbf x_0$ が一つの最小二乗解なら

$$
\mathbf x_0+t
\begin{bmatrix}1\\-1\end{bmatrix}
$$

もすべて同じ出力を作る。係数が非一意になる原因はnull space方向にある。

ここで「どの解を代表として選ぶか」という新しい問題が生じる。しかし、その選び方を正当に導くにはSVDが最も明快である。よってこの問題は保留し、Topic 26→27の順で解決する。

## 成立条件・壊れる場合

- $(\mathbf A^T\mathbf A)^{-1}\mathbf A^T$ を使えるのは、$\mathbf A$ がfull-column-rankのとき。
- shapeが合っていても列が従属なら $\mathbf A^T\mathbf A$ はsingularである。
- $\mathbf A^+\mathbf A=\mathbf I_n$ はこのTopicのfull-column-rank設定では成立するが、rank不足では一般に成立しない。
- $\mathbf A\mathbf A^+=\mathbf I_m$ と考えてはいけない。$m>n$ では通常、これはcolumn-space projectorである。
- 理論上のclosed formと数値的に推奨されるalgorithmを区別する。

## ここから先へ進む順序

このTopicの時点で理解すべき到達点は

$$
\text{projection}
\rightarrow
\text{normal equation}
\rightarrow
\text{full-column-rank}
\rightarrow
(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
\rightarrow
\text{QR solution}
$$

までである。

その後は

1. Topic 19：weighted least squaresへ拡張する。
2. Topic 20–25：determinant、eigenvalue、symmetric matrix、positive definitenessを学ぶ。
3. Topic 26：$\mathbf A^T\mathbf A$ の固有構造からSVDを導く。
4. Topic 27：SVDを使って一般の $\mathbf A^+$ を定義し、rank不足・minimum-norm solutionを完全に説明する。

という順序で進む。

## テストで説明できる状態の目安

このTopicでは、次の問いに式を見ず答えられる状態を目標にする。

- 最小二乗で残差がなぜ列空間へ直交するのか。
- $\mathbf A^T\mathbf A$ がなぜ現れるのか。
- full-column-rankなら $\mathbf A^T\mathbf A$ がなぜ可逆なのか。
- $(\mathbf A^T\mathbf A)^{-1}\mathbf A^T$ のshapeと役割は何か。
- $\mathbf A^+\mathbf A=\mathbf I_n$ なのに、なぜ $\mathbf A\mathbf A^+$ は通常 $\mathbf I_m$ でないのか。
- QRから $\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b$ をどう導くか。
- rank不足では、どの証明・式が壊れるのか。

## 外部教材との照合

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Georgia Tech Interactive Linear Algebra — Least Squares](https://textbooks.math.gatech.edu/ila/least-squares.html)

MIT 18.06の射影・least squaresの流れと、MIT 18.065の複数のleast-squares solution methodsを照合しつつ、本教材では各式の間をより細かく補っている。

## 演習

[このTopicの10問の演習](/exercises/la-least-squares-computation-pseudoinverse)
