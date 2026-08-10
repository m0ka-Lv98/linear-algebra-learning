---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "WLSと逆分散重み"
---

# WLSと逆分散重み

Course 07｜データ解析の行列手法｜Topic 07/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

WLSと逆分散重みの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `mat-ols-design-matrices` で得た概念を使い、ここでは WLSと逆分散重み へ進む。

---

## 直感

観測ごとの信頼度が異なるとき、残差を同じ重みで扱わず、分散の小さい観測を強く反映する。



---

## 図解

<img src="./assets/course-07/mat-wls-inverse-variance.png" style="max-height: 350px; display:block; margin:0 auto;" />

同じ散布点にOLSと逆分散WLSを当て、誤差バーの小さい点へ線が寄る様子を見る。 各点から回帰線への残差に異なる重みが掛かる。分散の小さい観測ほど信頼度が高いとき1/σ_i²で重くするのはGaussian likelihoodから導かれる。

---

## 記号と代表式

- $W=diag(w_1,\ldots,w_n)\succ0$
- $w_i=1/\sigma_i²$：独立heteroscedastic noiseのinverse variance
- $r=y-Xβ$

$$
\hat{\boldsymbol{\beta}}=(\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^{\mathsf T}\mathbf{W}\mathbf{y}
$$

---

## 導出 1

$\varepsilon_i\sim N(0,\sigma_i²)$ ならnegative log likelihoodは定数を除き $\frac12\sum_i r_i²/\sigma_i²$。したがって $w_i=1/\sigma_i²$。

---

## 導出 2

$J=(y-Xβ)^TW(y-Xβ)$。W symmetricとしてgradient $-2X^TW(y-Xβ)$。

---

## 例題

2観測が同じresidual1でもσ=1のpoint contribution1、σ=2なら1/4。精密な観測を4倍強く信頼。

---

## 条件を変えるとどうなるか

weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。

---

## よくある誤解

WLSと逆分散重みでは、式へ数値を代入するだけでは不十分である。weightを「重要度」として任意設定したWLSと、noise inverse varianceとしてのstatistical WLSは意味が違う。variance推定が誤ればefficiency/SE解釈も崩れる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

normal equationを明示形成せずweighted QR。極端なweight ratioはconditioning悪化。Wをsampleごとに推定した場合、その不確実性も考慮。

---

## 一段先へ

noiseが観測間でcorrelatedならdiagonal Wでは足りず、full covariance Σ^{-1}を使うGLSへ。

---

## 自分で説明できるか

- 「なぜinverse varianceか」を式を見ずに説明できるか
- 「weighted normal equation」までの論理を一段ずつ再現できるか
- WLSと逆分散重みの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/mat-wls-inverse-variance)
- [10問の演習](../../exercises/mat-wls-inverse-variance)
