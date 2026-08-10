# 線形回帰の確率モデル：教科書

Course 03｜確率統計｜Topic 19/20

## このTopicは、前の何を受けて始まるか

前Topic `stat-hypothesis-testing` で得た概念を使い、ここでは 線形回帰の確率モデル へ進む。

前提として使うのは `prob-covariance-correlation`、`prob-multivariate-normal-distribution`、`stat-likelihood-maximum-likelihood`、`la-least-squares-geometry` です。

## まず直感を作る

回帰は入力から平均的な出力を説明・予測する関係をモデル化する。



## 図の解説

<img src="/visuals/course-03/stat-linear-regression-probabilistic-model.png" alt="線形回帰の確率モデルの図解" style="max-height: 440px; display:block; margin:0 auto;" />

散布点、回帰線、残差を同時に描く。 点が観測値、線がモデル予測、点から線までの縦の差が残差である。二乗残差を合計する最小二乗では、大きな残差ほど強く目的関数へ効く。

## 記号・型・次元

- $\mathbf y\in\mathbb R^n$：応答
- $\mathbf X\in\mathbb R^{n\times p}$：design matrix
- $\boldsymbol\beta\in\mathbb R^p$：回帰係数
- $\boldsymbol\varepsilon$：誤差ベクトル
- $\sigma^2$：誤差分散


## 正式な定義・代表式

線形回帰の確率モデルは $\mathbf y=\mathbf X\beta+\varepsilon$。典型的には $E[\varepsilon|X]=0$、等分散・独立などを仮定し、正規誤差ならOLSはMLEとも一致する。

代表式は

$$
\mathbf{y}=\mathbf{X}\boldsymbol{\beta}+\boldsymbol{\varepsilon}
$$

です。

## なぜこの式・結論になるのか

### 1. 条件付き平均をモデル化する

$E[\mathbf y|\mathbf X]=\mathbf X\beta$ と置く。各係数は他の列を固定した線形効果として読む。

### 2. 二乗損失が正規尤度から出る

$\varepsilon_i\sim N(0,\sigma^2)$ 独立ならlog尤度は定数を除き $-\frac1{2\sigma^2}\|y-X\beta\|^2$。最大化はOLS最小化と同値。

### 3. 推定と不確実性を分ける

点推定 $\hat\beta$ だけでなく、誤差仮定から $Var(\hat\beta)$ を導きSE・CI・検定へ進む。

## 教科書が省略しやすい一段を補う


### OLSがGaussian MLEとして再び現れる

線形回帰を
$$
y_i=\mathbf x_i^T\boldsymbol\beta+\varepsilon_i,
\qquad \varepsilon_i\overset{iid}{\sim}N(0,\sigma^2)
$$
と仮定する。各観測のlog likelihoodを足すと、betaに依存する部分は
$$
-\frac{1}{2\sigma^2}\sum_i(y_i-\mathbf x_i^T\boldsymbol\beta)^2.
$$
したがってsigma固定ならlikelihood最大化は残差二乗和最小化と完全に同じ。線形代数で導いたOLSが、ここでは確率モデルから導かれる。

この確率仮定を加えることで、点推定だけでなくbetaのsampling variance、confidence interval、prediction intervalを議論できる。一方で「OLSの係数を計算できること」と「Gaussian/homoscedastic/independent errorsが妥当で推論が正しいこと」は別問題である。



## 途中を飛ばさず全体をつなぐ

### 線形回帰の確率モデルの導出を一本につなげる

線形回帰の確率モデルは $\mathbf y=\mathbf X\beta+\varepsilon$。典型的には $E[\varepsilon|X]=0$、等分散・独立などを仮定し、正規誤差ならOLSはMLEとも一致する。

#### 1. 条件付き平均をモデル化する

まず出発点を固定する。 $E[\mathbf y|\mathbf X]=\mathbf X\beta$ と置く。各係数は他の列を固定した線形効果として読む。 次に必要になるのは「二乗損失が正規尤度から出る」である。

#### 2. 二乗損失が正規尤度から出る

ここまでで得た結果を次の段階へ渡す。 $\varepsilon_i\sim N(0,\sigma^2)$ 独立ならlog尤度は定数を除き $-\frac1{2\sigma^2}\|y-X\beta\|^2$。最大化はOLS最小化と同値。 次に必要になるのは「推定と不確実性を分ける」である。

#### 3. 推定と不確実性を分ける

最後に、前二段階の結果をまとめて結論へ進む。 点推定 $\hat\beta$ だけでなく、誤差仮定から $Var(\hat\beta)$ を導きSE・CI・検定へ進む。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{y}=\mathbf{X}\boldsymbol{\beta}+\boldsymbol{\varepsilon}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

切片と1説明変数なら $y_i=\beta_0+\beta_1x_i+\varepsilon_i$。$\beta_1$ はxが1増えたとき条件付き平均がどれだけ変わるか。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

誤差分散がxとともに増えるheteroscedasticデータではOLS点推定が使えても、等分散を仮定した標準誤差は誤る。WLS/robust SEが必要。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

高い $R^2$ や有意な係数だけで因果関係は証明できない。交絡、selection、model misspecificationは確率モデル外の問題。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

切片と1説明変数なら $y_i=\beta_0+\beta_1x_i+\varepsilon_i$。$\beta_1$ はxが1増えたとき条件付き平均がどれだけ変わるか。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

誤差分散がxとともに増えるheteroscedasticデータではOLS点推定が使えても、等分散を仮定した標準誤差は誤る。WLS/robust SEが必要。

## 成立条件と、条件を外したときに何が壊れるか

- 予測と因果を混同しない。
- 外挿では不確実性が増える。
- 線形回帰の確率モデルの定義と計算手順を区別し、数値例だけで一般性を判断しない。

高い $R^2$ や有意な係数だけで因果関係は証明できない。交絡、selection、model misspecificationは確率モデル外の問題。

## よくある誤解を分解する

- 線形回帰の確率モデルの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

線形回帰の確率モデルでは、式へ数値を代入するだけでは不十分である。高い $R^2$ や有意な係数だけで因果関係は証明できない。交絡、selection、model misspecificationは確率モデル外の問題。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

逆行列を明示的に作らずQR/SVDでlstsqを解く。residual plot、leverage、heteroscedasticityを診断し、train/test目的なら推論と予測を区別する。

## ここから一段だけ発展する

Course07でOLS, WLS, GLSを行列幾何と誤差共分散の観点から深掘りし、Course08で予測モデルとして正則化・validationを加える。


## このTopicを理解できたか確認する問い

- 「条件付き平均をモデル化する」を式を見ずに説明できるか
- 「推定と不確実性を分ける」までの論理を一段ずつ再現できるか
- 線形回帰の確率モデルの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)
- [OpenStax Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e)

[演習へ](/exercises/stat-linear-regression-probabilistic-model)　|　[スライドへ](/slides/stat-linear-regression-probabilistic-model/)
