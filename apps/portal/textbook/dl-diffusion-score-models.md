# diffusionとscore model：教科書

Course 09｜深層学習｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-gans-adversarial-training` で得た概念を使い、ここでは diffusionとscore model へ進む。

前提として使うのは `prob-continuous-distributions`、`num-ode-euler-runge-kutta` です。

## まず直感を作る

diffusionはデータへ段階的にnoiseを加えるforward過程と、noiseを除いて戻すreverse過程を学習する。



## 図の解説

<img src="/visuals/course-09/dl-diffusion-score-models.png" alt="diffusionとscore modelの図解" style="max-height: 440px; display:block; margin:0 auto;" />

画像状の点群がnoise化し、逆に構造へ戻る過程を描く。 前向き過程で徐々にnoiseを加え、逆過程では各noise levelから少しずつdenoiseする。多数の小さな逆遷移を学習することで複雑な分布を生成する。

## 記号・型・次元

- $x_0$：data
- $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\epsilon$
- $\epsilon\sim N(0,I)$
- $\epsilon_\theta(x_t,t)$：noise predictor


## 正式な定義・代表式

diffusionはforward processでdataへ段階的Gaussian noiseを加え、networkでreverse denoising transition/scoreを学習してnoiseからsample生成。

代表式は

$$
\mathbf{x}_t=\sqrt{\bar{\alpha}_t}\mathbf{x}_0+\sqrt{1-\bar{\alpha}_t}\boldsymbol{\varepsilon}
$$

です。

## なぜこの式・結論になるのか

### 1. closed-form noising

Gaussian Markov stepsを合成すると任意tのx_tをx0と1個のstandard noiseのlinear combinationとしてsampleできる。

### 2. training target

生成したεが既知なのでnetworkへx_t,tを与えε prediction MSEを学習できる。

### 3. reverse

noise predictionからscore/conditional meanを構成し、t=T→0へiterateしてsample。

## 教科書が省略しやすい一段を補う


### forward noise processを学習可能な逆問題へ変える

forward diffusionはdataへsmall Gaussian noiseを段階的に加え、最終的にsimple normalへ近づける。Gaussian scheduleでは任意time tのnoisy sampleをclean x0から直接samplingできる閉形式があるためtraining時に全stepをsimulateする必要がない。

modelはnoise ε、score $\nabla_x\log p_t(x)$、またはx0等をpredictするparameterizationを学ぶ。reverse processではhigh noiseからmodel予測で少しずつdenoise。generation costはmany stepsだがstable likelihood-related trainingが利点。sampler choiceでstep数とqualityが変わる。


### noise-prediction lossとscoreの関係

Gaussian perturbation $x_t=\alpha_t x_0+\sigma_t\epsilon$ では conditional score $\nabla_{x_t}\log q(x_t|x_0)=-(x_t-\alpha_tx_0)/\sigma_t^2=-\epsilon/\sigma_t$。したがってnoise εをpredictするmodelはscale変換すればscoreをpredictしている。

この関係からdenoising objectiveとreverse SDE/ODE viewが接続する。parameterizationごとにloss weightingがtime levelsの学習balanceを変える。

## 途中を飛ばさず全体をつなぐ

### diffusionとscore modelの導出を一本につなげる

diffusionはforward processでdataへ段階的Gaussian noiseを加え、networkでreverse denoising transition/scoreを学習してnoiseからsample生成。

#### 1. closed-form noising

まず出発点を固定する。 Gaussian Markov stepsを合成すると任意tのx_tをx0と1個のstandard noiseのlinear combinationとしてsampleできる。 次に必要になるのは「training target」である。

#### 2. training target

ここまでで得た結果を次の段階へ渡す。 生成したεが既知なのでnetworkへx_t,tを与えε prediction MSEを学習できる。 次に必要になるのは「reverse」である。

#### 3. reverse

最後に、前二段階の結果をまとめて結論へ進む。 noise predictionからscore/conditional meanを構成し、t=T→0へiterateしてsample。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_t=\sqrt{\bar{\alpha}_t}\mathbf{x}_0+\sqrt{1-\bar{\alpha}_t}\boldsymbol{\varepsilon}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

t smallではx_tほぼdata、t largeではnoise dominant。networkはnoise levelに応じdenoise。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

classifier-free guidanceはconditional/unconditional predictionsをcombineしcondition strengthを調整。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

forward formulaだけでgenerationできない。learned reverse dynamicsが必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

t smallではx_tほぼdata、t largeではnoise dominant。networkはnoise levelに応じdenoise。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

classifier-free guidanceはconditional/unconditional predictionsをcombineしcondition strengthを調整。

## 成立条件と、条件を外したときに何が壊れるか

- 時刻tのnoise scheduleが重要。
- 生成step数と品質・速度を分けて考える。
- diffusionとscore modelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

forward formulaだけでgenerationできない。learned reverse dynamicsが必要。

## よくある誤解を分解する

- diffusionとscore modelの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

diffusionとscore modelでは、式へ数値を代入するだけでは不十分である。forward formulaだけでgenerationできない。learned reverse dynamicsが必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

schedule, prediction target(ε/v/x0), sampler steps、guidance scaleを記録。

## ここから一段だけ発展する

label無しdataからrepresentationを学ぶcontrastive/self-supervised objectivesへ。


## このTopicを理解できたか確認する問い

- 「closed-form noising」を式を見ずに説明できるか
- 「reverse」までの論理を一段ずつ再現できるか
- diffusionとscore modelの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-diffusion-score-models)　|　[スライドへ](/slides/dl-diffusion-score-models/)
