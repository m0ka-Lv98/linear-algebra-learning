---
theme: default
layout: cover
title: 大数の法則と中心極限定理
---

# 大数の法則と中心極限定理

Course 03｜確率統計

---
layout: center
---

## 今回の問い

大数の法則と中心極限定理を定義し、観測データと機械学習へ接続する。

---

## なぜ必要か

不確実性を数量化すると、推定・回帰・分類の前提を明示できる。

---

## 前提の確認

X,Yは確率変数、x,yは実現値、θは母数、nは標本数である。

---

## 直感

標本平均、大数の法則、中心極限定理、標準誤差、正規近似、iidを表、曲線、または分布の形として観察する。

---

## 記号と定義

標本平均、大数の法則、中心極限定理、標準誤差、正規近似、iid

---

## 基本式

$$
\frac{\sqrt{n}(\bar{X}_n-\mu)}{\sigma}\Rightarrow\mathcal{N}(0,1)
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

[教科書](/textbook/prob-laws-large-numbers-central-limit-theorem)

[演習](/exercises/prob-laws-large-numbers-central-limit-theorem)
