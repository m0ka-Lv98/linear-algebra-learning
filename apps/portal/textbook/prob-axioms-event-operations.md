# 確率の公理と事象の演算：教科書

Course 03｜確率統計｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `prob-counting-sample-spaces` で得た概念を使い、ここでは 確率の公理と事象の演算 へ進む。

前提として使うのは `prob-counting-sample-spaces` です。

## まず直感を作る

確率は事象へ0〜1の重みを与え、和・積・補集合の規則で複雑な事象を組み立てる。



## 図の解説

<img src="/visuals/course-03/prob-axioms-event-operations.png" alt="確率の公理と事象の演算の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2個のサイコロの標本空間を格子で描き、事象をセル集合として見る。 格子の1セルが1つの基本結果、色付き領域が事象である。和事象は領域の和集合、積事象は共通部分、補事象は標本空間からその領域を除いた部分に対応する。

## 記号・型・次元

- $\Omega$：標本空間
- $A,B$：事象
- $A\cup B$：AまたはBが起こる事象
- $A\cap B$：AとBが同時に起こる事象
- $A^c$：Aが起こらない事象


## 正式な定義・代表式

確率は $\mathbb P(A)\ge0$, $\mathbb P(\Omega)=1$、互いに排反な事象列に対する可算加法性を満たす。包含排除はこれらから導ける。

代表式は

$$
\mathbb{P}(A\cup B)=\mathbb{P}(A)+\mathbb{P}(B)-\mathbb{P}(A\cap B)
$$

です。

## なぜこの式・結論になるのか

### 1. 和集合を重複しない部分へ分ける

$A\cup B=A\cup(B\setminus A)$ で、この2部分は排反。したがって $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B\setminus A)$。

### 2. Bを同じように分解する

$B=(B\setminus A)\cup(A\cap B)$ も排反なので $\mathbb P(B)=\mathbb P(B\setminus A)+\mathbb P(A\cap B)$。よって $\mathbb P(B\setminus A)=\mathbb P(B)-\mathbb P(A\cap B)$。

### 3. 代入して包含排除を得る

前二式を合わせて $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)-\mathbb P(A\cap B)$。交わりを引くのは、AとBを足した時に二重計上した部分を一回戻すため。

## 教科書が省略しやすい一段を補う


### 三つの公理から基本公式を作る

確率の公理は (1) $P(A)\ge0$、(2) $P(\Omega)=1$、(3) 互いに素な事象 $A_i$ について $P(\cup_i A_i)=\sum_iP(A_i)$。補事象公式は新しい公理ではない。$A$ と $A^c$ は互いに素で和集合が $\Omega$ だから
$$
1=P(\Omega)=P(A)+P(A^c),
$$
よって $P(A^c)=1-P(A)$。

一般の加法公式も、$A\cup B$ を $A$ と $B\setminus A$ に分ければ導ける。$P(B\setminus A)=P(B)-P(A\cap B)$ なので
$$
P(A\cup B)=P(A)+P(B)-P(A\cap B).
$$
交差部分を一度引くのは、最初の二項で二重に数えたからである。Venn図はこの重複を面積として見せるが、式の根拠は互いに素な集合への分割と可算加法性にある。



## 途中を飛ばさず全体をつなぐ

### 確率の公理と事象の演算の導出を一本につなげる

確率は $\mathbb P(A)\ge0$, $\mathbb P(\Omega)=1$、互いに排反な事象列に対する可算加法性を満たす。包含排除はこれらから導ける。

#### 1. 和集合を重複しない部分へ分ける

まず出発点を固定する。 $A\cup B=A\cup(B\setminus A)$ で、この2部分は排反。したがって $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B\setminus A)$。 次に必要になるのは「Bを同じように分解する」である。

#### 2. Bを同じように分解する

ここまでで得た結果を次の段階へ渡す。 $B=(B\setminus A)\cup(A\cap B)$ も排反なので $\mathbb P(B)=\mathbb P(B\setminus A)+\mathbb P(A\cap B)$。よって $\mathbb P(B\setminus A)=\mathbb P(B)-\mathbb P(A\cap B)$。 次に必要になるのは「代入して包含排除を得る」である。

#### 3. 代入して包含排除を得る

最後に、前二段階の結果をまとめて結論へ進む。 前二式を合わせて $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)-\mathbb P(A\cap B)$。交わりを引くのは、AとBを足した時に二重計上した部分を一回戻すため。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbb{P}(A\cup B)=\mathbb{P}(A)+\mathbb{P}(B)-\mathbb{P}(A\cap B)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$\mathbb P(A)=0.6$, $\mathbb P(B)=0.5$, $\mathbb P(A\cap B)=0.2$ なら、和事象は $0.6+0.5-0.2=0.9$。単純に1.1とするのは二重計上。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

AとBが排反なら $A\cap B=\varnothing$ なので交わりの確率は0となり、加法則 $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)$ に戻る。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$\mathbb P(A)=0.6$, $\mathbb P(B)=0.5$, $\mathbb P(A\cap B)=0.2$ なら、和事象は $0.6+0.5-0.2=0.9$。単純に1.1とするのは二重計上。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

AとBが排反なら $A\cap B=\varnothing$ なので交わりの確率は0となり、加法則 $\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)$ に戻る。

## 成立条件と、条件を外したときに何が壊れるか

- 排反と独立は別概念。
- 確率は事象に対して定義される。
- 確率の公理と事象の演算の定義と計算手順を区別し、数値例だけで一般性を判断しない。

「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。

## よくある誤解を分解する

- 確率の公理と事象の演算の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

確率の公理と事象の演算では、式へ数値を代入するだけでは不十分である。「排反なら独立」とは限らない。$\mathbb P(A),\mathbb P(B)>0$ の排反事象では $\mathbb P(A\cap B)=0$ だが $\mathbb P(A)\mathbb P(B)>0$ なので独立条件を満たさない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

simulationで事象をboolean配列として表すと、unionはOR、intersectionはAND。有限標本で相対頻度を使い、公理から導いた恒等式が近似的に成立するか確認できる。

## ここから一段だけ発展する

公理から補集合、単調性、Booleの不等式など多くの性質を導ける。次Topicでは交わりを「Bが起きた世界の中」で再正規化して条件付き確率を定義する。


## このTopicを理解できたか確認する問い

- 「和集合を重複しない部分へ分ける」を式を見ずに説明できるか
- 「代入して包含排除を得る」までの論理を一段ずつ再現できるか
- 確率の公理と事象の演算の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/prob-axioms-event-operations)　|　[スライドへ](/slides/prob-axioms-event-operations/)
