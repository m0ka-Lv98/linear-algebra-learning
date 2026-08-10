# 経験リスク・期待リスク・汎化：演習

Course 08｜機械学習

[教科書](/textbook/ml-empirical-risk-generalization)

## 問題1

squared lossでtraining sampleの誤差が [1,0,2,1] のときempirical riskを求める。また独立testで [2,3] ならtest riskも求めよ。

<details><summary>完全解答</summary>

training empirical riskは $(1+0+2+1)/4=1$。test riskは $(2+3)/2=2.5$。training上の1だけで未知分布riskが1と断定できない。

</details>

## 問題2

「経験リスク・期待リスク・汎化」の導出を、最初の段階「1. 目標量Rは未知分布Dの期待値なので直接計算できない。」から始めて中心式まで再構成せよ。途中で「本当に最小化したいexpected riskは未知分布 $D$ 上の期待値なので観測できない。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 目標量Rは未知分布Dの期待値なので直接計算できない。
2. iid標本で期待値を標本平均R̂へ置き換える。
3. 同じデータでmodel選択まで行うと適応によるoptimismが生じるためvalidation/test分離が必要。

本当に最小化したいexpected riskは未知分布 $D$ 上の期待値なので観測できない。iid sample $S={(x_i,y_i)}$ から empirical risk $\hat R_S$ を作り、law of large numbersにより固定fについてRへ近づく。

しかし学習algorithmは同じSを見てf自体を選ぶので、「固定fの収束」だけではgeneralizationを保証しない。hypothesis classの複雑さやregularization、独立validation/testが必要になる。test setを何度も見てmodel選択するとtestにも適応してしまう。

</details>

## 問題3

図 `/visuals/course-08/ml-empirical-risk-generalization.png` では「横軸がmodel complexity、縦軸がrisk。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-08/ml-empirical-risk-generalization.png" alt="経験リスク・期待リスク・汎化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がmodel complexity、縦軸がrisk。training riskは複雑化とともに下がる一方、validation riskは途中で最小になって再び上がるU字型。training dataへの適合と未知分布での予測性能が同じ量ではないことを示す。

</details>

## 問題4

「経験リスク・期待リスク・汎化」の第二例「2点 $(0,0),(1,1)$ だけなら高次数多項式でtraining error 0の関数を無数に作れる。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

2点 $(0,0),(1,1)$ だけなら高次数多項式でtraining error 0の関数を無数に作れる。未知点x=0.5での予測は大きく異なり、training error 0だけではmodelを決められない。

</details>

## 問題5

経験リスク・期待リスク・汎化で 期待リスク、経験リスク、loss、未知のdata distribution は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`ml-empirical-risk-generalization` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $R(f)$ | 期待リスク |
| $R̂_n(f)$ | 経験リスク |
| $ℓ$ | loss |
| $D$ | 未知のdata distribution |


- $D$：未知のdata-generating distribution。
- $f$：予測model。
- $\ell$：loss。
- $R(f)$：expected risk、$\hat R_n(f)$：empirical risk。

</details>

## 問題6

警告「validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。最終評価には独立testまたはnested CVが必要。

</details>

## 問題7

よくある誤り「test setをhyperparameter tuningに使わない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- test setをhyperparameter tuningに使わない。
- training lossが低いだけで汎化を保証しない。

validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。最終評価には独立testまたはnested CVが必要。

</details>

## 問題8

「経験リスク・期待リスク・汎化」の例題1を再計算し、その結果に対して次の検算を実行せよ：training riskとvalidation riskを同じ標本で計算しない。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

training empirical riskは $(1+0+2+1)/4=1$。test riskは $(2+3)/2=2.5$。training上の1だけで未知分布riskが1と断定できない。

検算：
training riskとvalidation riskを同じ標本で計算しない。まずtraining集合だけで

$$
\hat R_{\mathrm{train}}=\frac1n\sum_i\ell(f(x_i),y_i)
$$

を求め、独立なvalidation集合で同じlossの平均を別に計算する。model complexityを上げてtraining riskだけ下がりvalidation riskが上がるなら、generalization改善ではなくoverfittingの可能性が高い。

</details>

## 問題9

後続への接続「bias–variance、regularization、cross-validation、learning theoryへつながる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

bias–variance、regularization、cross-validation、learning theoryへつながる。後のRLでもtraining returnとdeployment performanceの分布差を同様に考える。

</details>

## 問題10

中心問題「training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $R(f)$ | 期待リスク |
| $R̂_n(f)$ | 経験リスク |
| $ℓ$ | loss |
| $D$ | 未知のdata distribution |


- $D$：未知のdata-generating distribution。
- $f$：予測model。
- $\ell$：loss。
- $R(f)$：expected risk、$\hat R_n(f)$：empirical risk。

中心式：
$$
R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)
$$

導出：
1. 目標量Rは未知分布Dの期待値なので直接計算できない。
2. iid標本で期待値を標本平均R̂へ置き換える。
3. 同じデータでmodel選択まで行うと適応によるoptimismが生じるためvalidation/test分離が必要。

根拠：
本当に最小化したいexpected riskは未知分布 $D$ 上の期待値なので観測できない。iid sample $S={(x_i,y_i)}$ から empirical risk $\hat R_S$ を作り、law of large numbersにより固定fについてRへ近づく。

しかし学習algorithmは同じSを見てf自体を選ぶので、「固定fの収束」だけではgeneralizationを保証しない。hypothesis classの複雑さやregularization、独立validation/testが必要になる。test setを何度も見てmodel選択するとtestにも適応してしまう。

具体例：
**問題**：squared lossでtraining sampleの誤差が [1,0,2,1] のときempirical riskを求める。また独立testで [2,3] ならtest riskも求めよ。

**解答**：training empirical riskは $(1+0+2+1)/4=1$。test riskは $(2+3)/2=2.5$。training上の1だけで未知分布riskが1と断定できない。

失敗条件：
validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。最終評価には独立testまたはnested CVが必要。

</details>
