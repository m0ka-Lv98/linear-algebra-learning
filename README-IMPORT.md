# Import guide

## 推奨方式

現在のGitHubリポジトリをcommit `2de389d658f9c6ab2ab46e19c66b873a9a8f7e88`以降へ更新し、`overlay-for-current-repo/`の内容をリポジトリrootへ重ねる。

Course 00〜04は既存公開教材を保護するため、推奨overlayには含めていない。Course 05〜10の480教材ファイルと、全Courseを統合した台帳・ナビゲーション・Slidev設定を含む。

## 全再生成版

`complete-generated-source/`にはCourse 00〜10、210 Topic、840教材ファイルを収録している。Course 00〜04も標準templateで再生成されているため、既存の手作業教材を上書きする用途には推奨しない。比較・復旧・新規repository作成用である。

## Codexの担当

1. ZIPを展開する。
2. 推奨overlayをrepository rootへコピーする。
3. 差分を確認する。
4. `pnpm curriculum:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build`を実行する。
5. Pages用base path buildを実行する。
6. commit・pushし、CI・Pages・routeを確認する。

## 注意

- `content/*.yml`は全Course統合版である。
- `apps/slides/package.json`は長大なshell commandを避け、`apps/slides/build.mjs`でdeckを順次buildする。
- 生成教材は構造的に完成した学習用draftであり、公開前に専門Topicの数式・演習をspot reviewすることを推奨する。
