# bootstrap・permutation・再標本化：教科書

Course 03｜確率統計

## このTopicで解く問題

解析的な標本分布が難しい統計量の不確実性を、データからどう近似するか。

## なぜこの概念が必要か

bootstrapは観測された経験分布を「仮の母集団」として復元抽出し、統計量を何度も計算する。permutation testは帰無仮説下で交換可能なラベルを並べ替えて帰無分布を作る。

## 図の各要素は何を表しているか

<img src="/visuals/course-03/stat-bootstrap-permutation-resampling.png" alt="bootstrap・permutation・再標本化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

元データの点群から同じ個数を復元抽出してbootstrap標本を作り、各標本の中央値を横軸へ記録したhistogramが徐々に形成される。破線が元標本の中央値。histogramの広がりが「標本が変わったとき統計量がどれくらい揺れるか」の近似である。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $T(X)$ | 関心のある統計量 |
| $B$ | 再標本回数 |
| $T*$ | bootstrap標本での統計量 |


- $B$：bootstrap反復回数。
- $T_b^*$：b番目bootstrap標本で計算した統計量。
- $\bar T^*=B^{-1}\sum_bT_b^*$。

## 中心となる式

$$
\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}
$$

## 中心式を前提から導く

1. 経験分布 $\hat F_n$ を作る。
2. $\hat F_n$ からサイズnの標本を復元抽出する。
3. 各標本でT*を計算し、その分布を未知のsampling distributionの近似に使う。

## なぜその変形をしてよいのか

bootstrapでは未知母分布 $F$ の代わりに、観測点それぞれへ質量 $1/n$ を置いた経験分布 $\hat F_n$ を使う。そこから独立にn回復元抽出することが「同じ母分布から別標本を得る」操作の代用になる。

permutation testは目的が違う。帰無仮説の下で群ラベルが交換可能なら、観測値を固定してラベルだけを並べ替え、差の統計量の帰無分布を作る。bootstrapはsampling uncertainty、permutationはnull distributionの構成に主眼がある。

## bootstrapをアルゴリズムとして書く

観測データを $x_1,\ldots,x_n$、求めたい統計量を $T(x_1,\ldots,x_n)$ とする。nonparametric bootstrapでは、観測値それぞれへ確率 $1/n$ を置いた経験分布 $\hat F_n$ を仮の母集団とみなす。

1. $\hat F_n$ から復元抽出で $n$ 個を引き、bootstrap標本 $x_1^*,\ldots,x_n^*$ を作る。
2. $T^*=T(x_1^*,\ldots,x_n^*)$ を計算する。
3. これを $B$ 回繰り返し、$T_1^*,\ldots,T_B^*$ のばらつきを標本分布の近似として使う。

bootstrap standard errorは

$$
\widehat{\mathrm{SE}}_{boot}
=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}
$$

で推定できる。percentile intervalならbootstrap統計量の2.5%点と97.5%点を使う。ただし強いbias、極端な裾、非滑らかな統計量では単純percentile法が十分でない場合がある。

## permutation testとの違い

二群の差を検定するとき、帰無仮説が「群ラベルを入れ替えても同じ分布」という交換可能性を与えるなら、観測値を固定したままラベルだけを並べ替える。これは未知母集団を経験分布で近似するbootstrapとは目的が違い、**帰無仮説下の統計量分布**を直接作っている。

たとえばA群 $[1,2]$、B群 $[4,5]$ の平均差は3。4個の値から2個をAへ割り当てる全 $\binom42=6$ 通りを列挙すれば、小標本ではMonte Carlo近似なしにexact permutation distributionを作れる。

## 例題1：具体的な数値・構造で解く

**問題**：データ $[1,3,8,10]$ からbootstrap標本 $[1,1,8,10]$, $[3,3,8,10]$, $[1,8,8,10]$, $[1,3,3,10]$ を得た。各中央値と、その4個の中央値の標本標準偏差を求めよ。

**解答**：中央値は順に4.5, 5.5, 8, 3。平均5.25。平方偏差和は $0.5625+0.0625+7.5625+5.0625=13.25$。標本分散は $13.25/3\approx4.4167$、標準偏差は約2.102。

## 例題2：別の条件で確認する

データ $[1,2,10]$ のbootstrap標本の1つが $[1,1,10]$ なら中央値1、別の標本 $[2,10,10]$ なら中央値10。この反復で中央値の有限標本変動を近似する。

## 結果の検算

bootstrap標本は元データと同じ標本サイズnで**復元抽出**されているか確認する。permutation testでは値そのものを再抽出せずラベルを入れ替えているかを確認する。exactに列挙できる小標本では全並べ替え結果とMonte Carlo近似を比較できる。

## 条件を外すと何が壊れるか

時系列やcluster dataを個々の観測としてiid復元抽出すると依存構造を壊す。block bootstrapやcluster bootstrapなど、sampling unitをデータ生成過程に合わせる必要がある。

## よくある誤り

- 時系列やcluster dataをiid bootstrapしない。
- bootstrap回数を増やしても元標本のbiasが自動で消えるわけではない。

## 次のTopic・応用への接続

bootstrap percentile区間・BCa区間、permutation p-valueへ発展できる。機械学習のbaggingもbootstrap sampleで複数modelを学習する点で同じ操作を使う。

## 参考

- MIT 18.05 resampling concepts

[演習へ](/exercises/stat-bootstrap-permutation-resampling)　|　[スライドへ](/slides/stat-bootstrap-permutation-resampling/)
