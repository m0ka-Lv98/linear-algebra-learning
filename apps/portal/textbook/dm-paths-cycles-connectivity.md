# 道・閉路・連結性：教科書

Course 04｜離散数学と証明｜Topic 17/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-graphs-representations-degrees` で得た概念を使い、ここでは 道・閉路・連結性 へ進む。

前提として使うのは `dm-graphs-representations-degrees` です。

## まず直感を作る

グラフは頂点と辺で関係を表し、道・連結性・次数は局所と大域の構造をつなぐ。



## 図の解説

<img src="/visuals/course-04/dm-paths-cycles-connectivity.png" alt="道・閉路・連結性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

小さなグラフで次数、最短路、連結成分を色分けする。 頂点が対象、辺が対象間の関係である。pathは隣接辺を順にたどる列、cycleは始点へ戻るpathであり、連結性や到達可能性を図上で直接確認できる。

## 記号・型・次元

- $u,v\in V$：vertex
- path：隣接edgeを連続して辿るvertex列
- $d(u,v)$：最短path長
- connected component：互いに到達可能な最大集合


## 正式な定義・代表式

無向graphでuからvへのpathが存在することは同値関係を作り、その同値類がconnected component。距離はpath長の最小値。

代表式は

$$
d(u,v)=\min\{\text{path length}\}
$$

です。

## なぜこの式・結論になるのか

### 1. 到達可能性の3性質

長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。

### 2. componentが分割になる

同値関係なのでvertex集合は互いに交わらないconnected componentへ分割される。

### 3. 最短距離の三角不等式

u→v最短pathとv→w最短pathを連結すればu→wの候補path。最短はその長さ以下なので $d(u,w)\le d(u,v)+d(v,w)$。

## 教科書が省略しやすい一段を補う


### reachabilityをpathの存在として定義する

pathは隣接vertexをedgeでつないだ列、simple pathはvertex重複なし。uからvへpathが存在することをu~vとすると、無向graphでは反射・対称・推移が成り立ちequivalence relationになる。そのequivalence classがconnected componentである。

cycleは始点と終点が同じ閉path。treeがconnectedかつcycle-freeであること、またconnected graphでedgeを追加するとcycleを作りうることなど、後続構造の基礎になる。BFS/DFSはpathの存在を実際に探索しながらcomponentを構成するalgorithmである。



## 途中を飛ばさず全体をつなぐ

### 道・閉路・連結性の導出を一本につなげる

無向graphでuからvへのpathが存在することは同値関係を作り、その同値類がconnected component。距離はpath長の最小値。

#### 1. 到達可能性の3性質

まず出発点を固定する。 長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。 次に必要になるのは「componentが分割になる」である。

#### 2. componentが分割になる

ここまでで得た結果を次の段階へ渡す。 同値関係なのでvertex集合は互いに交わらないconnected componentへ分割される。 次に必要になるのは「最短距離の三角不等式」である。

#### 3. 最短距離の三角不等式

最後に、前二段階の結果をまとめて結論へ進む。 u→v最短pathとv→w最短pathを連結すればu→wの候補path。最短はその長さ以下なので $d(u,w)\le d(u,v)+d(v,w)$。

#### 代表式へ戻す

以上をまとめた中心式は

$$
d(u,v)=\min\{\text{path length}\}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

edgeを1本削除するとcomponent数が増える場合、そのedgeはbridge。cycle上のedgeなら別経路があるため削除しても連結性を保つ。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

edgeを1本削除するとcomponent数が増える場合、そのedgeはbridge。cycle上のedgeなら別経路があるため削除しても連結性を保つ。

## 成立条件と、条件を外したときに何が壊れるか

- 無向と有向で次数や到達可能性が変わる。
- 隣接行列の対称性は無向グラフに対応する。
- 道・閉路・連結性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

## よくある誤解を分解する

- 道・閉路・連結性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

道・閉路・連結性では、式へ数値を代入するだけでは不十分である。有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

BFS/DFSでvisitedを管理しないとcycleで無限探索し得る。graph representationでcomplexityも変わる。

## ここから一段だけ発展する

cycleを持たないconnected graphがtree。最小edge数でconnectednessを保つ構造として次Topicへ。


## このTopicを理解できたか確認する問い

- 「到達可能性の3性質」を式を見ずに説明できるか
- 「最短距離の三角不等式」までの論理を一段ずつ再現できるか
- 道・閉路・連結性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-paths-cycles-connectivity)　|　[スライドへ](/slides/dm-paths-cycles-connectivity/)
