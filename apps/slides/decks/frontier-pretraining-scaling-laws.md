---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "pretrainingとscaling law"
---

# pretrainingとscaling law

Course 10｜Frontier｜Topic 03/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

pretrainingとscaling lawの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `frontier-tokenization-embeddings-context` で得た概念を使い、ここでは pretrainingとscaling law へ進む。

---

## 直感

scaling lawはmodel/data/computeを増やしたときのloss改善を経験的なべき則で要約する。



---

## 図解

<img src="./assets/course-10/frontier-pretraining-scaling-laws.png" style="max-height: 350px; display:block; margin:0 auto;" />

log-log軸で規模とlossの関係を描く。 横軸をmodel/data/compute規模、縦軸をlossとしてlog-logで描くと、経験的power lawはおおむね直線になる。資源配分の議論はこの傾きと飽和を読む。

---

## 記号と代表式

- $N$：model parameters規模
- $D$：training tokens/data規模
- $C$：compute
- $\mathcal L$：validation/pretraining loss
- $\alpha,\beta$：empirical exponents

$$
\mathcal{L}(N,D,C)\approx A N^{-\alpha}+B D^{-\beta}+E
$$

---

## 導出 1

$L(N)\approx A N^{-\alpha}+E$ ならirreducible Eを除いた部分のlogは $\log A-\alpha\log N$。実験点からslopeをfit。

---

## 導出 2

Nだけ増やしてD不足ならdata-limited、Dだけ増やしてN不足ならmodel-limited。general formは各resource contributionを含む。

---

## 例題

modelを2倍してloss改善がpredictableでも、dataset quality/domainが変われば同じfitを外挿できない。

---

## 条件を変えるとどうなるか

benchmark scoreやemergent capabilityがpretraining lossの単純power lawに必ず従うわけではない。fit range外の巨大外挿はuncertain。

---

## よくある誤解

pretrainingとscaling lawでは、式へ数値を代入するだけでは不十分である。benchmark scoreやemergent capabilityがpretraining lossの単純power lawに必ず従うわけではない。fit range外の巨大外挿はuncertain。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

experiment FLOPs算定、token count、data mixture、optimizer/architectureを揃えないとscale studyを混同。confidence interval付きfit。

---

## 一段先へ

pretrained modelをparameter updateせずexamples/instructionsだけでtaskへadaptするin-context learningへ。

---

## 自分で説明できるか

- 「log-log linearization」を式を見ずに説明できるか
- 「compute constraint」までの論理を一段ずつ再現できるか
- pretrainingとscaling lawの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/frontier-pretraining-scaling-laws)
- [10問の演習](../../exercises/frontier-pretraining-scaling-laws)
