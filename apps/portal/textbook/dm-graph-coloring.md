# グラフ彩色：教科書

Course 04｜離散数学

## このTopicで解く問題

隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。

## なぜこの概念が必要か

彩色は「衝突する対象を異なる資源へ割り当てる」問題。時間割、register allocation、周波数割当などへ直結する。

## 図の各要素は何を表しているか

<img src="/visuals/course-04/dm-graph-coloring.png" alt="グラフ彩色の図解" style="max-height: 480px; display:block; margin:0 auto;" />

点が頂点、線が辺。隣接する頂点には異なる色（図では異なるマーカー/ラベル）を割り当てる。三角形部分では3頂点が互いに隣接するため3色が必要で、これがcliqueによる下界を視覚化する。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $G=(V,E)$ | グラフ |
| $c:V→{1,…,k}$ | k彩色 |
| $χ(G)$ | 彩色数 |


- $G=(V,E)$：無向グラフ。
- $c(v)$：頂点vの色label。
- $\chi(G)$：proper coloringに必要な最小色数。

## 中心となる式

$$
(u,v)\in E\Rightarrow c(u)\ne c(v)
$$

## 中心式を前提から導く

1. 色は頂点へのlabel付与。
2. 全ての辺で両端のlabelが異なることをfeasibility条件にする。
3. その条件を満たす最小kをχ(G)と定義する。

## なぜその変形をしてよいのか

proper k-coloringは写像 $c:V\to\{1,\dots,k\}$ で、各辺 $(u,v)\in E$ に対し $c(u)\ne c(v)$。最小kがchromatic number $\chi(G)$。

二部グラフは頂点集合を2群へ分け、辺が群間だけにあるので、辺が1本以上なら2-colorable。逆に奇数cycleがあると2色を交互に置いて一周したとき始点と同色が隣接し矛盾する。よって「二部グラフ iff 奇数cycleなし」という重要な関係が得られる。

## coloringを制約として書く

無向graph $G=(V,E)$ のproper $k$-coloringは写像 $c:V\to\{1,\ldots,k\}$ で、全edge $\{u,v\}\in E$ に対して

$$
c(u)\ne c(v)
$$

を満たすもの。最小の $k$ がchromatic number $\chi(G)$ である。

完全graph $K_r$ では全頂点が互いに隣接するので $\chi(K_r)=r$。一方、cycle $C_n$ は $n$ が偶数なら2色、奇数なら3色必要。奇cycleが2-coloringを壊す最小構造であり、後に「graphがbipartite iff odd cycleを含まない」へつながる。

## greedy coloringの保証と限界

頂点をある順序で処理し、隣接済み頂点が使っていない最小色を割り当てる。最大次数を $\Delta$ とすれば、ある頂点の既使用隣接色は高々 $\Delta$ 種なので必ず $\Delta+1$ 色以内で塗れる。ただし頂点順序に依存し、最小色数を保証するalgorithmではない。

## 例題1：具体的な数値・構造で解く

**問題**：cycle $C_6$ のchromatic numberを求め、具体的な彩色を示せ。

**解答**：$C_6$ は偶数cycleなので二部グラフ。辺があるので1色は不可、頂点を交互に色A,Bで塗れば2色で可能。よって $\chi(C_6)=2$。

## 例題2：別の条件で確認する

cycle $C_5$ は2色で交互に塗ると5番目と1番目が同色になるので2色不可、3色あれば可能。したがって $\chi(C_5)=3$。

## 結果の検算

coloringを得たら全edge $\{u,v\}$ を走査し $c(u)\ne c(v)$ を確認する。最小色数を主張する場合は「その色数で塗れる」上界だけでなく、cliqueやodd cycleなどを使ってそれ未満では不可能という下界も示す。

## 条件を外すと何が壊れるか

greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。greedy結果は頂点順序に依存し、最適より多くの色を使う場合がある。

## よくある誤り

- greedy coloringの使用色数が必ずχ(G)とは限らない。
- 頂点彩色と辺彩色を混同しない。

## 次のTopic・応用への接続

時間割、register allocation、frequency assignmentに対応する。機械学習でもgraph構造のconstraint satisfactionやcombinatorial optimizationの例として重要。

## 参考

- MIT Mathematics for Computer Science: Graph Coloring

[演習へ](/exercises/dm-graph-coloring)　|　[スライドへ](/slides/dm-graph-coloring/)
