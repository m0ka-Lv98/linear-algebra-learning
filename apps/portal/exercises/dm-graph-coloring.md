# グラフ彩色：演習

Course 04｜離散数学

[教科書](/textbook/dm-graph-coloring)

## 問題1

cycle $C_6$ のchromatic numberを求め、具体的な彩色を示せ。

<details><summary>完全解答</summary>

$C_6$ は偶数cycleなので二部グラフ。辺があるので1色は不可、頂点を交互に色A,Bで塗れば2色で可能。よって $\chi(C_6)=2$。

</details>

## 問題2

「グラフ彩色」の導出を、最初の段階「1. 色は頂点へのlabel付与。」から始めて中心式まで再構成せよ。途中で「proper k-coloringは写像 $c:V\to\{1,\dots,k\}$ で、各辺 $(u,v)\in E$ に対し $c(u)\ne c(v)$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 色は頂点へのlabel付与。
2. 全ての辺で両端のlabelが異なることをfeasibility条件にする。
3. その条件を満たす最小kをχ(G)と定義する。

proper k-coloringは写像 $c:V\to\{1,\dots,k\}$ で、各辺 $(u,v)\in E$ に対し $c(u)\ne c(v)$。最小kがchromatic number $\chi(G)$。

二部グラフは頂点集合を2群へ分け、辺が群間だけにあるので、辺が1本以上なら2-colorable。逆に奇数cycleがあると2色を交互に置いて一周したとき始点と同色が隣接し矛盾する。よって「二部グラフ iff 奇数cycleなし」という重要な関係が得られる。

</details>

## 問題3

図 `/visuals/course-04/dm-graph-coloring.png` では「点が頂点、線が辺。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-04/dm-graph-coloring.png" alt="グラフ彩色の図解" style="max-height: 480px; display:block; margin:0 auto;" />

点が頂点、線が辺。隣接する頂点には異なる色（図では異なるマーカー/ラベル）を割り当てる。三角形部分では3頂点が互いに隣接するため3色が必要で、これがcliqueによる下界を視覚化する。

</details>

## 問題4

「グラフ彩色」の第二例「cycle $C_5$ は2色で交互に塗ると5番目と1番目が同色になるので2色不可、3色あれば可能。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

cycle $C_5$ は2色で交互に塗ると5番目と1番目が同色になるので2色不可、3色あれば可能。したがって $\chi(C_5)=3$。

</details>

## 問題5

グラフ彩色で グラフ、k彩色、彩色数 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`dm-graph-coloring` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $G=(V,E)$ | グラフ |
| $c:V→{1,…,k}$ | k彩色 |
| $χ(G)$ | 彩色数 |


- $G=(V,E)$：無向グラフ。
- $c(v)$：頂点vの色label。
- $\chi(G)$：proper coloringに必要な最小色数。

</details>

## 問題6

警告「greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。greedy結果は頂点順序に依存し、最適より多くの色を使う場合がある。

</details>

## 問題7

よくある誤り「greedy coloringの使用色数が必ずχ(G)とは限らない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- greedy coloringの使用色数が必ずχ(G)とは限らない。
- 頂点彩色と辺彩色を混同しない。

greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。greedy結果は頂点順序に依存し、最適より多くの色を使う場合がある。

</details>

## 問題8

「グラフ彩色」の例題1を再計算し、その結果に対して次の検算を実行せよ：coloringを得たら全edge $\{u,v\}$ を走査し $c(u)\ne c(v)$ を確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$C_6$ は偶数cycleなので二部グラフ。辺があるので1色は不可、頂点を交互に色A,Bで塗れば2色で可能。よって $\chi(C_6)=2$。

検算：
coloringを得たら全edge $\{u,v\}$ を走査し $c(u)\ne c(v)$ を確認する。最小色数を主張する場合は「その色数で塗れる」上界だけでなく、cliqueやodd cycleなどを使ってそれ未満では不可能という下界も示す。

</details>

## 問題9

後続への接続「時間割、register allocation、frequency assignmentに対応する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

時間割、register allocation、frequency assignmentに対応する。機械学習でもgraph構造のconstraint satisfactionやcombinatorial optimizationの例として重要。

</details>

## 問題10

中心問題「隣接頂点が同じ色を持たないようにする最小色数は、グラフ構造とどう関係するか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ (u,v)\in E\Rightarrow c(u)\ne c(v) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $G=(V,E)$ | グラフ |
| $c:V→{1,…,k}$ | k彩色 |
| $χ(G)$ | 彩色数 |


- $G=(V,E)$：無向グラフ。
- $c(v)$：頂点vの色label。
- $\chi(G)$：proper coloringに必要な最小色数。

中心式：
$$
(u,v)\in E\Rightarrow c(u)\ne c(v)
$$

導出：
1. 色は頂点へのlabel付与。
2. 全ての辺で両端のlabelが異なることをfeasibility条件にする。
3. その条件を満たす最小kをχ(G)と定義する。

根拠：
proper k-coloringは写像 $c:V\to\{1,\dots,k\}$ で、各辺 $(u,v)\in E$ に対し $c(u)\ne c(v)$。最小kがchromatic number $\chi(G)$。

二部グラフは頂点集合を2群へ分け、辺が群間だけにあるので、辺が1本以上なら2-colorable。逆に奇数cycleがあると2色を交互に置いて一周したとき始点と同色が隣接し矛盾する。よって「二部グラフ iff 奇数cycleなし」という重要な関係が得られる。

具体例：
**問題**：cycle $C_6$ のchromatic numberを求め、具体的な彩色を示せ。

**解答**：$C_6$ は偶数cycleなので二部グラフ。辺があるので1色は不可、頂点を交互に色A,Bで塗れば2色で可能。よって $\chi(C_6)=2$。

失敗条件：
greedy coloringが使った色数をそのまま $\chi(G)$ とみなさない。greedy結果は頂点順序に依存し、最適より多くの色を使う場合がある。

</details>
