# 低rank近似：教科書

Course 02｜線形代数｜Topic 28/29

## このTopicの位置づけ

データ行列の全ての方向が同じ重要度を持つとは限らない。SVDでは特異値が方向ごとの伸縮量・エネルギーの大きさを表すため、小さい特異値方向を捨てて主要構造だけ残すことができる。

**前提知識**：SVD、rank、直交射影。

## まず直感を作る

細長い点群を1本の直線で近似するなら、点群が最も伸びている方向を残し、それと直交する小さなばらつきを捨てるのが自然。高次元でもSVDが同じことを行う。

## 図の解説

<img src="/visuals/course-02/la-low-rank-approximation.png" alt="低rank近似の図解" style="max-height: 430px; display:block; margin: 0 auto;" />

図の点群は斜め方向に強く伸びている。太い直線が第1特異ベクトル方向に対応し、各点からその直線への破線が捨てられる直交成分を表す。

rank-1近似では各点をこの直線上へ射影するため、主要な共変動は残るが、直交方向の細かな変動は失われる。

## 記号・型・次元

- SVD：$\mathbf A=\sum_{i=1}^r\sigma_i\mathbf u_i\mathbf v_i^T$。
- $\sigma_1\ge\cdots\ge\sigma_r>0$。
- $\mathbf A_k=\sum_{i=1}^k\sigma_i\mathbf u_i\mathbf v_i^T$：rank-$k$ truncated SVD。


## 正式な定義

rank-$k$近似として

$$
\boxed{\mathbf A_k
=\mathbf U_k\mathbf\Sigma_k\mathbf V_k^T
=\sum_{i=1}^k\sigma_i\mathbf u_i\mathbf v_i^T}
$$

を使う。Eckart–Young theoremにより、これは2-normおよびFrobenius normで最良のrank-$k$近似になる。

## なぜこの式・定理になるのか

### SVDをrank-1行列の和として読む

$$
\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T
$$

の積を対角成分ごとに展開すると

$$
\mathbf A
=\sigma_1\mathbf u_1\mathbf v_1^T
+\cdots+
\sigma_r\mathbf u_r\mathbf v_r^T.
$$

各 $\mathbf u_i\mathbf v_i^T$ はrank 1。したがって先頭$k$項だけ残した $\mathbf A_k$ はrank高々$k$。

### Frobenius誤差が特異値の二乗和になる

残差は

$$
\mathbf A-\mathbf A_k
=\sum_{i=k+1}^r\sigma_i\mathbf u_i\mathbf v_i^T.
$$

これらのrank-1成分はFrobenius内積で互いに直交するため、Pythagorasより

$$
\boxed{
\|\mathbf A-\mathbf A_k\|_F^2
=\sum_{i=k+1}^r\sigma_i^2
}.
$$

つまり捨てた特異値の二乗が、そのまま失ったFrobenius energyになる。

### なぜ大きい特異値から残すのか

rank-$k$という制約の下で誤差を最小にしたいなら、捨てる二乗和を最小にするため小さい特異値から捨てるのが最善。この直感を厳密化したものがEckart–Young theorem。

## 小さな数値例を最後まで計算する

特異値が $(10,3,1)$ の行列をrank 1で近似すると、Frobenius誤差二乗は

$$
3^2+1^2=10.
$$

rank 2なら誤差二乗は1だけ。したがって第2成分を残す価値がどれだけあるかを特異値から直接評価できる。

## もう一段丁寧に：truncated SVDが最良近似になる理由を理解する

### 1. SVDをrank-1行列の和として読む

$$
\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^T
$$

は

$$
\boxed{
\mathbf A
=\sum_{i=1}^{r}
\sigma_i\mathbf u_i\mathbf v_i^T
}
$$

と展開できる。$\mathbf u_i\mathbf v_i^T$ はrank 1なので、SVDは行列を互いにorthogonalなrank-1成分へ分解している。

特異値を

$$
\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0
$$

と並べると、各成分のFrobenius normは

$$
\|\sigma_i\mathbf u_i\mathbf v_i^T\|_F=\sigma_i.
$$

したがって特異値は各rank-1成分の大きさでもある。

### 2. rank-$k$ truncated SVD

大きい順に $k$ 個だけ残して

$$
\boxed{
\mathbf A_k
=\sum_{i=1}^{k}
\sigma_i\mathbf u_i\mathbf v_i^T
}
$$

とする。rankは高くても $k$ まで。

捨てた部分は

$$
\mathbf A-\mathbf A_k
=\sum_{i=k+1}^{r}
\sigma_i\mathbf u_i\mathbf v_i^T.
$$

rank-1成分同士がFrobenius inner productで直交するので、Pythagorasと同じように

$$
\boxed{
\|\mathbf A-\mathbf A_k\|_F^2
=\sum_{i=k+1}^{r}\sigma_i^2
}.
$$

### 3. なぜ「小さい特異値を捨てる」のが合理的か

$k$ 個しか独立方向を保持できないなら、大きな $\sigma_i$ の方向を捨てるほど誤差が大きい。truncated SVDは最大の $k$ 成分をすべて保持し、残りだけを誤差へ回す。

Eckart–Young theoremはさらに強く、**どんなrank-$k$行列を選んでも、SVDの上位$k$成分より小さい2-norm/Frobenius-norm誤差にはできない**ことを保証する。

Frobenius normについての直感は、SVD座標へ移れば $\mathbf A$ が対角的な $\mathbf\Sigma$ になり、rank $k$ では高々$k$個の独立成分しか保持できないため、最大の対角成分を残すのが最も誤差を小さくするというもの。

### 4. データ圧縮としてのshape

$\mathbf A_k$ をそのまま $m\times n$ 個保存する代わりに

- $\mathbf U_k\in\mathbb R^{m\times k}$
- $\mathbf\Sigma_k\in\mathbb R^{k\times k}$
- $\mathbf V_k\in\mathbb R^{n\times k}$

を保存すれば、必要な数は概ね $k(m+n+1)$。$k\ll\min(m,n)$ なら大幅に圧縮できる。

### 5. PCAへの接続はcentering後に行う

データ行列を平均中心化した後、そのSVDの右特異ベクトルは共分散構造のprincipal directionsとつながる。ただし「SVD=常にPCA」ではない。PCAでは標本・特徴量の向き、centering、必要ならscalingを明示して初めて対応が定まる。この統計的意味はCourse 03/07で再訪する。

## 成立条件・壊れる場合

「小さい特異値=ノイズ」とは限らない。近似目的にとって重要な弱い信号が小特異値方向にあることもある。rank選択は数学的誤差だけでなく、目的・ノイズ・汎化性能と合わせて判断する。

## ここから発展

中心化したデータ行列へSVDを適用するとPCAと直接つながる。PCAでは右特異ベクトルが特徴空間の主成分方向、特異値二乗が分散と関係する。ただし中心化やスケーリングの意味を明示して進む。


## このTopicの理解確認

- SVDをrank-1 matricesの和へ展開できるか。
- $\|A-A_k\|_F^2=\sum_{i>k}\sigma_i^2$ をorthogonalityから説明できるか。
- truncated SVDがdata compressionになるときのstorage sizeをshapeから評価できるか。

## 外部教材との照合


- [MIT OpenCourseWare 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)

- [MIT OpenCourseWare 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)


## 演習

[このTopicの10問の演習](/exercises/la-low-rank-approximation)
