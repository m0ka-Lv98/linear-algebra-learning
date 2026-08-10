# エントロピー・交差エントロピー・KLダイバージェンス：教科書

Course 03｜確率統計｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `stat-linear-regression-probabilistic-model` で得た概念を使い、ここでは エントロピー・交差エントロピー・KLダイバージェンス へ進む。

前提として使うのは `prob-discrete-distributions`、`prob-continuous-distributions`、`stat-likelihood-maximum-likelihood`、`prep-exponents-logarithms` です。

## まず直感を作る

エントロピーは不確実性、交差エントロピーは別分布で符号化したコスト、KLは分布間の非対称な差を測る。



## 図の解説

<img src="/visuals/course-03/stat-entropy-cross-entropy-kl-divergence.png" alt="エントロピー・交差エントロピー・KLダイバージェンスの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2つの離散分布を並べ、KLが一致時に0になる様子を見る。 2つの分布が一致すれば各点で対数比が0になり、KL divergenceは0になる。質量が異なる場所ほど対数比が大きくなり、期待値として差が蓄積する。

## 記号・型・次元

- $P,Q$：同じ標本空間上の確率分布
- $p(x),q(x)$：各確率質量/密度
- $H(P)=-E_P[\log p(X)]$：entropy
- $H(P,Q)=-E_P[\log q(X)]$：cross entropy
- $D_{KL}(P\|Q)$：KL divergence


## 正式な定義・代表式

KL divergenceはPからデータが出るときQで符号化・予測する追加log-loss。$D_{KL}(P\|Q)=H(P,Q)-H(P)\ge0$ で、一般に対称ではない。

代表式は

$$
D_{\mathrm{KL}}(P\|Q)=\sum_x p(x)\log\frac{p(x)}{q(x)}
$$

です。

## なぜこの式・結論になるのか

### 1. log比の期待値として定義する

$D_{KL}=\sum_x p(x)\log[p(x)/q(x)]$。Pが実際の重みを与え、各点でQがPをどれだけ過小・過大に置くかをlog比で測る。

### 2. cross entropyへ分解する

$\log(p/q)=\log p-\log q$ なので $D_{KL}=\sum p\log p-\sum p\log q=-H(P)+H(P,Q)$。

### 3. なぜ0以上か

$\log$ の凹性またはGibbs不等式から $D_{KL}\ge0$。$P=Q$（ほぼ至る所）で0。これは距離のように見えるが対称性・三角不等式を持たない。

## 教科書が省略しやすい一段を補う


### cross entropyとKLの差が定数になる理由

離散分布pのentropyは
$H(p)=-\sum_xp(x)\log p(x)$、pで生成されたデータをqで符号化・予測したときのcross entropyは
$H(p,q)=-\sum_xp(x)\log q(x)$。
二つの差を取ると
$$
H(p,q)-H(p)
=\sum_xp(x)\log\frac{p(x)}{q(x)}
=D_{KL}(p\|q).
$$
したがってpが固定ならcross entropy最小化とKL最小化は同じqを選ぶ。

KLは一般に対称でなくtriangle inequalityも満たさないため距離ではない。$D_{KL}(p\|q)$ でqがpの質量を置く場所を0確率にすると発散する。MLでnegative log likelihoodやcross entropyが現れるとき、どの分布について期待を取っているかを明示すると意味を取り違えにくい。



## 途中を飛ばさず全体をつなぐ

### エントロピー・交差エントロピー・KLダイバージェンスの導出を一本につなげる

KL divergenceはPからデータが出るときQで符号化・予測する追加log-loss。$D_{KL}(P\|Q)=H(P,Q)-H(P)\ge0$ で、一般に対称ではない。

#### 1. log比の期待値として定義する

まず出発点を固定する。 $D_{KL}=\sum_x p(x)\log[p(x)/q(x)]$。Pが実際の重みを与え、各点でQがPをどれだけ過小・過大に置くかをlog比で測る。 次に必要になるのは「cross entropyへ分解する」である。

#### 2. cross entropyへ分解する

ここまでで得た結果を次の段階へ渡す。 $\log(p/q)=\log p-\log q$ なので $D_{KL}=\sum p\log p-\sum p\log q=-H(P)+H(P,Q)$。 次に必要になるのは「なぜ0以上か」である。

#### 3. なぜ0以上か

最後に、前二段階の結果をまとめて結論へ進む。 $\log$ の凹性またはGibbs不等式から $D_{KL}\ge0$。$P=Q$（ほぼ至る所）で0。これは距離のように見えるが対称性・三角不等式を持たない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
D_{\mathrm{KL}}(P\|Q)=\sum_x p(x)\log\frac{p(x)}{q(x)}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

真のBernoulli p=0.8をQのq=0.5で予測すると、cross entropyは $-0.8\log0.5-0.2\log0.5=\log2$。Qを0.8へ合わせるとcross entropyはentropyまで下がる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$D_{KL}(P\|Q)$ と $D_{KL}(Q\|P)$ は重み付けする分布が違うため値が異なる。mode-covering / mode-seekingの議論でも向きが重要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Q(x)=0 なのにP(x)>0の点があると $D_{KL}(P\|Q)=\infty$。予測分布が実際に起こり得る事象へゼロ確率を置くことはlog-lossで致命的。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

真のBernoulli p=0.8をQのq=0.5で予測すると、cross entropyは $-0.8\log0.5-0.2\log0.5=\log2$。Qを0.8へ合わせるとcross entropyはentropyまで下がる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$D_{KL}(P\|Q)$ と $D_{KL}(Q\|P)$ は重み付けする分布が違うため値が異なる。mode-covering / mode-seekingの議論でも向きが重要。

## 成立条件と、条件を外したときに何が壊れるか

- KLは距離ではなく対称でもない。
- 0log0の扱いを確認する。
- エントロピー・交差エントロピー・KLダイバージェンスの定義と計算手順を区別し、数値例だけで一般性を判断しない。

Q(x)=0 なのにP(x)>0の点があると $D_{KL}(P\|Q)=\infty$。予測分布が実際に起こり得る事象へゼロ確率を置くことはlog-lossで致命的。

## よくある誤解を分解する

- エントロピー・交差エントロピー・KLダイバージェンスの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

エントロピー・交差エントロピー・KLダイバージェンスでは、式へ数値を代入するだけでは不十分である。Q(x)=0 なのにP(x)>0の点があると $D_{KL}(P\|Q)=\infty$。予測分布が実際に起こり得る事象へゼロ確率を置くことはlog-lossで致命的。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

softmax+cross entropyはlog-sum-expを使って数値安定に計算する。確率0付近でlogを直接取る実装はinf/NaNを生む。

## ここから一段だけ発展する

最尤推定は経験分布とmodel分布のcross entropy最小化、ひいては定数項を除いてKL最小化として読める。Course08/09のclassification lossへ直結する。


## このTopicを理解できたか確認する問い

- 「log比の期待値として定義する」を式を見ずに説明できるか
- 「なぜ0以上か」までの論理を一段ずつ再現できるか
- エントロピー・交差エントロピー・KLダイバージェンスの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-entropy-cross-entropy-kl-divergence)　|　[スライドへ](/slides/stat-entropy-cross-entropy-kl-divergence/)
