---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "信頼区間"
---

# 信頼区間

Course 03｜確率統計｜Topic 17/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

信頼区間の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `stat-bayesian-inference-map` で得た概念を使い、ここでは 信頼区間 へ進む。

---

## 直感

信頼区間は同じ手続きを繰り返したときの被覆率についての主張。



---

## 図解

<img src="./assets/course-03/stat-confidence-intervals.png" style="max-height: 350px; display:block; margin:0 auto;" />

多数の標本から区間を作り、真値を含む区間と外す区間を並べる。 中央の確率領域を標準化統計量で取り、その不等式を未知パラメータについて解き直すことで区間が得られる。区間が標本ごとに動き、パラメータ自体は固定である。

---

## 記号と代表式

- $\hat\theta$：点推定量
- $SE(\hat\theta)$：推定量の標準誤差
- $1-\alpha$：目標被覆率
- $z_{1-\alpha/2}$：標準正規の分位点

$$
\hat{\theta}\pm z_{1-\alpha/2}\operatorname{SE}(\hat{\theta})
$$

---

## 導出 1

近似的に $(\hat\theta-\theta)/SE\sim N(0,1)$ とする。

---

## 導出 2

$P(-z_{1-\alpha/2}\le(\hat\theta-\theta)/SE\le z_{1-\alpha/2})\approx1-\alpha$。

---

## 例題

標本平均10、SE=2、95%正規近似なら $10\pm1.96\times2=[6.08,13.92]$。

---

## 条件を変えるとどうなるか

頻度論の95%信頼区間を「この計算済み区間にθが95%の確率で入る」と読むのは標準解釈ではない。手続きの長期被覆率が95%。

---

## よくある誤解

信頼区間では、式へ数値を代入するだけでは不十分である。頻度論の95%信頼区間を「この計算済み区間にθが95%の確率で入る」と読むのは標準解釈ではない。手続きの長期被覆率が95%。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

小標本、未知分散、非対称推定量ではz区間が不適切なことがある。t分布、bootstrap、profile likelihood等を問題設定に応じて使う。

---

## 一段先へ

区間と検定は同じ標本分布の両面。帰無仮説の値が対応する両側信頼区間に入るかどうかと、同水準の両側検定は密接に対応する。

---

## 自分で説明できるか

- 「標準化統計量を作る」を式を見ずに説明できるか
- 「θについて不等式を解く」までの論理を一段ずつ再現できるか
- 信頼区間の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/stat-confidence-intervals)
- [10問の演習](../../exercises/stat-confidence-intervals)
