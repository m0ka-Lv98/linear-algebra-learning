# 有向グラフ・DAG・トポロジカル順序：教科書

Course 04｜離散数学と証明｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-trees-spanning-trees` で得た概念を使い、ここでは 有向グラフ・DAG・トポロジカル順序 へ進む。

前提として使うのは `dm-graphs-representations-degrees`、`dm-loop-invariants-termination` です。

## まず直感を作る

DAGでは辺の向きに矛盾しない線形順序を作れる。



## 図の解説

<img src="/visuals/course-04/dm-directed-graphs-dags-topological-order.png" alt="有向グラフ・DAG・トポロジカル順序の図解" style="max-height: 440px; display:block; margin:0 auto;" />

依存関係グラフを左から右へ並べ替え、トポロジカル順序を示す。 矢印の向きが依存関係を表す。閉じた有向cycleがないため、入次数0の頂点から順に取り除くと全頂点を依存順に並べられる。

## 記号・型・次元

- $u\to v$：有向edge
- DAG：directed acyclic graph
- $\operatorname{order}(v)$：topological orderでの位置


## 正式な定義・代表式

DAGのtopological orderは全edge u→vについてuがvより前に現れるvertex順序。有限有向graphはDAGであることとtopological orderを持つことが同値。

代表式は

$$
u\to v\Longrightarrow\operatorname{order}(u)<\operatorname{order}(v)
$$

です。

## なぜこの式・結論になるのか

### 1. DAGにはin-degree 0 vertexがある

全vertexにincoming edgeがあると仮定し、incomingを遡り続けると有限vertexなのでどこかを再訪しcycleになる。矛盾。

### 2. sourceを先頭へ置く

in-degree0 vertexを1つ除く。残りもDAGなので同じ操作を繰り返し、全edgeが前→後になる順序を構成できる。

### 3. 逆方向

topological orderがあるのにdirected cycleがあると、cycleに沿ってorderが厳密増加し最後に最初へ戻る必要があり矛盾。

## 教科書が省略しやすい一段を補う


### DAGなら必ずtopological orderが存在する理由

有限DAGに入次数0のvertexが存在しないと仮定する。任意vertexからincoming edgeを逆向きにたどり続けると、有限個しかvertexがないのでどこかを再訪し、有向cycleができてDAGに反する。よってsourceが少なくとも一つある。

sourceを順序の先頭へ置き削除しても残りはDAG。この操作を帰納的に繰り返せばtopological orderが得られる。逆にtopological orderがあるgraphにcycleがあれば、cycleを一周すると順序がstrictに増え続けて元vertexへ戻る矛盾。したがってDAGとtopological order存在は同値。dependency schedulingの根拠になる。



## 途中を飛ばさず全体をつなぐ

### 有向グラフ・DAG・トポロジカル順序の導出を一本につなげる

DAGのtopological orderは全edge u→vについてuがvより前に現れるvertex順序。有限有向graphはDAGであることとtopological orderを持つことが同値。

#### 1. DAGにはin-degree 0 vertexがある

まず出発点を固定する。 全vertexにincoming edgeがあると仮定し、incomingを遡り続けると有限vertexなのでどこかを再訪しcycleになる。矛盾。 次に必要になるのは「sourceを先頭へ置く」である。

#### 2. sourceを先頭へ置く

ここまでで得た結果を次の段階へ渡す。 in-degree0 vertexを1つ除く。残りもDAGなので同じ操作を繰り返し、全edgeが前→後になる順序を構成できる。 次に必要になるのは「逆方向」である。

#### 3. 逆方向

最後に、前二段階の結果をまとめて結論へ進む。 topological orderがあるのにdirected cycleがあると、cycleに沿ってorderが厳密増加し最後に最初へ戻る必要があり矛盾。

#### 代表式へ戻す

以上をまとめた中心式は

$$
u\to v\Longrightarrow\operatorname{order}(u)<\operatorname{order}(v)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

course prerequisite graphは「前提→後続」。DAGなら履修可能順をtopological sortで得る。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Kahn algorithmはin-degree0 queueからvertexを取り除く。処理数が|V|未満ならcycleが存在。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

cycle A→B→C→AがあるとA<B<C<Aを同時に満たす順序は存在しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

course prerequisite graphは「前提→後続」。DAGなら履修可能順をtopological sortで得る。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Kahn algorithmはin-degree0 queueからvertexを取り除く。処理数が|V|未満ならcycleが存在。

## 成立条件と、条件を外したときに何が壊れるか

- 閉路があるとトポロジカル順序は存在しない。
- 順序は一意とは限らない。
- 有向グラフ・DAG・トポロジカル順序の定義と計算手順を区別し、数値例だけで一般性を判断しない。

cycle A→B→C→AがあるとA<B<C<Aを同時に満たす順序は存在しない。

## よくある誤解を分解する

- 有向グラフ・DAG・トポロジカル順序の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

有向グラフ・DAG・トポロジカル順序では、式へ数値を代入するだけでは不十分である。cycle A→B→C→AがあるとA<B<C<Aを同時に満たす順序は存在しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

build systemやtask schedulerで依存graphをDAGとして扱う。dynamic dependency追加時はcycle detectionが必要。

## ここから一段だけ発展する

最後にindicator変数を使い、離散構造上のrandomized processを期待値で解析する。


## このTopicを理解できたか確認する問い

- 「DAGにはin-degree 0 vertexがある」を式を見ずに説明できるか
- 「逆方向」までの論理を一段ずつ再現できるか
- 有向グラフ・DAG・トポロジカル順序の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-directed-graphs-dags-topological-order)　|　[スライドへ](/slides/dm-directed-graphs-dags-topological-order/)
