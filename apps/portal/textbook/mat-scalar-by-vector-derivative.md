# スカラーをベクトルで微分する

**分野:** 行列・ベクトル微分
**Prerequisites:** `calc-derivatives-rates`, `calc-multivariable-functions-partial-derivatives`, `la-vectors-linear-combinations`

## 1. このTopicで解く問い

スカラー関数の微小変化を、入力ベクトルの各方向の感度としてどう表すか。

スカラーをベクトルで微分するの計算で重要なのは、数値を代入する前に定義域とshapeを固定することだ。これにより、転置・正規化・積分変数の取り違えを式の段階で検出できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $f$ | scalar-valued function | 1 |
| $\mathbf x$ | input vector | n |
| $\nabla f$ | gradient | n |
| $d\mathbf x$ | infinitesimal perturbation | n |

## 3. 中心となる定義・式

$$
df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}
$$

スカラーをベクトルで微分するでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$f$ は scalar-valued function（1）、$\mathbf x$ は input vector（n）、$\nabla f$ は gradient（n）、$d\mathbf x$ は infinitesimal perturbation（n）。特に行列積は一般に可換でないため、中心式 `df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。スカラーをベクトルで微分するではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。
2. 各成分の寄与を集めると $df=\sum_i(\partial f/\partial x_i)dx_i$ になる。
3. この係数を縦ベクトルに集めれば $df=\nabla f^{\mathsf T}d\mathbf x$ で、gradientのshapeが自動的に決まる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。

スカラーをベクトルで微分するの中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` を、損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![スカラーをベクトルで微分するの図](/visuals/engineering-math/mat-scalar-by-vector-derivative.png)

スカラーをベクトルで微分するの図では、中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` に現れる量のうち1つを変化させる。手計算例 `$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。

スカラーをベクトルで微分するの実装では、まず `有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。` を実行する。そのうえで中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `calc-derivatives-rates`, `calc-multivariable-functions-partial-derivatives`, `la-vectors-linear-combinations`。これらは単なる履修順ではない。`スカラーをベクトルで微分する` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` のどの項に使われているかを対応づける。

また、損失関数の勾配、感度解析、最急降下法はすべてこの一次近似を使う。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`スカラーをベクトルで微分する` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `スカラーをベクトルで微分する` の中心式 `$df=\nabla f(\mathbf x)^{\mathsf T}d\mathbf x,\qquad \nabla f=\begin{bmatrix}\partial f/\partial x_1&\cdots&\partial f/\partial x_n\end{bmatrix}^{\mathsf T}` を、記号表なしで再定義できるか。
- `$f(\mathbf x+d\mathbf x)-f(\mathbf x)$ を一次までTaylor展開する。` から始めて、導出を途中式付きで再構成できるか。
- `$f(x_1,x_2)=x_1^2+3x_1x_2$ では $\nabla f=(2x_1+3x_2,3x_1)^{\mathsf T}$。$(1,2)$ なら $(8,3)^{\mathsf T}$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `gradientを行ベクトルと縦ベクトルで混在させるとchain ruleのshapeが崩れる。まずdifferentialのscalar性を基準に向きを決める。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `有限差分 `(f(x+h e_i)-f(x-h e_i))/(2h)` と解析gradientを成分ごとに比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-scalar-by-vector-derivative)
