---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "直交射影"
---

# 直交射影

Course 02｜線形代数

---
layout: center
---

## 今回の問い

直交射影で、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- 直交射影の定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

直交射影は、ある部分空間の中で元の点に最も近い点を選ぶ操作。

**前提:** la-span-subspaces, la-inner-products-norms-angles, la-orthogonal-orthonormal-bases

---

## 図解

<img src="./assets/course-02/orthogonal-projection.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 軸・node・矢印・領域が何を表すか確認する
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
\mathbf{P}=\mathbf{Q}\mathbf{Q}^{\mathsf T}
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** 直交射影
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

点から直線へ垂線を下ろし、射影成分と残差が直交することを見る。

最小の非自明な設定で、手計算と実装を照合する。

---

## 動き／思考実験で確認

<img src="./assets/course-02/orthogonal-projection.gif" style="max-height: 310px; display:block; margin:0 auto;" />

- 各frameで、何が固定され何が更新されるかを追う。

---

## 成立条件

- 射影先の基底が正規直交かどうかで式が変わる。
- 残差は射影先の部分空間に直交する。
- 直交射影の定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- 直交射影の定義と計算手順を同一視する
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

直交射影は、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- 直交射影を図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/orthogonal-projection)

[10問の演習](../../exercises/orthogonal-projection)
