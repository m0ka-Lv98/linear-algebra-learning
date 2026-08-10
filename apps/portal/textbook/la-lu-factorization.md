# LU分解：教科書

Course 02｜線形代数｜Topic 06/29

## このTopicの位置づけ

同じ係数行列 $\mathbf A$ に対して右辺 $\mathbf b$ だけを変えて何度も連立方程式を解く場合、毎回Gaussian eliminationを最初から行うのは無駄が多い。消去の結果と、どの倍数を使って消去したかを分離して保存したものがLU分解である。

**前提知識**：Gaussian elimination、可逆性。

## まず直感を作る

$\mathbf U$ は消去後の上三角行列、$\mathbf L$ は「下の行から上の行を何倍引いたか」という消去履歴を保存する下三角行列である。$\mathbf A=\mathbf L\mathbf U$ と分けると、$\mathbf A\mathbf x=\mathbf b$ はまず $\mathbf L\mathbf y=\mathbf b$ を前進代入で解き、次に $\mathbf U\mathbf x=\mathbf y$ を後退代入で解ける。

## 図の解説

<img src="/visuals/course-02/la-lu-factorization.png" alt="LU分解の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では $\mathbf A$ から消去によって $\mathbf U$ が得られ、その消去を逆向きに戻す行列が $\mathbf L$ として示されている。例では第2行から第1行の2倍を引くため、その「2」が $\mathbf L$ の下三角成分に保存される。

$\mathbf U$ だけを見ると消去前の情報の一部が見えなくなるが、$\mathbf L$ と組にすれば $\mathbf L\mathbf U$ から元の $\mathbf A$ を再構成できる。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{n\times n}$：分解対象。
- $\mathbf L$：対角成分を1とする下三角行列。
- $\mathbf U$：上三角行列。
- $m_{ij}$：消去で用いるmultiplier（倍率）。


## 正式な定義

pivot交換を必要としない場合、Gaussian eliminationから

$$
\mathbf A=\mathbf L\mathbf U
$$

という分解を得る。実用上は行交換を含め

$$
\mathbf P\mathbf A=\mathbf L\mathbf U
$$

と書くことが多い。$\mathbf P$ は置換行列である。

## なぜこの式・定理になるのか

### 2×2で消去行列から導く

$$
\mathbf A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad a\ne0
$$

とする。第2行から第1行の $m=c/a$ 倍を引く消去行列は

$$
\mathbf E=\begin{bmatrix}1&0\\-m&1\end{bmatrix}.
$$

すると

$$
\mathbf E\mathbf A
=\begin{bmatrix}a&b\\0&d-mb\end{bmatrix}
=\mathbf U.
$$

両辺の左から $\mathbf E^{-1}$ を掛けると

$$
\mathbf A=\mathbf E^{-1}\mathbf U.
$$

$\mathbf E^{-1}=\begin{bmatrix}1&0\\m&1\end{bmatrix}$ なので、これを $\mathbf L$ と呼べば $\mathbf A=\mathbf L\mathbf U$。つまり $\mathbf L$ の下三角成分に消去倍率が正符号で入る。

### 解法への利用

$$
\mathbf A\mathbf x=\mathbf b
\quad\Longrightarrow\quad
\mathbf L\mathbf U\mathbf x=\mathbf b.
$$

$\mathbf y=\mathbf U\mathbf x$ と置けば

$$
\mathbf L\mathbf y=\mathbf b,
$$

を前進代入で解き、その後

$$
\mathbf U\mathbf x=\mathbf y
$$

を後退代入で解く。分解は一度だけ行えば、異なる $\mathbf b$ に再利用できる。

## 小さな数値例を最後まで計算する

$$
\mathbf A=\begin{bmatrix}2&1\\4&3\end{bmatrix}.
$$

$m=4/2=2$ なので

$$
\mathbf L=\begin{bmatrix}1&0\\2&1\end{bmatrix},\qquad
\mathbf U=\begin{bmatrix}2&1\\0&1\end{bmatrix}.
$$

実際、

$$
\mathbf L\mathbf U
=\begin{bmatrix}2&1\\4&3\end{bmatrix}=\mathbf A.
$$

## もう一段丁寧に：LU分解はGaussian eliminationの記録である

### 1. 消去操作を行列として書く

例として

$$
\mathbf A=\begin{bmatrix}2&1\\6&5\end{bmatrix}
$$

を考える。第2行から第1行の3倍を引けば

$$
\mathbf U=\begin{bmatrix}2&1\\0&2\end{bmatrix}.
$$

この行操作は左から

$$
\mathbf E=\begin{bmatrix}1&0\\-3&1\end{bmatrix}
$$

を掛けることと同じなので

$$
\mathbf E\mathbf A=\mathbf U.
$$

したがって

$$
\mathbf A=\mathbf E^{-1}\mathbf U.
$$

$\mathbf E^{-1}$ は

$$
\mathbf E^{-1}=\begin{bmatrix}1&0\\3&1\end{bmatrix}.
$$

この下三角行列を $\mathbf L$ と呼べば

$$
\mathbf A=\mathbf L\mathbf U.
$$

$\mathbf L$ に保存されている3は、消去で使ったmultiplierそのものである。

### 2. 一般の場合も同じ構造

複数回の消去で

$$
\mathbf E_k\cdots\mathbf E_2\mathbf E_1\mathbf A=\mathbf U
$$

になったとする。両辺へ逆行列を順に掛ければ

$$
\mathbf A=
\mathbf E_1^{-1}\mathbf E_2^{-1}\cdots\mathbf E_k^{-1}\mathbf U.
$$

消去行列の逆は下三角であり、適切な条件の下でその積も下三角になる。この積が $\mathbf L$ である。

### 3. なぜ一度分解すれば複数の右辺を速く解けるのか

$\mathbf A\mathbf x=\mathbf b$ に $\mathbf A=\mathbf L\mathbf U$ を代入すると

$$
\mathbf L\mathbf U\mathbf x=\mathbf b.
$$

まず

$$
\mathbf L\mathbf y=\mathbf b
$$

を前進代入で解き、次に

$$
\mathbf U\mathbf x=\mathbf y
$$

を後退代入で解く。同じ $\mathbf A$ に対して $\mathbf b$ だけが変わるなら、重い分解は一度だけでよい。

### 4. pivotingが必要になる理由

消去中のpivotが0なら、そのままでは割り算できない。0でなくても非常に小さいpivotで割ると、有限精度計算では誤差が大きく増幅されることがある。そこで実用的なLUでは行交換を含むpartial pivotingを行い、

$$
\mathbf P\mathbf A=\mathbf L\mathbf U
$$

と書くことが多い。$\mathbf P$ は行交換を表す置換行列である。理論上の $\mathbf A=\mathbf L\mathbf U$ と数値ライブラリの出力が少し違うのはこのためである。

## 成立条件・壊れる場合

pivotが0なら行交換なしの単純なLUは進められない。数値計算では小さいpivotも不安定なので、通常はpartial pivotingを行い $\mathbf P\mathbf A=\mathbf L\mathbf U$ とする。「数学的にLUが存在する」と「数値的に安定なLUを得る」は同じ主張ではない。

## ここから発展

対称正定値行列では、LUより構造を利用したCholesky分解 $\mathbf A=\mathbf L\mathbf L^T$ が使える。これはTopic 25で、正定値性を学んだ後に導く。


## このTopicの理解確認

- 消去行列 $\mathbf E$ から $\mathbf A=\mathbf L\mathbf U$ がどのように出るか、小さい例で再現できるか。
- $L$ のsubdiagonal entriesがelimination multiplierを記録する理由を説明できるか。
- pivotingが必要になる数学的・数値的理由を区別できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-lu-factorization)
