# RAG：chunking・reranking・評価：教科書

Course 10｜Frontier

## このTopicの中心問題

RAGの失敗をretrieval・reranking・generationへ分解して、どこが悪いか測るにはどうするか。

## まず直感

最終回答だけを見ると原因が分からない。まず必要根拠をtop-kへ取れたか、rerankerが上位へ持ち上げたか、generatorが根拠を正しく使ったかを分離評価する。

## 図で固定する

<img src="/visuals/course-10/frontier-rag-reranking-evaluation.png" alt="RAG：chunking・reranking・評価の図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $Recall@k$ | 必要文書がtop-kへ入る割合 |
| $MRR$ | 最初の関連文書順位の逆数平均 |
| $faithfulness$ | 回答が根拠に支持される度合い |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\mathrm{Recall@}k=\frac{|\text{relevant}\cap\text{top-}k|}{|\text{relevant}|}
$$

## なぜこの式になるのか

1. query→candidate retrievalを第一段階として測る。
2. reranking後のranking metricを別に測る。
3. retrieved contextを固定してgeneration quality/faithfulnessを評価し、end-to-end errorを分解する。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

answerが誤っていてもgold passageがtop-kに無ければretriever問題、入っているのに無視したならgenerator側の問題。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- end-to-end accuracyだけでretrieval qualityを推定しない。
- chunk sizeを変えるとindex数・recall・context効率が同時に変わる。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- RAG arXiv:2005.11401

[演習へ](/exercises/frontier-rag-reranking-evaluation)　|　[スライドへ](/slides/frontier-rag-reranking-evaluation/)
