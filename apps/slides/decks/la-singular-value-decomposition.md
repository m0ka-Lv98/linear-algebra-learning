---
theme: default
routerMode: hash
layout: cover
title: "特異値分解"
---

# 特異値分解

Course 02｜線形代数

---

## 今回の問い

任意の実行列を「直交回転→軸方向scale→直交回転」に分解できるのはなぜか。

---

## 直感

A^T Aは対称半正定値なので直交固有分解できる。その固有ベクトルを入力側の軸とし、Aが各軸をどれだけ伸ばすかの平方根が特異値になる。

---

## 図解

<img src="./assets/course-02/la-singular-value-decomposition.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
A=U\Sigma V^T
$$

---

## 導出

1. $A^TA$ は対称半正定値なので $A^TA=VΛV^T$, Λ≥0。
2. $σ_i=√λ_i$ と置く。σ_i>0では $u_i=Av_i/σ_i$ と定義すると互いに直交する。
3. 零特異値に対応する部分はkernelと直交補空間を補ってUを完成させる。
4. $Av_i=σ_i u_i$ を列ごとにまとめて $AV=UΣ$、よってA=UΣV^T。

---

## 小さい例

rank1行列では特異値は1個だけ非零で、A=σ_1u_1v_1^T。入力v_1方向だけを出力u_1方向へ写す。

---

## 条件を外すと

- A自体の固有値分解とSVDを混同しない。
- σ_iはA^TAの固有値そのものではなく平方根。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/la-singular-value-decomposition)

[10問の演習](../../exercises/la-singular-value-decomposition)
