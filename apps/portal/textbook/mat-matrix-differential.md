# Matrix differential

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-scalar-by-matrix-derivative`, `mat-vector-by-matrix-derivative`

## 1. このTopicで解く問い

公式を暗記せず、積・逆行列・traceの微分をdifferentialから再導出するにはどうするか。

Matrix differentialでは、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf A,\mathbf B$ | matrix-valued variables | compatible |
| $d\mathbf A,d\mathbf B$ | first-order perturbations | same shapes as originals |

## 3. 中心となる定義・式

$$
d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)
$$

Matrix differentialでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf A,\mathbf B$ は matrix-valued variables（compatible）、$d\mathbf A,d\mathbf B$ は first-order perturbations（same shapes as originals）。特に行列積は一般に可換でないため、中心式 `d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Matrix differentialではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。
2. $d\mathbf A\,d\mathbf B$ は二次微小量なので一次differentialでは捨てる。
3. 残る一次項がproduct ruleであり、scalar微分と同じ構造だが順序を交換してはいけない。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。

Matrix differentialの中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` を、matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Matrix differentialの図](/visuals/engineering-math/mat-matrix-differential.png)

Matrix differentialの図では、中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` に現れる量のうち1つを変化させる。手計算例 `$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。

Matrix differentialの実装では、まず `symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。` を実行する。そのうえで中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-scalar-by-matrix-derivative`, `mat-vector-by-matrix-derivative`。これらは単なる履修順ではない。`Matrix differential` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` のどの項に使われているかを対応づける。

また、matrix calculusのtrace trick、inverse derivative、log-det、Gaussian likelihoodの導出の共通基盤になる。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Matrix differential` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Matrix differential` の中心式 `$d(\mathbf A\mathbf B)=(d\mathbf A)\mathbf B+\mathbf A(d\mathbf B)` を、記号表なしで再定義できるか。
- `$\mathbf A\to\mathbf A+d\mathbf A$、$\mathbf B\to\mathbf B+d\mathbf B$ を積へ代入する。` から始めて、導出を途中式付きで再構成できるか。
- `$A(t)=\begin{bmatrix}t&0\\0&1\end{bmatrix}$、$B(t)=\begin{bmatrix}1&t\\0&1\end{bmatrix}$ に対し、積を直接微分した結果とproduct ruleが一致する。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `行列は一般に可換でない。scalar感覚で $(d\mathbf A)\mathbf B$ と $\mathbf B(d\mathbf A)$ を入れ替えると誤る。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `symbolicな公式だけでなく、微小乱数行列 `D` を加えた差分が一次予測と一致するか確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-matrix-differential)
