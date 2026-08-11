# Dirichlet分布

**分野:** 確率分布
**Prerequisites:** `prob-multivariate-normal-distribution`, `prob-expectation-variance-moments`

## 1. このTopicで解く問い

成分が非負で総和1となる確率ベクトルの不確実性をどう表すか。

Dirichlet分布の理解確認には、中心式を小さな数値例へ落とし、次に条件を一つだけ破った反例を見る方法が有効である。公式の適用範囲まで含めて理解できる。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $\boldsymbol\pi$ | simplex-valued probability vector | K |
| $\alpha_k$ | concentration parameters | positive |
| $\alpha_0$ | sum of concentrations | scalar |

## 3. 中心となる定義・式

$$
p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}
$$

Dirichlet分布はsupport・normalization・momentの3点を同時に確認すると理解しやすい。$\boldsymbol\pi$ は simplex-valued probability vector（K）、$\alpha_k$ は concentration parameters（positive）、$\alpha_0$ は sum of concentrations（scalar）。中心式 `p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` が非負で全support上の総和/積分が1になること、期待値やvarianceがsample simulationと一致することを別々に確認する。分布名だけを覚えず、どの生成機構がこの形を生むかまで結び付ける。

中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Dirichlet分布ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. independent Gamma variables $G_k\sim\mathrm{Gamma}(\alpha_k,1)$ を考える。
2. $\pi_k=G_k/\sum_jG_j$ と正規化するとsimplex上へ移る。
3. 総concentration $\alpha_0$ が散らばり、比 $\alpha_k/\alpha_0$ が平均組成を決める。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

mixture weight、categorical probability、composition dataのBayesian prior。

Dirichlet分布の中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` を、mixture weight、categorical probability、composition dataのBayesian prior。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `成分間の独立を仮定してはいけない。総和1の制約により共分散は負になり、Euclidean Gaussianと幾何が違う。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

$\boldsymbol\alpha=(2,3,5)$ なら平均組成は $(0.2,0.3,0.5)$。全alphaを10倍すると平均は同じで分布が狭くなる。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Dirichlet分布の図](/visuals/engineering-math/prob-dirichlet-distribution.png)

Dirichlet分布の図では、中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` に現れる量のうち1つを変化させる。手計算例 `$\boldsymbol\alpha=(2,3,5)$ なら平均組成は $(0.2,0.3,0.5)$。全alphaを10倍すると平均は同じで分布が狭くなる。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

成分間の独立を仮定してはいけない。総和1の制約により共分散は負になり、Euclidean Gaussianと幾何が違う。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

`rng.dirichlet(alpha,N)` の行和が1、sample meanがalpha/alpha.sumに近いことを確認する。

Dirichlet分布の実装では、まず ``rng.dirichlet(alpha,N)` の行和が1、sample meanがalpha/alpha.sumに近いことを確認する。` を実行する。そのうえで中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

mixture weight、categorical probability、composition dataのBayesian prior。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `prob-multivariate-normal-distribution`, `prob-expectation-variance-moments`。これらは単なる履修順ではない。`Dirichlet分布` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `independent Gamma variables $G_k\sim\mathrm{Gamma}(\alpha_k,1)$ を考える。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` のどの項に使われているかを対応づける。

また、mixture weight、categorical probability、composition dataのBayesian prior。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Dirichlet分布` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `成分間の独立を仮定してはいけない。総和1の制約により共分散は負になり、Euclidean Gaussianと幾何が違う。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `$\boldsymbol\alpha=(2,3,5)$ なら平均組成は $(0.2,0.3,0.5)$。全alphaを10倍すると平均は同じで分布が狭くなる。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Dirichlet分布` の中心式 `$p(\boldsymbol\pi)\propto\prod_{k=1}^K\pi_k^{\alpha_k-1},\quad \pi_k\ge0,\ \sum_k\pi_k=1,\quad E[\pi_k]=\frac{\alpha_k}{\alpha_0}` を、記号表なしで再定義できるか。
- `independent Gamma variables $G_k\sim\mathrm{Gamma}(\alpha_k,1)$ を考える。` から始めて、導出を途中式付きで再構成できるか。
- `$\boldsymbol\alpha=(2,3,5)$ なら平均組成は $(0.2,0.3,0.5)$。全alphaを10倍すると平均は同じで分布が狭くなる。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `成分間の独立を仮定してはいけない。総和1の制約により共分散は負になり、Euclidean Gaussianと幾何が違う。` が起きたとき、どの前提が壊れたかを指摘できるか。
- ``rng.dirichlet(alpha,N)` の行和が1、sample meanがalpha/alpha.sumに近いことを確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/prob-dirichlet-distribution)
