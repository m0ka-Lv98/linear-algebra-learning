# DPO：preference optimization：演習

Course 10｜Frontier

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：KL正則化objectiveを書く

prompt$x$を固定し、reward$r_y$、reference probability$\pi_y^{ref}$を使って、DPO導出の出発点となるKL正則化policy objectiveと確率正規化制約を書け。

<details><summary>完全解答</summary>

$\max_{\pi}\sum_y\pi_y r_y-\beta\sum_y\pi_y\log(\pi_y/\pi_y^{ref})$ subject to $\sum_y\pi_y=1$。$\beta>0$。第1項はexpected reward、第2項はreferenceから離れるKL cost。

</details>

## 問題2：Lagrangian stationarity

前問にmultiplier$\eta$を入れ、$\pi_y$で微分して $r_y-\beta(\log(\pi_y/\pi_y^{ref})+1)+\eta=0$ を導け。

<details><summary>完全解答</summary>

$\mathcal F=\sum_y\pi_yr_y-\beta\sum_y\pi_y\log(\pi_y/\pi_y^{ref})+\eta(\sum_y\pi_y-1)$。$d[\pi\log(\pi/c)]/d\pi=\log(\pi/c)+1$なので、各$\pi_y$の偏微分を0に置くと指定式になる。

</details>

## 問題3：policy–reward relation

stationarity式を整理し、$r(x,y)=\beta\log[\pi^*(y|x)/\pi_{ref}(y|x)]+C(x)$ を導け。$C(x)$がresponseに依存しない理由も述べよ。

<details><summary>完全解答</summary>

$\beta\log(\pi_y/\pi_y^{ref})=r_y+\eta-\beta$。従って$r_y=\beta\log(\pi_y/\pi_y^{ref})+(\beta-\eta)$。正規化constraintのmultiplier$\eta$はprompt$x$ごとに共通でresponse index$y$には依存しないので$C(x)=\beta-\eta$。

</details>

## 問題4：optimal policyのclosed form

前問の関係を指数化し、$\pi^*(y|x)\propto\pi_{ref}(y|x)e^{r(x,y)/\beta}$ を示し、正規化定数$Z(x)$を書け。

<details><summary>完全解答</summary>

log-ratio$=r/\beta-C(x)/\beta$なので$\pi^*=\pi_{ref}e^{r/\beta}e^{-C/\beta}$。最後のfactorは全$y$共通でnormalizer。$Z(x)=\sum_y\pi_{ref}(y|x)e^{r(x,y)/\beta}$ とすれば $\pi^*=\pi_{ref}e^{r/\beta}/Z(x)$。

</details>

## 問題5：Bradley–Terryとconstant cancel

$P(y_w\succ y_l|x)=\sigma(r_w-r_l)$へpolicy–reward relationを代入し、$C(x)$が消えることを式で示せ。

<details><summary>完全解答</summary>

$r_w-r_l=\beta[\log(\pi^*_w/\pi^{ref}_w)-\log(\pi^*_l/\pi^{ref}_l)]+C(x)-C(x)$。従ってconstantはcancelし、preference logitはpolicy/reference log-ratioのchosen−rejected差だけで表される。

</details>

## 問題6：DPO数値例

$\log\pi_\theta(y_w)=-1.0$, $\log\pi_\theta(y_l)=-2.0$, reference側が$-1.2,-1.8$, $\beta=0.5$。DPO logit, preference probability, lossを求めよ。

<details><summary>完全解答</summary>

policy差は1.0、reference差$\Delta_{ref}=0.6$、差は0.4。logitは$0.5\times0.4=0.2$。$\sigma(0.2)\approx0.550$、loss$=-\log0.550\approx0.598$。

</details>

## 問題7：referenceの役割

policyでchosen−rejected log-probability差が1.0でも、reference差も1.0ならDPO logitはどうなるか。何を意味するか。

<details><summary>完全解答</summary>

log-ratio差は$1.0-1.0=0$なのでlogit0、preference probability0.5。current policyがchosenを好んでいてもreferenceと**同程度**なら、referenceに対する相対改善はないとDPOは見る。

</details>

## 問題8：betaの効果

同じlog-ratio差$\Delta=0.4$に対し$\beta=0.1$と$\beta=2$のpreference probabilityを比較せよ。

<details><summary>完全解答</summary>

$\beta=0.1$ならlogit0.04で$\sigma\approx0.510$。$\beta=2$ならlogit0.8で$\sigma\approx0.690$。DPO loss内では$\beta$がlogit scaleを変える。ただしKL objectiveでのregularization strengthとのparameter conventionは実装/論文の式を確認する。

</details>

## 問題9：supportとmaskのfailure

chosen responseのあるtokenがreferenceでprobability 0になる場合、DPO log-ratioに何が起こるか。language-model実装ではどんなmask不整合が類似問題を作るか。

<details><summary>完全解答</summary>

$\log\pi_{ref}=\log0=-\infty$でlog-ratioが有限に定義できない。通常softmax LMはunmasked tokenへpositive probabilityを持つが、token mask、truncation、EOS処理、prompt/response maskingがpolicyとreferenceで異なると比較するlog-probabilityが同じeventを表さず、lossが壊れる。

</details>

## 問題10：DPOとRLHFを比較

標準RLHFとDPOを、必要なlearned object、online rollout、referenceの役割、残るdata biasの4点で比較せよ。

<details><summary>完全解答</summary>

標準RLHFはpreferenceからreward modelを学び、そのrewardでonline/iterative policy optimizationを行う。DPOは特定KL-regularized modelの関係を使いpair dataからpolicyを直接fitし、policy update中の明示的reward modelを省ける。どちらもreference/regularizationでbehavior driftを制御する考えを持つ。DPOでもpreference labelsのverbosity/style/annotator biasやcoverage不足はそのまま学習signalに入るため消えない。

</details>

[教科書へ](/textbook/frontier-rlhf-preference-optimization)
