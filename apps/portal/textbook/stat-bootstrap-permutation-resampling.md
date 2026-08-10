# bootstrap・permutation・再標本化：教科書

Course 03｜確率統計

## このTopicの中心問題

解析的な標本分布が難しい統計量の不確実性を、データからどう近似するか。

## まず直感

bootstrapは観測された経験分布を「仮の母集団」として復元抽出し、統計量を何度も計算する。permutation testは帰無仮説下で交換可能なラベルを並べ替えて帰無分布を作る。

## 図で固定する

<img src="/visuals/course-03/stat-bootstrap-permutation-resampling.png" alt="bootstrap・permutation・再標本化の図解" style="max-height: 460px; display:block; margin:0 auto;" />

### 動きで確認する

<img src="/visuals/course-03/stat-bootstrap-permutation-resampling.gif" alt="stat-bootstrap-permutation-resampling animation" style="max-height: 420px; display:block; margin:0 auto;" />


図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $T(X)$ | 関心のある統計量 |
| $B$ | 再標本回数 |
| $T*$ | bootstrap標本での統計量 |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\widehat{SE}_{boot}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B(T_b^*-\bar T^*)^2}
$$

## なぜこの式になるのか

1. 経験分布 $\hat F_n$ を作る。
2. $\hat F_n$ からサイズnの標本を復元抽出する。
3. 各標本でT*を計算し、その分布を未知のsampling distributionの近似に使う。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

中央値の標準誤差は閉形式が扱いにくいことがある。bootstrapで中央値をB回計算し、その標準偏差をSEとして使う。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- 時系列やcluster dataをiid bootstrapしない。
- bootstrap回数を増やしても元標本のbiasが自動で消えるわけではない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- MIT 18.05 resampling concepts

[演習へ](/exercises/stat-bootstrap-permutation-resampling)　|　[スライドへ](/slides/stat-bootstrap-permutation-resampling/)
