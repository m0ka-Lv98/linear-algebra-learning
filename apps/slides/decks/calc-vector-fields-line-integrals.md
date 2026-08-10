---
theme: default
routerMode: hash
layout: cover
title: "ベクトル場と線積分"
---

# ベクトル場と線積分

Course 01｜微積分

---

## 何を解決するか

空間の各点にベクトルがあるとき、曲線に沿った仕事をどう足し上げるか。

力場Fの中を曲線Cに沿って動くと、微小変位drに平行な力成分だけが仕事をする。内積 F·dr を経路全体で積分する。

---

## 図の意味

<img src="./assets/course-01/calc-vector-fields-line-integrals.png" style="max-height: 350px; display:block; margin:0 auto;" />

背景の各矢印が位置 $(x,y)$ におけるベクトル場 $\mathbf F(x,y)$。太線が経路 $\mathbf r(t)$。経路上の一点では接線方向 $\mathbf r\prime(t)$ と場の矢印を描き、その内積が正なら進行方向へ仕事、負なら逆向きの仕事を表す。

---

## 記号

| 記号 | 意味 |
|---|---|
| $F$ | ベクトル場 |
| $r(t)$ | 曲線の媒介表示 |
| $dr=r′(t)dt$ | 微小変位 |


- $\mathbf F:\mathbb R^2\to\mathbb R^2$：ベクトル場。
- $C$：向き付き曲線。
- $\mathbf r(t)$：Cの媒介表示。
- $d\mathbf r=\mathbf r'(t)dt$。

---

## 中心式

$$
\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt
$$

---

## 導出

1. 曲線を短い線分へ分割する。
2. 各線分で仕事を $F\cdot\Delta r$ と近似する。
3. 分割幅を0へしたRiemann和の極限が線積分。

---

## 省略しない一段

短い区間で変位を $\Delta\mathbf r_i$、代表点の力を $\mathbf F_i$ とすると仕事は $\mathbf F_i\cdot\Delta\mathbf r_i$。曲線を細かく分割した和の極限が線積分。媒介表示 $\Delta\mathbf r\approx\mathbf r\prime(t)\Delta t$ を入れると1変数積分へ変わる。

同じ始点・終点でも経路で値が変わる場が一般的。もし $\mathbf F=\nabla\phi$ というpotentialが存在する保守場なら、連鎖律により $\nabla\phi(\mathbf r(t))\cdot\mathbf r\prime(t)=d[\phi(\mathbf r(t))]/dt$ となり、線積分は端点差だけになる。

---

## 手計算

**問題**：$\mathbf F=(2x,y)$、直線経路 $\mathbf r(t)=(t,2t)$, $0\le t\le1$ に沿う線積分を求めよ。

**解答**：$\mathbf F(\mathbf r(t))=(2t,2t)$、$\mathbf r'=(1,2)$。内積は $2t+4t=6t$。よって $\int_0^1 6t dt=3$。

---

## 条件を変える

$\mathbf F=(-y,x)$、単位円上を反時計回りに $\mathbf r(t)=(\cos t,\sin t)$, $0\le t\le2\pi$ と進むと $\mathbf F=(-\sin t,\cos t)=\mathbf r\prime(t)$。内積は1なので線積分は $2\pi$。

---

## どこで壊れるか

ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。仕事では進行方向成分だけを取る。また経路の向きを逆にすると線積分の符号が反転する。

---

## 次へ

Green/Stokes/Gaussの定理は境界上の線積分と内部の微分量を結び付ける。最適化でもgradient fieldに沿った変化量を積分する考えが使える。

---

[教科書](../../textbook/calc-vector-fields-line-integrals)　|　[10問の演習](../../exercises/calc-vector-fields-line-integrals)
