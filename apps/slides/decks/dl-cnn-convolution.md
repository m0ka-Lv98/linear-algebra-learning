---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "CNNと畳み込み"
---

# CNNと畳み込み

Course 09｜深層学習｜Topic 06/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

CNNと畳み込みの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `dl-optimization-regularization` で得た概念を使い、ここでは CNNと畳み込み へ進む。

---

## 直感

CNNは局所kernelを共有して画像上を走査し、位置ごとの同じパターンを検出する。



---

## 図解

<img src="./assets/course-09/dl-cnn-convolution.png" style="max-height: 350px; display:block; margin:0 auto;" />

小さな画像上を3×3 kernelが移動してfeature mapを作る。 小さなkernelが画像上を共有されながら走査する。同じ重みを位置ごとに再利用するためparameter数を抑えつつ局所patternを検出できる。

---

## 記号と代表式

- $x_{i,j,c}$：input feature map
- $w_{a,b,c,k}$：kernel
- $y_{i,j,k}$：output
- stride/padding

$$
y_{i,j,k}=\sum_{a,b,c}w_{a,b,c,k}x_{i+a,j+b,c}
$$

---

## 導出 1

output位置(i,j)は近傍patchのweighted sum。full dense connectivityではない。

---

## 導出 2

同じkernel wを全位置で使うため、inputをshiftするとboundary effectsを除きfeature mapもshift。

---

## 例題

3×3 edge kernelはimageのlocal intensity differenceへresponse。same kernelが全位置でedge detector。

---

## 条件を変えるとどうなるか

padding choiceでstrict equivarianceがboundaryで壊れる。rotation invarianceはstandard convolutionから自動で得られない。

---

## よくある誤解

CNNと畳み込みでは、式へ数値を代入するだけでは不十分である。padding choiceでstrict equivarianceがboundaryで壊れる。rotation invarianceはstandard convolutionから自動で得られない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

frameworkはcross-correlation conventionが一般的。NCHW/NHWC shape、dilation/groups確認。

---

## 一段先へ

spatial grid以外のordered sequenceではshared recurrent stateやattentionを使う。まずRNN。

---

## 自分で説明できるか

- 「local receptive field」を式を見ずに説明できるか
- 「multi-channel」までの論理を一段ずつ再現できるか
- CNNと畳み込みの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/dl-cnn-convolution)
- [10問の演習](../../exercises/dl-cnn-convolution)
