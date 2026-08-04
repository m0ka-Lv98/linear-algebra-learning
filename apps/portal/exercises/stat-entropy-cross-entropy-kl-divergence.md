# エントロピー・交差エントロピー・KLダイバージェンス：演習

[教科書](/textbook/stat-entropy-cross-entropy-kl-divergence)と対応する10問。ヒント以降は折りたたんである。

### PST-320-01：概念

1. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-02：概念

2. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-03：手計算・導出

3. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-04：手計算・導出

4. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-05：手計算・導出

5. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-06：誤りの診断

6. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-07：誤りの診断

7. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-08：実装・数値読解

8. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-09：応用

9. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

### PST-320-10：応用

10. エントロピー・交差エントロピー・KLダイバージェンスについて、self-information、entropy、cross entropy、KLダイバージェンス、非対称性、coding、classification lossのうち一つを定義し、式 $$D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}$$ が表す量を説明せよ。

<details><summary>ヒント・解法方針・完全解答</summary>

- ヒント1: 確率変数は大文字、観測値は小文字で書き、supportとshapeを確認する。
- ヒント2: 正規化、条件、単位、独立性の仮定を先に列挙する。
- 解法方針: 定義を式へ展開し、小さな値を代入して範囲と解釈を確認する。
- 完全解答: D_{\mathrm{KL}}(P\|Q)=\sum_xp(x)\log\frac{p(x)}{q(x)}を定義に従って読み、必要な和・積分・条件付けを行う。結果が確率なら0以上1以下、分布なら正規化を確認し、最後に統計・機械学習への接続を述べる。
- よくある誤答: PDFを一点の確率と読む、排反と独立を混同する、p-valueや尤度を確率として扱う。
</details>

