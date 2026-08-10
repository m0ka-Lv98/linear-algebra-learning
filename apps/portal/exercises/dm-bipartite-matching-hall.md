# 二部matchingとHallの定理：演習

Course 04｜離散数学

[教科書](/textbook/dm-bipartite-matching-hall)

## 問題1

L={A,B,C}, R={1,2,3}、近傍が A:{1}, B:{1,2}, C:{2,3} のときHall条件を確認し、Lを飽和するmatchingを1つ示せ。

<details><summary>完全解答</summary>

各単集合は近傍1以上。{A,B}の近傍{1,2}で2、{B,C}は{1,2,3}で3、{A,C}も{1,2,3}で3、全体も3。Hall成立。matching A-1, B-2, C-3。

</details>

## 問題2

「二部matchingとHallの定理」の導出を、最初の段階「1. 条件が必要なのは鳩の巣原理から直ちに分かる。」から始めて中心式まで再構成せよ。途中で「必要性は鳩の巣原理。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 条件が必要なのは鳩の巣原理から直ちに分かる。
2. 十分性は最大matchingを仮定し、未matching頂点から交互道を探索する。
3. 増加路が無いとHall違反集合を構成でき、矛盾。

必要性は鳩の巣原理。Sの全頂点を異なる右頂点へ割り当てるなら、その候補集合 $N(S)$ に少なくとも|S|個必要。

十分性の直感はaugmenting path。最大matchingが左を飽和しないと仮定し、未matching左頂点から「非matching辺→matching辺」を交互にたどる。右側の未matching頂点へ到達すればmatchingを反転して1本増やせるので最大性に矛盾。到達できなければ探索集合からHall違反を構成できる。

</details>

## 問題3

図 `/visuals/course-04/dm-bipartite-matching-hall.png` では「左集合Lと右集合Rを左右に分け、候補関係を細線、選ばれたmatchingを太線で示す。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-04/dm-bipartite-matching-hall.png" alt="二部matchingとHallの定理の図解" style="max-height: 480px; display:block; margin:0 auto;" />

左集合Lと右集合Rを左右に分け、候補関係を細線、選ばれたmatchingを太線で示す。matchingでは同じ頂点へ太線が2本入らない。Hall条件は左の任意部分集合Sから到達できる右側近傍 $N(S)$ の個数がS以上であることを要求する。

</details>

## 問題4

「二部matchingとHallの定理」の第二例「L={A,B,C}, R={1,2,3}、候補 A:{1,2}, B:{2,3}, C:{1,3}。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

L={A,B,C}, R={1,2,3}、候補 A:{1,2}, B:{2,3}, C:{1,3}。単集合・2要素集合・全体のすべてで近傍数が集合サイズ以上なのでHall条件を満たし、例えばA-1,B-2,C-3がperfect matching。

</details>

## 問題5

二部matchingとHallの定理で 二部グラフ、S⊆Lの隣接頂点集合、matching は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`dm-bipartite-matching-hall` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $G=(L∪R,E)$ | 二部グラフ |
| $N(S)$ | S⊆Lの隣接頂点集合 |
| $M$ | matching |


- $G=(L\cup R,E)$：二部グラフ。
- $N(S)$：左部分集合Sの右側近傍集合。
- matching：端点を共有しない辺集合。

</details>

## 問題6

警告「各頂点が少なくとも1候補を持つだけでは不十分。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

各頂点が少なくとも1候補を持つだけでは不十分。A,B,Cが全員{1,2}しか候補を持たなければ各自のdegreeは2でも、S={A,B,C}で|N(S)|=2<3なので完全割当不能。

</details>

## 問題7

よくある誤り「matchingとperfect matchingを区別する。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- matchingとperfect matchingを区別する。
- 局所的に候補が多いだけでHall条件全体を満たすとは限らない。

各頂点が少なくとも1候補を持つだけでは不十分。A,B,Cが全員{1,2}しか候補を持たなければ各自のdegreeは2でも、S={A,B,C}で|N(S)|=2<3なので完全割当不能。

</details>

## 問題8

「二部matchingとHallの定理」の例題1を再計算し、その結果に対して次の検算を実行せよ：matching候補について各頂点が高々1本の選択edgeにしか接続していないか確認する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

各単集合は近傍1以上。{A,B}の近傍{1,2}で2、{B,C}は{1,2,3}で3、{A,C}も{1,2,3}で3、全体も3。Hall成立。matching A-1, B-2, C-3。

検算：
matching候補について各頂点が高々1本の選択edgeにしか接続していないか確認する。Hall条件を使う場合は代表的な部分集合だけでなく、反例候補となる $S\subseteq L$ で $|N(S)|<|S|$ がないか調べる。augmenting pathを反転した後はmatching sizeがちょうど1増えることを確認する。

</details>

## 問題9

後続への接続「assignment問題、network flow、marriage theorem、resource allocationへつながる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

assignment問題、network flow、marriage theorem、resource allocationへつながる。maximum matchingアルゴリズムの正しさもaugmenting pathで理解できる。

</details>

## 問題10

中心問題「左側の全頂点を重複なく右側へ割り当てられる条件は何か。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ \exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S| $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「各頂点が少なくとも1候補を持つだけでは不十分。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $G=(L∪R,E)$ | 二部グラフ |
| $N(S)$ | S⊆Lの隣接頂点集合 |
| $M$ | matching |


- $G=(L\cup R,E)$：二部グラフ。
- $N(S)$：左部分集合Sの右側近傍集合。
- matching：端点を共有しない辺集合。

中心式：
$$
\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|
$$

導出：
1. 条件が必要なのは鳩の巣原理から直ちに分かる。
2. 十分性は最大matchingを仮定し、未matching頂点から交互道を探索する。
3. 増加路が無いとHall違反集合を構成でき、矛盾。

根拠：
必要性は鳩の巣原理。Sの全頂点を異なる右頂点へ割り当てるなら、その候補集合 $N(S)$ に少なくとも|S|個必要。

十分性の直感はaugmenting path。最大matchingが左を飽和しないと仮定し、未matching左頂点から「非matching辺→matching辺」を交互にたどる。右側の未matching頂点へ到達すればmatchingを反転して1本増やせるので最大性に矛盾。到達できなければ探索集合からHall違反を構成できる。

具体例：
**問題**：L={A,B,C}, R={1,2,3}、近傍が A:{1}, B:{1,2}, C:{2,3} のときHall条件を確認し、Lを飽和するmatchingを1つ示せ。

**解答**：各単集合は近傍1以上。{A,B}の近傍{1,2}で2、{B,C}は{1,2,3}で3、{A,C}も{1,2,3}で3、全体も3。Hall成立。matching A-1, B-2, C-3。

失敗条件：
各頂点が少なくとも1候補を持つだけでは不十分。A,B,Cが全員{1,2}しか候補を持たなければ各自のdegreeは2でも、S={A,B,C}で|N(S)|=2<3なので完全割当不能。

</details>
