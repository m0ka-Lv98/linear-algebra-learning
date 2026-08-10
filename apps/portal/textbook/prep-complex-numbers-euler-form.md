# 複素数・極形式・Euler公式：教科書

Course 00｜学習準備

## このTopicで解く問題

複素数の掛け算を、平面上の回転と拡大としてどう読むか。

## なぜこの概念が必要か

複素数 z=a+bi は平面上のベクトルとみなせる。極形式では大きさ r と角度 θ に分け、掛け算が「大きさを掛け、角度を足す」操作になる。Fourier・固有値・振動の共通言語になる。

## 図の各要素は何を表しているか

<img src="/visuals/course-00/prep-complex-numbers-euler-form.png" alt="複素数・極形式・Euler公式の図解" style="max-height: 480px; display:block; margin:0 auto;" />

複素平面の横軸は実部、縦軸は虚部。原点から $z$ への矢印の長さが $|z|=r$、正の実軸からの角度が $\theta$。単位円上の $e^{i\theta}$ を掛けると、長さは変えずに角度だけ $\theta$ 増えるため、図の2本の矢印は「同じ長さで回転した」関係になっている。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $i$ | i²=-1 を満たす虚数単位 |
| $r=|z|$ | 複素数の絶対値 |
| $θ=arg z$ | 偏角 |


- $i$：$i^2=-1$ を満たす虚数単位。
- $z=a+bi$：複素数。$a=\operatorname{Re}z$, $b=\operatorname{Im}z$。
- $r=|z|\ge0$, $\theta$：偏角。

## 中心となる式

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

## 中心式を前提から導く

1. 複素平面では単位円上の点を $(\cos\theta,\sin\theta)$ で表せる。
2. これを複素数 $\cos\theta+i\sin\theta$ とまとめると、角度の加法が複素数の乗法に対応する。
3. この回転表現を $e^{i\theta}$ と記す。Taylor級数による解析的な導出はCourse 01のTaylor級数後に行う。

## なぜこの表記が回転を表すのか

単位円上の角度 $\theta$ の点を

$$
z_\theta=\cos\theta+i\sin\theta
$$

と置く。三角関数の加法定理を使うと

$$
\begin{aligned}
z_\alpha z_\beta
&=(\cos\alpha+i\sin\alpha)(\cos\beta+i\sin\beta)\\
&=\cos(\alpha+\beta)+i\sin(\alpha+\beta)\\
&=z_{\alpha+\beta}.
\end{aligned}
$$

つまりこの単位複素数の積は角度の加法と完全に同じ法則を持つ。Course 00ではこの回転族を $e^{i\theta}$ と表す約束を導入する。指数関数の冪級数から本当にEuler公式が導けることは、Taylor級数を学んだ後に改めて証明する。

## この段階でのEuler公式の位置づけ

Course 00ではTaylor級数をまだ学んでいない。そのため

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

をTaylor級数から証明したことにはしない。ここでは「複素指数を回転と結び付ける基本関係」として導入し、使う性質を確認する。Course 01でTaylor級数を学んだ後、$e^z$, $\sin z$, $\cos z$ の冪級数を用いてこの式を導出し直す。

## 共役・絶対値・逆数

$z=a+bi$ の複素共役を $\bar z=a-bi$ と定義する。すると

$$
z\bar z=a^2+b^2=|z|^2.
$$

したがって $z\ne0$ なら

$$
\frac1z=\frac{\bar z}{|z|^2}.
$$

これは複素数の割り算を実数の分母へ変える公式である。極形式 $z=re^{i\theta}$ なら共役は $\bar z=re^{-i\theta}$ なので、共役は複素平面で実軸に関する鏡映と読める。

## 乗算と除算を幾何で読む

$z_1=r_1e^{i\theta_1}$, $z_2=r_2e^{i\theta_2}$ と書けば

$$
z_1z_2=r_1r_2e^{i(\theta_1+\theta_2)},\qquad
\frac{z_1}{z_2}=\frac{r_1}{r_2}e^{i(\theta_1-\theta_2)}.
$$

したがって乗算は「拡大率を掛け、回転角を足す」、除算は「拡大率を割り、回転角を引く」。この見方は後のFourier変換で、位相差を角度差として扱うときにそのまま使う。

## 例題1：具体的な数値・構造で解く

**問題**：$z=2e^{i\pi/6}$ と $w=3e^{-i\pi/3}$ の積を極形式と直交形式の両方で求めよ。

**解答**：$zw=6e^{-i\pi/6}=6(\sqrt3/2-i/2)=3\sqrt3-3i$。倍率は2×3=6、角度は $\pi/6-\pi/3=-\pi/6$。

## 例題2：別の条件で確認する

$(1+i)^2=1+2i+i^2=2i$。極形式では $1+i=\sqrt2 e^{i\pi/4}$ なので二乗は $2e^{i\pi/2}=2i$。直交座標計算と回転の解釈が一致する。

## 結果の検算

極形式と直交形式の2経路で同じ結果になるか確認する。積では絶対値が $|z_1z_2|=|z_1||z_2|$、偏角が $\arg(z_1z_2)=\arg z_1+\arg z_2\pmod{2\pi}$ を満たすかを別々に検算する。

## 条件を外すと何が壊れるか

argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。主値を使う場合は範囲を明示する。また $z=0$ では角度は定義できない。

## よくある誤り

- 複素共役と逆数を混同しない。
- arg は2πの整数倍だけ不定である。

## 次のTopic・応用への接続

Fourier変換では正弦・余弦を $e^{i\omega t}$ にまとめ、振幅と位相を同時に扱う。線形代数では実行列でも複素固有値が現れるため、この表現が後続Courseの共通言語になる。

## 参考

- Euler formula; later Fourier/DFT

[演習へ](/exercises/prep-complex-numbers-euler-form)　|　[スライドへ](/slides/prep-complex-numbers-euler-form/)
