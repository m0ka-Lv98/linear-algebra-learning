---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "数値積分と求積法"
---

# 数値積分と求積法

Course 05｜数値計算｜Topic 08/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

数値積分と求積法の代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `num-numerical-differentiation` で得た概念を使い、ここでは 数値積分と求積法 へ進む。

---

## 直感

数値積分は曲線下を有限個の簡単な面積へ分割して足し合わせる。



---

## 図解

<img src="./assets/course-05/num-numerical-integration-quadrature.png" style="max-height: 350px; display:block; margin:0 auto;" />

台形則の分割数を増やし、真の面積へ近づく様子を見る。 区間を小区間へ分け、各小区間の面積近似を足したものが数値積分である。長方形・台形・高次近似で曲線下の面積への追従の仕方が変わる。

---

## 記号と代表式

- $[a,b]$：積分区間
- $h=(b-a)/n$
- $x_i=a+ih$
- trapezoidal rule：各小区間を台形で近似

$$
\int_a^bf(x)dx\approx\frac{h}{2}[f(a)+2\sum f(x_i)+f(b)]
$$

---

## 導出 1

$[x_i,x_{i+1}]$ で曲線を端点を結ぶ直線へ置換。その積分は台形面積 $h(f_i+f_{i+1})/2$。

---

## 導出 2

隣接区間で内部点f_iが2回現れるため、端点1回・内部2回の複合式になる。

---

## 例題

$f(x)=x$ は直線なので台形則でexact。0〜1を何分割しても1/2。

---

## 条件を変えるとどうなるか

discontinuityやsingularityがあると滑らかさに基づく誤差orderが崩れる。uniform細分化が非効率な場合はadaptive quadrature。

---

## よくある誤解

数値積分と求積法では、式へ数値を代入するだけでは不十分である。discontinuityやsingularityがあると滑らかさに基づく誤差orderが崩れる。uniform細分化が非効率な場合はadaptive quadrature。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

数値積分libraryはabsolute/relative tolerance、function evaluation数を返すことが多い。値だけでなくerror estimateを確認する。

---

## 一段先へ

高次補間を積分してSimpson/Gauss quadratureへ進める。Monte Carloは次元が高いとき別の収束特性を持つ。

---

## 自分で説明できるか

- 「1区間で線形補間」を式を見ずに説明できるか
- 「誤差次数」までの論理を一段ずつ再現できるか
- 数値積分と求積法の条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/num-numerical-integration-quadrature)
- [10問の演習](../../exercises/num-numerical-integration-quadrature)
