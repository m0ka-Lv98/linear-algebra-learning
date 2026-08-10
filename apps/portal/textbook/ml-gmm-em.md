# Gaussian mixtureとEM：教科書

Course 08｜機械学習｜Topic 13/20

## このTopicは、前の何を受けて始まるか

前Topic `ml-clustering-kmeans-hierarchical` で得た概念を使い、ここでは Gaussian mixtureとEM へ進む。

前提として使うのは `prob-multivariate-normal-distribution`、`stat-likelihood-maximum-likelihood` です。

## まず直感を作る

clusteringは正解ラベルなしで近い点を群へまとめる。距離と群の形状仮定が結果を決める。



## 図の解説

<img src="/visuals/course-08/ml-gmm-em.png" alt="Gaussian mixtureとEMの図解" style="max-height: 440px; display:block; margin:0 auto;" />

k-means中心が反復で動く様子を追う。 点群とクラスタ中心/密度成分を描く。教師ラベルではなく、距離や確率モデルが定める内部構造に基づいて割当てが更新される。

## 記号・型・次元

- $\pi_k$：mixture weights
- $\mu_k,\Sigma_k$
- $\gamma_{ik}=P(z_i=k|x_i)$：responsibility


## 正式な定義・代表式

GMMはlatent component zを持つmixture density。EMはlatent assignment posteriorの期待値(E)とparameter最大化(M)を交互に行いlikelihoodを非減少にする。

代表式は

$$
p(\mathbf{x})=\sum_{k=1}^{K}\pi_k\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_k,\mathbf{\Sigma}_k)
$$

です。

## なぜこの式・結論になるのか

### 1. incomplete likelihoodのlog-sum

$\log\sum_k\pi_kN(x|\mu_k,Σ_k)$ はparameterがsum内で直接maxしにくい。

### 2. E-step

current parameterでBayes ruleからresponsibility γ_ikを計算。

### 3. M-step

expected complete log likelihoodをmax。meansはresponsibility-weighted means、πは平均responsibility。

## 教科書が省略しやすい一段を補う


### EMはlatent labelを「埋めてから最適化」する

GMM likelihood $\prod_i\sum_k\pi_kN(x_i|\mu_k,\Sigma_k)$ はlogを取るとlog-sumが残り直接分離できない。latent z_iを導入すればcomplete-data log likelihoodはcomponentごとの和になる。E-stepでcurrent parametersからresponsibility $\gamma_{ik}=P(z_i=k|x_i)$、M-stepでそのsoft countsを使いparametersを更新する。

Jensen inequality/ELBOの見方ではE-stepがposteriorでboundをtightにし、M-stepがboundを上げるためlikelihood非減少。global optimum保証はなくinitialization依存。covariance collapseでlikelihoodが発散し得るためregularizationが必要。


### Jensen boundからlikelihood非減少を確認する

任意q(z)に対し
$$
\log p(x)=\log\sum_z q(z)\frac{p(x,z)}{q(z)}
\ge \sum_z q(z)\log\frac{p(x,z)}{q(z)}
$$
(Jensen)。E-stepでqをcurrent posteriorにするとboundがcurrent log likelihoodへtight。M-stepでparametersを変えてboundを最大化するので、新likelihoodは少なくともそのbound以上、したがって減らない。

「Eでlabelを推定、Mでfit」という説明の裏にこのlower-bound argumentがある。

## 途中を飛ばさず全体をつなぐ

### Gaussian mixtureとEMの導出を一本につなげる

GMMはlatent component zを持つmixture density。EMはlatent assignment posteriorの期待値(E)とparameter最大化(M)を交互に行いlikelihoodを非減少にする。

#### 1. incomplete likelihoodのlog-sum

まず出発点を固定する。 $\log\sum_k\pi_kN(x|\mu_k,Σ_k)$ はparameterがsum内で直接maxしにくい。 次に必要になるのは「E-step」である。

#### 2. E-step

ここまでで得た結果を次の段階へ渡す。 current parameterでBayes ruleからresponsibility γ_ikを計算。 次に必要になるのは「M-step」である。

#### 3. M-step

最後に、前二段階の結果をまとめて結論へ進む。 expected complete log likelihoodをmax。meansはresponsibility-weighted means、πは平均responsibility。

#### 代表式へ戻す

以上をまとめた中心式は

$$
p(\mathbf{x})=\sum_{k=1}^{K}\pi_k\mathcal{N}(\mathbf{x}\mid\boldsymbol{\mu}_k,\mathbf{\Sigma}_k)
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

overlapping 2 Gaussiansでboundary pointはγ≈0.5となりsoft assignment。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

covarianceをisotropic equalにしvariance→0 limitに近づけるとk-meansと関係。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

GMM likelihoodはcomponent covarianceを1 pointへcollapseさせるとunboundedになることがありregularization必要。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

overlapping 2 Gaussiansでboundary pointはγ≈0.5となりsoft assignment。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

covarianceをisotropic equalにしvariance→0 limitに近づけるとk-meansと関係。

## 成立条件と、条件を外したときに何が壊れるか

- k-meansは球状・同程度分散の群を好む。
- cluster番号自体に順序や意味はない。
- Gaussian mixtureとEMの定義と計算手順を区別し、数値例だけで一般性を判断しない。

GMM likelihoodはcomponent covarianceを1 pointへcollapseさせるとunboundedになることがありregularization必要。

## よくある誤解を分解する

- Gaussian mixtureとEMの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

Gaussian mixtureとEMでは、式へ数値を代入するだけでは不十分である。GMM likelihoodはcomponent covarianceを1 pointへcollapseさせるとunboundedになることがありregularization必要。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

log-sum-exp、covariance floor、多initialization。label switching。

## ここから一段だけ発展する

representation dimensionを下げるPCA/manifold methodsへ。


## このTopicを理解できたか確認する問い

- 「incomplete likelihoodのlog-sum」を式を見ずに説明できるか
- 「M-step」までの論理を一段ずつ再現できるか
- Gaussian mixtureとEMの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Stanford CS229 Machine Learning](https://cs229.stanford.edu/)
- [MIT 6.390 Introduction to Machine Learning](https://introml.mit.edu/)

[演習へ](/exercises/ml-gmm-em)　|　[スライドへ](/slides/ml-gmm-em/)
