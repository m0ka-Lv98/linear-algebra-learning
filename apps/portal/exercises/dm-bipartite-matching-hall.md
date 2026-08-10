# 二部matchingとHallの定理：演習

Course 04｜離散数学

## 問題1

中心式 `$\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

左側の全頂点を重複なく右側へ割り当てられる条件は何か。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

matchingは端点を共有しない辺集合。Hallの条件は、左側のどんな部分集合を取っても候補となる右頂点が人数以上あることを要求する。

</details>

## 問題3

次の例を途中計算込みで再現せよ：3人に3種類の仕事を割り当てるとき、任意のk人が少なくともk種類の候補仕事を持つなら完全割当が存在する。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「二部matchingとHallの定理」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

条件が必要なのは鳩の巣原理から直ちに分かる。 → 十分性は最大matchingを仮定し、未matching頂点から交互道を探索する。 → 増加路が無いとHall違反集合を構成でき、矛盾。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：matchingとperfect matchingを区別する。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「二部matchingとHallの定理」の中心式 `\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「二部matchingとHallの定理」を数値実装する前提で、中心式 `\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「二部matchingとHallの定理」の中心式 `\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

matchingとperfect matchingを区別する。 / 局所的に候補が多いだけでHall条件全体を満たすとは限らない。

</details>

## 問題9

「二部matchingとHallの定理」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「二部matchingとHallの定理」について、定義 → 中心式 `\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/dm-bipartite-matching-hall)
