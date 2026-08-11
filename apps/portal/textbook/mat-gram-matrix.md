# Gram matrix

**分野:** 行列・ベクトル微分
**Prerequisites:** `la-inner-products-norms-angles`, `la-matrix-multiplication`

## 1. このTopicで解く問い

複数ベクトルの内積関係を、1枚の行列にどう集約するか。

Gram matrixでは、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf X$ | 列にベクトルを並べた行列 | m\times n |
| $\mathbf G$ | Gram行列 | n\times n |
| $\mathbf x_i$ | 第i列ベクトル | m |

## 3. 中心となる定義・式

$$
\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j
$$

Gram matrixでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf X$ は 列にベクトルを並べた行列（m\times n）、$\mathbf G$ は Gram行列（n\times n）、$\mathbf x_i$ は 第i列ベクトル（m）。特に行列積は一般に可換でないため、中心式 `\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Gram matrixではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. 積の(i,j)成分を展開すると $(\mathbf X^{\mathsf T}\mathbf X)_{ij}=\sum_{k=1}^m X_{ki}X_{kj}$ となる。
2. 右辺は列 $\mathbf x_i$ と $\mathbf x_j$ のEuclidean inner productそのものである。
3. 任意の $\mathbf a$ に対して $\mathbf a^{\mathsf T}\mathbf G\mathbf a=\|\mathbf X\mathbf a\|_2^2\ge0$ なので $\mathbf G$ はpositive semidefiniteである。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

least squares、kernel method、Hotspot Matrixでは、設計列・スペクトル列の識別可能性をGram構造から診断する。

Gram matrixの中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` を、least squares、kernel method、Hotspot Matrixでは、設計列・スペクトル列の識別可能性をGram構造から診断する。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `列がほぼ平行だとGram行列は悪条件化する。逆行列の大きさだけを見て、元の列幾何を確認しないとcollinearityの原因を見失う。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf X=[(1,0)^{\mathsf T},(1,1)^{\mathsf T}]$ なら $\mathbf G=\begin{bmatrix}1&1\\1&2\end{bmatrix}$。対角は各列の二乗norm、非対角は列間の重なりである。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Gram matrixの図](/visuals/engineering-math/mat-gram-matrix.png)

Gram matrixの図では、中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` に現れる量のうち1つを変化させる。手計算例 `$\mathbf X=[(1,0)^{\mathsf T},(1,1)^{\mathsf T}]$ なら $\mathbf G=\begin{bmatrix}1&1\\1&2\end{bmatrix}$。対角は各列の二乗norm、非対角は列間の重なりである。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

列がほぼ平行だとGram行列は悪条件化する。逆行列の大きさだけを見て、元の列幾何を確認しないとcollinearityの原因を見失う。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`G = X.T @ X` を作り、`eigvalsh(G)` と `svd(X)` の二乗特異値が一致するかを確認する。

Gram matrixの実装では、まず ``G = X.T @ X` を作り、`eigvalsh(G)` と `svd(X)` の二乗特異値が一致するかを確認する。` を実行する。そのうえで中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

least squares、kernel method、Hotspot Matrixでは、設計列・スペクトル列の識別可能性をGram構造から診断する。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `la-inner-products-norms-angles`, `la-matrix-multiplication`。これらは単なる履修順ではない。`Gram matrix` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `積の(i,j)成分を展開すると $(\mathbf X^{\mathsf T}\mathbf X)_{ij}=\sum_{k=1}^m X_{ki}X_{kj}$ となる。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` のどの項に使われているかを対応づける。

また、least squares、kernel method、Hotspot Matrixでは、設計列・スペクトル列の識別可能性をGram構造から診断する。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Gram matrix` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `列がほぼ平行だとGram行列は悪条件化する。逆行列の大きさだけを見て、元の列幾何を確認しないとcollinearityの原因を見失う。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf X=[(1,0)^{\mathsf T},(1,1)^{\mathsf T}]$ なら $\mathbf G=\begin{bmatrix}1&1\\1&2\end{bmatrix}$。対角は各列の二乗norm、非対角は列間の重なりである。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Gram matrix` の中心式 `$\mathbf G=\mathbf X^{\mathsf T}\mathbf X,\qquad G_{ij}=\mathbf x_i^{\mathsf T}\mathbf x_j` を、記号表なしで再定義できるか。
- `積の(i,j)成分を展開すると $(\mathbf X^{\mathsf T}\mathbf X)_{ij}=\sum_{k=1}^m X_{ki}X_{kj}$ となる。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf X=[(1,0)^{\mathsf T},(1,1)^{\mathsf T}]$ なら $\mathbf G=\begin{bmatrix}1&1\\1&2\end{bmatrix}$。対角は各列の二乗norm、非対角は列間の重なりである。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `列がほぼ平行だとGram行列は悪条件化する。逆行列の大きさだけを見て、元の列幾何を確認しないとcollinearityの原因を見失う。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``G = X.T @ X` を作り、`eigvalsh(G)` と `svd(X)` の二乗特異値が一致するかを確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-gram-matrix)
