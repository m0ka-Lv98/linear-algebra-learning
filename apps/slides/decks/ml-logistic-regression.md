---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "logistic回帰"
---

# logistic回帰

Course 08｜機械学習

---
layout: center
---

## 今回の問い

logistic回帰で、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- logistic回帰の定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

分類器は入力からクラス確率またはスコアを作り、決定境界でクラスを分ける。

**前提:** stat-likelihood-maximum-likelihood, opt-convex-sets-functions

---

## 図解

<img src="./assets/course-08/ml-logistic-regression.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## ml-logistic-regressionの図と式の読み方

- 軸・node・矢印・領域が何を表すか確認する
- このTopicの代表式の各項を、図中の対応する量と結び付ける
- このTopicのパラメータを一つ変えたときの変化を図の量で予測する

---

## 代表式

$$
p(y=1\mid\mathbf{x})=\sigma(\mathbf{x}^{\mathsf T}\mathbf{w}+b)
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** logistic回帰
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

2クラス点群と確率等高線、decision boundaryを描く。

小さな具体例で、手計算と実装を照合する。

---

## 動き／思考実験で確認

<img src="./assets/course-08/ml-logistic-regression.gif" style="max-height: 310px; display:block; margin:0 auto;" />

- 各frameで、何が固定され何が更新されるかを追う。

---

## 成立条件

- 確率出力とhard labelを区別する。
- 閾値は目的に応じて調整する。
- logistic回帰の定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- logistic回帰の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する
- 数学上の次元と配列のshapeを混同する

---

## 数値・実装で検算

1. 小さい入力を作る
2. 定義式から期待値を手で求める
3. NumPy等の実装結果と比較する
4. shape・残差・許容誤差・seedを記録する

---

## 後続分野への接続

logistic回帰は、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- logistic回帰を図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/ml-logistic-regression)

[10問の演習](../../exercises/ml-logistic-regression)
