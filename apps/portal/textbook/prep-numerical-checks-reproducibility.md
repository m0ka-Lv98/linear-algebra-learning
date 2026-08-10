# 数値検算と再現性：教科書

Course 00｜学習準備

## このTopicの目的

浮動小数点の結果をexact equalityで判定せず、独立な検算と再現可能な実験条件をどう残すか。

## 図の意味

<img src="/visuals/course-00/prep-numerical-checks-reproducibility.png" alt="数値検算と再現性の図解" style="max-height: 480px; display:block; margin:0 auto;" />

横軸が参照値の大きさ、縦軸が許容誤差。$\text{atol}+\text{rtol}|x|$ は0付近ではabsolute tolerance、値が大きい領域ではrelative toleranceが支配する。1本の固定閾値よりscaleの違う値を比較しやすい。

## 定義から順に理解する

floating pointでは0.1を2進数でexactに表せないため、`0.1+0.2==0.3` が偽になることがある。比較は $|x-y|\le\text{atol}+\text{rtol}|y|$ のようにscaleを考える。

検算は同じ式をもう一度計算するだけでなく、独立な性質を使う。線形方程式ならresidual $\|A\hat x-b\|$、SVDなら再構成誤差と直交性、確率なら総和1。

randomnessを使う場合はseed、library version、dtype、input、parameterを記録する。

## absolute errorとrelative error

真値またはreferenceを $x$、近似値を $\hat x$ とする。absolute errorは

$$
|\hat x-x|,
$$

relative errorは $x\ne0$ なら

$$
\frac{|\hat x-x|}{|x|}.
$$

値のscaleが大きく異なる問題ではrelative errorが比較しやすいが、$x\approx0$ では分母が小さく不安定。そのため実装では

$$
|\hat x-x|\le \mathrm{atol}+\mathrm{rtol}|x|
$$

のように両方を組み合わせる。

## residualとsolution errorは違う

線形方程式 $\mathbf A\mathbf x=\mathbf b$ に近似解 $\hat{\mathbf x}$ を入れたresidualは

$$
\mathbf r=\mathbf b-\mathbf A\hat{\mathbf x}.
$$

$\|\mathbf r\|$ が小さいことは「方程式をよく満たす」ことだが、condition numberが大きい問題では $\hat{\mathbf x}$ が真のsolutionから遠いこともある。後の数値計算ではresidual、forward error、backward errorを分けて扱う。

## random seedで何が固定されるか

seedは疑似乱数generatorの系列を固定する。しかし結果は

- library/version
- algorithm implementation
- dtype
- CPU/GPU kernel
- thread scheduling

にも依存し得る。再現性の記録にはseedだけでなくenvironment情報が必要。

## 検算を独立な性質で行う

- 確率vector：各要素が0以上、総和1。
- orthogonal matrix：$\mathbf Q^T\mathbf Q\approx\mathbf I$。
- eigenpair：$\|\mathbf A\mathbf v-\lambda\mathbf v\|$。
- least squares：normal-equation residualやprojection orthogonality。

同じ実装を2回呼ぶだけでは、同じbugを2回再現している可能性がある。別の数学的性質を使う。

## 具体例

計算値1.0000001と参照1.0をatol=1e-8, rtol=1e-6で比較すると誤差1e-7 <=1.01e-6なので一致扱い。

## 条件を外すと

「seedを固定したから完全再現」とは限らない。GPU kernelや並列reduction、library version差でbitwise結果が変わることがある。

## 後続Courseでどう使うか

全Courseの数値例・ML experimentの基本作法。

[演習へ](/exercises/prep-numerical-checks-reproducibility)　|　[スライドへ](/slides/prep-numerical-checks-reproducibility/)
