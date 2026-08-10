---
theme: default
routerMode: hash
layout: cover
title: "SFT・instruction tuning"
---

# SFT・instruction tuning

Course 10｜Frontier

---

## 何を解決するか

pretrained LMを「指示に従うmodel」へ変える最初の段階は何を最適化しているか。

SFTはinstruction-response pairに対するconditional language modeling。base modelの次token予測能力を、望ましい会話・指示応答分布へ寄せる。

---

## 図の意味

<img src="./assets/course-10/frontier-supervised-finetuning-instruction-tuning.png" style="max-height: 350px; display:block; margin:0 auto;" />

左のinstructionと任意のcontextがmodelへ入り、右側のresponse token列を生成する。lossを掛ける部分はresponse tokenに対応し、prompt tokenをmaskする設定では「入力を再現する」のでなく「この入力に対する望ましい応答」のconditional likelihoodを上げる。

---

## 記号

| 記号 | 意味 |
|---|---|
| $x$ | instruction/prompt |
| $y$ | target response |
| $θ$ | model parameters |


- $x$：instruction/context。
- $y_{<t}$：response prefix。
- $\pi_\theta(y_t|x,y_{<t})$：正解tokenの条件付き確率。

---

## 中心式

$$
\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})
$$

---

## 導出

1. response conditional probabilityをautoregressive factorizationする。
2. 負のlog likelihoodを取るとtoken cross entropyの和。
3. prompt tokenをloss maskする設計ではresponse tokenだけを直接教師信号にする。

---

## 省略しない一段

pretrained LMは一般textのnext-token distributionを学んでいる。SFTではdataset $D={(x_i,y_i)}$ のinstruction xに対するresponse yのconditional likelihoodを最大化し、desired behavior distributionへparameterを移す。

responseはautoregressiveに factorizeされるので lossは $-\sum_t\log\pi_\theta(y_t|x,y_{<t})$。chat templateやsystem/user/assistant境界、loss maskは「どのtokenを教師信号として最適化するか」を決めるため、単なる前処理ではない。

---

## 手計算

**問題**：response 3 tokenの正解確率が0.8,0.5,0.25のときSFTのsequence NLLを求めよ。

**解答**：$-\log(0.8\times0.5\times0.25)=-\log0.1\approx2.3026$。token lossの和でも同じ。

---

## 条件を変える

response2 tokenの正解確率が0.7,0.6ならlossは $-\log0.7-\log0.6\approx0.868$。sequenceが長い場合、sum/mean reductionの違いでgradient scaleが変わる。

---

## どこで壊れるか

SFT dataの品質・coverage外のbehaviorは保証されない。また同じinstructionを大量重複するとdistributionが偏る。pretraining能力を壊すcatastrophic forgettingにも注意。

---

## 次へ

PEFTはSFTなどのobjectiveを、全parameterではなくLoRA等の小さなparameter subsetで実現する手段。SFTの後にpreference/RLHFで「どちらの応答がより望ましいか」という相対feedbackを追加する。

---

[教科書](../../textbook/frontier-supervised-finetuning-instruction-tuning)　|　[10問の演習](../../exercises/frontier-supervised-finetuning-instruction-tuning)
