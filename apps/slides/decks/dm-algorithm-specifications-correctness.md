---
theme: default
routerMode: hash
generatedBy: course01-10-curated-upgrade-v2
generatedBy: textbook-plus-sequential-v3
layout: cover
title: "アルゴリズムの仕様と正しさ"
---

# アルゴリズムの仕様と正しさ

Course 04｜離散数学と証明｜Topic 11/20

---
layout: center
---

## 今回の問い

## 到達目標

- 定義と代表式を、自分の言葉と記号で説明できる。
- 成立条件を確認し、手計算と結果を検算できる。

## 理解確認

- 定義・条件・計算結果を自分の言葉で説明できるか確認する。

アルゴリズムの仕様と正しさの代表式は、どの定義・仮定から、なぜその形になるのか。

---

## なぜ今これを学ぶのか

前Topic `dm-inclusion-exclusion-double-counting` で得た概念を使い、ここでは アルゴリズムの仕様と正しさ へ進む。

---

## 直感

アルゴリズムの正しさは「停止すること」と「停止時に仕様を満たすこと」の両方で示す。



---

## 図解

<img src="./assets/course-04/dm-algorithm-specifications-correctness.png" style="max-height: 350px; display:block; margin:0 auto;" />

ループの各反復で不変量が保たれる様子を状態遷移として描く。 各状態は反復の開始時点、矢印は1回の更新である。不変量は全ての状態で保たれる性質で、初期化・保持・終了の3段階が帰納法に対応する。

---

## 記号と代表式

- $P$：precondition
- $C$：program/command
- $Q$：postcondition
- $\{P\}C\{Q\}$：Hoare triple

$$
\{P\}\ C\ \{Q\}
$$

---

## 導出 1

Pは許される初期状態集合、Qは望む終了状態集合。CがPからQへ写すことを示す。

---

## 導出 2

$\{P\}C_1\{R\}$ と $\{R\}C_2\{Q\}$ があれば、中間assertion Rを介して $\{P\}C_1;C_2\{Q\}$。

---

## 例題

C=`x=x+1`, P:`x=0`ならQ:`x=1`。より一般にP:`x=a`からQ:`x=a+1`。

---

## 条件を変えるとどうなるか

testが100件通っても全入力のcorrectness証明ではない。testは反例を見つけられるが未試験状態を排除しない。

---

## よくある誤解

アルゴリズムの仕様と正しさでは、式へ数値を代入するだけでは不十分である。testが100件通っても全入力のcorrectness証明ではない。testは反例を見つけられるが未試験状態を排除しない。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

---

## 実装・計算上の注意

assertion、type、contractをコードへ埋め込むと仕様の一部をruntime確認できるが、完全な形式証明とは異なる。

---

## 一段先へ

loopを含むprogramでは各反復で保たれるloop invariantと、停止を保証するvariantが核心になる。

---

## 自分で説明できるか

- 「仕様を状態集合として読む」を式を見ずに説明できるか
- 「正しさと停止を分離する」までの論理を一段ずつ再現できるか
- アルゴリズムの仕様と正しさの条件を1つ外した反例を説明できるか

---
layout: center
---

## 教科書と演習

- [教科書](../../textbook/dm-algorithm-specifications-correctness)
- [10問の演習](../../exercises/dm-algorithm-specifications-correctness)
