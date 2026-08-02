# コンテンツモデル

## 1テーマ4成果物

1テーマは、テーマホーム、概要スライド、詳細教科書、演習問題の4成果物を必ず持ちます。

```text
apps/portal/courses/<course>/<topic-id>.md
apps/portal/textbook/<topic-id>.md
apps/portal/exercises/<topic-id>.md
apps/slides/decks/<topic-id>.md
```

対応関係は `content/topics.yml` にID付きで記録します。教材本文はテンプレートのコメントを確認して個別に執筆し、4成果物を自動的に同期させることはしません。

## topics.ymlのフィールド

- `id`: 小文字英数字とハイフンだけの一意なID
- `title`: 表示タイトル
- `course`: `foundation`、`wlsm`、`machine-learning`、`frontier` のいずれか
- `order`: コース内の表示順を表す0以上の整数
- `summary`: テーマの短い概要
- `status`: `planned`、`draft`、`review`、`published` のいずれか
- `prerequisites`: 前提テーマIDの文字列配列
- `estimated_minutes`: `slides`、`textbook`、`exercises` の正の整数
- `routes`: `home`、`slides`、`textbook`、`exercises` の公開ルート

ルートはコース名・テーマIDと一致し、ファイル配置と対応していなければなりません。YAMLは一般的なNode.js用パーサーで読み込みます。

## 前提テーマ

前提テーマはIDで参照します。まだ `topics.yml` に登録されていない前提テーマは、将来追加される可能性があるため警告として扱い、検証エラーにはしません。自分自身を前提テーマにすることはできません。

## URLの扱い

公開済みテーマのID、ファイル配置、ルートは変更しません。GitHub Pagesのベースパスはビルド時の `BASE_PATH` から与え、教材本文へリポジトリ名を直接埋め込みません。
