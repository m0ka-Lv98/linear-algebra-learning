# 行列式・体積・可逆性：教科書

Course 02｜線形代数｜Topic 20/29

## このTopicの位置づけ

可逆性のTopicで2×2逆行列の分母に $ad-bc$ が現れた。行列式はこの量を$n$次元へ一般化したもので、単なる計算用スカラーではなく、線形変換が面積・体積を何倍するかを表す。

**前提知識**：行列、可逆性、基底。

## まず直感を作る

2次元で単位正方形を行列で変換すると平行四辺形になる。その面積が元の何倍になったかが $|\det\mathbf A|$。determinantが0なら面積が0へ潰れ、平面が線や点へ押しつぶされるため逆変換できない。

## 図の解説

<img src="/visuals/course-02/la-determinants-volume-invertibility.png" alt="行列式・体積・可逆性の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の単位正方形は $\mathbf A$ によって、列ベクトル $\mathbf A\mathbf e_1$ と $\mathbf A\mathbf e_2$ が張る平行四辺形へ移る。平行四辺形の面積は $|\det\mathbf A|$ である。

符号は面積そのものではなく向きも記録する。$\det\mathbf A<0$ なら、基底の向きが反転している。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$。
- $\det(\mathbf A)$：行列式。
- 2×2では $\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$。


## 正式な定義

2×2では

$$
\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc.
$$

一般に行列式は、線形変換の符号付き体積倍率として特徴づけられ、積について

$$
\det(\mathbf A\mathbf B)=\det(\mathbf A)\det(\mathbf B)
$$

を満たす。

## なぜこの式・定理になるのか

### 2×2で面積から $ad-bc$ が出る

列ベクトルを $\mathbf a_1=(a,c)^T$、$\mathbf a_2=(b,d)^T$ とする。この2本が作る平行四辺形の符号付き面積は $ad-bc$ になる。たとえば $\mathbf a_1$ を底辺と見て高さを計算してもよいし、平行四辺形を長方形と三角形へ分解しても同じ式が得られる。

### なぜdet=0なら可逆でないのか

$\det\mathbf A=0$ は変換後の$n$次元体積が0になることを意味する。つまり列ベクトルが$n$次元の独立な平行多面体を作れず、低次元部分空間へ潰れている。したがって列は線形従属でrank<n、null spaceに非零ベクトルが存在し、可逆ではない。

逆に可逆なら

$$
1=\det\mathbf I
=\det(\mathbf A\mathbf A^{-1})
=\det\mathbf A\det\mathbf A^{-1}
$$

なので $\det\mathbf A\ne0$。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}2&1\\1&3\end{bmatrix}
$$

なら $\det\mathbf A=6-1=5$。単位正方形は面積5の平行四辺形へ変換される。determinantが非零なので可逆。

## もう一段丁寧に：determinantが可逆性と体積を同時に表す理由

### 1. 2次元で面積倍率を見る

$$
\mathbf A=[\mathbf a_1\ \mathbf a_2]
=\begin{bmatrix}a&b\\c&d\end{bmatrix}
$$

は標準basis $\mathbf e_1,\mathbf e_2$ を $\mathbf a_1,\mathbf a_2$ へ写す。単位正方形はこの2本を辺とする平行四辺形へ移り、その符号付き面積は

$$
\det\mathbf A=ad-bc.
$$

絶対値 $|\det\mathbf A|$ が面積倍率、符号がorientationの反転を表す。

### 2. なぜdeterminant 0なら可逆でないのか

$\det\mathbf A=0$ なら変換後の平行四辺形の面積が0。つまり2本の列は同一直線上へ潰れており、線形従属である。異なる入力が同じ出力へ写るので逆写像を作れない。

一般の $n$ 次元でも $\det\mathbf A=0$ は $n$ 次元体積が0へ潰れることを意味し、rankが $n$ 未満であることと一致する。

### 3. 行基本変形とdeterminant

行交換はorientationを反転するのでdeterminantの符号を反転する。1行を $c$ 倍すれば、その方向の長さが $c$ 倍されるので体積も $c$ 倍。別の行の倍数を加えるshearは体積を変えない。

この三規則を使えばeliminationで三角行列へ変形し、三角行列のdeterminantが対角積になることから一般のdeterminantを計算できる。

### 4. なぜ $\det(\mathbf A\mathbf B)=\det\mathbf A\det\mathbf B$ なのか

$\mathbf B$ が体積を $\det\mathbf B$ 倍し、その後 $\mathbf A$ がさらに $\det\mathbf A$ 倍する。合成変換 $\mathbf A\mathbf B$ の全倍率は積になるので

$$
\det(\mathbf A\mathbf B)
=\det\mathbf A\det\mathbf B.
$$

この式から可逆行列について

$$
1=\det\mathbf I
=\det(\mathbf A\mathbf A^{-1})
=\det\mathbf A\det\mathbf A^{-1}
$$

なので

$$
\det\mathbf A^{-1}=\frac1{\det\mathbf A}
$$

も自然に出る。

### 5. determinantは数値解法の万能な診断ではない

理論上、$\det\mathbf A\ne0$ は可逆性と同値である。しかし「determinantの絶対値が小さいから数値的に危険」とだけ判断するのは不十分である。determinantは次元や各方向のscaleをまとめて一つの数にした量で、入力誤差が解へ何倍伝わるかを直接表してはいない。数値的な感度は、Topic 26でSVDを学んだ後、Topic 29のcondition numberで改めて定量化する。

## 2×2 determinant公式を面積から導く

$$
\mathbf a_1=\begin{bmatrix}a\\c\end{bmatrix},
\qquad
\mathbf a_2=\begin{bmatrix}b\\d\end{bmatrix}
$$

を辺とする平行四辺形のsigned areaが $ad-bc$ になることを、線形性から見る。

第2ベクトルを

$$
\mathbf a_2
=\begin{bmatrix}b\\0\end{bmatrix}
+
\begin{bmatrix}0\\d\end{bmatrix}
$$

に分けて考えると、determinantは各列についてlinearなので

$$
\det\begin{bmatrix}a&b\\c&d\end{bmatrix}
=
\det\begin{bmatrix}a&b\\c&0\end{bmatrix}
+
\det\begin{bmatrix}a&0\\c&d\end{bmatrix}.
$$

各項は向きを含めた長方形/三角形の面積としてそれぞれ $-bc$ と $ad$ になり

$$
\det\mathbf A=ad-bc.
$$

2×2公式を単なる暗記対象ではなく、「二つの列方向が作るsigned area」として保持する。

## 三角行列で対角積になる理由

上三角行列

$$
\mathbf U=
\begin{bmatrix}
u_{11}&*&\cdots\\
0&u_{22}&\cdots\\
\vdots&&\ddots
\end{bmatrix}
$$

では、eliminationで対角を変えずに上側のoff-diagonal entriesを除去できる。別の行の倍数を加える操作はdeterminantを変えないため、最終的に対角行列

$$
\operatorname{diag}(u_{11},\ldots,u_{nn})
$$

と同じdeterminantを持つ。各coordinate directionを $u_{ii}$ 倍する対角変換の体積倍率は積なので

$$
\boxed{
\det\mathbf U=\prod_{i=1}^{n}u_{ii}
}.
$$

これがeliminationでdeterminantを効率よく計算できる理由である。

## transposeでdeterminantが変わらないこと

$$
\det(\mathbf A^T)=\det(\mathbf A)
$$

が成り立つ。幾何的にはrowsで見てもcolumnsで見ても同じn-dimensional volume scalingを表すため。

この性質により、後で

$$
\det(\mathbf A^T\mathbf A)
=\det(\mathbf A^T)\det(\mathbf A)
=(\det\mathbf A)^2
$$

のような式も自然に扱える。ただし $\mathbf A$ が矩形なら $\det\mathbf A$ 自体は定義されないので注意する。

## determinantの存在条件を明確にする

通常のdeterminantはsquare matrixに対して定義する。$m\times n$ で $m\ne n$ の行列に「determinantが0」と言うのは誤りで、そもそも通常のdeterminantが定義されていない。

矩形行列の「空間を何方向保つか」はrankで扱い、伸縮量の詳細はTopic 26のSVDで扱う。この役割分担を明確にする。

## 成立条件・壊れる場合

determinantは正方行列に対して定義する。大規模数値計算で可逆性判定を `det(A)==0` で行うのは不安定。実務では分解やrank、conditionを使う。

## ここから発展

固有値を学ぶと、行列式は固有値の積 $\det\mathbf A=\prod_i\lambda_i$ としても理解できる。これはTopic 21以降で接続する。


## このTopicの理解確認

- $|\det A|$ がvolume scale、signがorientationを表すことを2D例で説明できるか。
- row operationごとのdeterminant変化を説明できるか。
- $\det A=0$ とnoninvertibilityをvolume collapseとcolumn dependenceの両方から説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-determinants-volume-invertibility)
