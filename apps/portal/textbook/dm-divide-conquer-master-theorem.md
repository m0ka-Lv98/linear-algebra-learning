# 分割統治法とMaster theorem：教科書

Course 04｜離散数学と証明｜Topic 15/20

## このTopicは、前の何を受けて始まるか

前Topic `dm-recurrence-relations` で得た概念を使い、ここでは 分割統治法とMaster theorem へ進む。

前提として使うのは `dm-recurrence-relations` です。

## まず直感を作る

漸近解析は入力サイズnを大きくしたときの増加率を、定数倍や低次項を捨てて比較する。



## 図の解説

<img src="/visuals/course-04/dm-divide-conquer-master-theorem.png" alt="分割統治法とMaster theoremの図解" style="max-height: 440px; display:block; margin:0 auto;" />

log n, n, n log n, n^2の曲線を同じ軸で比較する。 横軸を入力サイズn、縦軸を操作回数として、定数・対数・線形・n log n・二次の増え方を比較する。大きなnでは低次項や定数係数より成長次数が支配的になる。

## 記号・型・次元

- $a$：subproblem数
- $n/b$：各subproblem size
- $f(n)$：分割・結合の追加cost
- $n^{\log_b a}$：leaf側の基準成長


## 正式な定義・代表式

Master theoremは $T(n)=aT(n/b)+f(n)$ で、再帰木の各levelの仕事量が上・同程度・下のどこに集中するか比較してorderを与える。

代表式は

$$
T(n)=aT(n/b)+f(n)
$$

です。

## なぜこの式・結論になるのか

### 1. 再帰木のlevel k

node数はa^k、各sizeはn/b^k。leaf depthは $\log_b n$。

### 2. leaf総数

最下層node数は $a^{\log_b n}=n^{\log_b a}$。これが再帰部分の自然な基準。

### 3. f(n)との比較

fが基準より小さければleaf支配、同程度なら各level同程度でlog因子、大きければroot側支配（regularity条件付き）。

## 教科書が省略しやすい一段を補う


### Master theoremの三caseは「葉」と「各level work」の比較

$T(n)=aT(n/b)+f(n)$ のrecursion treeでは葉の総規模が $n^{\log_ba}$ に対応する。$f(n)$ がこれより多項式的に小さければ葉側が支配、同程度なら各levelが同程度でlog factor、十分大きければroot側のnonrecursive workが支配する。

したがってMaster theoremは暗記3caseではなく、recursive partが生むwork scaleと各nodeの追加workを比較した結果。regularity conditionなど適用条件を満たさないf(n)にはそのまま使えず、substitutionやrecursion treeで直接評価する必要がある。



## 途中を飛ばさず全体をつなぐ

### 分割統治法とMaster theoremの導出を一本につなげる

Master theoremは $T(n)=aT(n/b)+f(n)$ で、再帰木の各levelの仕事量が上・同程度・下のどこに集中するか比較してorderを与える。

#### 1. 再帰木のlevel k

まず出発点を固定する。 node数はa^k、各sizeはn/b^k。leaf depthは $\log_b n$。 次に必要になるのは「leaf総数」である。

#### 2. leaf総数

ここまでで得た結果を次の段階へ渡す。 最下層node数は $a^{\log_b n}=n^{\log_b a}$。これが再帰部分の自然な基準。 次に必要になるのは「f(n)との比較」である。

#### 3. f(n)との比較

最後に、前二段階の結果をまとめて結論へ進む。 fが基準より小さければleaf支配、同程度なら各level同程度でlog因子、大きければroot側支配（regularity条件付き）。

#### 代表式へ戻す

以上をまとめた中心式は

$$
T(n)=aT(n/b)+f(n)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

Merge sort: a=2,b=2,f(n)=n。基準 $n^{\log_2 2}=n$ と同じなのでΘ(n log n)。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

Binary search: a=1,b=2,f(n)=1。基準1と同じでΘ(log n)。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

Merge sort: a=2,b=2,f(n)=n。基準 $n^{\log_2 2}=n$ と同じなのでΘ(n log n)。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

Binary search: a=1,b=2,f(n)=1。基準1と同じでΘ(log n)。

## 成立条件と、条件を外したときに何が壊れるか

- O記法は等号ではなく上界の集合。
- 小さいnで速いことと漸近的に速いことは別。
- 分割統治法とMaster theoremの定義と計算手順を区別し、数値例だけで一般性を判断しない。

Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。

## よくある誤解を分解する

- 分割統治法とMaster theoremの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

分割統治法とMaster theoremでは、式へ数値を代入するだけでは不十分である。Master theoremは任意のrecurrenceに使えない。subproblem sizeが不均等、aやbが変動、fがregularity条件を破る場合は再帰木やAkra–Bazzi等が必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

実際のdivide-and-conquerではcopy costやcache localityがf(n)へ入る。漸近orderが同じ実装でも定数差が大きい。

## ここから一段だけ発展する

計算量解析の道具を得たので、次はgraphという離散構造の基本量へ進む。


## このTopicを理解できたか確認する問い

- 「再帰木のlevel k」を式を見ずに説明できるか
- 「f(n)との比較」までの論理を一段ずつ再現できるか
- 分割統治法とMaster theoremの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.042J Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)

[演習へ](/exercises/dm-divide-conquer-master-theorem)　|　[スライドへ](/slides/dm-divide-conquer-master-theorem/)
