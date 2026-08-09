#!/usr/bin/env bash
set -euo pipefail
node tools/generate-course01-10-slide-decks.mjs
node tools/apply-course01-10-slidev-fixes.mjs
node tools/verify-course01-10-slidev-fixes.mjs
node tools/verify-course01-10-pages-workflow.mjs
