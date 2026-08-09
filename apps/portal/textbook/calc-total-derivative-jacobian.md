# 全微分とJacobian

> Course 01｜微積分。目標は「公式を暗記して解ける」ではなく、**定義・成立条件・計算・判定・説明を一続きでできること**。試験答案では、結論だけでなく根拠となる条件を明示する。

## このTopicで答えられるようにする問い

多変数関数を、ある点の近くで最もよい線形写像として近似するにはどうするか。

## 到達目標

- 全微分を一次近似として説明できる
- Jacobianのshapeを入力次元・出力次元から決められる
- ベクトル値関数のJacobianを計算できる
- 線形近似を使って小さな入力変化から出力変化を近似できる

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
| $\mathbf{x}\in\mathbb R^n$ | 入力ベクトル |
| $\mathbf{f}:\mathbb R^n\to\mathbb R^m$ | $m$ 次元出力を返す関数 |
| $J_{\mathbf f}(\mathbf x)$ | $m\times n$ のJacobian行列 |
| $d\mathbf x$ | 十分小さい入力変化 |
| $d\mathbf f$ | 一次近似された出力変化 |

新しい記号はこの表または本文中で意味を定義してから使う。

## 2. 中心概念を丁寧に理解する

### 1. 全微分
スカラー値関数 $f(x,y)$ では、小さい変化 $(dx,dy)$ に対して
$$df\approx f_x\,dx+f_y\,dy.$$
これは接平面による一次近似。

### 2. Jacobian
$\mathbf f:\mathbb R^n\to\mathbb R^m$ のJacobianを
$$J_{\mathbf f}(\mathbf x)=\left[\frac{\partial f_i}{\partial x_j}\right]_{m\times n}$$
と定義する。**行は出力成分、列は入力成分**。したがって入力変化 $d\mathbf x\in\mathbb R^n$ に対し
$$d\mathbf f\approx J_{\mathbf f}(\mathbf x)d\mathbf x\in\mathbb R^m.$$

### 3. scalar outputとの関係
$f:\mathbb R^n\to\mathbb R$ ではJacobianは $1\times n$。勾配を列ベクトルで定義すると $J_f=\nabla f^T$。

### 4. 「微分＝数」から「微分＝線形写像」へ
1変数では導関数は傾き1個だった。多変数・ベクトル値では、微分の本体は小さな入力変化を出力変化へ写す線形写像であり、その座標表示がJacobian。


## 図で確認する

![全微分とJacobianの図解](/visuals/course-01/jacobian_grid.png)

<img src="/visuals/course-01/jacobian_grid_deform.gif" alt="全微分とJacobianの動的図解" style="max-height: 360px; width: auto; margin: 0.6rem auto;" />

図は答えを覚えるためではなく、式の各項と幾何学的意味を対応させるために使う。

## 3. 計算・判定の標準手順

1. 関数の入力次元 $n$ と出力次元 $m$ を書く
2. Jacobianが $m\times n$ になることを先に決める
3. 各出力 $f_i$ を各入力 $x_j$ で偏微分する
4. 評価点を代入する
5. 小変化を近似するなら $Jd\mathbf x$ を計算する
6. 行列積のshapeが $m\times n$ と $n\times1$ で整合するか確認する

## 4. 典型例を途中式つきで解く


**例1：** $\mathbf f(x,y)=[x^2+y,\ xy]^T$ なら
$$J=\begin{bmatrix}2x&1\\y&x\end{bmatrix}.$$
$(1,2)$ では $J=\begin{bmatrix}2&1\\2&1\end{bmatrix}$。
**例2：小変化。** 上の点で $d\mathbf x=[0.01,-0.02]^T$ なら $d\mathbf f\approx Jd\mathbf x=[0,0]^T$。この方向では一次の変化が相殺される。
**例3：scalar output。** $f=x^2+y^2$ なら $J_f=[2x,2y]=\nabla f^T$。

## 5. テストでよく起きる誤り

- Jacobianの行列を転置してしまう
- 出力と入力の順序を混同する
- $Jd\mathbf x$ ではなく $d\mathbf xJ$ と掛ける
- 全微分の等号を有限変化にも厳密に使う

## 6. 満点答案に近づける書き方

- 最初に $\mathbb R^n\to\mathbb R^m$ とshapeを書く
- 行＝出力、列＝入力を固定する
- 一次近似なので大きな変化では誤差が増えると説明する

### 答案の共通チェック

- 使った定理・判定法の**条件**を満たしているか。
- 「候補」と「確定した結論」を区別しているか。
- 等号 $=$ と近似 $\approx$ を混同していないか。
- ベクトル・行列が出る場合、shapeが整合しているか。
- 問われた量に単位がある場合、単位まで書いたか。

## 7. 機械学習・数値計算への接続

ニューラルネットの各層はベクトル値関数。各層のJacobianを連鎖律で掛けることがbackpropagationの線形代数的な見方である。

## 8. このTopicを終える前の自己テスト

次の項目を、資料を見ずに説明・計算できれば次へ進んでよい。

- 全微分を一次近似として説明できる
- Jacobianのshapeを入力次元・出力次元から決められる
- ベクトル値関数のJacobianを計算できる
- 線形近似を使って小さな入力変化から出力変化を近似できる
- 典型的な誤答を1つ挙げ、なぜ誤りか説明できる。
- 10問の演習で、解答を見ずに8問以上を最後まで解ける。

## 演習・スライド

- [10問の演習](/exercises/calc-total-derivative-jacobian)
- [スライド](/slides/calc-total-derivative-jacobian/)

## 参考にした標準カリキュラム

- MIT OpenCourseWare, 18.01SC Single Variable Calculus: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- MIT OpenCourseWare, 18.02SC Multivariable Calculus: https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- OpenStax, Calculus Volume 1: https://openstax.org/details/books/calculus-volume-1/

この教材は上記を転載したものではなく、Course 01 の学習順に合わせて独自に再構成した解説・例題・演習である。
