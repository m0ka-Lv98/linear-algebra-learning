# 特異値分解

## 今回解く問い

SVDは任意の行列を「入力側の直交回転 → 軸ごとの伸縮 → 出力側の直交回転」に分ける。固有分解より適用範囲が広く、長方形・rank不足でも使える。

## 学習目標

- 定義と代表式を、未定義の記号なしで説明できる。
- 2〜5次元の例を手計算し、図と対応づけられる。
- 成立条件・反例・数値的不安定性を区別できる。
- 後続の最小二乗・固有構造・SVD・WLSMへの接続を説明できる。

## 前提Topic

- [la-symmetric-matrices-spectral-theorem](/courses/foundation/la-symmetric-matrices-spectral-theorem)
- [la-rank-rank-nullity](/courses/foundation/la-rank-rank-nullity)

## 想定学習時間

スライド25分 / 教科書75分 / 演習60分
