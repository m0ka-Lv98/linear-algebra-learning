---
theme: default
routerMode: hash
layout: cover
title: "LLM serving・continuous batching・speculative decoding"
---

# LLM serving・continuous batching・speculative decoding

Course 10｜Frontier

---

## 今回の問い

複数requestを低latencyかつ高throughputで処理するため、serving systemは何をscheduleするか。

---

## 直感

requestごとに生成長が違うため固定batchはGPU slotを無駄にしやすい。continuous batchingはdecode step単位でrequestを入替える。speculative decodingは小modelのdraftを大modelがまとめて検証する。

---

## 図解

<img src="./assets/course-10/frontier-serving-batching-speculative-decoding.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\text{throughput}\not\equiv\text{latency};\quad \text{servingは両者のtrade-offを最適化する}
$$

---

## 導出

1. decode requestをstepごとのwork itemへ分解する。
2. finished requestをすぐbatchから除き新requestを投入する。
3. speculative decodingではdraft token列をtarget modelで並列検証し、受理分だけ進める。

---

## 小さい例

short chatとlong generationを同一queueで処理するとき、scheduler policyでTTFTとthroughputの優先度が変わる。

---

## 条件を外すと

- tokens/sだけでuser latencyを評価しない。
- draft acceptance rateが低いとspeculation overheadが得を上回る。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-serving-batching-speculative-decoding)

[10問の演習](../../exercises/frontier-serving-batching-speculative-decoding)
