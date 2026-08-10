---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "特徴量設計と特徴選択"
---

# 特徴量設計と特徴選択

Course 08｜機械学習｜Topic 16/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

特徴量設計と特徴選択の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `ml-anomaly-detection` で得た概念を使い、ここでは 特徴量設計と特徴選択 へ進む。

---

## 直感

特徴量設計は生データから予測に必要な情報を抽出し、特徴選択は冗長・不要な次元を減らす。



---

## 図解

<img src="./assets/course-08/ml-feature-engineering-selection.png" style="max-height: 350px; display:block; margin:0 auto;" />

候補特徴の重要度と選択前後の性能を比較する。 元の座標から新しい特徴へ写すと、同じデータでも線形分離性や距離構造が変わる。特徴量はモデルへ渡す表現そのものを設計する操作である。

---

## 記号と代表式

- $\phi(x)$：feature transform
- $S$：selected features
- $\lambda\|β\|_1$：embedded selection例

$$
\min_{\boldsymbol{\beta}}\mathcal{L}(\boldsymbol{\beta})+\lambda\|\boldsymbol{\beta}\|_1
$$

---

## 導出 1

linear model on φ(x) is nonlinear in raw x。representationがmodel expressivityを決める。

---

## 導出 2

many featuresからbestをsame dataで選ぶほどselection noiseへ適応。validation/CV内でselectionをfit。

---

## 例題

cyclic timeをhour scalarよりsin/cos pairへ変換すると23時と0時が近いgeometry。

---

## 条件を変えるとどうなるか

test data correlationを見てfeatures削除/追加するとtest leakage。

---

## よくある誤解

特徴量設計と特徴選択では、式へ数値を代入するだけでは不十分である。test data correlationを見てfeatures削除/追加するとtest leakage。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

Pipeline/ColumnTransformerでfold内fit。feature namesとunitsをtrace。

---

## 一段先へ

feature/model flexibilityを増やすとbias–variance tradeoffが生まれる。

---

## 自分で説明できるか

- 「transform changes hypothesis class」を式を見ずに説明できるか
- 「L1 embedded selection」までの論理を一段ずつ再現できるか
- 特徴量設計と特徴選択の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/ml-feature-engineering-selection)
- [10問の演習](../../exercises/ml-feature-engineering-selection)
