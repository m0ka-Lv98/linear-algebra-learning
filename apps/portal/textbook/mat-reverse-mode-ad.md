# Reverse-mode AD

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-automatic-differentiation`, `mat-vector-jacobian-product`

## 1. このTopicで解く問い

scalar出力から非常に多い入力parameterへgradientを1回の逆伝播で得るには。

Reverse-mode ADでは、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $v_k$ | forward node value | node shape |
| $\bar v_k$ | adjoint/cotangent | same shape |
| $L$ | final scalar objective | 1 |

## 3. 中心となる定義・式

$$
\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}
$$

Reverse-mode ADでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$v_k$ は forward node value（node shape）、$\bar v_k$ は adjoint/cotangent（same shape）、$L$ は final scalar objective（1）。特に行列積は一般に可換でないため、中心式 `\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Reverse-mode ADではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. forward passで中間値を保存する。
2. 出力にseed $\bar L=1$ を置き、graphを逆順にたどる。
3. 各edgeでlocal derivativeを掛けて親nodeへcotangentを加算する。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

deep learningのbackprop、scalar objectiveを持つoptimizationの標準。

Reverse-mode ADの中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` を、deep learningのbackprop、scalar objectiveを持つoptimizationの標準。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Reverse-mode ADの図](/visuals/engineering-math/mat-reverse-mode-ad.png)

Reverse-mode ADの図では、中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` に現れる量のうち1つを変化させる。手計算例 `$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。

Reverse-mode ADの実装では、まず `reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。` を実行する。そのうえで中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

deep learningのbackprop、scalar objectiveを持つoptimizationの標準。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-automatic-differentiation`, `mat-vector-jacobian-product`。これらは単なる履修順ではない。`Reverse-mode AD` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `forward passで中間値を保存する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` のどの項に使われているかを対応づける。

また、deep learningのbackprop、scalar objectiveを持つoptimizationの標準。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Reverse-mode AD` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Reverse-mode AD` の中心式 `$\bar v_j\mathrel{+}=\bar v_k\frac{\partial v_k}{\partial v_j}` を、記号表なしで再定義できるか。
- `forward passで中間値を保存する。` から始めて、導出を途中式付きで再構成できるか。
- `$L=(xy)^2$ なら中間 $u=xy$、逆伝播で $\bar u=2u$、$\bar x=2uy=2xy^2$、$\bar y=2ux=2x^2y$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `memoryを節約せず全中間を保存すると大規模modelで支配的になる。checkpointingは計算とmemoryのtrade-off。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `reverse-mode gradientとfinite differenceを比較し、入力数を増やしたときの計算回数の違いも測る。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-reverse-mode-ad)
