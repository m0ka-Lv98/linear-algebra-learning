---
theme: default
routerMode: hash
layout: cover
title: "seq2seq・encoder-decoder・teacher forcing"
---

# seq2seq・encoder-decoder・teacher forcing

Course 09｜深層学習

---

## 今回の問い

入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。

---

## 直感

encoderは入力系列を表現へ変換し、decoderは過去token条件付きで次token分布を生成する。teacher forcingでは訓練時に正解prefixを与える。

---

## 図解

<img src="./assets/course-09/dl-seq2seq-teacher-forcing.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)
$$

---

## 導出

1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。
2. negative logを取ると和になりtoken-level cross entropyになる。
3. teacher forcingは各条件 $y_{<t}$ にground-truth prefixを使う。

---

## 小さい例

翻訳でsource文をencoderへ入れ、decoderは<BOS>からtarget tokenを順に予測する。

---

## 条件を外すと

- training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。
- padding tokenをlossへ含めるmaskに注意する。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/dl-seq2seq-teacher-forcing)

[10問の演習](../../exercises/dl-seq2seq-teacher-forcing)
