---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "attention機構"
---

# attention機構

Course 09｜深層学習｜Topic 08/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

attention機構の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `dl-rnn-sequence-models` で得た概念を使い、ここでは attention機構 へ進む。

---

## 直感

attentionはqueryとkeyの類似度から重みを作り、valueの加重平均で必要な情報を取り出す。



---

## 図解

<img src="./assets/course-09/dl-attention-mechanism.png" style="max-height: 350px; display:block; margin:0 auto;" />

attention matrixのheatmapで各tokenがどこを見るか可視化する。 行がquery、列がkey、セルがsoftmax後のattention weightである。各行の重み付き和でvalueを混ぜるため、queryごとに参照先が変わる。

---

## 記号と代表式

- $Q\in\mathbb R^{n_q\times d_k}$：queries
- $K\in\mathbb R^{n_k\times d_k}$：keys
- $V\in\mathbb R^{n_k\times d_v}$：values
- $A=softmax(QK^T/\sqrt{d_k})$：attention weights

$$
\operatorname{Attention}(\mathbf{Q},\mathbf{K},\mathbf{V})=\operatorname{softmax}(\mathbf{Q}\mathbf{K}^{\mathsf T}/\sqrt{d_k})\mathbf{V}
$$

---

## 導出 1

$QK^T$ はn_q×n_k。entry q_i^Tk_jがquery iとkey jのcompatibility。

---

## 導出 2

independent unit-variance componentsならdot product variance≈d_k。√d_kで割りlogit scaleをO(1)にしsoftmax saturationを抑える。

---

## 例題

1 query, 2 keys score(2,0)ならweights≈(0.881,0.119)、outputはvalue1寄り。

---

## 条件を変えるとどうなるか

attention weightが高いことをそのままcausal importance/faithful explanationとみなせない。

---

## よくある誤解

attention機構では、式へ数値を代入するだけでは不十分である。attention weightが高いことをそのままcausal importance/faithful explanationとみなせない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

stable fused attention、mask broadcasting、head/batch dimensions。quadratic sequence memoryをmonitor。

---

## 一段先へ

self-attentionをmulti-head、position information、FFN、residual/normalizationと組み合わせTransformerを作る。

---

## 自分で説明できるか

- 「score matrix shape」を式を見ずに説明できるか
- 「weighted sum」までの論理を一段ずつ再現できるか
- attention機構の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/dl-attention-mechanism)
- [10問の演習](../../exercises/dl-attention-mechanism)
