# 非凸最適化の診断とhyperparameter：教科書

Course 06｜最適化｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `opt-admm-splitting` で得た概念を使い、ここでは 非凸最適化の診断とhyperparameter へ進む。

前提として使うのは `opt-adaptive-optimizers`、`num-verification-benchmarking-reproducibility` です。

## まず直感を作る

非凸問題では局所最小・鞍点・平坦領域が共存し、単一の最終値だけでなく軌跡や初期値依存性を診断する。



## 図の解説

<img src="/visuals/course-06/opt-nonconvex-diagnostics-hyperparameters.png" alt="非凸最適化の診断とhyperparameterの図解" style="max-height: 440px; display:block; margin:0 auto;" />

複数初期値から同じ目的関数を最適化し、到達点を比較する。 複数の谷・鞍点・平坦部が同じ等高線図に現れる。局所的な一階・二階条件だけでは大域最適性を保証できないことが形から分かる。

## 記号・型・次元

- $w^*(\lambda)$：training optimizationで得るparameter
- $\lambda$：hyperparameter
- $L_{val}$：validation loss
- $\Lambda$：search space


## 正式な定義・代表式

nonconvex optimizationではstationarity/global optimality/validation performanceを分けて評価する。hyperparameter optimizationはinner training solutionに依存するouter problem。

代表式は

$$
\min_{\lambda\in\Lambda}\;\mathcal{L}_{\mathrm{val}}(\mathbf{w}^{\ast}(\lambda))
$$

です。

## なぜこの式・結論になるのか

### 1. 二層problem

inner: $w^*(λ)\approx argmin_w L_{train}(w;λ)$。outer: $min_λ L_{val}(w^*(λ);λ)$。

### 2. training lossだけでは選べない

λをtraining lossで選ぶとmodel complexityを増やす方向へ偏る。held-out validationがgeneralization proxy。

### 3. 診断の分離

optimization failure（gradient norm大）、generalization gap、data leakage、seed varianceを別原因として記録する。

## 教科書が省略しやすい一段を補う


### nonconvexでは「収束した」と「良い解」が別

nonconvex objectiveで $\|\nabla f\|$ が小さくなってもlocal minimum、saddle、flat plateauの可能性がある。Hessian spectrumやmultiple restarts、training/validation curvesを併用して診断する。deep modelではparameter symmetryにより同等解も多数存在する。

hyperparameter tuningはoptimization algorithm外側のmodel selection problemで、validation feedbackを繰り返し使えばvalidation overfittingも起こる。search budget、random seed、early stopping ruleを固定し、最終testは選択後に隔離する。



## 途中を飛ばさず全体をつなぐ

### 非凸最適化の診断とhyperparameterの導出を一本につなげる

nonconvex optimizationではstationarity/global optimality/validation performanceを分けて評価する。hyperparameter optimizationはinner training solutionに依存するouter problem。

#### 1. 二層problem

まず出発点を固定する。 inner: $w^*(λ)\approx argmin_w L_{train}(w;λ)$。outer: $min_λ L_{val}(w^*(λ);λ)$。 次に必要になるのは「training lossだけでは選べない」である。

#### 2. training lossだけでは選べない

ここまでで得た結果を次の段階へ渡す。 λをtraining lossで選ぶとmodel complexityを増やす方向へ偏る。held-out validationがgeneralization proxy。 次に必要になるのは「診断の分離」である。

#### 3. 診断の分離

最後に、前二段階の結果をまとめて結論へ進む。 optimization failure（gradient norm大）、generalization gap、data leakage、seed varianceを別原因として記録する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\min_{\lambda\in\Lambda}\;\mathcal{L}_{\mathrm{val}}(\mathbf{w}^{\ast}(\lambda))
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

learning rateが大きすぎてdivergeする場合と、train lossは低いがval loss悪化するoverfitは対策が異なる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

複数seedでbest-val distributionを見るとinitialization noiseによるranking不確実性が分かる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

test setでhyperparameterを何度も選ぶとtestがvalidation化し最終性能estimateがoptimistic。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

learning rateが大きすぎてdivergeする場合と、train lossは低いがval loss悪化するoverfitは対策が異なる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

複数seedでbest-val distributionを見るとinitialization noiseによるranking不確実性が分かる。

## 成立条件と、条件を外したときに何が壊れるか

- train lossだけでhyperparameterを選ばない。
- 再初期化で安定性を見る。
- 非凸最適化の診断とhyperparameterの定義と計算手順を区別し、数値例だけで一般性を判断しない。

test setでhyperparameterを何度も選ぶとtestがvalidation化し最終性能estimateがoptimistic。

## よくある誤解を分解する

- 非凸最適化の診断とhyperparameterの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

非凸最適化の診断とhyperparameterでは、式へ数値を代入するだけでは不十分である。test setでhyperparameterを何度も選ぶとtestがvalidation化し最終性能estimateがoptimistic。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

experiment trackingでcode/data split/seed/optimizer/scheduleを固定記録。early stopping criterionもhyperparameter。

## ここから一段だけ発展する

Course08ではこの最適化をmodel学習の内部要素として使い、data split・評価・model selectionをより体系化する。


## このTopicを理解できたか確認する問い

- 「二層problem」を式を見ずに説明できるか
- 「診断の分離」までの論理を一段ずつ再現できるか
- 非凸最適化の診断とhyperparameterの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 6.079 Introduction to Convex Optimization](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/)
- [MIT OCW 6.7220J Nonlinear Optimization](https://ocw.mit.edu/courses/6-7220j-nonlinear-optimization-spring-2025/)
- [Boyd & Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/)

[演習へ](/exercises/opt-nonconvex-diagnostics-hyperparameters)　|　[スライドへ](/slides/opt-nonconvex-diagnostics-hyperparameters/)
