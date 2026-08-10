---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
layout: cover
title: "perceptronと多層network"
---

# perceptronと多層network

Course 09｜深層学習｜Topic 01/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

perceptronと多層networkの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

Course 09 の入口として、perceptronと多層network を定義から組み立てる。

---

## 直感

ニューラルネットは線形変換と非線形変換を層状に合成し、複雑な関数を表現する。



---

## 図解

<img src="./assets/course-09/dl-perceptron-mlp.png" style="max-height: 350px; display:block; margin:0 auto;" />

入力→hidden→出力のノードと重みの流れを描く。 ノードがactivation、辺が重み付き線形変換である。各層で線形変換の後に非線形関数を挟むため、層を重ねても単一の線形写像には潰れない。

---

## 記号と代表式

- $x\in\mathbb R^d$：input
- $W\in\mathbb R^{h\times d}$：weight matrix
- $b\in\mathbb R^h$：bias
- $\phi$：activation
- $h=\phi(Wx+b)$

$$
\mathbf{h}=\phi(\mathbf{W}\mathbf{x}+\mathbf{b})
$$

---

## 導出 1

$z=Wx+b$ はinput featureのlinear combination。各rowが1 hidden unitのpre-activation。

---

## 導出 2

activationがidentityならlayerを何段重ねても $W_L\cdots W_1x+\tilde b$ という1つのaffine mapに畳める。

---

## 例題

1D ReLU unit $h=max(0,wx+b)$ はthreshold点で傾きが変わる折れ線。複数unitを足すとpiecewise linear curveを作れる。

---

## 条件を変えるとどうなるか

activationを全layerでlinearにするとparameter数が増えてもfunction classはlinearのまま。

---

## よくある誤解

perceptronと多層networkでは、式へ数値を代入するだけでは不十分である。activationを全layerでlinearにするとparameter数が増えてもfunction classはlinearのまま。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

batch dimensionとfeature dimensionを明記。bias broadcasting、activation placement、parameter initializationをunit test。

---

## 一段先へ

networkを学習するにはlossから各parameterへ微分を効率よく伝えるbackpropagationが必要。

---

## 自分で説明できるか

- 「affine map」を式を見ずに説明できるか
- 「composition」までの論理を一段ずつ再現できるか
- perceptronと多層networkの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/dl-perceptron-mlp)
- [10問の演習](../../exercises/dl-perceptron-mlp)
