# RLHFとpreference optimization：教科書

Course 10｜Frontier

## このTopicの中心問題

KL正則化RLHFからreward–policy relationを導き、なぜDPOがpairwise logistic lossになるか。

## まず直感

DPOは「RLHFを使わない魔法のloss」ではなく、KL正則化された最適policyとrewardの閉形式関係をBradley–Terry preference modelへ代入して得る。

## 図で固定する

<img src="/visuals/course-10/frontier-rlhf-preference-optimization.png" alt="RLHFとpreference optimizationの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $π_θ$ | 学習policy |
| $π_ref$ | reference policy |
| $r(x,y)$ | 潜在reward |
| $β$ | KL regularization scale |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathcal L_{DPO}=-\log\sigma\left(\beta\left[\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right]\right)
$$

## なぜこの式になるのか

1. 固定prompt xで $\max_π E_{y∼π}[r(y)]-βD_{KL}(π||π_{ref})$ を、Σ_yπ(y)=1の制約付きでLagrangian化する。
2. π(y)で微分して0と置くと $r(y)-β(\log(π/π_{ref})+1)+λ=0$。
3. 正規化定数をZ(x)へ吸収して $π^*(y|x)=π_{ref}(y|x)\exp(r/β)/Z$。よって $r=β\log(π^*/π_{ref})+β\log Z$。
4. Bradley–Terryの $P(y_w\succ y_l)=σ(r_w-r_l)$ ではprompt共通のβlogZが差で消える。
5. π*を学習policyπθでparameterizeしてnegative log-likelihoodを取るとDPO loss。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

chosenのpolicy/reference log-ratioがrejectedより0.8大きくβ=0.5ならpreference logitは0.4で、lossは-log σ(0.4)。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- βのconventionは論文/実装で逆数的に見える場合があるので定義を確認する。
- preference dataのbiasやcoverage不足はobjective変換で消えない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- DPO arXiv:2305.18290
- InstructGPT arXiv:2203.02155

[演習へ](/exercises/frontier-rlhf-preference-optimization)　|　[スライドへ](/slides/frontier-rlhf-preference-optimization/)
