---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "Fourier基底とDFT"
---

# Fourier基底とDFT

Course 07｜データ解析

---
layout: center
---

## 今回の問い

Fourier基底とDFTで、何を入力し、代表式がどの量を出力し、どの成立条件を外すと結果が壊れるのか。

---

## 到達目標

- Fourier基底とDFTの定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる

---

## 直感

Fourier表現は信号を周波数ごとの正弦波成分へ分解し、時間領域と周波数領域を往復する。

**前提:** prep-exponents-logarithms, la-orthogonal-orthonormal-bases

---

## 図解

<img src="./assets/course-07/mat-fourier-bases-dft.png" style="max-height: 330px; display:block; margin:0 auto;" />

---

## 図を見るポイント

- 図の軸・点・矢印・領域を数式と対応づける
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する

---

## 代表式

$$
X_k=\sum_{n=0}^{N-1}x_n e^{-2\pi i kn/N}
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。

---

## 式をどう読むか

- **対象:** Fourier基底、DFT
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する

---

## 小さな例

2つの周波数を足した信号とDFTスペクトルを並べる。

小さな例で、手計算と実装の結果を照合する。

---

## 動き／思考実験で確認

- 静止図で条件を一つずつ変えたときの変化を追う。
- 図の形がどう変わるか予測してから次へ進む。

---

## 成立条件

- sampling rateとNyquist周波数を確認する。
- 位相情報も信号再構成に必要。
- Fourier基底とDFTの定義と計算手順を区別し、数値例だけで一般性を判断しない。

---

## よくある誤解

- Fourier基底とDFTの定義と計算手順を同一視する
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

Fourier基底とDFTは、後続の数値計算・データ解析・機械学習で前提となる。

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。

---

## 理解確認

- Fourier基底とDFTを図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/mat-fourier-bases-dft)

[10問の演習](../../exercises/mat-fourier-bases-dft)
