#!/usr/bin/env bash
set -euo pipefail

# Safe rerun after the v1 overlay stopped before commit. The generator recovers
# committed curated decks from HEAD and only regenerates true placeholder decks.
node tools/generate-course01-10-slide-decks.mjs
node tools/apply-course01-10-slidev-fixes.mjs
node tools/verify-course01-10-slidev-fixes.mjs
node tools/verify-course01-10-pages-workflow.mjs
