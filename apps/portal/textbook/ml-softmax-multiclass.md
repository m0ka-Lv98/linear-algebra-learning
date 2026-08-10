# softmaxと多クラス分類：教科書

Course 08｜機械学習｜Topic 04/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-logistic-regression` で得た概念を使い、ここでは softmaxと多クラス分類 へ進む。

前提として使うのは `ml-logistic-regression`、`stat-entropy-cross-entropy-kl-divergence` です。

## まず直感を作る

分類器は入力からクラス確率またはスコアを作り、決定境界でクラスを分ける。



## 図の解説

<img src="/visuals/course-08/ml-softmax-multiclass.png" alt="softmaxと多クラス分類の図解" style="max-height: 440px; display:block; margin:0 auto;" />

2クラス点群と確率等高線、decision boundaryを描く。 背景の確率面がP(y=1|x)、その0.5等高線がdecision boundary、点が観測データである。モデルの連続な確率出力と離散な最終分類を区別できる。

## 記号・型・次元

- $z_k$：class k logit
- $K$：class数
- $p_k=e^{z_k}/\sum_j e^{z_j}$


## 正式な定義・代表式

softmaxはreal logitsをpositiveでsum1のcategorical probabilityへ変換。logitへ同じconstantを足してもprobability不変。

代表式は

$$
p(y=k\mid\mathbf{x})=\frac{e^{z_k}}{\sum_j e^{z_j}}
$$

です。

## なぜこの式・結論になるのか

### 1. positive score

exp(z_k)>0でclass scoreをpositive化。

### 2. normalization

全scoreのsumで割りsum_k p_k=1。

### 3. cross entropy gradient

one-hot yに対するCE $-\sum y_k\log p_k$ のlogit gradientは $p-y$。prediction errorが直接gradientになる。

## 教科書が省略しやすい一段を補う


### softmaxはcategorical log-oddsを一貫して正規化する

K logits $z_k$ からpositive scores $e^{z_k}$ を作りtotalで割れば $p_k=e^{z_k}/\sum_je^{z_j}$、自動的にsum1。全logitへ同じconstant cを足しても分子・分母にe^cが掛かりcancelするためprobability不変。この性質からnumerical stabilityのためmax logitを引ける。

one-hot target yのcross entropy $L=-\sum_ky_k\log p_k$ をz_jで微分すると $\partial L/\partial z_j=p_j-y_j$。正解classではprobability不足分を増やし、他classでは現在probability分だけ減らすgradientになる。argmaxだけを見るとこのprobability geometryとcalibration情報を失う。



## 途中を飛ばさず全体をつなぐ

### softmaxと多クラス分類の導出を一本につなげる

softmaxはreal logitsをpositiveでsum1のcategorical probabilityへ変換。logitへ同じconstantを足してもprobability不変。

#### 1. positive score

まず出発点を固定する。 exp(z_k)>0でclass scoreをpositive化。 次に必要になるのは「normalization」である。

#### 2. normalization

ここまでで得た結果を次の段階へ渡す。 全scoreのsumで割りsum_k p_k=1。 次に必要になるのは「cross entropy gradient」である。

#### 3. cross entropy gradient

最後に、前二段階の結果をまとめて結論へ進む。 one-hot yに対するCE $-\sum y_k\log p_k$ のlogit gradientは $p-y$。prediction errorが直接gradientになる。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(y=k\mid\mathbf{x})=\frac{e^{z_k}}{\sum_j e^{z_j}}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

logits(0,0,0)→各1/3。logits(2,0,0)ではclass1 probability e²/(e²+2)。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

全logitに100を足してもsame probability。numerical stable implementationはmax logitを引く。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

argmax classだけ見ればconfidence/calibration情報を失う。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

logits(0,0,0)→各1/3。logits(2,0,0)ではclass1 probability e²/(e²+2)。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

全logitに100を足してもsame probability。numerical stable implementationはmax logitを引く。

## 成立条件と、条件を外したときに何が壊れるか

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- softmaxと多クラス分類の定義と計算手順を区別し、数値例だけで一般性を判断しない。

argmax classだけ見ればconfidence/calibration情報を失う。

## よくある誤解を分解する

- softmaxと多クラス分類の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

softmaxと多クラス分類では、式へ数値を代入するだけでは不十分である。argmax classだけ見ればconfidence/calibration情報を失う。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

log-sum-exp trick、mask、label smoothing convention確認。

## ここから一段だけ発展する

Bayes ruleでclass-conditional modelからposteriorを作るgenerative classifierへ。


## このTopicを理解できたか確認する問い

- 「positive score」を式を見ずに説明できるか
- 「cross entropy gradient」までの論理を一段ずつ再現できるか
- softmaxと多クラス分類の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-softmax-multiclass)　|　[スライドへ](/slides/ml-softmax-multiclass/)
