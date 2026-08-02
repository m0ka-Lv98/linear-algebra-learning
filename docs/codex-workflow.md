# Codexで教材を追加する流れ

## 生成

```bash
pnpm new:topic -- --id <id> --title "<title>" --course <course> --order <number>
```

まず `--dry-run` で生成予定を確認し、既存IDやファイルを上書きしないことを確認します。

## カリキュラムからの教材追加

1. `curriculum.yml`から実装するTopicを1つ選ぶ
2. 前提Topicが実装済みか確認する
3. `new:topic`で4成果物の骨組みを生成する
4. `curriculum.yml`の`implementation_topic`を設定する
5. 教材を記述する
6. `curriculum:check`、lint、test、buildを実行する

Course IDから`new:topic --course`を自動決定する機能はありません。

## 執筆と検証の順序

1. `topics.yml`と生成ファイルを確認
2. テーマホームを記述
3. 教科書を記述
4. スライドを記述
5. 演習と解答を記述
6. 相互リンクを確認
7. `lint`、`typecheck`、`test`、`build`を実行
8. `BASE_PATH`付きビルドを実行

スライド、教科書、演習は別々に執筆します。テンプレートは骨組みを提供するだけで、教材本文を自動生成しません。公開済みテーマのIDとルートは変更しません。
