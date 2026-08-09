# 連立一次方程式とガウス消去法：教科書

## この章で理解すること

連立一次方程式は「複数の線形条件を同時に満たす点」を探す問題である。ガウス消去法は、解集合を変えない行基本変形で方程式を解きやすい形へ整理する。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-matrix-multiplication。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

連立一次方程式は「複数の線形条件を同時に満たす点」を探す問題である。ガウス消去法は、解集合を変えない行基本変形で方程式を解きやすい形へ整理する。

<img src="/visuals/course-02/la-linear-systems-elimination.png" alt="連立一次方程式とガウス消去法の図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$\mathbf{A}\mathbf{x}=\mathbf{b}$ を拡大係数行列 $[\mathbf{A}\mid\mathbf{b}]$ にし、行交換・非零定数倍・他行の倍数の加算で行階段形へ変形する。

代表式：

$$
\mathbf{A}\mathbf{x}=\mathbf{b}
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 係数行列。
- $\mathbf{x}\in\mathbb{R}^n$: 未知変数ベクトル。
- $\mathbf{b}\in\mathbb{R}^m$: 右辺ベクトル。
- pivot: 消去で基準にする非zero成分。RREFはreduced row echelon form（簡約行階段形）。

## なぜこの式になるのか

行基本変形は方程式の線形結合を置き換えているだけなので解集合を保存する。pivotの位置から主変数と自由変数、矛盾行から解なしが判定できる。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$x+2y=5$, $2x+3y=8$。第2式から第1式の2倍を引くと $-y=-2$ なので $y=2$, $x=1$。

さらに確認問題：$x+y+z=6$, $2x-y+z=3$, $x+2y-z=2$ を解け。

**解答**：消去すると $-3y-z=-9$, $y-2z=-4$。後者から $y=2z-4$、前者へ代入して $-6z+12-z=-9$ より $z=3$, $y=2$, $x=1$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

拡大係数行列を作る→pivotを選ぶ→pivot下を0にする→次の列へ進む→後退代入。必要ならRREFまで進め、自由変数を明示する。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- 途中で行を定数倍するとき右辺も同じ操作をする。
- 0 pivotでは行交換を検討する。
- 解が一意・無限・なしの3ケースをpivotだけでなく拡大行列で判定する。

特に、次の主張を自力で診断できるようにする。

> 「行基本変形で列を入れ替えても解集合は変わらない」

**診断**：列交換は変数の意味を入れ替えるため、同じ変数順序のままでは解集合を保存しない。ガウス消去で自由に行うのは行操作。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

回帰、回路、物質収支、unmixingなど多くのモデルが最終的に線形系へ落ちる。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)
- [OpenStax Precalculus 2e, Chapter 9: Systems of Equations and Inequalities](https://openstax.org/books/precalculus-2e/pages/9-introduction-to-systems-of-equations-and-inequalities)

## 演習へ

[10問の演習](/exercises/la-linear-systems-elimination)
