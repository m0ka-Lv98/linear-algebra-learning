---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "splineと区分的近似"
---

# splineと区分的近似

Course 05｜数値計算

---
layout: center
---

## 今回の問い

splineと区分的近似で、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- splineと区分的近似の定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

補間は与えられた点を通る近似関数を構成し、区間内の値を推定する。

**前提:** num-polynomial-interpolation, calc-derivatives-rates

---

## 図解

<img src="./assets/course-05/num-splines-piecewise-approximation.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 軸・node・矢印・領域が何を表すか確認する
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
s_i(x)=a_i+b_i(x-x_i)+c_i(x-x_i)^2+d_i(x-x_i)^3
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** spline、区分的近似
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

同じ点に高次多項式と区分的splineを当て、振動の違いを見る。

最小の非自明な設定で、手計算と実装を照合する。

---

## 動き／思考実験で確認

- このTopicでは静止図を中心に条件を1つずつ変える思考実験を行う。
- 図の形がどう変わるか予測してから次へ進む。

---

## 成立条件

- 補間と回帰を混同しない。
- 高次多項式は端で振動しやすい。
- splineと区分的近似の定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- splineと区分的近似の定義と計算手順を同一視する
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

splineと区分的近似は、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- splineと区分的近似を図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/num-splines-piecewise-approximation)

[10問の演習](../../exercises/num-splines-piecewise-approximation)
