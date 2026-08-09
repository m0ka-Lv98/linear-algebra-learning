# AGENTS.md

## 目的

線形代数からWLSM、数値線形代数、機械学習までを継続的に学べる静的教材リポジトリです。

## 主要ディレクトリ

- `apps/portal`: VitePressの学習ポータル
- `apps/slides`: Slidevデッキ
- `packages/visualizations`: 共有可視化
- `content`: テーマ対応表
- `docs`: 設計・執筆規約

## 教材執筆の最優先ルール

教材追加・大幅改訂前に [content guidelines](docs/content-guidelines.md)、[notation guidelines](docs/notation-guidelines.md)、[content model](docs/content-model.md) を読む。

特に以下を守る。

- MIT OpenCourseWare、OpenStax、大学公開教科書等の良質な外部教材を確認し、説明順・成立条件・例題を裏取りする。
- 外部教材を転載せず、本リポジトリの学習順に合わせて再説明し、参照先を記録する。
- 「直感→記号・shape→定義→導出→手計算→幾何→アルゴリズム→反例・誤答→数値検算→後続接続」を基本構成とする。
- 定義していない記号を使わない。ベクトルは太字小文字、行列は太字大文字。初出時に次元を明示する。
- Topic間で同じ一般論をコピーしない。各Topic固有の説明・例・失敗条件を書く。
- 演習は原則10問で、完全重複を禁止し、完全解答は具体的な計算・論理を最後まで書く。

## コマンド

`pnpm install`、`pnpm dev:portal`、`pnpm dev:slides`、`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`。

スライド、教科書、演習は別々に執筆し、既存コンポーネントを優先して再利用する。不要な依存関係は追加しない。完了前に lint、typecheck、test、build を実行する。テストを削除・無効化して成功扱いにしない。

新規テーマは原則 `pnpm new:topic` から開始し、公開済みテーマのIDとルートは変更しない。教材追加前に `content/curriculum.yml` を確認し、計画Topicと実装Topicを `implementation_topic` で対応付ける。
