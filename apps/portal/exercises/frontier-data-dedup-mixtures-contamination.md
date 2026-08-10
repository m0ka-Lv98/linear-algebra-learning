# pretraining data：dedup・mixture・contamination：演習

Course 10｜Frontier

[教科書](/textbook/frontier-data-dedup-mixtures-contamination)

## 問題1

総training budget 200B tokenで mixture weightが web=0.5, code=0.2, math=0.1, books=0.2 のとき各domainの期待token数を求めよ。

<details><summary>完全解答</summary>

web 100B, code 40B, math 20B, books 40B。weightの総和が1であることも検算する。

</details>

## 問題2

「pretraining data：dedup・mixture・contamination」の導出を、最初の段階「1. 各sourceをdomain distributionとしてみなす。」から始めて中心式まで再構成せよ。途中で「training corpusを単なるtoken集合でなくmixture distribution $D=\sum_kw_kD_k$ と見ると、weight変更はobjective $E_D[loss]$ の期待値を直接変える。」がなぜ正当化できるかも説明すること。

<details><summary>完全解答</summary>

1. 各sourceをdomain distributionとしてみなす。
2. sampling weight w_kが期待gradientへの寄与を決める。
3. dedup/filteringはeffective distributionそのものを変えるため、token countだけで比較できない。

training corpusを単なるtoken集合でなくmixture distribution $D=\sum_kw_kD_k$ と見ると、weight変更はobjective $E_D[loss]$ の期待値を直接変える。domain size比例だけが唯一の選択ではなく、qualityやtarget能力に応じてreweightできる。

dedupは近重複documentを除いてeffective sample diversityを増やし、memorizationを抑える可能性がある。benchmark contaminationはevaluation itemや近似解答がtrainingに入ることで、generalizationではなくmemorizationを測る危険。

</details>

## 問題3

図 `/visuals/course-10/frontier-data-dedup-mixtures-contamination.png` では「棒グラフの各棒がweb/code/math/books/scienceなどdomainのsampling weight $w_k$。」と説明されている。図に実際に描かれた対象を少なくとも3つ挙げ、それぞれが数式中のどの量・演算・条件を表すか対応づけよ。

<details><summary>完全解答</summary>

<img src="/visuals/course-10/frontier-data-dedup-mixtures-contamination.png" alt="pretraining data：dedup・mixture・contaminationの図解" style="max-height: 480px; display:block; margin:0 auto;" />

棒グラフの各棒がweb/code/math/books/scienceなどdomainのsampling weight $w_k$。総和1のmixtureからbatchがsampleされるので、棒の高さがtraining gradientへ各domainが現れる頻度を決める。dedupやfilterをすると同じ棒の中身のdistribution自体も変わる。

</details>

## 問題4

「pretraining data：dedup・mixture・contamination」の第二例「100B token budgetでcode weightを10%→20%にすれば期待code tokenは10B→20B。」を途中式つきで再現し、例題1と比べて変更された条件が結論へどう効いたか説明せよ。

<details><summary>完全解答</summary>

100B token budgetでcode weightを10%→20%にすれば期待code tokenは10B→20B。その分ほかdomainのtoken機会が10B減るので、改善と退化のtrade-offを評価する必要がある。

</details>

## 問題5

pretraining data：dedup・mixture・contaminationで domain kのdata distribution、mixture weight、混合training distribution は互いに何が違う量か。各量の数学的な種類（scalar/vector/matrix/set/function/distribution等）と、必要な値域・shape・制約を記号表に沿って整理せよ。 最後に、`frontier-data-dedup-mixtures-contamination` の中心式の中でこれらの量がどこに現れるかを1箇所示せ。

<details><summary>完全解答</summary>

| 記号 | 意味 |
|---|---|
| $D_k$ | domain kのdata distribution |
| $w_k$ | mixture weight |
| $D_train$ | 混合training distribution |


- $D_k$：domain kのdata distribution。
- $w_k$：sampling weight、$w_k\ge0$, $\sum_kw_k=1$。
- contamination：evaluation dataまたは近似内容がtrainingへ混入すること。

</details>

## 問題6

警告「「重複を全部消せば常に良い」とは限らない。」が必要な理由を、中心式のどの段階が壊れるかまで示して説明せよ。可能なら最小の数値例・反例を1つ添えよ。

<details><summary>完全解答</summary>

「重複を全部消せば常に良い」とは限らない。頻出patternの正当な繰り返しや多言語parallel dataまで誤って落とすとcoverageを失う。dedup thresholdとunit(document/span)を明示する。

</details>

## 問題7

よくある誤り「benchmark score上昇をcontamination無しで確認する。」を犯した答案を想定し、どの一行が誤りかを特定して正しい計算・論証へ修正せよ。

<details><summary>完全解答</summary>

- benchmark score上昇をcontamination無しで確認する。
- dedup閾値・normalization手順を記録する。

「重複を全部消せば常に良い」とは限らない。頻出patternの正当な繰り返しや多言語parallel dataまで誤って落とすとcoverageを失う。dedup thresholdとunit(document/span)を明示する。

</details>

## 問題8

「pretraining data：dedup・mixture・contamination」の例題1を再計算し、その結果に対して次の検算を実行せよ：mixture weightは $\sum_d w_d=1$ を満たすか確認し、token budgetを掛けた各domainの期待token数の総和が全budgetへ戻るか検算する。 単に「一致した」と書かず、検算用の式・数値・条件を明示すること。

<details><summary>完全解答</summary>

web 100B, code 40B, math 20B, books 40B。weightの総和が1であることも検算する。

検算：
mixture weightは $\sum_d w_d=1$ を満たすか確認し、token budgetを掛けた各domainの期待token数の総和が全budgetへ戻るか検算する。dedup前後ではdocument数だけでなくunique token比率やbenchmark near-match数も比較する。

</details>

## 問題9

後続への接続「data scaling law、curriculum/data scheduling、synthetic data、evaluation contamination detectionへつながる。」を具体化せよ。このTopicで得る量を1つ選び、それが次のTopicでどの入力になり、どの演算を受け、何を出力するかを式またはalgorithm名とともに説明せよ。

<details><summary>完全解答</summary>

data scaling law、curriculum/data scheduling、synthetic data、evaluation contamination detectionへつながる。model architectureだけでなくdata pipelineが能力を決める。

</details>

## 問題10

中心問題「同じtoken数でも、重複・domain mixture・benchmark contaminationで学習結果がなぜ変わるか。」に対し、試験答案として一続きに答えよ。必ず (1) 主要記号の定義、(2) 中心式 `$$ D_{train}=\sum_k w_kD_k,\quad w_k\ge0,\;\sum_kw_k=1 $$`, (3) 導出の根拠、(4) 例題1の具体値、(5) 「「重複を全部消せば常に良い」とは限らない。」という失敗条件、の5点を含めること。

<details><summary>完全解答</summary>

主要記号：
| 記号 | 意味 |
|---|---|
| $D_k$ | domain kのdata distribution |
| $w_k$ | mixture weight |
| $D_train$ | 混合training distribution |


- $D_k$：domain kのdata distribution。
- $w_k$：sampling weight、$w_k\ge0$, $\sum_kw_k=1$。
- contamination：evaluation dataまたは近似内容がtrainingへ混入すること。

中心式：
$$
D_{train}=\sum_k w_kD_k,\quad w_k\ge0,\;\sum_kw_k=1
$$

導出：
1. 各sourceをdomain distributionとしてみなす。
2. sampling weight w_kが期待gradientへの寄与を決める。
3. dedup/filteringはeffective distributionそのものを変えるため、token countだけで比較できない。

根拠：
training corpusを単なるtoken集合でなくmixture distribution $D=\sum_kw_kD_k$ と見ると、weight変更はobjective $E_D[loss]$ の期待値を直接変える。domain size比例だけが唯一の選択ではなく、qualityやtarget能力に応じてreweightできる。

dedupは近重複documentを除いてeffective sample diversityを増やし、memorizationを抑える可能性がある。benchmark contaminationはevaluation itemや近似解答がtrainingに入ることで、generalizationではなくmemorizationを測る危険。

具体例：
**問題**：総training budget 200B tokenで mixture weightが web=0.5, code=0.2, math=0.1, books=0.2 のとき各domainの期待token数を求めよ。

**解答**：web 100B, code 40B, math 20B, books 40B。weightの総和が1であることも検算する。

失敗条件：
「重複を全部消せば常に良い」とは限らない。頻出patternの正当な繰り返しや多言語parallel dataまで誤って落とすとcoverageを失う。dedup thresholdとunit(document/span)を明示する。

</details>
