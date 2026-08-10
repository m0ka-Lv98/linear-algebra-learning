# 疎行列と前処理：教科書

Course 05｜数値計算｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `num-iterative-linear-solvers` で得た概念を使い、ここでは 疎行列と前処理 へ進む。

前提として使うのは `num-iterative-linear-solvers`、`dm-graphs-representations-degrees` です。

## まず直感を作る

疎行列ではゼロを保存・計算しないことが計算量とメモリを大きく左右する。



## 図の解説

<img src="/visuals/course-05/num-sparse-matrices-preconditioning.png" alt="疎行列と前処理の図解" style="max-height: 440px; display:block; margin:0 auto;" />

密行列と疎行列の非ゼロパターンを比較する。 非零要素だけが描かれたpatternは、保存量と演算量が全要素数mnではなく非零数nnzに比例しうることを示す。前処理はこの構造を使いながら難しい方向を縮める。

## 記号・型・次元

- $A$：sparse係数行列
- $M$：解きやすくAに近いpreconditioner
- $M^{-1}A$：変換後operator


## 正式な定義・代表式

preconditioningは解を変えず、iterative solverが見るspectrum/conditioningを改善する変換。M^{-1}を明示せずM z=rを解く操作として使う。

代表式は

$$
\mathbf{M}^{-1}\mathbf{A}\mathbf{x}=\mathbf{M}^{-1}\mathbf{b}
$$

です。

## なぜこの式・結論になるのか

### 1. 同値系

$Ax=b$ の左から可逆M^{-1}を掛けても解xは同じ。

### 2. 理想preconditioner

M=Aなら変換後はIで一stepだがMを解くcostが元問題と同じ。実用では「Aに近く、解くのが安い」tradeoff。

### 3. spectrum clustering

Krylov法ではeigenvalueがclusterすると低次多項式でerrorを抑えやすく、iteration数が減る。

## 教科書が省略しやすい一段を補う


### preconditionerは解を変えずproblem geometryを変える

$Ax=b$ に対しinvertしやすいMを選び $M^{-1}Ax=M^{-1}b$ を解く。exact solutionは同じだが、$M^{-1}A$ のeigenvalue/singular value distributionがclusterしconditionが改善すればiterative convergenceが速くなる。

M=Aなら一step級だがsolve M自体が元問題と同じ難しさ。M=Iならcheapだが改善なし。したがってpreconditioner設計は「Aを十分よく近似しつつM solveは安い」というtrade-off。sparse matrixではfill-inを抑えたincomplete factorization等が使われる。



## 途中を飛ばさず全体をつなぐ

### 疎行列と前処理の導出を一本につなげる

preconditioningは解を変えず、iterative solverが見るspectrum/conditioningを改善する変換。M^{-1}を明示せずM z=rを解く操作として使う。

#### 1. 同値系

まず出発点を固定する。 $Ax=b$ の左から可逆M^{-1}を掛けても解xは同じ。 次に必要になるのは「理想preconditioner」である。

#### 2. 理想preconditioner

ここまでで得た結果を次の段階へ渡す。 M=Aなら変換後はIで一stepだがMを解くcostが元問題と同じ。実用では「Aに近く、解くのが安い」tradeoff。 次に必要になるのは「spectrum clustering」である。

#### 3. spectrum clustering

最後に、前二段階の結果をまとめて結論へ進む。 Krylov法ではeigenvalueがclusterすると低次多項式でerrorを抑えやすく、iteration数が減る。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{M}^{-1}\mathbf{A}\mathbf{x}=\mathbf{M}^{-1}\mathbf{b}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

diagonal scaling M=diag(A) は安価で、変数scale差が大きい系のconditionを改善する場合がある。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

incomplete LU/Choleskyはfillを制限してexact factorizationの近似を作る。memoryとqualityのtradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

diagonal scaling M=diag(A) は安価で、変数scale差が大きい系のconditionを改善する場合がある。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

incomplete LU/Choleskyはfillを制限してexact factorizationの近似を作る。memoryとqualityのtradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- 疎なAでも逆行列は密になることがある。
- 前処理は解を変えず収束性を改善する。
- 疎行列と前処理の定義と計算手順を区別し、数値例だけで一般性を判断しない。

preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。

## よくある誤解を分解する

- 疎行列と前処理の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

疎行列と前処理では、式へ数値を代入するだけでは不十分である。preconditioner構築costがsolve節約を上回るとtotal timeは悪化する。iteration数だけで評価しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

sparse format CSR/CSC選択、fill-in、parallelismを測る。M^{-1}をdense matrixとして構築しない。

## ここから一段だけ発展する

least squares, eigen, SVDでもconditioningとfactorization choiceが数値品質を左右する。


## このTopicを理解できたか確認する問い

- 「同値系」を式を見ずに説明できるか
- 「spectrum clustering」までの論理を一段ずつ再現できるか
- 疎行列と前処理の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-sparse-matrices-preconditioning)　|　[スライドへ](/slides/num-sparse-matrices-preconditioning/)
