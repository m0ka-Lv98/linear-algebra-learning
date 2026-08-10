# 最適化問題の定式化：教科書

Course 06｜最適化｜Topic 01/20

## このTopicは、前の何を受けて始まるか

Course 06 の入口として、最適化問題の定式化 を定義から組み立てる。

前提として使うのは `calc-unconstrained-optimization`、`calc-lagrange-multipliers` です。

## まず直感を作る

最適化は「変えられる変数」「最小化したい目的」「守る制約」を分離して定義することから始まる。



## 図の解説

<img src="/visuals/course-06/opt-problem-formulation-objectives-constraints.png" alt="最適化問題の定式化の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2変数目的関数の等高線上に実行可能領域を重ねる。 等高線は同じ目的関数値、塗られた領域は制約を満たす点である。最適解は実行可能領域の中で最も低い等高線が初めて接触する位置として読める。

## 記号・型・次元

- $\mathbf x\in\mathbb R^n$：decision variable
- $f(\mathbf x)$：objective
- $\mathcal X$：feasible set
- $g_i(\mathbf x)\le0,h_j(\mathbf x)=0$：constraints


## 正式な定義・代表式

最適化問題は「何を選べるか」と「何を良くしたいか」を分離し、$\min_{x\in\mathcal X}f(x)$ と書く。modelingでは変数・目的・制約・単位を明示する。

代表式は

$$
\min_{\mathbf{x}\in\mathcal{X}} f(\mathbf{x})
$$

です。

## なぜこの式・結論になるのか

### 1. 現実の選択を変数へ写す

制御量・parameter・配分量をvector xへまとめる。観測値やfixed constantはdecision variableに入れない。

### 2. 評価基準をscalarへ

複数の望ましさを目的関数fへ写す。maximizeは符号を反転してminimizeへ統一できる。

### 3. 許容条件を集合へ

物理・予算・確率等の条件をXへ集める。最適解とはX内でfを最小にする点で、feasibleでない低f点は候補外。

## 教科書が省略しやすい一段を補う


### 最適化はalgorithmより前に「何を選べるか」を定義する

一般形は
$$
\min_{\mathbf x} f(\mathbf x)\quad\text{s.t.}\quad g_i(\mathbf x)\le0,\;h_j(\mathbf x)=0.
$$
$\mathbf x$ がdecision variable、fがobjective、constraintsがfeasible setを決める。ここを曖昧にしたままsolverを選んでも、解いている問題自体が意図と違う可能性がある。

同じphysical problemでもparameterizationでgeometryが変わる。unitsの異なるvariablesはgradient scaleを歪め、hard constraintをpenaltyへ移すと元問題と別のobjectiveになる。まずdata/parameter/decision、fixed/optimized、hard/softを文章で分離し、feasibilityとoptimalityを別々に検証する。



## 途中を飛ばさず全体をつなぐ

### 最適化問題の定式化の導出を一本につなげる

最適化問題は「何を選べるか」と「何を良くしたいか」を分離し、$\min_{x\in\mathcal X}f(x)$ と書く。modelingでは変数・目的・制約・単位を明示する。

#### 1. 現実の選択を変数へ写す

まず出発点を固定する。 制御量・parameter・配分量をvector xへまとめる。観測値やfixed constantはdecision variableに入れない。 次に必要になるのは「評価基準をscalarへ」である。

#### 2. 評価基準をscalarへ

ここまでで得た結果を次の段階へ渡す。 複数の望ましさを目的関数fへ写す。maximizeは符号を反転してminimizeへ統一できる。 次に必要になるのは「許容条件を集合へ」である。

#### 3. 許容条件を集合へ

最後に、前二段階の結果をまとめて結論へ進む。 物理・予算・確率等の条件をXへ集める。最適解とはX内でfを最小にする点で、feasibleでない低f点は候補外。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\mathbf{x}\in\mathcal{X}} f(\mathbf{x})
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

配分x1,x2≥0, x1+x2=100, cost=3x1+5x2を最小化。変数・制約・目的を分けるだけで「何を解くか」が明確。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

回帰はx=係数、f=training loss、constraintなし/regularization付きと見なせる。model choiceとoptimization problemを区別する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

配分x1,x2≥0, x1+x2=100, cost=3x1+5x2を最小化。変数・制約・目的を分けるだけで「何を解くか」が明確。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

回帰はx=係数、f=training loss、constraintなし/regularization付きと見なせる。model choiceとoptimization problemを区別する。

## 成立条件と、条件を外したときに何が壊れるか

- 目的関数と評価指標を混同しない。
- 制約の単位・スケールを揃える。
- 最適化問題の定式化の定義と計算手順を区別し、数値例だけで一般性を判断しない。

目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。

## よくある誤解を分解する

- 最適化問題の定式化の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

最適化問題の定式化では、式へ数値を代入するだけでは不十分である。目的にvalidation metricを含めたままtest dataでtuningするとdata leakage。数学的定式化が正しくても情報flowの制約を破る。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

scaleの違うobjective項を足す場合、weightの単位と意味を記録。solverへ渡す前にfeasibility checkとgradient shapeをtestする。

## ここから一段だけ発展する

次に、問題がconvexなら局所情報からglobal optimumを保証しやすくなるため、集合と関数のconvexityを定義する。


## このTopicを理解できたか確認する問い

- 「現実の選択を変数へ写す」を式を見ずに説明できるか
- 「許容条件を集合へ」までの論理を一段ずつ再現できるか
- 最適化問題の定式化の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-problem-formulation-objectives-constraints)　|　[スライドへ](/slides/opt-problem-formulation-objectives-constraints/)
