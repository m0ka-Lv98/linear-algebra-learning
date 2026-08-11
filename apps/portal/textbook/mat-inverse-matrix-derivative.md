# Inverse matrix derivative

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-matrix-differential`, `la-invertibility-inverse-matrices`

## 1. このTopicで解く問い

逆行列の微分を、成分暗記なしで恒等式からどう導くか。

Inverse matrix derivativeを工学で使うときは、理想式の成立条件と測定系の近似条件を分ける必要がある。理想式が正しくても、noise modelやsampling条件が違えば推定解釈は変わる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf A$ | invertible matrix | n\times n |
| $\mathbf A^{-1}$ | inverse | n\times n |

## 3. 中心となる定義・式

$$
d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}
$$

Inverse matrix derivativeでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf A$ は invertible matrix（n\times n）、$\mathbf A^{-1}$ は inverse（n\times n）。特に行列積は一般に可換でないため、中心式 `d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Inverse matrix derivativeではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. 恒等式 $\mathbf A\mathbf A^{-1}=\mathbf I$ を微分する。
2. product ruleで $(d\mathbf A)\mathbf A^{-1}+\mathbf A d(\mathbf A^{-1})=0$。
3. 左から $\mathbf A^{-1}$ を掛けて目的式を得る。順序は可換ではないので保存する。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

Kalman filter、covariance inverse、implicit differentiation、GLSの感度解析に現れる。

Inverse matrix derivativeの中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` を、Kalman filter、covariance inverse、implicit differentiation、GLSの感度解析に現れる。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `singularまたはほぼsingularな点では逆行列自体が存在しない、または感度が爆発する。condition numberと同時に見る。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf A(t)=\operatorname{diag}(t,2)$ なら $\mathbf A^{-1}=\operatorname{diag}(1/t,1/2)$。公式の(1,1)成分は $-dt/t^2$ となりscalar微分と一致する。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Inverse matrix derivativeの図](/visuals/engineering-math/mat-inverse-matrix-derivative.png)

Inverse matrix derivativeの図では、中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` に現れる量のうち1つを変化させる。手計算例 `$\mathbf A(t)=\operatorname{diag}(t,2)$ なら $\mathbf A^{-1}=\operatorname{diag}(1/t,1/2)$。公式の(1,1)成分は $-dt/t^2$ となりscalar微分と一致する。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

singularまたはほぼsingularな点では逆行列自体が存在しない、または感度が爆発する。condition numberと同時に見る。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`inv(A+hD)` の差分と `-inv(A)@D@inv(A)` を比較する。

Inverse matrix derivativeの実装では、まず ``inv(A+hD)` の差分と `-inv(A)@D@inv(A)` を比較する。` を実行する。そのうえで中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

Kalman filter、covariance inverse、implicit differentiation、GLSの感度解析に現れる。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-matrix-differential`, `la-invertibility-inverse-matrices`。これらは単なる履修順ではない。`Inverse matrix derivative` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `恒等式 $\mathbf A\mathbf A^{-1}=\mathbf I$ を微分する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` のどの項に使われているかを対応づける。

また、Kalman filter、covariance inverse、implicit differentiation、GLSの感度解析に現れる。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Inverse matrix derivative` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `singularまたはほぼsingularな点では逆行列自体が存在しない、または感度が爆発する。condition numberと同時に見る。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf A(t)=\operatorname{diag}(t,2)$ なら $\mathbf A^{-1}=\operatorname{diag}(1/t,1/2)$。公式の(1,1)成分は $-dt/t^2$ となりscalar微分と一致する。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Inverse matrix derivative` の中心式 `$d(\mathbf A^{-1})=-\mathbf A^{-1}(d\mathbf A)\mathbf A^{-1}` を、記号表なしで再定義できるか。
- `恒等式 $\mathbf A\mathbf A^{-1}=\mathbf I$ を微分する。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf A(t)=\operatorname{diag}(t,2)$ なら $\mathbf A^{-1}=\operatorname{diag}(1/t,1/2)$。公式の(1,1)成分は $-dt/t^2$ となりscalar微分と一致する。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `singularまたはほぼsingularな点では逆行列自体が存在しない、または感度が爆発する。condition numberと同時に見る。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``inv(A+hD)` の差分と `-inv(A)@D@inv(A)` を比較する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-inverse-matrix-derivative)
