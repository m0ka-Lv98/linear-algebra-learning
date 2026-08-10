# 推論RLとverifiable reward：教科書

Course 10｜Frontier

## このTopicで解く問題

数学・codingのように答えを自動検証できる課題では、preference modelを介さずどのようにRL信号を作れるか。

## なぜこの概念が必要か

verifiable taskでは最終答案の正誤、unit test、formal checkerなどをrewardとして使える。人間preferenceより低コストで大量sampleを評価できる一方、reward仕様の範囲外の品質は保証しない。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-reasoning-rl-rlvr.png" alt="推論RLとverifiable rewardの図解" style="max-height: 480px; display:block; margin:0 auto;" />

複数のrolloutを横に並べ、verifierが各responseへ0/1または連続rewardを返す。正解rolloutと不正解rolloutのreward差がpolicy update信号になる。人間rankではなくunit test・symbolic checker等が直接評価する点を示す。

## 記号・型・定義域

| 記号 | 意味 |
|---|---|
| $r(x,y)$ | 検証器からのreward |
| $G$ | group/rollout集合 |
| $A_i$ | 各sampleのadvantage相当量 |


- $x$：問題prompt、$y$：sampled rollout/response。
- $r(x,y)$：verifierが返すreward。
- $\pi_\theta$：更新するpolicy。

## 中心となる式

$$
\max_\theta\;E_{y\sim\pi_\theta(\cdot|x)}[r(x,y)]\quad\text{with policy regularization}
$$

## 中心式を前提から導く

1. promptから複数rolloutをsampleする。
2. verifierで各responseへrewardを付ける。
3. relative/normalized rewardをpolicy gradient estimatorへ入れ、policy collapseを防ぐregularizationと併用する。

## なぜその変形をしてよいのか

verifiable taskではreward function $r(x,y)$ を自動計算できる。policyから複数responseをsampleし、group内でrewardをcenter/normalizeしてadvantage相当の信号を作り、log-policy gradientで確率を更新する手法が使える。

重要なのは「verifierが測れること」と「望ましい推論のすべて」が同じではないこと。final answerだけをrewardすると、途中 reasoningのfaithfulnessやstyle、安全性はobjectiveに含まれない。policy regularizationやdiversity確保が必要。

## verifiable rewardをpolicy gradientへ入れる

問題 $x$ に対してpolicyから複数のresponse $y^{(1)},\ldots,y^{(K)}$ をsampleし、checkerが $r_k\in\{0,1\}$ を返すとする。単純なgroup-relative signalなら

$$
A_k=r_k-\bar r,\qquad
\bar r=\frac1K\sum_{j=1}^K r_j
$$

とcenterできる。$K=8$ 中3本正解なら $\bar r=0.375$、正解rolloutは $A=0.625$、不正解は $A=-0.375$。これをlog-policy gradientのweightに使えば、group内で相対的に成功したtrajectoryの確率を上げられる。

ただし0/1 verifierが見ているのは仕様化された最終条件だけである。数学答案なら最終数値が一致しても推論がfaithfulとは限らず、codingなら弱いunit testをhard-codeで通す可能性がある。reward coverageを検査せず「verifiableだから正しい」と結論してはいけない。

policy collapseを避けるためentropy/diversity、referenceからのKL、sampling temperatureなども診断対象になる。

## 例題1：具体的な数値・構造で解く

**問題**：4 rolloutのrewardが [1,1,0,0]。group meanをbaselineとしてcentered rewardを求めよ。

**解答**：平均は0.5。centered rewardは [0.5,0.5,-0.5,-0.5]。正解rolloutのlog-probabilityを相対的に上げ、不正解を下げる信号になる。

## 例題2：別の条件で確認する

8 rollout中3本がchecker正解でreward1、5本が0。group平均0.375なら、正解rolloutのcentered rewardは+0.625、不正解は-0.375。これをlog-prob gradientへ掛けると相対的に正解trajectoryを上げる。

## 結果の検算

verifierが返すrewardを具体的なrolloutへ適用し、正解/不正解群でadvantageの符号が期待通りか確認する。最終答案だけを検証する場合、途中推論の品質はrewardに直接含まれていないことも診断項目として残す。

## 条件を外すと何が壊れるか

verifier loopholeがあるとreward hackingが起きる。unit testが不十分ならtestだけ通す不正実装を高rewardにしてしまう。reward specificationそのものを検証する必要がある。

## よくある誤り

- verifierが測らないreadabilityやsafetyは自動的に改善しない。
- reward hackingとdata leakageを監視する。

## 次のTopic・応用への接続

RLHFのpreference rewardと同じpolicy optimization基盤を使いつつ、feedback sourceが自動verifierへ変わる。reasoning model evaluationではpass@kとsample diversityも重要。

## 参考

- DeepSeek-R1 arXiv:2501.12948

[演習へ](/exercises/frontier-reasoning-rl-rlvr)　|　[スライドへ](/slides/frontier-reasoning-rl-rlvr/)
