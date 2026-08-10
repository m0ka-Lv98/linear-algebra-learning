# 全微分とJacobian：教科書

Course 01｜微積分｜Topic 09/13

## このTopicは、前の何を受けて始まるか

スカラー出力では勾配の内積が局所変化を表した。出力もベクトルになると、各出力の勾配を並べた行列が局所線形写像になる。

前提として使うのは Course 00の数学的読み書き です。

## まず直感を作る

多変数関数も十分小さな範囲では線形写像として見られる。その局所線形写像を表す行列がJacobianである。

地図の非線形な座標変換も、十分小さな領域だけ拡大すると平行四辺形へ写す線形変換に見える。Jacobianはその瞬間の拡大・回転・せん断をまとめる。

## 図の解説

<img src="/visuals/course-01/calc-total-derivative-jacobian.png" alt="全微分とJacobianの図解" style="max-height: 440px; display:block; margin:0 auto;" />

図では入力側の小さな正方形格子が、非線形写像で曲がった格子へ移る。その一点をさらに拡大するとほぼ平行四辺形になり、その二本の辺がJacobianの各列、すなわち標準基底を局所的に写した方向になる。

## 記号・型・次元

- $f:\mathbb R^n\to\mathbb R^m$：ベクトル値関数
- $\Delta\mathbf{x}\in\mathbb R^n$：小さな入力変位
- $\mathbf J_f\in\mathbb R^{m\times n}$：Jacobian
- $(\mathbf J_f)_{ij}=\partial f_i/\partial x_j$：第 $i$ 出力の第 $j$ 入力に対する偏微分


## 正式な定義・代表式

全微分可能とは、ある線形写像 $\mathbf A$ が存在し、$f(\mathbf{x}+\mathbf h)=f(\mathbf{x})+\mathbf A\mathbf h+\mathbf r(\mathbf h)$ かつ $\|\mathbf r(\mathbf h)\|/\|\mathbf h\|\to0$ を満たすこと。偏微分が適切に連続なら $\mathbf A=\mathbf J_f$。

代表式は

$$
f(\mathbf{x}+\Delta\mathbf{x})\approx f(\mathbf{x})+\mathbf J_f(\mathbf{x})\Delta\mathbf{x}
$$

です。

## なぜこの式・結論になるのか

### 1. 線形近似の候補を列ごとに決める

$\mathbf h=h\mathbf e_j$ とすると、全微分の線形部分は $h\mathbf A\mathbf e_j$。一方、各出力の変化率は偏微分列 $(\partial f_i/\partial x_j)_i$。よって $\mathbf A$ の第 $j$ 列はその偏微分列でなければならない。

### 2. 全列を並べる

各入力座標 $j=1,\ldots,n$ について上の列を並べると $\mathbf A=[\partial f_i/\partial x_j]_{m\times n}=\mathbf J_f$。

### 3. 近似誤差の条件

単に偏微分を並べるだけでなく、残差 $\mathbf r(\mathbf h)$ が $\|\mathbf h\|$ より速く0へ行くことで、どの方向へ小さく動いても同じ行列が一次近似になることを保証する。

## 教科書が省略しやすい一段を補う


### Jacobianは「偏微分表」ではなく局所線形写像

$f:\mathbb R^n\to\mathbb R^m$ が点 $\mathbf x$ で全微分可能とは、ある線形写像 $\mathbf A$ が存在して
$$
f(\mathbf x+\mathbf h)=f(\mathbf x)+\mathbf A\mathbf h+\mathbf r(\mathbf h),
\qquad
\frac{\|\mathbf r(\mathbf h)\|}{\|\mathbf h\|}\to0
$$
となることである。つまり誤差が移動量 $\|\mathbf h\|$ よりさらに小さくなるような一次近似が存在する、という定義である。

$\mathbf h=h\mathbf e_j$ としてj番目の座標方向だけ動かせば、$\mathbf A\mathbf e_j$ はfの各出力成分のj偏微分を並べた列になる。したがって $\mathbf A$ のj列がj方向偏微分であり、行列全体がJacobian $\mathbf J_f$ になる。この導出から、入力がn次元・出力がm次元ならJacobianが $m\times n$ になる理由も分かる。



## 途中を飛ばさず全体をつなぐ

### 全微分とJacobianの導出を一本につなげる

全微分可能とは、ある線形写像 $\mathbf A$ が存在し、$f(\mathbf{x}+\mathbf h)=f(\mathbf{x})+\mathbf A\mathbf h+\mathbf r(\mathbf h)$ かつ $\|\mathbf r(\mathbf h)\|/\|\mathbf h\|\to0$ を満たすこと。偏微分が適切に連続なら $\mathbf A=\mathbf J_f$。

#### 1. 線形近似の候補を列ごとに決める

まず出発点を固定する。 $\mathbf h=h\mathbf e_j$ とすると、全微分の線形部分は $h\mathbf A\mathbf e_j$。一方、各出力の変化率は偏微分列 $(\partial f_i/\partial x_j)_i$。よって $\mathbf A$ の第 $j$ 列はその偏微分列でなければならない。 次に必要になるのは「全列を並べる」である。

#### 2. 全列を並べる

ここまでで得た結果を次の段階へ渡す。 各入力座標 $j=1,\ldots,n$ について上の列を並べると $\mathbf A=[\partial f_i/\partial x_j]_{m\times n}=\mathbf J_f$。 次に必要になるのは「近似誤差の条件」である。

#### 3. 近似誤差の条件

最後に、前二段階の結果をまとめて結論へ進む。 単に偏微分を並べるだけでなく、残差 $\mathbf r(\mathbf h)$ が $\|\mathbf h\|$ より速く0へ行くことで、どの方向へ小さく動いても同じ行列が一次近似になることを保証する。

#### 代表式へ戻す

以上をまとめた中心式は

$$
f(\mathbf{x}+\Delta\mathbf{x})\approx f(\mathbf{x})+\mathbf J_f(\mathbf{x})\Delta\mathbf{x}
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

$f(x,y)=(x^2y,\ x+y^2)^T$。Jacobianは $\begin{bmatrix}2xy&x^2\\1&2y\end{bmatrix}$。$(1,2)$ では $\begin{bmatrix}4&1\\1&4\end{bmatrix}$。$\Delta\mathbf x=(0.01,-0.02)^T$ なら出力変化を行列積で一次近似できる。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

$f(x,y)=(e^x\cos y,e^x\sin y)$ は極座標的変換。$(0,0)$ でJacobianは単位行列なので、その点のごく近くでは入力変位がほぼそのまま出力変位になる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

全偏微分が存在しても全微分可能とは限らないので、「Jacobianを書けた＝必ず良い局所線形近似」とは言えない。前Topicの原点反例がそのまま使える。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

$f(x,y)=(x^2y,\ x+y^2)^T$。Jacobianは $\begin{bmatrix}2xy&x^2\\1&2y\end{bmatrix}$。$(1,2)$ では $\begin{bmatrix}4&1\\1&4\end{bmatrix}$。$\Delta\mathbf x=(0.01,-0.02)^T$ なら出力変化を行列積で一次近似できる。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

$f(x,y)=(e^x\cos y,e^x\sin y)$ は極座標的変換。$(0,0)$ でJacobianは単位行列なので、その点のごく近くでは入力変位がほぼそのまま出力変位になる。

## 成立条件と、条件を外したときに何が壊れるか

- Jacobianのshapeは「出力数×入力数」
- 全微分可能性は座標ごとの偏微分存在より強い
- 近似記号は高次残差を無視していることを意識する

全偏微分が存在しても全微分可能とは限らないので、「Jacobianを書けた＝必ず良い局所線形近似」とは言えない。前Topicの原点反例がそのまま使える。

## よくある誤解を分解する

- 結論だけを暗記せず、成立条件と導出のどこを使ったかを確認する。

Jacobianを「偏微分を表にしたもの」とだけ覚えるとshapeや行列積の意味が曖昧になる。Jacobianは入力の微小ベクトルを出力の微小ベクトルへ写す線形写像。

## 実装・数値計算では何に注意するか

自動微分ライブラリではJacobian全体を明示生成すると巨大になる場合がある。実務ではJacobian-vector productやvector-Jacobian productを計算し、必要な方向だけ伝播させる。

## ここから一段だけ発展する

局所線形写像を二つ連続して適用すれば行列積になる。この考えが多変数連鎖律であり、deep learningのbackpropagationへ直結する。


## このTopicを理解できたか確認する問い

- $m\times n$ になる理由を入力・出力次元から説明できるか
- Jacobianの各列を標準基底方向の方向微分として説明できるか
- 「全微分可能」の残差条件が何を保証するか

## 外部教材との照合

- [MIT OCW 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OCW 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1/)
- [OpenStax Calculus Volume 3](https://openstax.org/details/books/calculus-volume-3/)

[演習へ](/exercises/calc-total-derivative-jacobian)　|　[スライドへ](/slides/calc-total-derivative-jacobian/)
