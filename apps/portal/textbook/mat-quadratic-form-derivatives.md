# Quadratic form derivatives

**分野:** 行列・ベクトル微分
**Prerequisites:** `mat-scalar-by-vector-derivative`, `la-quadratic-forms-positive-definite`

## 1. このTopicで解く問い

二次形式のgradient/Hessianを、対称性を意識してどう導くか。

Quadratic form derivativesは『何を保存し、何を変換するか』を分離すると理解しやすい。中心式の左辺を観測量、右辺を構成操作として読み、各因子の役割を一つずつ確認する。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\mathbf x$ | vector variable | n |
| $\mathbf A$ | fixed matrix | n\times n |
| $f$ | quadratic form | 1 |

## 3. 中心となる定義・式

$$
f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x
$$

Quadratic form derivativesでは、局所線形化・内積・行列積のどこに微分対象が入るかを追う。$\mathbf x$ は vector variable（n）、$\mathbf A$ は fixed matrix（n\times n）、$f$ は quadratic form（1）。特に行列積は一般に可換でないため、中心式 `f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` の積順序を保持したままdifferentialまたはJacobianへ落とすことが重要である。転置を1つ動かしただけでshapeが変わるので、式変形ごとに入力次元と出力次元を再確認する。

中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Quadratic form derivativesではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. $df=(d\mathbf x)^{\mathsf T}\mathbf A\mathbf x+\mathbf x^{\mathsf T}\mathbf A d\mathbf x$。
2. 第一項はscalar転置して $\mathbf x^{\mathsf T}\mathbf A^{\mathsf T}d\mathbf x$ と書ける。
3. 係数をまとめると $df=[(\mathbf A+\mathbf A^{\mathsf T})\mathbf x]^{\mathsf T}d\mathbf x$。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

least squares、energy、Mahalanobis distance、Newton法の曲率解析に使う。

Quadratic form derivativesの中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` を、least squares、energy、Mahalanobis distance、Newton法の曲率解析に使う。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `非対称行列でも二次形式は対称部分だけを見る。機械的に $2\mathbf A\mathbf x$ とすると誤る。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\mathbf A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$、$\mathbf x=(1,2)^{\mathsf T}$ ならgradientは $(\mathbf A+\mathbf A^{\mathsf T})\mathbf x=(6,13)^{\mathsf T}$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Quadratic form derivativesの図](/visuals/engineering-math/mat-quadratic-form-derivatives.png)

Quadratic form derivativesの図では、中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` に現れる量のうち1つを変化させる。手計算例 `$\mathbf A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$、$\mathbf x=(1,2)^{\mathsf T}$ ならgradientは $(\mathbf A+\mathbf A^{\mathsf T})\mathbf x=(6,13)^{\mathsf T}$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

非対称行列でも二次形式は対称部分だけを見る。機械的に $2\mathbf A\mathbf x$ とすると誤る。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`(A+A.T)@x` とfinite-difference gradientを比較し、Aが非対称でも一致することを確認する。

Quadratic form derivativesの実装では、まず ``(A+A.T)@x` とfinite-difference gradientを比較し、Aが非対称でも一致することを確認する。` を実行する。そのうえで中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

least squares、energy、Mahalanobis distance、Newton法の曲率解析に使う。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `mat-scalar-by-vector-derivative`, `la-quadratic-forms-positive-definite`。これらは単なる履修順ではない。`Quadratic form derivatives` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `$df=(d\mathbf x)^{\mathsf T}\mathbf A\mathbf x+\mathbf x^{\mathsf T}\mathbf A d\mathbf x$。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` のどの項に使われているかを対応づける。

また、least squares、energy、Mahalanobis distance、Newton法の曲率解析に使う。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Quadratic form derivatives` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `非対称行列でも二次形式は対称部分だけを見る。機械的に $2\mathbf A\mathbf x$ とすると誤る。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\mathbf A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$、$\mathbf x=(1,2)^{\mathsf T}$ ならgradientは $(\mathbf A+\mathbf A^{\mathsf T})\mathbf x=(6,13)^{\mathsf T}$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Quadratic form derivatives` の中心式 `$f(\mathbf x)=\mathbf x^{\mathsf T}\mathbf A\mathbf x,\quad \nabla f=(\mathbf A+\mathbf A^{\mathsf T})\mathbf x` を、記号表なしで再定義できるか。
- `$df=(d\mathbf x)^{\mathsf T}\mathbf A\mathbf x+\mathbf x^{\mathsf T}\mathbf A d\mathbf x$。` から始めて、導出を途中式付きで再構成できるか。
- `$\mathbf A=\begin{bmatrix}2&1\\0&3\end{bmatrix}$、$\mathbf x=(1,2)^{\mathsf T}$ ならgradientは $(\mathbf A+\mathbf A^{\mathsf T})\mathbf x=(6,13)^{\mathsf T}$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `非対称行列でも二次形式は対称部分だけを見る。機械的に $2\mathbf A\mathbf x$ とすると誤る。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``(A+A.T)@x` とfinite-difference gradientを比較し、Aが非対称でも一致することを確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/mat-quadratic-form-derivatives)
