# 劣勾配と非滑らか最適化：演習

Course 06｜最適化

[教科書](/textbook/opt-subgradients-nonsmooth)

## 問題1

$f(x)=|x-2|$ の $x=2$ におけるsubdifferentialを求め、0が含まれることから最小点を確認せよ。

<details><summary>完全解答</summary>

$u=x-2$ と置けば $|u|$ の0でのsubdifferentialは[-1,1]。したがって $\partial f(2)=[-1,1]$。0を含むので凸最適性条件からx=2はglobal minimizer。

</details>

## 問題2

「劣勾配と非滑らか最適化」の導出を、最初の段階「1. 滑らかな凸関数の一次supporting inequalityを一般化する。」から始めて中心式まで再構成せよ。途中で「凸関数で $g\in\partial f(x)$ とは全yに対し $f(y)\ge f(x)+g^T(y-x)$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 滑らかな凸関数の一次supporting inequalityを一般化する。
2. 微分不能点では1本の接線でなく複数のsupporting hyperplaneが存在し得る。
3. 0∈∂f(x*)なら全yで f(y)≥f(x*) なのでx*はglobal minimizer。

凸関数で $g\in\partial f(x)$ とは全yに対し $f(y)\ge f(x)+g^T(y-x)$。微分可能なら凸性の一次条件から $\partial f(x)=\{\nabla f(x)\}$。非滑らかな点では集合が複数要素を持つ。

最適性条件 $0\in\partial f(x^*)$ は強力で、定義へg=0を代入すれば $f(y)\ge f(x^*)$ for all y。つまり凸問題ではglobal minimumを直接保証する。

</details>

## 問題3

図 `/visuals/course-06/opt-subgradients-nonsmooth.png` では「V字型の $f(x)=|x|$ を描き、x=0で複数の支持直線を重ねる。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-06/opt-subgradients-nonsmooth.png" alt="劣勾配と非滑らか最適化の図解" style="max-height: 480px; display:block; margin:0 auto;" />

V字型の $f(x)=|x|$ を描き、x=0で複数の支持直線を重ねる。傾きgが[-1,1]なら直線 $f(0)+g(x-0)=gx$ は常にV字の下側にあるので、これら全部が0でのsubgradient。微分不能だから「傾きがない」のではなく「許される支持傾きが集合になる」。

</details>

## 問題4

「劣勾配と非滑らか最適化」の第二例「$f(x)=|x|+2x$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

$f(x)=|x|+2x$。x>0でsubgradientは3、x<0で1、x=0で[-1,1]+2=[1,3]。0を含まないので0は最小ではなく、実際x→-∞でf→-∞となる。

</details>

## 問題5

劣勾配と非滑らか最適化で 凸関数、点xでの劣勾配、劣勾配全体の集合 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`opt-subgradients-nonsmooth` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $f$ | 凸関数 |
| $g$ | 点xでの劣勾配 |
| $∂f(x)$ | 劣勾配全体の集合 |


- $f:\mathbb R^n\to\mathbb R\cup\{+\infty\}$：凸関数。
- $g$：subgradient。
- $\partial f(x)$：xでの全subgradient集合。

</details>

## 問題6

警告「subgradientは任意の「左右微分の中間値」ではない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

subgradientは任意の「左右微分の中間値」ではない。非凸関数では凸subdifferentialの定義が空になることもあり、Clarke subgradient等別概念が必要。

</details>

## 問題7

よくある誤り「任意の方向ベクトルを劣勾配と呼ばない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- 任意の方向ベクトルを劣勾配と呼ばない。
- 非凸関数へ凸subgradientの結論をそのまま移さない。

subgradientは任意の「左右微分の中間値」ではない。非凸関数では凸subdifferentialの定義が空になることもあり、Clarke subgradient等別概念が必要。

</details>

## 問題8

「劣勾配と非滑らか最適化」の例題1を再計算し、その結果に対して次の検算を実行せよ：候補gがsubgradientなら、定義不等式 $f(y)\ge f(x)+g^T(y-x)$ が任意yで成り立つ必要がある。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$u=x-2$ と置けば $|u|$ の0でのsubdifferentialは[-1,1]。したがって $\partial f(2)=[-1,1]$。0を含むので凸最適性条件からx=2はglobal minimizer。

検算：
候補gがsubgradientなら、定義不等式 $f(y)\ge f(x)+g^T(y-x)$ が任意yで成り立つ必要がある。$f(x)=|x|$ のx=0なら $g\in[-1,1]$ の端点と内部値を代入し、$g=2$ のような範囲外では具体的に不等式が破れることを確認する。

</details>

## 問題9

後続への接続「L1正則化、hinge loss、proximal gradientへつながる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

L1正則化、hinge loss、proximal gradientへつながる。soft-thresholdingは $0\in$ smooth gradient + L1 subgradient から導ける。

</details>

## 問題10

中心問題「|x|やL1正則化のように微分できない点があっても、凸最適化をどう続けるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「subgradientは任意の「左右微分の中間値」ではない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $f$ | 凸関数 |
| $g$ | 点xでの劣勾配 |
| $∂f(x)$ | 劣勾配全体の集合 |


- $f:\mathbb R^n\to\mathbb R\cup\{+\infty\}$：凸関数。
- $g$：subgradient。
- $\partial f(x)$：xでの全subgradient集合。

中心式：
$$
g\in\partial f(x)\iff f(y)\ge f(x)+g^T(y-x)\;\forall y
$$

導出：
1. 滑らかな凸関数の一次supporting inequalityを一般化する。
2. 微分不能点では1本の接線でなく複数のsupporting hyperplaneが存在し得る。
3. 0∈∂f(x*)なら全yで f(y)≥f(x*) なのでx*はglobal minimizer。

根拠：
凸関数で $g\in\partial f(x)$ とは全yに対し $f(y)\ge f(x)+g^T(y-x)$。微分可能なら凸性の一次条件から $\partial f(x)=\{\nabla f(x)\}$。非滑らかな点では集合が複数要素を持つ。

最適性条件 $0\in\partial f(x^*)$ は強力で、定義へg=0を代入すれば $f(y)\ge f(x^*)$ for all y。つまり凸問題ではglobal minimumを直接保証する。

具体例：
**問題**：$f(x)=|x-2|$ の $x=2$ におけるsubdifferentialを求め、0が含まれることから最小点を確認せよ。

**解答**：$u=x-2$ と置けば $|u|$ の0でのsubdifferentialは[-1,1]。したがって $\partial f(2)=[-1,1]$。0を含むので凸最適性条件からx=2はglobal minimizer。

失敗条件：
subgradientは任意の「左右微分の中間値」ではない。非凸関数では凸subdifferentialの定義が空になることもあり、Clarke subgradient等別概念が必要。

</details>
