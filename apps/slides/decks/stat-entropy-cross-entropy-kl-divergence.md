---
theme: default
routerMode: hash
generatedBy: course01-10-slide-decks-v2
layout: cover
title: "エントロピー・交差エントロピー・KLダイバージェンス"
---

# エントロピー・交差エントロピー・KLダイバージェンス

Course 03｜確率・統計

---
layout: center
---

## 今回の問い

「エントロピー・交差エントロピー・KLダイバージェンス」は何を表し、どの条件で使え、結果をどう検算するのか？

---

## 到達目標

- エントロピー、交差エントロピー、KLダイバージェンスの定義と成立条件を説明できる
- エントロピー・交差エントロピー・KLダイバージェンスを小規模に計算・実装し検算できる

---

## まず全体像をつかむ

この章ではエントロピー・交差エントロピー・KLダイバージェンスを、観測値 x,y と確率変数 X,Y を区別しながら学ぶ。self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossを、定義から小さな計算、統計・機械学習のモデルへ接続する。

---

## 記号・定義

確率は P、期待値は E、分散は Var、共分散は Covで表す。self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossを次の式で要約する。

$$
D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}
$$

PMFは確率質量関数、PDFは確率密度関数、CDFは累積分布関数である。PDFの値は確率そのものではなく、区間積分が確率になる。

---

## 直感的な説明

有限個の結果を表に並べる場合と、連続量を密度曲線で表す場合を分けて考える。標本 X₁,…,Xₙ は確率変数としての標本で、観測値 x₁,…,xₙ は実現値である。条件付け、周辺化、標準化は同じモデルを別の角度から読む操作である。

---

## 正式な定義と導出

supportと正規化条件を確認し、定義を総和または積分へ展開する。独立性を使うとjointな量を積へ分解できるが、排反、無相関、独立、因果は別の概念である。尤度はデータを固定した母数の関数であり、母数の確率分布ではない。信頼区間は反復標本抽出の被覆率で解釈し、p-valueは帰無仮説が正しい確率ではない。

---

## 小さな手計算

確率が0以上1以下、PMFの和またはPDFの積分が1であることを確認する。$2\times 2$の分割表や少数の標本で式を一行ずつ展開し、丸めは最後に行う。

---

## 数値的な確認

標準PythonとNumPyで `rng = np.random.default_rng(42)` を使った小規模実験を行える。seedは一条件を固定するが、科学的再現性を単独で保証しない。平均、分散、対数尤度、残差、entropyは手計算と np.allclose で照合する。

---

## 統計・機械学習への接続

確率モデルは推定量、MLE、MAP、信頼区間、検定、線形回帰、classification lossへつながる。線形回帰では設計行列 $X\in \mathbb{R}^{n\times d}$、応答 $y\in \mathbb{R}^{n}$、係数 β∈$\mathbb{R}^{d}$のshapeを保つ。WLS、GLS、WLSMの詳細はCourse 07へ回す。

---

## よくある誤解

- PDFの高さを一点の確率と読む。
- 排反を独立、無相関を独立と呼ぶ。
- 尤度を母数の確率と読む。
- 信頼区間を母数が95%の確率で含まれると読む。
- p-valueを帰無仮説の確率と読む。
- KLダイバージェンスを対称な距離と断定する。

---

## まとめ

エントロピー・交差エントロピー・KLダイバージェンスは、定義、support、shape、前提、数値検算を順に確認すると安全に扱える。

---

## 前提との接続

このTopicは次の内容を土台にする。式や用語が曖昧なら、先に対応するTopicへ戻る。

- `prob-discrete-distributions`
- `prob-continuous-distributions`
- `stat-likelihood-maximum-likelihood`
- `prep-exponents-logarithms`

---

## 理解確認

1. エントロピー、交差エントロピー、KLダイバージェンスの定義と成立条件を説明できる
2. エントロピー・交差エントロピー・KLダイバージェンスを小規模に計算・実装し検算できる
3. 代表式・計算手順・成立条件を小さな例で検算できるか。

---

## 演習へ

[教科書](../../textbook/stat-entropy-cross-entropy-kl-divergence)

[10問の演習](../../exercises/stat-entropy-cross-entropy-kl-divergence)

