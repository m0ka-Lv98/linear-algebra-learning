# 推論RLとverifiable reward：教科書

Course 10｜Frontier

## このTopicの中心問題

数学・codingのように答えを自動検証できる課題では、preference modelを介さずどのようにRL信号を作れるか。

## まず直感

verifiable taskでは最終答案の正誤、unit test、formal checkerなどをrewardとして使える。人間preferenceより低コストで大量sampleを評価できる一方、reward仕様の範囲外の品質は保証しない。

## 図で固定する

<img src="/visuals/course-10/frontier-reasoning-rl-rlvr.png" alt="推論RLとverifiable rewardの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $r(x,y)$ | 検証器からのreward |
| $G$ | group/rollout集合 |
| $A_i$ | 各sampleのadvantage相当量 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\max_\theta\;E_{y\sim\pi_\theta(\cdot|x)}[r(x,y)]\quad\text{with policy regularization}
$$

## なぜこの式になるのか

1. promptから複数rolloutをsampleする。
2. verifierで各responseへrewardを付ける。
3. relative/normalized rewardをpolicy gradient estimatorへ入れ、policy collapseを防ぐregularizationと併用する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

数学問題でfinal answerをsymbolic checkerで検証し、正解rolloutの確率を上げる。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- verifierが測らないreadabilityやsafetyは自動的に改善しない。
- reward hackingとdata leakageを監視する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- DeepSeek-R1 arXiv:2501.12948

[演習へ](/exercises/frontier-reasoning-rl-rlvr)　|　[スライドへ](/slides/frontier-reasoning-rl-rlvr/)
