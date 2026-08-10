# 擬似逆行列とrank不足系：教科書

Course 02｜線形代数｜Topic 27/29

## このTopicの位置づけ

Topic 18ではfull-column-rankの場合に限って擬似逆を導入した。SVDを正式に学んだ今、rank不足のとき何を逆にし、何を逆にしないかを厳密に説明できる。さらに $\mathbf A\mathbf A^+$ と $\mathbf A^+\mathbf A$ が射影になることも導ける。

**前提知識**：SVD、最小二乗、null space。

## まず直感を作る

rank不足では、入力の一部が完全に消える。消えた情報は出力から復元できない。擬似逆は「観測できる成分は正確に逆へ戻し、観測できないnull-space成分は勝手に推測せず0にする」という最も保守的な逆写像である。

## 図の解説

<img src="/visuals/course-02/la-pseudoinverse-rank-deficient-systems.png" alt="擬似逆行列とrank不足系の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では入力側の一つの方向が $\mathbf A$ で出力の0へ潰れ、別の方向だけが出力の列空間へ残る。擬似逆は残った出力成分を入力側のrow-space方向へ戻すが、消えたnull-space方向は復元しない。

したがってminimum-norm解ではnull-space成分が0になる。

## 記号・型・次元

- compact SVD：$\mathbf A=\mathbf U_r\mathbf\Sigma_r\mathbf V_r^T$。
- $r=\operatorname{rank}(\mathbf A)$。
- $\mathbf\Sigma_r=\operatorname{diag}(\sigma_1,\ldots,\sigma_r)$、全て正。
- $\mathbf A^+=\mathbf V_r\mathbf\Sigma_r^{-1}\mathbf U_r^T$。


## 正式な定義

SVDから

$$
\boxed{\mathbf A^+=\mathbf V\mathbf\Sigma^+\mathbf U^T}
$$

と定義する。Moore–Penrose擬似逆は次の4条件を満たす唯一の行列：

$$
\mathbf A\mathbf A^+\mathbf A=\mathbf A,
$$

$$
\mathbf A^+\mathbf A\mathbf A^+=\mathbf A^+,
$$

$$
(\mathbf A\mathbf A^+)^T=\mathbf A\mathbf A^+,
$$

$$
(\mathbf A^+\mathbf A)^T=\mathbf A^+\mathbf A.
$$

## なぜこの式・定理になるのか

### 出力空間側の射影 $\mathbf A\mathbf A^+$

compact SVDを使うと

$$
\mathbf A\mathbf A^+
=(\mathbf U_r\mathbf\Sigma_r\mathbf V_r^T)
(\mathbf V_r\mathbf\Sigma_r^{-1}\mathbf U_r^T).
$$

$\mathbf V_r^T\mathbf V_r=\mathbf I$、$\mathbf\Sigma_r\mathbf\Sigma_r^{-1}=\mathbf I$ より

$$
\boxed{\mathbf A\mathbf A^+=\mathbf U_r\mathbf U_r^T}.
$$

$\mathbf U_r$ の列は $C(\mathbf A)$ の正規直交基底なので、これは $C(\mathbf A)$ への直交射影。

したがって任意の $\mathbf b$ について

$$
\mathbf A\mathbf A^+\mathbf b
$$

は $\mathbf b$ の列空間への最も近い点である。

### 入力空間側の射影 $\mathbf A^+\mathbf A$

同様に

$$
\mathbf A^+\mathbf A
=\mathbf V_r\mathbf V_r^T.
$$

これはrow space $C(\mathbf A^T)$ への直交射影。入力を「出力に影響する成分」へ射影し、null space成分を除く。

### minimum-norm解の厳密な分解

任意の $\mathbf x$ を

$$
\mathbf x=\mathbf x_r+\mathbf x_0,
$$

$$
\mathbf x_r\in C(\mathbf A^T),
\qquad
\mathbf x_0\in N(\mathbf A)
$$

と直交分解する。$\mathbf A\mathbf x_0=0$ なので出力は $\mathbf x_r$ だけで決まる。一方

$$
\|\mathbf x\|_2^2
=\|\mathbf x_r\|_2^2+\|\mathbf x_0\|_2^2.
$$

同じ出力を作る解の中でノルム最小にするには $\mathbf x_0=0$。$\mathbf A^+\mathbf b$ はrow spaceに属するのでこの条件を満たす。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}1&1\\2&2\end{bmatrix},
\qquad
\mathbf b=\begin{bmatrix}3\\6\end{bmatrix}.
$$

方程式は $x_1+x_2=3$ なので解は $(3-t,t)^T$。ノルム二乗は

$$
(3-t)^2+t^2=2\left(t-\frac32\right)^2+\frac92.
$$

最小は $t=3/2$、したがってminimum-norm解は $(1.5,1.5)^T$。擬似逆はこの対称な分配を返す。

## もう一段丁寧に：擬似逆が二つの射影を作ることを導く

### 1. rank-$r$ SVDから出発する

$$
\mathbf A=\mathbf U_r\mathbf\Sigma_r\mathbf V_r^T
$$

とする。$\mathbf\Sigma_r$ は正の特異値だけを持つので可逆。擬似逆は

$$
\boxed{
\mathbf A^+
=\mathbf V_r\mathbf\Sigma_r^{-1}\mathbf U_r^T
}.
$$

### 2. $\mathbf A\mathbf A^+$ はcolumn spaceへの射影

掛け算すると

$$
\begin{aligned}
\mathbf A\mathbf A^+
&=\mathbf U_r\mathbf\Sigma_r\mathbf V_r^T
\mathbf V_r\mathbf\Sigma_r^{-1}\mathbf U_r^T\\
&=\mathbf U_r\mathbf U_r^T.
\end{aligned}
$$

$\mathbf U_r$ の列は $C(\mathbf A)$ のorthonormal basisなので

$$
\boxed{\mathbf A\mathbf A^+
=\mathbf U_r\mathbf U_r^T}
$$

はcolumn spaceへのorthogonal projectorである。したがって任意の $\mathbf b$ に対し

$$
\mathbf A\mathbf A^+\mathbf b
$$

が再現可能な出力の中で $\mathbf b$ に最も近い点になる。

### 3. $\mathbf A^+\mathbf A$ はrow spaceへの射影

同様に

$$
\mathbf A^+\mathbf A
=\mathbf V_r\mathbf V_r^T.
$$

$\mathbf V_r$ の列はrow space $C(\mathbf A^T)$ のorthonormal basisなので、これは入力空間側のrow-space projectorである。

この二つは同じ行列ではない。$\mathbf A\mathbf A^+$ は $m\times m$ で出力空間に作用し、$\mathbf A^+\mathbf A$ は $n\times n$ で入力空間に作用する。

### 4. underdetermined systemでminimum normを選ぶ

$\mathbf A\mathbf x=\mathbf b$ が解を持つがnull spaceが非自明とする。任意の解は

$$
\mathbf x=\mathbf x_r+\mathbf x_0,
$$

$$
\mathbf x_r\in C(\mathbf A^T),
\qquad
\mathbf x_0\in N(\mathbf A)
$$

と直交分解できる。$\mathbf A\mathbf x_0=0$ なので、$\mathbf x_0$ を加えても同じ出力。

row spaceとnull spaceは直交するため

$$
\|\mathbf x\|_2^2
=\|\mathbf x_r\|_2^2+\|\mathbf x_0\|_2^2.
$$

よって最小ノルムは $\mathbf x_0=0$ のとき。擬似逆解 $\mathbf A^+\mathbf b$ はrow space内にあるので、まさにこの解を選ぶ。

### 5. Penrose条件の意味

Moore–Penrose擬似逆は

$$
\mathbf A\mathbf A^+\mathbf A=\mathbf A,
$$

$$
\mathbf A^+\mathbf A\mathbf A^+=\mathbf A^+,
$$

$$
(\mathbf A\mathbf A^+)^T=\mathbf A\mathbf A^+,
$$

$$
(\mathbf A^+\mathbf A)^T=\mathbf A^+\mathbf A
$$

を満たす一意な行列である。前二つは「有効な部分空間では逆として振る舞う」こと、後二つは二つの射影がorthogonal projectorであることを表す。SVD式を代入すれば各条件を直接確認できる。

## 成立条件・壊れる場合

擬似逆は任意行列に定義されるが、小特異値を逆にすることでノイズを増幅しうる。厳密rankとnumerical rankを区別し、cutoffの意味を理解する。

## ここから発展

小特異値を0扱いするtruncated SVDや、$1/\sigma_i$ の代わりに $\sigma_i/(\sigma_i^2+\lambda)$ のような穏やかな逆を使うridge/Tikhonov regularizationは、ill-posed inverse problemへ進む自然な次段階。


## このTopicの理解確認

- $\mathbf A^+=\mathbf V_r\mathbf\Sigma_r^{-1}\mathbf U_r^T$ がzero singular directionsを逆にしない理由を説明できるか。
- $\mathbf A\mathbf A^+=\mathbf U_r\mathbf U_r^T$ と $\mathbf A^+\mathbf A=\mathbf V_r\mathbf V_r^T$ がどの空間へのprojectionか区別できるか。
- minimum-norm solutionでnull-space componentを0にする理由をPythagorasで示せるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [MIT OpenCourseWare 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)


## 演習

[このTopicの10問の演習](/exercises/la-pseudoinverse-rank-deficient-systems)
