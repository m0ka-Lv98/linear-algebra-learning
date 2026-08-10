# seq2seq・encoder-decoder・teacher forcing

Course 09｜深層学習

encoderは入力系列を表現へ変換し、decoderは過去token条件付きで次token分布を生成する。teacher forcingでは訓練時に正解prefixを与える。

## 到達目標

- 入力長と出力長が異なる系列変換を、encoderとdecoderへ分けてどう学習するか。
- 中心式の各記号を定義してから計算できる。
- 成立条件と失敗条件を具体例で説明できる。

- [教科書](/textbook/dl-seq2seq-teacher-forcing)
- [演習](/exercises/dl-seq2seq-teacher-forcing)
- [スライド](/slides/dl-seq2seq-teacher-forcing/)
