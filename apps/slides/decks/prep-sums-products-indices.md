---
theme: default
title: "総和・積・添字"
info: "総和記号、積記号、添字を展開し、ベクトルと行列の計算へつなげる"
class: text-center
drawings:
  persist: false
---

# 総和・積・添字

式を短く書く道具を、計算の形として読めるようにする。

---
# 総和記号を読む

\[\sum_{i=1}^{4} i = 1+2+3+4=10\]

下の添字が開始、上の添字が終了を表す。

---
# 展開してみる

\[\sum_{i=1}^{4}(2i+1)=3+5+7+9=24\]

同じ形の項を、添字の範囲に沿って並べる。

---
# ダミー添字

\[\sum_{i=1}^{n}x_i=\sum_{j=1}^{n}x_j\]

和の中だけで使う添字の名前は変えられる。ただし自由添字は変えない。

---
# 積記号

\[\prod_{i=1}^{4}i=1\cdot2\cdot3\cdot4=24\]

総和が足し算なら、積記号は掛け算をまとめる。

---
# 二重和

\[\sum_{i=1}^{2}\sum_{j=1}^{3}a_{ij}\]

まず$j$を足し、その結果を$i$について足す。有限和では順序を交換できる。

---
# 内積

\[x^\mathsf{T}y=\sum_{i=1}^{n}x_i y_i\]

同じ位置の成分を掛けてから、すべて足す。結果はスカラーである。

---
# 行列とベクトル

\[y_i=\sum_{j=1}^{n}a_{ij}x_j\]

行列$A\in\mathbb{R}^{m\times n}$と$x\in\mathbb{R}^n$から$y\in\mathbb{R}^m$を作る。

---
# 行列積

\[c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}\]

$A\in\mathbb{R}^{m\times n}$、$B\in\mathbb{R}^{n\times p}$なら$C=AB\in\mathbb{R}^{m\times p}$。

---
# NumPyと添字

```python
import numpy as np
A = np.array([[1, 2], [3, 4]])
A.sum(axis=0)  # array([4, 6])
A.sum(axis=1)  # array([3, 7])
```

`axis=0`は列方向を畳み、`axis=1`は行方向を畳む。Pythonの添字は0から始まる。

---
# 3つのチェック

1. \(\sum_{i=1}^{3}i=6\)か。
2. \(\sum_j a_{ij}x_j\)で自由な添字はどれか。
3. $A_{2\times3}B_{3\times4}$の形は何か。

答えは順に6、$i$、$2\times4$。

---
# 次へ

教科書と演習で、展開・添字・行列積を練習する。

<p><a href="../../textbook/prep-sums-products-indices">教科書へ</a></p>
<p><a href="../../exercises/prep-sums-products-indices">演習へ</a></p>
