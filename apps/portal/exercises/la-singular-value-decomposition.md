# 特異値分解：演習

Course 02｜線形代数

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：長方形行列でもSVDが存在する理由

$\mathbf A\in\mathbb R^{m\times n}$ が正方でないとき、なぜ固有値問題 $\mathbf A\mathbf v=\lambda\mathbf v$ ではなく $\mathbf A^{\mathsf T}\mathbf A$ を考えるのか。square・symmetric・positive semidefiniteの3点を式で示せ。

<details><summary>完全解答</summary>

$\mathbf A^{\mathsf T}\mathbf A\in\mathbb R^{n\times n}$ なのでsquareである。また $(\mathbf A^{\mathsf T}\mathbf A)^{\mathsf T}=\mathbf A^{\mathsf T}\mathbf A$ だからsymmetric。任意の $\mathbf x\in\mathbb R^n$ に対して $\mathbf x^{\mathsf T}\mathbf A^{\mathsf T}\mathbf A\mathbf x=\|\mathbf A\mathbf x\|_2^2\ge0$ なのでpositive semidefinite。したがってspectral theoremによりorthonormal eigenbasisを取れる。一般の長方形$\mathbf A$には自己写像としての固有値問題を直接書けないため、このsquare symmetric matrixを使う。

</details>

## 問題2：2×2行列の特異値

$\mathbf A=\begin{bmatrix}3&0\\0&-2\end{bmatrix}$ の特異値を $\mathbf A^{\mathsf T}\mathbf A$ から求めよ。

<details><summary>完全解答</summary>

$\mathbf A^{\mathsf T}\mathbf A=\operatorname{diag}(9,4)$。固有値は9と4なので、特異値はその非負平方根 $\sigma_1=3,\sigma_2=2$。$-2$という符号は$\mathbf U$または$\mathbf V$側の向きへ吸収され、特異値自体は非負である。

</details>

## 問題3：左特異ベクトルの正規化

$\mathbf A^{\mathsf T}\mathbf A\mathbf v_i=\sigma_i^2\mathbf v_i$、$\|\mathbf v_i\|_2=1$、$\sigma_i>0$ とする。$\mathbf u_i=\mathbf A\mathbf v_i/\sigma_i$ がunit vectorになることを示せ。

<details><summary>完全解答</summary>

$\|\mathbf u_i\|_2^2=\sigma_i^{-2}\mathbf v_i^{\mathsf T}\mathbf A^{\mathsf T}\mathbf A\mathbf v_i=\sigma_i^{-2}\sigma_i^2\mathbf v_i^{\mathsf T}\mathbf v_i=1$。したがって$\mathbf u_i$はunit vector。さらに$i\ne j$では同じ計算から $\mathbf u_i^{\mathsf T}\mathbf u_j=0$ となり、正の特異値に対応する左特異ベクトルはorthonormalになる。

</details>

## 問題4：SVDを列関係から再構成

$\mathbf A\mathbf v_i=\sigma_i\mathbf u_i$ を列ごとにまとめ、$\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^{\mathsf T}$ を導け。

<details><summary>完全解答</summary>

右特異ベクトルを列に並べた$\mathbf V=[\mathbf v_1\cdots\mathbf v_n]$に対し、各列関係をまとめると $\mathbf A\mathbf V=\mathbf U\mathbf\Sigma$。$\mathbf V$はorthogonalなので $\mathbf V^{-1}=\mathbf V^{\mathsf T}$。右から$\mathbf V^{\mathsf T}$を掛けて $\mathbf A=\mathbf U\mathbf\Sigma\mathbf V^{\mathsf T}$ を得る。

</details>

## 問題5：rankとzero singular value

特異値が $5,2,0,0$ の行列のrankを答え、zero singular valueに対応する右特異ベクトルが何を表すか説明せよ。

<details><summary>完全解答</summary>

rankは正の特異値の個数なので2。$\sigma_i=0$なら $\mathbf A\mathbf v_i=\mathbf0$ だから、その$\mathbf v_i$はnull spaceの方向である。その入力方向は出力で完全に潰れる。

</details>

## 問題6：reduced SVDのshape

$\mathbf A\in\mathbb R^{8\times5}$、$\operatorname{rank}(\mathbf A)=3$ とする。reduced SVD $\mathbf A=\mathbf U_r\mathbf\Sigma_r\mathbf V_r^{\mathsf T}$ の3行列のshapeを答えよ。

<details><summary>完全解答</summary>

$r=3$なので $\mathbf U_r\in\mathbb R^{8\times3}$、$\mathbf\Sigma_r\in\mathbb R^{3\times3}$、$\mathbf V_r\in\mathbb R^{5\times3}$、したがって$\mathbf V_r^{\mathsf T}\in\mathbb R^{3\times5}$。積のshapeは$(8,3)(3,3)(3,5)=(8,5)$で元行列と一致する。

</details>

## 問題7：図の楕円を読む

SVD図で単位円が長軸4、短軸0.5の楕円へ写っている。対応する最大・最小特異値と2-norm condition numberを求めよ。

<details><summary>完全解答</summary>

半軸長が特異値なので$\sigma_{\max}=4$、$\sigma_{\min}=0.5$。full rankのsquare caseなら2-norm condition numberは $\kappa_2=\sigma_{\max}/\sigma_{\min}=8$。短軸方向の入力変化は相対的に潰されやすい。

</details>

## 問題8：重複特異値と非一意性

$\mathbf A=2\mathbf I_2$ のSVDで特異ベクトルが一意でない理由を説明し、別の$\mathbf U,\mathbf V$の例を一つ作れ。

<details><summary>完全解答</summary>

特異値は両方2で重複している。任意の2×2 orthogonal matrix $\mathbf Q$ に対して $\mathbf A=\mathbf Q(2\mathbf I)\mathbf Q^{\mathsf T}$。したがって例えば45°回転行列$\mathbf Q$を$\mathbf U=\mathbf V=\mathbf Q$としてもSVDになる。特異値部分空間は一意でも、その中のbasisは一意でない。

</details>

## 問題9：NumPy出力の検算

NumPyで `U, s, Vh = np.linalg.svd(A, full_matrices=False)` を得た。理論式と対応させるために最低3つ何を検算すべきか。

<details><summary>完全解答</summary>

(1) `U @ np.diag(s) @ Vh` と`A`の再構成誤差を確認する。(2) `U.T @ U` とidentity、`Vh @ Vh.T` とidentityを比較しorthonormalityを確認する。(3) `s`が非負かつ通常降順で、rankや既知のstretchと整合するか確認する。NumPyの`Vh`は$\mathbf V^{\mathsf T}$に対応する。

</details>

## 問題10：総合：rank-1行列

$\mathbf A=\begin{bmatrix}2&2\\1&1\end{bmatrix}$ がrank 1であることを確認し、nonzero singular valueを求め、SVDがこの行列を「1方向だけ残す変換」と表す理由を説明せよ。

<details><summary>完全解答</summary>

2列が同一なのでrank 1。$\mathbf A^{\mathsf T}\mathbf A=\begin{bmatrix}5&5\\5&5\end{bmatrix}$ の固有値は10と0なので特異値は$\sqrt{10}$と0。zero singular valueの右特異方向はnull spaceへ潰れ、nonzero directionだけが左特異方向へ$\sqrt{10}$倍される。したがって出力空間は1次元になる。

</details>

[教科書へ](/textbook/la-singular-value-decomposition)
