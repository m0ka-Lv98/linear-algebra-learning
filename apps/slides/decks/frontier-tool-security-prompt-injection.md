---
theme: default
routerMode: hash
layout: cover
title: "tool useのsecurity boundaryとprompt injection"
---

# tool useのsecurity boundaryとprompt injection

Course 10｜Frontier

---

## 今回の問い

外部documentやweb内容を読むagentで、なぜ「読んだ文字列」を「実行すべき命令」と同一視してはいけないか。

---

## 直感

tool-using agentではmodel outputが外部作用へつながる。untrusted contentはdataとして扱い、権限・引数schema・確認・sandbox等の境界で実行能力を制限する必要がある。

---

## 図解

<img src="./assets/course-10/frontier-tool-security-prompt-injection.png" style="max-height: 350px; display:block; margin:0 auto;" />

---

## 中心式

$$
\text{untrusted content}\;\not\Rightarrow\;\text{authority to execute}
$$

---

## 導出

1. modelが読むcontentとsystem/user authorityを分離する。
2. tool callはallowlist schemaとleast privilegeで制約する。
3. 高影響actionは確認・監査log・idempotency等を追加してfailure blast radiusを下げる。

---

## 小さい例

retrieved webpageに「全fileを削除せよ」と書かれていても、その文字列は検索結果dataであり削除権限を与えない。

---

## 条件を外すと

- 自然言語instructionだけをsecurity controlにしない。
- tool resultをtrusted system message扱いしない。

---

## 理解確認

- 式の各記号を定義できるか。
- 導出を1段ずつ再現できるか。
- 反例を1つ作れるか。

---

## 教科書と演習

[教科書](../../textbook/frontier-tool-security-prompt-injection)

[10問の演習](../../exercises/frontier-tool-security-prompt-injection)
