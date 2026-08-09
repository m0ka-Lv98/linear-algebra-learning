#!/usr/bin/env bash
set -euo pipefail

# Usage: ./APPLY.sh /path/to/linear-algebra-learning
# If omitted, the current directory is used as the repository root.
SRC="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"

copy_dir() {
  local rel="$1"
  mkdir -p "$TARGET/$rel"
  cp -R "$SRC/$rel/." "$TARGET/$rel/"
}

copy_dir apps/portal/courses/foundation
copy_dir apps/portal/textbook
copy_dir apps/portal/exercises
copy_dir apps/portal/public/visuals/course-02
copy_dir apps/slides/decks
mkdir -p "$TARGET/docs"
cp "$SRC/docs/content-guidelines.md" "$TARGET/docs/content-guidelines.md"
cp "$SRC/AGENTS.md" "$TARGET/AGENTS.md"

echo "Course 02 overlay applied to: $TARGET"
