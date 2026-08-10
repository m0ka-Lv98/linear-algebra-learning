# bootstrap・permutation・再標本化：演習

Course 03｜確率統計

[教科書](/textbook/stat-bootstrap-permutation-resampling)

## 問題1

データ $[1,3,8,10]$ からbootstrap標本 $[1,1,8,10]$, $[3,3,8,10]$, $[1,8,8,10]$, $[1,3,3,10]$ を得た。各中央値と、その4個の中央値の標本標準偏差を求めよ。

<details><summary>完全解答</summary>

中央値は順に4.5, 5.5, 8, 3。平均5.25。平方偏差和は $0.5625+0.0625+7.5625+5.0625=13.25$。標本分散は $13.25/3\approx4.4167$、標準偏差は約2.102。

</details>

## 問題2

「bootstrap・permutation・再標本化」の導出を、最初の段階「1. 経験分布 $\hat F_n$ を作る。」から始めて中心式まで再構成せよ。途中で「bootstrapでは未知母分布 $F$ の代わりに、観測点それぞれへ質量 $1/n$ を置いた経験分布 $\hat F_n$ を使う。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 経験分布 $\hat F_n$ を作る。
2. $\hat F_n$ からサイズnの標本を復元抽出する。
3. 各標本でT*を計算し、その分布を未知のsampling distributionの近似に使う。

bootstrapでは未知母分布 $F$ の代わりに、観測点それぞれへ質量 $1/n$ を置いた経験分布 $\hat F_n$ を使う。そこから独立にn回復元抽出することが「同じ母分布から別標本を得る」操作の代用になる。

permutation testは目的が違う。帰無仮説の下で群ラベルが交換可能なら、観測値を固定してラベルだけを並べ替え、差の統計量の帰無分布を作る。bootstrapはsampling uncertainty、permutationはnull distributionの構成に主眼がある。

</details>

## 問題3

図 `/visuals/course-03/stat-bootstrap-permutation-resampling.png` では「元データの点群から同じ個数を復元抽出してbootstrap標本を作り、各標本の中央値を横軸へ記録したhistogramが徐々に形成される。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-03/stat-bootstrap-permutation-resampling.png" alt="bootstrap・permutation・再標本化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

元データの点群から同じ個数を復元抽出してbootstrap標本を作り、各標本の中央値を横軸へ記録したhistogramが徐々に形成される。破線が元標本の中央値。histogramの広がりが「標本が変わったとき統計量がどれくらい揺れるか」の近似である。

</details>

## 問題4

「bootstrap・permutation・再標本化」の第二例「データ $[1,2,10]$ のbootstrap標本の1つが $[1,1,10]$ なら中央値1、別の標本 $[2,10,10]$ なら中央値10。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

データ $[1,2,10]$ のbootstrap標本の1つが $[1,1,10]$ なら中央値1、別の標本 $[2,10,10]$ なら中央値10。この反復で中央値の有限標本変動を近似する。

</details>

## 問題5

bootstrap・permutation・再標本化で 関心のある統計量、再標本回数、bootstrap標本での統計量 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`stat-bootstrap-permutation-resampling` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $T(X)$ | 関心のある統計量 |
| $B$ | 再標本回数 |
| $T*$ | bootstrap標本での統計量 |


- $B$：bootstrap反復回数。
- $T_b^*$：b番目bootstrap標本で計算した統計量。
- $\bar T^*=B^{-1}\sum_bT_b^*$。

</details>

## 問題6

警告「時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。block bootstrapやcluster bootstrapなど、sampling unitをデータ生成過程に合わせる必要がある。

</details>

## 問題7

よくある誤り「時系列やcluster dataをiid bootstrapしない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- 時系列やcluster dataをiid bootstrapしない。
- bootstrap回数を増やしても元標本のbiasが自動で消えるわけではない。

時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。block bootstrapやcluster bootstrapなど、sampling unitをデータ生成過程に合わせる必要がある。

</details>

## 問題8

「bootstrap・permutation・再標本化」の例題1を再計算し、その結果に対して次の検算を実行せよ：bootstrap標本は元データと同じ標本サイズnで**復元抽出**されているか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

中央値は順に4.5, 5.5, 8, 3。平均5.25。平方偏差和は $0.5625+0.0625+7.5625+5.0625=13.25$。標本分散は $13.25/3\approx4.4167$、標準偏差は約2.102。

検算：
bootstrap標本は元データと同じ標本サイズnで**復元抽出**されているか確認する。permutation testでは値そのものを再抽出せずラベルを入れ替えているかを確認する。exactに列挙できる小標本では全並べ替え結果とMonte Carlo近似を比較できる。

</details>

## 問題9

後続への接続「bootstrap percentile区間・BCa区間、permutation p-valueへ発展できる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

bootstrap percentile区間・BCa区間、permutation p-valueへ発展できる。機械学習のbaggingもbootstrap sampleで複数modelを学習する点で同じ操作を使う。

</details>

## 問題10

中心問題「解析的な標本分布が難しい統計量の不確実性を、データからどう近似するか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2} $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $T(X)$ | 関心のある統計量 |
| $B$ | 再標本回数 |
| $T*$ | bootstrap標本での統計量 |


- $B$：bootstrap反復回数。
- $T_b^*$：b番目bootstrap標本で計算した統計量。
- $\bar T^*=B^{-1}\sum_bT_b^*$。

中心式：
$$
\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}
$$

導出：
1. 経験分布 $\hat F_n$ を作る。
2. $\hat F_n$ からサイズnの標本を復元抽出する。
3. 各標本でT*を計算し、その分布を未知のsampling distributionの近似に使う。

根拠：
bootstrapでは未知母分布 $F$ の代わりに、観測点それぞれへ質量 $1/n$ を置いた経験分布 $\hat F_n$ を使う。そこから独立にn回復元抽出することが「同じ母分布から別標本を得る」操作の代用になる。

permutation testは目的が違う。帰無仮説の下で群ラベルが交換可能なら、観測値を固定してラベルだけを並べ替え、差の統計量の帰無分布を作る。bootstrapはsampling uncertainty、permutationはnull distributionの構成に主眼がある。

具体例：
**問題**：データ $[1,3,8,10]$ からbootstrap標本 $[1,1,8,10]$, $[3,3,8,10]$, $[1,8,8,10]$, $[1,3,3,10]$ を得た。各中央値と、その4個の中央値の標本標準偏差を求めよ。

**解答**：中央値は順に4.5, 5.5, 8, 3。平均5.25。平方偏差和は $0.5625+0.0625+7.5625+5.0625=13.25$。標本分散は $13.25/3\approx4.4167$、標準偏差は約2.102。

失敗条件：
時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。block bootstrapやcluster bootstrapなど、sampling unitをデータ生成過程に合わせる必要がある。

</details>
