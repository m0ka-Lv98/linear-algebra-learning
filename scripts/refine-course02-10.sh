#!/usr/bin/env bash
set -euo pipefail
course="${1:-all}"
python3 tools/course02-10-refine/apply.py --course "$course"
node tools/course02-10-refine/materialize-decks.mjs --course "$course"
python3 tools/course02-10-refine/verify.py --course "$course"
python3 -m py_compile \
  tools/course02-10-refine/apply.py \
  tools/course02-10-refine/verify.py \
  tools/course02-10-refine/generate_visuals.py \
  tools/course02-10-refine/generate_visuals_impl.py
