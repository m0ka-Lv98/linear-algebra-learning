# Monte Carlo・TD・Q-learning：演習

Course 08｜機械学習

## 問題1

中心式 `$Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

遷移modelが未知でも、経験sampleだけから価値関数をどう学ぶか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

Monte Carloはepisode完了後の実returnをtargetにする。TDは1step先の現在推定値をbootstrapping targetにする。Q-learningはoff-policy TD control。

</details>

## 問題3

次の例を途中計算込みで再現せよ：terminal直前の成功報酬がまず直前state-actionへ入り、episodeを重ねると前の状態へ伝播する。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「Monte Carlo・TD・Q-learning」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

Bellman optimality targetを未知期待値のsampleで近似する。 → 現在Qとsample targetとの差をTD errorとする。 → stochastic approximationとしてQをTD error方向へ更新する。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：Q-learningのmax targetとSARSAのon-policy next actionを混同しない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「Monte Carlo・TD・Q-learning」の中心式 `Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「Monte Carlo・TD・Q-learning」を数値実装する前提で、中心式 `Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「Monte Carlo・TD・Q-learning」の中心式 `Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

Q-learningのmax targetとSARSAのon-policy next actionを混同しない。 / function approximation + off-policy + bootstrappingの不安定性に注意する。

</details>

## 問題9

「Monte Carlo・TD・Q-learning」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「Monte Carlo・TD・Q-learning」について、定義 → 中心式 `Q(S_t,A_t)\leftarrow Q(S_t,A_t)+\alpha[R_{t+1}+\gamma\max_aQ(S_{t+1},a)-Q(S_t,A_t)]` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/ml-monte-carlo-td-q-learning)
