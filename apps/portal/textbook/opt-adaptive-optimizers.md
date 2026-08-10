# adaptive optimizer：教科書

Course 06｜最適化｜Topic 18/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-stochastic-gradient` で得た概念を使い、ここでは adaptive optimizer へ進む。

前提として使うのは `opt-stochastic-gradient` です。

## まず直感を作る

確率的最適化は全データ勾配の代わりにノイズを含む推定勾配を使い、計算量と分散を交換する。



## 図の解説

<img src="/visuals/course-06/opt-adaptive-optimizers.png" alt="adaptive optimizerの図解" style="max-height: 440px; display:block; margin:0 auto;" />

full gradientとmini-batch軌跡を比較する。 full gradientの滑らかな軌跡に対しmini-batch gradientは揺らぐが、期待的には同じ下降方向を推定する。学習率は進む速さとノイズ平均化の両方を制御する。

## 記号・型・次元

- $m_k$：gradientのfirst moment EMA
- $v_k$：squared gradient EMA
- $\beta_1,\beta_2$
- $\varepsilon$：zero division防止


## 正式な定義・代表式

Adam型はgradient EMAをsecond-moment EMAの平方根でscaleし、coordinateごとのeffective stepを調整する。bias correctionは初期EMAが0から始まる偏りを補正。

代表式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta\frac{\hat{\mathbf{m}}_k}{\sqrt{\hat{\mathbf{v}}_k}+\varepsilon}
$$

です。

## なぜこの式・結論になるのか

### 1. EMA expectationの初期bias

$m_k=(1-β_1)\sum_{i=1}^kβ_1^{k-i}g_i$。重み総和は $1-β_1^k<1$ なのでstationary meanに対し0方向bias。

### 2. bias correction

$\hat m_k=m_k/(1-β_1^k)$、vも同様。

### 3. scale-normalized step

$\hat m/(\sqrt{\hat v}+ε)$ はpersistentに大きいgradient coordinateのstepを相対的に縮める。

## 教科書が省略しやすい一段を補う


### adaptive methodはcoordinateごとにstep scaleを変える

AdaGrad/Adam系はgradientの一階moment mと二階moment vのmoving averageを持ち、概念的に
$$
\Delta w_i\propto-\frac{m_i}{\sqrt{v_i}+\epsilon}
$$
とする。gradient scaleの大きいcoordinateはstepを抑え、小さいcoordinateは相対的に大きく動かす。

Adamのbias correctionは初期m,vが0から始まりmoving averageが小さく偏ることを補正する。adaptiveだから常にSGDよりgeneralization/ convergenceが良いわけではない。weight decayとL2 penaltyの実装差（AdamW）もobjectiveとupdate ruleを分けて理解する。



## 途中を飛ばさず全体をつなぐ

### adaptive optimizerの導出を一本につなげる

Adam型はgradient EMAをsecond-moment EMAの平方根でscaleし、coordinateごとのeffective stepを調整する。bias correctionは初期EMAが0から始まる偏りを補正。

#### 1. EMA expectationの初期bias

まず出発点を固定する。 $m_k=(1-β_1)\sum_{i=1}^kβ_1^{k-i}g_i$。重み総和は $1-β_1^k<1$ なのでstationary meanに対し0方向bias。 次に必要になるのは「bias correction」である。

#### 2. bias correction

ここまでで得た結果を次の段階へ渡す。 $\hat m_k=m_k/(1-β_1^k)$、vも同様。 次に必要になるのは「scale-normalized step」である。

#### 3. scale-normalized step

最後に、前二段階の結果をまとめて結論へ進む。 $\hat m/(\sqrt{\hat v}+ε)$ はpersistentに大きいgradient coordinateのstepを相対的に縮める。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{x}_{k+1}=\mathbf{x}_k-\eta\frac{\hat{\mathbf{m}}_k}{\sqrt{\hat{\mathbf{v}}_k}+\varepsilon}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

gradient scaleが100倍異なる2座標でplain GDは単一η調整が難しいがadaptive scalingはeffective stepを近づける。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

AdamWはweight decayをgradient-based L2 penaltyと分離してupdateする。regularization interpretationが異なる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

Adamは全problemでSGDよりgeneralization/収束が良いわけではない。hyperparameterとobjective geometryに依存。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

gradient scaleが100倍異なる2座標でplain GDは単一η調整が難しいがadaptive scalingはeffective stepを近づける。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

AdamWはweight decayをgradient-based L2 penaltyと分離してupdateする。regularization interpretationが異なる。

## 成立条件と、条件を外したときに何が壊れるか

- 学習率scheduleが収束に強く影響する。
- batchの乱数seedとshuffleを管理する。
- adaptive optimizerの定義と計算手順を区別し、数値例だけで一般性を判断しない。

Adamは全problemでSGDよりgeneralization/収束が良いわけではない。hyperparameterとobjective geometryに依存。

## よくある誤解を分解する

- adaptive optimizerの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

adaptive optimizerでは、式へ数値を代入するだけでは不十分である。Adamは全problemでSGDよりgeneralization/収束が良いわけではない。hyperparameterとobjective geometryに依存。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

epsilon placement、AMSGrad、decoupled weight decayなどframework差を確認。optimizer stateもcheckpoint対象。

## ここから一段だけ発展する

目的が複数blockへ分離できる場合、ADMMのoperator splittingで各subproblemを別々に解く。


## このTopicを理解できたか確認する問い

- 「EMA expectationの初期bias」を式を見ずに説明できるか
- 「scale-normalized step」までの論理を一段ずつ再現できるか
- adaptive optimizerの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-adaptive-optimizers)　|　[スライドへ](/slides/opt-adaptive-optimizers/)
