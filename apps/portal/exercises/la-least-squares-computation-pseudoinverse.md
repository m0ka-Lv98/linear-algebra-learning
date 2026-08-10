# 最小二乗法の計算と擬似逆行列への準備：演習

[教科書](/textbook/la-least-squares-computation-pseudoinverse)と対応する10問。Topic 26のSVDを前提にせず、full-column-rankの最小二乗とQRを中心に扱う。

### LS-COMP-01：概念

$\mathbf A\in\mathbb R^{m\times n}$ がfull-column-rankであるとする。least-squares problemを「出力空間での射影」と「入力係数の決定」の二段階に分けて説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**ヒント**：$\hat{\mathbf b}=\mathbf A\hat{\mathbf x}$ と残差 $\mathbf r$ を使う。

**完全解答**：まず $\mathbf b$ に最も近い $C(\mathbf A)$ 上の点 $\hat{\mathbf b}$ を求める。最短点では $\mathbf r=\mathbf b-\hat{\mathbf b}$ が $C(\mathbf A)$ に直交する。次に $\hat{\mathbf b}=\mathbf A\hat{\mathbf x}$ を満たす係数を求める。full-column-rankなら $N(\mathbf A)=\{0\}$ なので、同じ $\hat{\mathbf b}$ を作る係数は一意である。

</details>

### LS-COMP-02：normal equationの導出

残差の直交条件から

$$
\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b
$$

を、一行ずつ導出せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}$。最適残差は各列に直交するので $\mathbf A^T\mathbf r=0$。したがって

$$
\mathbf A^T(\mathbf b-\mathbf A\hat{\mathbf x})=0,
$$

$$
\mathbf A^T\mathbf b-\mathbf A^T\mathbf A\hat{\mathbf x}=0,
$$

ゆえに

$$
\mathbf A^T\mathbf A\hat{\mathbf x}=\mathbf A^T\mathbf b.
$$

</details>

### LS-COMP-03：なぜ $A^TA$ は可逆か

$\mathbf A$ がfull-column-rankなら $\mathbf A^T\mathbf A$ が可逆であることを、null spaceを使って証明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\mathbf A^T\mathbf A\mathbf z=0$ と仮定する。左から $\mathbf z^T$ を掛けると

$$
0=\mathbf z^T\mathbf A^T\mathbf A\mathbf z
=\|\mathbf A\mathbf z\|_2^2.
$$

したがって $\mathbf A\mathbf z=0$。full-column-rankより $\mathbf z=0$。よって $N(\mathbf A^T\mathbf A)=\{0\}$。$\mathbf A^T\mathbf A$ は正方行列なので可逆である。

</details>

### LS-COMP-04：closed formの導出

前問とnormal equationを使って

$$
\hat{\mathbf x}=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b
$$

を導き、各行列のshapeを示せ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\mathbf A^T\mathbf A\in\mathbb R^{n\times n}$ は可逆なので、normal equationの左からその逆を掛ける。

$$
\hat{\mathbf x}
=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b.
$$

$(\mathbf A^T\mathbf A)^{-1}$ は $n\times n$、$\mathbf A^T$ は $n\times m$、$\mathbf b$ は $m$ 次元なので結果は $n$ 次元となり、$\hat{\mathbf x}\in\mathbb R^n$ と一致する。

</details>

### LS-COMP-05：図と射影

教科書の図で、なぜ $\mathbf A\mathbf A^+\mathbf b$ が $\mathbf b$ より列空間に近いのではなく、**列空間上で $\mathbf b$ に最も近い点そのもの**になるのか説明せよ。ここでは $\mathbf A^+=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T$ とする。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\hat{\mathbf x}=\mathbf A^+\mathbf b$ と置けば $\hat{\mathbf b}=\mathbf A\hat{\mathbf x}=\mathbf A\mathbf A^+\mathbf b$ は明らかに $C(\mathbf A)$ 内にある。さらに

$$
\mathbf A^T(\mathbf b-\hat{\mathbf b})
=\mathbf A^T\mathbf b-
\mathbf A^T\mathbf A(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf b
=0.
$$

したがって残差は列空間に直交する。Topic 15のclosest-point theoremより、$\hat{\mathbf b}$ は列空間上の一意な最短点である。

</details>

### LS-COMP-06：QRの導出

$\mathbf A=\mathbf Q\mathbf R$、$\mathbf Q^T\mathbf Q=\mathbf I_n$ とする。残差直交条件から

$$
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b
$$

を導け。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$C(\mathbf Q)=C(\mathbf A)$ なので

$$
\mathbf Q^T(\mathbf b-\mathbf Q\mathbf R\hat{\mathbf x})=0.
$$

展開して

$$
\mathbf Q^T\mathbf b-\mathbf Q^T\mathbf Q\mathbf R\hat{\mathbf x}=0.
$$

$\mathbf Q^T\mathbf Q=\mathbf I_n$ より

$$
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b.
$$

</details>

### LS-COMP-07：二つの方法の同値性

normal equationへ $\mathbf A=\mathbf Q\mathbf R$ を代入し、QR法と同じ三角方程式が得られることを示せ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：

$$
\mathbf A^T\mathbf A
=\mathbf R^T\mathbf Q^T\mathbf Q\mathbf R
=\mathbf R^T\mathbf R,
$$

$$
\mathbf A^T\mathbf b=\mathbf R^T\mathbf Q^T\mathbf b.
$$

したがって

$$
\mathbf R^T\mathbf R\hat{\mathbf x}
=\mathbf R^T\mathbf Q^T\mathbf b.
$$

full-column-rankなら $\mathbf R$ が可逆なので $\mathbf R^T$ も可逆。左から $(\mathbf R^T)^{-1}$ を掛けて

$$
\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b.
$$

</details>

### LS-COMP-08：数値例

$$
\mathbf A=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},
\qquad
\mathbf b=\begin{bmatrix}1\\2\\2\end{bmatrix}
$$

についてnormal equationを作り、$\hat{\mathbf x}$ と残差 $\mathbf r$ を求め、$\mathbf A^T\mathbf r=0$ を確認せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：

$$
\mathbf A^T\mathbf A=\begin{bmatrix}3&3\\3&5\end{bmatrix},
\qquad
\mathbf A^T\mathbf b=\begin{bmatrix}5\\6\end{bmatrix}.
$$

したがって $3x_1+3x_2=5$、$3x_1+5x_2=6$。差から $x_2=1/2$、さらに $x_1=7/6$。

$$
\hat{\mathbf x}=\begin{bmatrix}7/6\\1/2\end{bmatrix}.
$$

$$
\mathbf r
=\mathbf b-\mathbf A\hat{\mathbf x}
=\begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}.
$$

直接掛けると $\mathbf A^T\mathbf r=(0,0)^T$ となる。

</details>

### LS-COMP-09：rank不足の診断

$$
\mathbf A=\begin{bmatrix}1&1\\2&2\end{bmatrix}
$$

について、なぜfull-column-rank用の式を使えないか、$\mathbf A^T\mathbf A$ とnull spaceの両方から説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：2列が等しいので列は従属。

$$
\mathbf A^T\mathbf A=\begin{bmatrix}5&5\\5&5\end{bmatrix}
$$

もsingularで逆行列を持たない。また

$$
\mathbf A\begin{bmatrix}1\\-1\end{bmatrix}=0
$$

なのでnull spaceが非自明。同じ出力を作る係数が複数存在し、least-squares coefficientは一意でない。一般の擬似逆による選択はTopic 27で扱う。

</details>

### LS-COMP-10：総合説明

「normal equationのclosed formを知っているのに、なぜQRを学ぶ必要があるのか」を、数学的意味と数値計算の両方から説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：数学的には両者は同じ残差直交条件を解く。normal equationでは $\mathbf A^T\mathbf A$ を作り、理論式ではさらに逆行列を記述する。一方QRでは列空間のorthonormal basisへ座標を変え、$\mathbf R\hat{\mathbf x}=\mathbf Q^T\mathbf b$ という三角系を直接解く。逆行列全体を明示形成する必要がなく、$\mathbf A^T\mathbf A$ を作ることによる数値上の不利益も避けやすい。したがってclosed formは理論理解、QRは同じ問題をより直接に計算する方法として役割が異なる。

</details>
