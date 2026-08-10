# 信頼区間：演習

Course 03｜確率統計

教科書の定義・導出・図・数値例を、自分で再構成できるかを確認する10問。

## 問題1：正規pivotから区間を導く

$Z=(\bar X-\mu)/(\sigma/\sqrt n)\sim N(0,1)$、$\sigma$既知とする。$P(-1.96\le Z\le1.96)=0.95$ から$\mu$の95%信頼区間を不等式変形で導け。

<details><summary>完全解答</summary>

$-1.96\le(\bar X-\mu)/(\sigma/\sqrt n)\le1.96$。正の$\sigma/\sqrt n$を掛け、$\mu$について解くと $\bar X-1.96\sigma/\sqrt n\le\mu\le\bar X+1.96\sigma/\sqrt n$。従って区間は $[\bar X-1.96\sigma/\sqrt n,\bar X+1.96\sigma/\sqrt n]$。ランダムなのは端点で$\mu$は固定。

</details>

## 問題2：数値計算

$n=100$, $\bar x=12.4$, 母標準偏差$\sigma=3$ とする。95%信頼区間を計算せよ。

<details><summary>完全解答</summary>

標準誤差は$3/\sqrt{100}=0.3$。marginは$1.96\times0.3=0.588$。したがって $[12.4-0.588,12.4+0.588]=[11.812,12.988]$。

</details>

## 問題3：95%の意味

観測後に得た区間$[11.812,12.988]$について「真の$\mu$が95%の確率でこの区間にある」と言うのが頻度論的に不適切な理由を説明せよ。

<details><summary>完全解答</summary>

頻度論では$\mu$は未知だが固定値で、確率変数は標本から作る区間端点。95%は同じprocedureを反復したときに作られる区間の約95%が固定された$\mu$をcoverするという長期頻度を指す。観測後の特定区間について$\mu$に95%の確率を割り当てるにはBayesian posterior等の別の確率modelが必要。

</details>

## 問題4：標本数と幅

同じ$\sigma$・confidence levelで標本数を100から400へ増やすと、z区間の幅は何倍になるか。

<details><summary>完全解答</summary>

half-widthは$z\sigma/\sqrt n$に比例する。$n$を4倍にすると$\sqrt n$は2倍なのでhalf-widthも全幅も1/2になる。

</details>

## 問題5：t分布を使う理由

正規母集団で$\sigma$未知のとき、なぜ$z$ではなく$t_{n-1}$を使うのか。

<details><summary>完全解答</summary>

$\sigma$を未知のためsample standard deviation $S$で置換すると分母にもrandomnessが入る。正規標本では $(\bar X-\mu)/(S/\sqrt n)$ が自由度$n-1$のt分布に従う。小標本ではt分布のtailが正規より厚く、その追加不確実性を反映する。

</details>

## 問題6：coverage simulationの設計

95%信頼区間のcoverageをsimulationで確認する手順を、真値・標本生成・区間作成・集計の順に説明せよ。

<details><summary>完全解答</summary>

真値$\mu_0$と母分布を固定する。各反復で独立標本を生成し、同じ95% CI procedureで区間$[L_b,U_b]$を作る。indicator $I_b=1\{L_b\le\mu_0\le U_b\}$を記録し、$B^{-1}\sum_b I_b$をcoverage estimateとする。$B$を十分大きくすれば0.95付近になるか確認できる。

</details>

## 問題7：図のmissを読む

反復信頼区間の図で35本中2本だけ真値の縦線を跨がなかった。これは95% procedureに矛盾するか。

<details><summary>完全解答</summary>

矛盾しない。35本なら期待miss数は$35\times0.05=1.75$程度で、実際のmiss数はrandomに変動する。95% coverageは有限回の各batchで必ず95% exactlyになることを意味しない。

</details>

## 問題8：Wald近似が壊れる例

Bernoulli比率$p$のWald区間 $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$ が小標本かつ$\hat p$が0付近で問題になる理由を述べよ。

<details><summary>完全解答</summary>

正規近似が悪く、$\hat p=0$ならestimated SEも0になって区間が[0,0]になるなど極端に不適切。さらに端点が[0,1]外へ出ることもある。Wilson区間やexact法など別procedureを検討する。

</details>

## 問題9：CIと検定の対応

両側有意水準5%のz検定と95%信頼区間の関係を説明せよ。帰無値$\mu_0$が95%CI外ならどうなるか。

<details><summary>完全解答</summary>

同じstandard errorとnormal approximationを使う両側testでは、$H_0:\mu=\mu_0$を5%でrejectする条件は$|\bar X-\mu_0|>1.96SE$。これは$\mu_0$が$\bar X\pm1.96SE$の外にあることと同値。従って帰無値が95%CI外なら5%両側検定でrejectする。

</details>

## 問題10：総合：条件を明示する

標本平均の95%CIを報告するとき、推定値・SE・critical value以外に、解釈の妥当性を左右する条件を3つ挙げよ。

<details><summary>完全解答</summary>

例：標本がtarget populationを適切に代表すること、独立性または依存を考慮したSEを使うこと、有限標本で用いる分布近似が妥当なこと。さらにmissingness、cluster structure、model misspecificationがあればusual CIのcoverageが崩れ得る。

</details>

[教科書へ](/textbook/stat-confidence-intervals)
