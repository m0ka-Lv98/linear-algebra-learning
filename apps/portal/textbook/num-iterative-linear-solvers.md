# 連立方程式の反復法：教科書

Course 05｜数値計算｜Topic 10/20

## このTopicは、前の何を受けて始まるか

前Topic `num-direct-solvers-pivoting` で得た概念を使い、ここでは 連立方程式の反復法 へ進む。

前提として使うのは `num-direct-solvers-pivoting`、`la-eigenvalues-eigenvectors` です。

## まず直感を作る

反復線形解法は現在の近似から次の近似を作り、残差を減らして解へ近づく。



## 図の解説

<img src="/visuals/course-05/num-iterative-linear-solvers.png" alt="連立方程式の反復法の図解" style="max-height: 440px; display:block; margin:0 auto;" />

反復ごとの残差ノルムを半対数グラフで追う。 各反復点は現在の近似解、真の解との差よりも残差b-Axの減少を直接観測する。スペクトル性質が反復方向ごとの誤差減衰率を決める。

## 記号・型・次元

- $x^{(k)}$：k反復目
- $M$：iteration matrix
- $c$：定数vector
- $\rho(M)$：spectral radius


## 正式な定義・代表式

stationary iteration $x^{k+1}=Mx^k+c$ はfixed pointが解になるよう設計する。errorは $e^{k+1}=Me^k$ なので $\rho(M)<1$ が基本収束条件。

代表式は

$$
\mathbf{x}^{(k+1)}=\mathbf{M}\mathbf{x}^{(k)}+\mathbf{c}
$$

です。

## なぜこの式・結論になるのか

### 1. fixed point条件

解x*が $x*=Mx*+c$ を満たすようAのsplitからM,cを作る。

### 2. 誤差式

反復式からfixed point式を引くと $e^{k+1}=Me^k=M^{k+1}e^0$。

### 3. spectral radius

Mの固有方向は各stepで固有値倍される。全成分を0へするには長期的に全固有値modulus<1が必要。

## 教科書が省略しやすい一段を補う


### iterative solverはsolutionそのものよりresidualを更新する

stationary iterationを $x_{k+1}=Gx_k+c$ と書くと、true solution x*もx*=Gx*+cを満たすのでerrorは $e_{k+1}=Ge_k$。したがって $G^k\to0$、特にspectral radius $\rho(G)<1$ が収束の中心条件になる。

Krylov methodsは $r_0,Ar_0,A^2r_0,\ldots$ が張るsubspace内で近似を改善する。CGはsymmetric positive definite AでA-conjugate directionsを選びquadratic objectiveを最小化する。iterative methodは大規模sparse problemでmatrix factorizationを避けられるが、conditionとpreconditioningが反復数を左右する。



## 途中を飛ばさず全体をつなぐ

### 連立方程式の反復法の導出を一本につなげる

stationary iteration $x^{k+1}=Mx^k+c$ はfixed pointが解になるよう設計する。errorは $e^{k+1}=Me^k$ なので $\rho(M)<1$ が基本収束条件。

#### 1. fixed point条件

まず出発点を固定する。 解x*が $x*=Mx*+c$ を満たすようAのsplitからM,cを作る。 次に必要になるのは「誤差式」である。

#### 2. 誤差式

ここまでで得た結果を次の段階へ渡す。 反復式からfixed point式を引くと $e^{k+1}=Me^k=M^{k+1}e^0$。 次に必要になるのは「spectral radius」である。

#### 3. spectral radius

最後に、前二段階の結果をまとめて結論へ進む。 Mの固有方向は各stepで固有値倍される。全成分を0へするには長期的に全固有値modulus<1が必要。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}^{(k+1)}=\mathbf{M}\mathbf{x}^{(k)}+\mathbf{c}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

単純な2×2 JacobiでMのspectral radius0.5ならerrorのdominant成分は概ね毎回半減。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

CGはSPD行列用で、単純stationary iterationよりKrylov subspaceを利用して速く収束する。適用条件を確認する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

残差が単調に減るとは限らず、ρ(M)>1なら初期値によって発散。反復回数上限で止まっただけを収束と呼ばない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

単純な2×2 JacobiでMのspectral radius0.5ならerrorのdominant成分は概ね毎回半減。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

CGはSPD行列用で、単純stationary iterationよりKrylov subspaceを利用して速く収束する。適用条件を確認する。

## 成立条件と、条件を外したときに何が壊れるか

- 収束には反復行列のスペクトル半径などの条件がある。
- 残差の監視を必ず行う。
- 連立方程式の反復法の定義と計算手順を区別し、数値例だけで一般性を判断しない。

残差が単調に減るとは限らず、ρ(M)>1なら初期値によって発散。反復回数上限で止まっただけを収束と呼ばない。

## よくある誤解を分解する

- 連立方程式の反復法の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

連立方程式の反復法では、式へ数値を代入するだけでは不十分である。残差が単調に減るとは限らず、ρ(M)>1なら初期値によって発散。反復回数上限で止まっただけを収束と呼ばない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

matrixを明示factorizeせずmatvecだけ実装できるmatrix-free法がある。stopはpreconditioned residual等の定義をlibrary仕様で確認。

## ここから一段だけ発展する

収束を劇的に改善するため、同じ解を持つがconditionの良い系へ変換するpreconditioningへ。


## このTopicを理解できたか確認する問い

- 「fixed point条件」を式を見ずに説明できるか
- 「spectral radius」までの論理を一段ずつ再現できるか
- 連立方程式の反復法の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-iterative-linear-solvers)　|　[スライドへ](/slides/num-iterative-linear-solvers/)
