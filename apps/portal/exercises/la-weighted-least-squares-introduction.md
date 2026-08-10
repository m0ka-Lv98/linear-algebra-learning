# 重み付き最小二乗法（WLS）：演習

[教科書](/textbook/la-weighted-least-squares-introduction)と対応する10問。このTopicでは正の対角重みだけを使い、variance/covarianceを前提にしない。

### WLS-01：概念

通常least squaresとWLSの違いを、残差の「距離の測り方」という観点から説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：通常LSは $\sum_i r_i^2$ を最小化し、すべての残差成分を同じscaleで数える。WLSは正の重み $w_i$ を用いて $\sum_i w_i r_i^2$ を最小化する。$w_i$ が大きい成分のずれほど目的関数へ大きく寄与するので、残差空間の距離尺度を変更していると解釈できる。

</details>

### WLS-02：行列表現

$\mathbf W=\operatorname{diag}(w_1,\ldots,w_m)$ とすると

$$
\mathbf r^T\mathbf W\mathbf r
=
\sum_i w_i r_i^2
$$

となることを成分で示せ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\mathbf W\mathbf r=(w_1r_1,\ldots,w_mr_m)^T$。したがって

$$
\mathbf r^T\mathbf W\mathbf r
=\sum_i r_i(w_i r_i)
=\sum_i w_i r_i^2.
$$

</details>

### WLS-03：square-root scaling

$w_i>0$ とし、$\mathbf D=\operatorname{diag}(\sqrt{w_1},\ldots,\sqrt{w_m})$ と置く。WLSが

$$
\min_{\mathbf x}\|\mathbf D\mathbf A\mathbf x-\mathbf D\mathbf b\|_2^2
$$

という通常LSに変換できることを示せ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\mathbf D^T\mathbf D=\mathbf W$ なので

$$
(\mathbf b-\mathbf A\mathbf x)^T\mathbf W(\mathbf b-\mathbf A\mathbf x)
=\|\mathbf D(\mathbf b-\mathbf A\mathbf x)\|_2^2.
$$

分配すれば $\|\mathbf D\mathbf b-\mathbf D\mathbf A\mathbf x\|_2^2$。符号を反転してもnormは同じなので問題文の形と一致する。

</details>

### WLS-04：weighted normal equation

前問の変換後LSから

$$
\mathbf A^T\mathbf W\mathbf A\hat{\mathbf x}
=
\mathbf A^T\mathbf W\mathbf b
$$

を導け。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$\widetilde{\mathbf A}=\mathbf D\mathbf A$、$\widetilde{\mathbf b}=\mathbf D\mathbf b$ と置く。通常LSのnormal equationは $\widetilde A^T\widetilde A\hat x=\widetilde A^T\widetilde b$。$D^TD=W$ を使うと左辺は $A^TWA\hat x$、右辺は $A^TWb$ になる。

</details>

### WLS-05：図の解釈

同じ大きさの残差を持つ二つの観測に $w_1=4$、$w_2=1/4$ を与える。目的関数への寄与の比を求め、図で重みの大きい観測へ推定が強く引かれる理由を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$|r_1|=|r_2|=r$ なら寄与は $4r^2$ と $r^2/4$。比は16:1。したがって同じ絶対ずれなら第1観測のずれを16倍大きく評価するため、最適化は第1残差を減らすことをより強く優先する。

</details>

### WLS-06：数値例

$$
\mathbf A=(1,1,1)^T,
\quad
\mathbf b=(0,2,10)^T,
\quad
\mathbf W=\operatorname{diag}(1,1,0.1)
$$

についてWLS解を求めよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：scalar $x$ を求めるので

$$
(A^TWA)x=A^TWb.
$$

$A^TWA=1+1+0.1=2.1$、$A^TWb=0+2+1=3$。したがって

$$
\hat x=3/2.1=10/7\approx1.43.
$$

通常LSの平均4より、重みの小さい10の影響が弱くなっている。

</details>

### WLS-07：全重みのscale

$\mathbf W$ を $c\mathbf W$（$c>0$）へ変えてもminimizerが変わらないことを示せ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：目的関数全体が $J_c(\mathbf x)=cJ(\mathbf x)$ になる。$c>0$ なので候補間の大小関係は変わらない。したがってargminは同じ。weighted normal equationでも両辺が同じ $c$ 倍になるので消える。

</details>

### WLS-08：0または負の重み

$w_i=0$ と $w_i<0$ では、それぞれ目的関数の意味がどう変わるか説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$w_i=0$ なら第$i$残差は目的関数に全く寄与せず、その観測を無視するのと同じ。$w_i<0$ では残差を大きくするほど目的関数を小さくできる方向が生じうるため、距離二乗としてのleast-squares解釈を失う。このTopicでは $w_i>0$ に限定する。

</details>

### WLS-09：学習順

「WLSなら最初からcovariance matrixの逆を使えばよい」という説明が、このCourseのTopic 19では不適切な理由を述べよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：covarianceはCourse 03で定義する確率・統計の概念で、一般の対称重み行列を安定に分解する説明にはTopic 24のpositive definite matrixやTopic 25のCholeskyも必要になる。未学習概念を公式として置くより、まずpositive diagonal weightsをrow scalingとして完全に理解し、その後に一般化する方が論理順序を保てる。

</details>

### WLS-10：総合

WLSを「正の対角重みを使ったrow-scaled least squares」として、定義→変換→normal equation→数値例の順で説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

**完全解答**：$J(x)=\sum_i w_i r_i^2=r^TWr$、$W=\operatorname{diag}(w_i)$。$D=\operatorname{diag}(\sqrt{w_i})$ とすれば $W=D^TD$ なので $J=\|D(b-Ax)\|^2$。よって $\widetilde A=DA,\widetilde b=Db$ に通常LSを適用し、$A^TWA\hat x=A^TWb$ を得る。重みが大きい残差ほど目的関数で強く罰せられる。重みの確率的決定やfull covarianceは後続Topic/Courseで扱う。

</details>
