# 木と全域木：教科書

Course 04｜離散数学と証明｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-paths-cycles-connectivity` で得た概念を使い、ここでは 木と全域木 へ進む。

前提として使うのは `dm-paths-cycles-connectivity`、`dm-induction-well-ordering` です。

## まず直感を作る

木は閉路を持たず連結なグラフで、頂点数nなら辺数はn-1になる。



## 図の解説

<img src="/visuals/course-04/dm-trees-spanning-trees.png" alt="木と全域木の図解" style="max-height: 440px; display:block; margin:0 auto;" />

木へ1本ずつ辺を追加し、閉路が生じる境界を見る。 根から各頂点へ唯一の単純pathがある構造がtreeである。辺を1本足すとcycleが生じ、1本除くと分断されるという最小連結性が図の枝構造に現れる。

## 記号・型・次元

- $T=(V,E)$：tree
- $|V|=n$
- $|E|$：edge数
- spanning tree：元graphの全vertexを含むtree


## 正式な定義・代表式

treeはconnectedかつcycleなし。有限treeでは $|E|=|V|-1$、任意2vertex間のsimple pathが一意、どのedgeを削除してもdisconnect等が同値。

代表式は

$$
|E|=|V|-1
$$

です。

## なぜこの式・結論になるのか

### 1. leafを使う帰納法

n=1でedge0。n>1のtreeにはleafが存在し、leafとそのedgeを除くとn-1 vertexのtree。帰納仮定でedge n-2、戻してn-1。

### 2. path一意性

2本の異なるsimple pathがあれば、分岐して再合流する部分がcycleを作る。cycleなしなのでpathは一意。

### 3. spanning tree

connected graphからcycle edgeを1本ずつ削除してもconnectednessを保てる。cycleがなくなるまで削除すると全vertexを含むtree。

## 教科書が省略しやすい一段を補う


### treeの複数定義がなぜ同値なのか

有限無向graphについて「connectedかつacyclic」「任意2vertex間にunique simple path」「connectedでedge数|V|-1」「acyclicでedge数|V|-1」などは同値。connected acyclic graphにedgeを1本足すと、その両端には既にunique pathがあるため新edgeと合わせてcycleができる。逆にedgeを1本除くとunique pathが切れてdisconnectedになる。

spanning treeは元graphの全vertexを残して一部edgeだけでtreeにしたもの。connected graphならDFS/BFS treeを取れる。networkを最小edge数で接続する骨格であり、重みがある場合にtotal weightを最小化するminimum spanning treeへ進む。



## 途中を飛ばさず全体をつなぐ

### 木と全域木の導出を一本につなげる

treeはconnectedかつcycleなし。有限treeでは $|E|=|V|-1$、任意2vertex間のsimple pathが一意、どのedgeを削除してもdisconnect等が同値。

#### 1. leafを使う帰納法

まず出発点を固定する。 n=1でedge0。n>1のtreeにはleafが存在し、leafとそのedgeを除くとn-1 vertexのtree。帰納仮定でedge n-2、戻してn-1。 次に必要になるのは「path一意性」である。

#### 2. path一意性

ここまでで得た結果を次の段階へ渡す。 2本の異なるsimple pathがあれば、分岐して再合流する部分がcycleを作る。cycleなしなのでpathは一意。 次に必要になるのは「spanning tree」である。

#### 3. spanning tree

最後に、前二段階の結果をまとめて結論へ進む。 connected graphからcycle edgeを1本ずつ削除してもconnectednessを保てる。cycleがなくなるまで削除すると全vertexを含むtree。

#### 代表式へ戻す

以上をまとめた中心式は

$$
|E|=|V|-1
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

4vertex pathは3edgeでtree。edgeを1本足してcycleを作るとtreeでなくなる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

networkの冗長edgeを除き接続だけ保ちたいときspanning tree。重み付きならminimum spanning treeへ発展。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

$|E|=|V|-1$ だけではtreeを保証しない。disconnectで片componentにcycleがあるgraphでも総edge数だけ一致し得る。connectedness等追加条件が必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

4vertex pathは3edgeでtree。edgeを1本足してcycleを作るとtreeでなくなる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

networkの冗長edgeを除き接続だけ保ちたいときspanning tree。重み付きならminimum spanning treeへ発展。

## 成立条件と、条件を外したときに何が壊れるか

- 連結だけ、閉路なしだけでは木の条件を片方しか満たさない。
- 全域木は元グラフの全頂点を含む。
- 木と全域木の定義と計算手順を区別し、数値例だけで一般性を判断しない。

$|E|=|V|-1$ だけではtreeを保証しない。disconnectで片componentにcycleがあるgraphでも総edge数だけ一致し得る。connectedness等追加条件が必要。

## よくある誤解を分解する

- 木と全域木の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

木と全域木では、式へ数値を代入するだけでは不十分である。$|E|=|V|-1$ だけではtreeを保証しない。disconnectで片componentにcycleがあるgraphでも総edge数だけ一致し得る。connectedness等追加条件が必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

DFS parentを使えばspanning treeを構成できる。再帰DFSは深いtreeでstack overflowに注意。

## ここから一段だけ発展する

方向を付けてcycleを禁止するとDAGになり、依存関係とtopological orderingを扱える。


## このTopicを理解できたか確認する問い

- 「leafを使う帰納法」を式を見ずに説明できるか
- 「spanning tree」までの論理を一段ずつ再現できるか
- 木と全域木の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-trees-spanning-trees)　|　[スライドへ](/slides/dm-trees-spanning-trees/)
