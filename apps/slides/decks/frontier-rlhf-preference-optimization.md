---
theme: default
routerMode: hash
layout: cover
title: "RLHFとpreference optimization"
---

# RLHFとpreference optimization

Course 10｜Frontier

---

## 今回の問い

KL正則化RLHFからreward–policy relationを導き、なぜDPOがpairwise logistic lossになるか。

---

## 直感

DPOは「RLHFを使わない魔法のloss」ではなく、KL正則化された最適policyとrewardの閉形式関係をBradley–Terry preference modelへ代入して得る。

---

## 図解

<img src="./assets/course-10/frontier-rlhf-preference-optimization.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\mathcal L_{DPO}=-\log\sigma\left(\beta\left[\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right]\right)
$$

---

## 導出

1. 固定prompt xで $\max_π E_{y∼π}[r(y)]-βD_{KL}(π||π_{ref})$ を、Σ_yπ(y)=1の制約付きでLagrangian化する。
2. π(y)で微分して0と置くと $r(y)-β(\log(π/π_{ref})+1)+λ=0$。
3. 正規化定数をZ(x)へ吸収して $π^*(y|x)=π_{ref}(y|x)\exp(r/β)/Z$。よって $r=β\log(π^*/π_{ref})+β\log Z$。
4. Bradley–Terryの $P(y_w\succ y_l)=σ(r_w-r_l)$ ではprompt共通のβlogZが差で消える。
5. π*を学習policyπθでparameterizeしてnegative log-likelihoodを取るとDPO loss。

---

## 小さい例

chosenのpolicy/reference log-ratioがrejectedより0.8大きくβ=0.5ならpreference logitは0.4で、lossは-log σ(0.4)。

---

## 条件を外すと

- βのconventionは論文/実装で逆数的に見える場合があるので定義を確認する。
- preference dataのbiasやcoverage不足はobjective変換で消えない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-rlhf-preference-optimization)

[10問の演習](../../exercises/frontier-rlhf-preference-optimization)
