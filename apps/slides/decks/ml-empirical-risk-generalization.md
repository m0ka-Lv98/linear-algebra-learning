---
theme: default
routerMode: hash
layout: cover
title: "経験リスク・期待リスク・汎化"
generatedBy: course01-10-curated-upgrade-v2
---

# 経験リスク・期待リスク・汎化

Course 08｜機械学習

---

## 何を解決するか

training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。

学習で直接最小化できるのは有限標本の経験リスク。目的は母集団分布に対する期待リスクなので、両者のgapを理解するのがgeneralization。

---

## 図の意味

<img src="./assets/course-08/ml-empirical-risk-generalization.png" style="max-height: 350px; display:block; margin:0 auto;" />

横軸がmodel complexity、縦軸がrisk。training riskは複雑化とともに下がる一方、validation riskは途中で最小になって再び上がるU字型。training dataへの適合と未知分布での予測性能が同じ量ではないことを示す。

---

## 記号

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

---

## 中心式

$$
R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)
$$

---

## 導出

1. 目標量Rは未知分布Dの期待値なので直接計算できない。
2. iid標本で期待値を標本平均R̂へ置き換える。
3. 同じデータでmodel選択まで行うと適応によるoptimismが生じるためvalidation/test分離が必要。

---

## 省略しない一段

本当に最小化したいexpected riskは未知分布 $D$ 上の期待値なので観測できない。iid sample $S={(x_i,y_i)}$ から empirical risk $\hat R_S$ を作り、law of large numbersにより固定fについてRへ近づく。

しかし学習algorithmは同じSを見てf自体を選ぶので、「固定fの収束」だけではgeneralizationを保証しない。hypothesis classの複雑さやregularization、独立validation/testが必要になる。test setを何度も見てmodel選択するとtestにも適応してしまう。

---

## 手計算

**問題**：squared lossでtraining sampleの誤差が [1,0,2,1] のときempirical riskを求める。また独立testで [2,3] ならtest riskも求めよ。

**解答**：training empirical riskは $(1+0+2+1)/4=1$。test riskは $(2+3)/2=2.5$。training上の1だけで未知分布riskが1と断定できない。

---

## 条件を変える

2点 $(0,0),(1,1)$ だけなら高次数多項式でtraining error 0の関数を無数に作れる。未知点x=0.5での予測は大きく異なり、training error 0だけではmodelを決められない。

---

## どこで壊れるか

validation setでhyperparameterを選んだ後、その同じvalidation scoreを「完全に未使用データでの性能」と報告しない。最終評価には独立testまたはnested CVが必要。

---

## 次へ

bias–variance、regularization、cross-validation、learning theoryへつながる。後のRLでもtraining returnとdeployment performanceの分布差を同様に考える。

---

[教科書](../../textbook/ml-empirical-risk-generalization)　|　[10問の演習](../../exercises/ml-empirical-risk-generalization)

---

## 今回の問い

「経験リスク・期待リスク・汎化」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。
- 中心式の記号と成立条件を説明できる
- 小さい例と反例で検算できる

---

## 理解確認

1. training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。
2. 中心式の記号と成立条件を説明できる
3. 小さい例と反例で検算できる
