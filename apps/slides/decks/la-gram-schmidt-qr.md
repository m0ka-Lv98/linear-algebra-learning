---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "Gram–Schmidt法とQR分解"
---

# Gram–Schmidt法とQR分解

Course 02｜線形代数

---
layout: center
---

## 今回の問い

Gram–Schmidt法とQR分解で、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- Gram–Schmidt法とQR分解の定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

直交基底では成分同士が干渉せず、座標抽出が内積だけでできる。

**前提:** la-orthogonal-orthonormal-bases, orthogonal-projection

---

## 図解

<img src="./assets/course-02/la-gram-schmidt-qr.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 図の軸・点・矢印・領域を数式と対応づける
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
\mathbf{A}=\mathbf{Q}\mathbf{R}
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** Gram–Schmidt法、QR分解
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

斜交基底と正規直交基底で射影の計算の簡潔さを比較する。

小さな例で、手計算と実装の結果を照合する。

---

## 動き／思考実験で確認

- 静止図で条件を一つずつ変えたときの変化を追う。
- 図の形がどう変わるか予測してから次へ進む。

---

## 成立条件

- 直交と正規直交を区別する。
- Q^TQ=Iは列が正規直交であることを表す。
- Gram–Schmidt法とQR分解の定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- Gram–Schmidt法とQR分解の定義と計算手順を同一視する
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

Gram–Schmidt法とQR分解は、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- Gram–Schmidt法とQR分解を図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/la-gram-schmidt-qr)

[10問の演習](../../exercises/la-gram-schmidt-qr)
