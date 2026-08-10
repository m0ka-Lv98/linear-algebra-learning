# 経験リスク・期待リスク・汎化：教科書

Course 08｜機械学習

## このTopicで解く問題

training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。

## なぜこの概念が必要か

学習で直接最小化できるのは有限標本の経験リスク。目的は母集団分布に対する期待リスクなので、両者のgapを理解するのがgeneralization。

## 図の各要素は何を表しているか

<img src="/visuals/course-08/ml-empirical-risk-generalization.png" alt="経験リスク・期待リスク・汎化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がmodel complexity、縦軸がrisk。training riskは複雑化とともに下がる一方、validation riskは途中で最小になって再び上がるU字型。training dataへの適合と未知分布での予測性能が同じ量ではないことを示す。

## 記号・型・定義域

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

## 中心となる式

$$
R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)
$$

## 中心式を前提から導く

1. 目標量Rは未知分布Dの期待値なので直接計算できない。
2. iid標本で期待値を標本平均R̂へ置き換える。
3. 同じデータでmodel選択まで行うと適応によるoptimismが生じるためvalidation/test分離が必要。

## なぜその変形をしてよいのか

本当に最小化したいexpected riskは未知分布 $D$ 上の期待値なので観測できない。iid sample $S={(x_i,y_i)}$ から empirical risk $\hat R_S$ を作り、law of large numbersにより固定fについてRへ近づく。

しかし学習algorithmは同じSを見てf自体を選ぶので、「固定fの収束」だけではgeneralizationを保証しない。hypothesis classの複雑さやregularization、独立validation/testが必要になる。test setを何度も見てmodel選択するとtestにも適応してしまう。

## population riskとempirical riskを分ける

未知のデータ分布を $P(X,Y)$、lossを $\ell(f_\theta(X),Y)$ とすると、本当に小さくしたいのはpopulation risk

$$
R(\theta)=E_{(X,Y)\sim P}[\ell(f_\theta(X),Y)]
$$

だが、$P$ 自体は分からない。そこでtraining sample $(x_i,y_i)_{i=1}^n$ で

$$
\hat R_n(\theta)=\frac1n\sum_{i=1}^n\ell(f_\theta(x_i),y_i)
$$

を最小化する。training errorを下げることは $\hat R_n$ を下げることであり、$R$ を直接下げているわけではない。

## generalization gapを見る理由

$$
R(\hat\theta)-\hat R_n(\hat\theta)
$$

がgeneralization gap。model classが柔軟すぎるとsample固有のnoiseまで合わせてempirical riskだけを小さくできる。validation setをoptimizationに使い続けると、そのvalidation setにも適応してしまうため、最終評価用test setを分離する。

単純な有限hypothesis class $\mathcal H$ ではHoeffding inequalityとunion boundから、概略 $\sqrt{\log|\mathcal H|/n}$ のスケールで一様generalization errorが減る。model complexityとsample sizeのtrade-offが数式にも現れる。

## 例題1：具体的な数値・構造で解く

**問題**：squared lossでtraining sampleの誤差が [1,0,2,1] のときempirical riskを求める。また独立testで [2,3] ならtest riskも求めよ。

**解答**：training empirical riskは $(1+0+2+1)/4=1$。test riskは $(2+3)/2=2.5$。training上の1だけで未知分布riskが1と断定できない。

## 例題2：別の条件で確認する

2点 $(0,0),(1,1)$ だけなら高次数多項式でtraining error 0の関数を無数に作れる。未知点x=0.5での予測は大きく異なり、training error 0だけではmodelを決められない。

## 結果の検算

training riskとvalidation riskを同じ標本で計算しない。まずtraining集合だけで

$$
\hat R_{\mathrm{train}}=\frac1n\sum_i\ell(f(x_i),y_i)
$$

を求め、独立なvalidation集合で同じlossの平均を別に計算する。model complexityを上げてtraining riskだけ下がりvalidation riskが上がるなら、generalization改善ではなくoverfittingの可能性が高い。

## 条件を外すと何が壊れるか

validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。最終評価には独立testまたはnested CVが必要。

## よくある誤り

- test setをhyperparameter tuningに使わない。
- training lossが低いだけで汎化を保証しない。

## 次のTopic・応用への接続

bias–variance、regularization、cross-validation、learning theoryへつながる。後のRLでもtraining returnとdeployment performanceの分布差を同様に考える。

## 参考

- Stanford CS229 learning theory

[演習へ](/exercises/ml-empirical-risk-generalization)　|　[スライドへ](/slides/ml-empirical-risk-generalization/)
