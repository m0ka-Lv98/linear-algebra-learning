# 媒介変数表示と極座標：教科書

Course 01｜微積分

## このTopicで解く問題

xを独立変数にできない曲線を、媒介変数や極座標でどう扱うか。

## なぜこの概念が必要か

曲線を時間tに沿って動く点 (x(t),y(t)) として表せば、縦線を含む曲線も自然に表現できる。極座標は距離rと角度θで点を表す。

## 図の各要素は何を表しているか

<img src="/visuals/course-01/calc-parametric-polar-curves.png" alt="媒介変数表示と極座標の図解" style="max-height: 480px; display:block; margin:0 auto;" />

図の螺旋はパラメータ $t$ を増やすと点 $(x(t),y(t))$ が連続的に移動して描かれる。各点で速度ベクトル $(x\prime(t),y\prime(t))$ が接線方向を与え、横成分が0でなければ傾きは $y\prime/x\prime$。極座標なら同じ点を半径 $r$ と角度 $\theta$ で表す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $t$ | 媒介変数 |
| $x(t),y(t)$ | 平面座標 |
| $r(θ)$ | 極座標での半径 |


- $t$：媒介変数。
- $x(t),y(t)$：曲線座標。
- $r,\theta$：極座標の半径と角度。

## 中心となる式

$$
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\quad(dx/dt\ne0)
$$

## 中心式を前提から導く

1. x,yの両方をtの関数とみなす。
2. 連鎖律で dy/dt=(dy/dx)(dx/dt)。
3. dx/dt≠0なら dy/dx について解く。

## なぜその変形をしてよいのか

媒介表示では「xを入力してyを返す」という関数グラフの制約を外し、$t\mapsto(x(t),y(t))$ という平面への写像として曲線を扱う。連鎖律 $dy/dt=(dy/dx)(dx/dt)$ から、$dx/dt\ne0$ の点で $dy/dx=(dy/dt)/(dx/dt)$。

極座標は $x=r\cos\theta$, $y=r\sin\theta$。$r$ が $\theta$ の関数なら、この2式を $\theta$ で微分して接線を求められる。円や螺旋のようにCartesian式より自然な曲線が多い。

## 速度・速さ・弧長

媒介曲線 $\mathbf r(t)=(x(t),y(t))$ の速度ベクトルは

$$
\mathbf r'(t)=(x'(t),y'(t)).
$$

その大きさ

$$
\|\mathbf r'(t)\|=\sqrt{(x')^2+(y')^2}
$$

が速さ。したがって区間 $a\le t\le b$ の弧長は

$$
L=\int_a^b\sqrt{(x'(t))^2+(y'(t))^2}\,dt.
$$

これは短い時間 $\Delta t$ で進む距離を $\|\mathbf r'(t)\|\Delta t$ と近似し、足し合わせた極限。

## 極座標の曲線

$r=r(\theta)$ なら

$$
x=r(\theta)\cos\theta,\qquad y=r(\theta)\sin\theta.
$$

積の微分を使い

$$
\frac{dx}{d\theta}=r'\cos\theta-r\sin\theta,
\qquad
\frac{dy}{d\theta}=r'\sin\theta+r\cos\theta.
$$

$dx/d\theta\ne0$ なら両者の比が接線傾き。円 $r=R$ では $r'=0$ なので $dy/dx=-\cot\theta$ となり、Cartesianで得る円の接線と一致する。

## 例題1：具体的な数値・構造で解く

**問題**：$x=t^2$, $y=t^3$ の $t=2$ における接線の傾きと接線方程式を求めよ。

**解答**：$dx/dt=2t=4$, $dy/dt=3t^2=12$ なので $dy/dx=3$。点は(4,8)だから $y-8=3(x-4)$。

## 例題2：別の条件で確認する

$x=t^2-1$, $y=t^3-t$ の $t=1$ では $dx/dt=2$, $dy/dt=2$ なので傾き1。点は $(0,0)$。同じ点を別のtが通る場合は枝ごとに接線が異なることもある。

## 結果の検算

媒介変数 $t=t_0$ を代入して得た点 $(x(t_0),y(t_0))$ が元の曲線条件を満たすか確認する。傾きは $dy/dx=y'(t_0)/x'(t_0)$ なので、$x'(t_0)=0$ なら有限傾きとして扱わず垂直接線の可能性を調べる。

## 条件を外すと何が壊れるか

$dx/dt=0$ の点で比を取ってはいけない。$dy/dt\ne0$ なら垂直接線の可能性がある。両方0なら高階項を調べる必要があり、単純な0/0では結論できない。

## よくある誤り

- dx/dt=0の点で比を機械適用しない。
- 極座標では同じ点に複数表現がある。

## 次のTopic・応用への接続

線積分では曲線を媒介表示して $d\mathbf r=\mathbf r\prime(t)dt$ とする。物理の軌道、最適化のパス、複素積分などでも同じ表現を使う。

## 参考

- MIT 18.01SC Parametric Equations and Polar Coordinates

[演習へ](/exercises/calc-parametric-polar-curves)　|　[スライドへ](/slides/calc-parametric-polar-curves/)
