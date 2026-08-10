# Gram–Schmidt直交化とQR分解：教科書

Course 02｜線形代数｜Topic 16/29

## このTopicの位置づけ

正規直交基底は便利だが、手元のベクトルが最初から直交しているとは限らない。Gram–Schmidtは、既存方向への射影を順に引くことで独立ベクトルを直交化する。列をまとめると $\mathbf A=\mathbf Q\mathbf R$ というQR分解になる。

**前提知識**：射影、正規直交基底。

## まず直感を作る

第1ベクトルの方向をそのまま採用し、第2ベクトルから第1方向の成分を引けば、第1方向に垂直な残りだけが残る。第3ベクトルからは第1・第2方向の成分を両方引く。同じ操作を繰り返す。

## 図の解説

<img src="/visuals/course-02/la-gram-schmidt-qr.png" alt="Gram–Schmidt直交化とQR分解の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図では $\mathbf a_2$ から $\mathbf q_1$ 方向への射影 $\operatorname{proj}_{q_1}\mathbf a_2$ を引き、その差 $\mathbf u_2$ が $\mathbf q_1$ に直交している。$\mathbf u_2$ を長さ1へ正規化すると $\mathbf q_2$ が得られる。

つまり新しい直交方向は突然作るのではなく、「元ベクトルから、すでに説明済みの方向成分を除いた残差」である。

## 記号・型・次元

- $\mathbf A=[\mathbf a_1\ \cdots\ \mathbf a_n]\in\mathbb R^{m\times n}$：独立な列を持つ行列。
- $\mathbf q_j$：正規直交化後の列。
- $\mathbf Q=[\mathbf q_1\ \cdots\ \mathbf q_n]$。
- $\mathbf R\in\mathbb R^{n\times n}$：上三角行列。


## 正式な定義

classical Gram–Schmidtでは

$$
\mathbf u_j
=\mathbf a_j-\sum_{i=1}^{j-1}(\mathbf q_i^T\mathbf a_j)\mathbf q_i,
\qquad
\mathbf q_j=\frac{\mathbf u_j}{\|\mathbf u_j\|_2}.
$$

この結果

$$
\mathbf A=\mathbf Q\mathbf R,
\qquad \mathbf Q^T\mathbf Q=\mathbf I
$$

と分解できる。

## なぜこの式・定理になるのか

### 第2列で式を作る

$\mathbf q_1=\mathbf a_1/\|\mathbf a_1\|$ とする。$\mathbf a_2$ から $\mathbf q_1$ 方向の成分を引く：

$$
\mathbf u_2=\mathbf a_2-(\mathbf q_1^T\mathbf a_2)\mathbf q_1.
$$

本当に直交するか確認すると

$$
\mathbf q_1^T\mathbf u_2
=\mathbf q_1^T\mathbf a_2-(\mathbf q_1^T\mathbf a_2)\mathbf q_1^T\mathbf q_1
=0
$$

である。最後の等号では $\|\mathbf q_1\|=1$ を使った。

### なぜQRになるのか

$\mathbf a_j$ は

$$
\mathbf a_j
=\sum_{i=1}^{j}(\mathbf q_i^T\mathbf a_j)\mathbf q_i
$$

と書ける。つまり第$j$列は $\mathbf q_1,\ldots,\mathbf q_j$ だけを使うため、係数行列 $\mathbf R$ は $i>j$ の成分が0、すなわち上三角になる。

具体的には

$$
r_{ij}=\mathbf q_i^T\mathbf a_j\quad(i\le j),
$$

対角は $r_{jj}=\|\mathbf u_j\|_2$。

## 小さな数値例を最後まで計算する

$\mathbf a_1=(1,1)^T$、$\mathbf a_2=(1,0)^T$ とする。

$$
\mathbf q_1=\frac1{\sqrt2}(1,1)^T.
$$

射影係数は $\mathbf q_1^T\mathbf a_2=1/\sqrt2$ なので

$$
\mathbf u_2=(1,0)^T-\frac12(1,1)^T=(1/2,-1/2)^T.
$$

正規化して $\mathbf q_2=(1,-1)^T/\sqrt2$。

## もう一段丁寧に：Gram–Schmidtは何を引いているのか

### 1. 2本目のベクトルから1本目方向を取り除く

独立な $\mathbf a_1,\mathbf a_2$ があるとする。まず

$$
\mathbf q_1=\frac{\mathbf a_1}{\|\mathbf a_1\|_2}
$$

と正規化する。$\mathbf a_2$ の $\mathbf q_1$ 方向成分は

$$
(\mathbf q_1^T\mathbf a_2)\mathbf q_1.
$$

これを引いた

$$
\mathbf u_2
=\mathbf a_2-(\mathbf q_1^T\mathbf a_2)\mathbf q_1
$$

が本当に $\mathbf q_1$ と直交するか確かめると

$$
\mathbf q_1^T\mathbf u_2
=\mathbf q_1^T\mathbf a_2
-(\mathbf q_1^T\mathbf a_2)(\mathbf q_1^T\mathbf q_1)
=0.
$$

最後に $\mathbf q_2=\mathbf u_2/\|\mathbf u_2\|_2$ とすればorthonormalになる。

### 2. 第j列では過去すべての方向を引く

$$
\mathbf u_j
=\mathbf a_j-
\sum_{i=1}^{j-1}(\mathbf q_i^T\mathbf a_j)\mathbf q_i,
\qquad
\mathbf q_j=\frac{\mathbf u_j}{\|\mathbf u_j\|_2}.
$$

各項は既に作った $\mathbf q_i$ 方向への射影である。したがって「Gram–Schmidt」という新しい魔法の公式ではなく、**orthogonal projectionを繰り返し使うアルゴリズム**である。

### 3. QR分解がどう現れるか

各 $\mathbf a_j$ を整理すると

$$
\mathbf a_j
=\sum_{i=1}^{j}r_{ij}\mathbf q_i,
$$

ここで

$$
r_{ij}=\mathbf q_i^T\mathbf a_j\quad(i<j),
\qquad
r_{jj}=\|\mathbf u_j\|_2.
$$

$j$ 列目には $i\le j$ の係数しか現れないので、係数行列 $\mathbf R$ は上三角になる。列をまとめると

$$
\boxed{\mathbf A=\mathbf Q\mathbf R}.
$$

### 4. rank不足で何が起きるか

もし $\mathbf a_j$ がそれ以前の列のspanに入っていれば、すべての射影成分を引いた後に

$$
\mathbf u_j=\mathbf0
$$

となり、正規化できない。これはアルゴリズムの失敗というより「新しい独立方向が存在しない」ことの検出である。

### 5. 数値計算ではmodified Gram–SchmidtやHouseholder QRを使う理由

classical Gram–Schmidtは理論理解には分かりやすいが、列がほぼ従属なとき丸め誤差で直交性を失いやすい。実際のQRではmodified Gram–SchmidtやHouseholder reflectionがよく使われる。定義上のQRと、それを安定に計算するアルゴリズムは区別する。

## 成立条件・壊れる場合

列が線形従属だと途中で $\mathbf u_j=0$ となり、正規化できない。またclassical Gram–Schmidtは有限精度で直交性を失いやすいため、実装ではmodified Gram–SchmidtやHouseholder QRがよく使われる。理論式と安定アルゴリズムを区別する。

## ここから発展

QRは最小二乗をnormal equationより安定に解く方法になる。次の二Topicで、射影→最小二乗→QR解法の順に接続する。


## このTopicの理解確認

- $u_j$ から過去のprojectionを引くと直交することをinner productで確認できるか。
- $\mathbf A=\mathbf Q\mathbf R$ の $\mathbf R$ がupper triangularになる理由を説明できるか。
- rank不足で $u_j=0$ になる意味を説明できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)


## 演習

[このTopicの10問の演習](/exercises/la-gram-schmidt-qr)
