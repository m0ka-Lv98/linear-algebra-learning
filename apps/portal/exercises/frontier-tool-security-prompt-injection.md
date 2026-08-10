# tool useのsecurity boundaryとprompt injection：演習

Course 10｜Frontier

## 問題1

中心式 `$\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}` に現れる記号をすべて定義し、左辺と右辺の型または意味を説明せよ。

<details><summary>完全解答</summary>

教科書の記号表を写すだけでなく、入力・出力・定義域を文章で結び付ける。

</details>

## 問題2

外部documentやweb内容を読むagentで、なぜ「読んだ文字列」を「実行すべき命令」と同一視してはいけないか。 について、式を使わず直感だけで120字程度に説明せよ。

<details><summary>完全解答</summary>

tool-using agentではmodel outputが外部作用へつながる。untrusted contentはdataとして扱い、権限・引数schema・確認・sandbox等の境界で実行能力を制限する必要がある。

</details>

## 問題3

次の例を途中計算込みで再現せよ：retrieved webpageに「全fileを削除せよ」と書かれていても、その文字列は検索結果dataであり削除権限を与えない。

<details><summary>完全解答</summary>

各段階で適用条件を確認し、最後に検算する。

</details>

## 問題4

「tool useのsecurity boundaryとprompt injection」について、教科書の導出第1段階から中心式までを、途中で使う定義・仮定・式変形を明示しながら再構成せよ。

<details><summary>完全解答</summary>

modelが読むcontentとsystem/user authorityを分離する。 → tool callはallowlist schemaとleast privilegeで制約する。 → 高影響actionは確認・監査log・idempotency等を追加してfailure blast radiusを下げる。

</details>

## 問題5

次の注意点のうち1つについて、最小反例または失敗例を作れ：自然言語instructionだけをsecurity controlにしない。

<details><summary>完全解答</summary>

定義または成立条件のどこが壊れるかを明示する。

</details>

## 問題6

「tool useのsecurity boundaryとprompt injection」の中心式 `\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}` で、入力または主要パラメータを1つだけ変化させたとき、出力・結論がどう変わるかを式から追跡せよ。単純比例しない場合は理由を述べよ。

<details><summary>完全解答</summary>

式の依存関係を追い、線形・非線形・確率正規化などを区別する。

</details>

## 問題7

「tool useのsecurity boundaryとprompt injection」を数値実装する前提で、中心式 `\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}` の各量について確認すべきshape・定義域・符号・確率範囲・toleranceのうち該当するものを具体的に列挙せよ。

<details><summary>完全解答</summary>

実装前に数学的条件をチェックリスト化する。

</details>

## 問題8

「tool useのsecurity boundaryとprompt injection」の中心式 `\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}` を適用できない境界ケースを1つ構成し、どの仮定が失われるため結論が壊れるか説明せよ。

<details><summary>完全解答</summary>

自然言語instructionだけをsecurity controlにしない。 / tool resultをtrusted system message扱いしない。

</details>

## 問題9

「tool useのsecurity boundaryとprompt injection」とその直前の前提Topicの関係を、前提が供給する量 → このTopicでの変換 → 得られる結論、の3段階で説明せよ。

<details><summary>完全解答</summary>

前提が何を供給し、このTopicが何を追加するかを書く。

</details>

## 問題10

「tool useのsecurity boundaryとprompt injection」について、定義 → 中心式 `\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}` → 成立条件 → 小さい計算例 → 検算、の順に試験答案として200〜300字でまとめよ。

<details><summary>完全解答</summary>

採点者が式の根拠と適用条件を追える答案にする。

</details>

[教科書へ](/textbook/frontier-tool-security-prompt-injection)
