# ベクトルを行列で微分する

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-vector-by-vector-derivative`, `mat-scalar-by-matrix-derivative`

## 1. このTopicで解く問い

行列入力からベクトル出力への微分を、巨大な4階tensorを避けてどう扱うか。

ベクトルを行列で微分するの理解確認には、中心式を小さな数値例へ落とし、次に条件を一つだけ破った反例を見る方法が有効である。公式の適用範囲まで含めて理解できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf X$ | matrix input | m\times n |
| $\mathbf y$ | vector output | p |
| $\operatorname{vec}(\mathbf X)$ | vectorized input | mn |
| $\mathbf J$ | Jacobian | p\times mn |

## 3. 中心となる定義・式

$$
d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)
$$

ベクトルを行列で微分するでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf X$ は matrix input（m\times n）、$\mathbf y$ は vector output（p）、$\operatorname{vec}(\mathbf X)$ は vectorized input（mn）、$\mathbf J$ は Jacobian（p\times mn）。特に行列積は一般に可換でないため、中心式 `d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。ベクトルを行列で微分するではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. 行列要素 $X_{ij}$ を独立座標と見なして $\operatorname{vec}(\mathbf X)$ に並べる。
2. 各出力 $y_k$ を各座標で偏微分すると $p\times mn$ Jacobianが得られる。
3. 実装ではtensor全体を作らずJVP/VJPとして作用だけ計算するのが普通である。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。

ベクトルを行列で微分するの中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` を、画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![ベクトルを行列で微分するの図](/visuals/engineering-math/mat-vector-by-matrix-derivative.png)

ベクトルを行列で微分するの図では、中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` に現れる量のうち1つを変化させる。手計算例 `$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

autodiffの`jvp`でdirectional actionを計算し、full Jacobianを作った結果と小規模例で照合する。

ベクトルを行列で微分するの実装では、まず `autodiffの`jvp`でdirectional actionを計算し、full Jacobianを作った結果と小規模例で照合する。` を実行する。そのうえで中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-vector-by-vector-derivative`, `mat-scalar-by-matrix-derivative`。これらは単なる履修順ではない。`ベクトルを行列で微分する` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `行列要素 $X_{ij}$ を独立座標と見なして $\operatorname{vec}(\mathbf X)$ に並べる。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` のどの項に使われているかを対応づける。

また、画像処理operatorやlayer weightから出力featureへの局所感度を扱う際に現れる。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`ベクトルを行列で微分する` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `ベクトルを行列で微分する` の中心式 `$d\mathbf y=\mathbf J_{\operatorname{vec}(\mathbf X)}\,d\operatorname{vec}(\mathbf X)` を、記号表なしで再定義できるか。
- `行列要素 $X_{ij}$ を独立座標と見なして $\operatorname{vec}(\mathbf X)$ に並べる。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf y=\mathbf X\mathbf a$、$\mathbf X\in\mathbb R^{2\times2}$、$\mathbf a=(1,2)^{\mathsf T}$ なら、各行の微分は $(1,2)$ を対応位置に持つ。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `4階微分tensorを明示生成するとmemoryが急増する。必要な作用方向がJVPかVJPかを先に決める。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `autodiffの`jvp`でdirectional actionを計算し、full Jacobianを作った結果と小規模例で照合する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-vector-by-matrix-derivative)
