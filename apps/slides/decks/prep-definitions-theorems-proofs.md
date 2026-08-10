---
theme: default
routerMode: hash
layout: cover
title: "定義・命題・証明の読み方"
---

# 定義・命題・証明の読み方

Course 00｜学習準備

---

## 何を身につけるか

定義、仮定、結論、必要条件、十分条件を分離し、定理を「いつ使えるか」まで読めるようにする。

---

## 図

<img src="./assets/course-00/prep-definitions-theorems-proofs.png" style="max-height: 350px; display:block; margin:0 auto;" />

PからQへの矢印が含意 $P\Rightarrow Q$。矢印を逆にした $Q\Rightarrow P$ は逆命題で、元の命題から自動的には従わない。対偶は $\neg Q\Rightarrow\neg P$ で元命題と論理同値。

---

## 定義と理由

定義は用語の意味を固定する規則で、証明対象ではない。命題は真偽を持つ文。定理「PならばQ」ではPが仮定、Qが結論。

PがQの十分条件とは $P\Rightarrow Q$、必要条件とは $Q\Rightarrow P$。必要十分は両方向。

証明法は直接証明、対偶、背理法、場合分け、数学的帰納法を区別する。反例1個で全称命題を否定できる。

---

## 具体例

「nが4の倍数ならnは偶数」は真。4の倍数は偶数の十分条件だが必要条件ではない（n=2が反例）。対偶は「nが奇数なら4の倍数ではない」。

---

## ここで誤ると

例を数個確認して全称命題を証明したことにしない。例は反例探索には強いが、一般性の証明にはならない。

---

## 次へ

線形代数の可逆性同値条件、確率の独立条件、最適化のKKT条件を正確に読む基礎。

---

[教科書](../../textbook/prep-definitions-theorems-proofs)　|　[演習](../../exercises/prep-definitions-theorems-proofs)
