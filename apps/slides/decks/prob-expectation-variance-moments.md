---
theme: default
routerMode: hash
layout: cover
title: 期待値・分散・モーメント
---

# 期待値・分散・モーメント

Course 03｜確率統計

---
layout: center
---

## 今回の問い

期待値・分散・モーメントを定義し、観測データと機械学習へ接続する。

---

## なぜ必要か

不確実性を数量化すると、推定・回帰・分類の前提を明示できる。

---

## 前提の確認

X,Yは確率変数、x,yは実現値、θは母数、nは標本数である。

---

## 直感

期待値、分散、標準偏差、モーメント、線形性、単位、典型値を表、曲線、または分布の形として観察する。

---

## 記号と定義

期待値、分散、標準偏差、モーメント、線形性、単位、典型値

---

## 基本式

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-\mathbb{E}[X]^2
$$

---

## 小さな例

少数の結果を列挙し、support、正規化、shapeを確認する。

---

## 手計算・導出

定義を総和、積分、条件付き確率、または対数へ展開する。

---

## 解釈

確率、密度、期待値、推定量を区別し、仮定と単位を確認する。

---

## 数値確認

標準PythonとNumPy、`np.random.default_rng(42)`、`np.allclose`で検算する。

---

## 統計・機械学習への接続

MLE、MAP、回帰、classification loss、情報量へ接続する。

---

## よくある誤り

PDFを確率、尤度を母数の確率、p-valueを帰無仮説の確率と読まない。

---

## 理解確認

定義、前提、計算、応用を一文ずつ説明できるか。

---

## 次へ

[教科書](/textbook/prob-expectation-variance-moments)

[演習](/exercises/prob-expectation-variance-moments)
