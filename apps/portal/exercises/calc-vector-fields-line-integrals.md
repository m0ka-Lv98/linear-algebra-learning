# ベクトル場と線積分：演習

Course 01｜微積分

[教科書](/textbook/calc-vector-fields-line-integrals)

## 問題1

$\mathbf F=(2x,y)$、直線経路 $\mathbf r(t)=(t,2t)$, $0\le t\le1$ に沿う線積分を求めよ。

<details><summary>完全解答</summary>

$\mathbf F(\mathbf r(t))=(2t,2t)$、$\mathbf r'=(1,2)$。内積は $2t+4t=6t$。よって $\int_0^1 6t dt=3$。

</details>

## 問題2

「ベクトル場と線積分」の導出を、最初の段階「1. 曲線を短い線分へ分割する。」から始めて中心式まで再構成せよ。途中で「短い区間で変位を $\Delta\mathbf r_i$、代表点の力を $\mathbf F_i$ とすると仕事は $\mathbf F_i\cdot\Delta\mathbf r_i$。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 曲線を短い線分へ分割する。
2. 各線分で仕事を $F\cdot\Delta r$ と近似する。
3. 分割幅を0へしたRiemann和の極限が線積分。

短い区間で変位を $\Delta\mathbf r_i$、代表点の力を $\mathbf F_i$ とすると仕事は $\mathbf F_i\cdot\Delta\mathbf r_i$。曲線を細かく分割した和の極限が線積分。媒介表示 $\Delta\mathbf r\approx\mathbf r\prime(t)\Delta t$ を入れると1変数積分へ変わる。

同じ始点・終点でも経路で値が変わる場が一般的。もし $\mathbf F=\nabla\phi$ というpotentialが存在する保守場なら、連鎖律により $\nabla\phi(\mathbf r(t))\cdot\mathbf r\prime(t)=d[\phi(\mathbf r(t))]/dt$ となり、線積分は端点差だけになる。

</details>

## 問題3

図 `/visuals/course-01/calc-vector-fields-line-integrals.png` では「背景の各矢印が位置 $(x,y)$ におけるベクトル場 $\mathbf F(x,y)$。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-01/calc-vector-fields-line-integrals.png" alt="ベクトル場と線積分の図解" style="max-height: 480px; display:block; margin:0 auto;" />

背景の各矢印が位置 $(x,y)$ におけるベクトル場 $\mathbf F(x,y)$。太線が経路 $\mathbf r(t)$。経路上の一点では接線方向 $\mathbf r\prime(t)$ と場の矢印を描き、その内積が正なら進行方向へ仕事、負なら逆向きの仕事を表す。

</details>

## 問題4

「ベクトル場と線積分」の第二例「$\mathbf F=(-y,x)$、単位円上を反時計回りに $\mathbf r(t)=(\cos t,\sin t)$, $0\le t\le2\pi$ と進むと $\mathbf F=(-\sin t,\cos t)=\mathbf r\prime(t)$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

$\mathbf F=(-y,x)$、単位円上を反時計回りに $\mathbf r(t)=(\cos t,\sin t)$, $0\le t\le2\pi$ と進むと $\mathbf F=(-\sin t,\cos t)=\mathbf r\prime(t)$。内積は1なので線積分は $2\pi$。

</details>

## 問題5

ベクトル場と線積分で ベクトル場、曲線の媒介表示、微小変位 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`calc-vector-fields-line-integrals` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $F$ | ベクトル場 |
| $r(t)$ | 曲線の媒介表示 |
| $dr=r′(t)dt$ | 微小変位 |


- $\mathbf F:\mathbb R^2\to\mathbb R^2$：ベクトル場。
- $C$：向き付き曲線。
- $\mathbf r(t)$：Cの媒介表示。
- $d\mathbf r=\mathbf r'(t)dt$。

</details>

## 問題6

警告「ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。仕事では進行方向成分だけを取る。また経路の向きを逆にすると線積分の符号が反転する。

</details>

## 問題7

よくある誤り「ベクトルの大きさだけを積分しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- ベクトルの大きさだけを積分しない。
- 経路方向を反転すると符号が変わる。

ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。仕事では進行方向成分だけを取る。また経路の向きを逆にすると線積分の符号が反転する。

</details>

## 問題8

「ベクトル場と線積分」の例題1を再計算し、その結果に対して次の検算を実行せよ：線積分ではまず $d\mathbf r=\mathbf r'(t)dt$ を作り、$\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)$ を再計算する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$\mathbf F(\mathbf r(t))=(2t,2t)$、$\mathbf r'=(1,2)$。内積は $2t+4t=6t$。よって $\int_0^1 6t dt=3$。

検算：
線積分ではまず $d\mathbf r=\mathbf r'(t)dt$ を作り、$\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)$ を再計算する。経路を逆向きにすれば $d\mathbf r$ の符号が反転するので、仕事の符号も反転することを確認できる。保存力場なら始点・終点だけを使うpotential差とも一致する。

</details>

## 問題9

後続への接続「Green/Stokes/Gaussの定理は境界上の線積分と内部の微分量を結び付ける。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

Green/Stokes/Gaussの定理は境界上の線積分と内部の微分量を結び付ける。最適化でもgradient fieldに沿った変化量を積分する考えが使える。

</details>

## 問題10

中心問題「空間の各点にベクトルがあるとき、曲線に沿った仕事をどう足し上げるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $F$ | ベクトル場 |
| $r(t)$ | 曲線の媒介表示 |
| $dr=r′(t)dt$ | 微小変位 |


- $\mathbf F:\mathbb R^2\to\mathbb R^2$：ベクトル場。
- $C$：向き付き曲線。
- $\mathbf r(t)$：Cの媒介表示。
- $d\mathbf r=\mathbf r'(t)dt$。

中心式：
$$
\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt
$$

導出：
1. 曲線を短い線分へ分割する。
2. 各線分で仕事を $F\cdot\Delta r$ と近似する。
3. 分割幅を0へしたRiemann和の極限が線積分。

根拠：
短い区間で変位を $\Delta\mathbf r_i$、代表点の力を $\mathbf F_i$ とすると仕事は $\mathbf F_i\cdot\Delta\mathbf r_i$。曲線を細かく分割した和の極限が線積分。媒介表示 $\Delta\mathbf r\approx\mathbf r\prime(t)\Delta t$ を入れると1変数積分へ変わる。

同じ始点・終点でも経路で値が変わる場が一般的。もし $\mathbf F=\nabla\phi$ というpotentialが存在する保守場なら、連鎖律により $\nabla\phi(\mathbf r(t))\cdot\mathbf r\prime(t)=d[\phi(\mathbf r(t))]/dt$ となり、線積分は端点差だけになる。

具体例：
**問題**：$\mathbf F=(2x,y)$、直線経路 $\mathbf r(t)=(t,2t)$, $0\le t\le1$ に沿う線積分を求めよ。

**解答**：$\mathbf F(\mathbf r(t))=(2t,2t)$、$\mathbf r'=(1,2)$。内積は $2t+4t=6t$。よって $\int_0^1 6t dt=3$。

失敗条件：
ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。仕事では進行方向成分だけを取る。また経路の向きを逆にすると線積分の符号が反転する。

</details>
