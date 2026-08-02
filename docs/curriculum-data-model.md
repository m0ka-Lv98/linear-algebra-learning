# カリキュラムデータモデル

## 3つの台帳

- `content/courses.yml` は、全11 CourseのID、slug、層、状態、前提Course、主な参照先を管理する台帳です。
- `content/curriculum.yml` は、計画上のUnitとTopicを管理します。まだ教材ファイルがない `planned` Topicも登録できます。
- `content/topics.yml` は、テーマホーム、スライド、教科書、演習の4成果物が実装済みのTopicを登録する台帳です。

計画と実装を混同しないため、計画上のTopicに教材ファイルを要求しません。教材を実装したときは、`curriculum.yml` の `implementation_topic` で `topics.yml` のIDと対応付けます。この対応は一対一です。

カリキュラムTopicのIDは計画を識別するためのIDであり、公開URLではありません。公開URLと4成果物の対応は既存の `topics.yml` が管理します。既存の直交射影の公開URLと、その他の公開済みURLは変更しません。

## 検証

`pnpm curriculum:check` はCourseとTopicの重複、前提参照、依存循環、UnitとのCourse整合、成果目標数、実装Topic対応を検証します。教材が未実装であることは計画データとして許容し、必要な場合だけ警告にします。
