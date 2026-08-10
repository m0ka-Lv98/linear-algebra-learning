# 収束次数と停止条件：教科書

Course 05｜数値計算｜Topic 03/20

## このTopicは、前の何を受けて始まるか

前Topic `num-errors-conditioning-stability` で得た概念を使い、ここでは 収束次数と停止条件 へ進む。

前提として使うのは `num-errors-conditioning-stability`、`calc-functions-limits-continuity` です。

## まず直感を作る

反復法では誤差e_kが何乗の速さで小さくなるかと、どこで止めるかを分けて考える。



## 図の解説

<img src="/visuals/course-05/num-convergence-orders-stopping.png" alt="収束次数と停止条件の図解" style="max-height: 440px; display:block; margin:0 auto;" />

線形収束・二次収束の誤差曲線を比較する。 横軸が反復回数、縦軸が誤差である。直線的な減少と急激な減少の違いは、誤差更新式e_{k+1}≈C e_k^pの指数pの違いに対応する。

## 記号・型・次元

- $x^*$：真の解
- $e_k=x_k-x^*$：k反復目の誤差
- $p$：収束次数
- $C$：漸近誤差定数
- $r_k$：計算可能な残差


## 正式な定義・代表式

$|e_{k+1}|\le C|e_k|^p$ が解近傍で成り立つときp次収束。p=1線形、p=2二次。停止判定では未知の真誤差の代わりに残差・step・boundを用いる。

代表式は

$$
|e_{k+1}|\le C|e_k|^p
$$

です。

## なぜこの式・結論になるのか

### 1. 誤差写像へ置き換える

反復 $x_{k+1}=G(x_k)$ を解x*の周りでTaylor展開。$e_{k+1}=G(x*+e_k)-G(x*)\approx G^{\prime}(x*)e_k+\frac12G^{\prime\prime}(x*)e_k^2+\cdots$。

### 2. 低次項が収束次数を決める

$G^{\prime}(x*)\ne0$ なら線形項支配でp=1。$G^{\prime}(x*)=0$ かつ二階項非zeroならp=2。

### 3. 停止条件

真誤差e_kは通常未知なので、$|x_{k+1}-x_k|$、残差、理論boundをscale-aware toleranceと比較する。

## 教科書が省略しやすい一段を補う


### convergence orderは誤差更新式の局所モデル

真値x*への誤差 $e_k=|x_k-x^*|$ が十分後で
$$
e_{k+1}\approx C e_k^p
$$
を満たすときpをorderと呼ぶ。p=1はlinear、p=2はquadratic。quadraticでは誤差が小さくなると次回およそ誤差の二乗になるため、正しい桁数が急速に増える。

停止条件は真の誤差e_kを直接知らないことが多いので、residual、step size、相対変化などobservable proxyを使う。residualが小さいこととsolution errorが小さいことはcondition numberによって結び付くため、ill-conditioned problemで「residualだけ小さいから十分」は危険。absolute/relative toleranceと最大反復数を問題scaleに合わせる。



## 途中を飛ばさず全体をつなぐ

### 収束次数と停止条件の導出を一本につなげる

$|e_{k+1}|\le C|e_k|^p$ が解近傍で成り立つときp次収束。p=1線形、p=2二次。停止判定では未知の真誤差の代わりに残差・step・boundを用いる。

#### 1. 誤差写像へ置き換える

まず出発点を固定する。 反復 $x_{k+1}=G(x_k)$ を解x*の周りでTaylor展開。$e_{k+1}=G(x*+e_k)-G(x*)\approx G^{\prime}(x*)e_k+\frac12G^{\prime\prime}(x*)e_k^2+\cdots$。 次に必要になるのは「低次項が収束次数を決める」である。

#### 2. 低次項が収束次数を決める

ここまでで得た結果を次の段階へ渡す。 $G^{\prime}(x*)\ne0$ なら線形項支配でp=1。$G^{\prime}(x*)=0$ かつ二階項非zeroならp=2。 次に必要になるのは「停止条件」である。

#### 3. 停止条件

最後に、前二段階の結果をまとめて結論へ進む。 真誤差e_kは通常未知なので、$|x_{k+1}-x_k|$、残差、理論boundをscale-aware toleranceと比較する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
|e_{k+1}|\le C|e_k|^p
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

誤差が毎回0.2倍なら線形収束。誤差 $10^{-2}\to10^{-4}\to10^{-8}$ のようにほぼ二乗されるなら二次収束。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

絶対tol $10^{-8}$ だけだと値が $10^{10}$ scaleの問題では過剰精度、$10^{-12}$ scaleでは粗い。relative tolを併用する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

iterate差が小さいだけで解に近いとは限らない。step sizeを極端に小さくしたgradient methodはほぼ動かないが未収束の場合がある。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

誤差が毎回0.2倍なら線形収束。誤差 $10^{-2}\to10^{-4}\to10^{-8}$ のようにほぼ二乗されるなら二次収束。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

絶対tol $10^{-8}$ だけだと値が $10^{10}$ scaleの問題では過剰精度、$10^{-12}$ scaleでは粗い。relative tolを併用する。

## 成立条件と、条件を外したときに何が壊れるか

- 残差が小さくても誤差が小さいとは限らない。
- 停止条件は絶対・相対誤差を考える。
- 収束次数と停止条件の定義と計算手順を区別し、数値例だけで一般性を判断しない。

iterate差が小さいだけで解に近いとは限らない。step sizeを極端に小さくしたgradient methodはほぼ動かないが未収束の場合がある。

## よくある誤解を分解する

- 収束次数と停止条件の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

収束次数と停止条件では、式へ数値を代入するだけでは不十分である。iterate差が小さいだけで解に近いとは限らない。step sizeを極端に小さくしたgradient methodはほぼ動かないが未収束の場合がある。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

max iteration、NaN/Inf、stagnationもstop理由として区別して記録する。収束成功と単なる停止を同じstatusにしない。

## ここから一段だけ発展する

Newton法では二次収束がどのTaylor条件から出るかを求根Topicで具体化する。


## このTopicを理解できたか確認する問い

- 「誤差写像へ置き換える」を式を見ずに説明できるか
- 「停止条件」までの論理を一段ずつ再現できるか
- 収束次数と停止条件の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-convergence-orders-stopping)　|　[スライドへ](/slides/num-convergence-orders-stopping/)
