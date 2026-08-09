# 列空間と零空間：教科書

## この章で理解すること

列空間は「Aが出力として作れるもの」、零空間は「Aが見えなくしてしまう入力」を表す。$Ax=b$ の解の存在と一意性を、この2つで整理できる。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-span-subspaces, la-linear-systems-elimination。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

列空間は「Aが出力として作れるもの」、零空間は「Aが見えなくしてしまう入力」を表す。$Ax=b$ の解の存在と一意性を、この2つで整理できる。

<img src="/visuals/course-02/la-column-space-null-space.png" alt="列空間と零空間の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\operatorname{Col}(A)=\{Ax\mid x\in\mathbb{R}^n\}\subseteq\mathbb{R}^m$、$\operatorname{Null}(A)=\{x\in\mathbb{R}^n\mid Ax=0\}$。

代表式：

$$
\operatorname{Null}(\mathbf{A})=\{\mathbf{x}\mid\mathbf{A}\mathbf{x}=\mathbf{0}\}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 線形写像を表す行列。
- $\operatorname{Col}(\mathbf{A})\subseteq\mathbb{R}^m$: $\mathbf{A}$の列空間、すなわち到達可能な出力の集合。
- $\operatorname{Null}(\mathbf{A})\subseteq\mathbb{R}^n$: $\mathbf{A}\mathbf{x}=\mathbf{0}$となる入力の集合（零空間）。
- $\mathbf{0}$: 対応する次元のzeroベクトル。

## なぜこの式になるのか

$Ax=b$ が解を持つのは $b\in\operatorname{Col}(A)$ のとき。もし $z\in\operatorname{Null}(A)$ なら、解$x_p$から$x_p+z$も同じbへ写る。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$A=\begin{bmatrix}1&2&3\\0&1&1\end{bmatrix}$ では第3列 $(3,1)^T$ は第1列 $(1,0)^T$ と第2列 $(2,1)^T$ の和である。したがって列は従属であり、RREFから零空間の自由変数を求められる。

さらに確認問題：$A=\begin{bmatrix}1&2&3\\0&1&1\end{bmatrix}$ の零空間の基底を求めよ。

**解答**：$x_2+x_3=0$ より $x_2=-x_3$、$x_1+2x_2+3x_3=0$ より $x_1=-x_3$。したがって $x=t(-1,-1,1)^T$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

RREFでpivot列を特定し、列空間の基底は元のAのpivot列から取る。null spaceはRREFの自由変数ごとのspecial solutionから基底を作る。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 列空間の基底にRREFの列をそのまま使わない（元の列空間が変わる）。
- null spaceは入力側 $\mathbb{R}^n$ にある。
- column spaceは出力側 $\mathbb{R}^m$ にある。

特に、次の主張を自力で診断できるようにする。

> 「行基本変形しても列空間そのものは保存される」

**診断**：行空間・零空間に関する情報は保たれるが、列空間の具体的なベクトル集合は一般に変わる。pivot列の番号を元のAへ戻す。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

最小二乗ではbを列空間へ射影し、rank不足ではnull spaceが解の非一意性を生む。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-column-space-null-space)
