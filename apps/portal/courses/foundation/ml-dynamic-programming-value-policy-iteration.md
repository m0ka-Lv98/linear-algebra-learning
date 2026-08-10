# value iterationとpolicy iteration

Course 08｜機械学習

最適Bellman operatorは「1step行動を選び、その後も最適に行動する」backup。γ<1ならsup normでcontractionなので反復が一意の固定点V*へ収束する。

## 到達目標

- modelが既知のMDPで、最適policyをBellman operatorの反復からどう求めるか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/ml-dynamic-programming-value-policy-iteration)
- [演習](/exercises/ml-dynamic-programming-value-policy-iteration)
- [スライド](/slides/ml-dynamic-programming-value-policy-iteration/)
