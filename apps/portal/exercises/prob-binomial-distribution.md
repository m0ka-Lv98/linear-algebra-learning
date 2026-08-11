# Binomial分布：演習

確率分布。定義・導出・数値例・失敗条件まで再構成する10問。

## 問題1

記号とshape：Binomial分布の中心式 `P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)` に現れる各量の型・shapeを説明し、積や和が定義できる理由を示せ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

中心式は $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ である。記号表に従って各量のshapeを置く。n=positive integer; p=[0,1]; X=0,...,n。式中の積は隣接する内側次元が一致し、最終的な左辺と右辺の型が一致する。shapeを先に確定することで、転置や積順序の誤りを計算前に検出できる。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題2

導出再構成：Binomial分布の中心式を、教科書の導出を見ずに前提定義から再構成せよ。少なくとも3段階の変形根拠を書くこと。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

導出は次の順序で再構成する。(1) $X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。 (2) 成功位置の選び方が $\binom nk$ 通りあり、各列の確率は $p^k(1-p)^{n-k}$。 (3) 期待値・分散は独立和の加法性から $np$ と $np(1-p)$。 各段階で、単なる式変形ではなく使った定義・線形性・極限・確率法則を明記する。最後に得られた式のshapeと単位を確認すれば、導出の向きも検算できる。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題3

手計算：次のBinomial分布の例を途中式付きで計算し、結果を中心式と照合せよ。$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

与えられた例は $n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。。まず既知量を中心式 $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ の対応する記号へ割り当てる。次に中間量を順に計算し、最後に本文記載の結果へ到達する。重要なのは最終値だけでなく、各中間量のshapeまたは確率範囲を検算することである。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題4

意味の説明：Binomial分布の式が、工学的には何を測り、何を変換しているかを数式中の量と対応づけて説明せよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

このTopicの工学的役割は次の通りである。品質検査でn個中の不良数、通信packet成功数、陽性細胞数の単純model。。したがって中心式の各項は単なる記号ではなく、入力構造・感度・情報・frequency成分などの対応量を持つ。式を使う際は、どの量が観測から決まり、どの量がmodel仮定なのかを区別する。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題5

成立条件：Binomial分布を適用してはいけない、または注意が必要な条件を1つ具体化し、なぜ中心式の解釈が壊れるか説明せよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

代表的な失敗条件は次である。試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。。問題なのは単に数値が不安定になることではなく、式を導いた前提そのものが失われる点である。したがって適用前には前提を検査し、違反時には別model・regularization・別transformなどを選択する。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題6

極限・scale検算：Binomial分布の主要parameterを0、1、十分大きい値、またはidentity相当へ近づけたとき、中心式がどの簡単な場合へ戻るべきか1つ選んで説明せよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

検算では $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ の中で変化させる量を1つだけ選ぶ。極限で不要な項が消える、identity作用へ戻る、分散/energyが既知値へ近づく、またはtransformが単純化することを確認する。この極限確認はdimension checkとは独立で、実装上の符号・normalization誤りを発見するのに有効である。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題7

摂動問題：Binomial分布の入力を小さく変化させたとき、出力が一次近似でどう変わるかを中心式から説明し、感度が大きくなる条件を述べよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

小摂動では中心式を局所線形または一次変化として読む。$$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ に現れるJacobian、inverse、weight、frequency coefficient等の大きさが摂動増幅を決める。特にsingular/ill-conditioned、低情報、Nyquist違反など本文の失敗条件へ近づくと感度が大きくなる。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題8

実装debug：Binomial分布をNumPy/SciPy/autodiffで実装した結果が理論値と合わない。最初に確認する具体的な3項目を、このTopic固有の式に即して挙げよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

まず `scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。。加えて中心式 $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ のshape、転置・複素共役・normalization・sampling intervalなどTopic固有の規約を確認する。最後に小さな手計算例を同じcode pathへ通し、中間量を比較する。random simulationならseedとsample sizeも固定する。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題9

図の読み取り：`prob-binomial-distribution.png` で変化させている量を中心式の記号へ対応させ、曲線・ellipse・spectrum・行列模様の変化を説明せよ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

図はBinomial分布の中心式 $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ を視覚化している。横軸・縦軸・行列位置の意味を先に固定し、parameter変化がどの項へ入るかを追う。図の変化は本文の数学的意味と一致する必要があり、図だけの形状から未定義の因果関係を追加してはいけない。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題10

総合：Binomial分布を実際の工学問題へ使う短い解析手順を、前提確認→数式化→計算→検算→失敗時の代替策の順で設計せよ。対象は「品質検査でn個中の不良数、通信packet成功数、陽性細胞数の単純model。」から1つ選べ。 参考にする具体例は「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」。また、このTopicで特に警戒すべき条件は「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

手順は、(1) Binomial分布の前提とdata型を確認、(2) 中心式 $$P(X=k)=\binom nk p^k(1-p)^{n-k},\quad E[X]=np,\quad \operatorname{Var}(X)=np(1-p)$$ に観測量と未知量を割り当て、(3) 小例またはbaselineで計算、(4) `scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。 を用いて独立検算、(5) 試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。 に該当するならmodelやalgorithmを変更する、の順にする。これにより公式適用だけでなく診断まで含む答案になる。 Binomial分布固有の再検算として、導出の出発点「$X=\sum_{i=1}^nB_i$ と独立Bernoulliの和として定義する。」と手計算例「$n=10,p=0.2$ のとき $P(X=2)=\binom{10}{2}0.2^2 0.8^8\approx0.302$、平均2。」を照合する。さらに実装では「`scipy.stats.binom.pmf` と組合せ式を比較し、pmf総和が1になるか確認する。」を実行し、失敗条件「試行のpが異なる、または独立でない場合は通常のBinomialではない。Poisson-binomialやbeta-binomial等を検討する。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

[教科書へ](/textbook/prob-binomial-distribution)
