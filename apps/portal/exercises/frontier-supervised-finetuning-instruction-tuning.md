# SFT・instruction tuning：演習

Course 10｜Frontier

[教科書](/textbook/frontier-supervised-finetuning-instruction-tuning)

## 問題1

response 3 tokenの正解確率が0.8,0.5,0.25のときSFTのsequence NLLを求めよ。

<details><summary>完全解答</summary>

$-\log(0.8\times0.5\times0.25)=-\log0.1\approx2.3026$。token lossの和でも同じ。

</details>

## 問題2

「SFT・instruction tuning」の導出を、最初の段階「1. response conditional probabilityをautoregressive factorizationする。」から始めて中心式まで再構成せよ。途中で「pretrained LMは一般textのnext-token distributionを学んでいる。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. response conditional probabilityをautoregressive factorizationする。
2. 負のlog likelihoodを取るとtoken cross entropyの和。
3. prompt tokenをloss maskする設計ではresponse tokenだけを直接教師信号にする。

pretrained LMは一般textのnext-token distributionを学んでいる。SFTではdataset $D={(x_i,y_i)}$ のinstruction xに対するresponse yのconditional likelihoodを最大化し、desired behavior distributionへparameterを移す。

responseはautoregressiveに factorizeされるので lossは $-\sum_t\log\pi_\theta(y_t|x,y_{<t})$。chat templateやsystem/user/assistant境界、loss maskは「どのtokenを教師信号として最適化するか」を決めるため、単なる前処理ではない。

</details>

## 問題3

図 `/visuals/course-10/frontier-supervised-finetuning-instruction-tuning.png` では「左のinstructionと任意のcontextがmodelへ入り、右側のresponse token列を生成する。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-supervised-finetuning-instruction-tuning.png" alt="SFT・instruction tuningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左のinstructionと任意のcontextがmodelへ入り、右側のresponse token列を生成する。lossを掛ける部分はresponse tokenに対応し、prompt tokenをmaskする設定では「入力を再現する」のでなく「この入力に対する望ましい応答」のconditional likelihoodを上げる。

</details>

## 問題4

「SFT・instruction tuning」の第二例「response2 tokenの正解確率が0.7,0.6ならlossは $-\log0.7-\log0.6\approx0.868$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

response2 tokenの正解確率が0.7,0.6ならlossは $-\log0.7-\log0.6\approx0.868$。sequenceが長い場合、sum/mean reductionの違いでgradient scaleが変わる。

</details>

## 問題5

SFT・instruction tuningで instruction/prompt、target response、model parameters は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-supervised-finetuning-instruction-tuning` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $x$ | instruction/prompt |
| $y$ | target response |
| $θ$ | model parameters |


- $x$：instruction/context。
- $y_{<t}$：response prefix。
- $\pi_\theta(y_t|x,y_{<t})$：正解tokenの条件付き確率。

</details>

## 問題6

警告「SFT dataの品質・coverage外のbehaviorは保証されない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

SFT dataの品質・coverage外のbehaviorは保証されない。また同じinstructionを大量重複するとdistributionが偏る。pretraining能力を壊すcatastrophic forgettingにも注意。

</details>

## 問題7

よくある誤り「SFT dataのstyle biasをmodel capabilityと混同しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- SFT dataのstyle biasをmodel capabilityと混同しない。
- train/eval contaminationを避ける。

SFT dataの品質・coverage外のbehaviorは保証されない。また同じinstructionを大量重複するとdistributionが偏る。pretraining能力を壊すcatastrophic forgettingにも注意。

</details>

## 問題8

「SFT・instruction tuning」の例題1を再計算し、その結果に対して次の検算を実行せよ：SFT lossをresponse tokenごとに展開し、prompt部分をloss maskする設定ならtarget responseだけが和に入っているか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$-\log(0.8\times0.5\times0.25)=-\log0.1\approx2.3026$。token lossの和でも同じ。

検算：
SFT lossをresponse tokenごとに展開し、prompt部分をloss maskする設定ならtarget responseだけが和に入っているか確認する。確率は各token位置で語彙全体に対して和1であり、sequence lossは対象tokenのnegative log-probabilityの和または平均になる。

</details>

## 問題9

後続への接続「PEFTはSFTなどのobjectiveを、全parameterではなくLoRA等の小さなparameter subsetで実現する手段。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

PEFTはSFTなどのobjectiveを、全parameterではなくLoRA等の小さなparameter subsetで実現する手段。SFTの後にpreference/RLHFで「どちらの応答がより望ましいか」という相対feedbackを追加する。

</details>

## 問題10

中心問題「pretrained LMを「指示に従うmodel」へ変える最初の段階は何を最適化しているか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t}) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「SFT dataの品質・coverage外のbehaviorは保証されない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $x$ | instruction/prompt |
| $y$ | target response |
| $θ$ | model parameters |


- $x$：instruction/context。
- $y_{<t}$：response prefix。
- $\pi_\theta(y_t|x,y_{<t})$：正解tokenの条件付き確率。

中心式：
$$
\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})
$$

導出：
1. response conditional probabilityをautoregressive factorizationする。
2. 負のlog likelihoodを取るとtoken cross entropyの和。
3. prompt tokenをloss maskする設計ではresponse tokenだけを直接教師信号にする。

根拠：
pretrained LMは一般textのnext-token distributionを学んでいる。SFTではdataset $D={(x_i,y_i)}$ のinstruction xに対するresponse yのconditional likelihoodを最大化し、desired behavior distributionへparameterを移す。

responseはautoregressiveに factorizeされるので lossは $-\sum_t\log\pi_\theta(y_t|x,y_{<t})$。chat templateやsystem/user/assistant境界、loss maskは「どのtokenを教師信号として最適化するか」を決めるため、単なる前処理ではない。

具体例：
**問題**：response 3 tokenの正解確率が0.8,0.5,0.25のときSFTのsequence NLLを求めよ。

**解答**：$-\log(0.8\times0.5\times0.25)=-\log0.1\approx2.3026$。token lossの和でも同じ。

失敗条件：
SFT dataの品質・coverage外のbehaviorは保証されない。また同じinstructionを大量重複するとdistributionが偏る。pretraining能力を壊すcatastrophic forgettingにも注意。

</details>
