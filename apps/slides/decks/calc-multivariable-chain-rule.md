---
theme: default
routerMode: hash
generatedBy: course01-10-slide-decks-v2
layout: cover
title: "多変数の連鎖律"
---

# 多変数の連鎖律

Course 01｜微積分

---
layout: center
---

## 今回の問い

「多変数の連鎖律」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 多変数の連鎖律の定義と成立条件を説明できる
- 多変数の連鎖律を小規模に計算・実装し検算できる

---

## まず全体像をつかむ

$f:\mathbb{R}^{n}\to \mathbb{R}^{m}$、$g:\mathbb{R}^{m}\to \mathbb{R}^{p}$の合成を扱う。Jg∘$f(x)=Jg(f(x))Jf(x)$、Jf $m\times n$、Jg $p\times m$、合成 $p\times n$をshapeで確認する。JVP・VJPとreverse-modeを予告する。 数式の仮定と結論、ベクトル・行列の次元、Python/NumPyでの数値確認を区別して説明する。

---

## 中心となる式・記号

- $f:\mathbb{R}^{n}\to \mathbb{R}^{m}$
- $g:\mathbb{R}^{m}\to \mathbb{R}^{p}$の合成を扱う
- Jg∘$f(x)=Jg(f(x))Jf(x)$

---

## 直感的な説明

グラフ、接線、面積、等高線、局所平面を小さな例から読む。計算結果をただ暗記せず、入力を少し動かしたときの出力の変化として理解する。

---

## 記号と型

一変数関数は f: $R\to R$、多変数のスカラー値関数は $f:\mathbb{R}^{n}\to R$、ベクトル値関数は $f:\mathbb{R}^{n}\to \mathbb{R}^{m}$ と定義する。入力ベクトル x は$\mathbb{R}^{n}$、出力ベクトルは$\mathbb{R}^{m}$に属する。勾配は$\nabla f(x)\in \mathbb{R}^{n}$、Jacobianは$J_f(x)\in \mathbb{R}^{m\times n}$、Hessianは$H_f(x)\in \mathbb{R}^{n\times n}$である。

---

## 正式な定義

極限は$lim_{x\to a}f(x)=L$、左右極限は$lim_{x\to a-}$と$lim_{x\to a+}$で表す。点aでの連続性は極限が存在し$lim_{x\to a}f(x)=f(a)$となること。微分は$f'(x)=lim_{h\to 0}(f(x+h)-f(x))/h$。積分は$\int _a^b$ f(x)dx、原始関数Fは$F'=f$を満たす。Taylor近似は展開点aと有限次数rを用いる局所近似であり恒等式ではない。

偏微分は他の変数を固定して$\partial f/\partial x_i$を取る。勾配は各偏微分を並べ、方向微分はD_u $f=\nabla f(x)^T$ u、$||u||_2=1$。全微分の局所近似は$f(x+\Delta x)\approx f(x)+J_f(x)\Delta x$で、行列のshapeは$m\times n$。二次近似は$f(x+\Delta x)\approx f(x)+\nabla f(x)^T\Delta x+1/2$ $\Delta x^T$ $H_f(x)\Delta x$。合成の連鎖律はJ_(g∘$f)=J_g(f(x))J_f(x)$である。

---

## 小さな例

$f(x)=x^2$なら差分商を展開して$f'(x)=2x$。$f(x1,x2)=x1^2+3x1x2+x2^2$なら偏微分は(2x1+3x2,3x1+2x2)。$f(x1,x2)=(x1-1)^2+2(x2+1)^2$では勾配ゼロの点を調べる。制約$x1+x2=1$の最小化では$L=x1^2+x2^2+\lambda (x1+x2-1)$を使う。

---

## 導出

平均変化率から差分商、極限から導関数へ進む。積・商・連鎖律は積の定義または合成の入力経路を分解して得る。定積分は分割した長方形の和の極限として理解し、基本定理で原始関数と接続する。多変数では各入力方向を列、各出力成分を行としてJacobianを作る。

---

## 幾何学的解釈

勾配は等高線に直交する最急上昇方向、Hessianは曲率の局所情報、Lagrange条件は目的関数と制約の勾配が平行になる候補を表す。停留点は最小点とは限らず、端点・鞍点・不定曲率を確認する。

---

## 数値的な確認

表でxをaへ近づけて極限を推定し、forward differenceで微分を近似する。解析微分と数値微分は複数の刻み幅で比較する。Taylor近似、偏微分、Jacobianは小さなΔxで残差を確認する。NumPyでは配列のshapeを表示し、行列積は@で、許容誤差はisclose/allcloseで検査する。

---

## 機械学習への接続

損失関数の連続性、パラメータの変化率、計算グラフ、backpropagation、gradient descent、Newton法、softmax、log-likelihood、制約付き最適化に接続する。JVPはJacobianと方向の積、VJPは逆向きにベクトルを伝える計算の直感として紹介する。高度な確率・KKT・数値解析は後続Courseへ回す。

---

## よくある誤解

- 極限値と関数値を同一視する。
- 連続なら必ず微分可能、停留点なら必ず最小点と思う。
- 定積分と不定積分、Taylor近似と恒等式を混同する。
- 偏微分、勾配、Jacobian、Hessianのshapeを確認しない。
- 必要条件を十分条件として断定する。

---

## まとめ

定義、仮定、shape、幾何、数値検算を順に確認すると、微積分の式を機械学習の局所モデルへ安全に接続できる。

---

## 前提との接続

このTopicは次の内容を土台にする。式や用語が曖昧なら、先に対応するTopicへ戻る。

- `calc-total-derivative-jacobian`
- `calc-differentiation-rules-chain-rule`

---

## 理解確認

1. 多変数の連鎖律の定義と成立条件を説明できる
2. 多変数の連鎖律を小規模に計算・実装し検算できる
3. 代表式・計算手順・成立条件を小さな例で検算できるか。

---

## 演習へ

[教科書](../../textbook/calc-multivariable-chain-rule)

[10問の演習](../../exercises/calc-multivariable-chain-rule)

