# value iterationとpolicy iteration：演習

Course 08｜機械学習

## 問題1

中心式 `$V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

最適Bellman operatorは「1step行動を選び、その後も最適に行動する」backup。γ<1ならsup normでcontractionなので反復が一意の固定点V*へ収束する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：小さなgrid worldでterminalから価値が後方へ伝播する様子を反復で確認する。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「value iterationとpolicy iteration」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

Bellman optimality equationを固定点方程式 V*=T*V* と読む。 → T*はγ-contractionなので Banach fixed-point theoremにより反復収束。 → V*から各状態でargmax actionを選んでgreedy optimal policyを得る。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：policy evaluationとpolicy improvementを混同しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「value iterationとpolicy iteration」の中心式 `V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「value iterationとpolicy iteration」を数値実装する前提で、中心式 `V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「value iterationとpolicy iteration」の中心式 `V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

policy evaluationとpolicy improvementを混同しない。 / γ=1のcontinuing taskで同じcontraction議論を無条件に使わない。

</details>

## 問題9

「value iterationとpolicy iteration」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「value iterationとpolicy iteration」について、定義 → 中心式 `V_{k+1}(s)=\max_a\sum_{s\prime}P(s\prime|s,a)[r(s,a,s\prime)+\gamma V_k(s\prime)]` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/ml-dynamic-programming-value-policy-iteration)
