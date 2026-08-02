# Courseカタログ

機械可読な台帳とデータモデルは [content/courses.yml](../content/courses.yml)、[content/curriculum.yml](../content/curriculum.yml)、[カリキュラムデータモデル](curriculum-data-model.md) を参照してください。

各Courseは、MITの講義名やUnit構成をそのまま再現するものではない。参照先を手がかりに、日本語学習者が前提知識を補いながら進められる独自の順序と到達目標を定める。

## Course 00：学習準備

- **Course ID**：00
- **目的**：数式を読むための記号、集合・関数、和・指数・対数、Python/NumPy、証明の読み方を揃える。
- **主なMIT参照**：特定科目には固定しない。日本語学習支援は独自に構成する。
- **主要Unit**：数式と記号、集合と関数、和・指数・対数、PythonとNumPy、証明の読み方
- **前提Course**：なし
- **到達目標**：数式の各記号と型を説明し、小さな計算をコードで検算できる。
- **層**：Core

## Course 01：微積分

- **Course ID**：01
- **目的**：変化率、積分、Taylor近似、勾配を最適化と学習へ接続する。
- **主なMIT参照**：18.01 Single Variable Calculus、18.02 Multivariable Calculus
- **主要Unit**：関数・極限・微分、chain rule、積分、Taylor展開、偏微分、gradient/Jacobian/Hessian、多変数最適化、Lagrange乗数法
- **前提Course**：00
- **到達目標**：導関数と勾配を導出し、最適化問題の局所的な構造を説明できる。ベクトル解析は機械学習の主経路では必要部分を選択する。
- **層**：Core

## Course 02：線形代数

- **Course ID**：02
- **目的**：ベクトル・行列・部分空間から射影、固有値、SVDまでを学ぶ。
- **主なMIT参照**：18.06 Linear Algebra、18.700 Linear Algebra
- **主要Unit**：ベクトルと行列、行列方程式、Gaussian elimination/LU、部分空間、独立性・基底・次元、rankと基本部分空間、内積・直交性、射影・最小二乗、固有値、正定値行列、SVD、低ランク近似
- **前提Course**：00
- **到達目標**：線形写像を行列で表し、直交射影、最小二乗、固有分解、SVDを幾何的に説明できる。
- **層**：Core

## Course 03：確率統計

- **Course ID**：03
- **目的**：不確実性を確率モデルと推定、検定、回帰で扱う。
- **主なMIT参照**：18.05 Introduction to Probability and Statistics
- **主要Unit**：組合せ・確率、条件付き確率とBayes、確率変数、期待値・分散・共分散、分布、多変量正規、推定、MLE/MAP、信頼区間、仮説検定、回帰、情報
- **前提Course**：00、01、02
- **到達目標**：確率モデルを定め、推定量の意味と不確実性を説明し、回帰とWLSMへ接続できる。
- **層**：Core

## Course 04：離散数学と証明

- **Course ID**：04
- **目的**：定義を使って主張を組み立て、アルゴリズムの正しさと計算量を読む。
- **主なMIT参照**：6.042J Mathematics for Computer Science
- **主要Unit**：論理、集合・関係、帰納法、不変量、漸近記法、組合せ、グラフ、漸化式、離散確率
- **前提Course**：00
- **到達目標**：基本的な証明を読み書きし、アルゴリズムの不変量と計算量を説明できる。機械学習の主経路では短縮版とする。
- **層**：Core

## Course 05：数値計算

- **Course ID**：05
- **目的**：有限精度の計算で誤差を把握し、安定な線形代数アルゴリズムを選ぶ。
- **主なMIT参照**：18.335J Introduction to Numerical Methods、18.330 Introduction to Numerical Analysis
- **主要Unit**：浮動小数点、丸め、condition number、forward/backward error、LU/QR/Cholesky/SVD、疎行列、反復法、固有値ソルバー、randomized linear algebra、数値実験
- **前提Course**：01、02
- **到達目標**：理論上の式と実装上の安定性を区別し、誤差を実験で診断できる。
- **層**：Applied

## Course 06：最適化

- **Course ID**：06
- **目的**：最小化問題の構造を理解し、勾配法から制約付き最適化まで実装する。
- **主なMIT参照**：6.7220J Nonlinear Optimization
- **主要Unit**：最適性条件、凸集合・凸関数、gradient descent、SGD、Newton、quasi-Newton、制約付き最適化、Lagrange乗数法、KKT条件、双対性、preconditioning、AdaGradとAdam
- **前提Course**：01、02、03、05
- **到達目標**：目的関数、勾配、制約、収束、前処理の関係を説明し、学習アルゴリズムを検証できる。
- **層**：Applied

## Course 07：データ解析の行列手法

- **Course ID**：07
- **目的**：行列を中心に、回帰、低ランク表現、信号・画像・グラフのデータ解析を学ぶ。
- **主なMIT参照**：18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning
- **主要Unit**：least squares、WLSとGLS、regularization、SVDとPCA、matrix completion、Fourier変換、convolution、graph Laplacian、low-rank model
- **前提Course**：02、03、05
- **到達目標**：WLSMを統計と行列の両面から導出し、PCAや低ランクモデルを小規模データで実験できる。
- **層**：Applied

## Course 08：機械学習

- **Course ID**：08
- **目的**：学習問題を定式化し、代表的な教師あり・教師なし手法を再現可能に評価する。
- **主なMIT参照**：6.3900 Introduction to Machine Learning、6.867 Machine Learning
- **主要Unit**：学習問題の定式化、train/validation/test、汎化と過学習、線形回帰、logistic regression、SVMとkernel、decision treeとensemble、clustering、Gaussian mixtureとEM、次元削減、評価・再現性・data leakage、強化学習の基礎
- **前提Course**：00、01、02、03、05、06
- **到達目標**：モデル、損失、評価、汎化の関係を説明し、データ漏洩を避けた実験を設計できる。
- **層**：Applied

## Course 09：深層学習

- **Course ID**：09
- **目的**：計算グラフと微分を軸に、ニューラルネットワークの学習と主要構造を理解する。
- **主なMIT参照**：6.7960 Deep Learning、6.S191 Introduction to Deep Learning
- **主要Unit**：線形層とMLP、computation graph、backpropagation、自動微分、CNN、RNNとLSTM、embedding、attention、Transformer、graph neural network、正則化と汎化、学習と評価
- **前提Course**：01、02、03、05、06、08
- **到達目標**：backpropagationとattentionの行列演算を追い、実装と評価の失敗要因を説明できる。
- **層**：Applied

## Course 10：Frontier

- **Course ID**：10
- **目的**：現代的なモデルと論文を、前提数学、主要式、計算量、限界から批判的に読む。
- **主なMIT参照**：特定科目には固定しない。個別テーマごとに原論文を記録する。
- **主要Unit**：Transformer発展、efficient attention、LoRAとparameter-efficient fine-tuning、diffusion model、state-space model、graphとequivariant model、implicit model、neural operator、quantization、sparse model、distributed training、論文読解
- **前提Course**：01、02、03、05、06、08、09
- **到達目標**：原論文、公開年、確認日、前提数学、主要式と次元、小規模実装、計算量、限界、後続研究を整理できる。
- **層**：Frontier
