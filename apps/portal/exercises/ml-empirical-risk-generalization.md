# 経験リスク・期待リスク・汎化：演習

Course 08｜機械学習

## 問題1

中心式 `$R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

training lossを下げることと、未知データで良い予測をすることはなぜ同じではないのか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

学習で直接最小化できるのは有限標本の経験リスク。目的は母集団分布に対する期待リスクなので、両者のgapを理解するのがgeneralization。

</details>

## 問題3

次の例を途中計算込みで再現せよ：高次数多項式はtraining errorを0にできてもtest errorが増える場合がある。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「経験リスク・期待リスク・汎化」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

目標量Rは未知分布Dの期待値なので直接計算できない。 → iid標本で期待値を標本平均R̂へ置き換える。 → 同じデータでmodel選択まで行うと適応によるoptimismが生じるためvalidation/test分離が必要。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：test setをhyperparameter tuningに使わない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「経験リスク・期待リスク・汎化」の中心式 `R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「経験リスク・期待リスク・汎化」を数値実装する前提で、中心式 `R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「経験リスク・期待リスク・汎化」の中心式 `R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

test setをhyperparameter tuningに使わない。 / training lossが低いだけで汎化を保証しない。

</details>

## 問題9

「経験リスク・期待リスク・汎化」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「経験リスク・期待リスク・汎化」について、定義 → 中心式 `R(f)=E_{(X,Y)\sim D}[\ell(f(X),Y)],\quad \hat R_n(f)=\frac1n\sum_{i=1}^n\ell(f(x_i),y_i)` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/ml-empirical-risk-generalization)
