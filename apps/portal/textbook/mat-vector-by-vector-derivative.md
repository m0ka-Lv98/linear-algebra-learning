# ベクトルをベクトルで微分する：Jacobian

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-scalar-by-vector-derivative`

## 1. このTopicで解く問い

ベクトル入力の小変化が、ベクトル出力へどう線形伝播するか。

ベクトルをベクトルで微分する：Jacobianは『何を保存し、何を変換するか』を分離すると理解しやすい。中心式の左辺を観測量、右辺を構成操作として読み、各因子の役割を一つずつ確認する。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf x$ | input | n |
| $\mathbf y=f(\mathbf x)$ | output | m |
| $\mathbf J_f$ | Jacobian | m\times n |

## 3. 中心となる定義・式

$$
d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}
$$

ベクトルをベクトルで微分する：Jacobianでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf x$ は input（n）、$\mathbf y=f(\mathbf x)$ は output（m）、$\mathbf J_f$ は Jacobian（m\times n）。特に行列積は一般に可換でないため、中心式 `d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。ベクトルをベクトルで微分する：Jacobianではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. 各出力 $f_i$ に対して $df_i=\sum_j(\partial f_i/\partial x_j)dx_j$ と書く。
2. これを $m$ 本縦に積むと、係数配列が $m\times n$ のJacobianになる。
3. したがって局所的に $f(\mathbf x+d\mathbf x)\approx f(\mathbf x)+\mathbf J_fd\mathbf x$。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

非線形センサモデル、座標変換、ニューラルネットの局所線形化に使う。

ベクトルをベクトルで微分する：Jacobianの中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` を、非線形センサモデル、座標変換、ニューラルネットの局所線形化に使う。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `Jacobianの転置規約を取り違えるとJVP/VJPが逆になる。入力次元が列数、出力次元が行数というshapeを固定する。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$f(x_1,x_2)=(x_1+x_2,x_1x_2)^{\mathsf T}$ なら $\mathbf J=\begin{bmatrix}1&1\\x_2&x_1\end{bmatrix}$。$(2,3)$ では $\begin{bmatrix}1&1\\3&2\end{bmatrix}$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![ベクトルをベクトルで微分する：Jacobianの図](/visuals/engineering-math/mat-vector-by-vector-derivative.png)

ベクトルをベクトルで微分する：Jacobianの図では、中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` に現れる量のうち1つを変化させる。手計算例 `$f(x_1,x_2)=(x_1+x_2,x_1x_2)^{\mathsf T}$ なら $\mathbf J=\begin{bmatrix}1&1\\x_2&x_1\end{bmatrix}$。$(2,3)$ では $\begin{bmatrix}1&1\\3&2\end{bmatrix}$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

Jacobianの転置規約を取り違えるとJVP/VJPが逆になる。入力次元が列数、出力次元が行数というshapeを固定する。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`J @ dx` と実際の `f(x+dx)-f(x)` を小さい `dx` で比較し、誤差が二次で減ることを確かめる。

ベクトルをベクトルで微分する：Jacobianの実装では、まず ``J @ dx` と実際の `f(x+dx)-f(x)` を小さい `dx` で比較し、誤差が二次で減ることを確かめる。` を実行する。そのうえで中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

非線形センサモデル、座標変換、ニューラルネットの局所線形化に使う。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-scalar-by-vector-derivative`。これらは単なる履修順ではない。`ベクトルをベクトルで微分する：Jacobian` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `各出力 $f_i$ に対して $df_i=\sum_j(\partial f_i/\partial x_j)dx_j$ と書く。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` のどの項に使われているかを対応づける。

また、非線形センサモデル、座標変換、ニューラルネットの局所線形化に使う。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`ベクトルをベクトルで微分する：Jacobian` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `Jacobianの転置規約を取り違えるとJVP/VJPが逆になる。入力次元が列数、出力次元が行数というshapeを固定する。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$f(x_1,x_2)=(x_1+x_2,x_1x_2)^{\mathsf T}$ なら $\mathbf J=\begin{bmatrix}1&1\\x_2&x_1\end{bmatrix}$。$(2,3)$ では $\begin{bmatrix}1&1\\3&2\end{bmatrix}$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `ベクトルをベクトルで微分する：Jacobian` の中心式 `$d\mathbf y=\mathbf J_f(\mathbf x)d\mathbf x,\qquad (\mathbf J_f)_{ij}=\frac{\partial f_i}{\partial x_j}` を、記号表なしで再定義できるか。
- `各出力 $f_i$ に対して $df_i=\sum_j(\partial f_i/\partial x_j)dx_j$ と書く。` から始めて、導出を途中式付きで再構成できるか。
- `$f(x_1,x_2)=(x_1+x_2,x_1x_2)^{\mathsf T}$ なら $\mathbf J=\begin{bmatrix}1&1\\x_2&x_1\end{bmatrix}$。$(2,3)$ では $\begin{bmatrix}1&1\\3&2\end{bmatrix}$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `Jacobianの転置規約を取り違えるとJVP/VJPが逆になる。入力次元が列数、出力次元が行数というshapeを固定する。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``J @ dx` と実際の `f(x+dx)-f(x)` を小さい `dx` で比較し、誤差が二次で減ることを確かめる。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-vector-by-vector-derivative)
