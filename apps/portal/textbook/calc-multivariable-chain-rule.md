# 多変数の連鎖律

> Course 01｜微積分。目標は「公式を暗記して解ける」ではなく、**定義・成立条件・計算・判定・説明を一続きでできること**。試験答案では、結論だけでなく根拠となる条件を明示する。

## このTopicで答えられるようにする問い

複数の中間変数を通る変化を、漏れなく合成するにはどうするか。

## 到達目標

- 経路に沿うスカラー関数の連鎖律を書ける
- Jacobian積として多変数連鎖律を書ける
- 行列shapeで式の向きを検算できる
- 計算グラフ上の複数経路の寄与を足し合わせられる

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
| $x(t),y(t)$ | $t$ に依存する中間変数 |
| $z=f(x,y)$ | 中間変数から作る出力 |
| $J_f$ | 関数 $f$ のJacobian |
| $J_{f\circ g}$ | 合成関数 $f(g(\cdot))$ のJacobian |

新しい記号はこの表または本文中で意味を定義してから使う。

## 2. 中心概念を丁寧に理解する

### 1. スカラー経路
$z=f(x,y)$、$x=x(t),y=y(t)$ なら
$$\frac{dz}{dt}=\frac{\partial f}{\partial x}\frac{dx}{dt}+\frac{\partial f}{\partial y}\frac{dy}{dt}.$$
$t$ の変化が $x$ 経路と $y$ 経路の両方を通って $z$ に影響するため、寄与を足す。

### 2. Jacobianによる連鎖律
$g:\mathbb R^n\to\mathbb R^p$、$f:\mathbb R^p\to\mathbb R^m$ のとき
$$J_{f\circ g}(\mathbf x)=J_f(g(\mathbf x))J_g(\mathbf x).$$
shapeは $(m\times p)(p\times n)=m\times n$。**順序を逆にしない**。

### 3. 計算グラフ
ある入力から出力へ複数経路がある場合、各経路では局所微分を掛け、同じ変数へ集まる寄与は足す。これがbackpropagationの基本ルール。

### 4. 1変数連鎖律との統一
$p=1$ ならJacobianは通常の導関数となり、$(f\circ g)'=f^{\prime}(g)g^{\prime}$ に戻る。多変数連鎖律は別物ではなく、同じ原理の行列表現。


## 図で確認する

![多変数の連鎖律の図解](/visuals/course-01/chain_rule_flow.png)

図は答えを覚えるためではなく、式の各項と幾何学的意味を対応させるために使う。

## 3. 計算・判定の標準手順

1. 依存関係を図か式で明示する
2. 各関数の入力・出力次元を書く
3. 局所Jacobianを求める
4. 外側Jacobian×内側Jacobianの順に掛ける
5. 複数経路なら寄与を足す
6. 最終shapeが入力→出力の写像に一致するか確認する

## 4. 典型例を途中式つきで解く


**例1：経路。** $z=x^2+y^2$, $x=t$, $y=t^2$。$dz/dt=2x\cdot1+2y\cdot2t=2t+4t^3$。
**例2：Jacobian積。** $g:\mathbb R^2\to\mathbb R^3$、$f:\mathbb R^3\to\mathbb R$ なら $J_g$ は $3\times2$、$J_f$ は $1\times3$。積 $J_fJ_g$ は $1\times2$ で正しい。
**例3：共有入力。** $u=x^2$, $v=x+1$, $z=uv$ では $dz/dx=(\partial z/\partial u)(du/dx)+(\partial z/\partial v)(dv/dx)=v(2x)+u(1)$。

## 5. テストでよく起きる誤り

- Jacobian積の順序を逆にする
- 複数経路の寄与を1つしか数えない
- 中間点 $g(\mathbf x)$ で外側Jacobianを評価しない
- shape確認をせず転置ミスをする

## 6. 満点答案に近づける書き方

- 依存関係を矢印で紙に書くのは有効だが、答案では式も必ず書く
- 行列の内側次元が一致するかを毎回確認する
- 「経路では掛ける、合流では足す」を言葉でも説明できるようにする

### 答案の共通チェック

- 使った定理・判定法の**条件**を満たしているか。
- 「候補」と「確定した結論」を区別しているか。
- 等号 $=$ と近似 $\approx$ を混同していないか。
- ベクトル・行列が出る場合、shapeが整合しているか。
- 問われた量に単位がある場合、単位まで書いたか。

## 7. 機械学習・数値計算への接続

backpropagationそのもの。深いニューラルネットでは局所Jacobianの積を効率よく計算し、損失から各パラメータへの勾配を伝播する。

## 8. このTopicを終える前の自己テスト

次の項目を、資料を見ずに説明・計算できれば次へ進んでよい。

- 経路に沿うスカラー関数の連鎖律を書ける
- Jacobian積として多変数連鎖律を書ける
- 行列shapeで式の向きを検算できる
- 計算グラフ上の複数経路の寄与を足し合わせられる
- 典型的な誤答を1つ挙げ、なぜ誤りか説明できる。
- 10問の演習で、解答を見ずに8問以上を最後まで解ける。

## 演習・スライド

- [10問の演習](/exercises/calc-multivariable-chain-rule)
- [スライド](/slides/calc-multivariable-chain-rule/)

## 参考にした標準カリキュラム

- MIT OpenCourseWare, 18.01SC Single Variable Calculus: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- MIT OpenCourseWare, 18.02SC Multivariable Calculus: https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- OpenStax, Calculus Volume 1: https://openstax.org/details/books/calculus-volume-1/

この教材は上記を転載したものではなく、Course 01 の学習順に合わせて独自に再構成した解説・例題・演習である。
