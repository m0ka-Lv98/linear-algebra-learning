# グラフ・表現・次数：教科書

Course 04｜離散数学と証明｜Topic 16/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-divide-conquer-master-theorem` で得た概念を使い、ここでは グラフ・表現・次数 へ進む。

前提として使うのは `dm-relations-equivalence-partial-orders`、`prep-numpy-arrays-shapes` です。

## まず直感を作る

グラフは頂点と辺で関係を表し、道・連結性・次数は局所と大域の構造をつなぐ。



## 図の解説

<img src="/visuals/course-04/dm-graphs-representations-degrees.png" alt="グラフ・表現・次数の図解" style="max-height: 440px; display:block; margin:0 auto;" />

小さなグラフで次数、最短路、連結成分を色分けする。 頂点が対象、辺が対象間の関係である。pathは隣接辺を順にたどる列、cycleは始点へ戻るpathであり、連結性や到達可能性を図上で直接確認できる。

## 記号・型・次元

- $G=(V,E)$：graph
- $V$：vertex集合
- $E$：edge集合
- $\deg(v)$：vertex vに接続するedge数
- $\mathbf A$：隣接行列


## 正式な定義・代表式

無向graphではedgeはvertexのunordered pair。handshake lemmaは $\sum_{v\in V}\deg(v)=2|E|$。

代表式は

$$
\sum_{v\in V}\deg(v)=2|E|
$$

です。

## なぜこの式・結論になるのか

### 1. vertex側からincidenceを数える

各vertexについて接続edgeをdegreeだけ数えると、vertex-edge incidenceの総数はdegreeの和。

### 2. edge側から同じ集合を数える

無向edgeは両端2vertexを持つので各edgeがincidenceを2つ作る。総数2|E|。

### 3. 二重数え上げで等置

同じincidence集合を二方向から数えたのでdegree和=2|E|。

## 教科書が省略しやすい一段を補う


### 同じgraphをlistとmatrixで持つと計算量が変わる

graph $G=(V,E)$ のadjacency matrixは $|V|\times|V|$ でedge有無をO(1)確認できるが、sparse graphでもO(|V|²) memory。adjacency listは各vertexのneighborsだけを保存しO(|V|+|E|) memory、全neighbor走査もdegreeに比例する。

無向graphでは各edgeが二つのendpointのdegreeへ1ずつ寄与するため $\sum_v\deg(v)=2|E|$。この式からodd degree verticesの個数が偶数であることも従う。representationは数学的graphを変えないが、algorithmが何を高速に行えるかを変える。



## 途中を飛ばさず全体をつなぐ

### グラフ・表現・次数の導出を一本につなげる

無向graphではedgeはvertexのunordered pair。handshake lemmaは $\sum_{v\in V}\deg(v)=2|E|$。

#### 1. vertex側からincidenceを数える

まず出発点を固定する。 各vertexについて接続edgeをdegreeだけ数えると、vertex-edge incidenceの総数はdegreeの和。 次に必要になるのは「edge側から同じ集合を数える」である。

#### 2. edge側から同じ集合を数える

ここまでで得た結果を次の段階へ渡す。 無向edgeは両端2vertexを持つので各edgeがincidenceを2つ作る。総数2|E|。 次に必要になるのは「二重数え上げで等置」である。

#### 3. 二重数え上げで等置

最後に、前二段階の結果をまとめて結論へ進む。 同じincidence集合を二方向から数えたのでdegree和=2|E|。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\sum_{v\in V}\deg(v)=2|E|
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

三角形graphは各degree2、和6。edge3本なので2|E|=6。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

隣接listはsparse graphでO(|V|+|E|) memory、隣接行列はO(|V|²)だがedge存在確認がO(1)。representationはalgorithmに影響。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

有向graphではin-degreeとout-degreeを区別する。無向のdegree公式をそのまま「各edgeがdegreeを2増やす」と読むと向きを失う。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

三角形graphは各degree2、和6。edge3本なので2|E|=6。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

隣接listはsparse graphでO(|V|+|E|) memory、隣接行列はO(|V|²)だがedge存在確認がO(1)。representationはalgorithmに影響。

## 成立条件と、条件を外したときに何が壊れるか

- 無向と有向で次数や到達可能性が変わる。
- 隣接行列の対称性は無向グラフに対応する。
- グラフ・表現・次数の定義と計算手順を区別し、数値例だけで一般性を判断しない。

有向graphではin-degreeとout-degreeを区別する。無向のdegree公式をそのまま「各edgeがdegreeを2増やす」と読むと向きを失う。

## よくある誤解を分解する

- グラフ・表現・次数の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

グラフ・表現・次数では、式へ数値を代入するだけでは不十分である。有向graphではin-degreeとout-degreeを区別する。無向のdegree公式をそのまま「各edgeがdegreeを2増やす」と読むと向きを失う。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

networkx等ではmulti-edge/self-loopのdegree conventionを確認する。self-loopは無向degreeに2寄与する定義が一般的。

## ここから一段だけ発展する

degreeは局所量。次Topicではpathを通じたglobalな到達可能性・connectednessを扱う。


## このTopicを理解できたか確認する問い

- 「vertex側からincidenceを数える」を式を見ずに説明できるか
- 「二重数え上げで等置」までの論理を一段ずつ再現できるか
- グラフ・表現・次数の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-graphs-representations-degrees)　|　[スライドへ](/slides/dm-graphs-representations-degrees/)
