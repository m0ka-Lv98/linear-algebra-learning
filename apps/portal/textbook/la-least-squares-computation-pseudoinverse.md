# 最小二乗法の計算と擬似逆行列：教科書

## この章で理解すること

最小二乗を計算する方法は一つではない。理論式として擬似逆行列が統一的だが、数値計算ではQRやSVDを使い、rank不足も含めて安定に扱う。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-least-squares-geometry, la-gram-schmidt-qr。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

最小二乗を計算する方法は一つではない。理論式として擬似逆行列が統一的だが、数値計算ではQRやSVDを使い、rank不足も含めて安定に扱う。

<img src="/visuals/course-02/la-least-squares-computation-pseudoinverse.png" alt="最小二乗法の計算と擬似逆行列の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\hat x=A^+b$。full column rankなら $A^+=(A^TA)^{-1}A^T$ だが、一般にはSVD $A=U\Sigma V^T$ から $A^+=V\Sigma^+U^T$。

代表式：

$$
\hat{\mathbf{x}}=\mathbf{A}^{+}\mathbf{b}
$$

## 代表式の記号を定義する

- $\mathbf{A}^{+}$: Moore–Penrose擬似逆行列。長方形・rank不足行列にも定義される。
- $\mathbf{b}$: 観測または右辺ベクトル。
- $\hat{\mathbf{x}}$: 擬似逆で得る最小二乗解。解が複数ある場合は最小2-norm解。
- SVDはsingular value decomposition（特異値分解）、QRはQR factorizationを指す。

## なぜこの式になるのか

SVD座標では各特異方向ごとに $\sigma_i z_i\approx u_i^Tb$ を解く。非zero特異値だけ逆数を取ることで、rank不足でも最小ノルム解を選べる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}1&0\\0&0\end{bmatrix}$, $b=(2,3)^T$。最小二乗では第2成分3は再現不能。擬似逆で最小ノルム解 $(2,0)^T$ を得る。

さらに確認問題：$A=\operatorname{diag}(2,0)$, $b=(6,5)^T$。$A^+$と最小ノルム最小二乗解を求めよ。

**解答**：$A^+=\operatorname{diag}(1/2,0)$。したがって $x=A^+b=(3,0)^T$。再構成は$(6,0)^T$で残差$(0,5)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

実装は `np.linalg.lstsq` またはQR/SVD。擬似逆行列を明示的に作るのは、多数のbへ繰り返し適用する等の理由がある場合に限定。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- $(A^TA)^{-1}A^T$ はrank不足では使えない。
- 小さい特異値の逆数はノイズを増幅する。
- `pinv`のcutoffは数値rankの定義に影響する。

特に、次の主張を自力で診断できるようにする。

> 「擬似逆行列は逆行列が存在するときだけ定義される」

**診断**：逆。擬似逆は長方形・rank不足を含む任意行列に定義でき、可逆正方行列では通常の逆行列と一致する。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

rank不足回帰、inverse problem、WLSMの拡張、minimum-norm solution。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-least-squares-computation-pseudoinverse)
