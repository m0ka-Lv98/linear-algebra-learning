---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "独立成分分析"
---

# 独立成分分析

Course 07｜データ解析の行列手法｜Topic 15/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

独立成分分析の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `mat-nmf-nonnegative-factors` で得た概念を使い、ここでは 独立成分分析 へ進む。

---

## 直感

行列因子分解は観測行列を少数の潜在成分の積として説明する。



---

## 図解

<img src="./assets/course-07/mat-ica-independent-components.png" style="max-height: 350px; display:block; margin:0 auto;" />

元行列と2因子、再構成行列をheatmapで並べる。 データ行列を少数の基底と係数へ分ける。NMFなら両方を非負に制約するため、加法的なparts representationとして各成分を解釈しやすい。

---

## 記号と代表式

- $s$：latent independent sources
- $A$：mixing matrix
- $x=As$
- $W\approx A^{-1}$：unmixing

$$
\mathbf{x}=\mathbf{A}\mathbf{s}
$$

---

## 導出 1

center+whiten後Cov=Iにするとremaining mixingはorthogonal（ideal square model）。

---

## 導出 2

Gaussian sourcesのorthogonal rotationは同じjoint Gaussianとなりindependenceだけで方向を識別できない。

---

## 例題

2音源を2 microphoneでlinear mixing。ICAはsource order/sign/scaleを除き分離できる条件がある。

---

## 条件を変えるとどうなるか

全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。

---

## よくある誤解

独立成分分析では、式へ数値を代入するだけでは不十分である。全sources Gaussianなら一般にrotation ambiguityでICA identifiabilityが失われる。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

component scale/order/sign arbitrary。prewhitening、nonlinearity choice、convergenceを確認。

---

## 一段先へ

2 data viewsの線形combination間のcorrelationを最大化するCCAへ。

---

## 自分で説明できるか

- 「whiteningでsecond-orderを除く」を式を見ずに説明できるか
- 「objective」までの論理を一段ずつ再現できるか
- 独立成分分析の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/mat-ica-independent-components)
- [10問の演習](../../exercises/mat-ica-independent-components)
