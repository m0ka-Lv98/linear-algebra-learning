# 連立一次方程式と消去法：教科書

Course 02｜線形代数｜Topic 04/29

## このTopicの位置づけ

行列 $\mathbf A$ を変換として見ると、方程式 $\mathbf A\mathbf x=\mathbf b$ は「どの入力 $\mathbf x$ を入れれば、指定した出力 $\mathbf b$ が得られるか」という逆問題になる。最も基本的な解法がGaussian elimination（ガウス消去法）である。

**前提知識**：行列積、行列とベクトルの積。

## まず直感を作る

2変数なら各一次方程式は平面上の直線を表し、連立方程式の解は直線の交点である。消去法は直線そのものを無関係な直線へ変える操作ではない。元の方程式から等価な方程式を作り、**共通解を保ったまま**未知数を一つずつ消している。

## 図の解説

<img src="/visuals/course-02/la-linear-systems-elimination.png" alt="連立一次方程式と消去法の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図には $x+2y=5$ と $2x+y=4$ の2直線が描かれ、交点 $(1,2)$ が共通解になっている。第2式から第1式の2倍を引くと $-3y=-6$ となり、$y=2$ がすぐ分かる。この行基本変形を行っても交点は変わらない。

つまり消去法の本質は「方程式の見た目を簡単にするが、解集合は保存する」ことである。

## 記号・型・次元

- $\mathbf A\in\mathbb R^{m\times n}$：係数行列。
- $\mathbf x\in\mathbb R^n$：未知ベクトル。
- $\mathbf b\in\mathbb R^m$：右辺ベクトル。
- $[\mathbf A\mid\mathbf b]$：拡大係数行列。
- pivot（ピボット）：行消去で基準にする非零成分。


## 正式な定義

連立一次方程式を

$$
\mathbf A\mathbf x=\mathbf b
$$

と表す。Gaussian eliminationは、拡大係数行列 $[\mathbf A\mid\mathbf b]$ に行基本変形を施し、上三角形または行階段形へ変換して解を求める方法である。

## なぜこの式・定理になるのか

### なぜ行基本変形は解を保つのか

許される行基本変形は3種類ある。

1. 二つの方程式を入れ替える。
2. 一つの方程式を非零定数倍する。
3. 一つの方程式へ別の方程式の定数倍を加える。

1は方程式の順番を変えるだけである。2は、たとえば $f(\mathbf x)=0$ と $cf(\mathbf x)=0$（$c\ne0$）が同じ解をもつことから分かる。3も、$f(\mathbf x)=0$ と $g(\mathbf x)=0$ を満たすなら $g(\mathbf x)+cf(\mathbf x)=0$ を満たし、逆に $f=0$ と $g+cf=0$ から $g=0$ を復元できる。したがって各操作は可逆で、解集合を変えない。

### pivotが何を教えるか

行階段形にしたとき、pivotのある列は基本変数に対応し、pivotのない列は自由変数に対応する。自由変数があれば解は一般に一意ではない。一方、$[0\ \cdots\ 0\mid c]$（$c\ne0$）という行が現れれば $0=c$ を要求することになり、解は存在しない。

## 小さな数値例を最後まで計算する

$$
\begin{cases}
x+2y=5\\
2x+y=4
\end{cases}
$$

第2式から第1式の2倍を引く：

$$
(2x+y)-2(x+2y)=4-10
$$

より $-3y=-6$、したがって $y=2$。第1式へ戻すと $x+4=5$ なので $x=1$。

重要なのは「第2式を捨てた」のではなく、元の第1式と組み合わせて等価な式へ置き換えた点である。

## もう一段丁寧に：消去法はなぜ解を変えないのか

### 1. 連立方程式と拡大係数行列

$\mathbf A\mathbf x=\mathbf b$ は、$m$ 本の一次方程式をまとめた表現である。消去法では拡大係数行列

$$
[\mathbf A\mid\mathbf b]
$$

に行基本変形を施す。重要なのは「行列を見やすくする」ことではなく、**同じ解集合を持つ別の方程式系へ置き換える**ことである。

### 2. 三つの行基本変形が解を保存する理由

(1) 二つの方程式の順序を入れ替える。満たすべき式の順番が変わるだけなので解集合は変わらない。

(2) ある方程式を非零定数 $c$ 倍する。式 $f(\mathbf x)=0$ と $cf(\mathbf x)=0$ は $c\ne0$ なら同値である。$c=0$ は情報を消してしまうので許されない。

(3) ある方程式へ別の方程式の $c$ 倍を加える。元の二式を満たす解は新しい式も満たす。逆に、新しい式から加えた $c$ 倍を引けば元へ戻れるため、解集合は変わらない。

つまり各行基本変形は**逆操作を持つ**。だから変形の前後で論理的に同値な方程式系になる。

### 3. pivotは何を意味しているか

消去後に現れるpivotは、その列に新しい独立な制約が存在することを表す。一方、pivotのない変数列は自由変数になる。たとえば

$$
\begin{bmatrix}
1&2&0\
0&0&1
\end{bmatrix}
\mathbf x
=\begin{bmatrix}3\\4\end{bmatrix}
$$

では $x_1,x_3$ がpivot変数、$x_2$ が自由変数である。$x_2=t$ と置けば

$$
x_1=3-2t,\qquad x_3=4.
$$

自由変数があることは「計算が終わっていない」のではなく、元の方程式がその方向を拘束していないことを意味する。

### 4. 解なしはどこで検出されるか

消去途中で

$$
[0\ 0\ \cdots\ 0\mid c],\qquad c\ne0
$$

という行が出れば、これは $0=c$ を要求しているので矛盾であり、解は存在しない。逆に

$$
[0\ 0\ \cdots\ 0\mid0]
$$

なら、その行は新しい条件を何も追加していない。

### 5. 消去法と後続Topicの関係

pivotの数はrankへ、自由変数の数はnullityへ進む。正方行列で全列にpivotがあれば逆行列が存在し、$\mathbf A\mathbf x=\mathbf b$ はすべての $\mathbf b$ に対して一意に解ける。したがってGaussian eliminationは単なる計算法ではなく、Course 02全体の構造を目で確認する方法でもある。

## 成立条件・壊れる場合

pivotが0または非常に小さい場合、理論上は別の行との交換で進められる。数値計算では丸め誤差を抑えるためpartial pivoting（部分ピボット選択）が重要になる。手計算の「0でなければよい」と数値計算の「十分大きいpivotを選ぶ」は区別する。

## ここから発展

消去法の各操作を行列として保存するとLU分解になる。したがってLUは別の魔法の公式ではなく、このTopicの消去手順を再利用可能な形に分解したものとして次に学ぶ。


## このTopicの理解確認

- 三つの行基本変形が解集合を変えない理由を、それぞれ逆操作とともに説明できるか。
- pivot variableとfree variableの違いを一般解に反映できるか。
- $[0\cdots0\mid c]$（$c\ne0$）がなぜ矛盾を表すか説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [OpenStax Intermediate Algebra 2e — Solve Systems of Equations Using Matrices](https://openstax.org/books/intermediate-algebra-2e/pages/4-5-solve-systems-of-equations-using-matrices)

- [OpenStax Intermediate Algebra 2e — Solve Systems of Equations Using Matrices](https://openstax.org/books/intermediate-algebra-2e/pages/4-5-solve-systems-of-equations-using-matrices)


## 演習

[このTopicの10問の演習](/exercises/la-linear-systems-elimination)
