---
theme: default
routerMode: hash
layout: cover
title: "検定力と標本サイズ"
---

# 検定力と標本サイズ

Course 03｜確率統計

---

## 何を解決するか

「有意差が出なかった」を、効果がない証拠とみなしてよいのはいつか。

検定力は、実際に特定の効果があるときに帰無仮説を棄却できる確率。効果量・ノイズ・標本数・有意水準の関数で、事前のsample size設計につながる。

---

## 図の意味

<img src="./assets/course-03/stat-power-sample-size.png" style="max-height: 350px; display:block; margin:0 auto;" />

横軸が標本数n、縦軸がpower。効果量が大きい曲線ほど少ないnで上へ立ち上がる。水平線0.8との交点を読めば「目標power 80%を得る必要標本数」の概念図になる。noiseが増えれば曲線は右へずれる。

---

## 記号

| 記号 | 意味 |
|---|---|
| $α$ | 第I種過誤率 |
| $β$ | 第II種過誤率 |
| $1-β$ | 検定力 |
| $δ$ | 想定効果量 |


- $H_0$：帰無仮説、$H_1$：対立仮説。
- $\alpha$：type-I error上限。
- $\delta$：検出したい効果量。
- power：H1が真のとき棄却する確率。

---

## 中心式

$$
\text{power}(\delta)=P_{\theta=\theta_0+\delta}(\text{reject }H_0)
$$

---

## 導出

1. 棄却域をαで固定する。
2. 対立仮説の分布の下で、その棄却域に入る確率を計算する。
3. nを増やすと標準誤差が下がり、固定効果量に対するpowerが上がる。

---

## 省略しない一段

有意水準 $\alpha$ は $H_0$ が真のときの誤棄却確率を制御する。一方powerは特定の対立仮説 $\theta_1$ が真のとき棄却域へ入る確率。つまり同じ棄却域を別の真の分布の下で測る。

平均検定では標準誤差が概ね $\sigma/\sqrt n$ なので、標準化効果量は $\delta\sqrt n/\sigma$。したがって効果量 $\delta$ が半分になれば、同じsignal-to-noiseを保つためnは概ね4倍必要になる。

---

## 手計算

**問題**：標準誤差が $\sigma/\sqrt n$ に比例するとする。効果量を半分にして同じ標準化効果量を保つにはnを何倍にすべきか。

**解答**：標準化効果は $\delta\sqrt n/\sigma$。$\delta$ を1/2にした分を $\sqrt n$ で2倍にする必要があるのでnは4倍。

---

## 条件を変える

既知 $\sigma=10$、検出したい平均差 $\delta=5$ なら標準化効果は $0.5\sqrt n$。n=16で2、n=64で4となり、後者の方が対立分布が棄却域へ大きくずれる。

---

## どこで壊れるか

観測後に「有意でなかったからpowerが低かった」と事後powerを機械的に計算しても情報が増えないことが多い。設計段階では科学的に意味のある最小効果量を先に決める。

---

## 次へ

sample size設計、equivalence/non-inferiority、multiple testingでのpower低下へつながる。機械学習の実験比較でもeffect sizeと不確実性を分けて考える基礎になる。

---

[教科書](../../textbook/stat-power-sample-size)　|　[10問の演習](../../exercises/stat-power-sample-size)
