# 階数とrank-nullity：教科書

## この章で理解すること

rankは行列が保っている独立な情報の数、nullityは失っている入力方向の数である。入力次元はこの二つへ分解される。

この章では、**直感 → 記号・shape → 定義 → なぜ成り立つか → 手計算 → 幾何 → アルゴリズム → 失敗条件 → 後続への接続**の順で理解する。

## 前提知識

前提Topic: la-column-space-null-space, la-basis-coordinates-dimension。新しい記号は使う前に定義し、ベクトルは太字小文字、行列は太字大文字で表す。

## まず直感

rankは行列が保っている独立な情報の数、nullityは失っている入力方向の数である。入力次元はこの二つへ分解される。

<img src="/visuals/course-02/la-rank-rank-nullity.png" alt="階数とrank-nullityの図解" style="max-height: 390px; display:block; margin: 0 auto;" />

図を見るときは、軸・矢印・列空間・残差・楕円などの**各要素が数式のどの量に対応するか**を先に確認する。

## 記号・型・次元

- スカラーは小文字、ベクトルは $\mathbf{x},\mathbf{y}$、行列は $\mathbf{A},\mathbf{B}$ とする。
- $\mathbf{A}\in\mathbb{R}^{m\times n}$ なら、列数$n$が入力次元、行数$m$が出力次元である。
- 積・加算・逆・分解を行う前にshapeと成立条件を確認する。
- このTopicの代表式に含まれるすべての記号は、式の直前または直後で意味を説明する。

## 正式な定義

$A:\mathbb{R}^n\to\mathbb{R}^m$ に対して $\operatorname{rank}(A)=\dim\operatorname{Col}(A)$、$\operatorname{nullity}(A)=\dim\operatorname{Null}(A)$、$\operatorname{rank}(A)+\operatorname{nullity}(A)=n$。

代表式：

$$
\operatorname{rank}(\mathbf{A})+\operatorname{nullity}(\mathbf{A})=n
$$

## 代表式の記号を定義する

- $\mathbf{A}\in\mathbb{R}^{m\times n}$: 対象行列。
- $\operatorname{rank}(\mathbf{A})$: 列空間の次元、すなわち独立な列方向の数。
- $\operatorname{nullity}(\mathbf{A})$: 零空間の次元。
- $n$: $\mathbf{A}$の列数、すなわち入力空間の次元。

## なぜこの式になるのか

RREFでは$n$個の変数がpivot変数と自由変数に分かれる。pivotの個数がrank、自由変数の個数がnullityなので和はn。

ここでは最終式だけでなく、**どの条件から何が導かれたか**を追うことが重要である。

## 小さな手計算

$2\times4$ 行列にpivotが2個ならrank=2、nullity=2。入力4次元のうち2方向だけが独立な出力として残り、2方向は0へ潰れる。

さらに確認問題：$A=\begin{bmatrix}1&2&3&4\\0&1&1&2\\1&3&4&6\end{bmatrix}$ のrankが2だと分かった。nullityはいくつか。

**解答**：列数$n=4$なのでrank-nullityより nullity $=4-2=2$。

小さい例で結果を先に予測し、その後で一般式へ戻る。

## 計算手順・アルゴリズム

RREFまたはSVDでrankを判定する。厳密計算ならpivot数、浮動小数点なら特異値に閾値を設ける。

理論上の定義と、有限精度で安全に計算するアルゴリズムは区別する。

## 成立条件と典型的な誤り

- rankは単に行数や列数の小さい方とは限らない（上限にすぎない）。
- 数値rankは閾値依存。
- rank-nullityのnは列数＝入力次元。

特に、次の主張を自力で診断できるようにする。

> 「$3\times5$ 行列でrank=3ならnullity=0」

**診断**：nullityは列数5からrank3を引いて2。full row rankでもnull spaceは残りうる。

## 数値実装での検算

1. 入力の `shape` と `dtype` を確認する。
2. 2〜5次元の例で手計算した期待値を先に書く。
3. NumPy/SciPy等で計算する。
4. 残差、再構成誤差、直交性、rank、特異値など、このTopicに適した独立な量で検算する。
5. 逆行列の明示形成、normal equation、小pivot、小特異値など、数値誤差を増幅する実装を避ける。

## 後続Topicへの接続

解の自由度、特徴量冗長性、identifiability、擬似逆行列、低ランク近似へ接続。

Course 02の目的は各公式を孤立して覚えることではなく、**線形結合 → 空間 → 直交 → 最小二乗 → 固有構造 → SVD → 条件数**という一本の流れとして理解することにある。

## 外部教材との照合

この章の説明順・例題・成立条件は、以下の公開教材を参照して再構成した。本文は転載ではなく、本教材向けに日本語で再説明している。

- [MIT OpenCourseWare 18.06SC Linear Algebra](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)
- [Georgia Tech Interactive Linear Algebra](https://textbooks.math.gatech.edu/ila/)
- [Jim Hefferon, Linear Algebra (free textbook)](https://hefferon.net/linearalgebra/)

## 演習へ

[10問の演習](/exercises/la-rank-rank-nullity)
