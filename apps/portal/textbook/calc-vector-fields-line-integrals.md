# ベクトル場と線積分：教科書

Course 01｜微積分

## このTopicで解く問題

空間の各点にベクトルがあるとき、曲線に沿った仕事をどう足し上げるか。

## なぜこの概念が必要か

力場Fの中を曲線Cに沿って動くと、微小変位drに平行な力成分だけが仕事をする。内積 F·dr を経路全体で積分する。

## 図の各要素は何を表しているか

<img src="/visuals/course-01/calc-vector-fields-line-integrals.png" alt="ベクトル場と線積分の図解" style="max-height: 480px; display:block; margin:0 auto;" />

背景の各矢印が位置 $(x,y)$ におけるベクトル場 $\mathbf F(x,y)$。太線が経路 $\mathbf r(t)$。経路上の一点では接線方向 $\mathbf r\prime(t)$ と場の矢印を描き、その内積が正なら進行方向へ仕事、負なら逆向きの仕事を表す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $F$ | ベクトル場 |
| $r(t)$ | 曲線の媒介表示 |
| $dr=r′(t)dt$ | 微小変位 |


- $\mathbf F:\mathbb R^2\to\mathbb R^2$：ベクトル場。
- $C$：向き付き曲線。
- $\mathbf r(t)$：Cの媒介表示。
- $d\mathbf r=\mathbf r'(t)dt$。

## 中心となる式

$$
\int_C \mathbf{F}\cdot d\mathbf{r}=\int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}\prime(t)\,dt
$$

## 中心式を前提から導く

1. 曲線を短い線分へ分割する。
2. 各線分で仕事を $F\cdot\Delta r$ と近似する。
3. 分割幅を0へしたRiemann和の極限が線積分。

## なぜその変形をしてよいのか

短い区間で変位を $\Delta\mathbf r_i$、代表点の力を $\mathbf F_i$ とすると仕事は $\mathbf F_i\cdot\Delta\mathbf r_i$。曲線を細かく分割した和の極限が線積分。媒介表示 $\Delta\mathbf r\approx\mathbf r\prime(t)\Delta t$ を入れると1変数積分へ変わる。

同じ始点・終点でも経路で値が変わる場が一般的。もし $\mathbf F=\nabla\phi$ というpotentialが存在する保守場なら、連鎖律により $\nabla\phi(\mathbf r(t))\cdot\mathbf r\prime(t)=d[\phi(\mathbf r(t))]/dt$ となり、線積分は端点差だけになる。

## 内積をこのTopic内で定義する

Course 02の内積をまだ学んでいないので、ここで2次元の場合を明示する。$\mathbf a=(a_1,a_2)$, $\mathbf b=(b_1,b_2)$ に対し

$$
\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2.
$$

これは「aのb方向成分×bの長さ」を表し、2ベクトルが垂直なら0になる。線積分の

$$
\mathbf F\cdot d\mathbf r
$$

は、力のうち実際の微小移動方向に平行な成分だけが仕事へ寄与することを表す。

## 経路依存性を比較する

$\mathbf F=(y,0)$ を考える。原点から(1,1)へ、(1) x方向→y方向、(2) y方向→x方向で進む。

経路1では最初y=0なので仕事0、次の縦移動では $d\mathbf r=(0,dy)$ なので内積0。合計0。

経路2では最初の縦移動は0、次にy=1で横移動するので

$$
\int_0^1 1\,dx=1.
$$

同じ端点でも値が違い、この場は経路依存。

## 保守場とpotential

もしスカラー関数 $\phi$ が存在して $\mathbf F=\nabla\phi$ と書けるなら、曲線上で

$$
\frac{d}{dt}\phi(\mathbf r(t))
=\nabla\phi(\mathbf r(t))\cdot\mathbf r'(t).
$$

よって線積分は $\phi(\text{終点})-\phi(\text{始点})$。この結果は多変数連鎖律とFTCの組合せである。

## 例題1：具体的な数値・構造で解く

**問題**：$\mathbf F=(2x,y)$、直線経路 $\mathbf r(t)=(t,2t)$, $0\le t\le1$ に沿う線積分を求めよ。

**解答**：$\mathbf F(\mathbf r(t))=(2t,2t)$、$\mathbf r'=(1,2)$。内積は $2t+4t=6t$。よって $\int_0^1 6t dt=3$。

## 例題2：別の条件で確認する

$\mathbf F=(-y,x)$、単位円上を反時計回りに $\mathbf r(t)=(\cos t,\sin t)$, $0\le t\le2\pi$ と進むと $\mathbf F=(-\sin t,\cos t)=\mathbf r\prime(t)$。内積は1なので線積分は $2\pi$。

## 結果の検算

線積分ではまず $d\mathbf r=\mathbf r'(t)dt$ を作り、$\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)$ を再計算する。経路を逆向きにすれば $d\mathbf r$ の符号が反転するので、仕事の符号も反転することを確認できる。保存力場なら始点・終点だけを使うpotential差とも一致する。

## 条件を外すと何が壊れるか

ベクトル場の大きさ $\|F\|$ を積分するのと $F\cdot dr$ は別物。仕事では進行方向成分だけを取る。また経路の向きを逆にすると線積分の符号が反転する。

## よくある誤り

- ベクトルの大きさだけを積分しない。
- 経路方向を反転すると符号が変わる。

## 次のTopic・応用への接続

Green/Stokes/Gaussの定理は境界上の線積分と内部の微分量を結び付ける。最適化でもgradient fieldに沿った変化量を積分する考えが使える。

## 参考

- MIT 18.02SC Line Integrals

[演習へ](/exercises/calc-vector-fields-line-integrals)　|　[スライドへ](/slides/calc-vector-fields-line-integrals/)
