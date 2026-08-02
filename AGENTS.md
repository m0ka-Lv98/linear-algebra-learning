# AGENTS.md

## 目的

線形代数からWLSM、数値線形代数、機械学習までを継続的に学べる静的教材リポジトリです。

## 主要ディレクトリ

- `apps/portal`: VitePressの学習ポータル
- `apps/slides`: Slidevデッキ
- `packages/visualizations`: 将来共有するVue可視化
- `content`: テーマ対応表
- `docs`: 設計・執筆規約

## コマンド

`pnpm install`、`pnpm dev:portal`、`pnpm dev:slides`、`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`。

教材追加前に [content guidelines](docs/content-guidelines.md)、[notation guidelines](docs/notation-guidelines.md)、[content model](docs/content-model.md) を読むこと。スライド、教科書、演習は別々に執筆し、既存コンポーネントを優先して再利用する。不要な依存関係は追加しない。

完了前に lint、typecheck、test、build を実行する。テストを削除・無効化して成功扱いにしない。依頼されていない大量の本文生成、コミット、pushは行わない。

新規テーマは原則 `pnpm new:topic` から開始し、同じ骨組みを手作業で複製しない。テーマ追加後はコンテンツ検証を実行する。公開済みテーマのIDとルートは変更しない。詳細は [content model](docs/content-model.md) と [Codex workflow](docs/codex-workflow.md) を参照する。
