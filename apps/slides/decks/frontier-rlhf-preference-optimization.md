---
theme: default
routerMode: hash
layout: cover
title: "DPO：KL正則化RLHFからpreference lossへ"
---

# DPO：KL正則化RLHFからpreference lossへ

Course 10｜Frontier

---

## 今回の問い

なぜreward modelを明示的にpolicy更新へ使わず、chosen/rejected pairだけでpolicyを学習できるのか。

---

## 前提

前Topic：`frontier-rlhf-reward-model-ppo-kl`

- $x$：prompt
- $y_w,y_l$：chosen / rejected response
- $\pi_\theta$：学習policy
- $\pi_{\mathrm{ref}}$：固定reference policy
- $\beta>0$：KL penalty係数

---

## 図：何を比較しているか

<img src="./assets/course-10/frontier-rlhf-preference-optimization.png" style="max-height: 360px; display:block; margin:0 auto;" />

chosen側とrejected側で

$$
\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}
$$

を計算し、その差を比べる。

---

## 出発点：KL正則化policy optimization

prompt $x$ を固定すると

$$
\max_\pi
\sum_y\pi_y r_y
-\beta\sum_y\pi_y\log\frac{\pi_y}{\pi_y^{\mathrm{ref}}}
$$

subject to

$$
\sum_y\pi_y=1.
$$

---

## Lagrangianを微分する

$$
\mathcal F
=\sum_y\pi_y r_y
-\beta\sum_y\pi_y\log\frac{\pi_y}{\pi_y^{\mathrm{ref}}}
+\eta(\sum_y\pi_y-1)
$$

$$
0=\frac{\partial\mathcal F}{\partial\pi_y}
=r_y-\beta\left(\log\frac{\pi_y}{\pi_y^{\mathrm{ref}}}+1\right)+\eta.
$$

---

## rewardとpolicy log-ratioの関係

整理すると

$$
r(x,y)
=\beta\log\frac{\pi^*(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}+C(x).
$$

同じprompt内では$C(x)$はresponseに依存しない。

---

## chosen − rejectedで定数が消える

$$
\begin{aligned}
r_w-r_l
=\beta\Bigg[
&\log\frac{\pi^*(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}\\
-&\log\frac{\pi^*(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}
\Bigg].
\end{aligned}
$$

---

## Bradley–Terry preference model

$$
P(y_w\succ y_l\mid x)=\sigma(r_w-r_l).
$$

reward差へpolicy log-ratio差を代入する。

---

## DPO loss

$$
\Delta_{\mathrm{ref}}
=\log\pi_{\mathrm{ref}}(y_w\mid x)
-\log\pi_{\mathrm{ref}}(y_l\mid x)
$$

$$
\boxed{
\mathcal L_{\mathrm{DPO}}
=-\log\sigma\left(\beta[
\log\pi_\theta(y_w\mid x)
-\log\pi_\theta(y_l\mid x)
-\Delta_{\mathrm{ref}}]
\right)
}
$$

---

## 数値例

$$
\log\pi_\theta(y_w)=-1.0,\quad
\log\pi_\theta(y_l)=-2.0
$$

$$
\log\pi_{ref}(y_w)=-1.2,\quad
\log\pi_{ref}(y_l)=-1.8,
\quad\beta=0.5.
$$

policy差$=1.0$、reference差$=0.6$なのでlogit$=0.2$。

$$
\sigma(0.2)\approx0.550,
\qquad
\mathcal L\approx0.598.
$$

---

## referenceを入れる意味

DPOが増やすのは単なる

$$
\log\pi_\theta(y_w)-\log\pi_\theta(y_l)
$$

ではない。

**referenceからの変化量のchosen/rejected差**を増やす。

---

## 壊れる条件

- preference pairがsystematically biased
- offline pairのcoverageが狭い
- chosen/rejectedでmaskやlength処理が違う
- reference supportとpolicy supportが合わない
- $\beta$の定義を実装ごとに確認していない

---

## 標準RLHFとの関係

標準RLHF：

`preference → reward model → rollout → RL update`

DPO：

`preference pair → policy/reference log-ratio → binary loss`

training loopは簡単になるが、preference dataのbiasは消えない。

---

## 自分で導けるか

1. KL正則化objectiveを$\pi_y$で微分する。
2. $r=\beta\log(\pi^*/\pi_{ref})+C(x)$を得る。
3. chosen−rejectedで$C(x)$を消す。
4. Bradley–Terryへ代入する。
5. negative logを取ってDPO lossにする。

---

## 教科書と演習

[教科書](../../textbook/frontier-rlhf-preference-optimization)

[10問の演習](../../exercises/frontier-rlhf-preference-optimization)
