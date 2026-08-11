# Gaussian mixture modelの分布

**分野:** 確率分布
**Prerequisites:** `prob-gaussian-distribution`

## 1. このTopicで解く問い

単一Gaussianでは表せない多峰性を、潜在componentの混合でどう表現するか。

Gaussian mixture modelの分布では、式を最終結果として記憶するより、入力の型→局所変化→線形化された出力という順序で読むと、関連公式を自力で復元しやすい。

## 2. 記号・型・shape

このTopicでは以下の記号を使う。ベクトルは太字小文字、行列は太字大文字で表す。

| 記号 | 意味 | shape/範囲 |
|---|---|---|
| $K$ | number of components | integer |
| $\pi_k$ | mixing weights | nonnegative |
| $\boldsymbol\mu_k$ | component mean | d |
| $\mathbf\Sigma_k$ | component covariance | d\times d |

## 3. 中心となる定義・式

$$
p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1
$$

Gaussian mixture modelの分布はsupport・normalization・momentの3点を同時に確認すると理解しやすい。$K$ は number of components（integer）、$\pi_k$ は mixing weights（nonnegative）、$\boldsymbol\mu_k$ は component mean（d）、$\mathbf\Sigma_k$ は component covariance（d\times d）。中心式 `p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` が非負で全support上の総和/積分が1になること、期待値やvarianceがsample simulationと一致することを別々に確認する。分布名だけを覚えず、どの生成機構がこの形を生むかまで結び付ける。

中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` は、左辺と右辺の型が一致することを確認したうえで、各記号を上の表へ戻して読む。Gaussian mixture modelの分布ではこのshape audit自体が導出の一部であり、計算後の形式確認ではない。

## 4. 導出

1. latent variable $Z\sim\mathrm{Categorical}(\boldsymbol\pi)$ を導入する。
2. $Z=k$ の条件下で $\mathbf X$ はcomponent Gaussianに従う。
3. $Z$ を周辺化するとweighted sum densityになる。

以上の導出では、各変形がどの定義・線形性・極限・確率法則に依存しているかを明示した。途中式を飛ばさず再構成できれば、記号規約が変わっても同じ数学を追える。

## 5. 数学的な意味

cell population、clustering、heterogeneous measurement distributionのモデル化。

Gaussian mixture modelの分布の中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` を、cell population、clustering、heterogeneous measurement distributionのモデル化。 という用途へ戻して読む。ここで数値が大きい/小さいという事実だけでなく、どの入力方向・parameter・frequency成分がその変化を作ったかを説明する。さらに `component labelはpermutationに対して非識別で、局所解やcovariance collapseも起こる。Kを増やせば必ず良いわけではない。` という失敗条件と対比すると、式から何を結論してよいかの境界が明確になる。

## 6. 手計算できる小さな例

1Dでweights=(0.4,0.6)、means=(-2,2)、sigma=1ならdensityは二峰性になる。全体meanは $0.4(-2)+0.6(2)=0.4$。

この例では、最終数値だけでなく、入力→式への代入→中間量→出力の順に追う。実装結果も同じ中間量を表示するとdebugしやすい。

## 7. 図で確認する

![Gaussian mixture modelの分布の図](/visuals/engineering-math/prob-gaussian-mixture.png)

Gaussian mixture modelの分布の図では、中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` に現れる量のうち1つを変化させる。手計算例 `1Dでweights=(0.4,0.6)、means=(-2,2)、sigma=1ならdensityは二峰性になる。全体meanは $0.4(-2)+0.6(2)=0.4$。` と同じ向きの変化になるかを確認し、異なるならnormalization・軸単位・parameter設定を疑う。図は導出を置き換えるものではなく、導出した関係が具体的なshapeやcurveへどう現れるかを検算する。

## 8. 成立条件と失敗例

component labelはpermutationに対して非識別で、局所解やcovariance collapseも起こる。Kを増やせば必ず良いわけではない。

ここは試験でも実務でも重要である。公式が成立する条件を1つ外したときに何が壊れるかまで説明できれば、暗記ではなく適用判断ができている。

## 9. 数値実装と検算

EMでlog-likelihoodが非減少かを追跡し、複数initializationで解の安定性を確認する。

Gaussian mixture modelの分布の実装では、まず `EMでlog-likelihoodが非減少かを追跡し、複数initializationで解の安定性を確認する。` を実行する。そのうえで中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` の左辺と右辺を別経路で計算し、差または残差を保存する。確率simulationならsample sizeとseed、signalならsample rate/window、行列計算ならcondition numberとshapeを記録し、理論式との不一致がmodel由来か実装由来かを分離する。

## 10. 工学への接続

cell population、clustering、heterogeneous measurement distributionのモデル化。

このTopicは単独で完結する公式ではなく、前提Topicから受け取った構造を次の推定・信号処理・最適化へ渡す中間nodeとして使う。

## 11. 前提知識からこの式までの接続

Prerequisites は `prob-gaussian-distribution`。これらは単なる履修順ではない。`Gaussian mixture modelの分布` の導出では、最初の前提が記号・演算の定義を供給し、後続の前提が `latent variable $Z\sim\mathrm{Categorical}(\boldsymbol\pi)$ を導入する。` を正当化する。前提Topicの公式をそのまま引用するのではなく、このTopicの中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` のどの項に使われているかを対応づける。

また、cell population、clustering、heterogeneous measurement distributionのモデル化。 へ進むときには、ここで得た量を入力・weight・sensitivity・spectrum・uncertaintyのどれとして渡すかを明示する。この接続を説明できれば、Topic間のDAGを暗記ではなく数学的依存として理解できている。

## 12. 追加の検算：scale・極限・反例

`Gaussian mixture modelの分布` の式を信頼する前に、既知の簡単なscaleまたは極限へ戻るかを確認する。中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` で1つのparameterだけを0、1、identity、十分大きい/小さい値へ動かし、結果が直感的な特殊ケースへ簡約するかを見る。これに加えて `component labelはpermutationに対して非識別で、局所解やcovariance collapseも起こる。Kを増やせば必ず良いわけではない。` を意図的に作り、数値値がどう壊れるか、あるいは式自体が未定義になるかを区別する。

この二段階の検算は、正しい数値が偶然出た実装を排除するためのものだ。手計算例 `1Dでweights=(0.4,0.6)、means=(-2,2)、sigma=1ならdensityは二峰性になる。全体meanは $0.4(-2)+0.6(2)=0.4$。`、極限、失敗例の3点が同じ中心式から説明できれば、大学試験での導出問題だけでなく、実データでの適用判断にも耐える。

## 13. 自力で再構成するためのチェック

- `Gaussian mixture modelの分布` の中心式 `$p(\mathbf x)=\sum_{k=1}^K\pi_k\,\mathcal N(\mathbf x\mid\boldsymbol\mu_k,\mathbf\Sigma_k),\quad \sum_k\pi_k=1` を、記号表なしで再定義できるか。
- `latent variable $Z\sim\mathrm{Categorical}(\boldsymbol\pi)$ を導入する。` から始めて、導出を途中式付きで再構成できるか。
- `1Dでweights=(0.4,0.6)、means=(-2,2)、sigma=1ならdensityは二峰性になる。全体meanは $0.4(-2)+0.6(2)=0.4$。` を紙で追い、少なくとも1つの中間量を検算できるか。
- `component labelはpermutationに対して非識別で、局所解やcovariance collapseも起こる。Kを増やせば必ず良いわけではない。` が起きたとき、どの前提が壊れたかを指摘できるか。
- `EMでlog-likelihoodが非減少かを追跡し、複数initializationで解の安定性を確認する。` を使い、解析式と数値結果を独立に照合できるか。

[10問の演習へ](/exercises/prob-gaussian-mixture)
