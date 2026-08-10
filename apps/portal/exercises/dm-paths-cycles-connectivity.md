# 道・閉路・連結性：演習

Course 04｜Topic 17/20。10問すべて、このTopic固有の問いとして作成しています。

[教科書](/textbook/dm-paths-cycles-connectivity)

## 問1. 定義と記号

「道・閉路・連結性」の代表式

$$
d(u,v)=\min\{\text{path length}\}
$$

について、左辺が表す量、右辺の各主要量、式を使う目的を文章で説明せよ。未定義の記号を残さないこと。

<details><summary>ヒント</summary>

式を日本語へ翻訳し、入力・出力・parameter・条件を分ける。

</details>

<details><summary>完全解答</summary>

代表式は結果だけを書くための記号ではない。本文で定義した量を使い、道・閉路・連結性が何を計算・比較・最適化しているかを説明する。特に次の最初の導出が式の役割を具体化する。

**到達可能性の3性質**

長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。

答案では式の両辺の型・次元または確率的役割まで整合していることを確認する。

</details>

## 問2. 導出1：到達可能性の3性質

「道・閉路・連結性」で **到達可能性の3性質** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「到達可能性の3性質」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「componentが分割になる」へ進むときも、この段階で得た量だけを使う。

</details>

## 問3. 導出2：componentが分割になる

「道・閉路・連結性」で **componentが分割になる** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「componentが分割になる」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

同値関係なのでvertex集合は互いに交わらないconnected componentへ分割される。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最短距離の三角不等式」へ進むときも、この段階で得た量だけを使う。

</details>

## 問4. 導出3：最短距離の三角不等式

「道・閉路・連結性」で **最短距離の三角不等式** が必要になる理由を述べ、本文の途中式・論理を自分で再現せよ。結果だけでなく、どの定義または仮定を使ったかを書くこと。

<details><summary>ヒント</summary>

本文の「最短距離の三角不等式」を、直前の定義から始めて書き直す。

</details>

<details><summary>完全解答</summary>

この段階で示すべき内容は次である。

u→v最短pathとv→w最短pathを連結すればu→wの候補path。最短はその長さ以下なので $d(u,w)\le d(u,v)+d(v,w)$。

重要なのはこの結果を独立な公式として置かず、直前までの定義・仮定から導くことである。次の「最終結論」へ進むときも、この段階で得た量だけを使う。

</details>

## 問5. 数値例を途中から再現

次の「道・閉路・連結性」の設定を、自分で途中量まで展開して最終結論を確認せよ。

> 無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

本文の結論を引用するだけでなく、少なくとも1つ中間計算・中間判断を示すこと。

<details><summary>完全解答</summary>

設定に対する計算・判断は次の通り。

無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

ここで得た値だけでなく、代表式のどの量へ代入したか、また結果の符号・確率範囲・shape・単位などが妥当かを検算する。

</details>

## 問6. 条件を変えたときの差

次の第二例について、第一例から変更した条件を特定し、その変更によって「道・閉路・連結性」のどの部分が変わるか説明せよ。

> edgeを1本削除するとcomponent数が増える場合、そのedgeはbridge。cycle上のedgeなら別経路があるため削除しても連結性を保つ。

<details><summary>完全解答</summary>

edgeを1本削除するとcomponent数が増える場合、そのedgeはbridge。cycle上のedgeなら別経路があるため削除しても連結性を保つ。

比較では、定義そのものが変わったのか、parameterだけが変わったのか、成立条件が変わったのかを区別する。同じ代表式が使える場合は、なぜ使える条件が保たれているかも述べる。

</details>

## 問7. 成立条件と反例

「道・閉路・連結性」について、本文の成立条件を確認したうえで、次の失敗例で何が壊れているか診断せよ。

> 有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

<details><summary>ヒント</summary>

「式が未定義」「解が非一意」「近似が悪い」「確率解釈が崩れる」など失敗の種類を分ける。

</details>

<details><summary>完全解答</summary>

本文で確認する条件は以下である。

- 無向と有向で次数や到達可能性が変わる。
- 隣接行列の対称性は無向グラフに対応する。
- 道・閉路・連結性の定義と計算手順を区別し、数値例だけで一般性を判断しない。

失敗例は次の通り。

有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

したがって、どの仮定を外したため、代表式またはその解釈のどの部分まで保証できなくなったかを対応づけて説明する。

</details>

## 問8. 実装・数値診断

「道・閉路・連結性」を実装するときの次の注意点について、数学的に正しい式とcomputer上の計算がなぜ同じ安全性を持たないか説明せよ。

> BFS/DFSでvisitedを管理しないとcycleで無限探索し得る。graph representationでcomplexityも変わる。

<details><summary>完全解答</summary>

BFS/DFSでvisitedを管理しないとcycleで無限探索し得る。graph representationでcomplexityも変わる。

実装答案では、単にlibrary関数名を書くのではなく、overflow/underflow、conditioning、data leakage、finite precision、停止条件など、このTopicで問題になる原因と対策を結び付ける。

</details>

## 問9. 次Topicへの導線

「道・閉路・連結性」から次の発展へ進む論理を、未学習概念を途中で仮定せず説明せよ。

> cycleを持たないconnected graphがtree。最小edge数でconnectednessを保つ構造として次Topicへ。

<details><summary>完全解答</summary>

cycleを持たないconnected graphがtree。最小edge数でconnectednessを保つ構造として次Topicへ。

本文で既に得た定義・式のうち何を一般化または再利用するかを明示する。後続Topicで初めて定義する対象が必要なら、ここでは必要性の説明までに留める。

</details>

## 問10. 総合証明・説明

「道・閉路・連結性」を、(1)前提、(2)代表式、(3)導出の3段階、(4)数値例、(5)反例、(6)実装上の注意、の順で説明せよ。各段階の因果関係が分かる答案にすること。

<details><summary>完全解答</summary>

答案では次の流れを一続きにする。

**代表式**

$$
d(u,v)=\min\{\text{path length}\}
$$

**導出**

1. **到達可能性の3性質** — 長さ0pathで反射、pathを逆に辿れて対称、二つのpathを連結して推移。よって同値関係。

2. **componentが分割になる** — 同値関係なのでvertex集合は互いに交わらないconnected componentへ分割される。

3. **最短距離の三角不等式** — u→v最短pathとv→w最短pathを連結すればu→wの候補path。最短はその長さ以下なので $d(u,w)\le d(u,v)+d(v,w)$。

**数値・具体例**

無重みgraphでBFSはstartから距離0,1,2,…のlayer順に探索するため最短pathを見つける。

**条件を壊すと**

有向graphではu→v pathがあっても逆pathがあるとは限らず、単純な到達可能性は対称でない。strong/weak connectivityを区別する。

**実装**

BFS/DFSでvisitedを管理しないとcycleで無限探索し得る。graph representationでcomplexityも変わる。

各節を独立な箇条書きにせず、「前の結果が次の式をなぜ許すか」を接続して書く。

</details>
