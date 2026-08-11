# スカラーを行列で微分する

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-scalar-by-vector-derivative`, `la-matrix-multiplication`

## 1. このTopicで解く問い

行列の各要素を動かしたときのスカラー目的関数の感度を、行列shapeのままどう保持するか。

スカラーを行列で微分するを工学で使うときは、理想式の成立条件と測定系の近似条件を分ける必要がある。理想式が正しくても、noise modelやsampling条件が違えば推定解釈は変わる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $f$ | scalar objective | 1 |
| $\mathbf X$ | matrix variable | m\times n |
| $\partial f/\partial\mathbf X$ | matrix gradient | m\times n |

## 3. 中心となる定義・式

$$
df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]
$$

スカラーを行列で微分するでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$f$ は scalar objective（1）、$\mathbf X$ は matrix variable（m\times n）、$\partial f/\partial\mathbf X$ は matrix gradient（m\times n）。特に行列積は一般に可換でないため、中心式 `df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。スカラーを行列で微分するではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $df=\sum_{i,j}(\partial f/\partial X_{ij})dX_{ij}$ から出発する。
2. Frobenius inner product $\langle\mathbf A,\mathbf B\rangle_F=\operatorname{tr}(\mathbf A^{\mathsf T}\mathbf B)$ を使う。
3. すると全要素の和が1つのtraceへまとまり、gradientは $\mathbf X$ と同じshapeを持つ。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

matrix factorization、covariance fitting、deep learningのweight gradientに直結する。

スカラーを行列で微分するの中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` を、matrix factorization、covariance fitting、deep learningのweight gradientに直結する。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `要素微分をflattenしたまま戻さないと、行列積の左右関係を失う。Frobenius inner productでshapeを復元する。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$f(\mathbf X)=\|\mathbf X\|_F^2$ なら $df=2\operatorname{tr}(\mathbf X^{\mathsf T}d\mathbf X)$ より $\partial f/\partial\mathbf X=2\mathbf X$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![スカラーを行列で微分するの図](/visuals/engineering-math/mat-scalar-by-matrix-derivative.png)

スカラーを行列で微分するの図では、中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` に現れる量のうち1つを変化させる。手計算例 `$f(\mathbf X)=\|\mathbf X\|_F^2$ なら $df=2\operatorname{tr}(\mathbf X^{\mathsf T}d\mathbf X)$ より $\partial f/\partial\mathbf X=2\mathbf X$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

要素微分をflattenしたまま戻さないと、行列積の左右関係を失う。Frobenius inner productでshapeを復元する。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

ランダム方向 `D` に対し `(f(X+hD)-f(X-hD))/(2h)` と `sum(grad*D)` を比較する。

スカラーを行列で微分するの実装では、まず `ランダム方向 `D` に対し `(f(X+hD)-f(X-hD))/(2h)` と `sum(grad*D)` を比較する。` を実行する。そのうえで中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

matrix factorization、covariance fitting、deep learningのweight gradientに直結する。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-scalar-by-vector-derivative`, `la-matrix-multiplication`。これらは単なる履修順ではない。`スカラーを行列で微分する` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$df=\sum_{i,j}(\partial f/\partial X_{ij})dX_{ij}$ から出発する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` のどの項に使われているかを対応づける。

また、matrix factorization、covariance fitting、deep learningのweight gradientに直結する。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`スカラーを行列で微分する` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `要素微分をflattenしたまま戻さないと、行列積の左右関係を失う。Frobenius inner productでshapeを復元する。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$f(\mathbf X)=\|\mathbf X\|_F^2$ なら $df=2\operatorname{tr}(\mathbf X^{\mathsf T}d\mathbf X)$ より $\partial f/\partial\mathbf X=2\mathbf X$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `スカラーを行列で微分する` の中心式 `$df=\operatorname{tr}\!\left[\left(\frac{\partial f}{\partial\mathbf X}\right)^{\mathsf T}d\mathbf X\right]` を、記号表なしで再定義できるか。
- `$df=\sum_{i,j}(\partial f/\partial X_{ij})dX_{ij}$ から出発する。` から始めて、導出を途中式付きで再構成できるか。
- `$f(\mathbf X)=\|\mathbf X\|_F^2$ なら $df=2\operatorname{tr}(\mathbf X^{\mathsf T}d\mathbf X)$ より $\partial f/\partial\mathbf X=2\mathbf X$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `要素微分をflattenしたまま戻さないと、行列積の左右関係を失う。Frobenius inner productでshapeを復元する。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `ランダム方向 `D` に対し `(f(X+hD)-f(X-hD))/(2h)` と `sum(grad*D)` を比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-scalar-by-matrix-derivative)
