# 内積・ノルム・角度：教科書

Course 02｜線形代数｜Topic 13/29

## このTopicの位置づけ

ここまでの線形代数は「どのベクトルを作れるか」という代数的構造が中心だった。最小二乗へ進むには「どちらが近いか」「二つの方向が直交するか」という幾何を数値化する必要がある。その役割を内積とノルムが担う。

**前提知識**：ベクトル、線形結合。

## まず直感を作る

内積は二つのベクトルがどの程度同じ方向を向いているかを一つの数で表す。正なら鋭角、0なら直角、負なら鈍角。自分自身との内積を平方根にすると長さが得られる。

## 図の解説

<img src="/visuals/course-02/la-inner-products-norms-angles.png" alt="内積・ノルム・角度の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の $\mathbf u$ と $\mathbf v$ の間の角を $\theta$ としている。二つの長さが同じでも角度が変われば内積が変わり、角度が90度なら $\cos\theta=0$ なので内積も0になる。

式 $\mathbf u^T\mathbf v=\|\mathbf u\|\|\mathbf v\|\cos\theta$ は、内積を「長さ×長さ×方向の一致度」と分解している。

## 記号・型・次元

- $\mathbf u,\mathbf v\in\mathbb R^n$。
- $\langle\mathbf u,\mathbf v\rangle=\mathbf u^T\mathbf v$：標準内積。
- $\|\mathbf v\|_2$：Euclidean norm。
- $\theta$：二ベクトルのなす角。


## 正式な定義

$$
\langle\mathbf u,\mathbf v\rangle
=\mathbf u^T\mathbf v
=\sum_{i=1}^{n}u_iv_i,
$$

$$
\|\mathbf v\|_2=\sqrt{\mathbf v^T\mathbf v}.
$$

非零ベクトルについて

$$
\cos\theta=\frac{\mathbf u^T\mathbf v}{\|\mathbf u\|_2\|\mathbf v\|_2}.
$$

## なぜこの式・定理になるのか

### Cauchy–Schwarz不等式から角度が定義できる

角度の式で右辺が $[-1,1]$ に入らなければ $\cos\theta$ として解釈できない。その保証がCauchy–Schwarz不等式

$$
|\mathbf u^T\mathbf v|\le\|\mathbf u\|_2\|\mathbf v\|_2
$$

である。

簡単な導出として、任意の実数$t$について

$$
0\le\|\mathbf u-t\mathbf v\|_2^2
=\|\mathbf u\|_2^2-2t\mathbf u^T\mathbf v+t^2\|\mathbf v\|_2^2.
$$

右辺は$t$の二次式で、すべての$t$で非負だから判別式は0以下：

$$
4(\mathbf u^T\mathbf v)^2-4\|\mathbf u\|_2^2\|\mathbf v\|_2^2\le0.
$$

整理してCauchy–Schwarzが得られる。

### 直交

$\mathbf u^T\mathbf v=0$ のとき、非零なら $\cos\theta=0$ なので $\theta=90^\circ$。したがって内積0を直交の代数的定義にできる。

## 小さな数値例を最後まで計算する

$\mathbf u=(1,2)^T$、$\mathbf v=(2,-1)^T$ なら

$$
\mathbf u^T\mathbf v=1\cdot2+2\cdot(-1)=0.
$$

したがって直交する。また $\|\mathbf u\|_2=\sqrt5$、$\|\mathbf v\|_2=\sqrt5$。

## もう一段丁寧に：内積から長さと角度が生まれる

### 1. Euclidean inner product

$\mathbf x,\mathbf y\in\mathbb R^n$ に対して

$$
\langle\mathbf x,\mathbf y\rangle
=\mathbf x^T\mathbf y
=\sum_{i=1}^n x_i y_i
$$

と定義する。これは単に成分積を足す式ではなく、二つのベクトルがどの程度同じ方向を向くかを測る量である。

### 2. 長さが内積から出る理由

自分自身との内積は

$$
\mathbf x^T\mathbf x=x_1^2+\cdots+x_n^2\ge0.
$$

そこで

$$
\|\mathbf x\|_2=\sqrt{\mathbf x^T\mathbf x}
$$

と定義すると、2次元・3次元ではPythagorasの定理の長さと一致する。

### 3. 角度公式を導く

$\mathbf x$ と $\mathbf y$ が作る角を $\theta$ とする。三角形の余弦定理から

$$
\|\mathbf x-\mathbf y\|_2^2
=\|\mathbf x\|_2^2+\|\mathbf y\|_2^2
-2\|\mathbf x\|_2\|\mathbf y\|_2\cos\theta.
$$

一方、左辺を内積で展開すると

$$
(\mathbf x-\mathbf y)^T(\mathbf x-\mathbf y)
=\|\mathbf x\|_2^2+\|\mathbf y\|_2^2-2\mathbf x^T\mathbf y.
$$

比較して

$$
\boxed{
\cos\theta=
\frac{\mathbf x^T\mathbf y}{\|\mathbf x\|_2\|\mathbf y\|_2}
}
$$

を得る。したがって $\mathbf x^T\mathbf y=0$ は $\cos\theta=0$、すなわち直交を意味する。

### 4. Cauchy–Schwarz inequalityは角度が定義可能であることを保証する

角度公式の右辺が $[-1,1]$ に入るには

$$
|\mathbf x^T\mathbf y|
\le \|\mathbf x\|_2\|\mathbf y\|_2
$$

が必要で、これがCauchy–Schwarz inequalityである。一つの証明は、任意の実数 $t$ に対し

$$
\|\mathbf x-t\mathbf y\|_2^2\ge0
$$

を使うこと。左辺は $t$ の二次式なので、その判別式が正になりすぎない条件から上の不等式が得られる。

### 5. 直交するとPythagorasが成立する

$\mathbf x^T\mathbf y=0$ なら

$$
\|\mathbf x+\mathbf y\|_2^2
=(\mathbf x+\mathbf y)^T(\mathbf x+\mathbf y)
=\|\mathbf x\|_2^2+\|\mathbf y\|_2^2.
$$

この関係が、射影で「残差と射影成分を直交分解すると距離が最小になる」証明の核心になる。

## 成立条件・壊れる場合

角度の式はゼロベクトルでは分母が0になるため定義できない。ただし内積とノルム自体はゼロベクトルにも定義される。

## ここから発展

標準内積だけでなく、正定値行列 $\mathbf W$ を使った $\langle\mathbf x,\mathbf y\rangle_{\mathbf W}=\mathbf x^T\mathbf W\mathbf y$ も内積になる。これはWLSの幾何へつながるが、正定値性を十分理解した後に一般化する。


## このTopicの理解確認

- 余弦定理とinner productの展開からcosine formulaを導けるか。
- $\mathbf x^T\mathbf y=0$ が直交を意味する理由を説明できるか。
- orthogonalityからPythagorean identityを導けるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-inner-products-norms-angles)
