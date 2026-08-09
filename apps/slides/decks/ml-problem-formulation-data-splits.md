---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "機械学習問題の定式化とdata split"
---

# 機械学習問題の定式化とdata split

Course 08｜機械学習

---
layout: center
---

## 今回の問い

機械学習問題の定式化とdata splitで、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- 機械学習問題の定式化とdata splitの定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

data splitは学習・選択・最終評価の役割を分離し、同じデータを見て性能を過大評価するのを防ぐ。

**前提:** stat-estimators-bias-variance-mse, opt-problem-formulation-objectives-constraints

---

## 図解

<img src="./assets/course-08/ml-problem-formulation-data-splits.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 軸・node・矢印・領域が何を表すか確認する
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
\mathcal{D}=\mathcal{D}_{\mathrm{train}}\cup\mathcal{D}_{\mathrm{val}}\cup\mathcal{D}_{\mathrm{test}}
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** 機械学習問題の定式化、data、split
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

データ列をtrain/validation/testへ分割し、情報の流れを矢印で示す。

最小の非自明な設定で、手計算と実装を照合する。

---

## 動き／思考実験で確認

- このTopicでは静止図を中心に条件を1つずつ変える思考実験を行う。
- 図の形がどう変わるか予測してから次へ進む。

---

## 成立条件

- test setをmodel selectionに使わない。
- 時系列ではランダム分割が不適切な場合がある。
- 機械学習問題の定式化とdata splitの定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- 機械学習問題の定式化とdata splitの定義と計算手順を同一視する
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

機械学習問題の定式化とdata splitは、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- 機械学習問題の定式化とdata splitを図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/ml-problem-formulation-data-splits)

[10問の演習](../../exercises/ml-problem-formulation-data-splits)
