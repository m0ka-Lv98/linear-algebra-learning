# 行列ノルムと条件数：教科書

Course 02｜線形代数｜Topic 29/29

## このTopicの位置づけ

ここまで「理論上解けるか」を扱ってきたが、数値計算では入力に微小誤差がある。可逆でも、少しの誤差が解で大きく増幅される行列がある。その感度を定量化するのがcondition number（条件数）。SVDを学んだ後なら幾何的に理解できる。

**前提知識**：ノルム、SVD、特異値、可逆性。

## まず直感を作る

単位円をほぼ円のまま拡大する行列は、どの方向も似た倍率で伸ばすので逆変換も安定。一方、極端に細長い楕円へ変える行列は、一方向をほとんど潰す。逆変換ではその細い方向を大きく引き伸ばすため、わずかなノイズも増幅される。

## 図の解説

<img src="/visuals/course-02/la-matrix-norms-condition-number.png" alt="行列ノルムと条件数の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の単位円が横に大きく、縦に小さく伸縮され、細長い楕円になっている。長半径が最大特異値 $\sigma_{\max}$、短半径が最小特異値 $\sigma_{\min}$。その比が2-norm条件数である。

短半径が0に近づくほど、異なる入力がほぼ同じ出力へ潰れる。逆問題ではその小さな差を復元するため大きく拡大するので、誤差に敏感になる。

## 記号・型・次元

- $\|\mathbf A\|_2$：induced 2-norm。
- $\sigma_{\max}(\mathbf A)$、$\sigma_{\min}(\mathbf A)$：最大・最小特異値。
- $\kappa_2(\mathbf A)$：2-norm条件数。可逆正方行列では $\|\mathbf A\|_2\|\mathbf A^{-1}\|_2$。


## 正式な定義

行列のinduced 2-normは

$$
\|\mathbf A\|_2
=\max_{\mathbf x\ne0}\frac{\|\mathbf A\mathbf x\|_2}{\|\mathbf x\|_2}
=\sigma_{\max}(\mathbf A).
$$

可逆行列について

$$
\boxed{\kappa_2(\mathbf A)
=\|\mathbf A\|_2\|\mathbf A^{-1}\|_2
=\frac{\sigma_{\max}}{\sigma_{\min}}}.
$$

## なぜこの式・定理になるのか

### なぜ $\|A\|_2=\sigma_{max}$ なのか

SVDで $\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T$。直交行列は2-normを保存するので、$\mathbf z=\mathbf V^T\mathbf x$ と置くと

$$
\|\mathbf A\mathbf x\|_2
=\|\mathbf\Sigma\mathbf z\|_2.
$$

$\|\mathbf z\|=\|\mathbf x\|$。単位ベクトル $\|\mathbf z\|=1$ に対し

$$
\|\mathbf\Sigma\mathbf z\|_2^2
=\sum_i\sigma_i^2z_i^2
\le\sigma_{\max}^2\sum_i z_i^2
=\sigma_{\max}^2.
$$

等号は $\mathbf z$ を最大特異値方向に選べば達成。よって $\|\mathbf A\|_2=\sigma_{\max}$。

### 逆行列のnorm

可逆なら $\mathbf A^{-1}=\mathbf V\mathbf\Sigma^{-1}\mathbf U^T$ なので、その最大特異値は $1/\sigma_{\min}$。したがって

$$
\|\mathbf A^{-1}\|_2=\frac1{\sigma_{\min}}.
$$

両者を掛けて条件数の式が出る。

### 相対誤差の増幅

$\mathbf A\mathbf x=\mathbf b$ とし、右辺が $\mathbf b+\delta\mathbf b$ へ変わると解は $\mathbf x+\delta\mathbf x$ で

$$
\mathbf A\delta\mathbf x=\delta\mathbf b,
\qquad
\delta\mathbf x=\mathbf A^{-1}\delta\mathbf b.
$$

したがって

$$
\|\delta\mathbf x\|
\le\|\mathbf A^{-1}\|\|\delta\mathbf b\|.
$$

一方 $\|\mathbf b\|=\|\mathbf A\mathbf x\|\le\|\mathbf A\|\|\mathbf x\|$ だから

$$
\frac{\|\delta\mathbf x\|}{\|\mathbf x\|}
\le
\kappa(\mathbf A)
\frac{\|\delta\mathbf b\|}{\|\mathbf b\|}.
$$

条件数は「最悪の場合、相対誤差が何倍まで増幅されうるか」の上界を与える。

## 小さな数値例を最後まで計算する

$\mathbf A=\operatorname{diag}(100,1)$ なら特異値は100と1で $\kappa_2=100$。$\operatorname{diag}(100,0.001)$ なら $\kappa_2=100000$ まで増える。

後者では第2方向を0.001倍しているため、逆変換では1000倍する必要があり、その方向のノイズが大きく増幅される。

## もう一段丁寧に：condition numberを誤差伝播から導く

### 1. induced 2-normは最大伸長率

行列 $\mathbf A\in\mathbb R^{m\times n}$ に対して

$$
\|\mathbf A\|_2
=
\max_{\mathbf x\ne0}
\frac{\|\mathbf A\mathbf x\|_2}{\|\mathbf x\|_2}
$$

と定義する。単位ベクトルだけに制限すれば

$$
\|\mathbf A\|_2
=\max_{\|\mathbf x\|_2=1}\|\mathbf A\mathbf x\|_2.
$$

SVDで $\mathbf x=\mathbf V\mathbf z$ と置くとorthogonal変換なので $\|\mathbf z\|_2=\|\mathbf x\|_2$。さらに

$$
\|\mathbf A\mathbf x\|_2
=\|\mathbf U\mathbf\Sigma\mathbf z\|_2
=\|\mathbf\Sigma\mathbf z\|_2.
$$

単位ノルムの $\mathbf z$ で最大になるのは最大特異値方向なので

$$
\boxed{\|\mathbf A\|_2=\sigma_{\max}}.
$$

### 2. 可逆正方行列の逆写像は最小特異値で決まる

可逆なら $\mathbf A^{-1}$ の特異値は $1/\sigma_i$。したがって

$$
\|\mathbf A^{-1}\|_2
=\frac1{\sigma_{\min}}.
$$

よって2-norm condition numberは

$$
\boxed{
\kappa_2(\mathbf A)
=\|\mathbf A\|_2\|\mathbf A^{-1}\|_2
=\frac{\sigma_{\max}}{\sigma_{\min}}
}.
$$

図で単位円が細長い楕円へ写るほど、最大伸長と最小伸長の比が大きい。

### 3. 右辺の誤差が解へどう伝わるか

$\mathbf A\mathbf x=\mathbf b$ とし、右辺が $\mathbf b+\delta\mathbf b$ に変わって解が $\mathbf x+\delta\mathbf x$ になったとする。

$$
\mathbf A\delta\mathbf x=\delta\mathbf b
$$

なので

$$
\delta\mathbf x=\mathbf A^{-1}\delta\mathbf b.
$$

したがって

$$
\|\delta\mathbf x\|_2
\le
\|\mathbf A^{-1}\|_2\|\delta\mathbf b\|_2.
$$

一方 $\mathbf b=\mathbf A\mathbf x$ より

$$
\|\mathbf b\|_2
\le
\|\mathbf A\|_2\|\mathbf x\|_2,
$$

したがって

$$
\frac1{\|\mathbf x\|_2}
\le
\frac{\|\mathbf A\|_2}{\|\mathbf b\|_2}.
$$

二つを組み合わせると

$$
\boxed{
\frac{\|\delta\mathbf x\|_2}{\|\mathbf x\|_2}
\le
\kappa_2(\mathbf A)
\frac{\|\delta\mathbf b\|_2}{\|\mathbf b\|_2}
}.
$$

これがcondition numberを「相対誤差の増幅率」と読む根拠である。

### 4. condition numberが大きいこととalgorithmが悪いことは別

$\kappa(\mathbf A)$ が大きいのは**問題そのもの**が入力誤差に敏感だという意味。一方、numerically unstable algorithmは、問題が本来持つ以上に丸め誤差を増幅する。良い数値計算法はconditionの悪さを消すことはできないが、余計な誤差をできるだけ増やさない。

### 5. normal equationでconditionが二乗される

full-column-rankなら $\mathbf A^T\mathbf A$ の固有値は $\sigma_i^2$ なので

$$
\kappa_2(\mathbf A^T\mathbf A)
=\frac{\sigma_{\max}^2}{\sigma_{\min}^2}
=\kappa_2(\mathbf A)^2.
$$

Topic 18で「理論式 $(A^TA)^{-1}A^Tb$ を知っていても、実装ではQR/SVDを選ぶことがある」と述べた理由がここで定量化される。

## 成立条件・壊れる場合

条件数が大きいことはアルゴリズムが悪いという意味ではなく、**問題そのものが敏感**であることを示す。一方、backward stable algorithmかどうかはアルゴリズム側の性質。問題conditionとalgorithm stabilityを区別する。

またcondition numberはnormに依存する。$\kappa_2$ のときだけ特異値比として簡単に書ける。

## ここから発展

ill-conditioned problemでは正則化が必要になる場合がある。ridge/Tikhonovは小特異値方向の逆増幅を抑える方法としてSVD座標で理解できる。ここまででCourse 02の「線形結合→空間→直交→最小二乗→固有構造→SVD→感度」が一周する。


## このTopicの理解確認

- $\|A\|_2=\sigma_{max}$ をSVDから導けるか。
- $\kappa_2(A)=\sigma_{max}/\sigma_{min}$ をinverse normから導けるか。
- problem conditioningとalgorithm stabilityを区別し、normal equationでconditionがsquareされる理由を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [MIT OpenCourseWare 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)


## 演習

[このTopicの10問の演習](/exercises/la-matrix-norms-condition-number)
