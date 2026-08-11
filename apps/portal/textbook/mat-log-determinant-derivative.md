# Log-determinant derivative

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-inverse-matrix-derivative`, `mat-matrix-differential`

## 1. このTopicで解く問い

positive definite matrixの体積・normalizationを表すlog-detのgradientをどう得るか。

Log-determinant derivativeの理解確認には、中心式を小さな数値例へ落とし、次に条件を一つだけ破った反例を見る方法が有効である。公式の適用範囲まで含めて理解できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf A$ | invertible matrix; SPDならlogが実数 | n\times n |
| $det\mathbf A$ | determinant | 1 |

## 3. 中心となる定義・式

$$
d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)
$$

Log-determinant derivativeでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf A$ は invertible matrix; SPDならlogが実数（n\times n）、$det\mathbf A$ は determinant（1）。特に行列積は一般に可換でないため、中心式 `d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Log-determinant derivativeではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. Jacobiの公式 $d\det\mathbf A=\det\mathbf A\,\operatorname{tr}(\mathbf A^{-1}d\mathbf A)$ を使う。
2. $d\log z=dz/z$ を $z=\det\mathbf A$ に適用する。
3. $\det\mathbf A$ が約分され、traceだけが残る。symmetric variableならgradientは $\mathbf A^{-\mathsf T}$。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

Gaussian likelihood、covariance estimation、optimal design、barrier methodの中心式になる。

Log-determinant derivativeの中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` を、Gaussian likelihood、covariance estimation、optimal design、barrier methodの中心式になる。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `determinantが非正の場合、実数のlog-detは定義できない。数値計算では`det`後にlogを取らず`slogdet`やCholeskyを使う。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf A=\operatorname{diag}(a,b)$ なら $\log\det\mathbf A=\log a+\log b$。微分は $da/a+db/b$ でtrace公式と一致する。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Log-determinant derivativeの図](/visuals/engineering-math/mat-log-determinant-derivative.png)

Log-determinant derivativeの図では、中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` に現れる量のうち1つを変化させる。手計算例 `$\mathbf A=\operatorname{diag}(a,b)$ なら $\log\det\mathbf A=\log a+\log b$。微分は $da/a+db/b$ でtrace公式と一致する。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

determinantが非正の場合、実数のlog-detは定義できない。数値計算では`det`後にlogを取らず`slogdet`やCholeskyを使う。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`np.linalg.slogdet(A)` のdirectional finite differenceと `trace(inv(A)@D)` を比較する。

Log-determinant derivativeの実装では、まず ``np.linalg.slogdet(A)` のdirectional finite differenceと `trace(inv(A)@D)` を比較する。` を実行する。そのうえで中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

Gaussian likelihood、covariance estimation、optimal design、barrier methodの中心式になる。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-inverse-matrix-derivative`, `mat-matrix-differential`。これらは単なる履修順ではない。`Log-determinant derivative` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `Jacobiの公式 $d\det\mathbf A=\det\mathbf A\,\operatorname{tr}(\mathbf A^{-1}d\mathbf A)$ を使う。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` のどの項に使われているかを対応づける。

また、Gaussian likelihood、covariance estimation、optimal design、barrier methodの中心式になる。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Log-determinant derivative` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `determinantが非正の場合、実数のlog-detは定義できない。数値計算では`det`後にlogを取らず`slogdet`やCholeskyを使う。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf A=\operatorname{diag}(a,b)$ なら $\log\det\mathbf A=\log a+\log b$。微分は $da/a+db/b$ でtrace公式と一致する。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Log-determinant derivative` の中心式 `$d\log\det\mathbf A=\operatorname{tr}(\mathbf A^{-1}d\mathbf A)` を、記号表なしで再定義できるか。
- `Jacobiの公式 $d\det\mathbf A=\det\mathbf A\,\operatorname{tr}(\mathbf A^{-1}d\mathbf A)$ を使う。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf A=\operatorname{diag}(a,b)$ なら $\log\det\mathbf A=\log a+\log b$。微分は $da/a+db/b$ でtrace公式と一致する。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `determinantが非正の場合、実数のlog-detは定義できない。数値計算では`det`後にlogを取らず`slogdet`やCholeskyを使う。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``np.linalg.slogdet(A)` のdirectional finite differenceと `trace(inv(A)@D)` を比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-log-determinant-derivative)
