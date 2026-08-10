# 最小二乗法の幾何：教科書

Course 02｜線形代数｜Topic 17/29

## このTopicの位置づけ

$\mathbf A\mathbf x=\mathbf b$ が解けないのは $\mathbf b\notin C(\mathbf A)$ だからだった。そこで「完全一致」を諦め、$C(\mathbf A)$ の中で $\mathbf b$ に最も近い $\mathbf A\mathbf x$ を選ぶ。これがleast squares（最小二乗法）。

**前提知識**：列空間、直交射影、QR。

## まず直感を作る

未知ベクトル $\mathbf x$ を直接 $\mathbf b$ に近づけるのではなく、$\mathbf A\mathbf x$ という**モデルが作れる出力**を $\mathbf b$ に近づける。モデル出力は列空間から出られないので、最善は $\mathbf b$ の列空間への直交射影になる。

## 図の解説

<img src="/visuals/course-02/la-least-squares-geometry.png" alt="最小二乗法の幾何の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の斜めの直線が $C(\mathbf A)$、$\mathbf b$ は列空間の外にある観測ベクトル、$\mathbf A\hat{\mathbf x}$ が列空間上の最短点である。残差 $\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}$ は列空間へ垂直に描かれている。

列空間の全ての方向は $\mathbf A$ の列の線形結合なので、残差が列空間に直交する条件は「全ての列との内積が0」、すなわち $\mathbf A^T\mathbf r=0$ とまとめられる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$：モデル行列。
- $\mathbf b\in\mathbb R^m$：観測ベクトル。
- $\hat{\mathbf x}\in\mathbb R^n$：least-squares solution。
- $\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}$：残差。


## 正式な定義

最小二乗解は

$$
\hat{\mathbf x}\in\arg\min_{\mathbf x\in\mathbb R^n}
\|\mathbf A\mathbf x-\mathbf b\|_2^2
$$

を満たす $\mathbf x$ である。

## なぜこの式・定理になるのか

### 幾何からnormal equationを導く

最小二乗では $\mathbf A\hat{\mathbf x}$ が $\mathbf b$ の $C(\mathbf A)$ への直交射影になる。したがって残差

$$
\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}
$$

は列空間に直交する。

$\mathbf A$ の各列を $\mathbf a_j$ とすれば

$$
\mathbf a_j^T\mathbf r=0
\quad(j=1,\ldots,n).
$$

これをまとめると

$$
\mathbf A^T\mathbf r=\mathbf0.
$$

$\mathbf r$ を代入して

$$
\mathbf A^T(\mathbf b-\mathbf A\hat{\mathbf x})=\mathbf0,
$$

よって

$$
\boxed{\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b}.
$$

これがnormal equations（正規方程式）。式を暗記するより、「残差を列空間へ直交させる」から作る方が意味を失わない。

### 微分からも同じ式が出る

目的関数を

$$
f(\mathbf x)=\|\mathbf A\mathbf x-\mathbf b\|_2^2
$$

とすると

$$
f(\mathbf x)
=(\mathbf A\mathbf x-\mathbf b)^T(\mathbf A\mathbf x-\mathbf b).
$$

展開して

$$
f(\mathbf x)=\mathbf x^T\mathbf A^T\mathbf A\mathbf x-2\mathbf b^T\mathbf A\mathbf x+\mathbf b^T\mathbf b.
$$

勾配は

$$
\nabla f(\mathbf x)=2\mathbf A^T\mathbf A\mathbf x-2\mathbf A^T\mathbf b.
$$

停留条件 $\nabla f=0$ から同じ正規方程式が得られる。

## 小さな数値例を最後まで計算する

$\mathbf A=(1,1)^T\in\mathbb R^{2\times1}$、$\mathbf b=(2,0)^T$ とする。モデル出力は $x(1,1)^T$ なので、対角線上の点しか作れない。

正規方程式は

$$
[1\ 1]\begin{bmatrix}1\\1\end{bmatrix}\hat x
=[1\ 1]\begin{bmatrix}2\\0\end{bmatrix}
$$

より $2\hat x=2$、$\hat x=1$。したがって射影は $(1,1)^T$、残差 $(1,-1)^T$。確かに $(1,1)^T\cdot(1,-1)^T=0$。

## もう一段丁寧に：最小二乗は「解けない方程式」をどう置き換えているか

### 1. まず「何が解けない」のかを列空間で言い直す

$\mathbf A\in\mathbb R^{m\times n}$、$\mathbf b\in\mathbb R^m$ とする。厳密な方程式

$$
\mathbf A\mathbf x=\mathbf b
$$

が解を持つのは $\mathbf b\in C(\mathbf A)$ のときだけである。観測誤差やモデルの不足があると $\mathbf b$ は列空間の外に出る。その場合「存在しない厳密解」を探し続けるのではなく、列空間内で $\mathbf b$ に最も近い点を探す。

### 2. 最も近い点が直交射影になる証明

列空間内の候補を $\mathbf p=\mathbf A\hat{\mathbf x}$ とし、残差を

$$
\mathbf r=\mathbf b-\mathbf p
$$

と置く。$\mathbf p$ が最短点なら $\mathbf r$ は列空間に直交する。これを逆向きにも証明する。

任意の別候補 $\mathbf p+\mathbf w$（$\mathbf w\in C(\mathbf A)$）に対し、$\mathbf r\perp\mathbf w$ なら

$$
\begin{aligned}
\|\mathbf b-(\mathbf p+\mathbf w)\|_2^2
&=\|\mathbf r-\mathbf w\|_2^2\\
&=\|\mathbf r\|_2^2+\|\mathbf w\|_2^2\\
&\ge \|\mathbf r\|_2^2.
\end{aligned}
$$

したがって直交射影が最小二乗の幾何学的解である。

### 3. 残差が各列へ直交することからnormal equationを得る

列空間は $\mathbf A$ の列 $\mathbf a_1,\ldots,\mathbf a_n$ で張られる。$\mathbf r$ が列空間へ直交するとは

$$
\mathbf a_j^T\mathbf r=0\qquad(j=1,\ldots,n)
$$

がすべて成立すること。これらをまとめると

$$
\mathbf A^T\mathbf r=\mathbf0.
$$

$\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}$ を代入して

$$
\mathbf A^T(\mathbf b-\mathbf A\hat{\mathbf x})=\mathbf0,
$$

$$
\boxed{\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b}.
$$

これがnormal equationである。「微分したら出る公式」ではなく、最短距離の直交条件を座標で書いたものだと分かる。

### 4. 微分から導いて同じ結論を確認する

目的関数

$$
f(\mathbf x)=\|\mathbf A\mathbf x-\mathbf b\|_2^2
$$

を展開すると

$$
f(\mathbf x)
=\mathbf x^T\mathbf A^T\mathbf A\mathbf x
-2\mathbf b^T\mathbf A\mathbf x
+\mathbf b^T\mathbf b.
$$

$\mathbf A^T\mathbf A$ は対称なので

$$
\nabla f(\mathbf x)
=2\mathbf A^T\mathbf A\mathbf x-2\mathbf A^T\mathbf b.
$$

停留条件 $\nabla f(\hat{\mathbf x})=0$ から同じnormal equationを得る。幾何と微分が同じ式へ到達することを確認することで、公式の意味が固定される。

### 5. 最小二乗解は一意とは限らない

$\mathbf A$ の列が従属なら、ある $\mathbf z\ne0$ が $\mathbf A\mathbf z=0$ を満たす。すると

$$
\mathbf A(\hat{\mathbf x}+\mathbf z)
=\mathbf A\hat{\mathbf x}
$$

なので、同じ射影点を作る係数が複数存在する。**射影点 $\mathbf p$ は一意でも、係数 $\hat{\mathbf x}$ は一意でないことがある。** 次Topicの擬似逆は、この非一意な係数の中からどれを選ぶかまで扱う。

## 成立条件・壊れる場合

最小二乗解は常に存在するが、一意とは限らない。列が線形独立なら $\mathbf A^T\mathbf A$ は可逆で一意解が得られる。rank不足では同じ最小残差を与える $\mathbf x$ が複数存在しうる。

## ここから発展

次Topicでは、正規方程式をfull-column-rankの条件から丁寧に解き、QRから同じ最小二乗解が得られる理由を導く。rank不足の一般解法は、固有構造とSVDを学んだ後まで保留する。


## このTopicの理解確認

- inconsistent systemをcolumn-space projectionへ置き換える論理を説明できるか。
- 残差直交からnormal equationを導けるか。
- projection pointの一意性とcoefficientの一意性を区別できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-least-squares-geometry)
