# pretraining data：dedup・mixture・contamination：教科書

Course 10｜Frontier

## このTopicの中心問題

同じtoken数でも、重複・domain mixture・benchmark contaminationで学習結果がなぜ変わるか。

## まず直感

training dataは単なる量ではなく分布。重複は特定sampleを過度に重み付けし、mixture weightは能力配分を変え、evaluation setの混入は測定を汚染する。

## 図で固定する

<img src="/visuals/course-10/frontier-data-dedup-mixtures-contamination.png" alt="pretraining data：dedup・mixture・contaminationの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $D_k$ | domain kのdata distribution |
| $w_k$ | mixture weight |
| $D_train$ | 混合training distribution |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
D_{train}=\sum_k w_kD_k,\quad w_k\ge0,\;\sum_kw_k=1
$$

## なぜこの式になるのか

1. 各sourceをdomain distributionとしてみなす。
2. sampling weight w_kが期待gradientへの寄与を決める。
3. dedup/filteringはeffective distributionそのものを変えるため、token countだけで比較できない。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

code data weightを増やせばcoding能力向上を狙えるが、他domain performanceやlanguage coverageとのtrade-offがあり得る。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- benchmark score上昇をcontamination無しで確認する。
- dedup閾値・normalization手順を記録する。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- Stanford CS336 data processing topics

[演習へ](/exercises/frontier-data-dedup-mixtures-contamination)　|　[スライドへ](/slides/frontier-data-dedup-mixtures-contamination/)
