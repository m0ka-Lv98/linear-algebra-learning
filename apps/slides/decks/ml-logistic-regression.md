---
theme: default
layout: cover
title: logistic回帰
---

# logistic回帰

Course 08｜機械学習

---
layout: center
---

## 今回の問い

logistic回帰の定義、計算手順、成立条件を整理し、機械学習の後続Topicへ接続する。

---

## なぜ必要か

後続の理論・数値計算・データ解析で、入力と出力を正しく定義するために必要である。

---

## 前提の確認

stat-likelihood-maximum-likelihood, opt-convex-sets-functions

---

## 直感

logistic回帰を、小さな例から一般式へ広げる。

---

## 記号と定義

logistic回帰

---

## 代表式

$$
p(y=1\mid\mathbf{x})=\sigma(\mathbf{x}^{\mathsf T}\mathbf{w}+b)
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

logistic回帰は、後続の数値計算・データ解析・機械学習で前提となる。

---

## よくある誤り

- logistic回帰の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

---

## 理解確認

定義、代表式、成立条件、検算方法を一文ずつ説明できるか。

---

## 次へ

[教科書](/textbook/ml-logistic-regression)

[演習](/exercises/ml-logistic-regression)
