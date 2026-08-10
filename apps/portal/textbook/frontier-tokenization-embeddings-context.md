# tokenization・embedding・context：教科書

Course 10｜Frontier｜Topic 02/20

## このTopicは、前の何を受けて始まるか

前Topic `frontier-foundation-model-paradigm` で得た概念を使い、ここでは tokenization・embedding・context へ進む。

前提として使うのは `dl-embeddings-representation-learning`、`dl-transformers` です。

## まず直感を作る

tokenizationは入力文字列を離散token列へ分割し、embeddingがtokenを連続ベクトルへ写す。contextはtoken列全体の条件情報。



## 図の解説

<img src="/visuals/course-10/frontier-tokenization-embeddings-context.png" alt="tokenization・embedding・contextの図解" style="max-height: 440px; display:block; margin:0 auto;" />

文字列→token ID→embedding→context表現の段階を描く。 文字列がtoken列へ分割され、各token IDがembedding vectorへ変換される。context modelが扱う長さは文字数ではなくtoken数で決まる。

## 記号・型・次元

- $x_t$：token ID
- $e(x_t)\in\mathbb R^d$：token embedding
- $p_t$：position representation
- $h_t=e(x_t)+p_t$：input state例


## 正式な定義・代表式

tokenizerはtext/other modalityをdiscrete IDsへ変換し、embeddingはIDsをdense vectorsへ写す。context windowはmodelが一度のforwardで条件付けできるtoken列。

代表式は

$$
\mathbf{h}_t=\mathbf{e}(x_t)+\mathbf{p}_t
$$

です。

## なぜこの式・結論になるのか

### 1. tokenization changes sequence

same stringでもvocabulary/segmentationによりTが変わり、compute、context消費、rare-word representationが変わる。

### 2. embedding lookup

one-hotにembedding matrixを掛けることとrow lookupは同値。token identityをcontinuous stateへ。

### 3. position necessity

self-attentionだけではtoken permutationへの順序感度が不足するためposition encoding/relative phase等を追加してorder情報を注入。

## 教科書が省略しやすい一段を補う


### modelが直接読むのは文字ではなくtoken sequence

raw stringはtokenizerでIDs $t_1,\ldots,t_L$ へ変換され、embedding matrixでvectorsへ写る。したがってcontext length Lは文字数/単語数とは一致せず、language/code/Unicode patternでtoken efficiencyが変わる。tokenizationはvocabulary sizeとsequence lengthのtrade-off。

embeddingにposition informationを加え、Transformerがcontext内relationを計算する。context windowに入った情報が必ず同等に利用されるわけではなく、position, distraction, attention/architecture limitsでeffective useが変わる。後続のRAG/long-contextでは「何をcontextへ入れるか」がsystem designになる。



## 途中を飛ばさず全体をつなぐ

### tokenization・embedding・contextの導出を一本につなげる

tokenizerはtext/other modalityをdiscrete IDsへ変換し、embeddingはIDsをdense vectorsへ写す。context windowはmodelが一度のforwardで条件付けできるtoken列。

#### 1. tokenization changes sequence

まず出発点を固定する。 same stringでもvocabulary/segmentationによりTが変わり、compute、context消費、rare-word representationが変わる。 次に必要になるのは「embedding lookup」である。

#### 2. embedding lookup

ここまでで得た結果を次の段階へ渡す。 one-hotにembedding matrixを掛けることとrow lookupは同値。token identityをcontinuous stateへ。 次に必要になるのは「position necessity」である。

#### 3. position necessity

最後に、前二段階の結果をまとめて結論へ進む。 self-attentionだけではtoken permutationへの順序感度が不足するためposition encoding/relative phase等を追加してorder情報を注入。

#### 代表式へ戻す

以上をまとめた中心式は

$$
\mathbf{h}_t=\mathbf{e}(x_t)+\mathbf{p}_t
$$

である。ここでは式だけを新しい事実として追加しているのではなく、上の各段階で定義した量・仮定・変形を一つの形に圧縮している。したがって式を使うときは、途中で必要だった条件が保たれている範囲までしか結論を延長できない。

### 具体例と一般式を往復する

本文の第一例は次の設定である。

同じ日本語語句が1 tokenか複数subwordかでcontext token数が変わる。character数とtoken数は同一でない。

この例は特定の数値だけを覚えるためではない。上の導出で現れた量を小さい設定で実際に計算し、代表式の左辺・右辺が同じ対象を表していることを確認するためのものである。第二例では

absolute position、RoPE等ではlong-context extrapolation特性が異なる。

と条件を変えている。二つを比較すると、数値や入力が変わっても残る構造と、仮定を変えたために変化する結論を分離できる。

### どこまで結論を信頼できるか

このTopicの境界を示す例は次である。

embedding cosineが近いtokenを「同じ意味」と断定できない。contextual layers後のrepresentationとstatic input embeddingも別。

この失敗例は、単に「例外がある」という注意ではない。上の導出を逆にたどると、どの段階で必要条件が失われ、その後の式変形または解釈を続けられなくなるかを特定できる。したがって反例は定理の外側を覚えるためではなく、定理が何を仮定していたかを確認するために使う。

## 例題1：小さな数値で最後まで計算する

同じ日本語語句が1 tokenか複数subwordかでcontext token数が変わる。character数とtoken数は同一でない。

## 例題2：条件を少し変えて、本質が数値依存でないことを確認する

absolute position、RoPE等ではlong-context extrapolation特性が異なる。

## 成立条件と、条件を外したときに何が壊れるか

- token数は文字数と一致しない。
- context lengthは実効memoryや計算量に影響する。
- tokenization・embedding・contextの定義と計算手順を区別し、数値例だけで一般性を判断しない。

embedding cosineが近いtokenを「同じ意味」と断定できない。contextual layers後のrepresentationとstatic input embeddingも別。

## よくある誤解を分解する

- tokenization・embedding・contextの定義と計算手順を同一視する
- 成立条件を確認せず公式を適用する

tokenization・embedding・contextでは、式へ数値を代入するだけでは不十分である。embedding cosineが近いtokenを「同じ意味」と断定できない。contextual layers後のrepresentationとstatic input embeddingも別。 という失敗例が示すように、式を使える条件と結論の範囲を区別する必要がある。

## 実装・数値計算では何に注意するか

tokenizer version、special tokens、normalization、max lengthをmodelと一緒にpin。

## ここから一段だけ発展する

model/data/computeを増やしたときlossがどう変わるかをempirical scaling lawで整理する。


## このTopicを理解できたか確認する問い

- 「tokenization changes sequence」を式を見ずに説明できるか
- 「position necessity」までの論理を一段ずつ再現できるか
- tokenization・embedding・contextの条件を1つ外した反例を説明できるか

## 外部教材との照合

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)
- [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [LoRA](https://arxiv.org/abs/2106.09685)
- [Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [ReAct](https://arxiv.org/abs/2210.03629)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

[演習へ](/exercises/frontier-tokenization-embeddings-context)　|　[スライドへ](/slides/frontier-tokenization-embeddings-context/)
