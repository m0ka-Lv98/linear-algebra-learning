# Hessianと二次近似

> Course 01｜微積分。目標は「公式を暗記して解ける」ではなく、**定義・成立条件・計算・判定・説明を一続きでできること**。試験答案では、結論だけでなく根拠となる条件を明示する。

## このTopicで答えられるようにする問い

多変数関数の「曲がり方」を行列でどう表し、停留点をどう分類するか。

## 到達目標

- Hessianを計算できる
- 二次形式 $\mathbf h^TH\mathbf h$ の意味を説明できる
- Hessianの正定値性で停留点を分類できる
- 多変数Taylor二次近似を書ける

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
| $H_f(\mathbf x)$ | 二階偏導関数を並べたHessian行列 |
| $\mathbf h$ | 基準点からの小さな変位ベクトル |
| $\lambda_i$ | Hessianの固有値 |
| $\mathbf h^TH\mathbf h$ | 方向 $\mathbf h$ に沿う二次の曲率寄与 |

新しい記号はこの表または本文中で意味を定義してから使う。

## 2. 中心概念を丁寧に理解する

### 1. Hessian
$f:\mathbb R^n\to\mathbb R$ に対して
$$H_f(\mathbf x)=\left[\frac{\partial^2f}{\partial x_i\partial x_j}\right]_{n\times n}.$$
十分滑らかなら混合偏微分が等しく、Hessianは対称行列になる。

### 2. 二次Taylor近似
基準点 $\mathbf x$ から小さく $\mathbf h$ 動くと
$$f(\mathbf x+\mathbf h)\approx f(\mathbf x)+\nabla f(\mathbf x)^T\mathbf h+\frac12\mathbf h^TH_f(\mathbf x)\mathbf h.$$
勾配が傾き、Hessianが曲率を担う。

### 3. 停留点の分類
$\nabla f(\mathbf x^*)=0$ の点で、Hessianが
- 正定値（全固有値 $>0$）：厳密な局所最小。
- 負定値（全固有値 $<0$）：厳密な局所最大。
- 不定（正負の固有値）：鞍点。
- 半正定値などゼロ固有値を含む：二階判定だけでは不十分な場合がある。

### 4. 2変数の行列式判定
$$H=\begin{bmatrix}f_{xx}&f_{xy}\\f_{yx}&f_{yy}\end{bmatrix},\quad D=f_{xx}f_{yy}-f_{xy}^2.$$
停留点で $D>0,f_{xx}>0$ なら局所最小、$D>0,f_{xx}<0$ なら局所最大、$D<0$ なら鞍点。$D=0$ は判定不能。


## 図で確認する

![Hessianと二次近似の図解](/visuals/course-01/hessian_contours.png)

![Hessianと二次近似の図解](/visuals/course-01/hessian_heatmap.png)

図は答えを覚えるためではなく、式の各項と幾何学的意味を対応させるために使う。

## 3. 計算・判定の標準手順

1. 一階偏導関数から停留点を求める
2. 二階偏導関数を計算してHessianを作る
3. 評価点を代入する
4. 固有値または2変数なら行列式判定を使う
5. ゼロ固有値や $D=0$ なら二階判定だけで断定しない

## 4. 典型例を途中式つきで解く


**例1：局所最小。** $f=x^2+2y^2$ では $H=\mathrm{diag}(2,4)$。固有値は2,4で正なので原点は厳密な局所最小。
**例2：鞍点。** $f=x^2-y^2$ のHessianは $\mathrm{diag}(2,-2)$。方向によって上向き・下向きが変わるので原点は鞍点。
**例3：二次近似。** 停留点で $H$ が正定値なら $\frac12\mathbf h^TH\mathbf h>0$ なので、十分小さい非ゼロ $\mathbf h$ に対し関数値が増える。これが局所最小判定の直感。

## 5. テストでよく起きる誤り

- HessianをJacobianと同じ一階微分だと思う
- 固有値に0があるのに最小と断定する
- 鞍点を「極値なし」だけで終え、方向による符号変化を説明しない
- 二次形式の $1/2$ を落とす

## 6. 満点答案に近づける書き方

- 停留点→Hessian→符号判定という順序を守る
- 2変数では $D$ と $f_{xx}$ の条件をセットで覚える
- $D=0$ は判定不能であって極値なしではない

### 答案の共通チェック

- 使った定理・判定法の**条件**を満たしているか。
- 「候補」と「確定した結論」を区別しているか。
- 等号 $=$ と近似 $\approx$ を混同していないか。
- ベクトル・行列が出る場合、shapeが整合しているか。
- 問われた量に単位がある場合、単位まで書いたか。

## 7. 機械学習・数値計算への接続

HessianはNewton法や曲率解析で使われる。大規模MLでは完全なHessianは高価なため、Hessian-vector productや近似曲率が使われる。

## 8. このTopicを終える前の自己テスト

次の項目を、資料を見ずに説明・計算できれば次へ進んでよい。

- Hessianを計算できる
- 二次形式 $\mathbf h^TH\mathbf h$ の意味を説明できる
- Hessianの正定値性で停留点を分類できる
- 多変数Taylor二次近似を書ける
- 典型的な誤答を1つ挙げ、なぜ誤りか説明できる。
- 10問の演習で、解答を見ずに8問以上を最後まで解ける。

## 演習・スライド

- [10問の演習](/exercises/calc-hessian-second-order)
- [スライド](/slides/calc-hessian-second-order/)

## 参考にした標準カリキュラム

- MIT OpenCourseWare, 18.01SC Single Variable Calculus: https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/
- MIT OpenCourseWare, 18.02SC Multivariable Calculus: https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/
- OpenStax, Calculus Volume 1: https://openstax.org/details/books/calculus-volume-1/

この教材は上記を転載したものではなく、Course 01 の学習順に合わせて独自に再構成した解説・例題・演習である。
