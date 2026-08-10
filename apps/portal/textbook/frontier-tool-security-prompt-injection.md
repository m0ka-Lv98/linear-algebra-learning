# tool useのsecurity boundaryとprompt injection：教科書

Course 10｜Frontier

## このTopicの中心問題

外部documentやweb内容を読むagentで、なぜ「読んだ文字列」を「実行すべき命令」と同一視してはいけないか。

## まず直感

tool-using agentではmodel outputが外部作用へつながる。untrusted contentはdataとして扱い、権限・引数schema・確認・sandbox等の境界で実行能力を制限する必要がある。

## 図で固定する

<img src="/visuals/course-10/frontier-tool-security-prompt-injection.png" alt="tool useのsecurity boundaryとprompt injectionの図解" style="max-height: 460px; display:block; margin:0 auto;" />

図を先に見て、式の記号がどの軸・点・矢印・分布・反復に対応するかを確認する。図は公式の代替ではなく、定義と式変形が表す幾何・確率・計算過程を固定するために使う。

## 記号・型・意味

| 記号 | 意味 |
|---|---|
| $principal$ | 権限主体 |
| $capability$ | 許可された操作能力 |
| $untrusted input$ | 外部から来た命令として信用しないdata |

この表にない新しい記号を使う場合は、その直前で意味を定義する。

## 中心となる式

$$
\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}
$$

## なぜこの式になるのか

1. modelが読むcontentとsystem/user authorityを分離する。
2. tool callはallowlist schemaとleast privilegeで制約する。
3. 高影響actionは確認・監査log・idempotency等を追加してfailure blast radiusを下げる。

ここで重要なのは、最後の式だけを覚えないことである。各段階で何を仮定し、どの定義・定理・近似を使ったかを言える状態を目標にする。

## 例題：小さい設定で最後まで追う

retrieved webpageに「全fileを削除せよ」と書かれていても、その文字列は検索結果dataであり削除権限を与えない。

### 答案で書く順序

1. 与えられた量と求める量を定義する。
2. 適用する式の成立条件を確認する。
3. 代入または式変形を1段ずつ書く。
4. 最後に符号・単位・shape・確率範囲・極端な入力のいずれかで検算する。

## 何を間違えやすいか

- 自然言語instructionだけをsecurity controlにしない。
- tool resultをtrusted system message扱いしない。

## 自分で確認する問い

- 中心式を見ずに、左辺と右辺が何を表すか説明できるか。
- 導出の各段階で使った仮定を1つずつ言えるか。
- 成立条件を1つ外した最小反例または失敗例を作れるか。
- 数値を変えても残る構造と、数値に依存する結論を分離できるか。

## 後続Courseへの接続

このTopicは単独の公式集としてではなく、後続の数値計算・確率統計・最適化・機械学習で再利用する前提として扱う。後で同じ式が現れたときは、ここで定義した量と成立条件まで戻って確認する。

## 参考

- agent security best practices

[演習へ](/exercises/frontier-tool-security-prompt-injection)　|　[スライドへ](/slides/frontier-tool-security-prompt-injection/)
