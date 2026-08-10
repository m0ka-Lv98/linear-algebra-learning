# RNNと系列model：教科書

Course 09｜深層学習｜Topic 07/20

## このTopicは、前の何を受けて始まるか

前Topic `dl-cnn-convolution` で得た概念を使い、ここでは RNNと系列model へ進む。

前提として使うのは `dl-perceptron-mlp`、`dm-recurrence-relations` です。

## まず直感を作る

系列modelは時刻ごとの入力と過去状態を組み合わせ、順序依存の情報を保持する。



## 図の解説

<img src="/visuals/course-09/dl-rnn-sequence-models.png" alt="RNNと系列modelの図解" style="max-height: 440px; display:block; margin:0 auto;" />

時系列nodeを左から右へつなぎ、hidden stateが伝わる様子を見る。 時刻tのhidden stateが過去情報を次時刻へ運ぶ。長い依存では同じJacobian積が繰り返されるためgradientが消失・爆発しやすい。

## 記号・型・次元

- $x_t$：time t input
- $h_t$：hidden state
- $W_h,W_x$
- $h_t=\phi(W_hh_{t-1}+W_xx_t)$


## 正式な定義・代表式

RNNは同じtransitionをtime stepsで共有し、past情報をhidden stateへ圧縮するsequence model。

代表式は

$$
\mathbf{h}_t=\phi(\mathbf{W}_h\mathbf{h}_{t-1}+\mathbf{W}_x\mathbf{x}_t)
$$

です。

## なぜこの式・結論になるのか

### 1. recurrent composition

$h_t=F(h_{t-1},x_t)$ をunrollするとh_tはx_1…x_tのnested composition。

### 2. parameter sharing

同じW_h,W_xを全tで使うためsequence lengthにparameter数が比例しない。

### 3. BPTT gradient

gradientはW_h Jacobian productsをtime方向へ掛けるためeigen/singular scaleでvanishing/exploding。

## 教科書が省略しやすい一段を補う


### recurrent Jacobianの積が長期依存を難しくする

RNN $h_t=\phi(W_hh_{t-1}+W_xx_t)$ でloss at Tをh_tへbackpropすると、$\partial h_T/\partial h_t$ は各time step Jacobianの積。spectral norms/eigenvaluesが1より小さい方向は指数的にvanish、大きい方向はexplodeしやすい。

LSTM/GRUはadditive memory pathとgatesでgradientをより直接流す。teacher forcing, autoregressive inferenceのdistribution mismatchも別問題。sequence length、hidden state、maskingをshapeとして追う。attentionはこの逐次bottleneckを異なる方式で扱う次Topic。



## 途中を飛ばさず全体をつなぐ

### RNNと系列modelの導出を一本につなげる

RNNは同じtransitionをtime stepsで共有し、past情報をhidden stateへ圧縮するsequence model。

#### 1. recurrent composition

まず出発点を固定する。 $h_t=F(h_{t-1},x_t)$ をunrollするとh_tはx_1…x_tのnested composition。 次に必要になるのは「parameter sharing」である。

#### 2. parameter sharing

ここまでで得た結果を次の段階へ渡す。 同じW_h,W_xを全tで使うためsequence lengthにparameter数が比例しない。 次に必要になるのは「BPTT gradient」である。

#### 3. BPTT gradient

最後に、前二段階の結果をまとめて結論へ進む。 gradientはW_h Jacobian productsをtime方向へ掛けるためeigen/singular scaleでvanishing/exploding。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{h}_t=\phi(\mathbf{W}_h\mathbf{h}_{t-1}+\mathbf{W}_x\mathbf{x}_t)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

scalar h_t=0.5h_{t-1}+x_tでは古いinput contributionは0.5^{lag}で指数減衰。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

LSTM/GRU gatesはadditive memory pathでlong dependencyのgradientを改善。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

hidden stateがfixed sizeなのでlong context情報を全て保持できる保証はない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

scalar h_t=0.5h_{t-1}+x_tでは古いinput contributionは0.5^{lag}で指数減衰。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

LSTM/GRU gatesはadditive memory pathでlong dependencyのgradientを改善。

## 成立条件と、条件を外したときに何が壊れるか

- 長系列では勾配消失・爆発が起こりうる。
- padding maskを忘れない。
- RNNと系列modelの定義と計算手順を区別し、数値例だけで一般性を判断しない。

hidden stateがfixed sizeなのでlong context情報を全て保持できる保証はない。

## よくある誤解を分解する

- RNNと系列modelの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

RNNと系列modelでは、式へ数値を代入するだけでは不十分である。hidden stateがfixed sizeなのでlong context情報を全て保持できる保証はない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

mask/padded length、state detach、truncated BPTT、gradient clipping。

## ここから一段だけ発展する

各queryがsequence内の任意positionを直接参照できるattentionへ。


## このTopicを理解できたか確認する問い

- 「recurrent composition」を式を見ずに説明できるか
- 「BPTT gradient」までの論理を一段ずつ再現できるか
- RNNと系列modelの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.7960 Deep Learning](https://ocw.mit.edu/courses/6-7960-deep-learning-fall-2024/)
- [MIT 6.S191 Introduction to Deep Learning](https://introtodeeplearning.com/)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[演習へ](/exercises/dl-rnn-sequence-models)　|　[スライドへ](/slides/dl-rnn-sequence-models/)
