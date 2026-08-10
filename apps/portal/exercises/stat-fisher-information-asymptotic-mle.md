# Fisher情報量とMLEの漸近分布：演習

Course 03｜確率統計

[教科書](/textbook/stat-fisher-information-asymptotic-mle)

## 問題1

Bernoulli(p)で $p=0.25$, $n=100$ のとき、MLE $\hat p$ のFisher情報に基づく漸近標準誤差を求めよ。

<details><summary>完全解答</summary>

1標本情報量 $I(p)=1/[p(1-p)]=1/0.1875$。n標本の漸近分散は $1/[nI]=p(1-p)/n=0.001875$。標準誤差は $\sqrt{0.001875}\approx0.0433$。

</details>

## 問題2

「Fisher情報量とMLEの漸近分布」の導出を、最初の段階「1. score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。」から始めて中心式まで再構成せよ。途中で「1標本のlog-likelihoodを $\ell_1(\theta)=\log p_\theta(X)$、scoreを $s_1(\theta)=\partial\ell_1/\partial\theta$ とする。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。
2. MLEではscore=0なので、$0\approx s(θ_0)+(θ̂-θ_0)ℓ\prime\prime(θ_0)$。
3. scoreのCLTとHessianの大数則から漸近正規性を得る。

1標本のlog-likelihoodを $\ell_1(\theta)=\log p_\theta(X)$、scoreを $s_1(\theta)=\partial\ell_1/\partial\theta$ とする。正則条件の下で $E[s_1(\theta_0)]=0$、$I(\theta_0)=E[s_1^2]=-E[\ell_1\prime\prime]$。n標本ではscoreが和なのでCLTにより $s_n(\theta_0)/\sqrt n\Rightarrow N(0,I)$。

MLEは $s_n(\hat\theta)=0$ を満たす。真値周りでTaylor展開して $0=s_n(\theta_0)+(\hat\theta-\theta_0)s_n\prime(\tilde\theta)$。両辺を $\sqrt n$ スケールで整理し、$-s_n\prime/n\to I$ を使うと $\sqrt n(\hat\theta-\theta_0)\Rightarrow N(0,I^{-1})$。

</details>

## 問題3

図 `/visuals/course-03/stat-fisher-information-asymptotic-mle.png` では「横軸がパラメータ $\theta$、縦軸がlog-likelihood。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-03/stat-fisher-information-asymptotic-mle.png" alt="Fisher情報量とMLEの漸近分布の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がパラメータ $\theta$、縦軸がlog-likelihood。幅広い曲線と尖った曲線を同じ最大点付近で比較し、尖った方ほど二階微分の絶対値が大きい。Fisher情報量はこの局所曲率を平均的に測るため、尖った尤度ほどMLEの漸近分散 $1/[nI(\theta_0)]$ が小さくなる。

</details>

## 問題4

「Fisher情報量とMLEの漸近分布」の第二例「Bernoulli(p)では $s=(X-p)/[p(1-p)]$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

Bernoulli(p)では $s=(X-p)/[p(1-p)]$。分散を取ると $I(p)=1/[p(1-p)]$。n標本MLE $\hat p=\bar X$ の分散 $p(1-p)/n$ は $1/[nI(p)]$ と一致する。

</details>

## 問題5

Fisher情報量とMLEの漸近分布で log-likelihood、Fisher情報量、最尤推定量 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`stat-fisher-information-asymptotic-mle` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $ℓ(θ)$ | log-likelihood |
| $I(θ)$ | Fisher情報量 |
| $θ̂_MLE$ | 最尤推定量 |


- $\theta_0$：真のparameter。
- $\hat\theta$：MLE。
- $n$：iid標本数。
- $I(\theta_0)$：1標本あたりFisher情報量。
- $\xrightarrow{d}$：分布収束。

</details>

## 問題6

警告「境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。「MLEなら必ず正規」とは言えない。

</details>

## 問題7

よくある誤り「有限標本で漸近近似が正確とは限らない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- 有限標本で漸近近似が正確とは限らない。
- 境界パラメータや識別不能modelでは通常の正則条件が壊れる。

境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。「MLEなら必ず正規」とは言えない。

</details>

## 問題8

「Fisher情報量とMLEの漸近分布」の例題1を再計算し、その結果に対して次の検算を実行せよ：Bernoulli例では $I(p)=1/[p(1-p)]$ から $1/[nI(p)]=p(1-p)/n$ を計算し、標本平均の既知の分散と一致することを確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

1標本情報量 $I(p)=1/[p(1-p)]=1/0.1875$。n標本の漸近分散は $1/[nI]=p(1-p)/n=0.001875$。標準誤差は $\sqrt{0.001875}\approx0.0433$。

検算：
Bernoulli例では $I(p)=1/[p(1-p)]$ から $1/[nI(p)]=p(1-p)/n$ を計算し、標本平均の既知の分散と一致することを確認する。$p\to0$ や1の境界では通常の正則近似が怪しくなるため、漸近式を無条件に外挿しない。

</details>

## 問題9

後続への接続「Cramér–Rao下界、Wald/LR/score検定、natural gradientへつながる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

Cramér–Rao下界、Wald/LR/score検定、natural gradientへつながる。深層学習でもFisher行列はparameter spaceの局所geometryとして現れる。

</details>

## 問題10

中心問題「尤度の「尖り具合」が、推定量の精度とどう結びつくか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1}) $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $ℓ(θ)$ | log-likelihood |
| $I(θ)$ | Fisher情報量 |
| $θ̂_MLE$ | 最尤推定量 |


- $\theta_0$：真のparameter。
- $\hat\theta$：MLE。
- $n$：iid標本数。
- $I(\theta_0)$：1標本あたりFisher情報量。
- $\xrightarrow{d}$：分布収束。

中心式：
$$
\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})
$$

導出：
1. score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。
2. MLEではscore=0なので、$0\approx s(θ_0)+(θ̂-θ_0)ℓ\prime\prime(θ_0)$。
3. scoreのCLTとHessianの大数則から漸近正規性を得る。

根拠：
1標本のlog-likelihoodを $\ell_1(\theta)=\log p_\theta(X)$、scoreを $s_1(\theta)=\partial\ell_1/\partial\theta$ とする。正則条件の下で $E[s_1(\theta_0)]=0$、$I(\theta_0)=E[s_1^2]=-E[\ell_1\prime\prime]$。n標本ではscoreが和なのでCLTにより $s_n(\theta_0)/\sqrt n\Rightarrow N(0,I)$。

MLEは $s_n(\hat\theta)=0$ を満たす。真値周りでTaylor展開して $0=s_n(\theta_0)+(\hat\theta-\theta_0)s_n\prime(\tilde\theta)$。両辺を $\sqrt n$ スケールで整理し、$-s_n\prime/n\to I$ を使うと $\sqrt n(\hat\theta-\theta_0)\Rightarrow N(0,I^{-1})$。

具体例：
**問題**：Bernoulli(p)で $p=0.25$, $n=100$ のとき、MLE $\hat p$ のFisher情報に基づく漸近標準誤差を求めよ。

**解答**：1標本情報量 $I(p)=1/[p(1-p)]=1/0.1875$。n標本の漸近分散は $1/[nI]=p(1-p)/n=0.001875$。標準誤差は $\sqrt{0.001875}\approx0.0433$。

失敗条件：
境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。「MLEなら必ず正規」とは言えない。

</details>
