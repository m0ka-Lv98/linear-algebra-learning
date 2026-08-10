# SFT・instruction tuning：教科書

Course 10｜Frontier

## このTopicで解く問題

pretrained LMを「指示に従うmodel」へ変える最初の段階は何を最適化しているか。

## なぜこの概念が必要か

SFTはinstruction-response pairに対するconditional language modeling。base modelの次token予測能力を、望ましい会話・指示応答分布へ寄せる。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-supervised-finetuning-instruction-tuning.png" alt="SFT・instruction tuningの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左のinstructionと任意のcontextがmodelへ入り、右側のresponse token列を生成する。lossを掛ける部分はresponse tokenに対応し、prompt tokenをmaskする設定では「入力を再現する」のでなく「この入力に対する望ましい応答」のconditional likelihoodを上げる。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $x$ | instruction/prompt |
| $y$ | target response |
| $θ$ | model parameters |


- $x$：instruction/context。
- $y_{<t}$：response prefix。
- $\pi_\theta(y_t|x,y_{<t})$：正解tokenの条件付き確率。

## 中心となる式

$$
\mathcal L_{SFT}=-\sum_t\log\pi_\theta(y_t\mid x,y_{<t})
$$

## 中心式を前提から導く

1. response conditional probabilityをautoregressive factorizationする。
2. 負のlog likelihoodを取るとtoken cross entropyの和。
3. prompt tokenをloss maskする設計ではresponse tokenだけを直接教師信号にする。

## なぜその変形をしてよいのか

pretrained LMは一般textのnext-token distributionを学んでいる。SFTではdataset $D={(x_i,y_i)}$ のinstruction xに対するresponse yのconditional likelihoodを最大化し、desired behavior distributionへparameterを移す。

responseはautoregressiveに factorizeされるので lossは $-\sum_t\log\pi_\theta(y_t|x,y_{<t})$。chat templateやsystem/user/assistant境界、loss maskは「どのtokenを教師信号として最適化するか」を決めるため、単なる前処理ではない。

## SFT objectiveをtoken単位まで書く

instruction/contextを $x$、assistant responseを $y_{1:T}$ とすると

$$
\mathcal L_{SFT}(\theta)
=-\sum_{t=1}^T m_t\log\pi_\theta(y_t|x,y_{<t}).
$$

$m_t\in\{0,1\}$ はloss maskで、assistant responseだけ学習させるならprompt tokenでは0、target response tokenでは1とする。chat templateは単なる表示形式ではなく、どのtoken列を条件とtargetへ分割するかを決める。

2 tokenの正解確率が0.7, 0.6で両方mask=1ならlossは $-\log0.7-\log0.6\approx0.868$。mean reductionなら有効token数で割るため、sequence lengthやpacking方法によってgradient scaleが変わり得る。

SFTはpreference optimizationの前に「望ましい応答領域へpolicyを移す」役割を持つ。PEFT/LoRAはこの同じobjectiveを少数のtrainable parameterで最適化する**手段**であり、SFTより概念的に先ではない。

## 例題1：具体的な数値・構造で解く

**問題**：response 3 tokenの正解確率が0.8,0.5,0.25のときSFTのsequence NLLを求めよ。

**解答**：$-\log(0.8\times0.5\times0.25)=-\log0.1\approx2.3026$。token lossの和でも同じ。

## 例題2：別の条件で確認する

response2 tokenの正解確率が0.7,0.6ならlossは $-\log0.7-\log0.6\approx0.868$。sequenceが長い場合、sum/mean reductionの違いでgradient scaleが変わる。

## 結果の検算

SFT lossをresponse tokenごとに展開し、prompt部分をloss maskする設定ならtarget responseだけが和に入っているか確認する。確率は各token位置で語彙全体に対して和1であり、sequence lossは対象tokenのnegative log-probabilityの和または平均になる。

## 条件を外すと何が壊れるか

SFT dataの品質・coverage外のbehaviorは保証されない。また同じinstructionを大量重複するとdistributionが偏る。pretraining能力を壊すcatastrophic forgettingにも注意。

## よくある誤り

- SFT dataのstyle biasをmodel capabilityと混同しない。
- train/eval contaminationを避ける。

## 次のTopic・応用への接続

PEFTはSFTなどのobjectiveを、全parameterではなくLoRA等の小さなparameter subsetで実現する手段。SFTの後にpreference/RLHFで「どちらの応答がより望ましいか」という相対feedbackを追加する。

## 参考

- InstructGPT arXiv:2203.02155

[演習へ](/exercises/frontier-supervised-finetuning-instruction-tuning)　|　[スライドへ](/slides/frontier-supervised-finetuning-instruction-tuning/)
