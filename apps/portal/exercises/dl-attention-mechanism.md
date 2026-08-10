# attention機構：演習

Course 09｜深層学習

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：shapeを追う

$\mathbf Q\in\mathbb R^{n_q\times d_k}$、$\mathbf K\in\mathbb R^{n_k\times d_k}$、$\mathbf V\in\mathbb R^{n_k\times d_v}$。$\operatorname{softmax}(\mathbf Q\mathbf K^T/\sqrt{d_k})\mathbf V$の各中間shapeを答えよ。

<details><summary>完全解答</summary>

$QK^T$は$(n_q,d_k)(d_k,n_k)=(n_q,n_k)$。row-wise softmax後も$(n_q,n_k)$。それを$V(n_k,d_v)$へ掛けるとoutputは$(n_q,d_v)$。各queryが$n_k$個のvalueをweightして$d_v$次元outputを作る。

</details>

## 問題2：dot-product variance

$q_r,k_r$が独立、平均0、分散1で$r=1,\ldots,d_k$とする。$s=\sum_r q_rk_r$の分散が概ね$d_k$になることを示せ。

<details><summary>完全解答</summary>

独立かつ平均0なら各積$q_rk_r$の平均0、分散$E[q_r^2]E[k_r^2]=1$。異なる$r$のcross covarianceを0とみなせるので$\operatorname{Var}(s)=\sum_r1=d_k$。従って$s/\sqrt{d_k}$の分散は約1。

</details>

## 問題3：scaleがないと何が起こるか

$d_k$が64から1024へ増えるのに$1/\sqrt{d_k}$を使わない場合、score standard deviationは何倍になるか。softmaxへの影響も述べよ。

<details><summary>完全解答</summary>

standard deviationは$\sqrt{d_k}$なので8から32へ、4倍。logit差が大きくなりsoftmaxがone-hotに近くsaturateしやすく、非最大要素のgradientが小さくなる。scale後ならvarianceをO(1)へ保つ。

</details>

## 問題4：2-key softmax

1 queryに対するscaled scoresが$[0,\log3]$。attention weightsを求めよ。

<details><summary>完全解答</summary>

softmaxは$[e^0,e^{\log3}]/(1+3)=[1/4,3/4]$。valueが$\mathbf v_1,\mathbf v_2$ならoutputは$0.25\mathbf v_1+0.75\mathbf v_2$。

</details>

## 問題5：maskの意味

causal attentionでfuture keyのscoreへ$-\infty$を加えると、softmax後weightが0になる理由を説明せよ。

<details><summary>完全解答</summary>

softmax numeratorは$e^{score}$。masked scoreを$-\infty$とすれば$e^{-\infty}=0$なのでweight0。finite large-negative valueを実装上使う場合も同じ近似。これによりposition$t$はfuture tokenを参照しない。

</details>

## 問題6：row-wise softmax

$QK^T$へcolumn-wise softmaxを誤って適用するとattentionの意味がどう変わるか。

<details><summary>完全解答</summary>

正しいrow-wise softmaxでは各query rowでkey weightsがsum1になり、そのqueryのvalue mixtureを作る。column-wiseだと各keyに対してquery方向にnormalizeし、各queryのweightsがsum1にならないため「1 queryがkeysをどうmixするか」というattention定義から外れる。

</details>

## 問題7：Q,K,Vを区別する

同じinput embeddingからlinear projectionsでQ,K,Vを作る理由を、scoreとcontentの役割を分けて説明せよ。

<details><summary>完全解答</summary>

QとKはcompatibility scoreを決めるrepresentation、Vは実際にmixされてoutputへ運ばれるcontent representation。別projectionを持つことで「何を基準に参照先を選ぶか」と「選んだ先から何を運ぶか」を異なるsubspaceで学習できる。

</details>

## 問題8：attention matrixの図

heatmapのあるrowでweightsが$(0.05,0.05,0.8,0.1)$だった。このqueryのoutputをvalue vectorsで式として書き、最も影響が大きいkeyを答えよ。

<details><summary>完全解答</summary>

$\mathbf o=0.05\mathbf v_1+0.05\mathbf v_2+0.8\mathbf v_3+0.1\mathbf v_4$。第3key/valueのweight0.8が最大。ただしvalue vector magnitude自体もoutput componentへの実影響には関係する。

</details>

## 問題9：numerical stability

softmax logitsが$(1001,1000,999)$のとき、naiveな$e^{z_i}$計算を避ける方法と、softmaxが変わらない理由を述べよ。

<details><summary>完全解答</summary>

最大値1001を全logitから引いて$(0,-1,-2)$でsoftmaxする。softmax$(z-c)$は numerator/denominator双方に$e^{-c}$が掛かりcancelするため同じprobability。overflowを防げる。

</details>

## 問題10：総合：identity-like attention

$QK^T/\sqrt{d_k}$の対角要素が非常に大きく、非対角が非常に小さい場合、attention outputは何に近づくか。self-attentionとして解釈せよ。

<details><summary>完全解答</summary>

row-wise softmaxは各rowで対角weightが1、他が0に近づく。従ってoutput row$i$は$\mathbf v_i$に近く、各tokenがほぼ自分自身のvalueだけを参照するidentity-like attentionになる。

</details>

[教科書へ](/textbook/dl-attention-mechanism)
