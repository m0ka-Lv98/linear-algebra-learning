---
theme: default
routerMode: hash
layout: cover
title: quantization・sparsity・Mixture of Experts
---

# quantization・sparsity・Mixture of Experts

Course 10｜Frontier

---
layout: center
---

## 今回の問い

quantization・sparsity・Mixture of Expertsの定義、計算手順、成立条件を整理し、Frontierの後続Topicへ接続する。

---

## なぜ必要か

後続の理論・数値計算・データ解析で、入力と出力を正しく定義するために必要である。

---

## 前提の確認

dl-efficient-training-inference, num-sparse-matrices-preconditioning

---

## 直感

quantization、sparsity、Mixture、of、Expertsを、小さな例から一般式へ広げる。

---

## 記号と定義

quantization、sparsity、Mixture、of、Experts

---

## 代表式

$$
\mathbf{y}=\sum_{e\in\operatorname{TopK}(g(\mathbf{x}))}g_e(\mathbf{x})f_e(\mathbf{x})
$$

---

## 小さな例

2〜3要素、2次元、少数標本など、最小の非自明な例を使う。

---

## 計算手順

1. 対象を定義
2. 式へ代入
3. 中間結果を確認
4. 出力の型と条件を検査

---

## 成立条件

定義域、shape、rank、独立性、滑らかさ、有限精度などを先に確認する。

---

## 数値・実装上の注意

小例、境界値、残差、許容誤差、反復回数を記録する。

---

## 後続分野への接続

quantization・sparsity・Mixture of Expertsは、後続の数値計算・データ解析・機械学習で前提となる。

---

## よくある誤り

- quantization・sparsity・Mixture of Expertsの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

---

## 理解確認

定義、代表式、成立条件、検算方法を一文ずつ説明できるか。

---

## 次へ

[教科書](/textbook/frontier-quantization-sparsity-moe)

[演習](/exercises/frontier-quantization-sparsity-moe)
