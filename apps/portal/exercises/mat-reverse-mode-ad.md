# Reverse-mode AD：演習

行列・ベクトル微分。定義・導出・数値例・失敗条件まで再構成する10問。

## 問題1

記号とshape：Reverse-mode ADの中心式 `\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` に現れる各量の型・shapeを説明し、積や和が定義できる理由を示せ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

中心式は $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ である。記号表に従って各量のshapeを置く。v_k=node shape; \bar v_k=same shape; L=1。式中の積は隣接する内側次元が一致し、最終的な左辺と右辺の型が一致する。shapeを先に確定することで、転置や積順序の誤りを計算前に検出できる。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題2

導出再構成：Reverse-mode ADの中心式を、教科書の導出を見ずに前提定義から再構成せよ。少なくとも3段階の変形根拠を書くこと。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

導出は次の順序で再構成する。(1) forward passで中間値を保存する。 (2) 出力にseed $\bar L=1$ を置き、graphを逆順にたどる。 (3) 各edgeでlocal derivativeを掛けて親nodeへcotangentを加算する。 各段階で、単なる式変形ではなく使った定義・線形性・極限・確率法則を明記する。最後に得られた式のshapeと単位を確認すれば、導出の向きも検算できる。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題3

手計算：次のReverse-mode ADの例を途中式付きで計算し、結果を中心式と照合せよ。$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

与えられた例は $L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。。まず既知量を中心式 $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ の対応する記号へ割り当てる。次に中間量を順に計算し、最後に本文記載の結果へ到達する。重要なのは最終値だけでなく、各中間量のshapeまたは確率範囲を検算することである。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題4

意味の説明：Reverse-mode ADの式が、工学的には何を測り、何を変換しているかを数式中の量と対応づけて説明せよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

このTopicの工学的役割は次の通りである。deep learningのbackprop、scalar objectiveを持つoptimizationの標準。。したがって中心式の各項は単なる記号ではなく、入力構造・感度・情報・frequency成分などの対応量を持つ。式を使う際は、どの量が観測から決まり、どの量がmodel仮定なのかを区別する。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題5

成立条件：Reverse-mode ADを適用してはいけない、または注意が必要な条件を1つ具体化し、なぜ中心式の解釈が壊れるか説明せよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

代表的な失敗条件は次である。memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。。問題なのは単に数値が不安定になることではなく、式を導いた前提そのものが失われる点である。したがって適用前には前提を検査し、違反時には別model・regularization・別transformなどを選択する。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題6

極限・scale検算：Reverse-mode ADの主要parameterを0、1、十分大きい値、またはidentity相当へ近づけたとき、中心式がどの簡単な場合へ戻るべきか1つ選んで説明せよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

検算では $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ の中で変化させる量を1つだけ選ぶ。極限で不要な項が消える、identity作用へ戻る、分散/energyが既知値へ近づく、またはtransformが単純化することを確認する。この極限確認はdimension checkとは独立で、実装上の符号・normalization誤りを発見するのに有効である。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題7

摂動問題：Reverse-mode ADの入力を小さく変化させたとき、出力が一次近似でどう変わるかを中心式から説明し、感度が大きくなる条件を述べよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

小摂動では中心式を局所線形または一次変化として読む。$$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ に現れるJacobian、inverse、weight、frequency coefficient等の大きさが摂動増幅を決める。特にsingular/ill-conditioned、低情報、Nyquist違反など本文の失敗条件へ近づくと感度が大きくなる。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題8

実装debug：Reverse-mode ADをNumPy/SciPy/autodiffで実装した結果が理論値と合わない。最初に確認する具体的な3項目を、このTopic固有の式に即して挙げよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

まず reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。。加えて中心式 $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ のshape、転置・複素共役・normalization・sampling intervalなどTopic固有の規約を確認する。最後に小さな手計算例を同じcode pathへ通し、中間量を比較する。random simulationならseedとsample sizeも固定する。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題9

図の読み取り：`mat-reverse-mode-ad.png` で変化させている量を中心式の記号へ対応させ、曲線・ellipse・spectrum・行列模様の変化を説明せよ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

図はReverse-mode ADの中心式 $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ を視覚化している。横軸・縦軸・行列位置の意味を先に固定し、parameter変化がどの項へ入るかを追う。図の変化は本文の数学的意味と一致する必要があり、図だけの形状から未定義の因果関係を追加してはいけない。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

## 問題10

総合：Reverse-mode ADを実際の工学問題へ使う短い解析手順を、前提確認→数式化→計算→検算→失敗時の代替策の順で設計せよ。対象は「deep learningのbackprop、scalar objectiveを持つoptimizationの標準。」から1つ選べ。 参考にする具体例は「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」。また、このTopicで特に警戒すべき条件は「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」。問題文では両者を区別して使うこと。

<details><summary>完全解答</summary>

手順は、(1) Reverse-mode ADの前提とdata型を確認、(2) 中心式 $$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}$$ に観測量と未知量を割り当て、(3) 小例またはbaselineで計算、(4) reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。 を用いて独立検算、(5) memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。 に該当するならmodelやalgorithmを変更する、の順にする。これにより公式適用だけでなく診断まで含む答案になる。 Reverse-mode AD固有の再検算として、導出の出発点「forward passで中間値を保存する。」と手計算例「$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。」を照合する。さらに実装では「reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。」を実行し、失敗条件「memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。」に近づけたときに結果がどの方向へ崩れるかまで確認する。

</details>

[教科書へ](/textbook/mat-reverse-mode-ad)
