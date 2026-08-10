# 線形写像と基底変換：教科書

Course 02｜線形代数｜Topic 12/29

## このTopicの位置づけ

同じ幾何ベクトルでも基底を変えると座標が変わる。線形写像の行列表現も同様で、どの基底で入力・出力を記述するかによって成分が変わる。ここでは「対象そのもの」と「座標表示」を分離する。

**前提知識**：基底・座標、行列積、可逆性。

## まず直感を作る

日本の位置を緯度経度で書くか、地図上の別の座標系で書くかで数値は変わっても、場所そのものは変わらない。基底変換も同じで、ベクトルや線形写像の幾何的内容を変えずに座標だけを変更する。

## 図の解説

<img src="/visuals/course-02/la-linear-maps-change-of-basis.png" alt="線形写像と基底変換の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図には斜めの基底による格子と、その上に同じベクトル $\mathbf x$ が描かれている。格子線が標準座標軸と一致していないため、$\mathbf x$ の標準座標と基底座標は異なる。

重要なのは矢印 $\mathbf x$ 自体は1本しかないこと。二種類の座標値は同じ矢印を異なる「ものさし」で測った結果である。

## 記号・型・次元

- $\mathcal B=(\mathbf b_1,\ldots,\mathbf b_n)$：新しい基底。
- $\mathbf P=[\mathbf b_1\ \cdots\ \mathbf b_n]$：基底ベクトルを標準座標で列に並べたchange-of-basis行列。
- $[\mathbf x]_{\mathcal B}$：基底 $\mathcal B$ での座標。
- $\mathbf A$：線形写像の標準基底での行列。
- $\mathbf A_{\mathcal B}$：同じ写像を基底 $\mathcal B$ で表した行列。


## 正式な定義

基底座標と標準座標の関係は

$$
\mathbf x=\mathbf P[\mathbf x]_{\mathcal B}.
$$

したがって

$$
[\mathbf x]_{\mathcal B}=\mathbf P^{-1}\mathbf x.
$$

同じ基底を入力・出力に使う線形写像では

$$
\mathbf A_{\mathcal B}=\mathbf P^{-1}\mathbf A\mathbf P.
$$

## なぜこの式・定理になるのか

### ベクトルの座標変換

$[\mathbf x]_{\mathcal B}=\mathbf c$ と書くことは

$$
\mathbf x=c_1\mathbf b_1+\cdots+c_n\mathbf b_n
$$

という意味。列をまとめれば

$$
\mathbf x=\mathbf P\mathbf c.
$$

基底は独立なので $\mathbf P$ は可逆で、

$$
\mathbf c=\mathbf P^{-1}\mathbf x.
$$

### 写像の行列表現が $P^{-1}AP$ になる理由

入力座標 $[\mathbf x]_{\mathcal B}$ から始める。

1. $\mathbf P$ を掛けて標準座標へ戻す：$\mathbf x=\mathbf P[\mathbf x]_{\mathcal B}$。
2. 標準基底で $\mathbf A$ を作用させる：$\mathbf A\mathbf P[\mathbf x]_{\mathcal B}$。
3. 出力を基底 $\mathcal B$ の座標へ変える：$\mathbf P^{-1}\mathbf A\mathbf P[\mathbf x]_{\mathcal B}$。

したがって基底 $\mathcal B$ での行列は

$$
\mathbf A_{\mathcal B}=\mathbf P^{-1}\mathbf A\mathbf P.
$$

この式は順序を意味から組み立てれば暗記する必要がない。

## 小さな数値例を最後まで計算する

$\mathbf b_1=(1,1)^T$、$\mathbf b_2=(1,-1)^T$ なら

$$
\mathbf P=\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

$\mathbf x=(3,1)^T$ について

$$
[\mathbf x]_{\mathcal B}=\mathbf P^{-1}\mathbf x=(2,1)^T.
$$

これは前Topicの手計算と一致する。

## もう一段丁寧に：change of basisは「対象を変えずに座標だけ変える」

### 1. 二つのbasisを用意する

$V=\mathbb R^n$ にbasis $\mathcal B=(\mathbf b_1,\ldots,\mathbf b_n)$ と標準basisを考える。basisベクトルを列に並べた

$$
\mathbf P=[\mathbf b_1\ \cdots\ \mathbf b_n]
$$

を作る。$\mathcal B$ 座標 $\mathbf c=[\mathbf x]_{\mathcal B}$ から実ベクトルへ戻す式は

$$
\boxed{\mathbf x=\mathbf P\mathbf c}.
$$

$\mathbf P$ の列がbasisなので線形独立で、$\mathbf P$ は可逆。したがって

$$
\boxed{[\mathbf x]_{\mathcal B}=\mathbf P^{-1}\mathbf x}.
$$

### 2. 線形写像の行列がbasisで変わる理由

同じ線形写像 $T$ を標準basisで $\mathbf A$ と表す。$\mathcal B$ 座標 $\mathbf c$ を入力したとき、実際の処理は

1. $\mathbf P\mathbf c$ で標準座標へ戻す。
2. $\mathbf A$ を作用させる。
3. $\mathbf P^{-1}$ で再び $\mathcal B$ 座標へ直す。

したがって $\mathcal B$ 座標での表現行列は

$$
\boxed{\mathbf A_{\mathcal B}=\mathbf P^{-1}\mathbf A\mathbf P}.
$$

これがsimilarity transformation（相似変換）である。

### 3. なぜ左右に別々の行列が付くのか

右の $\mathbf P$ は**入力座標を実ベクトルへ変換**し、左の $\mathbf P^{-1}$ は**出力実ベクトルを新座標へ変換**する。単に公式を $P^{-1}AP$ と暗記すると左右を間違えやすいが、処理順を右から追えば自然に決まる。

### 4. 何が変わり、何が変わらないか

$\mathbf A$ と $\mathbf P^{-1}\mathbf A\mathbf P$ は数表としては異なるが、同じ線形写像を異なるbasisで記述している。したがって固有値、determinant、traceのような写像固有の量は変わらない。一方、個々の成分値はbasisに依存する。次の固有値・対角化では「写像を最も簡単に見せるbasisを選ぶ」という発想が中心になる。

## 成立条件・壊れる場合

$\mathbf P$ の列は基底なので必ず線形独立で、正方かつ可逆である。独立でないベクトルを列に並べてもchange-of-basis行列にはならない。

## ここから発展

$\mathbf P^{-1}\mathbf A\mathbf P$ の形はsimilarity（相似変換）と呼ばれる。後の対角化では、$\mathbf P$ を固有ベクトル行列に選ぶことで $\mathbf A$ を対角行列へ変換する。


## このTopicの理解確認

- $\mathbf x=\mathbf P[\mathbf x]_{\mathcal B}$ と $[\mathbf x]_{\mathcal B}=\mathbf P^{-1}\mathbf x$ を導けるか。
- $P^{-1}AP$ の左右の $P$ がそれぞれ何をしているか、処理順で説明できるか。
- basisが変わっても線形写像そのものは変わらないという意味を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-linear-maps-change-of-basis)
