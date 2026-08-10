# 数値計算の検証・benchmark・再現性：教科書

Course 05｜数値計算｜Topic 20/20

## このTopicは、前の何を受けて始まるか

前Topic `num-monte-carlo-methods` で得た概念を使い、ここでは 数値計算の検証・benchmark・再現性 へ進む。

前提として使うのは `num-convergence-orders-stopping`、`num-floating-point-rounding`、`prep-numerical-checks-reproducibility` です。

## まず直感を作る

反復法では誤差e_kが何乗の速さで小さくなるかと、どこで止めるかを分けて考える。



## 図の解説

<img src="/visuals/course-05/num-verification-benchmarking-reproducibility.png" alt="数値計算の検証・benchmark・再現性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

線形収束・二次収束の誤差曲線を比較する。 横軸が反復回数、縦軸が誤差である。直線的な減少と急激な減少の違いは、誤差更新式e_{k+1}≈C e_k^pの指数pの違いに対応する。

## 記号・型・次元

- $E(h)$：grid/step hでのerror
- $p$：理論収束次数
- $C$：leading constant
- $T(n)$：runtime/memory等


## 正式な定義・代表式

numerical verificationは既知解・manufactured solution・grid refinementで実装が理論orderを示すか確認する。$E(h)\approx Ch^p$ ならlog slopeからpを推定できる。

代表式は

$$
E(h)\approx Ch^p
$$

です。

## なぜこの式・結論になるのか

### 1. 2つの解像度を比較

$E(h)=Ch^p$, $E(h/2)=C(h/2)^p$。比は $E(h)/E(h/2)=2^p$。

### 2. observed order

$p\approx\log_2(E(h)/E(h/2))$。複数hでasymptotic regimeを確認する。

### 3. benchmarkを分離

correctness/accuracy確認の後にtime/memoryを測る。速いが誤った実装をperformance winnerにしない。

## 教科書が省略しやすい一段を補う


### 「動いた」を数値計算の正しさとみなさない

verificationではまず既知解・manufactured solution・conservation law・residualなど独立なoracleを持つ。convergence testではhを系統的に変え、誤差比が理論orderへ近づくか確認する。単一inputの一致だけでは実装bugと偶然の相殺を見抜けない。

benchmarkはaccuracyとruntime/memoryを同じproblem familyで測り、warm-up、hardware、thread count、library versionを記録する。reproducibilityにはsource codeだけでなくdata, seed, tolerance, stopping rule, compiler/library versionまで必要。numerical resultはalgorithmとenvironmentの共同産物である。



## 途中を飛ばさず全体をつなぐ

### 数値計算の検証・benchmark・再現性の導出を一本につなげる

numerical verificationは既知解・manufactured solution・grid refinementで実装が理論orderを示すか確認する。$E(h)\approx Ch^p$ ならlog slopeからpを推定できる。

#### 1. 2つの解像度を比較

まず出発点を固定する。 $E(h)=Ch^p$, $E(h/2)=C(h/2)^p$。比は $E(h)/E(h/2)=2^p$。 次に必要になるのは「observed order」である。

#### 2. observed order

ここまでで得た結果を次の段階へ渡す。 $p\approx\log_2(E(h)/E(h/2))$。複数hでasymptotic regimeを確認する。 次に必要になるのは「benchmarkを分離」である。

#### 3. benchmarkを分離

最後に、前二段階の結果をまとめて結論へ進む。 correctness/accuracy確認の後にtime/memoryを測る。速いが誤った実装をperformance winnerにしない。

#### 代表式へ戻す

以上をまとめた中心式は

$$
E(h)\approx Ch^p
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

E(h)=1e-2, E(h/2)=2.5e-3なら比4なのでobserved p=2。二次法の期待と一致。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

粗いhではasymptotic orderが出ず、極小hではroundoff支配。中間rangeでslopeを評価する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

E(h)=1e-2, E(h/2)=2.5e-3なら比4なのでobserved p=2。二次法の期待と一致。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

粗いhではasymptotic orderが出ず、極小hではroundoff支配。中間rangeでslopeを評価する。

## 成立条件と、条件を外したときに何が壊れるか

- 残差が小さくても誤差が小さいとは限らない。
- 停止条件は絶対・相対誤差を考える。
- 数値計算の検証・benchmark・再現性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。

## よくある誤解を分解する

- 数値計算の検証・benchmark・再現性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

数値計算の検証・benchmark・再現性では、式へ数値を代入するだけでは不十分である。単一input・単一machineのruntime1回だけではbenchmarkにならない。warm-up、variance、thread数、BLAS、hardwareを記録する。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

environment lock、seed、dtype、tolerance、version、hardwareをmanifestへ残す。reference implementationとproperty testを併用する。

## ここから一段だけ発展する

この検証文化はCourse06以降のoptimization/MLでも同じ。lossが下がるだけでなくoptimality residualやheld-out metricを検証する。


## このTopicを理解できたか確認する問い

- 「2つの解像度を比較」を式を見ずに説明できるか
- 「benchmarkを分離」までの論理を一段ずつ再現できるか
- 数値計算の検証・benchmark・再現性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-verification-benchmarking-reproducibility)　|　[スライドへ](/slides/num-verification-benchmarking-reproducibility/)
