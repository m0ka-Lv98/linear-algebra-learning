# GANとadversarial training

## Course・Unit内での位置付け

Course 09「深層学習」／Unit「生成・自己教師あり・表現学習」／第912 Topic。

## 今回解く問い

GANとadversarial trainingの定義、計算手順、成立条件を整理し、深層学習の後続Topicへ接続する。どの条件で成立し、どの出力を得て、どの後続Topicへ接続するかを明確にする。

## 概要

GAN、adversarial、trainingを、定義、直感、小さな例、計算、実装上の注意の順に整理する。

## 学習目標

- GAN、adversarial、trainingの主要な定義と成立条件を説明できる。
- 小さな問題を手計算し、式・shape・数値結果を検証できる。
- GANとadversarial trainingは、後続の数値計算・データ解析・機械学習で前提となる。

## 前提Topic

- [尤度と最尤推定](/courses/foundation/stat-likelihood-maximum-likelihood)
- [非凸最適化の診断とhyperparameter](/courses/foundation/opt-nonconvex-diagnostics-hyperparameters)

## 想定学習時間

スライド20分 / 教科書65分 / 演習55分

## 学習順序

スライドで全体像を把握し、教科書で定義と導出を確認し、演習で誤解を診断する。

## 教材

- [スライド](/slides/dl-gans-adversarial-training/)
- [教科書](/textbook/dl-gans-adversarial-training)
- [演習](/exercises/dl-gans-adversarial-training)

## 前後Topic

- [前のTopic：autoencoderとVAE](/courses/foundation/dl-autoencoders-vae)
- [次のTopic：diffusionとscore model](/courses/foundation/dl-diffusion-score-models)
