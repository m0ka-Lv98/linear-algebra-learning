---
theme: default
layout: cover
title: NumPy配列・shape・indexing
---

# NumPy配列・shape・indexing

Course 00｜学習準備

---
layout: center
---

## 今回の問い

NumPy配列の軸、shape、indexing、reshape、reduction、行列積を数学的対象と対応付ける。

---

## 到達目標

- ndim、shape、size、dtypeを区別できる
- indexingとslicingの結果shapeを予測できる
- reshape、transpose、reductionでどの軸が変化するか説明できる

---

## NumPy配列は「値＋shape＋dtype」

NumPy配列を読むときは値だけでなく、`shape` と `dtype` を同時に確認する。

`np.array([1,2,3])` と `np.array([[1,2,3]])` は同じ3値を含むが、前者はshape `(3,)`、後者は `(1,3)`。演算の意味やbroadcasting、行列積の結果が変わるため、要素数だけで同一視しない。

---

## ndim・shape・size

`ndim` は軸の数、`shape` は各軸の長さ、`size` は全要素数である。

shape `(2,3,4)` なら `ndim=3`、`size=24`。数学のベクトル空間 $\mathbb{R}^{24}$ の「次元24」とNumPy配列の`ndim=3`は異なる概念である。

---

## dtype

`dtype` は各要素の表現形式を示す。

整数配列と浮動小数点配列では除算、overflow、メモリ量などが変わる。機械学習では `float32` と `float64` の精度・速度・メモリのtrade-offがある。

---

## indexing

Python同様0始まりで、`A[i,j]` は第0軸のindex `i`、第1軸のindex `j` を指定する。

数学の $a_{ij}$ が1始まりならコードでは `A[i-1,j-1]` に対応する。負indexは末尾から数えるため便利だが、数式との対応では明示的なindexを使う方が分かりやすい。

---

## slicingとshape

`A[:,1]` は全行から第2列を取り、2次元行列から1次元配列になる場合が多い。

一方 `A[:,1:2]` は長さ1の第1軸を保持し2次元のまま。値が同じでもshapeが異なるので、後続の行列積で挙動が変わる。

---

## reshape

`reshape` は要素数を保ったままshapeを変更する。

ただし軸の意味を自動で理解するわけではない。例えば12値を `(3,4)` にできても、どの軸がsampleでどの軸がfeatureかはユーザーが管理する。

---

## transpose

2次元配列 `A.T` は行と列を交換する。

高次元配列では単純な `.T` が全軸を逆順にするため、特定軸だけを並べ替えたい場合は `transpose` の軸指定を考える。1次元配列の `.T` はshapeを変えないので、列ベクトルが必要なら `x.reshape(-1,1)` などで2次元化する。

---

## 要素ごとの演算とbroadcasting

同shape配列の `A * B` は要素ごとの積である。

NumPyはshapeが異なっても一定規則でbroadcastingできるが、意図しない軸へ拡張されると静かに誤った結果を生むことがある。Course 00ではbroadcastingの詳細規則より、「演算前後のshapeを予測して確認する」ことを重視する。

---

## 基本式

`shape`=各軸の長さ

`ndim`=軸数

`A * B`=要素積

---

## よくある誤解

- `(3,)`、`(3,1)`、`(1,3)`は同じshapeである
- `axis=0`は常に「縦」とだけ覚えればよい
- `reshape`すれば軸の意味も自動的に正しく変換される

---

## 理解確認

1. ndim、shape、size、dtypeを区別できる
2. 代表式の記号と条件を説明できるか。
3. 誤解を反例で否定できるか。

---

## 演習へ

[教科書](../../textbook/prep-numpy-arrays-shapes)

[10問の演習](../../exercises/prep-numpy-arrays-shapes)
