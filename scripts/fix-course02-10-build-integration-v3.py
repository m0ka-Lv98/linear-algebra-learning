from pathlib import Path
import re
import shutil

ROOT = Path.cwd()
PATCH = Path(__file__).resolve().parents[1]


def copy_file(rel):
    src = PATCH / rel
    dst = ROOT / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.resolve() == dst.resolve():
        print(f'already installed {rel}')
        return
    shutil.copy2(src, dst)
    print(f'installed {rel}')


# Canonical Course 02-10 renderer + profile inventory + strict verifier.
for rel in [
    'tools/course02-10-refine/materialize-decks.mjs',
    'tools/course02-10-refine/topic_profiles.json',
    'tools/course02-10-refine/verify.py',
]:
    copy_file(rel)

# 1. Make the existing Course 01-10 generator dispatch Course 02-10 directly to
# the canonical 15-slide renderer. This occurs BEFORE any HEAD/worktree
# classification, so generic textbook rendering and curated-deck recovery can no
# longer replace the refined deck.
gen_path = ROOT / 'tools/generate-course01-10-slide-decks.mjs'
g = gen_path.read_text(encoding='utf-8')
import_line = "import { loadCourse0210RefinedProfiles, renderCourse0210RefinedDeck } from './course02-10-refine/materialize-decks.mjs'"
if import_line not in g:
    anchor = "import { parse } from 'yaml'"
    if anchor not in g:
        raise SystemExit('Cannot patch generator imports: yaml import not found')
    g = g.replace(anchor, anchor + '\n' + import_line, 1)

profiles_line = '  const refinedCourse0210Profiles = await loadCourse0210RefinedProfiles(root)\n'
if profiles_line.strip() not in g:
    anchor = "  const changed = []\n"
    if anchor not in g:
        raise SystemExit('Cannot patch generator: changed-array anchor not found')
    g = g.replace(anchor, profiles_line + '\n' + anchor, 1)

branch_marker = 'const refinedProfile = refinedCourse0210Profiles.get(id)'
if branch_marker not in g:
    anchor = "  for (const id of targetIds) {\n    const topic = byImplementationId.get(id)\n"
    if anchor not in g:
        raise SystemExit('Cannot patch generator loop: topic anchor not found')
    branch = """  for (const id of targetIds) {
    const topic = byImplementationId.get(id)
    const refinedProfile = refinedCourse0210Profiles.get(id)
    if (refinedProfile) {
      const deckPath = path.join(root, 'apps/slides/decks', `${id}.md`)
      let current = ''
      try { current = await readFile(deckPath, 'utf8') } catch {}
      const generated = renderCourse0210RefinedDeck(refinedProfile)

      preservedCurated.push(id)
      if (current === generated) {
        unchanged.push(id)
        continue
      }
      changed.push(id)
      if (!check) await writeFile(deckPath, generated)
      continue
    }
"""
    g = g.replace(anchor, branch, 1)

gen_path.write_text(g, encoding='utf-8')
print('patched tools/generate-course01-10-slide-decks.mjs')

# 2. Ensure the Python refinement writer uses the same required final heading.
apply_path = ROOT / 'tools/course02-10-refine/apply.py'
if apply_path.exists():
    a = apply_path.read_text(encoding='utf-8')
    a2 = a.replace('## まとめと演習', '## 理解確認')
    if a2 != a:
        apply_path.write_text(a2, encoding='utf-8')
        print('patched tools/course02-10-refine/apply.py')

# 3. The repository verifier must recognize the managed marker. Do not weaken
# any existing quality checks.
repo_verify = ROOT / 'tools/verify-course01-10-slidev-fixes.mjs'
if repo_verify.exists():
    v = repo_verify.read_text(encoding='utf-8')
    if "marker === 'course02-10-refined-v1'" not in v:
        anchor = "    else if (marker === 'course01-10-curated-upgrade-v2') curated += 1\n"
        if anchor not in v:
            raise SystemExit('Cannot patch repository verifier: marker anchor not found')
        v = v.replace(anchor, anchor + "    else if (marker === 'course02-10-refined-v1') curated += 1\n", 1)
        v = v.replace('else errors.push(`${id}: v2 generatedBy marker missing`)', 'else errors.push(`${id}: supported generatedBy marker missing`)')
    repo_verify.write_text(v, encoding='utf-8')
    print('patched tools/verify-course01-10-slidev-fixes.mjs')

# 4. Make the documented refinement entry point finish by materializing from the
# canonical JS renderer, so running the refinement workflow cannot leave Python
# and JS deck templates out of sync.
sh_path = ROOT / 'scripts/refine-course02-10.sh'
if sh_path.exists():
    s = sh_path.read_text(encoding='utf-8')
    cmd = 'node tools/course02-10-refine/materialize-decks.mjs --course "$course"'
    if cmd not in s:
        anchor = 'python3 tools/course02-10-refine/apply.py --course "$course"\n'
        if anchor not in s:
            raise SystemExit('Cannot patch refine-course02-10.sh: apply command not found')
        s = s.replace(anchor, anchor + cmd + '\n', 1)
    sh_path.write_text(s, encoding='utf-8')
    print('patched scripts/refine-course02-10.sh')

print('PASS: Course 02-10 canonical deck renderer integrated into the existing generator.')
