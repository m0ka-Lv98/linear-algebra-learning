# autoencoderとVAE：教科書

Course 09｜深層学習｜Topic 11/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-normalization-residuals` で得た概念を使い、ここでは autoencoderとVAE へ進む。

前提として使うのは `ml-dimensionality-reduction-pca-manifold`、`stat-bayesian-inference-map` です。

## まず直感を作る

潜在変数modelは観測を低次元latentへ圧縮し、latentから再構成する。VAEではlatentを確率分布として扱う。



## 図の解説

<img src="/visuals/course-09/dl-autoencoders-vae.png" alt="autoencoderとVAEの図解" style="max-height: 440px; display:block; margin:0 auto;" />

2次元latent空間に点を配置し、再構成との対応を描く。 観測xを低次元潜在zへencodeし、zからxをdecodeする。VAEではzを1点でなく分布として扱い、再構成とpriorへの近さを同時に最適化する。

## 記号・型・次元

- $q_\phi(z|x)$：encoder approximate posterior
- $p_\theta(x|z)$：decoder likelihood
- $p(z)$：prior
- ELBO


## 正式な定義・代表式

VAEはlatent-variable modelのlog evidenceをlower bound(ELBO)で学習。reconstruction termとKL regularizationを同時最適化。

代表式は

$$
\mathcal{L}=\mathbb{E}_{q_\phi(\mathbf{z}\mid\mathbf{x})}[\log p_\theta(\mathbf{x}\mid\mathbf{z})]-D_{KL}(q_\phi\|p)
$$

です。

## なぜこの式・結論になるのか

### 1. evidence identity

$\log p(x)=ELBO + D_{KL}(q(z|x)||p(z|x))$。KL≥0なのでELBO≤log evidence。

### 2. ELBO

$E_q[\log p_\theta(x|z)]-D_{KL}(q_\phi(z|x)||p(z))$。

### 3. reparameterization

Gaussian qで $z=\mu_\phi(x)+\sigma_\phi(x)\odot\epsilon,\epsilon\sim N(0,I)$ と書きrandomnessをparameter外へ出してgradient。

## 教科書が省略しやすい一段を補う


### VAEのELBOを「reconstruction + KL」に分ける

latent model $p_\theta(x,z)=p(z)p_\theta(x|z)$ のlog marginal $\log p(x)=\log\int p(x,z)dz$ は直接難しい。approx posterior $q_\phi(z|x)$ を入れると
$$
\log p(x)=\mathrm{ELBO}+D_{KL}(q_\phi(z|x)\|p_\theta(z|x)),
$$
KL≥0なのでELBOはlower bound。ELBOは $E_q[\log p_\theta(x|z)]-D_{KL}(q_\phi(z|x)\|p(z))$。

reparameterization $z=\mu+\sigma\odot\epsilon$ でrandomnessをepsilonへ移しencoder parametersへgradientを流す。ordinary autoencoderのdeterministic bottleneckとprobabilistic latent modelを区別する。


### KL termがposterior collapseへつながる場合

ELBOでKL weightが強すぎたりdecoderが非常に強いと、q(z|x)がprior p(z)に近づきzがx情報をほとんど持たなくてもdecoderが再構成/生成できる場合がある。これがposterior collapse。

reconstructionだけ良いこととuseful latent representationが得られたことは別。KL, mutual information proxy, latent traversal, downstream utilityを分けて評価する。

## 途中を飛ばさず全体をつなぐ

### autoencoderとVAEの導出を一本につなげる

VAEはlatent-variable modelのlog evidenceをlower bound(ELBO)で学習。reconstruction termとKL regularizationを同時最適化。

#### 1. evidence identity

まず出発点を固定する。 $\log p(x)=ELBO + D_{KL}(q(z|x)||p(z|x))$。KL≥0なのでELBO≤log evidence。 次に必要になるのは「ELBO」である。

#### 2. ELBO

ここまでで得た結果を次の段階へ渡す。 $E_q[\log p_\theta(x|z)]-D_{KL}(q_\phi(z|x)||p(z))$。 次に必要になるのは「reparameterization」である。

#### 3. reparameterization

最後に、前二段階の結果をまとめて結論へ進む。 Gaussian qで $z=\mu_\phi(x)+\sigma_\phi(x)\odot\epsilon,\epsilon\sim N(0,I)$ と書きrandomnessをparameter外へ出してgradient。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathcal{L}=\mathbb{E}_{q_\phi(\mathbf{z}\mid\mathbf{x})}[\log p_\theta(\mathbf{x}\mid\mathbf{z})]-D_{KL}(q_\phi\|p)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

1D latent normal encoderのμ,σからsampleしdecoder reconstruction。KLがposteriorをprior近くへ。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

β-VAEはKL weight変更でreconstruction/disentanglement tradeoff。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

deterministic autoencoderのreconstruction lossだけではvalid generative prior samplingを保証しない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

1D latent normal encoderのμ,σからsampleしdecoder reconstruction。KLがposteriorをprior近くへ。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

β-VAEはKL weight変更でreconstruction/disentanglement tradeoff。

## 成立条件と、条件を外したときに何が壊れるか

- 再構成誤差だけでは表現の意味は保証されない。
- KL項と再構成項のバランスを見る。
- autoencoderとVAEの定義と計算手順を区別し、数値例だけで一般性を判断しない。

deterministic autoencoderのreconstruction lossだけではvalid generative prior samplingを保証しない。

## よくある誤解を分解する

- autoencoderとVAEの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

autoencoderとVAEでは、式へ数値を代入するだけでは不十分である。deterministic autoencoderのreconstruction lossだけではvalid generative prior samplingを保証しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

KL analytic formula、posterior collapse、decoder likelihood(Bernoulli/Gaussian)に合わせたloss。

## ここから一段だけ発展する

implicit generatorとdiscriminator gameでdistribution matchingするGANへ。


## このTopicを理解できたか確認する問い

- 「evidence identity」を式を見ずに説明できるか
- 「reparameterization」までの論理を一段ずつ再現できるか
- autoencoderとVAEの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-autoencoders-vae)　|　[スライドへ](/slides/dl-autoencoders-vae/)
