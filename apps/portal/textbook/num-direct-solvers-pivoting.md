# 連立方程式の直接法とpivoting：教科書

Course 05｜数値計算｜Topic 09/20

## このTopicは、前の何を受けて始まるか

前Topic `num-numerical-integration-quadrature` で得た概念を使い、ここでは 連立方程式の直接法とpivoting へ進む。

前提として使うのは `la-lu-factorization`、`num-errors-conditioning-stability` です。

## まず直感を作る

連立一次方程式を、解集合を変えない行基本変形で階段形へ整理する操作として見る。



## 図の解説

<img src="/visuals/course-05/num-direct-solvers-pivoting.png" alt="連立方程式の直接法とpivotingの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2変数または3変数の方程式を1行ずつ消去し、係数行列が三角化される過程を追う。 行列の各行は方程式、消去操作は解集合を変えない行基本変形である。pivot下を0にして三角形構造を作ることで、最後は後退代入だけで解ける。

## 記号・型・次元

- $P$：row permutation
- $A$：係数行列
- $L$：unit lower triangular
- $U$：upper triangular


## 正式な定義・代表式

Gaussian eliminationを行列分解として記録するとpivoting付きで $PA=LU$。方程式Ax=bはforward/back substitutionへ分かれる。

代表式は

$$
\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}
$$

です。

## なぜこの式・結論になるのか

### 1. 消去をlower係数として保存

第k列下を消す multiplier $l_{ik}=a_{ik}/a_{kk}$ をLに保存すると、消去操作の積をまとめてA=LUと表せる。

### 2. pivotingの理由

pivotが0なら割れず、小さすぎれば丸め誤差を増幅。候補行を交換して大きいpivotを選ぶためPが入る。

### 3. solveへ分解

$PAx=Pb$, $LUx=Pb$。まずLy=Pbをforward solve、次にUx=yをback solve。inverseを作る必要はない。

## 教科書が省略しやすい一段を補う


### Gaussian eliminationは同値な方程式系へ変形する

row operationは方程式の順序交換、nonzero scalar倍、他行の倍数加算でありsolution setを変えない。これを使ってpivot下を0にし $A=LU$ に対応するtriangular structureを作る。forward/back substitutionでsolveできる。

finite precisionでは小さいpivotで割るとmultiplierが巨大になりrounding errorを増幅する。partial pivotingは各columnで絶対値の大きい候補をpivotへ交換し、その危険を抑える。理論上inverseを作ってx=A^{-1}bとしても、実装ではfactorization後にsolveする方が演算量・stabilityとも通常良い。



## 途中を飛ばさず全体をつなぐ

### 連立方程式の直接法とpivotingの導出を一本につなげる

Gaussian eliminationを行列分解として記録するとpivoting付きで $PA=LU$。方程式Ax=bはforward/back substitutionへ分かれる。

#### 1. 消去をlower係数として保存

まず出発点を固定する。 第k列下を消す multiplier $l_{ik}=a_{ik}/a_{kk}$ をLに保存すると、消去操作の積をまとめてA=LUと表せる。 次に必要になるのは「pivotingの理由」である。

#### 2. pivotingの理由

ここまでで得た結果を次の段階へ渡す。 pivotが0なら割れず、小さすぎれば丸め誤差を増幅。候補行を交換して大きいpivotを選ぶためPが入る。 次に必要になるのは「solveへ分解」である。

#### 3. solveへ分解

最後に、前二段階の結果をまとめて結論へ進む。 $PAx=Pb$, $LUx=Pb$。まずLy=Pbをforward solve、次にUx=yをback solve。inverseを作る必要はない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{P}\mathbf{A}=\mathbf{L}\mathbf{U}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ は最初pivot0。row swapでPを適用すれば消去可能。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

同じAで複数bを解くならLUを一度計算し、各bでtriangular solveだけ繰り返せる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ は最初pivot0。row swapでPを適用すれば消去可能。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

同じAで複数bを解くならLUを一度計算し、各bでtriangular solveだけ繰り返せる。

## 成立条件と、条件を外したときに何が壊れるか

- pivotが0または極端に小さい場合は行交換を考える。
- 行基本変形は解集合を保存する。
- 連立方程式の直接法とpivotingの定義と計算手順を区別し、数値例だけで一般性を判断しない。

$A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。

## よくある誤解を分解する

- 連立方程式の直接法とpivotingの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

連立方程式の直接法とpivotingでは、式へ数値を代入するだけでは不十分である。$A^{-1}b$ を明示inverseで計算するのは通常solveより高cost・不安定。理論式と数値algorithmを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

partial pivotingが標準。sparseではfill-inを減らすpermutationも重要。residualとbackward errorで検算する。

## ここから一段だけ発展する

大規模sparse系ではfactorization cost/memoryが重く、matrix-vector product中心のiterative solverへ進む。


## このTopicを理解できたか確認する問い

- 「消去をlower係数として保存」を式を見ずに説明できるか
- 「solveへ分解」までの論理を一段ずつ再現できるか
- 連立方程式の直接法とpivotingの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-direct-solvers-pivoting)　|　[スライドへ](/slides/num-direct-solvers-pivoting/)
