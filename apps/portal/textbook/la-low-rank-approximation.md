# 低ランク近似：教科書

## この章で理解すること

低ランク近似は、行列の情報を少数の主要な特異方向へ圧縮する。SVDは「どのrank-r近似がFrobenius/2-normで最良か」を直接与える。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-singular-value-decomposition。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

低ランク近似は、行列の情報を少数の主要な特異方向へ圧縮する。SVDは「どのrank-r近似がFrobenius/2-normで最良か」を直接与える。

<img src="/visuals/course-02/la-low-rank-approximation.png" alt="低ランク近似の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A_r=\sum_{i=1}^r\sigma_i u_i v_i^T$。Eckart–Young–Mirsky定理により、$\|A-A_r\|_2=\sigma_{r+1}$ で最良。

代表式：

$$
\mathbf{A}_r=\sum_{i=1}^{r}\sigma_i\mathbf{u}_i\mathbf{v}_i^{\mathsf T}
$$

## 代表式の記号を定義する

- $\sigma_i$: 大きい順に並べた特異値。
- $\mathbf{u}_i,\mathbf{v}_i$: 第$i$左・右特異ベクトル。
- $r$: 残す特異成分の数（近似rank）。
- $\mathbf{A}_r$: 上位$r$成分だけで再構成したrank高々$r$の近似行列。

## なぜこの式になるのか

SVDでは直交するrank-1成分が特異値順に並ぶ。小さい特異値の成分を捨てると、最大のエネルギーを保ちながらrankを下げられる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

特異値が(10,3,0.2)ならrank1近似は10の成分だけ、rank2なら10と3を残す。rank2のspectral誤差は0.2。

さらに確認問題：特異値が $8,2,0.5$ の行列をrank1近似したときのspectral norm誤差とFrobenius norm誤差を求めよ。

**解答**：spectral誤差は次の特異値2。Frobenius誤差は $\sqrt{2^2+0.5^2}=\sqrt{4.25}\approx2.062$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

SVD→特異値を可視化→rを選択→先頭r成分で再構成→再構成誤差と圧縮率を評価。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- rを増やせば訓練データ再構成は必ず改善するが、意味のある構造が増えるとは限らない。
- 特異値のscaleだけでrを自動決定しない。
- center/scaleの有無でデータ行列の低ランク構造は変わる。

特に、次の主張を自力で診断できるようにする。

> 「rank1近似は元行列の1行だけ残すこと」

**診断**：rank1近似は $\sigma_1u_1v_1^T$ という外積で、一般にすべての行・列に非zero成分を持つ。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

画像圧縮、PCA、ノイズ除去、潜在因子、NMFとの比較。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [MIT OpenCourseWare 18.065 Matrix Methods](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

## 演習へ

[10問の演習](/exercises/la-low-rank-approximation)
