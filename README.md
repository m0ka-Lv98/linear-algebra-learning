# 線形代数学習リポジトリ

大学初年級の線形代数から、重み付き最小二乗法（WLSM）、数値線形代数、機械学習へ進む教材のための基盤です。現在は初期構築段階で、直交射影の最小限の縦断サンプルだけを含みます。

## 技術構成

- Node.js 24.12.0 以上（`.nvmrc`参照）
- pnpm 11.9.0
- VitePress 1.6.4
- Slidev 52.1.0
- Vue 3.5.13 / TypeScript 5.7.3

正確な依存関係は `pnpm-lock.yaml` に固定されます。

## セットアップ

```bash
pnpm install
pnpm dev:portal
pnpm dev:slides
```

検査とビルド:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`BASE_PATH=/repository-name/ pnpm build` のようにベースパスを指定できます。リポジトリ名はコードへ埋め込んでいません。

## 構成

`apps/portal` はVitePress、`apps/slides` はSlidev、`packages/visualizations` は共有Vueコンポーネントの置き場所です。`content/topics.yml` はテーマ対応表、`docs/` は執筆と設計の文書です。

## 教材追加の流れ

テーマIDを決め、テーマホーム・教科書・概要スライド・演習を個別に追加し、`content/topics.yml` と相互リンクを更新します。詳細は `docs/codex-workflow.md` を参照してください。

## 現在のサンプル

[直交射影のテーマホーム](/courses/foundation/orthogonal-projection)から、概要スライド、教科書、3問の演習へ移動できます。

## ロードマップ

Phase 1の基盤から、教材テンプレート、基礎教材、WLSM、機械学習、発展トピックへ進みます。詳細は `docs/roadmap.md` を参照してください。
