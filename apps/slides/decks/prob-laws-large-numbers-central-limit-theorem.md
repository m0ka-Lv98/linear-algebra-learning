---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "大数の法則と中心極限定理"
---

# 大数の法則と中心極限定理

Course 03｜確率統計｜Topic 12/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

大数の法則と中心極限定理の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `prob-transformations-sums-random-variables` で得た概念を使い、ここでは 大数の法則と中心極限定理 へ進む。

---

## 直感

標本数が増えると標本平均の揺れが小さくなり、適切な条件で正規分布へ近づく。



---

## 図解

<img src="./assets/course-03/prob-laws-large-numbers-central-limit-theorem.png" style="max-height: 350px; display:block; margin:0 auto;" />

非正規な母集団から標本平均を繰り返し取り、nごとの分布を比較する。 標本数が増えるにつれて標本平均の分布が狭くなる。個々の観測のばらつきと、平均という統計量のばらつきを同じものとして扱わないことが図から分かる。

---

## 記号と代表式

- $X_i$：独立同分布な標本
- $\mu=E[X_i]$
- $\sigma^2=Var(X_i)<\infty$
- $\bar X_n=n^{-1}\sum_iX_i$
- $\Rightarrow$：分布収束

$$
\frac{\sqrt{n}(\bar{X}_n-\mu)}{\sigma}\Rightarrow\mathcal{N}(0,1)
$$

---

## 導出 1

$E[\bar X_n]=\mu$。独立なら $Var(\bar X_n)=\sigma^2/n$ なので、nを増やすと平均のばらつきが縮む。

---

## 導出 2

Chebyshev不等式から $P(|\bar X_n-\mu|\ge\varepsilon)\le\sigma^2/(n\varepsilon^2)\to0$。これは値が母平均へ集中することを示す。

---

## 例題

Bernoulli(p)標本の平均は成功率。n=100, p=0.4なら標準誤差は $\sqrt{0.24/100}\approx0.049$。n=400なら約0.0245で半分。

---

## 条件を変えるとどうなるか

CLTは「どんな分布でも少数標本で正規」ではない。強い依存、無限分散、極端な裾では標準的CLTの仮定を外れ、収束も遅い・別極限になることがある。

---

## よくある誤解

大数の法則と中心極限定理では、式へ数値を代入するだけでは不十分である。CLTは「どんな分布でも少数標本で正規」ではない。強い依存、無限分散、極端な裾では標準的CLTの仮定を外れ、収束も遅い・別極限になることがある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

simulationでは元分布のヒストグラムと、n個平均のヒストグラムを分けて描く。標準化の $\sqrt n$ を忘れると分布が0へ潰れてCLTの形を観察できない。

---

## 一段先へ

CLTにより推定量の近似標本分布を作れる。信頼区間や仮説検定のz近似はこの「推定誤差を正規で近似する」考えから生まれる。

---

## 自分で説明できるか

- 「標本平均の平均と分散を計算する」を式を見ずに説明できるか
- 「CLTでは縮む誤差を拡大する」までの論理を一段ずつ再現できるか
- 大数の法則と中心極限定理の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/prob-laws-large-numbers-central-limit-theorem)
- [10問の演習](../../exercises/prob-laws-large-numbers-central-limit-theorem)
