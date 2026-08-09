# Lagrange乗数法

> Course 01｜微積分。目標は「公式を暗記して解ける」ではなく、**定義・成立条件・計算・判定・説明を一続きでできること**。試験答案では、結論だけでなく根拠となる条件を明示する。

## このTopicで答えられるようにする問い

制約曲線・制約曲面の上だけで最大・最小を探すにはどうするか。

## 到達目標

- 等式制約付き最適化をLagrange方程式へ変換できる
- $\nabla f=\lambda\nabla g$ の幾何学的意味を説明できる
- 候補点を制約式と合わせて解ける
- 正則性や候補比較など、方法の適用条件を説明できる

## 0. まず全体像

このTopicでは、式を見た瞬間に公式へ飛びつくのではなく、次の順で考える。

1. **対象は何か**：入力・出力・変数・次元を確認する。
2. **定義は何か**：公式が何を意味するかを言葉で説明する。
3. **成立条件は何か**：連続性、微分可能性、正定値性など必要な仮定を確認する。
4. **計算する**：途中式を省略しすぎず、規則を順番に適用する。
5. **検算する**：符号、単位、shape、極限、グラフの直感で矛盾がないかを見る。
6. **結論を書く**：局所／大域、必要／十分などを曖昧にしない。

## 1. 記号と前提

| 記号 | 意味 |
|---|---|
| $f(\mathbf x)$ | 最適化したい目的関数 |
| $g(\mathbf x)=c$ | 満たすべき等式制約 |
| $\lambda$ | Lagrange乗数 |
| $\nabla g$ | 制約面に垂直な法線方向 |

新しい記号はこの表または本文中で意味を定義してから使う。

## 2. 中心概念を丁寧に理解する

### 1. なぜ勾配が平行になるか
制約 $g(\mathbf x)=c$ 上を動ける方向は制約面の接線方向。制約付き極値では、その許される方向へ目的関数を一階で増減できない。したがって $\nabla f$ は接線方向に直交し、同じく法線である $\nabla g$ と平行になる。

### 2. Lagrange条件
正則点、すなわち $\nabla g(\mathbf x^*)\ne0$ で制約付き局所極値をとるなら、ある $\lambda$ が存在して
$$\nabla f(\mathbf x^*)=\lambda\nabla g(\mathbf x^*),\qquad g(\mathbf x^*)=c.$$
未知数は $\mathbf x$ と $\lambda$。この連立方程式を解く。

### 3. Lagrangian
$$\mathcal L(\mathbf x,\lambda)=f(\mathbf x)-\lambda(g(\mathbf x)-c)$$
とおけば、$\nabla_{\mathbf x}\mathcal L=0$ と $\partial\mathcal L/\partial\lambda=0$ が上の条件になる。

### 4. 候補を比較する
Lagrange条件で得た点は候補。閉じた制約集合などで最大・最小を問う場合は候補の $f$ 値を比較して結論する。

### 5. 注意
$\nabla g=0$ となる非正則点では標準条件が直接使えないことがある。また不等式制約にはKKT条件へ拡張する。


## 図で確認する

![Lagrange乗数法の図解](/visuals/course-01/lagrange_touch.png)

<img src="/visuals/course-01/lagrange_levels.gif" alt="Lagrange乗数法の動的図解" style="max-height: 360px; width: auto; margin: 0.6rem auto;" />

図は答えを覚えるためではなく、式の各項と幾何学的意味を対応させるために使う。

## 3. 計算・判定の標準手順

1. 目的関数 $f$ と制約 $g=c$ を明示する
2. $\nabla f$ と $\nabla g$ を計算する
3. $\nabla f=\lambda\nabla g$ と制約式を連立する
4. 候補点をすべて求める
5. 各候補で目的関数値を比較する
6. $\nabla g=0$ など非正則点がないか確認する

## 4. 典型例を途中式つきで解く


**例1：円上で $x+y$ を最大化。** 制約 $x^2+y^2=1$。$\nabla f=[1,1]^T$, $\nabla g=[2x,2y]^T$。$1=2\lambda x,1=2\lambda y$ より $x=y$。制約から $x=y=\pm1/\sqrt2$。最大値 $\sqrt2$、最小値 $-\sqrt2$。
**例2：積を最大化。** $x+y=10$, $x,y>0$ で $xy$ を最大化。$\nabla f=[y,x]^T=\lambda[1,1]^T$ より $x=y$、制約から5,5。最大積25。
**例3：幾何学。** 目的関数の等高線を動かして制約曲線に最後に接する点では、2つの曲線の法線＝勾配が平行になる。これが式 $\nabla f=\lambda\nabla g$ の図形的意味。

## 5. テストでよく起きる誤り

- 制約式を連立し忘れる
- $\lambda$ を最適値だと思う
- 候補が複数あるのに目的関数値を比較しない
- $\nabla g=0$ の可能性を無視する

## 6. 満点答案に近づける書き方

- 勾配平行の図形的意味を説明できるようにする
- 候補点→目的関数値の表を作ると最大・最小を取り違えにくい
- Lagrange条件は必要条件であり、候補の確認が必要

### 答案の共通チェック

- 使った定理・判定法の**条件**を満たしているか。
- 「候補」と「確定した結論」を区別しているか。
- 等号 $=$ と近似 $\approx$ を混同していないか。
- ベクトル・行列が出る場合、shapeが整合しているか。
- 問われた量に単位がある場合、単位まで書いたか。

## 7. 機械学習・数値計算への接続

正規化制約、確率分布の総和1制約、最小二乗の制約版などに現れる。不等式制約を含む最適化ではKKT条件へ発展する。

## 8. このTopicを終える前の自己テスト

次の項目を、資料を見ずに説明・計算できれば次へ進んでよい。

- 等式制約付き最適化をLagrange方程式へ変換できる
- $\nabla f=\lambda\nabla g$ の幾何学的意味を説明できる
- 候補点を制約式と合わせて解ける
- 正則性や候補比較など、方法の適用条件を説明できる
- 典型的な誤答を1つ挙げ、なぜ誤りか説明できる。
- 10問の演習で、解答を見ずに8問以上を最後まで解ける。

## 演習・スライド

- [10問の演習](/exercises/calc-lagrange-multipliers)
- [スライド](/slides/calc-lagrange-multipliers/)

## 参考にした標準カリキュラム

- MIT OpenCourseWare, 18.01SC Single Variable Calculus: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- MIT OpenCourseWare, 18.02SC Multivariable Calculus: https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- OpenStax, Calculus Volume 1: https://openstax.org/details/books/calculus-volume-1/

この教材は上記を転載したものではなく、Course 01 の学習順に合わせて独自に再構成した解説・例題・演習である。
