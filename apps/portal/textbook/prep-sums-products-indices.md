# 総和・積・添字：教科書

Course 00｜学習準備

## このTopicの目的

$\sum$ や添字を、どのindexを走査し、どのindexが結果に残るかまで含めて正確に読むにはどうするか。

## 図の意味

<img src="/visuals/course-00/prep-sums-products-indices.png" alt="総和・積・添字の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸iに並ぶ棒が各項 $a_i$。$\sum_{i=1}^n a_i$ は棒の高さをi=1からnまで全部足す。iは総和の中だけで値を変えるdummy indexなので、結果には残らない。一方 $b_j=\sum_i A_{ji}x_i$ ではiは消えるがjは左辺に残るfree index。

## 定義から順に理解する

### 有限和
$\sum_{i=1}^n a_i=a_1+a_2+\cdots+a_n$。index iは1,2,...,nを順に取る。$\sum_i$ と範囲を省略する場合は、直前に範囲を定義しなければならない。

### 二重和
$\sum_{i=1}^m\sum_{j=1}^n a_{ij}$ はm×n個の項を足す。有限和なら順序を交換しても同じだが、無限和では絶対収束など追加条件が必要。

### 行列積との関係
$(\mathbf A\mathbf x)_j=\sum_{i=1}^n A_{ji}x_i$。行jを固定し、列index iについて掛けて足すことで出力成分jを得る。

## dummy indexは名前を変えてよい

$$
\sum_{i=1}^n a_i
=\sum_{k=1}^n a_k
$$

のように、総和で消えるindexは名前を変えても値が変わらない。これをdummy indexという。ただしfree indexは変更できない。

たとえば

$$
y_i=\sum_{j=1}^n A_{ij}x_j
$$

では $j$ はdummyだが $i$ は出力成分を指定するfree index。右辺で $i$ まで勝手に足すと、ベクトル $\mathbf y$ ではなくスカラーへ変わってしまう。

## 総和記号の線形性

有限和では

$$
\sum_{i=1}^n(\alpha a_i+\beta b_i)
=\alpha\sum_{i=1}^n a_i+\beta\sum_{i=1}^n b_i.
$$

これは各項へ分配法則を使って並べ替えただけである。平均

$$
\bar x=\frac1n\sum_{i=1}^n x_i
$$

やleast-squares loss $\sum_i(y_i-\hat y_i)^2$ を変形するときに繰り返し使う。

## 積記号とlogの接続

$$
\prod_{i=1}^n p_i=p_1p_2\cdots p_n
$$

と定義する。各 $p_i>0$ なら

$$
\log\prod_i p_i=\sum_i\log p_i.
$$

確率統計で独立sampleのlikelihoodが積として現れ、log-likelihoodで和へ変わるのはこの基本則による。

## 具体例

$\sum_{i=1}^4(2i-1)=1+3+5+7=16$。また $\sum_{i=1}^3 i^2=1+4+9=14$。index名をkへ変えても値は同じ。

## 条件を外すと

$\sum_i a_i b_j$ でjを勝手に足してはいけない。iだけがdummy indexで、jは結果に残る。

## 後続Courseでどう使うか

内積、行列積、期待値、lossのsample平均、backpropのparameter sumで必須。

[演習へ](/exercises/prep-sums-products-indices)　|　[スライドへ](/slides/prep-sums-products-indices/)
