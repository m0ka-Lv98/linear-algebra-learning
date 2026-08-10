# 複素数・極形式・Euler公式：演習

Course 00｜学習準備

[教科書](/textbook/prep-complex-numbers-euler-form)

## 問題1

$z=2e^{i\pi/6}$ と $w=3e^{-i\pi/3}$ の積を極形式と直交形式の両方で求めよ。

<details><summary>完全解答</summary>

$zw=6e^{-i\pi/6}=6(\sqrt3/2-i/2)=3\sqrt3-3i$。倍率は2×3=6、角度は $\pi/6-\pi/3=-\pi/6$。

</details>

## 問題2

「複素数・極形式・Euler公式」の導出を、最初の段階「1. 複素平面では単位円上の点を $(\cos\theta,\sin\theta)$ で表せる。」から始めて中心式まで再構成せよ。途中で「複素数 z=a+bi は平面上のベクトルとみなせる。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 複素平面では単位円上の点を $(\cos\theta,\sin\theta)$ で表せる。
2. これを複素数 $\cos\theta+i\sin\theta$ とまとめると、角度の加法が複素数の乗法に対応する。
3. この回転表現を $e^{i\theta}$ と記す。Taylor級数による解析的な導出はCourse 01のTaylor級数後に行う。

</details>

## 問題3

図 `/visuals/course-00/prep-complex-numbers-euler-form.png` では「複素平面の横軸は実部、縦軸は虚部。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-00/prep-complex-numbers-euler-form.png" alt="複素数・極形式・Euler公式の図解" style="max-height: 480px; display:block; margin:0 auto;" />

複素平面の横軸は実部、縦軸は虚部。原点から $z$ への矢印の長さが $|z|=r$、正の実軸からの角度が $\theta$。単位円上の $e^{i\theta}$ を掛けると、長さは変えずに角度だけ $\theta$ 増えるため、図の2本の矢印は「同じ長さで回転した」関係になっている。

</details>

## 問題4

「複素数・極形式・Euler公式」の第二例「$(1+i)^2=1+2i+i^2=2i$。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

$(1+i)^2=1+2i+i^2=2i$。極形式では $1+i=\sqrt2 e^{i\pi/4}$ なので二乗は $2e^{i\pi/2}=2i$。直交座標計算と回転の解釈が一致する。

</details>

## 問題5

複素数・極形式・Euler公式で i²=-1 を満たす虚数単位、複素数の絶対値、偏角 は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`prep-complex-numbers-euler-form` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $i$ | i²=-1 を満たす虚数単位 |
| $r=|z|$ | 複素数の絶対値 |
| $θ=arg z$ | 偏角 |


- $i$：$i^2=-1$ を満たす虚数単位。
- $z=a+bi$：複素数。$a=\operatorname{Re}z$, $b=\operatorname{Im}z$。
- $r=|z|\ge0$, $\theta$：偏角。

</details>

## 問題6

警告「argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。主値を使う場合は範囲を明示する。また $z=0$ では角度は定義できない。

</details>

## 問題7

よくある誤り「複素共役と逆数を混同しない。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- 複素共役と逆数を混同しない。
- arg は2πの整数倍だけ不定である。

argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。主値を使う場合は範囲を明示する。また $z=0$ では角度は定義できない。

</details>

## 問題8

「複素数・極形式・Euler公式」の例題1を再計算し、その結果に対して次の検算を実行せよ：極形式と直交形式の2経路で同じ結果になるか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

$zw=6e^{-i\pi/6}=6(\sqrt3/2-i/2)=3\sqrt3-3i$。倍率は2×3=6、角度は $\pi/6-\pi/3=-\pi/6$。

検算：
極形式と直交形式の2経路で同じ結果になるか確認する。積では絶対値が $|z_1z_2|=|z_1||z_2|$、偏角が $\arg(z_1z_2)=\arg z_1+\arg z_2\pmod{2\pi}$ を満たすかを別々に検算する。

</details>

## 問題9

後続への接続「Fourier変換では正弦・余弦を $e^{i\omega t}$ にまとめ、振幅と位相を同時に扱う。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

Fourier変換では正弦・余弦を $e^{i\omega t}$ にまとめ、振幅と位相を同時に扱う。線形代数では実行列でも複素固有値が現れるため、この表現が後続Courseの共通言語になる。

</details>

## 問題10

中心問題「複素数の掛け算を、平面上の回転と拡大としてどう読むか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ e^{i\theta}=\cos\theta+i\sin\theta $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $i$ | i²=-1 を満たす虚数単位 |
| $r=|z|$ | 複素数の絶対値 |
| $θ=arg z$ | 偏角 |


- $i$：$i^2=-1$ を満たす虚数単位。
- $z=a+bi$：複素数。$a=\operatorname{Re}z$, $b=\operatorname{Im}z$。
- $r=|z|\ge0$, $\theta$：偏角。

中心式：
$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

導出：
1. 複素平面では単位円上の点を $(\cos\theta,\sin\theta)$ で表せる。
2. これを複素数 $\cos\theta+i\sin\theta$ とまとめると、角度の加法が複素数の乗法に対応する。
3. この回転表現を $e^{i\theta}$ と記す。Taylor級数による解析的な導出はCourse 01のTaylor級数後に行う。

根拠：


具体例：
**問題**：$z=2e^{i\pi/6}$ と $w=3e^{-i\pi/3}$ の積を極形式と直交形式の両方で求めよ。

**解答**：$zw=6e^{-i\pi/6}=6(\sqrt3/2-i/2)=3\sqrt3-3i$。倍率は2×3=6、角度は $\pi/6-\pi/3=-\pi/6$。

失敗条件：
argument $\theta$ は一意ではなく $\theta+2\pi k$ も同じ複素数を表す。主値を使う場合は範囲を明示する。また $z=0$ では角度は定義できない。

</details>
