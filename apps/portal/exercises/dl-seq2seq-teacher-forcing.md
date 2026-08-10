# seq2seq・encoder-decoder・teacher forcing：演習

Course 09｜深層学習

[教科書](/textbook/dl-seq2seq-teacher-forcing)

## 問題1

target token列が2 tokenで、正解token確率が順に0.9,0.4のときteacher-forcing NLLを求めよ。

<details><summary>完全解答</summary>

$\mathcal L=-\log0.9-\log0.4\approx0.10536+0.91629=1.02165$。各時刻ではground-truth prefixを条件に確率を評価する。

</details>

## 問題2

「seq2seq・encoder-decoder・teacher forcing」の導出を、最初の段階「1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。」から始めて中心式まで再構成せよ。途中で「conditional sequence probabilityは確率のchain ruleで $p(y_{1:n}|x)=\prod_{t=1}^n p(y_t|y_{<t},x)$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。
2. negative logを取ると和になりtoken-level cross entropyになる。
3. teacher forcingは各条件 $y_{<t}$ にground-truth prefixを使う。

conditional sequence probabilityは確率のchain ruleで $p(y_{1:n}|x)=\prod_{t=1}^n p(y_t|y_{<t},x)$。maximum likelihoodはこの積を最大化し、logを取れば和、negative logならtoken cross entropyになる。

teacher forcingではtraining時に条件prefixとしてground truthを使えるので各token lossを並列/安定に計算しやすい。一方inferenceでは自分の過去predictionを条件にするためdistribution mismatch（exposure bias）が生じる。

</details>

## 問題3

図 `/visuals/course-09/dl-seq2seq-teacher-forcing.png` では「左側の複数入力token $x_1,\dots,x_m$ がencoderへ入り、context/encoder statesがdecoderへ渡る。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-09/dl-seq2seq-teacher-forcing.png" alt="seq2seq・encoder-decoder・teacher forcingの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左側の複数入力token $x_1,\dots,x_m$ がencoderへ入り、context/encoder statesがdecoderへ渡る。右側では時刻tのdecoderが過去target prefix $y_{<t}$ とencoder情報から $y_t$ の分布を出す。training時のteacher forcing矢印は、前時刻のmodel予測ではなく正解tokenを次step入力に使うことを表す。

</details>

## 問題4

「seq2seq・encoder-decoder・teacher forcing」の第二例「targetが[A,B]でmodelが $p(A|x)=0.8$, $p(B|A,x)=0.5$ ならsequence likelihood=0.4、negative log likelihood=$-\log0.8-\log0.5\approx0.916$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

targetが[A,B]でmodelが $p(A|x)=0.8$, $p(B|A,x)=0.5$ ならsequence likelihood=0.4、negative log likelihood=$-\log0.8-\log0.5\approx0.916$。

</details>

## 問題5

seq2seq・encoder-decoder・teacher forcingで 入力系列、出力系列、次token分布 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`dl-seq2seq-teacher-forcing` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $x_{1:m}$ | 入力系列 |
| $y_{1:n}$ | 出力系列 |
| $p_θ(y_t|y_{<t},x)$ | 次token分布 |


- $x=x_{1:m}$：入力token列。
- $y=y_{1:n}$：target出力列。
- $y_{<t}$：時刻tより前のtarget prefix。
- $\pi_\theta$：decoderの条件付きtoken分布。

</details>

## 問題6

警告「teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。causal decoderでは時刻tは $y_{<t}$ だけを条件にし、未来targetはmaskする。

</details>

## 問題7

よくある誤り「training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。
- padding tokenをlossへ含めるmaskに注意する。

teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。causal decoderでは時刻tは $y_{<t}$ だけを条件にし、未来targetはmaskする。

</details>

## 問題8

「seq2seq・encoder-decoder・teacher forcing」の例題1を再計算し、その結果に対して次の検算を実行せよ：training lossをtokenごとに展開し、時刻tの予測がground-truth prefix $y_{<t}$ のみを条件にしているか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$\mathcal L=-\log0.9-\log0.4\approx0.10536+0.91629=1.02165$。各時刻ではground-truth prefixを条件に確率を評価する。

検算：
training lossをtokenごとに展開し、時刻tの予測がground-truth prefix $y_{<t}$ のみを条件にしているか確認する。future tokenを入力へ混ぜていないか、padding tokenをlossへ含めていないか、inference時には予測prefixを使うというtrainingとの違いも確認する。

</details>

## 問題9

後続への接続「RNN encoder-decoderからattentionを導入すると固定長context bottleneckを緩和でき、Transformerではencoder/decoderのattention構造へ発展する。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

RNN encoder-decoderからattentionを導入すると固定長context bottleneckを緩和でき、Transformerではencoder/decoderのattention構造へ発展する。

</details>

## 問題10

中心問題「入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $x_{1:m}$ | 入力系列 |
| $y_{1:n}$ | 出力系列 |
| $p_θ(y_t|y_{<t},x)$ | 次token分布 |


- $x=x_{1:m}$：入力token列。
- $y=y_{1:n}$：target出力列。
- $y_{<t}$：時刻tより前のtarget prefix。
- $\pi_\theta$：decoderの条件付きtoken分布。

中心式：
$$
\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)
$$

導出：
1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。
2. negative logを取ると和になりtoken-level cross entropyになる。
3. teacher forcingは各条件 $y_{<t}$ にground-truth prefixを使う。

根拠：
conditional sequence probabilityは確率のchain ruleで $p(y_{1:n}|x)=\prod_{t=1}^n p(y_t|y_{<t},x)$。maximum likelihoodはこの積を最大化し、logを取れば和、negative logならtoken cross entropyになる。

teacher forcingではtraining時に条件prefixとしてground truthを使えるので各token lossを並列/安定に計算しやすい。一方inferenceでは自分の過去predictionを条件にするためdistribution mismatch（exposure bias）が生じる。

具体例：
**問題**：target token列が2 tokenで、正解token確率が順に0.9,0.4のときteacher-forcing NLLを求めよ。

**解答**：$\mathcal L=-\log0.9-\log0.4\approx0.10536+0.91629=1.02165$。各時刻ではground-truth prefixを条件に確率を評価する。

失敗条件：
teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。causal decoderでは時刻tは $y_{<t}$ だけを条件にし、未来targetはmaskする。

</details>
