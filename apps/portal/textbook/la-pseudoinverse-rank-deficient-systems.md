# 擬似逆行列とrank不足の連立方程式：教科書

## この章で理解すること

rank不足では解がない／複数あるが起こる。Moore–Penrose擬似逆は、最小二乗と最小ノルムという基準で代表解を一意に選ぶ。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-singular-value-decomposition, la-least-squares-computation-pseudoinverse。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

rank不足では解がない／複数あるが起こる。Moore–Penrose擬似逆は、最小二乗と最小ノルムという基準で代表解を一意に選ぶ。

<img src="/visuals/course-02/la-pseudoinverse-rank-deficient-systems.png" alt="擬似逆行列とrank不足の連立方程式の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

SVD $A=U\Sigma V^T$ に対し、非zero特異値を逆数へした $\Sigma^+$ で $A^+=V\Sigma^+U^T$。$x^*=A^+b$ は最小ノルム最小二乗解。

代表式：

$$
\mathbf{A}^{+}=\mathbf{V}\mathbf{\Sigma}^{+}\mathbf{U}^{\mathsf T}
$$

## 代表式の記号を定義する

- $\mathbf{A}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}$: $\mathbf{A}$のSVD。
- $\mathbf{\Sigma}^{+}$: nonzero特異値$\sigma_i$を$1/\sigma_i$へ置き換えた擬似逆対角行列。
- $\mathbf{A}^{+}$: Moore–Penrose擬似逆行列。
- rank不足では、$\mathbf{A}^{+}\mathbf{b}$が最小二乗解のうち最小2-normのものを選ぶ。

## なぜこの式になるのか

SVD座標ではrank方向とnull方向が分離される。観測可能な方向だけ逆変換し、null方向の係数を0にすることで最小ノルムになる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=[1\;1]$（1×2）, $b=2$。解は$x_1+x_2=2$で無限にあるが、最小ノルム解は$(1,1)^T$。

さらに確認問題：$A=[1\;1]$、$b=6$ の最小ノルム解を求めよ。

**解答**：制約$x_1+x_2=6$の下で$x_1^2+x_2^2$を最小にすると対称性から$x_1=x_2=3$。擬似逆でも$(3,3)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

SVD→閾値以上の特異値だけ逆数→$A^+$を適用。実装では `lstsq`/`pinv` のrcondを確認。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 非常に小さい特異値を無条件に逆数にするとノイズを大幅増幅。
- 最小ノルム基準は追加の物理制約を自動的に満たすわけではない。
- rank判定は有限精度では閾値依存。

特に、次の主張を自力で診断できるようにする。

> 「rank不足なら数値解は一切求められない」

**診断**：厳密解が複数/存在しない場合でも、擬似逆で最小ノルム最小二乗解を定義できる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

under-determined inverse problems、共線性のある回帰、spectral unmixingのrank不足。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-pseudoinverse-rank-deficient-systems)
