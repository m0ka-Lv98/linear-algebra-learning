# seq2seq・encoder-decoder・teacher forcing：教科書

Course 09｜深層学習

## このTopicで解く問題

入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。

## なぜこの概念が必要か

encoderは入力系列を表現へ変換し、decoderは過去token条件付きで次token分布を生成する。teacher forcingでは訓練時に正解prefixを与える。

## 図の各要素は何を表しているか

<img src="/visuals/course-09/dl-seq2seq-teacher-forcing.png" alt="seq2seq・encoder-decoder・teacher forcingの図解" style="max-height: 480px; display:block; margin:0 auto;" />

左側の複数入力token $x_1,\dots,x_m$ がencoderへ入り、context/encoder statesがdecoderへ渡る。右側では時刻tのdecoderが過去target prefix $y_{<t}$ とencoder情報から $y_t$ の分布を出す。training時のteacher forcing矢印は、前時刻のmodel予測ではなく正解tokenを次step入力に使うことを表す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $x_{1:m}$ | 入力系列 |
| $y_{1:n}$ | 出力系列 |
| $p_θ(y_t|y_{<t},x)$ | 次token分布 |


- $x=x_{1:m}$：入力token列。
- $y=y_{1:n}$：target出力列。
- $y_{<t}$：時刻tより前のtarget prefix。
- $\pi_\theta$：decoderの条件付きtoken分布。

## 中心となる式

$$
\mathcal L=-\sum_{t=1}^n\log p_\theta(y_t\mid y_{<t},x)
$$

## 中心式を前提から導く

1. chain rule of probabilityで $p(y|x)=∏_t p(y_t|y_{<t},x)$。
2. negative logを取ると和になりtoken-level cross entropyになる。
3. teacher forcingは各条件 $y_{<t}$ にground-truth prefixを使う。

## なぜその変形をしてよいのか

conditional sequence probabilityは確率のchain ruleで $p(y_{1:n}|x)=\prod_{t=1}^n p(y_t|y_{<t},x)$。maximum likelihoodはこの積を最大化し、logを取れば和、negative logならtoken cross entropyになる。

teacher forcingではtraining時に条件prefixとしてground truthを使えるので各token lossを並列/安定に計算しやすい。一方inferenceでは自分の過去predictionを条件にするためdistribution mismatch（exposure bias）が生じる。

## sequence likelihoodをchain ruleから作る

入力系列を $\mathbf x=(x_1,\ldots,x_m)$、出力系列を $\mathbf y=(y_1,\ldots,y_n)$ とする。確率のchain ruleから

$$
p_\theta(\mathbf y|\mathbf x)
=\prod_{t=1}^n p_\theta(y_t|y_1,\ldots,y_{t-1},\mathbf x).
$$

maximum likelihoodはこの積を最大化するが、underflowと微分の扱いやすさのためlogを取り、negative log-likelihood

$$
\mathcal L(\theta)
=-\sum_{t=1}^n\log p_\theta(y_t|\mathbf y_{<t},\mathbf x)
$$

を最小化する。

teacher forcingはtraining時に条件 $\mathbf y_{<t}$ としてmodelの過去予測ではなく正解prefixを使う。よって各stepの条件分布を正しいhistory上で学べる一方、inference時には1個の誤りが次stepの入力分布を変える。これがexposure biasの出発点である。

## 2 token例

$p(y_1|x)=0.8$, $p(y_2|y_1,x)=0.5$ ならsequence probabilityは0.4、lossは $-\log0.4\approx0.916$。2つのtoken loss $-\log0.8$ と $-\log0.5$ の和と一致する。

## 例題1：具体的な数値・構造で解く

**問題**：target token列が2 tokenで、正解token確率が順に0.9,0.4のときteacher-forcing NLLを求めよ。

**解答**：$\mathcal L=-\log0.9-\log0.4\approx0.10536+0.91629=1.02165$。各時刻ではground-truth prefixを条件に確率を評価する。

## 例題2：別の条件で確認する

targetが[A,B]でmodelが $p(A|x)=0.8$, $p(B|A,x)=0.5$ ならsequence likelihood=0.4、negative log likelihood=$-\log0.8-\log0.5\approx0.916$。

## 結果の検算

training lossをtokenごとに展開し、時刻tの予測がground-truth prefix $y_{<t}$ のみを条件にしているか確認する。future tokenを入力へ混ぜていないか、padding tokenをlossへ含めていないか、inference時には予測prefixを使うというtrainingとの違いも確認する。

## 条件を外すと何が壊れるか

teacher forcingを「正解系列全体をdecoderが未来まで見てよい」と誤解しない。causal decoderでは時刻tは $y_{<t}$ だけを条件にし、未来targetはmaskする。

## よくある誤り

- training時のteacher forcingとinference時のautoregressive feedbackの差を無視しない。
- padding tokenをlossへ含めるmaskに注意する。

## 次のTopic・応用への接続

RNN encoder-decoderからattentionを導入すると固定長context bottleneckを緩和でき、Transformerではencoder/decoderのattention構造へ発展する。

## 参考

- sequence-to-sequence learning

[演習へ](/exercises/dl-seq2seq-teacher-forcing)　|　[スライドへ](/slides/dl-seq2seq-teacher-forcing/)
