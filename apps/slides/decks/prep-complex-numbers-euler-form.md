---
theme: default
routerMode: hash
layout: cover
title: "複素数・極形式・Euler公式"
---

# 複素数・極形式・Euler公式

Course 00｜学習準備

---

## 今回の問い

複素数の掛け算を、平面上の回転と拡大としてどう読むか。

---

## 直感

複素数 z=a+bi は平面上のベクトルとみなせる。極形式では大きさ r と角度 θ に分け、掛け算が「大きさを掛け、角度を足す」操作になる。Fourier・固有値・振動の共通言語になる。

---

## 図解

<img src="./assets/course-00/prep-complex-numbers-euler-form.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

---

## 導出

1. 指数関数のTaylor級数へ $i\theta$ を代入する。
2. 偶数次項と奇数次項を分ける。
3. $i^{2k}=(-1)^k$, $i^{2k+1}=i(-1)^k$ を使うと cos と sin の級数になる。

---

## 小さい例

e^{iπ}=-1 なので e^{iπ}+1=0。複素指数は単位円上をπだけ回転させる。

---

## 条件を外すと

- 複素共役と逆数を混同しない。
- arg は2πの整数倍だけ不定である。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/prep-complex-numbers-euler-form)

[10問の演習](../../exercises/prep-complex-numbers-euler-form)
