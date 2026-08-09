# 数値検算と再現性

## Course・Unit内での位置付け

Course 00「学習準備」の第8 Topic。後続Courseの数式・コードを安全に読むための基礎を整える。

## 今回解く問い

浮動小数点誤差、許容誤差、残差、乱数seed、再現性、検証記録を数値実験の基本手順として身につける。

## 概要

このTopicは、用語を暗記するだけでなく、定義→小さな例→誤りの診断→後続Courseへの接続という順で学ぶ。数式とPython/NumPyを対応付ける場合も、数学上の対象とコード上の表現を区別する。

## 学習目標

- 浮動小数点数を完全一致で比較できない場合がある理由を説明できる
- 絶対誤差・相対誤差・許容誤差・残差を区別できる
- `np.isclose`/`np.allclose` と小さな既知ケースで数値結果を検証できる
- 乱数seed、環境情報、入力・出力を記録して再現可能性を高められる

## 前提Topic

[NumPy配列・shape・indexing](/courses/foundation/prep-numpy-arrays-shapes)

## 想定学習時間

スライド20分 / 教科書70分 / 演習60分

## 学習順序

1. スライドで概念と全体像を確認する。
2. 教科書で定義・例・注意点を読む。
3. 演習を自力で解き、ヒントは必要な段階だけ開く。
4. 完全解答と自分の説明を比較し、誤解を修正する。

## 教材

- [スライド](/slides/prep-numerical-checks-reproducibility/)
- [教科書](/textbook/prep-numerical-checks-reproducibility)
- [演習](/exercises/prep-numerical-checks-reproducibility)

## 前後Topic

- 前：[NumPy配列・shape・indexing](/courses/foundation/prep-numpy-arrays-shapes)
- 次：Course 01「微積分」またはCourse 02「線形代数」へ進む
