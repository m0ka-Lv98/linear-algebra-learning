# RLHFとpreference optimization：教科書

Course 10｜Frontier

## このTopicの位置づけ

前Topic `frontier-rlhf-reward-model-ppo-kl` では、pairwise preferenceからreward modelを学習し、KL正則化されたpolicy objectiveをPPO等で最適化する標準RLHF pipelineを扱った。

このTopicでは、そのKL正則化policy optimizationとBradley–Terry preference modelを組み合わせると、**明示的なreward modelをpolicy更新時に使わず、chosen/rejected pairからpolicyを直接学習できる**ことを導く。これがDirect Preference Optimization（DPO）の出発点である。

前提として使う記号・概念は次の通り。

- $x$：prompt。
- $y$：promptに対するresponse。
- $y_w$：pair内でpreferred（chosen）とされたresponse。
- $y_l$：pair内でless preferred（rejected）とされたresponse。
- $\pi_\theta(y\mid x)$：学習するpolicy。parameterは$\theta$。
- $\pi_{\mathrm{ref}}(y\mid x)$：固定されたreference policy。
- $r(x,y)$：RLHFを考えるためのlatent reward。
- $\beta>0$：referenceから離れることへのKL penaltyの強さ。
- $\sigma(z)=1/(1+e^{-z})$：sigmoid関数。

## まず何を解きたいのか

RLHFのpolicy stageは、prompt $x$ を固定すると概念的には

$$
\max_{\pi}
\left[
\sum_y \pi(y\mid x)r(x,y)
-\beta\sum_y\pi(y\mid x)
\log\frac{\pi(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}
\right]
$$

を解いているとみなせる。ただし$\pi(\cdot\mid x)$は確率分布なので

$$
\sum_y\pi(y\mid x)=1
$$

を満たさなければならない。

DPOの核心は、この最適化問題から**最適policyとrewardの関係式を実際に導き**、そのrewardをpairwise preference likelihoodから消去することである。

## 図の各要素は何を表しているか

<img src="/visuals/course-10/frontier-rlhf-preference-optimization.png" alt="DPOのchosen/rejected log-ratio差の図解" style="max-height: 480px; display:block; margin:0 auto;" />

図の上段では、同じprompt $x$ に対してchosen $y_w$ と rejected $y_l$ がある。各responseについて、学習policyのlog probabilityからreference policyのlog probabilityを引いた

$$
\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}
$$

を計算する。下段ではchosen側のlog-ratioからrejected側のlog-ratioを引く。この差が正になるほど、policyはreferenceに比べてchosenを相対的に強く支持している。

DPO lossは、この差を$\beta$倍した値をsigmoidへ入れ、「chosenがpreferredである確率」を大きくするbinary log-lossとして読める。

## 1. KL正則化policy objectiveから最適policyを導く

prompt $x$ を固定する。response $y$ は離散集合上にあるとする。簡潔のため

$$
\pi_y=\pi(y\mid x),\qquad
\pi^{\mathrm{ref}}_y=\pi_{\mathrm{ref}}(y\mid x),\qquad
r_y=r(x,y)
$$

と置く。

最大化する目的関数は

$$
J(\pi)
=\sum_y\pi_y r_y
-\beta\sum_y\pi_y\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}.
$$

確率の正規化条件 $\sum_y\pi_y=1$ を入れるため、Lagrange multiplier $\eta$ を導入して

$$
\mathcal F(\pi,\eta)
=\sum_y\pi_y r_y
-\beta\sum_y\pi_y\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}
+\eta\left(\sum_y\pi_y-1\right)
$$

とする。

### 1.1 各$\pi_y$で微分する

1つのresponse $y$ に関係する項だけ取り出すと

$$
\pi_y r_y
-\beta\pi_y\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}
+\eta\pi_y.
$$

ここで

$$
\frac{d}{d\pi_y}
\left[
\pi_y\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}
\right]
=
\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}+1
$$

なので、stationarityは

$$
\frac{\partial\mathcal F}{\partial\pi_y}
=r_y
-\beta\left(
\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}+1
\right)
+\eta
=0.
$$

### 1.2 log-ratioについて解く

上式を移項すると

$$
\beta\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}
=r_y+\eta-\beta.
$$

したがって

$$
\log\frac{\pi_y}{\pi^{\mathrm{ref}}_y}
=\frac{r_y}{\beta}
+\frac{\eta}{\beta}-1.
$$

$\eta/\beta-1$ は同じprompt $x$ のすべてのresponseに共通する定数なので、$C(x)=\beta-\eta$ とまとめれば

$$
\boxed{
r(x,y)
=\beta\log\frac{\pi^*(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}
+C(x)
}
$$

を得る。ここで$\pi^*$はKL正則化objectiveの最適policyである。

これがDPOで使うpolicy–reward relationであり、**仮定として突然置く式ではなく、KL正則化最適化のstationarityから出る**。

### 1.3 最適policy自体の形

同じ式を指数化すると

$$
\pi^*(y\mid x)
\propto
\pi_{\mathrm{ref}}(y\mid x)
\exp\left(\frac{r(x,y)}{\beta}\right).
$$

正規化定数を

$$
Z(x)=\sum_y
\pi_{\mathrm{ref}}(y\mid x)
\exp\left(\frac{r(x,y)}{\beta}\right)
$$

とすれば

$$
\boxed{
\pi^*(y\mid x)
=\frac{1}{Z(x)}
\pi_{\mathrm{ref}}(y\mid x)
\exp\left(\frac{r(x,y)}{\beta}\right)
}
$$

となる。rewardが高いresponseを増やす一方、reference probabilityも残る形である。

## 2. pairwise preference modelを書く

chosen $y_w$ がrejected $y_l$ より好まれる確率をBradley–Terry型で

$$
P(y_w\succ y_l\mid x)
=\sigma\left(r(x,y_w)-r(x,y_l)\right)
$$

とmodel化する。

ここでrewardは絶対値ではなく**差**でしか現れない。この性質により、先ほどの$C(x)$が消える。

## 3. reward differenceから$C(x)$が消える

policy–reward relationをchosenとrejectedへ適用する。

$$
r(x,y_w)
=\beta\log\frac{\pi^*(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}+C(x),
$$

$$
r(x,y_l)
=\beta\log\frac{\pi^*(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}+C(x).
$$

2式を引けば$C(x)$は相殺され、

$$
\begin{aligned}
r(x,y_w)-r(x,y_l)
&=\beta\Bigg[
\log\frac{\pi^*(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}
-\log\frac{\pi^*(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}
\Bigg].
\end{aligned}
$$

学習時には未知の$\pi^*$をparameterized policy $\pi_\theta$ で表す。

## 4. DPO lossまで変形する

reference側のchosen/rejected log-probability差を

$$
\Delta_{\mathrm{ref}}
=
\log\pi_{\mathrm{ref}}(y_w\mid x)
-
\log\pi_{\mathrm{ref}}(y_l\mid x)
$$

と定義する。

するとpreferred probabilityのlogitは

$$
\beta\left[
\log\pi_\theta(y_w\mid x)
-\log\pi_\theta(y_l\mid x)
-\Delta_{\mathrm{ref}}
\right].
$$

chosenがpreferredという観測のnegative log-likelihoodを取れば

$$
\boxed{
\mathcal L_{\mathrm{DPO}}(\theta)
=-\log\sigma\left(
\beta\left[
\log\pi_\theta(y_w\mid x)
-\log\pi_\theta(y_l\mid x)
-\Delta_{\mathrm{ref}}
\right]
\right)
}
$$

を得る。

この式は「chosenのprobabilityだけを上げる」式ではない。**referenceと比較したchosen/rejectedの相対log-ratio差**を増やしている。

## 5. 小さな数値例でlossを計算する

あるpromptについて

$$
\begin{aligned}
\log\pi_\theta(y_w\mid x)&=-1.0,\\
\log\pi_\theta(y_l\mid x)&=-2.0,\\
\log\pi_{\mathrm{ref}}(y_w\mid x)&=-1.2,\\
\log\pi_{\mathrm{ref}}(y_l\mid x)&=-1.8,
\end{aligned}
$$

とし、$\beta=0.5$ とする。

まずpolicyのchosen–rejected差は

$$
-1.0-(-2.0)=1.0.
$$

referenceの差は

$$
\Delta_{\mathrm{ref}}
=-1.2-(-1.8)=0.6.
$$

したがってDPO logitは

$$
0.5(1.0-0.6)=0.2.
$$

よって

$$
P_\theta(y_w\succ y_l\mid x)=\sigma(0.2)\approx0.550,
$$

$$
\mathcal L_{\mathrm{DPO}}
=-\log(0.550)\approx0.598.
$$

policyはchosenをrejectedより好んでいるだけでなく、**referenceより0.4だけ強くchosen側へ傾いている**ため、positiveなpreference logitになる。

## 6. reference policyが必要な理由

reference項を外して

$$
\log\pi_\theta(y_w\mid x)-\log\pi_\theta(y_l\mid x)
$$

だけを見ると、「もともとbase/SFT policyがどの程度chosenを好んでいたか」を区別できない。

DPOのlog-ratioは

$$
\left[
\log\pi_\theta(y_w\mid x)-\log\pi_{\mathrm{ref}}(y_w\mid x)
\right]
-
\left[
\log\pi_\theta(y_l\mid x)-\log\pi_{\mathrm{ref}}(y_l\mid x)
\right]
$$

なので、**referenceからどれだけ相対的にbehaviorを変えたか**を測っている。

## 7. $\beta$をどう読むか

上のKL正則化objectiveでは$\beta$が大きいほどreferenceからの逸脱を強く罰する。DPO式では同じ$\beta$がpreference logitをscaleする。

ただし論文・実装によって温度や正則化係数のparameterizationが異なる場合があるため、「$\beta$を大きくすると常に同じ意味」と名称だけで判断せず、実装されているlossの式を確認する。

## 8. DPOと標準RLHFの違い

標準RLHFは概念的に

$$
\text{preference data}
\rightarrow
\text{reward model}
\rightarrow
\text{rollout}
\rightarrow
\text{RL policy update}
$$

と段階を分ける。

DPOは特定のKL正則化reward model仮定の下でrewardをpolicy log-ratioへ置換し、offline pairwise datasetから直接$\pi_\theta$を最適化する。そのためtraining loopは単純化するが、preference dataそのもののbias、coverage不足、distribution shiftが消えるわけではない。

## 9. 条件を外すと何が壊れるか

### preference modelが不適切

Bradley–Terry型のreward-difference modelが現実の選好生成を十分表せない場合、導出したclassification likelihoodは近似modelにすぎない。

### reference supportがない

$\pi_{\mathrm{ref}}(y\mid x)=0$ ならlog-ratioは定義できない。実際のlanguage modelではtoken probabilityは通常正だが、truncationやmasking、異なるsupportを持つpolicyを比較する場合は注意する。

### pair dataにsystematic biasがある

verbosity、style、annotator population、position biasなどがchosen/rejected labelへ入れば、DPOはそれをpreference signalとして学習する。DPOは「人間価値の真値」を自動的に得る手法ではない。

### offline preference coverageが狭い

training pairにないbehaviorについて直接比較信号はない。policyがdataset分布から離れた場合、offline objectiveだけでは新しいfailure modeを観測できない。

## 10. 実装時の検算

1. chosen/rejected token log-probabilityを**同じmask規則**で合計しているか。
2. prompt tokenをresponse lossへ誤って含めていないか。
3. reference modelを固定しているか。
4. chosenとrejectedでlength biasが生じていないか。
5. 次の量を別々にmonitorする。

$$
\log\pi_\theta(y_w\mid x)-\log\pi_{\mathrm{ref}}(y_w\mid x),
$$

$$
\log\pi_\theta(y_l\mid x)-\log\pi_{\mathrm{ref}}(y_l\mid x),
$$

およびその差。

lossだけが下がっていても、chosen probability自体、rejected probability自体、referenceからの乖離を分離して見る必要がある。

## 次のTopicへの接続

DPOはhuman/model preference pairをfeedback sourceにする。一方 `frontier-reasoning-rl-rlvr` では、数学答案・unit test・formal checkerなど**自動検証可能なreward**をpolicy gradientへ入れる。feedback sourceは異なるが、「何をreward/選好として定義したかがoptimizerの学ぶものを決める」という原理は共通する。

## このTopicの理解確認

- KL正則化objectiveへ正規化制約を加え、$\pi_y$で微分してpolicy–reward relationを導けるか。
- $C(x)$がchosen/rejected reward differenceで消える理由を説明できるか。
- $\Delta_{\mathrm{ref}}$を定義し、DPO lossをBradley–Terry likelihoodから再構成できるか。
- referenceを外したlossとDPOの違いを説明できるか。
- preference dataがbiasedな場合にDPOが何を学ぶか説明できるか。

## 参考

- Rafailov et al., *Direct Preference Optimization: Your Language Model is Secretly a Reward Model*, arXiv:2305.18290
- Ouyang et al., *Training language models to follow instructions with human feedback*, arXiv:2203.02155

[演習へ](/exercises/frontier-rlhf-preference-optimization)　|　[スライドへ](/slides/frontier-rlhf-preference-optimization/)
