# Course 01-10 Slidev migration v2 fix

Apply this archive over the repository root after the v1 migration stopped before commit.
Do not reset the worktree first.

Run:

```bash
bash scripts/repair-course01-10-slidev.sh
```

The v2 generator reads each committed deck from `git show HEAD:...` when available.
It preserves/upgrades curated decks and regenerates only legacy placeholder decks.
It also removes the incorrect raw character-count quality gate and ignores TODO-only HTML comments when generating slides.

After PASS, inspect `git diff --stat` and representative diffs before building/committing.
