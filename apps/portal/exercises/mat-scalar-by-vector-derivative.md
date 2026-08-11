# スカラーをベクトルで微分する：演習

行列・ベクトル微分。定義・導出・数値例・失敗条件まで再構成する10問。

## 問題1

記号とshape：スカラーをベクトルで微分するの中心式 `df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` に現れる各量の型・shapeを説明し、積や和が定義できる理由を示せ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

中心式は $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ である。記号表に従って各量のshapeを置く。f=1; \mathbf x=n; \nabla f=n; d\mathbf x=n。式中の積は隣接する内側次元が一致し、最終的な左辺と右辺の型が一致する。shapeを先に確定することで、転置や積順序の誤りを計算前に検出できる。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題2

導出再構成：スカラーをベクトルで微分するの中心式を、教科書の導出を見ずに前提定義から再構成せよ。少なくとも3段階の変形根拠を書くこと。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

導出は次の順序で再構成する。(1) $f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。 (2) 各成分の寄与を集めると $df=\sum_i(\partial f/\partial x_i)dx_i$ になる。 (3) この係数を縦ベクトルに集めれば $df=\nabla f^{\mathsf T}d\mathbf x$ で、gradientのshapeが自動的に決まる。 各段階で、単なる式変形ではなく使った定義・線形性・極限・確率法則を明記する。最後に得られた式のshapeと単位を確認すれば、導出の向きも検算できる。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題3

手計算：次のスカラーをベクトルで微分するの例を途中式付きで計算し、結果を中心式と照合せよ。$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

与えられた例は $f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。。まず既知量を中心式 $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ の対応する記号へ割り当てる。次に中間量を順に計算し、最後に本文記載の結果へ到達する。重要なのは最終値だけでなく、各中間量のshapeまたは確率範囲を検算することである。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題4

意味の説明：スカラーをベクトルで微分するの式が、工学的には何を測り、何を変換しているかを数式中の量と対応づけて説明せよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

このTopicの工学的役割は次の通りである。損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。。したがって中心式の各項は単なる記号ではなく、入力構造・感度・情報・frequency成分などの対応量を持つ。式を使う際は、どの量が観測から決まり、どの量がmodel仮定なのかを区別する。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題5

成立条件：スカラーをベクトルで微分するを適用してはいけない、または注意が必要な条件を1つ具体化し、なぜ中心式の解釈が壊れるか説明せよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

代表的な失敗条件は次である。gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。。問題なのは単に数値が不安定になることではなく、式を導いた前提そのものが失われる点である。したがって適用前には前提を検査し、違反時には別model・regularization・別transformなどを選択する。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題6

極限・scale検算：スカラーをベクトルで微分するの主要parameterを0、1、十分大きい値、またはidentity相当へ近づけたとき、中心式がどの簡単な場合へ戻るべきか1つ選んで説明せよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

検算では $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ の中で変化させる量を1つだけ選ぶ。極限で不要な項が消える、identity作用へ戻る、分散/energyが既知値へ近づく、またはtransformが単純化することを確認する。この極限確認はdimension checkとは独立で、実装上の符号・normalization誤りを発見するのに有効である。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題7

摂動問題：スカラーをベクトルで微分するの入力を小さく変化させたとき、出力が一次近似でどう変わるかを中心式から説明し、感度が大きくなる条件を述べよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

小摂動では中心式を局所線形または一次変化として読む。$$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ に現れるJacobian、inverse、weight、frequency coefficient等の大きさが摂動増幅を決める。特にsingular/ill-conditioned、低情報、Nyquist違反など本文の失敗条件へ近づくと感度が大きくなる。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題8

実装debug：スカラーをベクトルで微分するをNumPy/SciPy/autodiffで実装した結果が理論値と合わない。最初に確認する具体的な3項目を、このTopic固有の式に即して挙げよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

まず 有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。。加えて中心式 $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ のshape、転置・複素共役・normalization・sampling intervalなどTopic固有の規約を確認する。最後に小さな手計算例を同じcode pathへ通し、中間量を比較する。random simulationならseedとsample sizeも固定する。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題9

図の読み取り：`mat-scalar-by-vector-derivative.png` で変化させている量を中心式の記号へ対応させ、曲線・ellipse・spectrum・行列模様の変化を説明せよ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

図はスカラーをベクトルで微分するの中心式 $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ を視覚化している。横軸・縦軸・行列位置の意味を先に固定し、parameter変化がどの項へ入るかを追う。図の変化は本文の数学的意味と一致する必要があり、図だけの形状から未定義の因果関係を追加してはいけない。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題10

総合：スカラーをベクトルで微分するを実際の工学問題へ使う短い解析手順を、前提確認→数式化→計算→検算→失敗時の代替策の順で設計せよ。対象は「損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。」から1つ選べ。 参考にする具体例は「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」。また、このTopicで特に警戒すべき条件は「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

手順は、(1) スカラーをベクトルで微分するの前提とdata型を確認、(2) 中心式 $$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}$$ に観測量と未知量を割り当て、(3) 小例またはbaselineで計算、(4) 有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。 を用いて独立検算、(5) gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。 に該当するならmodelやalgorithmを変更する、の順にする。これにより公式適用だけでなく診断まで含む答案になる。 スカラーをベクトルで微分する固有の再検算として、導出の出発点「$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。」と手計算例「$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。」を照合する。さらに実装では「有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。」を実行し、失敗条件「gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

[教科書へ](/textbook/mat-scalar-by-vector-derivative)
