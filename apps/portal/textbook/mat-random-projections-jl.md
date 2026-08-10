# random projectionとJohnson–Lindenstrauss：教科書

Course 07｜データ解析の行列手法｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-cca-multiview` で得た概念を使い、ここでは random projectionとJohnson–Lindenstrauss へ進む。

前提として使うのは `num-randomized-numerical-linear-algebra`、`prob-laws-large-numbers-central-limit-theorem` です。

## まず直感を作る

乱択法は高次元構造を完全に読む代わりに、ランダムな部分空間へ写して主要情報を安価に捉える。



## 図の解説

<img src="/visuals/course-07/mat-random-projections-jl.png" alt="random projectionとJohnson–Lindenstraussの図解" style="max-height: 440px; display:block; margin:0 auto;" />

高次元点間距離が低次元射影でも概ね保たれる様子を見る。 高次元点群を低次元へ写しても、ランダム写像を適切に正規化すれば点間距離が概ね保存される。元の距離と写像後距離の対応を散布として確認する。

## 記号・型・次元

- $R\in\mathbb R^{k\times d}$：random projection
- $z=R x/\sqrt k$
- $\varepsilon$：許容distance distortion


## 正式な定義・代表式

Johnson–Lindenstrauss lemmaは有限点集合をk=O(log n/ε²)次元へrandom linear mapしてpairwise distancesをほぼ保てる。

代表式は

$$
\mathbf{z}=\frac{1}{\sqrt{k}}\mathbf{R}\mathbf{x}
$$

です。

## なぜこの式・結論になるのか

### 1. 固定vectorのnorm concentration

random isotropic RではE||Rx/√k||²=||x||²。独立rowのsumがconcentrationする。

### 2. 全pairへunion bound

n点にはO(n²) pair。1 pair failure probabilityを十分小さくしunion boundすると全distance保存を高確率保証。

### 3. dimension

exponential concentration exp(-cε²k)をn²で抑えるためkがlog n/ε² scale。

## 教科書が省略しやすい一段を補う


### random projectionでdistanceが保たれる直感

random matrix Rのentriesを適切にzero-mean/variance 1/kで選ぶと、fixed vector xについて $\|Rx\|^2$ は $\|x\|^2$ 周りに集中する。concentration inequalityとfinite setの全pairへのunion boundを組み合わせると、k=O(log n/ε²) dimensionsでn pointsの全pair distanceを1±εに保つJohnson–Lindenstrauss型結論が得られる。

PCAと違いdata-dependent optimizationが不要でfast/simpleだが、specific datasetで最小dimensionを選ぶわけではない。random seedとscaling conventionを記録し、downstream distance distortionを実測する。



## 途中を飛ばさず全体をつなぐ

### random projectionとJohnson–Lindenstraussの導出を一本につなげる

Johnson–Lindenstrauss lemmaは有限点集合をk=O(log n/ε²)次元へrandom linear mapしてpairwise distancesをほぼ保てる。

#### 1. 固定vectorのnorm concentration

まず出発点を固定する。 random isotropic RではE||Rx/√k||²=||x||²。独立rowのsumがconcentrationする。 次に必要になるのは「全pairへunion bound」である。

#### 2. 全pairへunion bound

ここまでで得た結果を次の段階へ渡す。 n点にはO(n²) pair。1 pair failure probabilityを十分小さくしunion boundすると全distance保存を高確率保証。 次に必要になるのは「dimension」である。

#### 3. dimension

最後に、前二段階の結果をまとめて結論へ進む。 exponential concentration exp(-cε²k)をn²で抑えるためkがlog n/ε² scale。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{z}=\frac{1}{\sqrt{k}}\mathbf{R}\mathbf{x}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

10000 points, moderate εなら元dimension百万でもkはpoint数のlogに依存。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

sparse random projectionでmatvec costを減らすvariant。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

JLは任意projectionが良いわけでなくrandom distribution/normalizationが条件。individual coordinate interpretabilityは失う。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

10000 points, moderate εなら元dimension百万でもkはpoint数のlogに依存。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

sparse random projectionでmatvec costを減らすvariant。

## 成立条件と、条件を外したときに何が壊れるか

- 乱数seedと再現性を記録する。
- 射影次元が小さすぎると歪みが大きい。
- random projectionとJohnson–Lindenstraussの定義と計算手順を区別し、数値例だけで一般性を判断しない。

JLは任意projectionが良いわけでなくrandom distribution/normalizationが条件。individual coordinate interpretabilityは失う。

## よくある誤解を分解する

- random projectionとJohnson–Lindenstraussの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

random projectionとJohnson–Lindenstraussでは、式へ数値を代入するだけでは不十分である。JLは任意projectionが良いわけでなくrandom distribution/normalizationが条件。individual coordinate interpretabilityは失う。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

seed、distribution、sparsity、distance error quantileを記録。

## ここから一段だけ発展する

missing entriesからlow-rank matrixを推定するmatrix completionへ。


## このTopicを理解できたか確認する問い

- 「固定vectorのnorm concentration」を式を見ずに説明できるか
- 「dimension」までの論理を一段ずつ再現できるか
- random projectionとJohnson–Lindenstraussの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-random-projections-jl)　|　[スライドへ](/slides/mat-random-projections-jl/)
