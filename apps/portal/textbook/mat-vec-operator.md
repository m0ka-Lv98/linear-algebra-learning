# vec operator

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-matrix-differential`

## 1. このTopicで解く問い

行列を1本のベクトルへ並べ、matrix equationを通常の線形代数へ落とすには。

vec operatorの計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf X$ | matrix | m\times n |
| $\operatorname{vec}(\mathbf X)$ | column-stacked vector | mn |
| $\otimes$ | Kronecker product | operator |

## 3. 中心となる定義・式

$$
\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)
$$

vec operatorでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf X$ は matrix（m\times n）、$\operatorname{vec}(\mathbf X)$ は column-stacked vector（mn）、$\otimes$ は Kronecker product（operator）。特に行列積は一般に可換でないため、中心式 `\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。vec operatorではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. まず $\operatorname{vec}$ の列優先規約を固定する。
2. $\mathbf A\mathbf X\mathbf B$ の各列は $\mathbf A\mathbf X$ の列の線形結合である。
3. 係数をblockとして並べると $\mathbf B^{\mathsf T}\otimes\mathbf A$ が現れる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

Sylvester equation、matrix normal model、Kronecker covariance、matrix derivativeの表現に使う。

vec operatorの中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` を、Sylvester equation、matrix normal model、Kronecker covariance、matrix derivativeの表現に使う。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `NumPyのdefault reshapeはC-orderで、数学のcolumn-major vecと異なることがある。規約を明示しない実装は危険。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf X=\begin{bmatrix}1&2\\3&4\end{bmatrix}$ ならcolumn-major vecは $(1,3,2,4)^{\mathsf T}$。row-majorとの混同に注意する。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![vec operatorの図](/visuals/engineering-math/mat-vec-operator.png)

vec operatorの図では、中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` に現れる量のうち1つを変化させる。手計算例 `$\mathbf X=\begin{bmatrix}1&2\\3&4\end{bmatrix}$ ならcolumn-major vecは $(1,3,2,4)^{\mathsf T}$。row-majorとの混同に注意する。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

NumPyのdefault reshapeはC-orderで、数学のcolumn-major vecと異なることがある。規約を明示しない実装は危険。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`X.reshape(-1, order="F")` とKronecker identityを小行列で検算する。

vec operatorの実装では、まず ``X.reshape(-1, order="F")` とKronecker identityを小行列で検算する。` を実行する。そのうえで中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

Sylvester equation、matrix normal model、Kronecker covariance、matrix derivativeの表現に使う。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-matrix-differential`。これらは単なる履修順ではない。`vec operator` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `まず $\operatorname{vec}$ の列優先規約を固定する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` のどの項に使われているかを対応づける。

また、Sylvester equation、matrix normal model、Kronecker covariance、matrix derivativeの表現に使う。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`vec operator` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `NumPyのdefault reshapeはC-orderで、数学のcolumn-major vecと異なることがある。規約を明示しない実装は危険。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf X=\begin{bmatrix}1&2\\3&4\end{bmatrix}$ ならcolumn-major vecは $(1,3,2,4)^{\mathsf T}$。row-majorとの混同に注意する。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `vec operator` の中心式 `$\operatorname{vec}(\mathbf A\mathbf X\mathbf B)=(\mathbf B^{\mathsf T}\otimes\mathbf A)\operatorname{vec}(\mathbf X)` を、記号表なしで再定義できるか。
- `まず $\operatorname{vec}$ の列優先規約を固定する。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf X=\begin{bmatrix}1&2\\3&4\end{bmatrix}$ ならcolumn-major vecは $(1,3,2,4)^{\mathsf T}$。row-majorとの混同に注意する。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `NumPyのdefault reshapeはC-orderで、数学のcolumn-major vecと異なることがある。規約を明示しない実装は危険。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``X.reshape(-1, order="F")` とKronecker identityを小行列で検算する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-vec-operator)
