# 誤差・条件数・数値安定性：教科書

Course 05｜数値計算｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `num-floating-point-rounding` で得た概念を使い、ここでは 誤差・条件数・数値安定性 へ進む。

前提として使うのは `num-floating-point-rounding`、`la-matrix-norms-condition-number` です。

## まず直感を作る

条件数は入力の小さな誤差が出力でどれだけ増幅され得るかを表す。



## 図の解説

<img src="/visuals/course-05/num-errors-conditioning-stability.png" alt="誤差・条件数・数値安定性の図解" style="max-height: 440px; display:block; margin:0 auto;" />

細長い楕円状の変換で、近い右辺が大きく違う解へ移る様子を見る。 入力空間の小さな円が線形写像で細長い楕円へ移る。最長軸と最短軸の比が大きいほど、入力方向によって増幅率が大きく違い、逆問題が敏感になる。

## 記号・型・次元

- $\mathbf A\mathbf x=\mathbf b$：解く問題
- $\Delta\mathbf b$：入力摂動
- $\Delta\mathbf x$：解の変化
- $\kappa(\mathbf A)=\|A\|\|A^{-1}\|$：条件数


## 正式な定義・代表式

conditioningは問題そのものの感度、stabilityはalgorithmが理想問題に近い答えを返す性質。線形系では相対解誤差が概ね条件数×相対入力誤差で増幅され得る。

代表式は

$$
\frac{\|\Delta\mathbf{x}\|}{\|\mathbf{x}\|}\lesssim\kappa(\mathbf{A})\frac{\|\Delta\mathbf{b}\|}{\|\mathbf{b}\|}
$$

です。

## なぜこの式・結論になるのか

### 1. 摂動した方程式

$A(x+\Delta x)=b+\Delta b$ と元式を引くと $A\Delta x=\Delta b$、よって $\Delta x=A^{-1}\Delta b$。

### 2. normで上から抑える

$\|\Delta x\|\le\|A^{-1}\|\|\Delta b\|$。一方 $\|b\|=\|Ax\|\le\|A\|\|x\|$ より $1/\|x\|\le\|A\|/\|b\|$。

### 3. 相対誤差を結ぶ

二つを掛けて $\|\Delta x\|/\|x\|\le\kappa(A)\|\Delta b\|/\|b\|$。大きいκはproblem sensitivityを示す。

## 教科書が省略しやすい一段を補う


### conditioningは問題、stabilityはalgorithmの性質

problem $y=f(x)$ のconditionは、入力をわずかに変えたとき真の出力がどれだけ変わるかを測る。linear systemでは $\kappa(A)=\|A\|\|A^{-1}\|$ が代表で、特異値なら $\sigma_{max}/\sigma_{min}$。小さいsingular directionを逆にたどると1/σ_min倍されるためill-conditionedになる。

algorithm stabilityは、計算結果が「少し摂動した入力に対する正確解」とみなせるかという別概念。backward stableでも元問題がill-conditionedならforward errorは大きくなりうる。したがって誤差が大きいとき、problem sensitivityとalgorithmic errorを分離して診断する。


### 2×2 exampleでill-conditioningを見る

$A=\begin{bmatrix}1&1\\1&1+\epsilon\end{bmatrix}$ はεが小さいとcolumnsがほぼ平行。$\det A=\epsilon$ なのでinverse entriesは1/ε scaleになる。したがってbの小さなdifference componentがsolutionで大きく増幅される。これはsolver bugではなくproblem自体のsensitivity。

同じAに対し二つのalgorithmを比較するときはforward errorだけでなくbackward errorを見る。小さなbackward errorで大きなforward errorならill-conditioningが主因、backward error自体が大きければalgorithm/implementation instabilityを疑う。

## 途中を飛ばさず全体をつなぐ

### 誤差・条件数・数値安定性の導出を一本につなげる

conditioningは問題そのものの感度、stabilityはalgorithmが理想問題に近い答えを返す性質。線形系では相対解誤差が概ね条件数×相対入力誤差で増幅され得る。

#### 1. 摂動した方程式

まず出発点を固定する。 $A(x+\Delta x)=b+\Delta b$ と元式を引くと $A\Delta x=\Delta b$、よって $\Delta x=A^{-1}\Delta b$。 次に必要になるのは「normで上から抑える」である。

#### 2. normで上から抑える

ここまでで得た結果を次の段階へ渡す。 $\|\Delta x\|\le\|A^{-1}\|\|\Delta b\|$。一方 $\|b\|=\|Ax\|\le\|A\|\|x\|$ より $1/\|x\|\le\|A\|/\|b\|$。 次に必要になるのは「相対誤差を結ぶ」である。

#### 3. 相対誤差を結ぶ

最後に、前二段階の結果をまとめて結論へ進む。 二つを掛けて $\|\Delta x\|/\|x\|\le\kappa(A)\|\Delta b\|/\|b\|$。大きいκはproblem sensitivityを示す。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\frac{\|\Delta\mathbf{x}\|}{\|\mathbf{x}\|}\lesssim\kappa(\mathbf{A})\frac{\|\Delta\mathbf{b}\|}{\|\mathbf{b}\|}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$A=diag(1,10^{-6})$ は2-norm条件数 $10^6$。第2成分方向の小さなb誤差がxで百万倍の相対scale差を持ち得る。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

同じwell-conditioned問題でも、わざと大きなcancelationを起こすalgorithmなら不安定になり得る。問題とalgorithmを別評価する。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$A=diag(1,10^{-6})$ は2-norm条件数 $10^6$。第2成分方向の小さなb誤差がxで百万倍の相対scale差を持ち得る。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

同じwell-conditioned問題でも、わざと大きなcancelationを起こすalgorithmなら不安定になり得る。問題とalgorithmを別評価する。

## 成立条件と、条件を外したときに何が壊れるか

- 条件数が大きいこととアルゴリズムが不安定なことは別概念。
- スケーリングで見かけの条件が変わる場合がある。
- 誤差・条件数・数値安定性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。

## よくある誤解を分解する

- 誤差・条件数・数値安定性の定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

誤差・条件数・数値安定性では、式へ数値を代入するだけでは不十分である。「結果が悪い=algorithmが悪い」とは限らない。ill-conditioned問題ではどの高品質algorithmでも入力の有効桁以上は回復できない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

residual $r=b-A\hat x$ が小さくてもforward errorが小さいとは限らない。condition numberとbackward errorを併用する。

## ここから一段だけ発展する

誤差列が0へ近づく速さを収束次数として定量化し、反復法の停止を設計する。


## このTopicを理解できたか確認する問い

- 「摂動した方程式」を式を見ずに説明できるか
- 「相対誤差を結ぶ」までの論理を一段ずつ再現できるか
- 誤差・条件数・数値安定性の条件を1つ外した反例を説明できるか

## 外部教材との照合

- [MIT OCW 18.330 Introduction to Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/)
- [MIT OCW 18.335J Introduction to Numerical Methods](https://ocw.mit.edu/courses/18-335j-introduction-to-numerical-methods-spring-2019/)

[演習へ](/exercises/num-errors-conditioning-stability)　|　[スライドへ](/slides/num-errors-conditioning-stability/)
