# attention機構：教科書

Course 09｜深層学習

## このTopicの中心問題

scaled dot-product attentionの1/√d_kはなぜ必要で、Q/K/Vは何を計算しているか。

## まず直感

queryとkeyの内積で「どのvalueをどれだけ参照するか」のscoreを作る。dimensionが増えると未scale内積の分散が大きくなりsoftmaxが飽和しやすいため1/√d_kでscaleする。

## 図で固定する

<img src="/visuals/course-09/dl-attention-mechanism.png" alt="attention機構の図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $Q∈R^{n_q×d_k}$ | query |
| $K∈R^{n_k×d_k}$ | key |
| $V∈R^{n_k×d_v}$ | value |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathrm{Attn}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

## なぜこの式になるのか

1. 各q_iとk_jの内積でscore matrix S=QK^Tを作る。
2. 成分が独立・分散1程度ならdot productの分散はd_k程度なので√d_kで割りvarianceをO(1)にする。
3. 各query rowでsoftmaxし、keyごとの非負weight和1を作る。
4. そのweightでVのrowを加重平均する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

1 query・2 keyでscaled scoreが[0, ln3]ならsoftmax weightは[1/4,3/4]。outputは0.25v1+0.75v2。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- softmaxのaxisを取り違えない。
- QK^TをVそのものと混同しない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Attention Is All You Need arXiv:1706.03762

[演習へ](/exercises/dl-attention-mechanism)　|　[スライドへ](/slides/dl-attention-mechanism/)
