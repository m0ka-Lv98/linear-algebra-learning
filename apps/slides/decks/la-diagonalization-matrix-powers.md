---
theme: default
routerMode: hash
generatedBy: course01-10-slide-decks-v2
layout: cover
title: "対角化と行列の累乗"
---

# 対角化と行列の累乗

Course 02｜線形代数

---
layout: center
---

## 今回の問い

「対角化と行列の累乗」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- 対角化、行列の累乗の定義と成立条件を説明できる
- 対角化と行列の累乗を小規模に計算・実装し検算できる

---

## まず全体像をつかむ

対角化と行列の累乗を、数式、shape、幾何、アルゴリズム、数値上の注意から理解する。スカラーは小文字、ベクトルは太字小文字、行列は太字大文字で表す。

---

## 記号・型・次元

ベクトルxは$\mathbb{R}^{n}$、行列Aは$\mathbb{R}^{m\times n}$とする。rankは独立な方向の数、spanは線形結合で生成される集合、null spaceは$Ax=0$の解集合である。行列積、分解、ノルムはshapeを照合してから計算する。

---

## 直感的な説明

ベクトルを矢印またはデータ点、行列をデータ表または線形写像として見る。射影・最小二乗では残差を直交分解し、固有値・特異値では伸縮する方向を探す。

---

## 正式な定義

線形結合は$y=c1v1+$…+ckvk。線形写像は$T(x)=Ax$かつ$T(cx+dy)=cT(x)+dT(y)$。行列積は$c_ij=\Sigma _k$ a_ik b_kj。連立系は$Ax=b$。内積は<x,y>=$x^T$ y、ノルムは$||x||2=sqrt(x^T$ x)。射影は$proj_v(x)=(v^T$ $x)/(v^T$ v)v、最小二乗は$min_x||Ax-b||2^2$である。

固有対は$Av=\lambda v$、SVDは$A=U\Sigma V^T$、二次形式は$q(x)=x^T$ A x。擬似逆行列は$A+=V\Sigma +U^T$、低ランク近似はΣの大きい成分を残す。行列ノルムはFrobenius normとspectral norm、条件数は入力誤差への感度を表す。

---

## 小さな手計算

$2\times 2$または$3\times 2$の例で、行列積、消去、直交化、固有方程式、SVDのshapeを確認する。LUは$A=LU$、Choleskyは$A=LL^T$、QRは$A=QR$と分けて読む。逆行列を理論式として書けても、数値計算ではsolve、lstsq、qr、svdを優先する。

---

## 導出と幾何学的解釈

行基本変形は解集合を保つ等価変形として読む。列空間はAxで到達できる範囲、零空間は同じ出力を0へ送る入力である。直交基底では係数を$q_i^T$ xで抽出し、最小二乗残差は列空間に直交する。固有ベクトルは不変方向、特異ベクトルは入力・出力の直交方向である。

---

## アルゴリズム

ガウス消去、LUの前進・後退代入、Gram–Schmidt、QR、Cholesky、固有分解、SVDの役割を、前提条件と出力shapeとともに区別する。rank不足やゼロ特異値を無視せず、最小ノルム解や切り詰め近似を使う。

---

## 数値計算上の注意

逆行列を明示計算してsolveしない。normal equationsは条件数を悪化させ得るので無条件に推奨しない。残差が小さくても解誤差が小さいとは限らず、condition number、rank、許容誤差を確認する。exact equalityではなくallcloseを使い、shapeとdtypeを記録する。

---

## NumPyとの対応

`np.linalg.solve`は正方非特異系、`np.linalg.lstsq`は最小二乗、`np.linalg.qr`はQR、`np.linalg.svd`はSVDを扱う。配列のndimと数学的次元を混同せず、A.shapeを表示してから@、転置、分解を読む。

---

## データ解析・機械学習への接続

特徴量行列、線形回帰、WLS、PCA、低ランク圧縮、ニューラルネットワークの線形層、共分散、条件の悪い推定へ接続する。重みを逆分散と断定せず、統計的詳細やKKTは後続Courseで扱う。

---

## よくある誤解

- rank、次元、要素数を同一視する。
- inverseとpseudoinverse、行列積と要素積を混同する。
- 直交と線形独立を同一視する。
- 正定値なら常に数値的に安全と思う。
- 残差だけで解の精度を判断する。

---

## まとめ

定義、shape、前提条件、幾何、数値安定性を順に確認すれば、線形代数の分解と最適化を安全に実装へ接続できる。

---

## 前提との接続

このTopicは次の内容を土台にする。式や用語が曖昧なら、先に対応するTopicへ戻る。

- `la-eigenvalues-eigenvectors`
- `la-basis-coordinates-dimension`

---

## 理解確認

1. 対角化、行列の累乗の定義と成立条件を説明できる
2. 対角化と行列の累乗を小規模に計算・実装し検算できる
3. 代表式・計算手順・成立条件を小さな例で検算できるか。

---

## 演習へ

[教科書](../../textbook/la-diagonalization-matrix-powers)

[10問の演習](../../exercises/la-diagonalization-matrix-powers)

