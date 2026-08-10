# tensorと多重線形構造：教科書

Course 07｜データ解析の行列手法｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-graph-spectral-methods` で得た概念を使い、ここでは tensorと多重線形構造 へ進む。

前提として使うのは `prep-symbols-types-shapes`、`la-singular-value-decomposition` です。

## まず直感を作る

tensorは3軸以上を持つデータを、軸構造を壊さず扱う表現。



## 図の解説

<img src="/visuals/course-07/mat-tensors-multilinear-overview.png" alt="tensorと多重線形構造の図解" style="max-height: 440px; display:block; margin:0 auto;" />

3次元配列をsliceとrank-1外積の和として図示する。 行列の2軸を3軸以上へ拡張した配列としてtensorを描く。各modeを固定・展開する操作が、行列分解を多方向へ一般化する入口になる。

## 記号・型・次元

- $\mathcal X\in\mathbb R^{I\times J\times K}$：3-way tensor
- $\circ$：outer product
- $a_r\circ b_r\circ c_r$：rank-1 tensor
- $R$：CP components


## 正式な定義・代表式

CP decompositionはtensorをrank-1 outer productsのsumで近似。matrix SVDの単純拡張ではなく、rank/uniqueness/optimization性質が異なる。

代表式は

$$
\mathcal{X}\approx\sum_{r=1}^{R}\mathbf{a}_r\circ\mathbf{b}_r\circ\mathbf{c}_r
$$

です。

## なぜこの式・結論になるのか

### 1. rank-1 entry

$(a\circ b\circ c)_{ijk}=a_i b_j c_k$。各modeのfactorがmultiplicatively結合。

### 2. R components

$X_{ijk}\approx\sum_{r=1}^R a_{ir}b_{jr}c_{kr}$。matrix factorizationより多way structureを保つ。

### 3. unfolding

tensorをmodeごとにmatrix reshapeしてKhatri–Rao productでALS subproblemへ変換できる。

## 教科書が省略しやすい一段を補う


### tensorは「高次元array」だけでなくmodeごとのlinear structureを持つ

3-way tensor $\mathcal X\in\mathbb R^{I\times J\times K}$ は各modeに別のindex意味を持つ。mode-k unfoldingでmatrixへ並べ替えれば、そのmodeに沿うlinear map/factorizationを行列代数として扱える。

CP decompositionはrank-1 outer productsの和、Tuckerはcore tensorと各mode factor matricesに分ける。matrix rankのような単純な一意概念がtensorでは複数あり、計算もnonconvexになりやすい。shape/index conventionを明示しないとtransposeの一般化やaxis orderで誤る。



## 途中を飛ばさず全体をつなぐ

### tensorと多重線形構造の導出を一本につなげる

CP decompositionはtensorをrank-1 outer productsのsumで近似。matrix SVDの単純拡張ではなく、rank/uniqueness/optimization性質が異なる。

#### 1. rank-1 entry

まず出発点を固定する。 $(a\circ b\circ c)_{ijk}=a_i b_j c_k$。各modeのfactorがmultiplicatively結合。 次に必要になるのは「R components」である。

#### 2. R components

ここまでで得た結果を次の段階へ渡す。 $X_{ijk}\approx\sum_{r=1}^R a_{ir}b_{jr}c_{kr}$。matrix factorizationより多way structureを保つ。 次に必要になるのは「unfolding」である。

#### 3. unfolding

最後に、前二段階の結果をまとめて結論へ進む。 tensorをmodeごとにmatrix reshapeしてKhatri–Rao productでALS subproblemへ変換できる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{X}\approx\sum_{r=1}^{R}\mathbf{a}_r\circ\mathbf{b}_r\circ\mathbf{c}_r
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

sample×gene×time dataを3-wayのままfactorizeし、sample pattern・gene pattern・time patternをcomponentごとに分ける。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

matrix化してPCAするとtime/gene modeの構造をまとめて潰すことがある。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

tensor rankはmatrix rankほど単純でなくbest low-rank approximationが存在しないcaseすらある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

sample×gene×time dataを3-wayのままfactorizeし、sample pattern・gene pattern・time patternをcomponentごとに分ける。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

matrix化してPCAするとtime/gene modeの構造をまとめて潰すことがある。

## 成立条件と、条件を外したときに何が壊れるか

- 行列へflattenすると軸の意味を失う場合がある。
- 分解rankの定義は行列より複雑。
- tensorと多重線形構造の定義と計算手順を区別し、数値例だけで一般性を判断しない。

tensor rankはmatrix rankほど単純でなくbest low-rank approximationが存在しないcaseすらある。

## よくある誤解を分解する

- tensorと多重線形構造の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

tensorと多重線形構造では、式へ数値を代入するだけでは不十分である。tensor rankはmatrix rankほど単純でなくbest low-rank approximationが存在しないcaseすらある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

ALS local minima/scale/permutation ambiguity。normalizationとmultiple startsを使う。

## ここから一段だけ発展する

Course08ではこれらのmatrix/data representationsをpredictive modelとevaluation pipelineへ組み込む。


## このTopicを理解できたか確認する問い

- 「rank-1 entry」を式を見ずに説明できるか
- 「unfolding」までの論理を一段ずつ再現できるか
- tensorと多重線形構造の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-tensors-multilinear-overview)　|　[スライドへ](/slides/mat-tensors-multilinear-overview/)
