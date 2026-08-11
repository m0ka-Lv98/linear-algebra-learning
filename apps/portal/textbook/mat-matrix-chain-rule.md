# Matrix chain rule

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-vector-by-vector-derivative`, `mat-vector-by-matrix-derivative`

## 1. このTopicで解く問い

合成されたvector/matrix functionの微分を、shapeを壊さずどうつなぐか。

Matrix chain ruleでは、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf x$ | input | n |
| $g$ | intermediate map | n\to p |
| $f$ | outer map | p\to m |
| $\mathbf J$ | Jacobian | output\times input |

## 3. 中心となる定義・式

$$
\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)
$$

Matrix chain ruleでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf x$ は input（n）、$g$ は intermediate map（n\to p）、$f$ は outer map（p\to m）、$\mathbf J$ は Jacobian（output\times input）。特に行列積は一般に可換でないため、中心式 `\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Matrix chain ruleではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $d\mathbf z=\mathbf J_gd\mathbf x$、$d\mathbf y=\mathbf J_fd\mathbf z$ と局所線形化する。
2. 中間変数 $d\mathbf z$ を代入すると $d\mathbf y=\mathbf J_f\mathbf J_gd\mathbf x$。
3. 積の内側次元 $p$ が一致することがchain ruleのshape checkになる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。

Matrix chain ruleの中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` を、computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Matrix chain ruleの図](/visuals/engineering-math/mat-matrix-chain-rule.png)

Matrix chain ruleの図では、中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` に現れる量のうち1つを変化させる。手計算例 `$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

小さい合成関数でfull Jacobian積とautodiffのJacobianを比較する。

Matrix chain ruleの実装では、まず `小さい合成関数でfull Jacobian積とautodiffのJacobianを比較する。` を実行する。そのうえで中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-vector-by-vector-derivative`, `mat-vector-by-matrix-derivative`。これらは単なる履修順ではない。`Matrix chain rule` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$d\mathbf z=\mathbf J_gd\mathbf x$、$d\mathbf y=\mathbf J_fd\mathbf z$ と局所線形化する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` のどの項に使われているかを対応づける。

また、computational graph、neural network、座標変換、複合sensor modelの感度伝播に使う。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Matrix chain rule` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Matrix chain rule` の中心式 `$\mathbf J_{f\circ g}(\mathbf x)=\mathbf J_f(g(\mathbf x))\mathbf J_g(\mathbf x)` を、記号表なしで再定義できるか。
- `$d\mathbf z=\mathbf J_gd\mathbf x$、$d\mathbf y=\mathbf J_fd\mathbf z$ と局所線形化する。` から始めて、導出を途中式付きで再構成できるか。
- `$g(x_1,x_2)=(x_1+x_2,x_1-x_2)$、$f(z_1,z_2)=z_1^2+z_2^2$ とすると、Jacobian積から直接微分と同じgradientが得られる。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `Jacobian規約を転置して混ぜると積順序が逆転する。使用するnumerator/denominator layoutを教材内で固定する。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `小さい合成関数でfull Jacobian積とautodiffのJacobianを比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-matrix-chain-rule)
