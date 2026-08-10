# 対角化と行列のべき：教科書

Course 02｜線形代数｜Topic 22/29

## このTopicの位置づけ

固有ベクトル方向では行列作用は単なるスカラー倍になる。もし固有ベクトルが基底を作れるほど十分にあれば、その基底では行列全体が対角行列になる。これが対角化であり、反復作用 $\mathbf A^k$ を簡単にする。

**前提知識**：固有値・固有ベクトル、基底変換。

## まず直感を作る

複雑な変換を、固有ベクトルという「行列にとって自然な座標軸」で見ると、各座標成分が独立に $\lambda_i$ 倍されるだけになる。混ざり合う成分をほどいてから計算し、最後に元の座標へ戻す。

## 図の解説

<img src="/visuals/course-02/la-diagonalization-matrix-powers.png" alt="対角化と行列のべきの図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図は $\mathbf x$ をまず $\mathbf V^{-1}$ で固有基底座標へ移し、対角行列 $\mathbf\Lambda$ で各成分を独立に伸縮し、$\mathbf V$ で元の座標へ戻す流れを示している。

同じ変換を$k$回繰り返すと、中央の倍率だけを $\lambda_i^k$ にすればよいので $\mathbf A^k$ が簡単になる。

## 記号・型・次元

- $\mathbf v_1,\ldots,\mathbf v_n$：独立な固有ベクトル。
- $\mathbf V=[\mathbf v_1\ \cdots\ \mathbf v_n]$。
- $\mathbf\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$。
- $\mathbf A$：対角化する行列。


## 正式な定義

$\mathbf A$ が対角化可能とは、可逆行列 $\mathbf V$ と対角行列 $\mathbf\Lambda$ があって

$$
\mathbf A=\mathbf V\mathbf\Lambda\mathbf V^{-1}
$$

と書けること。

## なぜこの式・定理になるのか

### 固有方程式を列ごとに並べる

各固有ベクトルについて

$$
\mathbf A\mathbf v_i=\lambda_i\mathbf v_i.
$$

これを列に並べると

$$
\mathbf A[\mathbf v_1\ \cdots\ \mathbf v_n]
=[\lambda_1\mathbf v_1\ \cdots\ \lambda_n\mathbf v_n].
$$

右辺は

$$
[\mathbf v_1\ \cdots\ \mathbf v_n]
\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$

なので

$$
\mathbf A\mathbf V=\mathbf V\mathbf\Lambda.
$$

固有ベクトルが独立なら $\mathbf V$ は可逆。右から $\mathbf V^{-1}$ を掛けて

$$
\boxed{\mathbf A=\mathbf V\mathbf\Lambda\mathbf V^{-1}}.
$$

### なぜべきが簡単になるのか

$$
\mathbf A^2
=(\mathbf V\mathbf\Lambda\mathbf V^{-1})(\mathbf V\mathbf\Lambda\mathbf V^{-1})
=\mathbf V\mathbf\Lambda^2\mathbf V^{-1}
$$

で、中間の $\mathbf V^{-1}\mathbf V=\mathbf I$ が消える。同様に

$$
\boxed{\mathbf A^k=\mathbf V\mathbf\Lambda^k\mathbf V^{-1}}.
$$

対角行列のべきは対角成分をべき乗するだけ：

$$
\mathbf\Lambda^k=\operatorname{diag}(\lambda_1^k,\ldots,\lambda_n^k).
$$

## 小さな数値例を最後まで計算する

前Topicの $\mathbf A=\begin{bmatrix}2&1\\1&2\end{bmatrix}$ は、固有ベクトル $(1,1)^T,(1,-1)^T$ を持つ。正規化して $\mathbf V$ を作れば $\mathbf\Lambda=\operatorname{diag}(3,1)$。したがって $\mathbf A^k$ の長期挙動は固有値3の方向が $3^k$ で支配する。

## もう一段丁寧に：対角化は「固有ベクトルbasisへ座標変換する」だけ

### 1. 固有ベクトルを列に並べる

$n$ 本の独立な固有ベクトル $\mathbf v_1,\ldots,\mathbf v_n$ があり、対応する固有値を $\lambda_1,\ldots,\lambda_n$ とする。

$$
\mathbf P=[\mathbf v_1\ \cdots\ \mathbf v_n],
\qquad
\mathbf D=\operatorname{diag}(\lambda_1,\ldots,\lambda_n).
$$

各列について $\mathbf A\mathbf v_j=\lambda_j\mathbf v_j$ だから、まとめると

$$
\mathbf A\mathbf P=\mathbf P\mathbf D.
$$

### 2. なぜ $\mathbf A=\mathbf P\mathbf D\mathbf P^{-1}$ になるのか

固有ベクトルが独立なので $\mathbf P$ は可逆。右から $\mathbf P^{-1}$ を掛けて

$$
\boxed{\mathbf A=\mathbf P\mathbf D\mathbf P^{-1}}.
$$

逆に

$$
\boxed{\mathbf D=\mathbf P^{-1}\mathbf A\mathbf P}.
$$

これはchange of basisの式そのもの。$\mathbf P^{-1}$ で固有ベクトル座標へ移ると、$\mathbf A$ の作用が成分ごとの $\lambda_i$ 倍、つまり対角行列 $\mathbf D$ になる。

### 3. 行列の累乗が簡単になる

$$
\mathbf A^2
=(\mathbf P\mathbf D\mathbf P^{-1})
(\mathbf P\mathbf D\mathbf P^{-1})
=\mathbf P\mathbf D^2\mathbf P^{-1}
$$

であり、中間の $\mathbf P^{-1}\mathbf P=\mathbf I$ が消える。同様に

$$
\boxed{\mathbf A^k=\mathbf P\mathbf D^k\mathbf P^{-1}}.
$$

$\mathbf D^k$ は各対角成分を $\lambda_i^k$ にするだけなので、反復作用の解析が大幅に簡単になる。

### 4. 対角化できない例

$$
\mathbf A=
\begin{bmatrix}
1&1\\0&1
\end{bmatrix}
$$

の固有値は $\lambda=1$ が重複度2。しかし

$$
\mathbf A-\mathbf I=
\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$

のnull spaceは $\operatorname{span}((1,0)^T)$ でdimension 1しかない。独立な固有ベクトルを2本作れないため $\mathbf P$ を可逆にできず、対角化できない。

### 5. 「固有値がある」ことと「対角化できる」ことを分ける

複素数まで許せば固有値が存在する場合は広いが、対角化には**空間全体を張るだけの独立な固有ベクトル**が必要である。この条件を落として $\mathbf A=\mathbf P\mathbf D\mathbf P^{-1}$ を使ってはいけない。対称行列ではこの問題が起こらず必ずorthogonally diagonalizableになることを次Topicで学ぶ。

## 成立条件・壊れる場合

固有値が$n$個（重複込み）あっても、独立な固有ベクトルが$n$本なければ対角化できない。例えばJordan blockは固有ベクトルが不足する。distinct eigenvaluesなら対応固有ベクトルは独立なので対角化可能。

## ここから発展

$\mathbf A^k$ だけでなく、行列指数 $e^{t\mathbf A}$ も $\mathbf V e^{t\mathbf\Lambda}\mathbf V^{-1}$ と計算でき、線形微分方程式へつながる。ただしここでは行列べきで対角化の意味を固定してから進む。


## このTopicの理解確認

- $\mathbf A\mathbf P=\mathbf P\mathbf D$ から $\mathbf A=\mathbf P\mathbf D\mathbf P^{-1}$ を導けるか。
- なぜ $\mathbf A^k=\mathbf P\mathbf D^k\mathbf P^{-1}$ で中間の $\mathbf P^{-1}\mathbf P$ が消えるか説明できるか。
- eigenvaluesが存在してもdiagonalizableとは限らない理由を例で示せるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-diagonalization-matrix-powers)
