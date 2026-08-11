# Matrix differential：演習

行列・ベクトル微分。定義・導出・数値例・失敗条件まで再構成する10問。

## 問題1

記号とshape：Matrix differentialの中心式 `d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` に現れる各量の型・shapeを説明し、積や和が定義できる理由を示せ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

中心式は $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ である。記号表に従って各量のshapeを置く。\mathbf A,\mathbf B=compatible; d\mathbf A,d\mathbf B=same shapes as originals。式中の積は隣接する内側次元が一致し、最終的な左辺と右辺の型が一致する。shapeを先に確定することで、転置や積順序の誤りを計算前に検出できる。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題2

導出再構成：Matrix differentialの中心式を、教科書の導出を見ずに前提定義から再構成せよ。少なくとも3段階の変形根拠を書くこと。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

導出は次の順序で再構成する。(1) $\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。 (2) $d\mathbf A\,d\mathbf B$ は二次微小量なので一次differentialでは捨てる。 (3) 残る一次項がproduct ruleであり、scalar微分と同じ構造だが順序を交換してはいけない。 各段階で、単なる式変形ではなく使った定義・線形性・極限・確率法則を明記する。最後に得られた式のshapeと単位を確認すれば、導出の向きも検算できる。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題3

手計算：次のMatrix differentialの例を途中式付きで計算し、結果を中心式と照合せよ。$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

与えられた例は $A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。。まず既知量を中心式 $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ の対応する記号へ割り当てる。次に中間量を順に計算し、最後に本文記載の結果へ到達する。重要なのは最終値だけでなく、各中間量のshapeまたは確率範囲を検算することである。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題4

意味の説明：Matrix differentialの式が、工学的には何を測り、何を変換しているかを数式中の量と対応づけて説明せよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

このTopicの工学的役割は次の通りである。matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。。したがって中心式の各項は単なる記号ではなく、入力構造・感度・情報・frequency成分などの対応量を持つ。式を使う際は、どの量が観測から決まり、どの量がmodel仮定なのかを区別する。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題5

成立条件：Matrix differentialを適用してはいけない、または注意が必要な条件を1つ具体化し、なぜ中心式の解釈が壊れるか説明せよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

代表的な失敗条件は次である。行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。。問題なのは単に数値が不安定になることではなく、式を導いた前提そのものが失われる点である。したがって適用前には前提を検査し、違反時には別model・regularization・別transformなどを選択する。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題6

極限・scale検算：Matrix differentialの主要parameterを0、1、十分大きい値、またはidentity相当へ近づけたとき、中心式がどの簡単な場合へ戻るべきか1つ選んで説明せよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

検算では $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ の中で変化させる量を1つだけ選ぶ。極限で不要な項が消える、identity作用へ戻る、分散/energyが既知値へ近づく、またはtransformが単純化することを確認する。この極限確認はdimension checkとは独立で、実装上の符号・normalization誤りを発見するのに有効である。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題7

摂動問題：Matrix differentialの入力を小さく変化させたとき、出力が一次近似でどう変わるかを中心式から説明し、感度が大きくなる条件を述べよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

小摂動では中心式を局所線形または一次変化として読む。$$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ に現れるJacobian、inverse、weight、frequency coefficient等の大きさが摂動増幅を決める。特にsingular/ill-conditioned、低情報、Nyquist違反など本文の失敗条件へ近づくと感度が大きくなる。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題8

実装debug：Matrix differentialをNumPy/SciPy/autodiffで実装した結果が理論値と合わない。最初に確認する具体的な3項目を、このTopic固有の式に即して挙げよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

まず symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。。加えて中心式 $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ のshape、転置・複素共役・normalization・sampling intervalなどTopic固有の規約を確認する。最後に小さな手計算例を同じcode pathへ通し、中間量を比較する。random simulationならseedとsample sizeも固定する。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題9

図の読み取り：`mat-matrix-differential.png` で変化させている量を中心式の記号へ対応させ、曲線・ellipse・spectrum・行列模様の変化を説明せよ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

図はMatrix differentialの中心式 $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ を視覚化している。横軸・縦軸・行列位置の意味を先に固定し、parameter変化がどの項へ入るかを追う。図の変化は本文の数学的意味と一致する必要があり、図だけの形状から未定義の因果関係を追加してはいけない。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題10

総合：Matrix differentialを実際の工学問題へ使う短い解析手順を、前提確認→数式化→計算→検算→失敗時の代替策の順で設計せよ。対象は「matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。」から1つ選べ。 参考にする具体例は「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」。また、このTopicで特に警戒すべき条件は「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

手順は、(1) Matrix differentialの前提とdata型を確認、(2) 中心式 $$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)$$ に観測量と未知量を割り当て、(3) 小例またはbaselineで計算、(4) symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。 を用いて独立検算、(5) 行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。 に該当するならmodelやalgorithmを変更する、の順にする。これにより公式適用だけでなく診断まで含む答案になる。 Matrix differential固有の再検算として、導出の出発点「$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。」と手計算例「$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。」を照合する。さらに実装では「symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。」を実行し、失敗条件「行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

[教科書へ](/textbook/mat-matrix-differential)
