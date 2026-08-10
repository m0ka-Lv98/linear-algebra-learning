# Fisher情報量とMLEの漸近分布：教科書

Course 03｜確率統計

## このTopicで解く問題

尤度の「尖り具合」が、推定量の精度とどう結びつくか。

## なぜこの概念が必要か

真のパラメータ付近でlog-likelihoodが急に曲がるほど、少しパラメータをずらしたときデータ分布が大きく変わる。これを平均曲率として測るのがFisher情報量。

## 図の各要素は何を表しているか

<img src="/visuals/course-03/stat-fisher-information-asymptotic-mle.png" alt="Fisher情報量とMLEの漸近分布の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸がパラメータ $\theta$、縦軸がlog-likelihood。幅広い曲線と尖った曲線を同じ最大点付近で比較し、尖った方ほど二階微分の絶対値が大きい。Fisher情報量はこの局所曲率を平均的に測るため、尖った尤度ほどMLEの漸近分散 $1/[nI(\theta_0)]$ が小さくなる。

## 記号・型・定義域

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

## 中心となる式

$$
\sqrt n(\hat\theta-\theta_0)\xrightarrow{d}N(0,I(\theta_0)^{-1})
$$

## 中心式を前提から導く

1. score $s(θ)=\partialℓ/\partialθ$ を真値周りでTaylor展開する。
2. MLEではscore=0なので、$0\approx s(θ_0)+(θ̂-θ_0)ℓ\prime\prime(θ_0)$。
3. scoreのCLTとHessianの大数則から漸近正規性を得る。

## なぜその変形をしてよいのか

1標本のlog-likelihoodを $\ell_1(\theta)=\log p_\theta(X)$、scoreを $s_1(\theta)=\partial\ell_1/\partial\theta$ とする。正則条件の下で $E[s_1(\theta_0)]=0$、$I(\theta_0)=E[s_1^2]=-E[\ell_1\prime\prime]$。n標本ではscoreが和なのでCLTにより $s_n(\theta_0)/\sqrt n\Rightarrow N(0,I)$。

MLEは $s_n(\hat\theta)=0$ を満たす。真値周りでTaylor展開して $0=s_n(\theta_0)+(\hat\theta-\theta_0)s_n\prime(\tilde\theta)$。両辺を $\sqrt n$ スケールで整理し、$-s_n\prime/n\to I$ を使うと $\sqrt n(\hat\theta-\theta_0)\Rightarrow N(0,I^{-1})$。

## scoreとFisher情報を定義からつなぐ

1標本のlog-likelihoodを $\ell(\theta;X)=\log p_\theta(X)$ とし、scoreを

$$
s_\theta(X)=\frac{\partial}{\partial\theta}\ell(\theta;X)
$$

と定義する。正則条件の下では

$$
E_\theta[s_\theta(X)]=0
$$

であり、1標本のFisher情報量は

$$
I(\theta)=E_\theta[s_\theta(X)^2]
=-E_\theta\left[\frac{\partial^2}{\partial\theta^2}\ell(\theta;X)\right]
$$

と等価に書ける。前者はscoreの揺らぎ、後者は平均的なlog-likelihood曲率で、同じ「parameterを少し動かしたとき分布がどれだけ変わるか」を測っている。

## MLE漸近正規性を1行ずつ追う

$n$ 標本のscoreを $S_n(\theta)=\sum_{i=1}^n s_\theta(X_i)$ とする。MLE $\hat\theta$ の内点解では $S_n(\hat\theta)=0$。真値 $\theta_0$ 周りでTaylor展開すると

$$
0=S_n(\theta_0)
+(\hat\theta-\theta_0)S_n'(\tilde\theta)
$$

となるので

$$
\sqrt n(\hat\theta-\theta_0)
=-\frac{S_n(\theta_0)/\sqrt n}{S_n'(\tilde\theta)/n}.
$$

分子はCLTにより $N(0,I(\theta_0))$ へ、分母は大数の法則により $-I(\theta_0)$ へ収束する。Slutskyの定理を使えば

$$
\sqrt n(\hat\theta-\theta_0)
\xrightarrow{d}N\!\left(0,I(\theta_0)^{-1}\right).
$$

ここで $\xrightarrow{d}$ は分布収束、$N(0,v)$ は平均0・分散$v$の正規分布を表す。境界parameter、識別不能model、Fisher情報が0/無限大になる場合にはこの通常形が壊れる。

## 例題1：具体的な数値・構造で解く

**問題**：Bernoulli(p)で $p=0.25$, $n=100$ のとき、MLE $\hat p$ のFisher情報に基づく漸近標準誤差を求めよ。

**解答**：1標本情報量 $I(p)=1/[p(1-p)]=1/0.1875$。n標本の漸近分散は $1/[nI]=p(1-p)/n=0.001875$。標準誤差は $\sqrt{0.001875}\approx0.0433$。

## 例題2：別の条件で確認する

Bernoulli(p)では $s=(X-p)/[p(1-p)]$。分散を取ると $I(p)=1/[p(1-p)]$。n標本MLE $\hat p=\bar X$ の分散 $p(1-p)/n$ は $1/[nI(p)]$ と一致する。

## 結果の検算

Bernoulli例では $I(p)=1/[p(1-p)]$ から $1/[nI(p)]=p(1-p)/n$ を計算し、標本平均の既知の分散と一致することを確認する。$p\to0$ や1の境界では通常の正則近似が怪しくなるため、漸近式を無条件に外挿しない。

## 条件を外すと何が壊れるか

境界点、識別不能、mixture modelの特異点など正則条件が壊れると通常の $\sqrt n$ 正規近似が成立しないことがある。「MLEなら必ず正規」とは言えない。

## よくある誤り

- 有限標本で漸近近似が正確とは限らない。
- 境界パラメータや識別不能modelでは通常の正則条件が壊れる。

## 次のTopic・応用への接続

Cramér–Rao下界、Wald/LR/score検定、natural gradientへつながる。深層学習でもFisher行列はparameter spaceの局所geometryとして現れる。

## 参考

- MIT 18.05; classical likelihood theory

[演習へ](/exercises/stat-fisher-information-asymptotic-mle)　|　[スライドへ](/slides/stat-fisher-information-asymptotic-mle/)
