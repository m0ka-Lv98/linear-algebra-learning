# 離散確率・指示変数・乱択アルゴリズム：教科書

Course 04｜離散数学と証明｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-directed-graphs-dags-topological-order` で得た概念を使い、ここでは 離散確率・指示変数・乱択アルゴリズム へ進む。

前提として使うのは `dm-counting-principles-pigeonhole`、`dm-algorithm-specifications-correctness` です。

## まず直感を作る

確率は事象へ0〜1の重みを与え、和・積・補集合の規則で複雑な事象を組み立てる。



## 図の解説

<img src="/visuals/course-04/dm-discrete-probability-indicators-randomized-algorithms.png" alt="離散確率・指示変数・乱択アルゴリズムの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2個のサイコロの標本空間を格子で描き、事象をセル集合として見る。 格子の1セルが1つの基本結果、色付き領域が事象である。和事象は領域の和集合、積事象は共通部分、補事象は標本空間からその領域を除いた部分に対応する。

## 記号・型・次元

- $I_A$：事象Aなら1、そうでなければ0のindicator
- $E[I_A]=P(A)$
- $X=\sum_i I_i$：数えたい個数


## 正式な定義・代表式

indicatorは事象の発生を0/1確率変数へ変換する。期待値の線形性は独立性不要なので、複雑なcountの期待値を各事象確率の和へ分解できる。

代表式は

$$
\mathbb{E}[I_A]=\mathbb{P}(A)
$$

です。

## なぜこの式・結論になるのか

### 1. indicatorの期待値

$E[I_A]=1·P(A)+0·P(A^c)=P(A)$。

### 2. countをindicator和で表す

条件を満たす対象数Xは、各対象iが条件を満たすindicatorの和 $X=\sum I_i$。

### 3. 期待値の線形性

$E[X]=\sum E[I_i]=\sum P(A_i)$。I_i同士が依存していても成立するのが強み。

## 教科書が省略しやすい一段を補う


### indicatorの線形性で複雑なcountの期待値を簡単にする

事象Aのindicator $I_A$ はAなら1、そうでなければ0なので $E[I_A]=P(A)$。count Xを「条件を満たす要素数」として $X=\sum_iI_i$ と書けば
$$
E[X]=\sum_iE[I_i]=\sum_iP(I_i=1).
$$
期待値の線形性にはindependenceが不要なので、依存の強いcountでも平均は簡単に計算できる。

randomized algorithmでは乱数も入力の一部として確率空間へ入れる。実行時間Tの期待値、success probability、high-probability boundを分ける。平均的に速いことと毎回速いことは同じではない。



## 途中を飛ばさず全体をつなぐ

### 離散確率・指示変数・乱択アルゴリズムの導出を一本につなげる

indicatorは事象の発生を0/1確率変数へ変換する。期待値の線形性は独立性不要なので、複雑なcountの期待値を各事象確率の和へ分解できる。

#### 1. indicatorの期待値

まず出発点を固定する。 $E[I_A]=1·P(A)+0·P(A^c)=P(A)$。 次に必要になるのは「countをindicator和で表す」である。

#### 2. countをindicator和で表す

ここまでで得た結果を次の段階へ渡す。 条件を満たす対象数Xは、各対象iが条件を満たすindicatorの和 $X=\sum I_i$。 次に必要になるのは「期待値の線形性」である。

#### 3. 期待値の線形性

最後に、前二段階の結果をまとめて結論へ進む。 $E[X]=\sum E[I_i]=\sum P(A_i)$。I_i同士が依存していても成立するのが強み。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbb{E}[I_A]=\mathbb{P}(A)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

ランダム順列のfixed point数。各位置iが固定される確率1/nなので、期待fixed pointsはn·(1/n)=1。事象は独立でなくてもよい。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

ランダムgraph G(n,p)のedge数は各possible edgeのindicator和。期待値は $\binom n2p$。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

ランダム順列のfixed point数。各位置iが固定される確率1/nなので、期待fixed pointsはn·(1/n)=1。事象は独立でなくてもよい。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

ランダムgraph G(n,p)のedge数は各possible edgeのindicator和。期待値は $\binom n2p$。

## 成立条件と、条件を外したときに何が壊れるか

- 排反と独立は別概念。
- 確率は事象に対して定義される。
- 離散確率・指示変数・乱択アルゴリズムの定義と計算手順を区別し、数値例だけで一般性を判断しない。

期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。

## よくある誤解を分解する

- 離散確率・指示変数・乱択アルゴリズムの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

離散確率・指示変数・乱択アルゴリズムでは、式へ数値を代入するだけでは不十分である。期待値が1だから必ず1個起こるわけではない。fixed point数は0,1,2,…を取り得る。expectationは長期平均。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

randomized algorithm評価ではseed固定の1 runで期待性能を判断せず、多数runと理論期待値を比較する。

## ここから一段だけ発展する

indicatorとlinearity of expectationはhashing、randomized quicksort、concentration inequalitiesの基礎。Course08のrandomized ML評価にも再登場する。


## このTopicを理解できたか確認する問い

- 「indicatorの期待値」を式を見ずに説明できるか
- 「期待値の線形性」までの論理を一段ずつ再現できるか
- 離散確率・指示変数・乱択アルゴリズムの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-discrete-probability-indicators-randomized-algorithms)　|　[スライドへ](/slides/dm-discrete-probability-indicators-randomized-algorithms/)
