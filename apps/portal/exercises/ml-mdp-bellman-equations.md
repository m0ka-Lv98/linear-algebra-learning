# MDPとBellman方程式：演習

Course 08｜機械学習

## 問題1

中心式 `$V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

逐次意思決定を、状態・行動・報酬・遷移の確率modelとしてどう定式化するか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

MDPは現在状態が与えられれば未来の遷移分布が過去全体に依存しないMarkov性を仮定する。価値関数は将来報酬の割引和の期待値。

</details>

## 問題3

次の例を途中計算込みで再現せよ：2状態MDPで遷移確率と報酬を与えれば、Vπは連立一次方程式として解ける。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「MDPとBellman方程式」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

return $G_t=R_{t+1}+γR_{t+2}+…$ を定義する。 → 先頭1stepを分離して $G_t=R_{t+1}+γG_{t+1}$。 → 状態sで条件付き期待値を取るとBellman expectation equation。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：rewardとvalueを同じ量と思わない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「MDPとBellman方程式」の中心式 `V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「MDPとBellman方程式」を数値実装する前提で、中心式 `V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「MDPとBellman方程式」の中心式 `V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

rewardとvalueを同じ量と思わない。 / discount γ の位置を1stepずらさない。

</details>

## 問題9

「MDPとBellman方程式」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「MDPとBellman方程式」について、定義 → 中心式 `V^\pi(s)=E_\pi[R_{t+1}+\gamma V^\pi(S_{t+1})\mid S_t=s]` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/ml-mdp-bellman-equations)
