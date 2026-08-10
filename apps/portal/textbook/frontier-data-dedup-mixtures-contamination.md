# pretraining data：dedup・mixture・contamination：教科書

Course 10｜Frontier

## このTopicで解く問題

同じtoken数でも、重複・domain mixture・benchmark contaminationで学習結果がなぜ変わるか。

## なぜこの概念が必要か

training dataは単なる量ではなく分布。重複は特定sampleを過度に重み付けし、mixture weightは能力配分を変え、evaluation setの混入は測定を汚染する。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-data-dedup-mixtures-contamination.png" alt="pretraining data：dedup・mixture・contaminationの図解" style="max-height: 480px; display:block; margin:0 auto;" />

棒グラフの各棒がweb/code/math/books/scienceなどdomainのsampling weight $w_k$。総和1のmixtureからbatchがsampleされるので、棒の高さがtraining gradientへ各domainが現れる頻度を決める。dedupやfilterをすると同じ棒の中身のdistribution自体も変わる。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $D_k$ | domain kのdata distribution |
| $w_k$ | mixture weight |
| $D_train$ | 混合training distribution |


- $D_k$：domain kのdata distribution。
- $w_k$：sampling weight、$w_k\ge0$, $\sum_kw_k=1$。
- contamination：evaluation dataまたは近似内容がtrainingへ混入すること。

## 中心となる式

$$
D_{train}=\sum_k w_kD_k,\quad w_k\ge0,\;\sum_kw_k=1
$$

## 中心式を前提から導く

1. 各sourceをdomain distributionとしてみなす。
2. sampling weight w_kが期待gradientへの寄与を決める。
3. dedup/filteringはeffective distributionそのものを変えるため、token countだけで比較できない。

## なぜその変形をしてよいのか

training corpusを単なるtoken集合でなくmixture distribution $D=\sum_kw_kD_k$ と見ると、weight変更はobjective $E_D[loss]$ の期待値を直接変える。domain size比例だけが唯一の選択ではなく、qualityやtarget能力に応じてreweightできる。

dedupは近重複documentを除いてeffective sample diversityを増やし、memorizationを抑える可能性がある。benchmark contaminationはevaluation itemや近似解答がtrainingに入ることで、generalizationではなくmemorizationを測る危険。

## deduplicationは「同じ文を消す」だけではない

exact duplicateはhash一致で除けるが、web corpusではheaderだけ違うmirror、引用・転載、template pageなどnear-duplicateが多い。文書をshingle集合へ変換しJaccard similarityを近似するMinHash/LSHなどを使うと、大規模にnear-duplicate候補を発見できる。

重複を残すと頻出documentが実質的に過大weightされ、memorizationやbenchmark leakageのリスクが上がる。一方、短い定型表現を過剰に消すと自然な言語分布自体を歪めるのでthreshold設計が必要。

## data mixtureを期待lossで見る

複数domain $d$ のsampling weightを $w_d$ とするとtraining objectiveは概念的に

$$
L(\theta)=\sum_d w_d E_{x\sim P_d}[\ell_\theta(x)].
$$

$w_d$ を変えることは単なるdataset bookkeepingではなく、どのdistributionでgradientを多く見るかを直接変える。

benchmark contaminationはtest itemそのものだけでなく、解答・paraphrase・近接問題の混入も含めて調べる。evaluation setのhash exact matchだけでは不十分で、near-match・timestamp・source provenanceを組み合わせる。

## 例題1：具体的な数値・構造で解く

**問題**：総training budget 200B tokenで mixture weightが web=0.5, code=0.2, math=0.1, books=0.2 のとき各domainの期待token数を求めよ。

**解答**：web 100B, code 40B, math 20B, books 40B。weightの総和が1であることも検算する。

## 例題2：別の条件で確認する

100B token budgetでcode weightを10%→20%にすれば期待code tokenは10B→20B。その分ほかdomainのtoken機会が10B減るので、改善と退化のtrade-offを評価する必要がある。

## 結果の検算

mixture weightは $\sum_d w_d=1$ を満たすか確認し、token budgetを掛けた各domainの期待token数の総和が全budgetへ戻るか検算する。dedup前後ではdocument数だけでなくunique token比率やbenchmark near-match数も比較する。

## 条件を外すと何が壊れるか

「重複を全部消せば常に良い」とは限らない。頻出patternの正当な繰り返しや多言語parallel dataまで誤って落とすとcoverageを失う。dedup thresholdとunit(document/span)を明示する。

## よくある誤り

- benchmark score上昇をcontamination無しで確認する。
- dedup閾値・normalization手順を記録する。

## 次のTopic・応用への接続

data scaling law、curriculum/data scheduling、synthetic data、evaluation contamination detectionへつながる。model architectureだけでなくdata pipelineが能力を決める。

## 参考

- Stanford CS336 data processing topics

[演習へ](/exercises/frontier-data-dedup-mixtures-contamination)　|　[スライドへ](/slides/frontier-data-dedup-mixtures-contamination/)
