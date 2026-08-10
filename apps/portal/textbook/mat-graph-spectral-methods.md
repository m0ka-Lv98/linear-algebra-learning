# グラフspectral method：教科書

Course 07｜データ解析の行列手法｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `mat-matrix-completion` で得た概念を使い、ここでは グラフspectral method へ進む。

前提として使うのは `dm-graphs-representations-degrees`、`la-symmetric-matrices-spectral-theorem` です。

## まず直感を作る

グラフは頂点と辺で関係を表し、道・連結性・次数は局所と大域の構造をつなぐ。



## 図の解説

<img src="/visuals/course-07/mat-graph-spectral-methods.png" alt="グラフspectral methodの図解" style="max-height: 440px; display:block; margin:0 auto;" />

小さなグラフで次数、最短路、連結成分を色分けする。 頂点が対象、辺が対象間の関係である。pathは隣接辺を順にたどる列、cycleは始点へ戻るpathであり、連結性や到達可能性を図上で直接確認できる。

## 記号・型・次元

- $A$：adjacency
- $D$：degree diagonal
- $L=D-A$：graph Laplacian
- $x^TLx=\sum_{(i,j)\in E}(x_i-x_j)^2$（undirected）


## 正式な定義・代表式

Laplacian quadratic formはconnected verticesのsignal差を測る。zero eigenvectorsはconnected componentsを反映し、small eigenvectorsはsmooth graph coordinates。

代表式は

$$
\mathbf{L}=\mathbf{D}-\mathbf{A}
$$

です。

## なぜこの式・結論になるのか

### 1. quadratic form展開

$x^TDx- x^TAx$ をedge sumへ整理すると各edge difference squareの和。

### 2. PSD

square sumなので≥0。constant vectorは全difference0でL1=0。

### 3. components

各connected componentごとにconstantなvectorがnull space。zero eigenvalue multiplicity=component数。

## 教科書が省略しやすい一段を補う


### Laplacian quadratic formが「edge上の差」を測る

undirected weighted graphでL=D-Wとすると
$$
\mathbf x^TL\mathbf x=\frac12\sum_{ij}w_{ij}(x_i-x_j)^2.
$$
展開すればdegree termとadjacency cross termが一致する。この式からL is PSD、constant vectorがeigenvalue0に対応することが分かる。

second-smallest eigenvectorはconnected components/graph cut geometryを反映し、spectral clusteringで低dim embeddingとして使う。normalized Laplacianはdegree差を補正する。matrix eigenproblemがgraph smoothness最適化と同じ構造になる。



## 途中を飛ばさず全体をつなぐ

### グラフspectral methodの導出を一本につなげる

Laplacian quadratic formはconnected verticesのsignal差を測る。zero eigenvectorsはconnected componentsを反映し、small eigenvectorsはsmooth graph coordinates。

#### 1. quadratic form展開

まず出発点を固定する。 $x^TDx- x^TAx$ をedge sumへ整理すると各edge difference squareの和。 次に必要になるのは「PSD」である。

#### 2. PSD

ここまでで得た結果を次の段階へ渡す。 square sumなので≥0。constant vectorは全difference0でL1=0。 次に必要になるのは「components」である。

#### 3. components

最後に、前二段階の結果をまとめて結論へ進む。 各connected componentごとにconstantなvectorがnull space。zero eigenvalue multiplicity=component数。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{L}=\mathbf{D}-\mathbf{A}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

connected path graphのsecond eigenvectorは端から端へ滑らかに変化しspectral embedding coordinateになる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

normalized Laplacianはdegree scaleを調整し、irregular graphで異なるgeometry。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

directed/negative-weight graphではstandard symmetric Laplacianの性質をそのまま使えない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

connected path graphのsecond eigenvectorは端から端へ滑らかに変化しspectral embedding coordinateになる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

normalized Laplacianはdegree scaleを調整し、irregular graphで異なるgeometry。

## 成立条件と、条件を外したときに何が壊れるか

- 無向と有向で次数や到達可能性が変わる。
- 隣接行列の対称性は無向グラフに対応する。
- グラフspectral methodの定義と計算手順を区別し、数値例だけで一般性を判断しない。

directed/negative-weight graphではstandard symmetric Laplacianの性質をそのまま使えない。

## よくある誤解を分解する

- グラフspectral methodの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

グラフspectral methodでは、式へ数値を代入するだけでは不十分である。directed/negative-weight graphではstandard symmetric Laplacianの性質をそのまま使えない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

sparse eigensolverでsmall eigenpairs。isolated nodes、normalization conventionを確認。

## ここから一段だけ発展する

matrixからさらに多way interactionを持つtensorへ一般化する。


## このTopicを理解できたか確認する問い

- 「quadratic form展開」を式を見ずに説明できるか
- 「components」までの論理を一段ずつ再現できるか
- グラフspectral methodの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)
- [Boyd & Vandenberghe, Introduction to Applied Linear Algebra](https://web.stanford.edu/~boyd/vmls/)

[演習へ](/exercises/mat-graph-spectral-methods)　|　[スライドへ](/slides/mat-graph-spectral-methods/)
