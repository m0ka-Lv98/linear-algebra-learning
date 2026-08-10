# 二部matchingとHallの定理：教科書

Course 04｜離散数学

## このTopicで解く問題

左側の全頂点を重複なく右側へ割り当てられる条件は何か。

## なぜこの概念が必要か

matchingは端点を共有しない辺集合。Hallの条件は、左側のどんな部分集合を取っても候補となる右頂点が人数以上あることを要求する。

## 図の各要素は何を表しているか

<img src="/visuals/course-04/dm-bipartite-matching-hall.png" alt="二部matchingとHallの定理の図解" style="max-height: 480px; display:block; margin:0 auto;" />

左集合Lと右集合Rを左右に分け、候補関係を細線、選ばれたmatchingを太線で示す。matchingでは同じ頂点へ太線が2本入らない。Hall条件は左の任意部分集合Sから到達できる右側近傍 $N(S)$ の個数がS以上であることを要求する。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $G=(L∪R,E)$ | 二部グラフ |
| $N(S)$ | S⊆Lの隣接頂点集合 |
| $M$ | matching |


- $G=(L\cup R,E)$：二部グラフ。
- $N(S)$：左部分集合Sの右側近傍集合。
- matching：端点を共有しない辺集合。

## 中心となる式

$$
\exists\text{ matching saturating }L\iff \forall S\subseteq L:\ |N(S)|\ge|S|
$$

## 中心式を前提から導く

1. 条件が必要なのは鳩の巣原理から直ちに分かる。
2. 十分性は最大matchingを仮定し、未matching頂点から交互道を探索する。
3. 増加路が無いとHall違反集合を構成でき、矛盾。

## なぜその変形をしてよいのか

必要性は鳩の巣原理。Sの全頂点を異なる右頂点へ割り当てるなら、その候補集合 $N(S)$ に少なくとも|S|個必要。

十分性の直感はaugmenting path。最大matchingが左を飽和しないと仮定し、未matching左頂点から「非matching辺→matching辺」を交互にたどる。右側の未matching頂点へ到達すればmatchingを反転して1本増やせるので最大性に矛盾。到達できなければ探索集合からHall違反を構成できる。

## matchingとHall条件

二部graph $G=(L\cup R,E)$ でmatchingは端点を共有しないedge集合。$L$ の全頂点をmatchingしたいなら、任意の部分集合 $S\subseteq L$ が使える右側の隣接集合 $N(S)$ は少なくとも $|S|$ 個必要である。もし $|N(S)|<|S|$ なら、$S$ の全員を異なる相手へ割り当てることは鳩の巣原理で不可能。

Hallの定理は驚くべきことに、この必要条件

$$
|N(S)|\ge |S|\qquad(\forall S\subseteq L)
$$

がperfect matching（左側を全て覆うmatching）の十分条件でもあると述べる。

## augmenting pathの役割

現在matching $M$ で未matching頂点から始まり、非matching edge・matching edgeを交互に通って別の未matching頂点へ終わるpathをaugmenting pathという。このpath上でmatching/nonmatchingを反転するとmatching sizeが1増える。Bergeの補題により、augmenting pathが存在しないmatchingはmaximumである。図では太線matchingを1本ずつ「入れ替えて増やす」操作として読む。

## 例題1：具体的な数値・構造で解く

**問題**：L={A,B,C}, R={1,2,3}、近傍が A:{1}, B:{1,2}, C:{2,3} のときHall条件を確認し、Lを飽和するmatchingを1つ示せ。

**解答**：各単集合は近傍1以上。{A,B}の近傍{1,2}で2、{B,C}は{1,2,3}で3、{A,C}も{1,2,3}で3、全体も3。Hall成立。matching A-1, B-2, C-3。

## 例題2：別の条件で確認する

L={A,B,C}, R={1,2,3}、候補 A:{1,2}, B:{2,3}, C:{1,3}。単集合・2要素集合・全体のすべてで近傍数が集合サイズ以上なのでHall条件を満たし、例えばA-1,B-2,C-3がperfect matching。

## 結果の検算

matching候補について各頂点が高々1本の選択edgeにしか接続していないか確認する。Hall条件を使う場合は代表的な部分集合だけでなく、反例候補となる $S\subseteq L$ で $|N(S)|<|S|$ がないか調べる。augmenting pathを反転した後はmatching sizeがちょうど1増えることを確認する。

## 条件を外すと何が壊れるか

各頂点が少なくとも1候補を持つだけでは不十分。A,B,Cが全員{1,2}しか候補を持たなければ各自のdegreeは2でも、S={A,B,C}で|N(S)|=2<3なので完全割当不能。

## よくある誤り

- matchingとperfect matchingを区別する。
- 局所的に候補が多いだけでHall条件全体を満たすとは限らない。

## 次のTopic・応用への接続

assignment問題、network flow、marriage theorem、resource allocationへつながる。maximum matchingアルゴリズムの正しさもaugmenting pathで理解できる。

## 参考

- MIT Mathematics for Computer Science: Matching

[演習へ](/exercises/dm-bipartite-matching-hall)　|　[スライドへ](/slides/dm-bipartite-matching-hall/)
