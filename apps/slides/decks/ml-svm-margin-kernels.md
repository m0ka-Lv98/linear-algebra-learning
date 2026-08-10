---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "SVM・margin・kernel"
---

# SVM・margin・kernel

Course 08｜機械学習

---
layout: center
---

## 今回の問い

SVM・margin・kernelで、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- SVM・margin・kernelの定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

kernel法は高次元特徴写像を明示せず内積だけ計算し、非線形境界を線形問題として扱う。

**前提:** opt-inequality-constraints-kkt, la-inner-products-norms-angles

---

## 図解

<img src="./assets/course-08/ml-svm-margin-kernels.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 図の軸・点・矢印・領域を数式と対応づける
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
\min_{\mathbf{w},b}\frac12\|\mathbf{w}\|_2^2\quad\text{s.t. }y_i(\mathbf{w}^{\mathsf T}\mathbf{x}_i+b)\ge1
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** SVM、margin、kernel
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

元空間で非線形な点群が特徴空間で線形分離可能になる模式図を見る。

小さな例で、手計算と実装の結果を照合する。

---

## 動き／思考実験で確認

- 静止図で条件を一つずつ変えたときの変化を追う。
- 図の形がどう変わるか予測してから次へ進む。

---

## 成立条件

- kernel matrixの正定値性を確認する。
- scale parameterで境界の複雑さが変わる。
- SVM・margin・kernelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- SVM・margin・kernelの定義と計算手順を同一視する
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

SVM・margin・kernelは、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- SVM・margin・kernelを図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/ml-svm-margin-kernels)

[10問の演習](../../exercises/ml-svm-margin-kernels)
