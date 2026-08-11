# Jacobian-vector product (JVP)

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-vector-by-vector-derivative`, `la-matrix-multiplication`

## 1. このTopicで解く問い

Jacobian全体を作らず、指定方向への出力感度だけをどう計算するか。

Jacobian-vector product (JVP)の計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf J_f$ | Jacobian | m\times n |
| $\mathbf v$ | input tangent | n |
| $\mathbf J_f\mathbf v$ | output tangent | m |

## 3. 中心となる定義・式

$$
\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}
$$

Jacobian-vector product (JVP)では、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf J_f$ は Jacobian（m\times n）、$\mathbf v$ は input tangent（n）、$\mathbf J_f\mathbf v$ は output tangent（m）。特に行列積は一般に可換でないため、中心式 `\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Jacobian-vector product (JVP)ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. 方向 $\mathbf v$ に沿う一変数curve $\mathbf x(\epsilon)=\mathbf x+\epsilon\mathbf v$ を作る。
2. chain ruleで $d f(\mathbf x(\epsilon))/d\epsilon=\mathbf J_f\mathbf v$。
3. したがってfull Jacobianを保存せずforward directional derivativeとして計算できる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。

Jacobian-vector product (JVP)の中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` を、forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Jacobian-vector product (JVP)の図](/visuals/engineering-math/mat-jacobian-vector-product.png)

Jacobian-vector product (JVP)の図では、中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` に現れる量のうち1つを変化させる。手計算例 `$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

frameworkの`jvp`と明示Jacobian `J @ v` を小規模例で一致させる。

Jacobian-vector product (JVP)の実装では、まず `frameworkの`jvp`と明示Jacobian `J @ v` を小規模例で一致させる。` を実行する。そのうえで中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-vector-by-vector-derivative`, `la-matrix-multiplication`。これらは単なる履修順ではない。`Jacobian-vector product (JVP)` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `方向 $\mathbf v$ に沿う一変数curve $\mathbf x(\epsilon)=\mathbf x+\epsilon\mathbf v$ を作る。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` のどの項に使われているかを対応づける。

また、forward-mode AD、sensitivity ODE、implicit layerの線形化に有効。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Jacobian-vector product (JVP)` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Jacobian-vector product (JVP)` の中心式 `$\operatorname{JVP}(f,\mathbf x;\mathbf v)=\mathbf J_f(\mathbf x)\mathbf v=\left.\frac{d}{d\epsilon}f(\mathbf x+\epsilon\mathbf v)\right|_{\epsilon=0}` を、記号表なしで再定義できるか。
- `方向 $\mathbf v$ に沿う一変数curve $\mathbf x(\epsilon)=\mathbf x+\epsilon\mathbf v$ を作る。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf J=\begin{bmatrix}1&2\\3&4\end{bmatrix}$、$\mathbf v=(1,-1)^{\mathsf T}$ ならJVPは $(-1,-1)^{\mathsf T}$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `出力が巨大でもJVPは1方向しか与えない。全方向を知るためにbasis全部へ適用するとfull Jacobianと同程度の計算になる。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `frameworkの`jvp`と明示Jacobian `J @ v` を小規模例で一致させる。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-jacobian-vector-product)
