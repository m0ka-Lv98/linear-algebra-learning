# 直交射影：教科書

Course 02｜線形代数｜Topic 15/29

## このTopicの位置づけ

最小二乗は「作れない $\mathbf b$ に最も近い作れるベクトルを選ぶ」問題である。その「最も近い点」を決める操作が直交射影。まず1本の直線への射影を導き、その後部分空間へ一般化する。

**前提知識**：内積、直交、正規直交基底。

## まず直感を作る

光を真上から当てたときの影のように、ベクトル $\mathbf b$ をある直線へ最短距離で落とす。最短点への差ベクトルは、その直線に対して直角になる。

## 図の解説

<img src="/visuals/course-02/orthogonal-projection.png" alt="直交射影の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の斜めの直線が $\operatorname{span}\{\mathbf a\}$、$\mathbf b$ が射影したいベクトル、直線上の $\mathbf p$ が射影結果である。残差 $\mathbf e=\mathbf b-\mathbf p$ は直線に垂直に描かれている。

「最短」という距離の条件を直接微分しなくても、最短点で残差が直線に直交するという幾何条件 $\mathbf a^T\mathbf e=0$ から係数を導ける。

## 記号・型・次元

- $\mathbf a\in\mathbb R^m$：非零の方向ベクトル。
- $\mathbf b\in\mathbb R^m$：射影したいベクトル。
- $\mathbf p$：射影結果。
- $\mathbf e=\mathbf b-\mathbf p$：残差。
- $\mathbf Q\in\mathbb R^{m\times k}$：部分空間の正規直交基底を列に持つ行列。


## 正式な定義

1次元部分空間 $\operatorname{span}\{\mathbf a\}$ への射影は

$$
\operatorname{proj}_{\mathbf a}(\mathbf b)
=\frac{\mathbf a^T\mathbf b}{\mathbf a^T\mathbf a}\mathbf a.
$$

$\mathbf Q$ の列が正規直交なら、その列空間への射影は

$$
\mathbf p=\mathbf Q\mathbf Q^T\mathbf b.
$$

## なぜこの式・定理になるのか

### 1本の直線への射影式を導く

射影結果は直線上なので

$$
\mathbf p=c\mathbf a
$$

と書ける。最短点では残差

$$
\mathbf e=\mathbf b-c\mathbf a
$$

が $\mathbf a$ に直交するから

$$
\mathbf a^T(\mathbf b-c\mathbf a)=0.
$$

展開して

$$
\mathbf a^T\mathbf b-c\mathbf a^T\mathbf a=0,
$$

よって

$$
c=\frac{\mathbf a^T\mathbf b}{\mathbf a^T\mathbf a}.
$$

これを $\mathbf p=c\mathbf a$ へ代入して射影式が得られる。

### 正規直交基底への一般化

部分空間の正規直交基底を $\mathbf q_1,\ldots,\mathbf q_k$ とすると、各方向の係数は $\mathbf q_i^T\mathbf b$。したがって

$$
\mathbf p=\sum_{i=1}^k(\mathbf q_i^T\mathbf b)\mathbf q_i
=\mathbf Q\mathbf Q^T\mathbf b.
$$

射影行列を $\mathbf P=\mathbf Q\mathbf Q^T$ とすると $\mathbf P^T=\mathbf P$、$\mathbf P^2=\mathbf P$。二度射影しても結果が変わらないことを $\mathbf P^2=\mathbf P$ が表す。

## 小さな数値例を最後まで計算する

$\mathbf a=(2,1)^T$、$\mathbf b=(1,3)^T$ とすると

$$
c=\frac{2\cdot1+1\cdot3}{2^2+1^2}=\frac55=1.
$$

よって $\mathbf p=(2,1)^T$、残差 $\mathbf e=(-1,2)^T$。確認すると

$$
\mathbf a^T\mathbf e=2(-1)+1(2)=0.
$$

## もう一段丁寧に：射影公式を暗記せず最短距離から導く

### 1. 直線への射影

非零ベクトル $\mathbf a\in\mathbb R^m$ が張る直線

$$
W=\operatorname{span}(\mathbf a)
$$

へ $\mathbf b\in\mathbb R^m$ を射影する。射影点は直線上なので必ず $c\mathbf a$ と書ける。最短点では残差

$$
\mathbf r=\mathbf b-c\mathbf a
$$

が直線方向 $\mathbf a$ と直交するから

$$
\mathbf a^T(\mathbf b-c\mathbf a)=0.
$$

展開して

$$
\mathbf a^T\mathbf b-c\mathbf a^T\mathbf a=0,
$$

したがって

$$
\boxed{c=\frac{\mathbf a^T\mathbf b}{\mathbf a^T\mathbf a}}.
$$

よって

$$
\boxed{
\operatorname{proj}_{\mathbf a}(\mathbf b)
=\frac{\mathbf a^T\mathbf b}{\mathbf a^T\mathbf a}\mathbf a
}.
$$

### 2. なぜ直交条件が最短距離を保証するのか

任意の別の点 $\mathbf p+\mathbf w\in W$ を考える。ここで $\mathbf p$ が直交射影、$\mathbf w\in W$。$\mathbf b-\mathbf p$ は $W$ に直交するので $\mathbf w$ とも直交し、Pythagorasから

$$
\|\mathbf b-(\mathbf p+\mathbf w)\|_2^2
=\|\mathbf b-\mathbf p\|_2^2+\|\mathbf w\|_2^2
\ge\|\mathbf b-\mathbf p\|_2^2.
$$

等号は $\mathbf w=0$ のときだけ。したがって $\mathbf p$ が一意な最短点である。

### 3. 列空間への一般化

full-column-rankの $\mathbf A\in\mathbb R^{m\times n}$ に対し、射影点を $\mathbf p=\mathbf A\hat{\mathbf x}$ と置く。残差が列空間全体へ直交する条件は

$$
\mathbf A^T(\mathbf b-\mathbf A\hat{\mathbf x})=\mathbf0.
$$

よって

$$
\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b.
$$

$\mathbf A$ がfull-column-rankなら $\mathbf A^T\mathbf A$ は可逆なので

$$
\hat{\mathbf x}=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b.
$$

したがって射影行列は

$$
\boxed{
\mathbf P=\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
}.
$$

### 4. なぜ $P^2=P$ なのか

一度列空間へ射影したベクトルはすでに列空間内にあるので、もう一度射影しても変わらない。式でも

$$
\mathbf P^2
=\mathbf A(\mathbf A^T\mathbf A)^{-1}
\mathbf A^T\mathbf A
(\mathbf A^T\mathbf A)^{-1}\mathbf A^T
=\mathbf P.
$$

このidempotent性は「射影である」ことの代数的特徴である。

## 成立条件・壊れる場合

$\mathbf a=0$ では分母が0となり直線方向が定まらない。$\mathbf Q\mathbf Q^T$ の簡単な式は $\mathbf Q$ の列が正規直交であるとき。一般の独立列 $\mathbf A$ に対する射影は後の最小二乗から $\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T$ と導く。

## ここから発展

射影を「直交分解 $\mathbf b=\mathbf p+\mathbf e$」として理解すると、Fourier展開、最小二乗、PCAなど多くの近似問題が同じ構造に見える。


## このTopicの理解確認

- line projectionの係数を残差直交条件から導けるか。
- 直交射影が最短点であることをPythagorasで証明できるか。
- $P^2=P$ が「二度射影しても動かない」ことを表すと説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/orthogonal-projection)
