#!/usr/bin/env bash
set -euo pipefail

# Run from the repository root after copying/extracting this overlay there.
node tools/apply-audit-corrections-v2.mjs
node tools/check-curriculum.mjs --test
node tools/check-learning-quality.mjs

# Optional full verification. The overlay itself intentionally changes source files,
# so compare the source diff before and after verification commands instead of
# requiring a completely clean working tree.
if [[ "${RUN_FULL_VERIFY:-0}" == "1" ]]; then
  SOURCE_DIFF_BEFORE="$(git diff --binary -- . ':!dist' | sha256sum | awk '{print $1}')"

  pnpm lint
  pnpm test
  pnpm build

  SOURCE_DIFF_AFTER="$(git diff --binary -- . ':!dist' | sha256sum | awk '{print $1}')"
  if [[ "$SOURCE_DIFF_BEFORE" != "$SOURCE_DIFF_AFTER" ]]; then
    echo "ERROR: verification commands mutated repository source files."
    echo "The intended overlay diff changed during lint/test/build."
    exit 1
  fi
fi
