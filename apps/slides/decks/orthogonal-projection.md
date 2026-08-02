---
theme: default
title: 直交射影
info: 線形代数の基礎
class: text-center
drawings:
  persist: false
---

# 直交射影

線形代数の基礎：最も近い点を考える

---

# このテーマで考える問い

あるベクトルを、部分空間の中の「一番近い点」に置き換えるにはどうする？

---

# 直感

点から直線へ垂線を下ろすと、その足が直線上で最も近い点になります。

---

# 模式図

<div class="diagram">
  <div class="point">● v</div>
  <div class="drop">⋮</div>
  <div class="line">━━━━━━━━━━━━ proj(v) ━━━━━━━━━━━━</div>
</div>

---

# 最小二乗法との関係

観測ベクトルをモデルの列空間へ射影すると、残差の長さが最小になります。

直交射影は、最小二乗法を幾何的に見る入口です。

---

# 次に読む

<p><a href="../../../textbook/orthogonal-projection">教科書：直交射影</a></p>
<p><a href="../../../exercises/orthogonal-projection">演習：直交射影</a></p>

---

# まとめ

直交射影は「部分空間上で最も近い点」を与え、最小二乗法とつながっています。

<style>
.diagram { margin: 3rem auto; max-width: 700px; font-size: 1.7rem; text-align: center; }
.point { color: #2563eb; }.drop { color: #0f766e; font-size: 3rem; }.line { color: #64748b; }
</style>
