---
theme: default
routerMode: hash
layout: cover
title: "WLSと逆分散重み"
---

# WLSと逆分散重み

Course 07｜データ解析

---

## 今回の問い

観測ごとのノイズ分散が違うとき、なぜ重み1/σ_i²が自然に現れるのか。

---

## 直感

独立Gaussian noiseで分散がσ_i²なら、残差r_iのnegative log-likelihoodへの寄与は r_i²/(2σ_i²)。不確かな観測ほど同じ残差でも証拠が弱いため小さく重み付けされる。

---

## 図解

<img src="./assets/course-07/mat-wls-inverse-variance.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\hat\beta=(X^TWX)^{-1}X^TWy
$$

---

## 導出

1. Gaussian log-likelihoodを展開すると $(y-Xβ)^TΣ^{-1}(y-Xβ)$ の最小化になる。
2. 独立heteroskedasticならΣ=diag(σ_i²), W=diag(1/σ_i²)。
3. $W^{1/2}$ を掛ければ whitened problem $||W^{1/2}y-W^{1/2}Xβ||²$。
4. 通常OLSと同じnormal equationをwhitened dataへ適用する。

---

## 小さい例

分散4の観測は分散1の観測の1/4 weight。標準偏差の逆数1/σではなく分散の逆数1/σ²。

---

## 条件を外すと

- 未知分散を推定したweightには追加不確実性がある。
- 相関noiseでは対角weightだけではGLSにならない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/mat-wls-inverse-variance)

[10問の演習](../../exercises/mat-wls-inverse-variance)
