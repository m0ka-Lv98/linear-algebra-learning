# diffusionとscore model

## Course・Unit内での位置付け

Course 09「深層学習」／Unit「生成・自己教師あり・表現学習」／第913 Topic。

## 今回解く問い

diffusionとscore modelの定義、計算手順、成立条件を整理し、深層学習の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

diffusion、score、modelを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- diffusion、score、modelの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- diffusionとscore modelは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [主要な連続分布](/courses/foundation/prob-continuous-distributions)
- [常微分方程式・Euler法・Runge–Kutta法](/courses/foundation/num-ode-euler-runge-kutta)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/dl-diffusion-score-models/)
- [教科書](/textbook/dl-diffusion-score-models)
- [演習](/exercises/dl-diffusion-score-models)

## 前後Topic

- [前のTopic：GANとadversarial training](/courses/foundation/dl-gans-adversarial-training)
- [次のTopic：自己教師あり・contrastive学習](/courses/foundation/dl-self-supervised-contrastive)
