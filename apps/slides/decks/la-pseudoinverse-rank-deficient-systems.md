---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: "擬似逆行列とrank不足の連立方程式"
---

# 擬似逆行列とrank不足の連立方程式

Course 02｜線形代数

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。


rank不足では解がない／複数あるが起こる。Moore–Penrose擬似逆は、最小二乗と最小ノルムという基準で代表解を一意に選ぶ。

---

## 直感を先に作る

rank不足では解がない／複数あるが起こる。Moore–Penrose擬似逆は、最小二乗と最小ノルムという基準で代表解を一意に選ぶ。

---

## 図で確認

<img src="./assets/course-02/la-pseudoinverse-rank-deficient-systems.png" style="max-height: 340px; display:block; margin:0 auto;" />

---

## 図のどこを見るか

- 入力と出力を区別する
- 方向・長さ・部分空間・残差のどれが変わるか見る
- 数式の各項と図の要素を対応させる

---

## 記号とshape

- $\mathbf{A}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^{\mathsf T}$: $\mathbf{A}$のSVD。
- $\mathbf{\Sigma}^{+}$: nonzero特異値$\sigma_i$を$1/\sigma_i$へ置き換えた擬似逆対角行列。
- $\mathbf{A}^{+}$: Moore–Penrose擬似逆行列。
- rank不足では、$\mathbf{A}^{+}\mathbf{b}$が最小二乗解のうち最小2-normのものを選ぶ。

- 行列 $\mathbf{A}\in\mathbb{R}^{m\times n}$ は $n$ 次元入力を $m$ 次元出力へ写す
- ベクトル・行列は初出時に次元を固定する
- shapeが合うことと数学的条件が成立することは別

---

## 代表式

$$
\mathbf{A}^{+}=\mathbf{V}\mathbf{\Sigma}^{+}\mathbf{U}^{\mathsf T}
$$

式を「左辺の意味 → 右辺の操作 → 条件」の順に読む。

---

## なぜ成り立つ？

SVD座標ではrank方向とnull方向が分離される。観測可能な方向だけ逆変換し、null方向の係数を0にすることで最小ノルムになる。

---

## 小さな例

$A=[1\;1]$（1×2）, $b=2$。解は$x_1+x_2=2$で無限にあるが、最小ノルム解は$(1,1)^T$。

---

## 手計算

$A=[1\;1]$、$b=6$ の最小ノルム解を求めよ。

**答え:** 制約$x_1+x_2=6$の下で$x_1^2+x_2^2$を最小にすると対称性から$x_1=x_2=3$。擬似逆でも$(3,3)^T$。

---

## 計算手順

SVD→閾値以上の特異値だけ逆数→$A^+$を適用。実装では `lstsq`/`pinv` のrcondを確認。

---

## 失敗条件

- 非常に小さい特異値を無条件に逆数にするとノイズを大幅増幅。
- 最小ノルム基準は追加の物理制約を自動的に満たすわけではない。
- rank判定は有限精度では閾値依存。

---

## 誤答を診断

「「rank不足なら数値解は一切求められない」」

→ 厳密解が複数/存在しない場合でも、擬似逆で最小ノルム最小二乗解を定義できる。

---

## 数値実装では

- 理論式とアルゴリズムを分ける
- 小さい例で期待値を作る
- 残差・rank・直交性・再構成誤差などで検算する

---

## 後続への接続

under-determined inverse problems、共線性のある回帰、spectral unmixingのrank不足。

---

## 理解確認

1. 定義を式なしで説明できるか
2. 代表式の各記号を定義できるか
3. 条件を外した反例を作れるか
4. 手計算と実装結果を照合できるか

[教科書](../../textbook/la-pseudoinverse-rank-deficient-systems) / [演習](../../exercises/la-pseudoinverse-rank-deficient-systems)
